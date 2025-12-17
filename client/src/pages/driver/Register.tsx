import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Car,
  Loader2,
  Check,
  Snowflake,
  VolumeX,
  Music,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

const CAR_COLORS = [
  "Black",
  "White",
  "Silver",
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Brown",
  "Beige",
  "Gold",
  "Other",
];

const SEAT_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

// Popular car makes in Ghana
const CAR_MAKES = [
  "Toyota",
  "Honda",
  "Hyundai",
  "Kia",
  "Nissan",
  "Mercedes-Benz",
  "BMW",
  "Volkswagen",
  "Ford",
  "Chevrolet",
  "Mazda",
  "Suzuki",
  "Mitsubishi",
  "Peugeot",
  "Other",
];

interface ConditionToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon: React.ReactNode;
  label: string;
  description?: string;
}

function ConditionToggle({
  checked,
  onChange,
  icon,
  label,
  description,
}: ConditionToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center gap-4 w-full p-4 rounded-xl border transition-apple text-left",
        checked
          ? "bg-yenko-blue/5 border-yenko-blue"
          : "bg-white border-yenko-separator hover:bg-yenko-bgSecondary",
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          checked ? "bg-yenko-blue" : "bg-yenko-bgSecondary",
        )}
      >
        <span className={cn(checked ? "text-white" : "text-yenko-muted")}>
          {icon}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-subheadline font-medium text-yenko-label">{label}</p>
        {description && (
          <p className="text-footnote text-yenko-muted">{description}</p>
        )}
      </div>
      {checked && (
        <div className="w-6 h-6 bg-yenko-blue rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </button>
  );
}

