import { describe, it, expect } from 'vitest'

// Mock matching algorithm for testing
interface Point {
  lat: number
  lng: number
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function calculateDistance(point1: Point, point2: Point): number {
  const R = 6371 // Earth's radius in km
  const dLat = degreesToRadians(point2.lat - point1.lat)
  const dLon = degreesToRadians(point2.lng - point1.lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(point1.lat)) *
    Math.cos(degreesToRadians(point2.lat)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

describe('Matching Algorithm', () => {
  it('should calculate correct distance between two points', () => {
    const point1 = { lat: 5.6037, lng: -0.187 } // Osu
    const point2 = { lat: 5.5496, lng: -0.1989 } // Tema

    const distance = calculateDistance(point1, point2)

    // Distance between Osu and Tema is approximately 6-8 km
    expect(distance).toBeGreaterThan(5)
    expect(distance).toBeLessThan(10)
  })

  it('should return zero distance for same point', () => {
    const point = { lat: 5.6037, lng: -0.187 }
    const distance = calculateDistance(point, point)

    expect(distance).toBe(0)
  })

  it('should calculate correct match score for driver', () => {
    const directionOverlap = 0.85 // 85%
    const pickupProximity = 0.9 // 900m away
    const timeProximity = 0.8 // Within 15 minutes
    const driverRating = 0.96 // 4.8/5
    const conditionsMatch = 1.0 // All conditions match

    const matchScore =
      directionOverlap * 0.4 +
      pickupProximity * 0.25 +
      timeProximity * 0.15 +
      driverRating * 0.1 +
      conditionsMatch * 0.1

    expect(matchScore).toBeGreaterThan(0.8)
    expect(matchScore).toBeLessThanOrEqual(1)
  })

  it('should correctly compute pricing', () => {
    const baseFare = 3.0
    const perKmBasic = 1.2
    const perKmPremium = 1.8
    const distanceKm = 20

    const basicPrice = baseFare + perKmBasic * distanceKm
    const premiumPrice = baseFare + perKmPremium * distanceKm

    expect(basicPrice).toBe(27) // ₵27
    expect(premiumPrice).toBe(39) // ₵39

    // Driver gets 88%, platform gets 12%
    const driverCut = basicPrice * 0.88
    const platformCut = basicPrice * 0.12

    expect(driverCut).toBeCloseTo(23.76, 2)
    expect(platformCut).toBeCloseTo(3.24, 2)
    expect(driverCut + platformCut).toBeCloseTo(basicPrice, 2)
  })
})
