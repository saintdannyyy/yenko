/**
 * Core types shared between frontend and backend
 */

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
