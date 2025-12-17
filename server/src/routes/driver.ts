import { Router, Request, Response } from 'express'
import { supabaseAdmin } from '../supabase/client'
import { verifyToken } from '../middleware/auth'

export const driverRouter = Router()

// Update driver profile
driverRouter.post('/profile', verifyToken, async (req: Request, res: Response) => {
  try {
    const driverId = req.userId
    const { car_make, car_model, car_year, car_color, plate_number, seats, condition_ac, condition_quiet, condition_music, is_premium } = req.body

    const { error } = await supabaseAdmin
      .from('drivers')
      .update({
        car_make,
        car_model,
        car_year,
        car_color,
        plate_number,
        seats,
        condition_ac: condition_ac === 'true' || condition_ac === true,
        condition_quiet: condition_quiet === 'true' || condition_quiet === true,
        condition_music: condition_music === 'true' || condition_music === true,
        is_premium: is_premium === 'true' || is_premium === true,
      })
      .eq('id', driverId)

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, message: 'Profile updated' })
  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({ success: false, message: 'Update failed' })
  }
})

// Post driver direction/route
driverRouter.post('/set-direction', verifyToken, async (req: Request, res: Response) => {
  try {
    const driverId = req.userId
    const { startLocation, endLocation, departureTime, seats } = req.body

    // Mock polyline generation
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
      })

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, message: 'Route posted' })
  } catch (error) {
    console.error('Set direction error:', error)
    res.status(500).json({ success: false, message: 'Failed to post route' })
  }
})

// Get incoming requests
driverRouter.get('/requests', verifyToken, async (req: Request, res: Response) => {
  try {
    const driverId = req.userId

    // Get pending rides assigned to driver
    const { data: requests, error } = await supabaseAdmin
      .from('rides')
      .select('*, passenger:passenger_id(full_name, rating)')
      .eq('driver_id', driverId)
      .in('status', ['pending', 'driver_assigned'])

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({
      success: true,
      requests: requests || [],
    })
  } catch (error) {
    console.error('Get requests error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch requests' })
  }
})

// Accept a ride
driverRouter.post('/accept', verifyToken, async (req: Request, res: Response) => {
  try {
    const driverId = req.userId
    const { ride_id } = req.body

    const { error } = await supabaseAdmin
      .from('rides')
      .update({ status: 'driver_assigned' })
      .eq('id', ride_id)
      .eq('driver_id', driverId)

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, message: 'Ride accepted' })
  } catch (error) {
    console.error('Accept error:', error)
    res.status(500).json({ success: false, message: 'Accept failed' })
  }
})

// Start trip
driverRouter.post('/start', verifyToken, async (req: Request, res: Response) => {
  try {
    const driverId = req.userId
    const { ride_id } = req.body

    const { error } = await supabaseAdmin
      .from('rides')
      .update({ status: 'started', started_at: new Date().toISOString() })
      .eq('id', ride_id)
      .eq('driver_id', driverId)

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, message: 'Trip started' })
  } catch (error) {
    console.error('Start trip error:', error)
    res.status(500).json({ success: false, message: 'Failed to start trip' })
  }
})

// End trip
driverRouter.post('/end', verifyToken, async (req: Request, res: Response) => {
  try {
    const driverId = req.userId
    const { ride_id } = req.body

    const { error } = await supabaseAdmin
      .from('rides')
      .update({
        status: 'completed',
        ended_at: new Date().toISOString(),
        trip_code: Math.random().toString().slice(2, 6).padEnd(4, '0').toUpperCase(),
      })
      .eq('id', ride_id)
      .eq('driver_id', driverId)

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, message: 'Trip completed' })
  } catch (error) {
    console.error('End trip error:', error)
    res.status(500).json({ success: false, message: 'Failed to end trip' })
  }
})

// Get driver earnings
driverRouter.get('/earnings', verifyToken, async (req: Request, res: Response) => {
  try {
    const driverId = req.userId

    // Get completed rides
    const { data: rides } = await supabaseAdmin
      .from('rides')
      .select('final_price')
      .eq('driver_id', driverId)
      .eq('status', 'completed')

    const total = rides?.reduce((sum, ride) => sum + (ride.final_price || 0), 0) || 0
    const thisWeek = (total * 0.2).toFixed(2)
    const thisMonth = (total * 0.8).toFixed(2)

    res.json({
      success: true,
      total: parseFloat(total.toFixed(2)),
      thisWeek: parseFloat(thisWeek),
      thisMonth: parseFloat(thisMonth),
      trips: rides?.length || 0,
      rating: 4.8,
    })
  } catch (error) {
    console.error('Earnings error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch earnings' })
  }
})
