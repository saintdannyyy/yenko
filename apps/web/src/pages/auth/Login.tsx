import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Phone, ArrowLeft, Loader2 } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-yenko-blue to-yenko-deep flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-16 h-16 bg-yenko-blue/10 rounded-full flex items-center justify-center">
              <Phone className="w-8 h-8 text-yenko-blue" />
            </div>
            <CardTitle className="text-2xl font-bold text-yenko-deep">
              Welcome to Yenko
            </CardTitle>
            <CardDescription className="text-yenko-muted">
              Enter your phone number to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-yenko-ink">
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+233 XX XXX XXXX"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="pl-4 text-lg h-12"
                    autoFocus
                    required
                  />
                </div>
                <p className="text-sm text-yenko-muted">
                  We'll send you a verification code via SMS
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading || phone.length < 13}
                className="w-full h-12 bg-yenko-blue hover:bg-yenko-deep text-white text-lg"
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

            <div className="mt-6 text-center text-sm text-yenko-muted">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-yenko-blue hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-yenko-blue hover:underline">
                Privacy Policy
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Help text */}
        <p className="text-center text-white/60 text-sm mt-6">
          Having trouble?{" "}
          <Link to="/help" className="text-white hover:underline">
            Get help
          </Link>
        </p>
      </div>
    </div>
  );
}
