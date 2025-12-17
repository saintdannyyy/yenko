/**
 * Core types shared between frontend and backend
 */

import type { Request } from 'express'

// User types
export type UserRole = 'driver' | 'passenger' | 'admin'

export interface User {
  id: string
  full_name: string
  phone: string
  role: UserRole
  profile_photo?: string
  rating?: number
  created_at: string
}

export interface Driver extends User {
  car_make: string
  car_model: string
  car_year: string
  car_color: string
  plate_number: string
  is_premium: boolean
  seats: number
  condition_ac: boolean
  condition_quiet: boolean
  condition_music: boolean
  verified: boolean
  current_lat?: number
  current_lng?: number
}

export interface Passenger extends User {
  preferred_payment?: PaymentProvider
}

// Location & Ride types
export interface Location {
  address: string
  lat?: number
  lng?: number
}

export type RideStatus =
  | 'pending'
  | 'driver_assigned'
  | 'en_route'
  | 'arrived'
  | 'started'
  | 'completed'
  | 'cancelled'

export interface Ride {
  id: string
  passenger_id: string
  driver_id: string
  pickup: Location
  destination: Location
  distance_km: number
  estimated_price: number
  final_price?: number
  is_premium: boolean
  status: RideStatus
  trip_code?: string
  created_at: string
  started_at?: string
  ended_at?: string
}

export interface DriverRoute {
  id: string
  driver_id: string
  start_location: Location
  end_location: Location
  polyline: string
  departure_time: string
  seats: number
  created_at: string
}

// Payment types
export type PaymentProvider = 'paystack' | 'momo'
export type PaymentStatus = 'pending' | 'paid' | 'failed'

export interface Payment {
  id: string
  ride_id: string
  passenger_id: string
  amount: number
  provider: PaymentProvider
  reference: string
  status: PaymentStatus
  created_at: string
}

// Rating types
export interface Rating {
  id: string
  ride_id: string
  driver_id: string
  passenger_id: string
  rating: number
  comment?: string
  created_at: string
}

// Waitlist types
export interface WaitlistEntry {
  id: string
  email?: string
  phone?: string
  role: 'driver' | 'passenger'
  city?: string
  created_at: string
}

// ============================================
// API Request/Response Types
// ============================================

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

// Express request extensions
export interface AuthenticatedRequest extends Request {
  userId?: string
}

// Driver route-specific types
export interface UpdateProfileRequest {
  car_make: string
  car_model: string
  car_year?: string
  car_color?: string
  plate_number: string
  seats?: number
  condition_ac?: boolean | string
  condition_quiet?: boolean | string
  condition_music?: boolean | string
  is_premium?: boolean | string
}

export interface SetDirectionRequest {
  start_location: Location
  end_location: Location
  polyline?: string
  departure_time: string
  seats: number
}

export interface RideActionRequest {
  ride_id: string
}

export interface Earnings {
  total: number
  thisWeek: number
  thisMonth: number
  trips: number
  rating: number
}
