import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppHeader, BottomNav } from "@/components/app-header";
import { MapPin, Clock, Info, Navigation, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { driverApi } from "@/lib/api";

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
      await driverApi.setDirection({
        startLocation: formData.start_location,
        endLocation: formData.end_location,
        departureTime: formData.departure_time,
        seats: formData.seats,
      });

      toast.success("Route posted successfully!");
      navigate("/driver/requests");
    } catch (error: any) {
      toast.error(error.message || "Failed to post route");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 md:pb-0">
      <AppHeader title="Post Your Route" showBack />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-yenko-blue to-blue-600 rounded-3xl p-6 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Navigation className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Share Your Route</h1>
              <p className="text-white/80 text-sm">
                Post where you're going and earn money
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route Details Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-yenko-blue" />
                Route Details
              </h2>
            </div>

            <div className="p-5 space-y-5">
              {/* Start Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Starting Point
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full" />
                  <Input
                    type="text"
                    placeholder="e.g., Osu, Accra"
                    value={formData.start_location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        start_location: e.target.value,
                      })
                    }
                    required
                    className="h-14 pl-10 rounded-2xl bg-gray-50 border-0 text-base font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-yenko-blue/20"
                  />
                </div>
              </div>

              {/* Connector */}
              <div className="flex items-center gap-3 px-4">
                <div className="w-0.5 h-8 bg-gray-200 ml-1" />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-yenko-yellow rounded-full" />
                  <Input
                    type="text"
                    placeholder="e.g., Tema, Accra"
                    value={formData.end_location}
                    onChange={(e) =>
                      setFormData({ ...formData, end_location: e.target.value })
                    }
                    required
                    className="h-14 pl-10 rounded-2xl bg-gray-50 border-0 text-base font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-yenko-blue/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Time & Seats Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-yenko-blue" />
                Schedule
              </h2>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Departure Time
                </label>
                <Input
                  type="datetime-local"
                  value={formData.departure_time}
                  onChange={(e) =>
                    setFormData({ ...formData, departure_time: e.target.value })
                  }
                  required
                  className="h-14 rounded-2xl bg-gray-50 border-0 text-base font-medium focus:ring-2 focus:ring-yenko-blue/20"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Available Seats
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFormData({ ...formData, seats: n })}
                      className={`flex-1 h-14 rounded-2xl font-bold text-lg transition-all ${
                        formData.seats === n
                          ? "bg-yenko-blue text-white shadow-lg shadow-blue-500/25"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tip Card */}
          <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
            <div className="w-10 h-10 bg-yenko-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-yenko-blue" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Pro Tip</p>
              <p className="text-gray-600 text-sm">
                Post your route early to get matched with more passengers!
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:scale-[1.02]"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Posting...
              </div>
            ) : (
              "Post Route"
            )}
          </Button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}
