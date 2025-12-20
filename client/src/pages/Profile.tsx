import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppHeader, BottomNav } from "@/components/app-header";
import {
  Camera,
  Phone,
  User,
  Star,
  Car,
  Shield,
  Loader2,
  Check,
  ChevronRight,
  LogOut,
  Settings,
  HelpCircle,
  Bell,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const driver = useAuthStore((s) => s.driver);
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);
  const onboardingStatus = useAuthStore((s) => s.onboardingStatus);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || "");

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.updateProfile({
        full_name: fullName.trim(),
      });
      if (response.success) {
        setAuth({
          token: token!,
          user: response.user,
          onboardingStatus: onboardingStatus!,
        });
        toast.success("Profile updated!");
        setIsEditing(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 md:pb-0">
      <AppHeader title="Profile" showBack />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-yenko-blue via-blue-600 to-indigo-600 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02bTI0IDBjMC0yIDItNCAyLTZzLTItNC0yLTYgMi00IDItNi0yLTQtMi02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col items-center -mt-14">
              <div className="relative">
                <Avatar className="w-28 h-28 border-4 border-white shadow-xl">
                  <AvatarImage src={user.profile_photo || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-yenko-blue to-blue-600 text-white text-3xl font-bold">
                    {getInitials(user.full_name)}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-1 right-1 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-all">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">
                {user.full_name || "User"}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold capitalize",
                    user.role === "driver"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700",
                  )}
                >
                  {user.role === "driver" ? "🚗 Driver" : "🧳 Passenger"}
                </span>
                {user.rating && (
                  <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-semibold text-yellow-700">
                      {user.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-yenko-blue" />
              Personal Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>
              {isEditing ? (
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-14 text-base bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-yenko-blue/20"
                  autoFocus
                />
              ) : (
                <p className="h-14 flex items-center text-base font-medium text-gray-900 px-4 bg-gray-50 rounded-2xl">
                  {user.full_name || "Not set"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <div className="h-14 flex items-center gap-3 text-base font-medium text-gray-900 px-4 bg-gray-50 rounded-2xl">
                <Phone className="w-5 h-5 text-gray-400" />
                {user.phone}
                <div className="ml-auto flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  <Shield className="w-3 h-3" />
                  Verified
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFullName(user.full_name || "");
                  }}
                  className="flex-1 h-12 rounded-2xl border-2 border-gray-200 font-semibold"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 h-12 bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/25"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="w-full h-12 rounded-2xl border-2 border-yenko-blue text-yenko-blue hover:bg-yenko-blue/5 font-semibold"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Driver Vehicle Info */}
        {user.role === "driver" && driver && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Car className="w-5 h-5 text-yenko-blue" />
                Vehicle Information
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-gray-500">Vehicle</span>
                <span className="font-semibold text-gray-900">
                  {driver.car_make} {driver.car_model}
                </span>
              </div>
              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-gray-500">Year</span>
                <span className="font-medium text-gray-900">
                  {driver.car_year}
                </span>
              </div>
              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-gray-500">Color</span>
                <span className="font-medium text-gray-900 capitalize">
                  {driver.car_color}
                </span>
              </div>
              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-gray-500">Plate Number</span>
                <span className="font-mono font-semibold text-gray-900">
                  {driver.plate_number}
                </span>
              </div>
              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-gray-500">Status</span>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold",
                    driver.verified
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700",
                  )}
                >
                  {driver.verified ? "✓ Verified" : "⏳ Pending"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Menu Options */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">Settings</span>
            <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
          </button>
          <div className="border-t border-gray-100" />
          <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <span className="font-medium text-gray-900">Notifications</span>
            <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
          </button>
          <div className="border-t border-gray-100" />
          <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-medium text-gray-900">Help & Support</span>
            <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            useAuthStore.getState().logout();
            navigate("/auth/login", { replace: true });
          }}
          className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 flex items-center gap-4 px-5 py-4 hover:bg-red-50 transition-colors group"
        >
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
            <LogOut className="w-5 h-5 text-red-600" />
          </div>
          <span className="font-medium text-red-600">Log out</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
