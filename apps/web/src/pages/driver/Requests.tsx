import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { MapPin, Users, Clock, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-yenko-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yenko-deep mb-2">
            Incoming Requests
          </h1>
          <p className="text-yenko-muted">{requests.length} new requests</p>
        </div>

        {/* Requests List */}
        {loading ? (
          <Card className="p-8 text-center text-yenko-muted">
            Loading requests...
          </Card>
        ) : requests.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-yenko-muted mb-4">
              No incoming requests at the moment
            </p>
            <Link to="/driver/direction">
              <Button className="bg-yenko-blue hover:bg-yenko-deep text-white">
                Post Another Route
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="p-4 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-yenko-deep">
                      {request.passenger_name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-yenko-muted">
                      <span>⭐ {request.passenger_rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yenko-blue">
                      ₵{request.offer_price.toFixed(2)}
                    </div>
                    <p className="text-xs text-yenko-muted">Total offer</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex gap-2">
                    <MapPin className="w-4 h-4 text-yenko-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-yenko-muted">From</p>
                      <p className="font-medium text-yenko-deep">
                        {request.pickup}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <MapPin className="w-4 h-4 text-yenko-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-yenko-muted">To</p>
                      <p className="font-medium text-yenko-deep">
                        {request.destination}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-yenko-muted">
                    <Users className="w-4 h-4 text-yenko-muted flex-shrink-0 mt-0.5" />
                    <span className="text-yenko-muted">
                      {request.seats_needed} passenger(s)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Clock className="w-4 h-4 text-yenko-muted flex-shrink-0 mt-0.5" />
                    <span className="text-yenko-muted">
                      {request.scheduled_time}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handleAccept(request.id)}
                  className="w-full bg-yenko-blue hover:bg-yenko-deep text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept Ride
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="sticky bottom-4 left-4 right-4 max-w-[calc(100%-2rem)] mx-auto flex gap-3 mt-8">
          <Link to="/driver/earnings" className="flex-1">
            <Button variant="outline" className="w-full">
              View Earnings
            </Button>
          </Link>
          <Link to="/driver/direction" className="flex-1">
            <Button className="w-full bg-yenko-yellow text-yenko-deep hover:bg-yenko-yellow/90">
              Post Route
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
