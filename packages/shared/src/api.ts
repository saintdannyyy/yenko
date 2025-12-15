/**
 * API request/response types shared between frontend and backend
 */

import type { User, Driver, Ride, Location, Rating, Payment, DriverRoute, WaitlistEntry } from './types'

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
}

// Auth endpoints
export interface LoginRequest {
  contact: string // phone or email
}

export interface VerifyOtpRequest {
  contact: string
  otp: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: User
}

export interface SetupProfileRequest {
  full_name: string
  role: 'driver' | 'passenger'
  profile_photo?: string
}

// Driver endpoints
export interface DriverSetupRequest {
  car_make: string
  car_model: string
  car_year: string
  car_color: string
  plate_number: string
  seats: number
  condition_ac: boolean
  condition_quiet: boolean
  condition_music: boolean
}

export interface UpdateLocationRequest {
  lat: number
  lng: number
}

export interface CreateRouteRequest {
  start_location: Location
  end_location: Location
  polyline: string
  departure_time: string
  seats: number
}

export interface DriverListResponse extends ApiResponse<Driver[]> {}

// Passenger endpoints
export interface RideRequestPayload {
  pickup: Location
  destination: Location
  is_premium: boolean
}

export interface RideResponse extends ApiResponse<Ride> {}

export interface RideListResponse extends ApiResponse<Ride[]> {}

// Matching endpoints
export interface MatchRequest {
  pickup: Location
  destination: Location
  is_premium?: boolean
}

export interface MatchedDriver {
  driver: Driver
  route?: DriverRoute
  distance_km: number
  estimated_price: number
  eta_minutes: number
}

export interface MatchResponse extends ApiResponse<MatchedDriver[]> {}

// Payment endpoints
export interface InitiatePaymentRequest {
  ride_id: string
  amount: number
  email?: string
}

export interface PaymentResponse extends ApiResponse<{
  authorization_url: string
  reference: string
}> {}

export interface VerifyPaymentRequest {
  reference: string
}

// Rating endpoints
export interface CreateRatingRequest {
  ride_id: string
  rating: number
  comment?: string
}

export interface RatingResponse extends ApiResponse<Rating> {}

// Admin endpoints
export interface AdminStatsResponse extends ApiResponse<{
  total_users: number
  total_drivers: number
  total_passengers: number
  total_rides: number
  completed_rides: number
  total_revenue: number
}> {}

export interface AdminUsersResponse extends PaginatedResponse<User> {}

export interface AdminDriversResponse extends PaginatedResponse<Driver> {}

export interface AdminRidesResponse extends PaginatedResponse<Ride> {}

// Waitlist endpoints
export interface WaitlistRequest {
  name: string
  phone: string
  email?: string
  area: string
  role: 'driver' | 'passenger'
}

export interface WaitlistStatsResponse extends ApiResponse<{ total: number }> {}

export interface WaitlistResponse extends ApiResponse<WaitlistEntry> {}
