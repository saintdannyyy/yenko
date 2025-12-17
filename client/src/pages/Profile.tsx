import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppHeader } from "@/components/app-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Camera,
  Phone,
  User,
  Star,
  Car,
  Shield,
  Loader2,
  Check,
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
    <div className="min-h-screen bg-yenko-bgSecondary">
      <AppHeader title="Profile" showBack />

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-yenko-blue to-yenko-blue/70" />
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col items-center -mt-12">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-apple">
                  <AvatarImage src={user.profile_photo || undefined} />
                  <AvatarFallback className="bg-yenko-blue text-white text-2xl font-semibold">
                    {getInitials(user.full_name)}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-apple-sm flex items-center justify-center border border-yenko-separator hover:bg-yenko-bgSecondary transition-apple">
                  <Camera className="w-4 h-4 text-yenko-muted" />
                </button>
              </div>
              <h2 className="mt-4 text-title-sm text-yenko-label">
                {user.full_name || "User"}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-caption font-medium capitalize",
                    user.role === "driver"
                      ? "bg-yenko-success/10 text-yenko-success"
                      : "bg-yenko-blue/10 text-yenko-blue",
                  )}
                >
                  {user.role}
                </span>
                {user.rating && (
                  <div className="flex items-center gap-1 text-yenko-warning">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-footnote font-medium">
                      {user.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-headline flex items-center gap-2">
              <User className="w-5 h-5 text-yenko-blue" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-subheadline font-medium text-yenko-secondary">
                Full Name
              </label>
              {isEditing ? (
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 text-body bg-yenko-bgSecondary border-yenko-separator rounded-xl"
                  autoFocus
                />
              ) : (
                <p className="h-12 flex items-center text-body text-yenko-label px-3 bg-yenko-bgSecondary rounded-xl">
                  {user.full_name || "Not set"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-subheadline font-medium text-yenko-secondary">
                Phone Number
              </label>
              <div className="h-12 flex items-center gap-2 text-body text-yenko-label px-3 bg-yenko-bgSecondary rounded-xl">
                <Phone className="w-4 h-4 text-yenko-muted" />
                {user.phone}
                <Shield className="w-4 h-4 text-yenko-success ml-auto" />
              </div>
              <p className="text-caption text-yenko-muted">
                Phone number is verified and cannot be changed
              </p>
            </div>

            {isEditing ? (
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFullName(user.full_name || "");
                  }}
                  className="flex-1 h-12 rounded-xl"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 h-12 bg-yenko-blue hover:bg-yenko-blue/90 text-white rounded-xl"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="w-full h-12 rounded-xl border-yenko-blue text-yenko-blue hover:bg-yenko-blue/5"
              >
                Edit Profile
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Driver Info (if driver) */}
        {user.role === "driver" && driver && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-headline flex items-center gap-2">
                <Car className="w-5 h-5 text-yenko-blue" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-subheadline text-yenko-secondary">
                  Vehicle
                </span>
                <span className="text-body text-yenko-label font-medium">
                  {driver.car_make} {driver.car_model}
                </span>
              </div>
              <div className="border-t border-yenko-separator" />
              <div className="flex justify-between items-center py-2">
                <span className="text-subheadline text-yenko-secondary">
                  Year
                </span>
                <span className="text-body text-yenko-label">
                  {driver.car_year}
                </span>
              </div>
              <div className="border-t border-yenko-separator" />
              <div className="flex justify-between items-center py-2">
                <span className="text-subheadline text-yenko-secondary">
                  Color
                </span>
                <span className="text-body text-yenko-label capitalize">
                  {driver.car_color}
                </span>
              </div>
              <div className="border-t border-yenko-separator" />
              <div className="flex justify-between items-center py-2">
                <span className="text-subheadline text-yenko-secondary">
                  Plate Number
                </span>
                <span className="text-body text-yenko-label font-mono">
                  {driver.plate_number}
                </span>
              </div>
              <div className="border-t border-yenko-separator" />
              <div className="flex justify-between items-center py-2">
                <span className="text-subheadline text-yenko-secondary">
                  Status
                </span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-caption font-medium",
                    driver.verified
                      ? "bg-yenko-success/10 text-yenko-success"
                      : "bg-yenko-warning/10 text-yenko-warning",
                  )}
                >
                  {driver.verified ? "Verified" : "Pending Verification"}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Actions */}
        <Card>
          <CardContent className="py-4">
            <Button
              variant="ghost"
              onClick={() => {
                useAuthStore.getState().logout();
                navigate("/auth/login", { replace: true });
              }}
              className="w-full h-12 text-yenko-danger hover:bg-yenko-danger/5 hover:text-yenko-danger rounded-xl justify-start"
            >
              <span className="mr-auto">Log out</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
