import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Card } from "@/components/card";
import { Checkbox } from "@/components/checkbox";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function DriverRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    car_make: "",
    car_model: "",
    car_year: "",
    car_color: "",
    plate_number: "",
    seats: 4,
    condition_ac: true,
    condition_quiet: false,
    condition_music: true,
    is_premium: false,
  });
  const [carPhotos, setCarPhotos] = useState<File[]>([]);
  const [driverLicense, setDriverLicense] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formDataObj = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, String(value));
      });

      carPhotos.forEach((photo) => {
        formDataObj.append("car_photos", photo);
      });

      if (driverLicense) {
        formDataObj.append("driver_license", driverLicense);
      }

      const response = await fetch("/api/driver/profile", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataObj,
      });

      if (response.ok) {
        toast.success("Driver profile created!");
        navigate("/driver/direction");
      } else {
        toast.error("Failed to create driver profile");
      }
    } catch (error) {
      toast.error("Error registering as driver");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yenko-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-yenko-deep mb-2">
          Become a Yenko Driver
        </h1>
        <p className="text-yenko-muted mb-8">Share your route and earn money</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Information */}
          <Card className="p-6">
            <h2 className="font-bold text-yenko-deep mb-4">
              Vehicle Information
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-yenko-ink mb-2">
                    Make
                  </label>
                  <Input
                    placeholder="Toyota"
                    value={formData.car_make}
                    onChange={(e) =>
                      setFormData({ ...formData, car_make: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-yenko-ink mb-2">
                    Model
                  </label>
                  <Input
                    placeholder="Corolla"
                    value={formData.car_model}
                    onChange={(e) =>
                      setFormData({ ...formData, car_model: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-yenko-ink mb-2">
                    Year
                  </label>
                  <Input
                    placeholder="2020"
                    value={formData.car_year}
                    onChange={(e) =>
                      setFormData({ ...formData, car_year: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-yenko-ink mb-2">
                    Color
                  </label>
                  <Input
                    placeholder="White"
                    value={formData.car_color}
                    onChange={(e) =>
                      setFormData({ ...formData, car_color: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-yenko-ink mb-2">
                    License Plate
                  </label>
                  <Input
                    placeholder="GH-1234-AB"
                    value={formData.plate_number}
                    onChange={(e) =>
                      setFormData({ ...formData, plate_number: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-yenko-ink mb-2">
                  Available Seats
                </label>
                <select
                  value={formData.seats}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seats: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-yenko-muted rounded-md"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "seat" : "seats"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Ride Conditions */}
          <Card className="p-6">
            <h2 className="font-bold text-yenko-deep mb-4">Ride Conditions</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={formData.condition_ac}
                  onChange={(e) =>
                    setFormData({ ...formData, condition_ac: e.target.checked })
                  }
                />
                <span>❄️ Air Conditioned</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={formData.condition_quiet}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      condition_quiet: e.target.checked,
                    })
                  }
                />
                <span>🤐 Quiet Ride</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={formData.condition_music}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      condition_music: e.target.checked,
                    })
                  }
                />
                <span>🎵 Music</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={formData.is_premium}
                  onChange={(e) =>
                    setFormData({ ...formData, is_premium: e.target.checked })
                  }
                />
                <span>💎 Premium Service (Higher Rates)</span>
              </label>
            </div>
          </Card>

          {/* Documents */}
          <Card className="p-6">
            <h2 className="font-bold text-yenko-deep mb-4">Documents</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-yenko-ink mb-2">
                  Car Photos (2-5 photos)
                </label>
                <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-yenko-muted rounded-lg cursor-pointer hover:bg-yenko-bg/50">
                  <div className="text-center">
                    <Upload className="w-6 h-6 mx-auto text-yenko-muted mb-2" />
                    <p className="text-sm text-yenko-muted">
                      Click to upload car photos
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      setCarPhotos(Array.from(e.target.files || []))
                    }
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-yenko-ink mb-2">
                  Driver's License
                </label>
                <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-yenko-muted rounded-lg cursor-pointer hover:bg-yenko-bg/50">
                  <div className="text-center">
                    <Upload className="w-6 h-6 mx-auto text-yenko-muted mb-2" />
                    <p className="text-sm text-yenko-muted">
                      Click to upload driver's license
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setDriverLicense(e.target.files?.[0] || null)
                    }
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yenko-blue hover:bg-yenko-deep text-white"
            >
              {loading ? "Registering..." : "Complete Registration"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
