import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppHeader, BottomNav } from "@/components/app-header";
import {
  MapPin,
  Search,
  Clock,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export default function PassengerHome() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
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
      const pickupCoords = { lat: 5.6037, lng: -0.187 };
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

  const recentPlaces = [
    {
      name: "Work - Accra Mall",
      address: "Tetteh Quarshie, Accra",
      icon: "🏢",
    },
    { name: "Home", address: "East Legon, Accra", icon: "🏠" },
    { name: "University of Ghana", address: "Legon, Accra", icon: "🎓" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 md:pb-0">
      <AppHeader />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Hello, {user?.full_name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Where would you like to go today?
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Pickup */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-yenko-blue rounded-full" />
              <Input
                type="text"
                placeholder="Pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="h-14 pl-10 rounded-2xl bg-gray-50 border-0 text-base font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-yenko-blue/20"
                required
              />
            </div>

            {/* Connector line */}
            <div className="flex items-center gap-3 px-4">
              <div className="w-0.5 h-6 bg-gray-200 ml-1" />
            </div>

            {/* Destination */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-yenko-yellow rounded-full" />
              <Input
                type="text"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="h-14 pl-10 rounded-2xl bg-gray-50 border-0 text-base font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-yenko-blue/20"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:scale-[1.02]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Find Drivers
                </div>
              )}
            </Button>
          </form>
        </div>

        {/* Recent Places */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Recent Places
            </h2>
            <button className="text-sm font-semibold text-yenko-blue hover:underline">
              See all
            </button>
          </div>
          <div className="space-y-3">
            {recentPlaces.map((place, index) => (
              <button
                key={index}
                onClick={() => setDestination(place.address)}
                className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-yenko-blue/30 hover:shadow-md transition-all text-left group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl group-hover:bg-yenko-blue/10 transition-colors">
                  {place.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {place.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {place.address}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-yenko-blue group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Promo Card */}
        <div className="bg-gradient-to-r from-yenko-blue to-blue-600 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yenko-yellow" />
              <span className="text-sm font-bold text-yenko-yellow">NEW</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Refer a friend</h3>
            <p className="text-white/80 text-sm mb-4">
              Get ₵10 off your next ride when you refer a friend to Yenko
            </p>
            <Button className="bg-white text-yenko-blue hover:bg-gray-100 font-bold rounded-xl h-10 px-6">
              Invite Friends
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