export default function DriverRegister() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Vehicle Info
  const [formData, setFormData] = useState({
    car_make: "",
    car_model: "",
    car_year: "",
    car_color: "",
    plate_number: "",
    seats: "",
  });

  // Ride Conditions
  const [conditions, setConditions] = useState({
    condition_ac: true,
    condition_quiet: false,
    condition_music: true,
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = () => {
    return (
      formData.car_make.trim() &&
      formData.car_model.trim() &&
      formData.car_year &&
      formData.car_color
    );
  };

  const isStep2Valid = () => {
    return formData.plate_number.trim() && formData.seats !== "";
  };

  const handleSubmit = async () => {
    if (!isStep1Valid() || !isStep2Valid()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.setupVehicle({
        car_make: formData.car_make.trim(),
        car_model: formData.car_model.trim(),
        car_year: formData.car_year,
        car_color: formData.car_color,
        plate_number: formData.plate_number.trim().toUpperCase(),
        seats: parseInt(formData.seats, 10),
        condition_ac: conditions.condition_ac,
        condition_quiet: conditions.condition_quiet,
        condition_music: conditions.condition_music,
      });

      if (response.success) {
        setAuth({
          token: response.token,
          user: response.user,
          driver: response.driver,
          onboardingStatus: response.onboardingStatus,
        });

        toast.success("🎉 You're all set! Start sharing your rides.");

        navigate(response.onboardingStatus.redirectTo, { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to complete registration");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && isStep1Valid()) {
      setStep(2);
    } else if (step === 2 && isStep2Valid()) {
      setStep(3);
    } else if (step === 3) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-yenko-bgSecondary flex flex-col">
      {/* Header */}
      <nav className="bg-white border-b border-yenko-separator px-4 h-14 flex items-center">
        <button
          onClick={handleBack}
          className="inline-flex items-center text-yenko-blue hover:text-yenko-blue/80 transition-apple text-body font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white px-4 py-3 border-b border-yenko-separator">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-footnote text-yenko-muted">
              Step {step} of 3
            </span>
            <span className="text-footnote text-yenko-blue font-medium">
              {step === 1 && "Vehicle Details"}
              {step === 2 && "Seats & Plate"}
              {step === 3 && "Ride Preferences"}
            </span>
          </div>
          <div className="h-1 bg-yenko-bgSecondary rounded-full overflow-hidden">
            <div
              className="h-full bg-yenko-blue transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 overflow-auto">
        <div className="max-w-md mx-auto">
          {/* Step 1: Vehicle Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-yenko-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-yenko-blue" />
                </div>
                <h1 className="text-title-md text-yenko-label">
                  Tell us about your car
                </h1>
                <p className="text-body text-yenko-muted mt-2">
                  This helps passengers identify your vehicle
                </p>
              </div>

              <Card className="rounded-2xl shadow-apple">
                <CardContent className="p-5 space-y-4">
                  {/* Car Make */}
                  <div className="space-y-2">
                    <label className="text-subheadline font-medium text-yenko-secondary">
                      Car Make *
                    </label>
                    <Select
                      value={formData.car_make}
                      onValueChange={(v: string) => updateField("car_make", v)}
                    >
                      <SelectTrigger className="h-12 bg-yenko-bgSecondary border-yenko-separator rounded-xl">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {CAR_MAKES.map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Car Model */}
                  <div className="space-y-2">
                    <label className="text-subheadline font-medium text-yenko-secondary">
                      Car Model *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Corolla, Civic, Accent"
                      value={formData.car_model}
                      onChange={(e) => updateField("car_model", e.target.value)}
                      className="h-12 bg-yenko-bgSecondary border-yenko-separator rounded-xl"
                    />
                  </div>

                  {/* Year and Color */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-subheadline font-medium text-yenko-secondary">
                        Year *
                      </label>
                      <Select
                        value={formData.car_year}
                        onValueChange={(v: string) =>
                          updateField("car_year", v)
                        }
                      >
                        <SelectTrigger className="h-12 bg-yenko-bgSecondary border-yenko-separator rounded-xl">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {YEARS.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-subheadline font-medium text-yenko-secondary">
                        Color *
                      </label>
                      <Select
                        value={formData.car_color}
                        onValueChange={(v: string) =>
                          updateField("car_color", v)
                        }
                      >
                        <SelectTrigger className="h-12 bg-yenko-bgSecondary border-yenko-separator rounded-xl">
                          <SelectValue placeholder="Color" />
                        </SelectTrigger>
                        <SelectContent>
                          {CAR_COLORS.map((color) => (
                            <SelectItem key={color} value={color}>
                              {color}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Plate & Seats */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🚗</div>
                <h1 className="text-title-md text-yenko-label">
                  Almost there!
                </h1>
                <p className="text-body text-yenko-muted mt-2">
                  Add your plate number and available seats
                </p>
              </div>

              <Card className="rounded-2xl shadow-apple">
                <CardContent className="p-5 space-y-4">
                  {/* Plate Number */}
                  <div className="space-y-2">
                    <label className="text-subheadline font-medium text-yenko-secondary">
                      License Plate Number *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., GR-1234-20"
                      value={formData.plate_number}
                      onChange={(e) =>
                        updateField(
                          "plate_number",
                          e.target.value.toUpperCase(),
                        )
                      }
                      className="h-14 text-lg font-mono tracking-wider bg-yenko-bgSecondary border-yenko-separator rounded-xl text-center uppercase"
                    />
                    <p className="text-footnote text-yenko-muted text-center">
                      This will be displayed to passengers
                    </p>
                  </div>

                  {/* Available Seats */}
                  <div className="space-y-2 pt-2">
                    <label className="text-subheadline font-medium text-yenko-secondary">
                      Available Passenger Seats *
                    </label>
                    <Select
                      value={formData.seats}
                      onValueChange={(v: string) => updateField("seats", v)}
                    >
                      <SelectTrigger className="h-12 bg-yenko-bgSecondary border-yenko-separator rounded-xl">
                        <SelectValue placeholder="How many seats for passengers?" />
                      </SelectTrigger>
                      <SelectContent>
                        {SEAT_OPTIONS.map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}{" "}
                            {num === 1 ? "passenger seat" : "passenger seats"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-footnote text-yenko-muted">
                      Excluding the driver's seat
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Vehicle Summary */}
              <Card className="rounded-2xl bg-yenko-blue/5 border-yenko-blue/20">
                <CardContent className="p-4">
                  <p className="text-footnote text-yenko-blue font-medium mb-1">
                    Your Vehicle
                  </p>
                  <p className="text-body text-yenko-label">
                    {formData.car_color} {formData.car_make}{" "}
                    {formData.car_model} ({formData.car_year})
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Ride Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">✨</div>
                <h1 className="text-title-md text-yenko-label">
                  Set your ride preferences
                </h1>
                <p className="text-body text-yenko-muted mt-2">
                  Let passengers know what to expect
                </p>
              </div>

              <div className="space-y-3">
                <ConditionToggle
                  checked={conditions.condition_ac}
                  onChange={(checked) =>
                    setConditions({ ...conditions, condition_ac: checked })
                  }
                  icon={<Snowflake className="w-5 h-5" />}
                  label="Air Conditioning"
                  description="Car has working A/C"
                />

                <ConditionToggle
                  checked={conditions.condition_quiet}
                  onChange={(checked) =>
                    setConditions({ ...conditions, condition_quiet: checked })
                  }
                  icon={<VolumeX className="w-5 h-5" />}
                  label="Quiet Ride"
                  description="Prefer minimal conversation"
                />

                <ConditionToggle
                  checked={conditions.condition_music}
                  onChange={(checked) =>
                    setConditions({ ...conditions, condition_music: checked })
                  }
                  icon={<Music className="w-5 h-5" />}
                  label="Music Allowed"
                  description="Play music during the ride"
                />
              </div>

              {/* Final Summary */}
              <Card className="rounded-2xl shadow-apple mt-6">
                <CardContent className="p-4">
                  <p className="text-subheadline font-semibold text-yenko-label mb-3">
                    Registration Summary
                  </p>
                  <div className="space-y-2 text-body">
                    <div className="flex justify-between">
                      <span className="text-yenko-secondary">Vehicle</span>
                      <span className="text-yenko-label font-medium">
                        {formData.car_make} {formData.car_model}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yenko-secondary">Year</span>
                      <span className="text-yenko-label">
                        {formData.car_year}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yenko-secondary">Color</span>
                      <span className="text-yenko-label">
                        {formData.car_color}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yenko-secondary">Plate</span>
                      <span className="text-yenko-label font-mono">
                        {formData.plate_number}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yenko-secondary">Seats</span>
                      <span className="text-yenko-label">{formData.seats}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Footer with Button */}
      <div className="bg-white border-t border-yenko-separator px-4 py-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleNext}
            disabled={
              loading ||
              (step === 1 && !isStep1Valid()) ||
              (step === 2 && !isStep2Valid())
            }
            className="w-full h-14 bg-yenko-blue hover:bg-yenko-blue/90 text-white text-body font-semibold rounded-xl shadow-apple transition-apple disabled:opacity-40"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Completing Registration...
              </>
            ) : step === 3 ? (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Complete Registration
              </>
            ) : (
              "Continue"
            )}
          </Button>

          {step === 1 && (
            <p className="text-center text-footnote text-yenko-muted mt-4">
              You can update these details later in your profile
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
