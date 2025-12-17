import { Router, Request, Response } from 'express'
import type { Router as ExpressRouter } from 'express'
import { supabaseAdmin } from '../supabase/client'
import { verifyToken } from '../middleware/auth'

export const passengerRouter: ExpressRouter = Router()

// Get drivers for passenger search
passengerRouter.get('/drivers', async (req: Request, res: Response) => {
  try {
    const { pickup, destination, rideType = 'BASIC' } = req.query

    // Mock driver data for MVP
    const mockDrivers = [
      {
        id: 'driver1',
        name: 'John Doe',
        rating: 4.8,
        carModel: 'Toyota Corolla 2020',
        isPremium: false,
        computedPrice: 27.0,
        seatsAvailable: 2,
        conditions: { ac: true, quiet: false, music: true },
        etaMinutes: 8,
        distance: 0.5,
      },
      {
        id: 'driver2',
        name: 'Jane Smith',
        rating: 4.9,
        carModel: 'Honda Civic 2021',
        isPremium: true,
        computedPrice: 35.5,
        seatsAvailable: 3,
        conditions: { ac: true, quiet: true, music: false },
        etaMinutes: 12,
        distance: 0.8,
      },
      {
        id: 'driver3',
        name: 'Kwame Asante',
        rating: 4.7,
        carModel: 'Hyundai Elantra 2019',
        isPremium: false,
        computedPrice: 26.5,
        seatsAvailable: 1,
        conditions: { ac: true, quiet: false, music: true },
        etaMinutes: 5,
        distance: 0.3,
      },
    ]

    res.json({
      success: true,
      drivers: mockDrivers,
    })
  } catch (error) {
    console.error('Get drivers error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch drivers' })
  }
})

// Estimate trip price
passengerRouter.post('/trip/estimate', async (req: Request, res: Response) => {
  try {
    const { pickup, destination, rideType = 'BASIC' } = req.body

    // Mock estimation
    const baseFare = 3.0
    const perKm = rideType === 'PREMIUM' ? 1.8 : 1.2
    const distanceKm = 20

    const estimatedPrice = baseFare + perKm * distanceKm

    res.json({
      success: true,
      estimate: {
        baseFare,
        perKm,
        distanceKm,
        estimatedPrice,
      },
    })
  } catch (error) {
    console.error('Estimate error:', error)
    res.status(500).json({ success: false, message: 'Estimation failed' })
  }
})

// Request a ride
passengerRouter.post('/trip/request', verifyToken, async (req: Request, res: Response) => {
  try {
    const { driverId, pickup, destination, price, paystackRef } = req.body
    const passengerId = req.userId

    // Create ride record
    const { data: ride, error } = await supabaseAdmin
      .from('rides')
      .insert({
        passenger_id: passengerId,
        driver_id: driverId,
        pickup: { address: pickup },
        destination: { address: destination },
        distance_km: 20,
        estimated_price: price,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({
      success: true,
      ride,
      message: 'Ride requested',
    })
  } catch (error) {
    console.error('Request ride error:', error)
    res.status(500).json({ success: false, message: 'Request failed' })
  }
})

// Get trip details
passengerRouter.get('/trip/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { data: ride, error } = await supabaseAdmin
      .from('rides')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return res.status(404).json({ success: false, message: 'Trip not found' })
    }

    res.json({ success: true, trip: ride })
  } catch (error) {
    console.error('Get trip error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch trip' })
  }
})

// Rate trip
passengerRouter.post('/trip/:id/rate', verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { rating, comment } = req.body
    const passengerId = req.userId

    // Get ride details
    const { data: ride } = await supabaseAdmin
      .from('rides')
      .select('driver_id')
      .eq('id', id)
      .single()

    if (!ride) {
      return res.status(404).json({ success: false, message: 'Trip not found' })
    }

    // Create rating
    const { error } = await supabaseAdmin.from('ratings').insert({
      ride_id: id,
      driver_id: ride.driver_id,
      passenger_id: passengerId,
      rating,
      comment,
    })

    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    res.json({ success: true, message: 'Rating submitted' })
  } catch (error) {
    console.error('Rate error:', error)
    res.status(500).json({ success: false, message: 'Rating failed' })
  }
})
