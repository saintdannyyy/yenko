import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { Star, Users, Wind, Music } from "lucide-react";
import { toast } from "sonner";

interface Driver {
  id: string;
  name: string;
  rating: number;
  carModel: string;
  isPremium: boolean;
  computedPrice: number;
  seatsAvailable: number;
  conditions: {
    ac: boolean;
    quiet: boolean;
    music: boolean;
  };
  etaMinutes: number;
  distance: number;
}

export default function PassengerDrivers() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const pickup = searchParams.get("pickup");
        const destination = searchParams.get("destination");
        const rideType = searchParams.get("rideType") || "BASIC";

        const response = await fetch(
          `/api/passenger/drivers?pickup=${pickup}&destination=${destination}&rideType=${rideType}`,
        );
        if (response.ok) {
          const data = await response.json();
          setDrivers(data.drivers || []);
        }
      } catch (error) {
        toast.error("Failed to load drivers");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-yenko-bg">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/passenger/home")}>
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-yenko-deep mt-4">
            Available Drivers
          </h1>
          <p className="text-yenko-muted">{drivers.length} drivers found</p>
        </div>

        {/* Drivers List */}
        {loading ? (
          <div className="text-center py-12">Loading drivers...</div>
        ) : drivers.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-yenko-muted mb-4">
              No drivers available for this route
            </p>
            <Button
              onClick={() => navigate("/passenger/home")}
              className="bg-yenko-blue"
            >
              Try Different Time
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {drivers.map((driver) => (
              <Card
                key={driver.id}
                className="p-4 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-yenko-deep">{driver.name}</h3>
                    <p className="text-sm text-yenko-muted">
                      {driver.carModel}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yenko-blue">
                      ₵{driver.computedPrice.toFixed(2)}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yenko-yellow text-yenko-yellow" />
                      <span>{driver.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {driver.seatsAvailable} seats
                  </div>
                  <div>{driver.etaMinutes} min away</div>
                  {driver.isPremium && (
                    <span className="bg-yenko-yellow text-yenko-deep px-2 py-1 rounded text-xs font-bold">
                      PREMIUM
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mb-4">
                  {driver.conditions.ac && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                      <Wind className="w-3 h-3" /> AC
                    </span>
                  )}
                  {driver.conditions.quiet && (
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      🤐 Quiet
                    </span>
                  )}
                  {driver.conditions.music && (
                    <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded flex items-center gap-1">
                      <Music className="w-3 h-3" /> Music
                    </span>
                  )}
                </div>

                <Button
                  onClick={() => navigate(`/passenger/driver/${driver.id}`)}
                  className="w-full bg-yenko-blue hover:bg-yenko-deep text-white"
                >
                  View Details & Book
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
