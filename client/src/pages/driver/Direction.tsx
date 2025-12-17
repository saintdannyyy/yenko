import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { MapPin, Clock, ChevronLeft, Info } from "lucide-react";
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
    <div className="min-h-screen bg-yenko-bgSecondary">
      {/* Header */}
      <header className="bg-white border-b border-yenko-separator px-4 h-14 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-yenko-bgSecondary transition-apple"
        >
          <ChevronLeft className="w-6 h-6 text-yenko-blue" />
        </button>
        <h1 className="text-headline text-yenko-label">Post Your Route</h1>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        <p className="text-callout text-yenko-secondary mb-6">
          Share where you're going and start earning
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Route Card */}
          <div className="bg-white rounded-2xl shadow-apple overflow-hidden">
            <div className="p-4 border-b border-yenko-separator">
              <h2 className="text-subheadline font-semibold text-yenko-label">
                Route Details
              </h2>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-footnote font-medium text-yenko-secondary mb-2">
                  <MapPin className="w-4 h-4 text-yenko-blue" />
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
                  className="h-12 bg-yenko-bgSecondary border-yenko-separator rounded-xl px-4 text-body focus:ring-2 focus:ring-yenko-blue/20 focus:border-yenko-blue transition-apple"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-footnote font-medium text-yenko-secondary mb-2">
                  <MapPin className="w-4 h-4 text-yenko-blue" />
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
                  className="h-12 bg-yenko-bgSecondary border-yenko-separator rounded-xl px-4 text-body focus:ring-2 focus:ring-yenko-blue/20 focus:border-yenko-blue transition-apple"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-footnote font-medium text-yenko-secondary mb-2">
                  <Clock className="w-4 h-4 text-yenko-blue" />
                  Departure Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.departure_time}
                  onChange={(e) =>
                    setFormData({ ...formData, departure_time: e.target.value })
                  }
                  required
                  className="h-12 bg-yenko-bgSecondary border-yenko-separator rounded-xl px-4 text-body focus:ring-2 focus:ring-yenko-blue/20 focus:border-yenko-blue transition-apple"
                />
              </div>

              <div>
                <label className="text-footnote font-medium text-yenko-secondary mb-2 block">
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
                  className="w-full h-12 bg-yenko-bgSecondary border border-yenko-separator rounded-xl px-4 text-body text-yenko-label focus:ring-2 focus:ring-yenko-blue/20 focus:border-yenko-blue transition-apple appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "seat" : "seats"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tip Card */}
          <div className="bg-yenko-blue/5 rounded-2xl p-4 flex gap-3">
            <Info className="w-5 h-5 text-yenko-blue flex-shrink-0 mt-0.5" />
            <p className="text-callout text-yenko-secondary">
              <span className="font-medium text-yenko-label">Tip:</span> The
              more detailed your route information, the better we can match you
              with passengers going the same way!
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-yenko-blue hover:bg-yenko-blue/90 text-white text-body font-semibold rounded-xl shadow-apple transition-apple disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Route"}
          </Button>
        </form>
      </div>
    </div>
  );
}
