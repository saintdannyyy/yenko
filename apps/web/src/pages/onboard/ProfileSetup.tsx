import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Label } from "@/components/label";
import { User, Car, Users, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

type Role = "passenger" | "driver";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { user, setAuth, token } = useAuthStore();

  const [fullName, setFullName] = useState(user?.full_name || "");
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!role) {
      toast.error("Please select how you want to use Yenko");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.setupProfile({
        full_name: fullName.trim(),
        role,
      });

      if (response.success) {
        // Update auth store with new data
        setAuth({
          token: response.token,
          user: response.user,
          onboardingStatus: response.onboardingStatus,
        });

        toast.success("Profile created!");

        // Navigate to next step based on onboarding status
        navigate(response.onboardingStatus.redirectTo, { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yenko-blue to-yenko-deep flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-16 h-16 bg-yenko-blue/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-yenko-blue" />
            </div>
            <CardTitle className="text-2xl font-bold text-yenko-deep">
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-yenko-muted">
              Tell us a bit about yourself
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-yenko-ink">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 text-lg"
                  autoFocus
                  required
                />
              </div>

              {/* Role selection */}
              <div className="space-y-3">
                <Label className="text-yenko-ink">
                  How will you use Yenko?
                </Label>

                <div className="grid grid-cols-2 gap-4">
                  {/* Passenger option */}
                  <button
                    type="button"
                    onClick={() => setRole("passenger")}
                    className={cn(
                      "relative p-4 rounded-xl border-2 transition-all text-left",
                      role === "passenger"
                        ? "border-yenko-blue bg-yenko-blue/5"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    {role === "passenger" && (
                      <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-yenko-blue" />
                    )}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                        role === "passenger"
                          ? "bg-yenko-blue text-white"
                          : "bg-gray-100",
                      )}
                    >
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-yenko-deep">Passenger</h3>
                    <p className="text-sm text-yenko-muted mt-1">
                      Find rides going my way
                    </p>
                  </button>

                  {/* Driver option */}
                  <button
                    type="button"
                    onClick={() => setRole("driver")}
                    className={cn(
                      "relative p-4 rounded-xl border-2 transition-all text-left",
                      role === "driver"
                        ? "border-yenko-blue bg-yenko-blue/5"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    {role === "driver" && (
                      <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-yenko-blue" />
                    )}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                        role === "driver"
                          ? "bg-yenko-blue text-white"
                          : "bg-gray-100",
                      )}
                    >
                      <Car className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-yenko-deep">Driver</h3>
                    <p className="text-sm text-yenko-muted mt-1">
                      Share my ride & earn
                    </p>
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={loading || !fullName.trim() || !role}
                className="w-full h-12 bg-yenko-blue hover:bg-yenko-deep text-white text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>

            {/* Info text */}
            {role === "driver" && (
              <div className="mt-6 bg-yenko-yellow/10 border border-yenko-yellow/30 rounded-lg p-4">
                <p className="text-sm text-yenko-deep">
                  <strong>Next step:</strong> After this, you'll add your
                  vehicle details to start accepting passengers.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
