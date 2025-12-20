import { Router, Request, Response, IRouter } from 'express'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../supabase/client.js'
import { verifyToken, AuthRequest } from '../middleware/auth.js'

export const authRouter: IRouter = Router()

const JWT_SECRET = process.env.JWT_SECRET || 'yenko-secret-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map<string, { otp: string; expiresAt: number }>()

/**
 * Step 1: Request OTP
 * POST /api/auth/request-otp
 * Body: { phone: "+233XXXXXXXXX" }
 */
authRouter.post('/request-otp', async (req: Request, res: Response) => {
  try {
    const { phone } = req.body

    if (!phone || !phone.match(/^\+233\d{9}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Valid Ghana phone number required (+233XXXXXXXXX)',
      })
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = Date.now() + 5 * 60 * 1000 // 5 minutes

    // Store OTP
    otpStore.set(phone, { otp, expiresAt })

    // In production: Send OTP via SMS (Hubtel, Arkesel, etc.)
    // For MVP: Log to console
    console.log(`[OTP] ${phone}: ${otp}`)

    // Check if user exists
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, role')
      .eq('phone', phone)
      .single()

    res.json({
      success: true,
      message: 'OTP sent successfully',
      isNewUser: !existingProfile,
      // Remove this in production - only for testing
      ...(process.env.NODE_ENV === 'development' && { otp }),
    })
  } catch (error) {
    console.error('Request OTP error:', error)
    res.status(500).json({ success: false, message: 'Failed to send OTP' })
  }
})

/**
 * Step 2: Verify OTP & Login/Register
 * POST /api/auth/verify-otp
 * Body: { phone: "+233XXXXXXXXX", otp: "123456" }
 */
authRouter.post('/verify-otp', async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone and OTP are required',
      })
    }

    // Verify OTP
    const storedOtp = otpStore.get(phone)

    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found. Please request a new one.',
      })
    }

    if (storedOtp.expiresAt < Date.now()) {
      otpStore.delete(phone)
      return res.status(400).json({
        success: false,
        message: 'OTP expired. Please request a new one.',
      })
    }

    if (storedOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.',
      })
    }

    // OTP valid - remove from store
    otpStore.delete(phone)

    // Check if user exists in our profiles table
    let { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('phone', phone)
      .single()

    let userId: string
    let isNewUser = false

    if (!profile) {
      // New user - create Supabase auth user
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        phone,
        phone_confirm: true,
      })

      if (authError) {
        console.error('Create user error:', authError)
        return res.status(500).json({
          success: false,
          message: `Failed to create account: ${authError.message}`,
        })
      }

      userId = authUser.user.id
      isNewUser = true

      // Create profile
      const { error: profileError } = await supabaseAdmin.from('profiles').insert({
        id: userId,
        phone,
        role: 'passenger', // Default role
      })

      if (profileError) {
        console.error('Create profile error:', profileError)
      }

      // Fetch the created profile
      const { data: newProfile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      profile = newProfile
    } else {
      userId = profile.id
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId,
        phone,
        role: profile?.role || 'passenger',
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    // Note: Supabase session is managed separately via the client
    // The user is already created in Supabase auth, and the client
    // can use supabase.auth.signInWithOtp() for direct Supabase auth if needed

    // Determine onboarding status
    let driver = null
    if (profile?.role === 'driver') {
      const { data } = await supabaseAdmin
        .from('drivers')
        .select('*')
        .eq('id', userId)
        .single()
      driver = data
    }

    const onboardingStatus = getOnboardingStatus(profile, driver)

    res.json({
      success: true,
      message: isNewUser ? 'Account created successfully' : 'Login successful',
      token,
      user: {
        id: userId,
        phone: profile?.phone,
        full_name: profile?.full_name,
        role: profile?.role,
        profile_photo: profile?.profile_photo,
        rating: profile?.rating,
      },
      onboardingStatus,
      isNewUser,
    })
  } catch (error) {
    console.error('Verify OTP error:', error)
    res.status(500).json({ success: false, message: 'Verification failed' })
  }
})

/**
 * Step 3: Complete Profile Setup
 * POST /api/auth/setup-profile
 * Body: { full_name: "John Doe", role: "driver" | "passenger" }
 */
authRouter.post('/setup-profile', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    const { full_name, role, profile_photo } = req.body

    if (!full_name || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name and role are required',
      })
    }

    if (!['driver', 'passenger'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be "driver" or "passenger"',
      })
    }

    // Update profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name,
        role,
        profile_photo,
      })
      .eq('id', userId)

    if (profileError) {
      return res.status(400).json({
        success: false,
        message: profileError.message,
      })
    }

    // Create role-specific record
    if (role === 'driver') {
      const { data: existingDriver } = await supabaseAdmin
        .from('drivers')
        .select('id')
        .eq('id', userId)
        .single()

      if (!existingDriver) {
        await supabaseAdmin.from('drivers').insert({ id: userId })
      }
    } else {
      const { data: existingPassenger } = await supabaseAdmin
        .from('passengers')
        .select('id')
        .eq('id', userId)
        .single()

      if (!existingPassenger) {
        await supabaseAdmin.from('passengers').insert({ id: userId })
      }
    }

    // Fetch updated profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    let driver = null
    if (role === 'driver') {
      const { data } = await supabaseAdmin
        .from('drivers')
        .select('*')
        .eq('id', userId)
        .single()
      driver = data
    }

    // Generate new token with updated role
    const token = jwt.sign(
      {
        userId,
        phone: profile?.phone,
        role: profile?.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    const onboardingStatus = getOnboardingStatus(profile, driver)

    res.json({
      success: true,
      message: 'Profile updated successfully',
      token,
      user: {
        id: userId,
        phone: profile?.phone,
        full_name: profile?.full_name,
        role: profile?.role,
        profile_photo: profile?.profile_photo,
        rating: profile?.rating,
      },
      onboardingStatus,
    })
  } catch (error) {
    console.error('Setup profile error:', error)
    res.status(500).json({ success: false, message: 'Profile setup failed' })
  }
})

