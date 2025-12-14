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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Car, Loader2 } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-yenko-blue to-yenko-deep flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-16 h-16 bg-yenko-yellow/20 rounded-full flex items-center justify-center">
              <Car className="w-8 h-8 text-yenko-yellow" />
            </div>
            <CardTitle className="text-2xl font-bold text-yenko-deep">
              Register Your Vehicle
            </CardTitle>
            <CardDescription className="text-yenko-muted">
              Add your car details to start offering rides
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Car Make */}
              <div className="space-y-2">
                <Label htmlFor="make" className="text-yenko-ink">
                  Car Make
                </Label>
                <Input
                  id="make"
                  type="text"
                  placeholder="e.g., Toyota, Honda, Hyundai"
                  value={formData.car_make}
                  onChange={(e) => updateField("car_make", e.target.value)}
                  className="h-11"
                  autoFocus
                  required
                />
              </div>

              {/* Car Model */}
              <div className="space-y-2">
                <Label htmlFor="model" className="text-yenko-ink">
                  Car Model
                </Label>
                <Input
                  id="model"
                  type="text"
                  placeholder="e.g., Corolla, Civic, Accent"
                  value={formData.car_model}
                  onChange={(e) => updateField("car_model", e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              {/* Year and Color row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-yenko-ink">Year</Label>
                  <Select
                    value={formData.car_year}
                    onValueChange={(v: string) => updateField("car_year", v)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select year" />
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
                  <Label className="text-yenko-ink">Color</Label>
                  <Select
                    value={formData.car_color}
                    onValueChange={(v: string) => updateField("car_color", v)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select color" />
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
                <Label htmlFor="plate" className="text-yenko-ink">
                  Plate Number
                </Label>
                <Input
                  id="plate"
                  type="text"
                  placeholder="e.g., GR-1234-20"
                  value={formData.plate_number}
                  onChange={(e) =>
                    updateField("plate_number", e.target.value.toUpperCase())
                  }
                  className="h-11 uppercase"
                  required
                />
              </div>

              {/* Available Seats */}
              <div className="space-y-2">
                <Label className="text-yenko-ink">
                  Available Seats for Passengers
                </Label>
                <Select
                  value={formData.seats}
                  onValueChange={(v: string) => updateField("seats", v)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="How many passengers can you take?" />
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
                className="w-full h-12 bg-yenko-blue hover:bg-yenko-deep text-white text-lg mt-6"
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
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-sm text-yenko-deep">
                <strong>Almost there!</strong> Once registered, you can start
                offering rides and earning money on your daily commute.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
