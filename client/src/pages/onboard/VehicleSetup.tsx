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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

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

export default function VehicleSetup() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    car_make: "",
    car_model: "",
    car_year: "",
    car_color: "",
    plate_number: "",
    seats: "",
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.car_make.trim() &&
      formData.car_model.trim() &&
      formData.car_year &&
      formData.car_color &&
      formData.plate_number.trim() &&
      formData.seats
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill in all fields");
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
      });

      if (response.success) {
        // Update auth store with driver data
        setAuth({
          token: response.token,
          user: response.user,
          driver: response.driver,
          onboardingStatus: response.onboardingStatus,
        });

        toast.success("Vehicle registered successfully!");

        // Navigate to driver home
        navigate(response.onboardingStatus.redirectTo, { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to register vehicle");
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
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🚗</div>
            <h1 className="text-title-md text-yenko-label mb-2">
              Add your vehicle
            </h1>
            <p className="text-body text-yenko-muted">
              Tell us about your car to start offering rides
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Car Make */}
            <div className="space-y-2">
              <label className="block text-subheadline font-medium text-yenko-secondary">
                Car Make
              </label>
              <Input
                type="text"
                placeholder="e.g., Toyota, Honda, Hyundai"
                value={formData.car_make}
                onChange={(e) => updateField("car_make", e.target.value)}
                className="h-12 text-body bg-white border-yenko-separator rounded-xl px-4 focus:ring-2 focus:ring-yenko-blue/20 focus:border-yenko-blue transition-apple"
                autoFocus
                required
              />
            </div>

            {/* Car Model */}
            <div className="space-y-2">
              <label className="block text-subheadline font-medium text-yenko-secondary">
                Car Model
              </label>
              <Input
                type="text"
                placeholder="e.g., Corolla, Civic, Accent"
                value={formData.car_model}
                onChange={(e) => updateField("car_model", e.target.value)}
                className="h-12 text-body bg-white border-yenko-separator rounded-xl px-4 focus:ring-2 focus:ring-yenko-blue/20 focus:border-yenko-blue transition-apple"
                required
              />
            </div>

            {/* Year and Color row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-subheadline font-medium text-yenko-secondary">
                  Year
                </label>
                <Select
                  value={formData.car_year}
                  onValueChange={(v: string) => updateField("car_year", v)}
                >
                  <SelectTrigger className="h-12 bg-white border-yenko-separator rounded-xl">
                    <SelectValue placeholder="Select" />
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
                <label className="block text-subheadline font-medium text-yenko-secondary">
                  Color
                </label>
                <Select
                  value={formData.car_color}
                  onValueChange={(v: string) => updateField("car_color", v)}
                >
                  <SelectTrigger className="h-12 bg-white border-yenko-separator rounded-xl">
                    <SelectValue placeholder="Select" />
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

            {/* Plate Number */}
            <div className="space-y-2">
              <label className="block text-subheadline font-medium text-yenko-secondary">
                Plate Number
              </label>
              <Input
                type="text"
                placeholder="e.g., GR-1234-20"
                value={formData.plate_number}
                onChange={(e) =>
                  updateField("plate_number", e.target.value.toUpperCase())
                }
                className="h-12 text-body bg-white border-yenko-separator rounded-xl px-4 uppercase focus:ring-2 focus:ring-yenko-blue/20 focus:border-yenko-blue transition-apple"
                required
              />
            </div>

            {/* Available Seats */}
            <div className="space-y-2">
              <label className="block text-subheadline font-medium text-yenko-secondary">
                Available Seats
              </label>
              <Select
                value={formData.seats}
                onValueChange={(v: string) => updateField("seats", v)}
              >
                <SelectTrigger className="h-12 bg-white border-yenko-separator rounded-xl">
                  <SelectValue placeholder="How many passengers?" />
                </SelectTrigger>
                <SelectContent>
                  {SEAT_OPTIONS.map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "seat" : "seats"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full h-14 bg-yenko-blue hover:bg-yenko-blue/90 text-white text-body font-semibold rounded-xl shadow-apple transition-apple disabled:opacity-40 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </form>

          {/* Info text */}
          <div className="mt-6 bg-white border border-yenko-separator rounded-2xl p-4">
            <p className="text-subheadline text-yenko-secondary">
              <span className="font-semibold">Almost there!</span> Once
              registered, you can start offering rides and earning money on your
              daily commute.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
