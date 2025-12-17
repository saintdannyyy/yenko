import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  MessageCircle,
  ChevronLeft,
  Play,
  CheckCircle,
} from "lucide-react";
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

  const getStatusColor = () => {
    switch (tripStatus) {
      case "started":
        return "text-yenko-warning";
      case "completed":
        return "text-yenko-success";
      default:
        return "text-yenko-blue";
    }
  };

  return (
    <div className="min-h-screen bg-yenko-bgSecondary pb-32">
      {/* Header */}
      <header className="bg-white border-b border-yenko-separator px-4 h-14 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-yenko-bgSecondary transition-apple"
        >
          <ChevronLeft className="w-6 h-6 text-yenko-blue" />
        </button>
        <div>
          <h1 className="text-headline text-yenko-label">
            Trip #{tripId?.slice(0, 8)}
          </h1>
          <p className="text-caption text-yenko-muted">
            Code:{" "}
            <span className="font-mono font-medium text-yenko-label">8A2K</span>
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-apple overflow-hidden">
          <div className="p-4 border-b border-yenko-separator">
            <h2 className="text-subheadline font-semibold text-yenko-label">
              Trip Status
            </h2>
          </div>
          <div className="p-4">
            <p
              className={`text-headline font-semibold capitalize ${getStatusColor()}`}
            >
              {tripStatus.replace("_", " ")}
            </p>
          </div>
        </div>

        {/* Passenger Card */}
        <div className="bg-white rounded-2xl shadow-apple overflow-hidden">
          <div className="p-4 border-b border-yenko-separator">
            <h2 className="text-subheadline font-semibold text-yenko-label">
              Passenger Details
            </h2>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-headline text-yenko-label">Jane Doe</p>
                <p className="text-footnote text-yenko-secondary">
                  Verified Passenger
                </p>
              </div>
              <div className="text-right">
                <div className="text-subheadline font-medium text-yenko-label">
                  ⭐ 4.9
                </div>
                <p className="text-caption text-yenko-muted">312 rides</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11 border-yenko-separator text-yenko-label hover:bg-yenko-bgSecondary rounded-xl text-subheadline font-medium transition-apple"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-11 border-yenko-separator text-yenko-label hover:bg-yenko-bgSecondary rounded-xl text-subheadline font-medium transition-apple"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>

        {/* Route Card */}
        <div className="bg-white rounded-2xl shadow-apple overflow-hidden">
          <div className="p-4 border-b border-yenko-separator">
            <h2 className="text-subheadline font-semibold text-yenko-label">
              Route Information
            </h2>
          </div>
          <div className="p-4">
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-yenko-blue/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-yenko-blue" />
                </div>
                <div className="flex-1 w-0.5 bg-yenko-separator my-2 min-h-[40px]" />
                <div className="w-8 h-8 bg-yenko-success/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-yenko-success" />
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-caption text-yenko-muted">From</p>
                  <p className="text-subheadline text-yenko-label">
                    Osu, Accra
                  </p>
                </div>
                <div>
                  <p className="text-caption text-yenko-muted">To</p>
                  <p className="text-subheadline text-yenko-label">
                    Tema, Accra
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-apple overflow-hidden">
          <div className="p-4 border-b border-yenko-separator">
            <h2 className="text-subheadline font-semibold text-yenko-label">
              Payment Information
            </h2>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-callout text-yenko-secondary">
                Total Fare
              </span>
              <span className="text-callout font-medium text-yenko-label">
                ₵27.00
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-callout text-yenko-secondary">
                Commission (12%)
              </span>
              <span className="text-callout font-medium text-yenko-label">
                ₵3.24
              </span>
            </div>
            <div className="border-t border-yenko-separator pt-3 flex justify-between">
              <span className="text-subheadline font-semibold text-yenko-label">
                Your Earning
              </span>
              <span className="text-subheadline font-semibold text-yenko-success">
                ₵23.76
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-yenko-separator p-4">
        <div className="max-w-lg mx-auto">
          {tripStatus === "driver_assigned" && (
            <Button
              onClick={handleStartTrip}
              disabled={loading}
              className="w-full h-14 bg-yenko-blue hover:bg-yenko-blue/90 text-white text-body font-semibold rounded-xl shadow-apple transition-apple disabled:opacity-50"
            >
              <Play className="w-5 h-5 mr-2" />
              {loading ? "Starting..." : "Start Trip"}
            </Button>
          )}

          {tripStatus === "started" && (
            <Button
              onClick={handleEndTrip}
              disabled={loading}
              className="w-full h-14 bg-yenko-success hover:bg-yenko-success/90 text-white text-body font-semibold rounded-xl shadow-apple transition-apple disabled:opacity-50"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {loading ? "Ending..." : "End Trip"}
            </Button>
          )}

          {tripStatus === "completed" && (
            <div className="flex items-center justify-center gap-2 py-4 text-yenko-success">
              <CheckCircle className="w-6 h-6" />
              <span className="text-headline font-semibold">
                Trip Completed
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
