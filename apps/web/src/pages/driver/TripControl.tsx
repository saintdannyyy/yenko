import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { MapPin, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DriverTripControl() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [tripStatus, setTripStatus] = useState("driver_assigned");
  const [loading, setLoading] = useState(false);

  const handleStartTrip = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/driver/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ride_id: tripId }),
      });

      if (response.ok) {
        setTripStatus("started");
        toast.success("Trip started!");
      } else {
        toast.error("Failed to start trip");
      }
    } catch (error) {
      toast.error("Error starting trip");
    } finally {
      setLoading(false);
    }
  };

  const handleEndTrip = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/driver/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ride_id: tripId }),
      });

      if (response.ok) {
        setTripStatus("completed");
        toast.success("Trip completed!");
        setTimeout(() => navigate("/driver/requests"), 2000);
      } else {
        toast.error("Failed to end trip");
      }
    } catch (error) {
      toast.error("Error ending trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yenko-bg pb-32">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-yenko-deep mt-4 mb-2">
            Trip #{tripId?.slice(0, 8)}
          </h1>
          <p className="text-yenko-muted">
            Trip Code:{" "}
            <strong className="text-yenko-deep font-mono">8A2K</strong>
          </p>
        </div>

        {/* Status */}
        <Card className="p-6 mb-6 border-l-4 border-l-yenko-blue">
          <h2 className="font-bold text-yenko-deep mb-2">Trip Status</h2>
          <p className="text-lg font-semibold text-yenko-blue capitalize">
            {tripStatus.replace("_", " ")}
          </p>
        </Card>

        {/* Passenger Info */}
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-yenko-deep mb-4">Passenger Details</h2>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-medium text-yenko-deep">Jane Doe</p>
              <p className="text-sm text-yenko-muted">Verified Passenger</p>
            </div>
            <div className="text-right">
              <div className="text-lg">⭐ 4.9</div>
              <p className="text-xs text-yenko-muted">312 rides</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex-1">
              💬 Message
            </Button>
          </div>
        </Card>

        {/* Route Info */}
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-yenko-deep mb-4">Route Information</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-yenko-blue flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-yenko-muted">From</p>
                <p className="font-medium text-yenko-deep">Osu, Accra</p>
              </div>
            </div>
            <div className="h-12 border-l-2 border-dashed border-yenko-blue ml-2.5" />
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-yenko-blue flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-yenko-muted">To</p>
                <p className="font-medium text-yenko-deep">Tema, Accra</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Info */}
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-yenko-deep mb-4">
            Payment Information
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-yenko-muted">Total Fare</span>
              <span className="font-medium">₵27.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yenko-muted">Commission (12%)</span>
              <span className="font-medium">₵3.24</span>
            </div>
            <div className="border-t border-yenko-muted pt-2 flex justify-between font-bold">
              <span>Your Earning</span>
              <span className="text-yenko-success">₵23.76</span>
            </div>
          </div>
        </Card>

        {/* Control Buttons */}
        <div className="fixed bottom-4 left-4 right-4 max-w-[calc(100%-2rem)] mx-auto flex gap-3">
          {tripStatus === "driver_assigned" && (
            <Button
              onClick={handleStartTrip}
              disabled={loading}
              className="flex-1 bg-yenko-blue hover:bg-yenko-deep text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {loading ? "Starting..." : "Start Trip"}
            </Button>
          )}

          {tripStatus === "started" && (
            <Button
              onClick={handleEndTrip}
              disabled={loading}
              className="flex-1 bg-yenko-success hover:bg-yenko-deep text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {loading ? "Ending..." : "End Trip"}
            </Button>
          )}

          {tripStatus === "completed" && (
            <div className="flex-1 text-center py-2 text-yenko-success font-medium">
              ✓ Trip Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
