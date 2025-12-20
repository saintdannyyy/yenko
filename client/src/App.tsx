import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { authApi } from "@/lib/api";
import { supabase } from "@/lib/supabase";

// Pages - will import from pages folder
import Landing from "@/pages/Landing";
import Login from "./pages/auth/Login";
import Verify from "./pages/auth/Verify";
import Profile from "@/pages/Profile";
import ProfileSetup from "@/pages/onboard/ProfileSetup";
import IdentityVerification from "@/pages/onboard/IdentityVerification";
import VehicleSetup from "@/pages/onboard/VehicleSetup";
import PassengerHome from "@/pages/passenger/Home";
import PassengerDrivers from "@/pages/passenger/Drivers";
import PassengerDriverDetail from "@/pages/passenger/DriverDetail";
import PassengerTripStatus from "@/pages/passenger/TripStatus";
import PassengerTrips from "@/pages/passenger/Trips";
import Settings from "@/pages/Settings";
import DriverRegister from "@/pages/driver/Register";
import DriverDirection from "@/pages/driver/Direction";
import DriverRequests from "@/pages/driver/Requests";
import DriverTripControl from "@/pages/driver/TripControl";
import DriverEarnings from "@/pages/driver/Earnings";
import AdminDashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/NotFound";

// Auth initializer component - restores session on app load
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const setLoading = useAuthStore((s) => s.setLoading);
  const setSupabaseSession = useAuthStore((s) => s.setSupabaseSession);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    const initAuth = async () => {
      // Get persisted token from localStorage (zustand persist)
      const currentToken = useAuthStore.getState().token;
      const currentUser = useAuthStore.getState().user;

      // Initialize Supabase session
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSupabaseSession(session);

        // Listen for Supabase auth changes
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          setSupabaseSession(session);
        });
        subscription = data.subscription;
      } catch (e) {
        console.warn("Supabase session init failed:", e);
      }

      // If we have a persisted token, validate it with the backend
      if (currentToken && currentUser) {
        try {
          setLoading(true);
          const response = await authApi.me();
          // Update with fresh data from server
          setAuth({
            token: response.token,
            user: response.user,
            driver: response.driver,
            onboardingStatus: response.onboardingStatus,
          });
        } catch (error: any) {
          console.warn("Session validation failed:", error.message);
          // Only logout if explicitly a token error (401), not network errors
          // This ensures refresh doesn't log users out on temporary issues
          if (error.status === 401 || error.code === "TOKEN_EXPIRED") {
            const isAuthPage = window.location.pathname.startsWith("/auth/");
            if (!isAuthPage) {
              await logout();
            }
          }
          // For other errors (network, server errors), keep the session
          // The user can retry or the app will work when connection restores
        } finally {
          setLoading(false);
        }
      }

      setInitialized(true);
    };

    initAuth();

    // Cleanup subscription on unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []); // Only run once on mount

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yenko-blue">
        <div className="animate-pulse">
          <div className="text-white text-2xl font-bold">Yenko</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Protected route wrapper with onboarding check
function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: ("driver" | "passenger" | "admin")[];
}) {
  // Use proper selectors for reactivity
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const onboardingStatus = useAuthStore((s) => s.onboardingStatus);
  const isLoading = useAuthStore((s) => s.isLoading);
  const location = useLocation();

  const isAuthenticated = token !== null && user !== null;

  // Still loading, show nothing
  if (isLoading) {
    return null;
  }

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  // Check if user needs to complete onboarding
  if (onboardingStatus && !onboardingStatus.isComplete) {
    const currentPath = location.pathname;
    const redirectPath = onboardingStatus.redirectTo;

    // Allow navigation to onboarding pages (including driver registration)
    if (
      currentPath !== redirectPath &&
      !currentPath.startsWith("/onboard/") &&
      !currentPath.startsWith("/driver/register") &&
      !currentPath.startsWith("/auth/")
    ) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  // Check role restrictions
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate home based on role
    const roleHome = {
      driver: "/driver/requests",
      passenger: "/passenger/home",
      admin: "/admin",
    };
    return <Navigate to={roleHome[user.role]} replace />;
  }

  return <>{children}</>;
}

// Redirect authenticated users away from auth pages
function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  // Use proper selectors for reactivity
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const onboardingStatus = useAuthStore((s) => s.onboardingStatus);

  const isAuthenticated = token !== null && user !== null;

  if (isAuthenticated && onboardingStatus) {
    return <Navigate to={onboardingStatus.redirectTo} replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthInitializer>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/auth/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route path="/auth/verify" element={<Verify />} />

        {/* Onboarding Routes (need auth but allow incomplete onboarding) */}
        <Route
          path="/onboard/profile"
          element={
            <ProtectedRoute>
              <ProfileSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboard/identity"
          element={
            <ProtectedRoute>
              <IdentityVerification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboard/vehicle"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <VehicleSetup />
            </ProtectedRoute>
          }
        />

        {/* Profile Route (all authenticated users) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Settings Route */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Passenger Routes */}
        <Route
          path="/passenger/home"
          element={
            <ProtectedRoute allowedRoles={["passenger"]}>
              <PassengerHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passenger/drivers"
          element={
            <ProtectedRoute allowedRoles={["passenger"]}>
              <PassengerDrivers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passenger/trips"
          element={
            <ProtectedRoute allowedRoles={["passenger"]}>
              <PassengerTrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passenger/driver/:driverId"
          element={
            <ProtectedRoute allowedRoles={["passenger"]}>
              <PassengerDriverDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passenger/trip/:tripId"
          element={
            <ProtectedRoute allowedRoles={["passenger"]}>
              <PassengerTripStatus />
            </ProtectedRoute>
          }
        />

        {/* Driver Routes */}
        <Route
          path="/driver/register"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/direction"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverDirection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/requests"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/trip/:tripId"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverTripControl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/earnings"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverEarnings />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-right" richColors />
    </AuthInitializer>
  );
}

export default App;
