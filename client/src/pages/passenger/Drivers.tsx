import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { AppHeader, BottomNav } from "@/components/app-header";
import {
  Star,
  Users,
  Wind,
  Music,
  Clock,
  Snowflake,
  Volume2,
  Car,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { passengerApi } from "@/lib/api";

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
  const token = useAuthStore((s) => s.token);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  const pickup = searchParams.get("pickup") || "";
  const destination = searchParams.get("destination") || "";

  useEffect(() => {
    const fetchDrivers = async () => {
      if (!token) {
        navigate("/auth/login");
        return;
      }

      setLoading(true);
      try {
        const rideType = searchParams.get("rideType") as
          | "BASIC"
          | "PREMIUM"
          | undefined;

        const data = await passengerApi.searchDrivers({
          pickup,
          destination,
          rideType: rideType || "BASIC",
        });
        setDrivers((data as { drivers: Driver[] }).drivers || []);
      } catch (error: any) {
        toast.error(error.message || "Failed to load drivers");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [searchParams, token, navigate, pickup, destination]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 md:pb-0">
      <AppHeader title="Available Drivers" showBack />

      {/* Route Summary */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="w-0.5 h-8 bg-gray-200" />
              <div className="w-3 h-3 bg-yenko-yellow rounded-full" />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  From
                </p>
                <p className="font-medium text-gray-900 truncate">{pickup}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  To
                </p>
                <p className="font-medium text-gray-900 truncate">
                  {destination}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
            <div className="w-12 h-12 border-3 border-yenko-blue/30 border-t-yenko-blue rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Finding drivers...</p>
          </div>
        ) : drivers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No drivers available
            </h3>
            <p className="text-gray-500 mb-6">
              Try a different route or check back later
            </p>
            <Button
              onClick={() => navigate("/passenger/home")}
              className="h-12 px-8 bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/25"
            >
              Search Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 font-medium">
              {drivers.length} driver{drivers.length !== 1 ? "s" : ""} found
            </p>

            {drivers.map((driver) => (
              <div
                key={driver.id}
                onClick={() =>
                  navigate(
                    `/passenger/driver/${driver.id}?pickup=${pickup}&destination=${destination}&price=${driver.computedPrice}`,
                  )
                }
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer active:scale-[0.99]"
              >
                <div className="p-5">
                  {/* Top Row */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-yenko-blue to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        {driver.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900">
                            {driver.name}
                          </h3>
                          {driver.isPremium && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                              PREMIUM
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {driver.carModel}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yenko-blue">
                        ₵{driver.computedPrice.toFixed(0)}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 justify-end">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{driver.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-yenko-blue" />
                      <span>{driver.etaMinutes} min</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-yenko-blue" />
                      <span>{driver.seatsAvailable} seats</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <span>{driver.distance.toFixed(1)} km</span>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="flex gap-2 flex-wrap">
                    {driver.conditions.ac && (
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-xl font-medium">
                        <Snowflake className="w-3.5 h-3.5" /> A/C
                      </span>
                    )}
                    {driver.conditions.quiet && (
                      <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-2.5 py-1.5 rounded-xl font-medium">
                        <Volume2 className="w-3.5 h-3.5" /> Quiet
                      </span>
                    )}
                    {driver.conditions.music && (
                      <span className="inline-flex items-center gap-1 text-xs bg-pink-50 text-pink-700 px-2.5 py-1.5 rounded-xl font-medium">
                        <Music className="w-3.5 h-3.5" /> Music
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
                  <span className="text-sm text-gray-600">
                    View details & book
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
