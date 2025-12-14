import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Card } from "@/components/card";
import { MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export default function DriverDirection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    start_location: "",
    end_location: "",
    departure_time: "",
    seats: 4,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/driver/set-direction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          startLocation: formData.start_location,
          endLocation: formData.end_location,
          departureTime: formData.departure_time,
          seats: formData.seats,
        }),
      });

      if (response.ok) {
        toast.success("Route posted successfully!");
        navigate("/driver/requests");
      } else {
        toast.error("Failed to post route");
      }
    } catch (error) {
      toast.error("Error posting route");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yenko-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-yenko-deep mb-2">
          Post Your Route
        </h1>
        <p className="text-yenko-muted mb-8">
          Share where you're going and start earning
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route Information */}
          <Card className="p-6">
            <h2 className="font-bold text-yenko-deep mb-4">Route Details</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-yenko-ink mb-2">
                  <MapPin className="w-4 h-4" />
                  Starting Location
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Osu, Accra"
                  value={formData.start_location}
                  onChange={(e) =>
                    setFormData({ ...formData, start_location: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-yenko-ink mb-2">
                  <MapPin className="w-4 h-4" />
                  Destination
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Tema, Accra"
                  value={formData.end_location}
                  onChange={(e) =>
                    setFormData({ ...formData, end_location: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-yenko-ink mb-2">
                  <Clock className="w-4 h-4" />
                  Departure Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.departure_time}
                  onChange={(e) =>
                    setFormData({ ...formData, departure_time: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yenko-ink mb-2">
                  Available Seats for This Trip
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

          {/* Info Card */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> The more detailed your route information,
              the better we can match you with passengers going the same way!
            </p>
          </Card>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/driver/register")}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yenko-blue hover:bg-yenko-deep text-white"
            >
              {loading ? "Posting..." : "Post Route"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
