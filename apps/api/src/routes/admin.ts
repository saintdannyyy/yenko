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
      .select('*, profile:id(full_name, phone, profile_photo, rating)')

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, drivers })
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
