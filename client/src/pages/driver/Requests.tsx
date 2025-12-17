import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/app-header";
import { MapPin, Users, Clock, Check } from "lucide-react";
import { toast } from "sonner";

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

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/driver/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests || []);
      }
    } catch (error) {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/driver/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ride_id: requestId }),
      });

      if (response.ok) {
        toast.success("Ride accepted!");
        setRequests(requests.filter((r) => r.id !== requestId));
      } else {
        toast.error("Failed to accept ride");
      }
    } catch (error) {
      toast.error("Error accepting ride");
    }
  };

  return (
    <div className="min-h-screen bg-yenko-bgSecondary">
      <AppHeader />

      {/* Page Header */}
      <div className="bg-white border-b border-yenko-separator px-4 py-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-title-md text-yenko-label">Incoming Requests</h1>
          <p className="text-callout text-yenko-secondary mt-1">
            {requests.length} new{" "}
            {requests.length === 1 ? "request" : "requests"}
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-apple">
            <p className="text-body text-yenko-secondary">
              Loading requests...
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-apple">
            <p className="text-body text-yenko-secondary mb-4">
              No incoming requests at the moment
            </p>
            <Link to="/driver/direction">
              <Button className="bg-yenko-blue hover:bg-yenko-blue/90 text-white rounded-xl h-12 px-6 text-body font-medium shadow-apple transition-apple">
                Post Another Route
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-2xl shadow-apple overflow-hidden transition-apple hover:shadow-apple-md"
              >
                {/* Header */}
                <div className="p-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-headline text-yenko-label">
                      {request.passenger_name}
                    </h3>
                    <div className="flex items-center gap-1 text-footnote text-yenko-secondary">
                      <span>⭐ {request.passenger_rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-title-md text-yenko-blue font-semibold">
                      ₵{request.offer_price.toFixed(2)}
                    </div>
                    <p className="text-caption text-yenko-muted">Total offer</p>
                  </div>
                </div>

                {/* Route Details */}
                <div className="px-4 pb-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-yenko-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-yenko-blue" />
                    </div>
                    <div>
                      <p className="text-caption text-yenko-muted">From</p>
                      <p className="text-subheadline text-yenko-label">
                        {request.pickup}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-yenko-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-yenko-success" />
                    </div>
                    <div>
                      <p className="text-caption text-yenko-muted">To</p>
                      <p className="text-subheadline text-yenko-label">
                        {request.destination}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2 border-t border-yenko-separator">
                    <div className="flex items-center gap-2 text-footnote text-yenko-secondary">
                      <Users className="w-4 h-4" />
                      <span>{request.seats_needed} passenger(s)</span>
                    </div>
                    <div className="flex items-center gap-2 text-footnote text-yenko-secondary">
                      <Clock className="w-4 h-4" />
                      <span>{request.scheduled_time}</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="p-4 border-t border-yenko-separator">
                  <Button
                    onClick={() => handleAccept(request.id)}
                    className="w-full h-12 bg-yenko-blue hover:bg-yenko-blue/90 text-white text-body font-semibold rounded-xl shadow-apple transition-apple"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Accept Ride
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