/**
 * Step 4 (Drivers only): Setup Vehicle
 * POST /api/auth/setup-vehicle
 */
authRouter.post('/setup-vehicle', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    const {
      car_make,
      car_model,
      car_year,
      car_color,
      plate_number,
      seats = 4,
      condition_ac = true,
      condition_quiet = false,
      condition_music = true,
    } = req.body

    if (!car_make || !car_model || !car_year || !car_color || !plate_number) {
      return res.status(400).json({
        success: false,
        message: 'All vehicle details are required',
      })
    }

    const { error } = await supabaseAdmin
      .from('drivers')
      .update({
        car_make,
        car_model,
        car_year,
        car_color,
        plate_number,
        seats: parseInt(seats),
        condition_ac,
        condition_quiet,
        condition_music,
      })
      .eq('id', userId)

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    const { data: driver } = await supabaseAdmin
      .from('drivers')
      .select('*')
      .eq('id', userId)
      .single()

    const onboardingStatus = getOnboardingStatus(profile, driver)

    // Generate fresh token
    const token = jwt.sign(
      {
        userId,
        phone: profile?.phone,
        role: profile?.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.json({
      success: true,
      message: 'Vehicle setup complete',
      token,
      user: {
        id: userId,
        phone: profile?.phone,
        full_name: profile?.full_name,
        role: profile?.role,
        profile_photo: profile?.profile_photo,
        rating: profile?.rating,
      },
      driver,
      onboardingStatus,
    })
  } catch (error) {
    console.error('Setup vehicle error:', error)
    res.status(500).json({ success: false, message: 'Vehicle setup failed' })
  }
})

/**
 * Get current user profile
 * GET /api/auth/me
 */
authRouter.get('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId

    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error || !profile) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    let driver = null
    if (profile.role === 'driver') {
      const { data } = await supabaseAdmin
        .from('drivers')
        .select('*')
        .eq('id', userId)
        .single()
      driver = data
    }

    const onboardingStatus = getOnboardingStatus(profile, driver)

    // Refresh the token on /me call
    const token = jwt.sign(
      {
        userId: profile.id,
        phone: profile.phone,
        role: profile.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.json({
      success: true,
      token,
      user: {
        id: profile.id,
        phone: profile.phone,
        full_name: profile.full_name,
        role: profile.role,
        profile_photo: profile.profile_photo,
        rating: profile.rating,
      },
      driver,
      onboardingStatus,
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ success: false, message: 'Failed to get user' })
  }
})

/**
 * Refresh token
 * POST /api/auth/refresh
 */
authRouter.post('/refresh', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const token = jwt.sign(
      {
        userId,
        phone: profile.phone,
        role: profile.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.json({
      success: true,
      token,
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    res.status(500).json({ success: false, message: 'Token refresh failed' })
  }
})

/**
 * Logout
 * POST /api/auth/logout
 */
authRouter.post('/logout', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  })
})

/**
 * Update user profile
 * PATCH /api/auth/profile
 */
authRouter.patch('/profile', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    const { full_name, profile_photo } = req.body

    // Build update object with only provided fields
    const updateData: Record<string, any> = {}
    if (full_name !== undefined) updateData.full_name = full_name
    if (profile_photo !== undefined) updateData.profile_photo = profile_photo

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update',
      })
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .update(updateData)
      .eq('id', userId)

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }

    // Fetch updated profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: userId,
        phone: profile?.phone,
        full_name: profile?.full_name,
        role: profile?.role,
        profile_photo: profile?.profile_photo,
        rating: profile?.rating,
      },
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ success: false, message: 'Profile update failed' })
  }
})

/**
 * Helper: Determine onboarding status
 */
interface OnboardingStatus {
  isComplete: boolean
  nextStep: 'profile' | 'vehicle' | 'complete'
  redirectTo: string
}

function getOnboardingStatus(profile: any, driver?: any): OnboardingStatus {
  // No profile name = needs profile setup
  if (!profile?.full_name) {
    return {
      isComplete: false,
      nextStep: 'profile',
      redirectTo: '/onboard/profile',
    }
  }

  // Admin users are always complete
  if (profile?.role === 'admin') {
    return {
      isComplete: true,
      nextStep: 'complete',
      redirectTo: '/admin',
    }
  }

  // Driver without vehicle info = needs vehicle setup
  if (profile?.role === 'driver') {
    if (!driver?.car_make || !driver?.plate_number) {
      return {
        isComplete: false,
        nextStep: 'vehicle',
        redirectTo: '/driver/register',
      }
    }
    return {
      isComplete: true,
      nextStep: 'complete',
      redirectTo: '/driver/direction',
    }
  }

  // Passenger complete
  return {
    isComplete: true,
    nextStep: 'complete',
    redirectTo: '/passenger/home',
  }
}
