import { Router, Response, NextFunction } from 'express'
import type { Router as ExpressRouter } from 'express'
import { supabaseAdmin } from '../supabase/client.js'
import { verifyToken } from '../middleware/auth.js'
import type {
  AuthenticatedRequest,
  UpdateProfileRequest,
  SetDirectionRequest,
  RideActionRequest,
  RideResponse,
  Earnings,
} from '../types/index.js'

export const driverRouter: ExpressRouter = Router()

// Helper function to convert string booleans
const toBoolean = (value: boolean | string): boolean => {
  return value === 'true' || value === true
}

// Update driver profile
driverRouter.post(
  '/profile',
  verifyToken,
  async (
    req: AuthenticatedRequest & { body: UpdateProfileRequest },
    res: Response
  ): Promise<void> => {
    try {
      const driverId = req.userId
      if (!driverId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const {
        car_make,
        car_model,
        car_year,
        car_color,
        plate_number,
        seats,
        condition_ac,
        condition_quiet,
        condition_music,
        is_premium,
      } = req.body

      // Validate required fields
      if (!car_make || !car_model || !plate_number) {
        res
          .status(400)
          .json({ success: false, message: 'Missing required fields' })
        return
      }

      const { error } = await supabaseAdmin
        .from('drivers')
        .update({
          car_make,
          car_model,
          car_year,
          car_color,
          plate_number,
          seats,
          condition_ac: toBoolean(condition_ac),
          condition_quiet: toBoolean(condition_quiet),
          condition_music: toBoolean(condition_music),
          is_premium: toBoolean(is_premium),
          updated_at: new Date().toISOString(),
        })
        .eq('id', driverId)

      if (error) {
        res.status(400).json({ success: false, message: error.message })
        return
      }

      res.json({ success: true, message: 'Profile updated successfully' })
    } catch (error) {
      console.error('Profile update error:', error)
      res.status(500).json({ success: false, message: 'Update failed' })
    }
  }
)

// Post driver direction/route
driverRouter.post(
  '/set-direction',
  verifyToken,
  async (
    req: AuthenticatedRequest & { body: SetDirectionRequest },
    res: Response
  ): Promise<void> => {
    try {
      const driverId = req.userId
      if (!driverId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const { startLocation, endLocation, departureTime, seats } = req.body

      // Validate required fields
      if (!startLocation || !endLocation || !departureTime) {
        res
          .status(400)
          .json({ success: false, message: 'Missing required fields' })
        return
      }

      // Mock polyline generation (TODO: integrate with real geocoding service)
      const mockPolyline = 'mock_polyline_data'

      const { error } = await supabaseAdmin
        .from('driver_routes')
        .insert({
          driver_id: driverId,
          start_location: { address: startLocation },
          end_location: { address: endLocation },
          polyline: mockPolyline,
          departure_time: departureTime,
          seats,
          created_at: new Date().toISOString(),
        })

      if (error) {
        res.status(400).json({ success: false, message: error.message })
        return
      }

      res.json({ success: true, message: 'Route posted successfully' })
    } catch (error) {
      console.error('Set direction error:', error)
      res.status(500).json({ success: false, message: 'Failed to post route' })
    }
  }
)

// Get incoming requests
driverRouter.get(
  '/requests',
  verifyToken,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const driverId = req.userId
      if (!driverId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      // Get pending rides assigned to driver
      const { data: requests, error } = await supabaseAdmin
        .from('rides')
        .select('*, passenger:passenger_id(full_name, rating)')
        .eq('driver_id', driverId)
        .in('status', ['pending', 'driver_assigned'])
        .order('created_at', { ascending: false })

      if (error) {
        res.status(400).json({ success: false, message: error.message })
        return
      }

      res.json({
        success: true,
        requests: (requests as RideResponse[]) || [],
      })
    } catch (error) {
      console.error('Get requests error:', error)
      res.status(500).json({ success: false, message: 'Failed to fetch requests' })
    }
  }
)

// Accept a ride
driverRouter.post(
  '/accept',
  verifyToken,
  async (
    req: AuthenticatedRequest & { body: RideActionRequest },
    res: Response
  ): Promise<void> => {
    try {
      const driverId = req.userId
      if (!driverId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const { ride_id } = req.body

      if (!ride_id) {
        res.status(400).json({ success: false, message: 'ride_id is required' })
        return
      }

      const { error } = await supabaseAdmin
        .from('rides')
        .update({
          status: 'driver_assigned',
          assigned_at: new Date().toISOString(),
        })
        .eq('id', ride_id)
        .eq('driver_id', driverId)

      if (error) {
        res.status(400).json({ success: false, message: error.message })
        return
      }

      res.json({ success: true, message: 'Ride accepted successfully' })
    } catch (error) {
      console.error('Accept error:', error)
      res.status(500).json({ success: false, message: 'Accept failed' })
    }
  }
)

// Start trip
driverRouter.post(
  '/start',
  verifyToken,
  async (
    req: AuthenticatedRequest & { body: RideActionRequest },
    res: Response
  ): Promise<void> => {
    try {
      const driverId = req.userId
      if (!driverId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const { ride_id } = req.body

      if (!ride_id) {
        res.status(400).json({ success: false, message: 'ride_id is required' })
        return
      }

      const { error } = await supabaseAdmin
        .from('rides')
        .update({
          status: 'started',
          started_at: new Date().toISOString(),
        })
        .eq('id', ride_id)
        .eq('driver_id', driverId)

      if (error) {
        res.status(400).json({ success: false, message: error.message })
        return
      }

      res.json({ success: true, message: 'Trip started successfully' })
    } catch (error) {
      console.error('Start trip error:', error)
      res.status(500).json({ success: false, message: 'Failed to start trip' })
    }
  }
)

// End trip
driverRouter.post(
  '/end',
  verifyToken,
  async (
    req: AuthenticatedRequest & { body: RideActionRequest },
    res: Response
  ): Promise<void> => {
    try {
      const driverId = req.userId
      if (!driverId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const { ride_id } = req.body

      if (!ride_id) {
        res.status(400).json({ success: false, message: 'ride_id is required' })
        return
      }

      // Generate 4-character trip code
      const tripCode = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()
        .padEnd(4, '0')

      const { error } = await supabaseAdmin
        .from('rides')
        .update({
          status: 'completed',
          ended_at: new Date().toISOString(),
          trip_code: tripCode,
        })
        .eq('id', ride_id)
        .eq('driver_id', driverId)

      if (error) {
        res.status(400).json({ success: false, message: error.message })
        return
      }

      res.json({
        success: true,
        message: 'Trip completed successfully',
        tripCode,
      })
    } catch (error) {
      console.error('End trip error:', error)
      res.status(500).json({ success: false, message: 'Failed to end trip' })
    }
  }
)

// Get driver earnings
driverRouter.get(
  '/earnings',
  verifyToken,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const driverId = req.userId
      if (!driverId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      // Get completed rides for this week
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)

      const { data: allRides } = await supabaseAdmin
        .from('rides')
        .select('final_price, completed_at')
        .eq('driver_id', driverId)
        .eq('status', 'completed')

      const { data: weekRides } = await supabaseAdmin
        .from('rides')
        .select('final_price')
        .eq('driver_id', driverId)
        .eq('status', 'completed')
        .gte('completed_at', weekAgo.toISOString())

      const total =
        allRides?.reduce((sum: number, ride: any) => sum + (ride.final_price || 0), 0) ||
        0
      const thisWeek =
        weekRides?.reduce((sum: number, ride: any) => sum + (ride.final_price || 0), 0) ||
        0

      const earnings: Earnings = {
        total: parseFloat(total.toFixed(2)),
        thisWeek: parseFloat(thisWeek.toFixed(2)),
        thisMonth: parseFloat((total * 0.8).toFixed(2)),
        trips: allRides?.length || 0,
        rating: 4.8, // TODO: calculate from ratings table
      }

      res.json({
        success: true,
        earnings,
      })
    } catch (error) {
      console.error('Earnings error:', error)
      res
        .status(500)
        .json({ success: false, message: 'Failed to fetch earnings' })
    }
  }
)
