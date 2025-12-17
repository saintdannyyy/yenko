import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

    // Handle Ghana format
    if (value.startsWith("0")) {
      value = "233" + value.slice(1); // Convert 0XX to 233XX
    }
    if (value.startsWith("233")) {
      value = "+" + value;
    }
    if (!value.startsWith("+") && value.length > 0) {
      value = "+233" + value;
    }

    // Limit to Ghana phone length
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone format
    if (!phone.match(/^\+233\d{9}$/)) {
      toast.error("Please enter a valid Ghana phone number");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.requestOtp(phone);

      if (response.success) {
        toast.success("OTP sent to your phone");

        // In development, show OTP in toast
        if (response.otp) {
          toast.info(`Dev mode - OTP: ${response.otp}`, { duration: 10000 });
        }

        // Navigate to verify page with phone
        navigate("/auth/verify", {
          state: {
            phone,
            isNewUser: response.isNewUser,
          },
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yenko-bgSecondary flex flex-col">
      {/* Navigation */}
      <nav className="p-4">
        <Link
          to="/"
          className="inline-flex items-center text-yenko-blue hover:text-yenko-blue/80 transition-apple text-body font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🚗</div>
            <h1 className="text-title-md text-yenko-label mb-2">
              Welcome to Yenko
            </h1>
            <p className="text-body text-yenko-muted">
              Enter your phone number to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-subheadline font-medium text-yenko-secondary"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+233 XX XXX XXXX"
                value={phone}
                onChange={handlePhoneChange}
                className="h-14 text-body bg-white border-yenko-separator rounded-xl px-4 focus:ring-2 focus:ring-yenko-blue/20 focus:border-yenko-blue transition-apple"
                autoFocus
                required
              />
              <p className="text-footnote text-yenko-muted">
                We'll send you a verification code via SMS
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || phone.length < 13}
              className="w-full h-14 bg-yenko-blue hover:bg-yenko-blue/90 text-white text-body font-semibold rounded-xl shadow-apple transition-apple disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-footnote text-yenko-muted">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="text-yenko-blue">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-yenko-blue">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
