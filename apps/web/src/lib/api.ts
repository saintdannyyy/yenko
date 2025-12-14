import { useAuthStore } from '@/store/authStore'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Types
export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
}

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

// Core fetch wrapper
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = useAuthStore.getState().token

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    // Handle token expiry
    if (data.code === 'TOKEN_EXPIRED' || response.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/auth/login'
    }
    throw new ApiError(data.message || 'Request failed', response.status, data.code)
  }

  return data
}

// HTTP methods
export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
}

// ============================================
// AUTH API
// ============================================

export interface RequestOtpResponse {
  success: boolean
  message: string
  isNewUser: boolean
  otp?: string // Only in development
}

export interface VerifyOtpResponse {
  success: boolean
  message: string
  token: string
  user: {
    id: string
    phone: string
    full_name: string | null
    role: 'driver' | 'passenger' | 'admin'
    profile_photo: string | null
    rating: number | null
  }
  onboardingStatus: {
    isComplete: boolean
    nextStep: 'profile' | 'vehicle' | 'complete'
    redirectTo: string
  }
  isNewUser: boolean
}

export interface SetupProfileResponse {
  success: boolean
  message: string
  token: string
  user: {
    id: string
    phone: string
    full_name: string
    role: 'driver' | 'passenger' | 'admin'
    profile_photo: string | null
    rating: number | null
  }
  onboardingStatus: {
    isComplete: boolean
    nextStep: 'profile' | 'vehicle' | 'complete'
    redirectTo: string
  }
}

export interface SetupVehicleResponse {
  success: boolean
  message: string
  token: string
  user: {
    id: string
    phone: string
    full_name: string
    role: 'driver' | 'passenger' | 'admin'
    profile_photo: string | null
    rating: number | null
  }
  driver: {
    id: string
    car_make: string
    car_model: string
    car_year: string
    car_color: string
    plate_number: string
    seats: number
    condition_ac: boolean
    condition_quiet: boolean
    condition_music: boolean
    verified: boolean
    is_premium: boolean
  }
  onboardingStatus: {
    isComplete: boolean
    nextStep: 'profile' | 'vehicle' | 'complete'
    redirectTo: string
  }
}

export interface MeResponse {
  success: boolean
  token: string
  user: {
    id: string
    phone: string
    full_name: string | null
    role: 'driver' | 'passenger' | 'admin'
    profile_photo: string | null
    rating: number | null
  }
  driver: {
    id: string
    car_make: string | null
    car_model: string | null
    car_year: string | null
    car_color: string | null
    plate_number: string | null
    seats: number
    condition_ac: boolean
    condition_quiet: boolean
    condition_music: boolean
    verified: boolean
    is_premium: boolean
  } | null
  onboardingStatus: {
    isComplete: boolean
    nextStep: 'profile' | 'vehicle' | 'complete'
    redirectTo: string
  }
}

export const authApi = {
  /**
   * Request OTP for phone number
   */
  requestOtp: (phone: string) =>
    api.post<RequestOtpResponse>('/auth/request-otp', { phone }),

  /**
   * Verify OTP and login/register
   */
  verifyOtp: (phone: string, otp: string) =>
    api.post<VerifyOtpResponse>('/auth/verify-otp', { phone, otp }),

  /**
   * Setup user profile (name, role)
   */
  setupProfile: (data: { full_name: string; role: 'driver' | 'passenger' }) =>
    api.post<SetupProfileResponse>('/auth/setup-profile', data),

  /**
   * Setup vehicle (drivers only)
   */
  setupVehicle: (data: {
    car_make: string
    car_model: string
    car_year: string
    car_color: string
    plate_number: string
    seats: number
    condition_ac?: boolean
    condition_quiet?: boolean
    condition_music?: boolean
  }) => api.post<SetupVehicleResponse>('/auth/setup-vehicle', data),

  /**
   * Get current user
   */
  me: () => api.get<MeResponse>('/auth/me'),

  /**
   * Refresh token
   */
  refresh: () => api.post<{ success: boolean; token: string }>('/auth/refresh'),

  /**
   * Logout
   */
  logout: () => api.post<{ success: boolean; message: string }>('/auth/logout'),
}

// ============================================
// DRIVER API
// ============================================

export const driverApi = {
  /**
   * Post a new route
   */
  setDirection: (data: {
    startLocation: string
    endLocation: string
    departureTime: string
    seats: number
  }) => api.post('/driver/set-direction', data),

  /**
   * Get incoming ride requests
   */
  getRequests: () => api.get('/driver/requests'),

  /**
   * Accept a ride request
   */
  acceptRide: (rideId: string) => api.post('/driver/accept', { ride_id: rideId }),

  /**
   * Decline a ride request
   */
  declineRide: (rideId: string) => api.post('/driver/decline', { ride_id: rideId }),

  /**
   * Start a trip (with trip code verification)
   */
  startTrip: (rideId: string, tripCode: string) =>
    api.post('/driver/start-trip', { ride_id: rideId, trip_code: tripCode }),

  /**
   * Complete a trip
   */
  completeTrip: (rideId: string) => api.post('/driver/complete-trip', { ride_id: rideId }),

  /**
   * Update current location
   */
  updateLocation: (lat: number, lng: number) =>
    api.post('/driver/location', { lat, lng }),

  /**
   * Get earnings summary
   */
  getEarnings: () => api.get('/driver/earnings'),
}

// ============================================
// PASSENGER API
// ============================================

export const passengerApi = {
  /**
   * Search for available drivers
   */
  searchDrivers: (data: {
    pickup: string
    destination: string
    rideType?: 'BASIC' | 'PREMIUM'
  }) => api.post('/matching/find-drivers', data),

  /**
   * Get trip price estimate
   */
  getEstimate: (data: { pickup: string; destination: string; rideType?: 'BASIC' | 'PREMIUM' }) =>
    api.post('/passenger/trip/estimate', data),

  /**
   * Request a ride with a specific driver
   */
  requestRide: (data: {
    driverId: string
    pickup: { address: string; lat?: number; lng?: number }
    destination: { address: string; lat?: number; lng?: number }
    price: number
  }) => api.post('/passenger/trip/request', data),

  /**
   * Get current/past rides
   */
  getRides: () => api.get('/passenger/rides'),

  /**
   * Get specific ride details
   */
  getRide: (rideId: string) => api.get(`/passenger/rides/${rideId}`),

  /**
   * Cancel a ride
   */
  cancelRide: (rideId: string) => api.post(`/passenger/trips/${rideId}/cancel`),

  /**
   * Rate a completed trip
   */
  rateTrip: (rideId: string, rating: number, comment?: string) =>
    api.post('/passenger/rate', { ride_id: rideId, rating, comment }),
}

// ============================================
// WAITLIST API
// ============================================

export const waitlistApi = {
  join: (data: { email?: string; phone?: string; role: 'driver' | 'passenger'; city?: string }) =>
    api.post('/waitlist/join', data),
}
