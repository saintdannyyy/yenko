import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppHeader, BottomNav } from "@/components/app-header";
import {
  Star,
  MapPin,
  Shield,
  Snowflake,
  Volume2,
  Music,
  Clock,
  Users,
  CreditCard,
  Share2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { passengerApi } from "@/lib/api";

interface DriverDetails {
  id: string;
  name: string;
  rating: number;
  totalRides: number;
  carModel: string;
  carColor: string;
  plateNumber: string;
  seatsAvailable: number;
  eta: number;
  conditions: {
    ac: boolean;
    quiet: boolean;
    music: boolean;
  };
}

export default function PassengerDriverDetail() {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const pickup = searchParams.get("pickup") || "Pickup location";
  const destination = searchParams.get("destination") || "Destination";
  const price = parseFloat(searchParams.get("price") || "25");

  // Mock driver details - in real app, fetch from API
  const driver: DriverDetails = {
    id: driverId || "",
    name: "Kofi Mensah",
    rating: 4.8,
    totalRides: 245,
    carModel: "Toyota Corolla 2020",
    carColor: "White",
    plateNumber: "GH-4567-AC",
    seatsAvailable: 2,
    eta: 8,
    conditions: {
      ac: true,
      quiet: false,
      music: true,
    },
  };

  const baseFare = 3;
  const distanceFare = price - baseFare;

  const handleBooking = async () => {
    setLoading(true);
    try {
      await passengerApi.requestRide({
        driverId: driverId!,
        pickup: { address: pickup },
        destination: { address: destination },
        price,
      });
      toast.success("Ride requested! Waiting for driver confirmation.");
      navigate("/passenger/trip-status");
    } catch (error: any) {
      toast.error(error.message || "Failed to book ride");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-32 md:pb-24">
      <AppHeader title="Driver Details" showBack />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Driver Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-yenko-blue to-blue-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold">
                {driver.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{driver.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">
                    {driver.rating.toFixed(1)}
                  </span>
                  <span className="text-white/70">
                    • {driver.totalRides} rides
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">₵{price.toFixed(0)}</div>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
                  BASIC
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                🚗
              </div>
              <div>
                <p className="font-semibold">{driver.carModel}</p>
                <p className="text-sm text-gray-500">
                  {driver.carColor} • {driver.plateNumber}
                </p>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-yenko-blue" />
                <span>{driver.eta} min away</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-yenko-blue" />
                <span>{driver.seatsAvailable} seats left</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conditions Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-4">Ride Conditions</h2>
          <div className="grid grid-cols-3 gap-3">
            <div
              className={`text-center p-4 rounded-2xl ${
                driver.conditions.ac ? "bg-blue-50" : "bg-gray-50 opacity-50"
              }`}
            >
              <div
                className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2 ${
                  driver.conditions.ac ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <Snowflake
                  className={`w-6 h-6 ${
                    driver.conditions.ac ? "text-blue-600" : "text-gray-400"
                  }`}
                />
              </div>
              <p
                className={`text-sm font-medium ${
                  driver.conditions.ac ? "text-blue-700" : "text-gray-400"
                }`}
              >
                {driver.conditions.ac ? "A/C" : "No A/C"}
              </p>
            </div>
            <div
              className={`text-center p-4 rounded-2xl ${
                driver.conditions.quiet
                  ? "bg-purple-50"
                  : "bg-gray-50 opacity-50"
              }`}
            >
              <div
                className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2 ${
                  driver.conditions.quiet ? "bg-purple-100" : "bg-gray-100"
                }`}
              >
                <Volume2
                  className={`w-6 h-6 ${
                    driver.conditions.quiet
                      ? "text-purple-600"
                      : "text-gray-400"
                  }`}
                />
              </div>
              <p
                className={`text-sm font-medium ${
                  driver.conditions.quiet ? "text-purple-700" : "text-gray-400"
                }`}
              >
                {driver.conditions.quiet ? "Quiet" : "Not Quiet"}
              </p>
            </div>
            <div
              className={`text-center p-4 rounded-2xl ${
                driver.conditions.music ? "bg-pink-50" : "bg-gray-50 opacity-50"
              }`}
            >
              <div
                className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2 ${
                  driver.conditions.music ? "bg-pink-100" : "bg-gray-100"
                }`}
              >
                <Music
                  className={`w-6 h-6 ${
                    driver.conditions.music ? "text-pink-600" : "text-gray-400"
                  }`}
                />
              </div>
              <p
                className={`text-sm font-medium ${
                  driver.conditions.music ? "text-pink-700" : "text-gray-400"
                }`}
              >
                {driver.conditions.music ? "Music" : "No Music"}
              </p>
            </div>
          </div>
        </div>

        {/* Route Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-4">Route Information</h2>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="w-0.5 h-16 bg-gray-200" />
              <div className="w-3 h-3 bg-yenko-yellow rounded-full" />
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Pickup
                </p>
                <p className="font-semibold text-gray-900">{pickup}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Destination
                </p>
                <p className="font-semibold text-gray-900">{destination}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-4">Price Breakdown</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Base Fare</span>
              <span className="font-medium text-gray-900">
                ₵{baseFare.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Distance</span>
              <span className="font-medium text-gray-900">
                ₵{distanceFare.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-yenko-blue text-lg">
                ₵{price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-semibold text-amber-800 text-sm">Safety First</p>
            <p className="text-sm text-amber-700">
              Share your trip details with a trusted contact before departing
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Actions - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-6 md:pb-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            className="w-14 h-14 p-0 rounded-2xl border-2 border-gray-200"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "My Yenko Trip",
                  text: `I'm taking a ride from ${pickup} to ${destination}`,
                });
              }
            }}
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleBooking}
            disabled={loading}
            className="flex-1 h-14 bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/25 transition-all"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Book for ₵{price.toFixed(0)}
              </>
            )}
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
