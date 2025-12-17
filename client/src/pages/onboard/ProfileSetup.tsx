import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Users, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

type Role = "passenger" | "driver";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { user, setAuth } = useAuthStore();

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
    <div className="min-h-screen bg-yenko-bgSecondary flex flex-col">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">👤</div>
            <h1 className="text-title-md text-yenko-label mb-2">
              Complete your profile
            </h1>
            <p className="text-body text-yenko-muted">
              Tell us a bit about yourself
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name input */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-subheadline font-medium text-yenko-secondary"
              >
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-14 text-body bg-white border-yenko-separator rounded-xl px-4 focus:ring-2 focus:ring-yenko-blue/20 focus:border-yenko-blue transition-apple"
                autoFocus
                required
              />
            </div>

            {/* Role selection */}
            <div className="space-y-3">
              <label className="block text-subheadline font-medium text-yenko-secondary">
                How will you use Yenko?
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Passenger option */}
                <button
                  type="button"
                  onClick={() => setRole("passenger")}
                  className={cn(
                    "relative p-5 rounded-2xl border bg-white text-left transition-apple",
                    role === "passenger"
                      ? "border-yenko-blue ring-2 ring-yenko-blue/20"
                      : "border-yenko-separator hover:border-yenko-muted",
                  )}
                >
                  {role === "passenger" && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-yenko-blue rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                      role === "passenger"
                        ? "bg-yenko-blue"
                        : "bg-yenko-bgSecondary",
                    )}
                  >
                    <Users
                      className={cn(
                        "w-6 h-6",
                        role === "passenger"
                          ? "text-white"
                          : "text-yenko-muted",
                      )}
                    />
                  </div>
                  <h3 className="text-headline text-yenko-label">Passenger</h3>
                  <p className="text-footnote text-yenko-muted mt-1">
                    Find rides going my way
                  </p>
                </button>

                {/* Driver option */}
                <button
                  type="button"
                  onClick={() => setRole("driver")}
                  className={cn(
                    "relative p-5 rounded-2xl border bg-white text-left transition-apple",
                    role === "driver"
                      ? "border-yenko-blue ring-2 ring-yenko-blue/20"
                      : "border-yenko-separator hover:border-yenko-muted",
                  )}
                >
                  {role === "driver" && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-yenko-blue rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                      role === "driver"
                        ? "bg-yenko-blue"
                        : "bg-yenko-bgSecondary",
                    )}
                  >
                    <Car
                      className={cn(
                        "w-6 h-6",
                        role === "driver" ? "text-white" : "text-yenko-muted",
                      )}
                    />
                  </div>
                  <h3 className="text-headline text-yenko-label">Driver</h3>
                  <p className="text-footnote text-yenko-muted mt-1">
                    Share my ride & earn
                  </p>
                </button>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading || !fullName.trim() || !role}
              className="w-full h-14 bg-yenko-blue hover:bg-yenko-blue/90 text-white text-body font-semibold rounded-xl shadow-apple transition-apple disabled:opacity-40"
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
            <div className="mt-6 bg-yenko-warning/10 border border-yenko-warning/30 rounded-2xl p-4">
              <p className="text-subheadline text-yenko-secondary">
                <span className="font-semibold">Next step:</span> You'll add
                your vehicle details to start accepting passengers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
