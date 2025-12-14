import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Card } from "@/components/card";
import { MapPin, Search } from "lucide-react";
import { toast } from "sonner";

export default function PassengerHome() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination) {
      toast.error("Please enter both pickup and destination");
      return;
    }

    setLoading(true);
    try {
      // Use Google Maps to get coordinates
      const pickupCoords = { lat: 5.6037, lng: -0.187 }; // Placeholder Accra coords
      const destCoords = { lat: 5.5496, lng: -0.1989 };

      navigate(
        `/passenger/drivers?pickup=${pickupCoords.lat},${pickupCoords.lng}&destination=${destCoords.lat},${destCoords.lng}&rideType=BASIC`,
      );
    } catch (error) {
      toast.error("Error searching for drivers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yenko-blue to-yenko-bg">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="text-white mb-8">
          <h1 className="text-3xl font-bold">Go Somewhere</h1>
          <p className="text-white/70">Where's your destination?</p>
        </div>

        {/* Search Card */}
        <Card className="p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-yenko-ink font-medium mb-2">
                <MapPin className="w-4 h-4" />
                Pickup Location
              </label>
              <Input
                type="text"
                placeholder="Enter pickup address"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-yenko-ink font-medium mb-2">
                <MapPin className="w-4 h-4" />
                Destination
              </label>
              <Input
                type="text"
                placeholder="Enter destination address"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yenko-blue hover:bg-yenko-deep text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? "Searching..." : "Search Drivers"}
            </Button>
          </form>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <MapPin className="w-4 h-4 mr-2" />
            Recent Destinations
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Favorite Places
          </Button>
        </div>
      </div>
    </div>
  );
}
