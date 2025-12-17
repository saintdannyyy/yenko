import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AppHeader } from "@/components/app-header";
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
    <div className="min-h-screen bg-yenko-bgSecondary">
      <AppHeader />

      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-title-md text-yenko-label">Go Somewhere</h1>
          <p className="text-body text-yenko-muted">
            Where's your destination?
          </p>
        </div>

        {/* Search Card */}
        <Card className="p-6 mb-8 rounded-2xl shadow-apple">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-subheadline font-medium text-yenko-secondary mb-2">
                <MapPin className="w-4 h-4 text-yenko-blue" />
                Pickup Location
              </label>
              <Input
                type="text"
                placeholder="Enter pickup address"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="h-12 rounded-xl bg-yenko-bgSecondary border-yenko-separator"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-subheadline font-medium text-yenko-secondary mb-2">
                <MapPin className="w-4 h-4 text-yenko-danger" />
                Destination
              </label>
              <Input
                type="text"
                placeholder="Enter destination address"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="h-12 rounded-xl bg-yenko-bgSecondary border-yenko-separator"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-yenko-blue hover:bg-yenko-blue/90 text-white rounded-xl shadow-apple"
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? "Searching..." : "Search Drivers"}
            </Button>
          </form>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 justify-start rounded-xl border-yenko-separator"
          >
            <MapPin className="w-4 h-4 mr-2 text-yenko-muted" />
            Recent Destinations
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 justify-start rounded-xl border-yenko-separator"
          >
            Favorite Places
          </Button>
        </div>
      </div>
    </div>
  );
}
