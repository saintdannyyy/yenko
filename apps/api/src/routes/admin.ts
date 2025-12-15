import { Router, Request, Response } from 'express'
import { supabaseAdmin } from '../supabase/client'
import { verifyToken, requireRole } from '../middleware/auth'

export const adminRouter = Router()

// Get all users
adminRouter.get('/users', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { data: users, error } = await supabaseAdmin
      .from('profiles')
      .select('*')

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, users })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch users' })
  }
})

// Get all drivers
adminRouter.get('/drivers', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { data: drivers, error } = await supabaseAdmin
      .from('drivers')
      .select('*')

    if (error) {
      console.error('Drivers query error:', error)
      return res.status(400).json({ success: false, message: error.message })
    }

    // Get profile data for each driver
    const driversWithProfiles = await Promise.all(
      (drivers || []).map(async (driver) => {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('full_name, phone, profile_photo, rating, role, created_at')
          .eq('id', driver.id)
          .single()

        return {
          ...driver,
          full_name: profile?.full_name || 'Unknown',
          phone: profile?.phone || 'N/A',
          profile_photo: profile?.profile_photo,
          rating: profile?.rating || 5.0,
          role: profile?.role || 'driver',
          created_at: profile?.created_at || driver.created_at,
        }
      })
    )

    res.json({ success: true, drivers: driversWithProfiles })
  } catch (error) {
    console.error('Get drivers error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch drivers' })
  }
})

// Get all trips
adminRouter.get('/trips', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { data: trips, error } = await supabaseAdmin
      .from('rides')
      .select('*')

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, trips })
  } catch (error) {
    console.error('Get trips error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch trips' })
  }
})

// Verify driver
adminRouter.post('/verify-driver', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { driver_id } = req.body

    const { error } = await supabaseAdmin
      .from('drivers')
      .update({ verified: true })
      .eq('id', driver_id)

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, message: 'Driver verified' })
  } catch (error) {
    console.error('Verify driver error:', error)
    res.status(500).json({ success: false, message: 'Verification failed' })
  }
})

// Get analytics
adminRouter.get('/analytics', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { data: ridesData } = await supabaseAdmin
      .from('rides')
      .select('*')

    const { data: usersData } = await supabaseAdmin
      .from('profiles')
      .select('*')

    const completedRides = ridesData?.filter((r) => r.status === 'completed').length || 0
    const totalRevenue = ridesData?.reduce((sum, ride) => sum + (ride.final_price || 0), 0) || 0

    res.json({
      success: true,
      analytics: {
        totalUsers: usersData?.length || 0,
        completedRides,
        totalRevenue,
        averageRidePrice: completedRides > 0 ? (totalRevenue / completedRides).toFixed(2) : 0,
      },
    })
  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' })
  }
})

// Get waitlist entries
adminRouter.get('/waitlist', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { data: waitlist, error } = await supabaseAdmin
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, waitlist })
  } catch (error) {
    console.error('Get waitlist error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch waitlist' })
  }
})

// Suspend/unsuspend user
adminRouter.post('/suspend-user', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { user_id, suspend } = req.body

    if (!user_id) {
      return res.status(400).json({ success: false, message: 'user_id is required' })
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ suspended: suspend })
      .eq('id', user_id)

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({
      success: true,
      message: suspend ? 'User suspended' : 'User activated',
    })
  } catch (error) {
    console.error('Suspend user error:', error)
    res.status(500).json({ success: false, message: 'Failed to suspend user' })
  }
})

// Delete user
adminRouter.delete('/delete-user/:id', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { error } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', id)

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, message: 'User deleted' })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ success: false, message: 'Failed to delete user' })
  }
})

// Get user details
adminRouter.get('/user/:id', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { data: user, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    // Get user's trips if they're a passenger
    const { data: trips } = await supabaseAdmin
      .from('rides')
      .select('*')
      .eq('passenger_id', id)

    // Get driver info if they're a driver
    const { data: driverInfo } = await supabaseAdmin
      .from('drivers')
      .select('*')
      .eq('id', id)
      .single()

    res.json({
      success: true,
      user,
      trips: trips || [],
      driverInfo: driverInfo || null,
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch user details' })
  }
})

// Get recent activity
adminRouter.get('/recent-activity', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { data: recentRides } = await supabaseAdmin
      .from('rides')
      .select('*, passenger:passenger_id(full_name), driver:driver_id(full_name)')
      .order('created_at', { ascending: false })
      .limit(10)

    const { data: recentUsers } = await supabaseAdmin
      .from('profiles')
      .select('full_name, role, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    res.json({
      success: true,
      recentRides: recentRides || [],
      recentUsers: recentUsers || [],
    })
  } catch (error) {
    console.error('Recent activity error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch activity' })
  }
})

// Get detailed analytics with time-based data
adminRouter.get('/analytics/detailed', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query

    let query = supabaseAdmin.from('rides').select('*')

    if (from) {
      query = query.gte('created_at', from)
    }
    if (to) {
      query = query.lte('created_at', to)
    }

    const { data: ridesData } = await query
    const { data: usersData } = await supabaseAdmin.from('profiles').select('*')
    const { data: driversData } = await supabaseAdmin.from('drivers').select('*')

    const completedRides = ridesData?.filter((r) => r.status === 'completed') || []
    const pendingRides = ridesData?.filter((r) => r.status === 'pending') || []
    const cancelledRides = ridesData?.filter((r) => r.status === 'cancelled') || []
    
    const totalRevenue = completedRides.reduce((sum, ride) => sum + (ride.final_price || 0), 0)
    const verifiedDrivers = driversData?.filter((d) => d.verified).length || 0
    const premiumDrivers = driversData?.filter((d) => d.is_premium).length || 0

    // Calculate daily revenue for the last 7 days
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const dayRides = completedRides.filter((r) => 
        r.created_at.startsWith(dateStr)
      )
      
      last7Days.push({
        date: dateStr,
        revenue: dayRides.reduce((sum, r) => sum + (r.final_price || 0), 0),
        rides: dayRides.length,
      })
    }

    res.json({
      success: true,
      analytics: {
        totalUsers: usersData?.length || 0,
        totalDrivers: driversData?.length || 0,
        verifiedDrivers,
        premiumDrivers,
        totalRides: ridesData?.length || 0,
        completedRides: completedRides.length,
        pendingRides: pendingRides.length,
        cancelledRides: cancelledRides.length,
        totalRevenue,
        averageRidePrice: completedRides.length > 0 ? (totalRevenue / completedRides.length).toFixed(2) : 0,
        completionRate: ridesData?.length ? ((completedRides.length / ridesData.length) * 100).toFixed(1) : 0,
        last7Days,
      },
    })
  } catch (error) {
    console.error('Detailed analytics error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch detailed analytics' })
  }
})

// Promote user to admin (superadmin only - requires special header)
adminRouter.post('/promote-admin', verifyToken, async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body
    const superAdminKey = req.headers['x-super-admin-key']

    // Check for super admin key (set in env)
    if (superAdminKey !== process.env.SUPER_ADMIN_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Super admin key required',
      })
    }

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: 'user_id is required',
      })
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', user_id)

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({
      success: true,
      message: 'User promoted to admin successfully',
    })
  } catch (error) {
    console.error('Promote admin error:', error)
    res.status(500).json({ success: false, message: 'Failed to promote user' })
  }
})
