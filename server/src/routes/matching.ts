import { Router, Request, Response } from 'express'
import type { Router as ExpressRouter } from 'express'
import { supabaseAdmin } from '../supabase/client'

export const matchingRouter: ExpressRouter = Router()

// Find matching drivers
matchingRouter.post('/find-drivers', async (req: Request, res: Response) => {
  try {
    const { pickup, destination, desiredTime, rideType = 'BASIC' } = req.body

    // In production, implement full matching algorithm:
    // 1. Parse passenger polyline
    // 2. Query driver_routes within time window
    // 3. Compute overlap, proximity, and match scores
    // 4. Return top N drivers with price breakdown

    const isPremium = rideType === 'PREMIUM'
    const baseFare = 3.0
    const perKm = isPremium ? 1.8 : 1.2
    const distanceKm = 20
    const computedPrice = baseFare + perKm * distanceKm

    // Mock response
    const mockDrivers = [
      {
        driverId: 'driver1',
        name: 'John Doe',
        carModel: 'Toyota Corolla 2020',
        carPhotoUrl: '/assets/car1.jpg',
        seatsAvailable: 2,
        conditions: { ac: true, quiet: false, music: true },
        isPremium: false,
        computedPrice,
        priceBreakdown: {
          base: baseFare,
          perKm,
          distanceKm,
        },
        etaToPickupMinutes: 8,
        matchScore: 92,
        rating: 4.8,
      },
    ]

    res.json({
      success: true,
      drivers: mockDrivers,
    })
  } catch (error) {
    console.error('Matching error:', error)
    res.status(500).json({ success: false, message: 'Matching failed' })
  }
})

// Calculate distance and route
matchingRouter.post('/calculate-route', async (req: Request, res: Response) => {
  try {
    const { pickup, destination } = req.body

    // Mock route calculation
    const distanceKm = 20
    const durationMinutes = 45

    res.json({
      success: true,
      distance: distanceKm,
      duration: durationMinutes,
    })
  } catch (error) {
    console.error('Calculate route error:', error)
    res.status(500).json({ success: false, message: 'Calculation failed' })
  }
})
