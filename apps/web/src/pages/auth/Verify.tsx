import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const OTP_LENGTH = 6;

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);

  // Get phone from navigation state
  const phone = location.state?.phone as string;
  const isNewUser = location.state?.isNewUser as boolean;

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if no phone
  useEffect(() => {
    if (!phone) {
      navigate("/auth/login", { replace: true });
    }
  }, [phone, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (newOtp.every((d) => d) && newOtp.join("").length === OTP_LENGTH) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (pastedData.length === OTP_LENGTH) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[OTP_LENGTH - 1]?.focus();
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (otpCode: string) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await authApi.verifyOtp(phone, otpCode);

      if (response.success) {
        // Store auth data
        setAuth({
          token: response.token,
          user: response.user,
          onboardingStatus: response.onboardingStatus,
        });

        toast.success(response.message);

        // Navigate based on onboarding status
        navigate(response.onboardingStatus.redirectTo, { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
      // Clear OTP on error
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resendLoading) return;

    setResendLoading(true);

    try {
      const response = await authApi.requestOtp(phone);

      if (response.success) {
        toast.success("New OTP sent!");
        setCountdown(30);
        setOtp(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();

        // In development, show OTP
        if (response.otp) {
          toast.info(`Dev mode - OTP: ${response.otp}`, { duration: 10000 });
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  if (!phone) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yenko-blue to-yenko-deep flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link
          to="/auth/login"
          className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Change number
        </Link>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-yenko-deep">
              Verify Your Number
            </CardTitle>
            <CardDescription className="text-yenko-muted">
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-yenko-ink">{phone}</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {/* OTP Input */}
              <div className="flex justify-center gap-2" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={loading}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg
                      focus:border-yenko-blue focus:ring-2 focus:ring-yenko-blue/20 outline-none
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all"
                  />
                ))}
              </div>

              {/* Loading state */}
              {loading && (
                <div className="flex items-center justify-center text-yenko-muted">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Verifying...
                </div>
              )}

              {/* Resend button */}
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={countdown > 0 || resendLoading}
                  onClick={handleResend}
                  className="text-yenko-blue hover:text-yenko-deep"
                >
                  {resendLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
                </Button>
              </div>

              {/* New user info */}
              {isNewUser && (
                <div className="bg-yenko-blue/5 border border-yenko-blue/20 rounded-lg p-4 text-center">
                  <p className="text-sm text-yenko-muted">
                    👋 Looks like you're new here! After verification, we'll
                    help you set up your profile.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help text */}
        <p className="text-center text-white/60 text-sm mt-6">
          Didn't receive the code?{" "}
          <Link to="/help" className="text-white hover:underline">
            Get help
          </Link>
        </p>
      </div>
    </div>
  );
}
