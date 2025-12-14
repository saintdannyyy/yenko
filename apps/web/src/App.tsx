import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { authApi } from "@/lib/api";

// Pages - will import from pages folder
import Landing from "@/pages/Landing";
import Login from "@/pages/auth/Login";
import Verify from "@/pages/auth/Verify";
import ProfileSetup from "@/pages/onboard/ProfileSetup";
import VehicleSetup from "@/pages/onboard/VehicleSetup";
import PassengerHome from "@/pages/passenger/Home";
import PassengerDrivers from "@/pages/passenger/Drivers";
import PassengerDriverDetail from "@/pages/passenger/DriverDetail";
import PassengerTripStatus from "@/pages/passenger/TripStatus";
import DriverDirection from "@/pages/driver/Direction";
import DriverRequests from "@/pages/driver/Requests";
import DriverTripControl from "@/pages/driver/TripControl";
import DriverEarnings from "@/pages/driver/Earnings";
import AdminDashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/NotFound";

// Auth initializer component - restores session on app load
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { token, setAuth, logout, setLoading } = useAuthStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        setInitialized(true);
        return;
      }

      try {
        setLoading(true);
        const response = await authApi.me();
        setAuth({
          token: response.token,
          user: response.user,
          driver: response.driver,
          onboardingStatus: response.onboardingStatus,
        });
      } catch (error) {
        // Token invalid or expired, clear auth
        logout();
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();
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
  const { isAuthenticated, user, onboardingStatus, isLoading } = useAuthStore();
  const location = useLocation();

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

    // Allow navigation to onboarding pages
    if (
      currentPath !== redirectPath &&
      !currentPath.startsWith("/onboard/") &&
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
  const { isAuthenticated, onboardingStatus } = useAuthStore();

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
        <Route
          path="/auth/verify"
          element={
            <PublicOnlyRoute>
              <Verify />
            </PublicOnlyRoute>
          }
        />

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
          path="/onboard/vehicle"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <VehicleSetup />
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
