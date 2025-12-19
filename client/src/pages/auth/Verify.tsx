import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const OTP_LENGTH = 6;

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);

  // Use proper selectors for reactivity
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const onboardingStatus = useAuthStore((s) => s.onboardingStatus);

  // Get phone and isNewUser from navigation state
  const phone = location.state?.phone as string;
  const isNewUser = location.state?.isNewUser as boolean;

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if no phone (and not just verified)
  useEffect(() => {
    if (!phone && !verified && !token) {
      navigate("/auth/login", { replace: true });
    }
  }, [phone, verified, token, navigate]);

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
        // Mark as verified to prevent redirect loops
        setVerified(true);

        // Store auth data
        setAuth({
          token: response.token,
          user: response.user,
          onboardingStatus: response.onboardingStatus,
        });

        toast.success(response.message);

        // Small delay to ensure state is persisted before navigation
        setTimeout(() => {
          navigate(response.onboardingStatus.redirectTo, { replace: true });
        }, 100);
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
    <div className="max-h-screen bg-yenko-bgSecondary flex flex-col">
      {/* Navigation */}
      <nav className="p-4 border-b-4 border-yenko-separator">
        <Link
          to="/auth/login"
          className="inline-flex items-center text-yenko-blue hover:text-yenko-blue/80 transition-apple text-body font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-xl font-semibold text-yenko-blue text-yenko-label mb-2">
              Enter verification code
            </h1>
            <p className="text-body text-yenko-muted">
              Sent to{" "}
              <span className="text-yenko-label font-medium">{phone}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-8">
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
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
                  className="w-12 h-14 text-center text-yenko-blue text-title-sm bg-white border border-yenko-separator rounded-xl
                    focus:border-yenko-blue focus:ring-2 focus:ring-yenko-blue/20 outline-none
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition-apple"
                />
              ))}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center text-yenko-muted">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                <span className="text-body">Verifying...</span>
              </div>
            )}

            {/* Resend button */}
            <div className="text-center">
              <p>Didn't receive the code?</p>
              <Button
                type="button"
                variant="ghost"
                disabled={countdown > 0 || resendLoading}
                onClick={handleResend}
                className="text-yenko-blue hover:text-yenko-blue/80 font-medium transition-apple disabled:text-yenko-muted mt-2"
              >
                {resendLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
              </Button>
            </div>

            {/* New user info */}
            {isNewUser && (
              <div className="bg-white border border-yenko-separator rounded-2xl p-4 text-center">
                <p className="text-subheadline text-yenko-secondary">
                  👋 Welcome! After verification, we'll help you set up your
                  profile.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
