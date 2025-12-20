import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  CreditCard,
  Camera,
  Upload,
  Check,
  Loader2,
  AlertCircle,
  ChevronLeft,
  X,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

type VerificationStep = "id-number" | "id-photo" | "selfie" | "review";

export default function IdentityVerification() {
  const navigate = useNavigate();
  const { user, onboardingStatus } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<VerificationStep>("id-number");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form data
  const [idNumber, setIdNumber] = useState("");
  const [idPhoto, setIdPhoto] = useState<string | null>(null);
  const [selfiePhoto, setSelfiePhoto] = useState<string | null>(null);

  const handleIdPhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large. Please use an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdPhoto(reader.result as string);
        setStep("selfie");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelfieCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large. Please use an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelfiePhoto(reader.result as string);
        setStep("review");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!idNumber || !idPhoto || !selfiePhoto) {
      toast.error("Please complete all verification steps");
      return;
    }

    setSubmitting(true);

    try {
      // In a real app, you would upload to your backend/Supabase
      // For now, we'll simulate verification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Identity verified successfully! 🎉");

      // Navigate to next step based on user role
      if (user?.role === "driver") {
        navigate("/onboard/vehicle", { replace: true });
      } else {
        navigate("/passenger/home", { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || "Verification failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step === "id-photo") setStep("id-number");
    else if (step === "selfie") setStep("id-photo");
    else if (step === "review") setStep("selfie");
    else navigate(-1);
  };

  const renderStep = () => {
    switch (step) {
      case "id-number":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yenko-blue to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verify Your Identity
              </h1>
              <p className="text-gray-500">
                For your security and that of others, we need to verify your
                Ghana Card
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
              <Shield className="w-5 h-5 text-yenko-blue flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Why we verify</p>
                <p className="text-gray-600">
                  Identity verification helps keep our community safe and builds
                  trust between passengers and drivers.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Ghana Card Number
              </label>
              <Input
                type="text"
                placeholder="GHA-XXXXXXXXX-X"
                value={idNumber}
                onChange={(e) =>
                  setIdNumber(
                    e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""),
                  )
                }
                className="h-14 text-lg font-mono bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-yenko-blue/20 tracking-wider"
                maxLength={15}
              />
              <p className="text-xs text-gray-400">
                Enter your 15-character Ghana Card number
              </p>
            </div>

            <Button
              onClick={() => {
                if (idNumber.length < 10) {
                  toast.error("Please enter a valid Ghana Card number");
                  return;
                }
                setStep("id-photo");
              }}
              disabled={idNumber.length < 10}
              className="w-full h-14 bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25"
            >
              Continue
            </Button>
          </div>
        );

      case "id-photo":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yenko-blue to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Photo of Ghana Card
              </h1>
              <p className="text-gray-500">
                Take a clear photo of the front of your Ghana Card
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-3xl p-6 border-2 border-dashed border-gray-200">
                {idPhoto ? (
                  <div className="relative">
                    <img
                      src={idPhoto}
                      alt="ID Card"
                      className="w-full h-48 object-cover rounded-2xl"
                    />
                    <button
                      onClick={() => setIdPhoto(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">
                      Position your card within the frame
                    </p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="h-12 px-6 rounded-2xl border-2"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Choose Photo
                    </Button>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleIdPhotoCapture}
                className="hidden"
              />

              <div className="bg-amber-50 rounded-2xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-800">
                    Tips for a good photo
                  </p>
                  <ul className="text-amber-700 mt-1 space-y-1">
                    <li>• Make sure all text is clearly visible</li>
                    <li>• Avoid glare and shadows</li>
                    <li>• Photo must show the entire card</li>
                  </ul>
                </div>
              </div>
            </div>

            {idPhoto && (
              <Button
                onClick={() => setStep("selfie")}
                className="w-full h-14 bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25"
              >
                Continue
              </Button>
            )}
          </div>
        );

      case "selfie":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yenko-blue to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Take a Selfie
              </h1>
              <p className="text-gray-500">
                We'll match this with your Ghana Card photo
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-3xl p-6 border-2 border-dashed border-gray-200">
                {selfiePhoto ? (
                  <div className="relative">
                    <img
                      src={selfiePhoto}
                      alt="Selfie"
                      className="w-48 h-48 object-cover rounded-full mx-auto"
                    />
                    <button
                      onClick={() => setSelfiePhoto(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-500 mb-4">
                      Center your face in the frame
                    </p>
                    <Button
                      onClick={() => selfieInputRef.current?.click()}
                      variant="outline"
                      className="h-12 px-6 rounded-2xl border-2"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Take Selfie
                    </Button>
                  </div>
                )}
              </div>

              <input
                ref={selfieInputRef}
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleSelfieCapture}
                className="hidden"
              />

              <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-yenko-blue flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">Selfie tips</p>
                  <ul className="text-gray-600 mt-1 space-y-1">
                    <li>• Good lighting on your face</li>
                    <li>• Look directly at the camera</li>
                    <li>• Remove glasses if possible</li>
                  </ul>
                </div>
              </div>
            </div>

            {selfiePhoto && (
              <Button
                onClick={() => setStep("review")}
                className="w-full h-14 bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25"
              >
                Continue
              </Button>
            )}
          </div>
        );

      case "review":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Review & Submit
              </h1>
              <p className="text-gray-500">
                Make sure everything looks correct
              </p>
            </div>

            <div className="space-y-4">
              {/* ID Number */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-yenko-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Ghana Card Number</p>
                    <p className="font-mono font-bold text-gray-900">
                      {idNumber}
                    </p>
                  </div>
                </div>
                <Check className="w-5 h-5 text-green-500" />
              </div>

              {/* ID Photo */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-yenko-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">ID Card Photo</p>
                    <p className="font-semibold text-gray-900">
                      Front of Ghana Card
                    </p>
                  </div>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                {idPhoto && (
                  <img
                    src={idPhoto}
                    alt="ID Card"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                )}
              </div>

              {/* Selfie */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-yenko-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">Selfie</p>
                    <p className="font-semibold text-gray-900">
                      Face verification
                    </p>
                  </div>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                {selfiePhoto && (
                  <img
                    src={selfiePhoto}
                    alt="Selfie"
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                )}
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-4 flex gap-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-green-800">
                  Your data is secure
                </p>
                <p className="text-green-700">
                  We use bank-level encryption to protect your personal
                  information.
                </p>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-green-500/25"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </div>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Submit for Verification
                </>
              )}
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-4 h-14 flex items-center z-50">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex-1 flex justify-center">
          {/* Progress dots */}
          <div className="flex gap-2">
            {["id-number", "id-photo", "selfie", "review"].map((s, i) => (
              <div
                key={s}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  step === s
                    ? "w-6 bg-yenko-blue"
                    : ["id-number", "id-photo", "selfie", "review"].indexOf(
                        step,
                      ) > i
                    ? "bg-yenko-blue"
                    : "bg-gray-200",
                )}
              />
            ))}
          </div>
        </div>
        <div className="w-10" /> {/* Spacer for balance */}
      </header>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-8">{renderStep()}</div>
    </div>
  );
}
