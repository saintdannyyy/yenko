import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Types
export interface User {
  id: string
  phone: string
  full_name: string | null
  role: 'driver' | 'passenger' | 'admin'
  profile_photo: string | null
  rating: number | null
}

export interface Driver {
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
}

export interface OnboardingStatus {
  isComplete: boolean
  nextStep: 'profile' | 'vehicle' | 'complete'
  redirectTo: string
}

interface AuthState {
  // State
  token: string | null
  user: User | null
  driver: Driver | null
  onboardingStatus: OnboardingStatus | null
  isLoading: boolean

  // Computed (derived from state)
  isAuthenticated: boolean
  isDriver: boolean
  isPassenger: boolean
  isAdmin: boolean
  needsOnboarding: boolean

  // Actions
  setAuth: (data: {
    token: string
    user: User
    driver?: Driver | null
    onboardingStatus: OnboardingStatus
  }) => void
  updateUser: (user: Partial<User>) => void
  updateDriver: (driver: Partial<Driver>) => void
  setOnboardingStatus: (status: OnboardingStatus) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      token: null,
      user: null,
      driver: null,
      onboardingStatus: null,
      isLoading: false,

      // Computed getters
      get isAuthenticated() {
        return get().token !== null && get().user !== null
      },
      get isDriver() {
        return get().user?.role === 'driver'
      },
      get isPassenger() {
        return get().user?.role === 'passenger'
      },
      get isAdmin() {
        return get().user?.role === 'admin'
      },
      get needsOnboarding() {
        return get().onboardingStatus?.isComplete === false
      },

      // Actions
      setAuth: ({ token, user, driver, onboardingStatus }) => {
        set({
          token,
          user,
          driver: driver || null,
          onboardingStatus,
          isLoading: false,
        })
      },

      updateUser: (userData) => {
        const current = get().user
        if (current) {
          set({ user: { ...current, ...userData } })
        }
      },

      updateDriver: (driverData) => {
        const current = get().driver
        if (current) {
          set({ driver: { ...current, ...driverData } })
        } else {
          set({ driver: driverData as Driver })
        }
      },

      setOnboardingStatus: (status) => {
        set({ onboardingStatus: status })
      },

      setLoading: (loading) => {
        set({ isLoading: loading })
      },

      logout: () => {
        set({
          token: null,
          user: null,
          driver: null,
          onboardingStatus: null,
          isLoading: false,
        })
      },
    }),
    {
      name: 'yenko-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        driver: state.driver,
        onboardingStatus: state.onboardingStatus,
      }),
    }
  )
)

// Selector hooks for common use cases
export const useToken = () => useAuthStore((s) => s.token)
export const useUser = () => useAuthStore((s) => s.user)
export const useDriver = () => useAuthStore((s) => s.driver)
export const useIsAuthenticated = () => useAuthStore((s) => s.token !== null && s.user !== null)
export const useIsDriver = () => useAuthStore((s) => s.user?.role === 'driver')
export const useIsPassenger = () => useAuthStore((s) => s.user?.role === 'passenger')
export const useNeedsOnboarding = () => useAuthStore((s) => s.onboardingStatus?.isComplete === false)
export const useOnboardingRedirect = () => useAuthStore((s) => s.onboardingStatus?.redirectTo)
