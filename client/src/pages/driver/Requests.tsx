import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppHeader, BottomNav } from "@/components/app-header";
import {
  MapPin,
  Users,
  Clock,
  Check,
  Inbox,
  Navigation,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { driverApi } from "@/lib/api";

interface Request {
  id: string;
  passenger_name: string;
  passenger_rating: number;
  pickup: string;
  destination: string;
  seats_needed: number;
  offer_price: number;
  scheduled_time: string;
}

export default function DriverRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await driverApi.getRequests();
      setRequests(data.requests || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: string) => {
    setAccepting(requestId);
    try {
      await driverApi.acceptRide(requestId);
      toast.success("Ride accepted! 🎉");
      setRequests(requests.filter((r) => r.id !== requestId));
    } catch (error: any) {
      toast.error(error.message || "Failed to accept ride");
    } finally {
      setAccepting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 md:pb-0">
      <AppHeader title="Ride Requests" />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-yenko-blue to-blue-600 px-4 py-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Inbox className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Incoming Requests
              </h1>
              <p className="text-white/80 text-sm">
                {requests.length}{" "}
                {requests.length === 1 ? "passenger" : "passengers"} waiting
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
            <div className="w-12 h-12 border-3 border-yenko-blue/30 border-t-yenko-blue rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No requests yet
            </h3>
            <p className="text-gray-500 mb-6">
              Post your route to start receiving ride requests from passengers
            </p>
            <Link to="/driver/direction">
              <Button className="h-12 px-8 bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/25">
                <Navigation className="w-5 h-5 mr-2" />
                Post Your Route
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Header */}
                <div className="p-5 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yenko-blue to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                      {request.passenger_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {request.passenger_name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span className="text-yellow-500">★</span>
                        <span>{request.passenger_rating.toFixed(1)}</span>
                        <span className="mx-1">•</span>
                        <Users className="w-3.5 h-3.5" />
                        <span>
                          {request.seats_needed} seat
                          {request.seats_needed > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yenko-blue">
                      ₵{request.offer_price.toFixed(0)}
                    </div>
                    <p className="text-xs text-gray-400">offered</p>
                  </div>
                </div>

                {/* Route Details */}
                <div className="px-5 py-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <div className="w-0.5 h-10 bg-gray-200" />
                      <div className="w-3 h-3 bg-yenko-yellow rounded-full" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                          Pickup
                        </p>
                        <p className="font-semibold text-gray-900">
                          {request.pickup}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                          Destination
                        </p>
                        <p className="font-semibold text-gray-900">
                          {request.destination}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {request.scheduled_time}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-gray-50/50 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-2xl border-gray-200 text-gray-600 hover:bg-gray-100 font-semibold"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Decline
                  </Button>
                  <Button
                    onClick={() => handleAccept(request.id)}
                    disabled={accepting === request.id}
                    className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-semibold shadow-lg shadow-green-500/25"
                  >
                    {accepting === request.id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </div>
                    ) : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Accept
                      </>
                    )}
                  </Button>
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
