import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { MapPin, Phone, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function PassengerTripStatus() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [tripStatus] = useState("en_route"); // pending, driver_assigned, en_route, arrived, completed

  const statusSteps = [
    { key: "pending", label: "Waiting for Driver", icon: "🔄" },
    { key: "driver_assigned", label: "Driver Assigned", icon: "✓" },
    { key: "en_route", label: "En Route to Pickup", icon: "🚗" },
    { key: "arrived", label: "Driver Arrived", icon: "📍" },
    { key: "started", label: "Trip Started", icon: "🚦" },
    { key: "completed", label: "Trip Completed", icon: "✓" },
  ];

  const currentStepIndex = statusSteps.findIndex((s) => s.key === tripStatus);

  return (
    <div className="min-h-screen bg-yenko-bg pb-32">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-yenko-deep mb-2">
            Trip #{tripId?.slice(0, 8)}
          </h1>
          <p className="text-yenko-muted">
            Trip Code:{" "}
            <strong className="text-yenko-deep font-mono">8A2K</strong>
          </p>
        </div>

        {/* Map Placeholder */}
        <Card className="h-64 bg-gradient-to-br from-yenko-blue/10 to-yenko-yellow/10 mb-6 flex items-center justify-center rounded-lg overflow-hidden">
          <div className="text-center">
            <div className="text-6xl mb-2">🗺️</div>
            <p className="text-yenko-muted">Live Map View</p>
          </div>
        </Card>

        {/* Status Timeline */}
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-yenko-deep mb-6">Trip Progress</h2>
          <div className="space-y-4">
            {statusSteps.map((step, index) => (
              <div key={step.key} className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index <= currentStepIndex
                      ? "bg-yenko-blue text-white"
                      : "bg-yenko-muted/20 text-yenko-muted"
                  }`}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      index === currentStepIndex
                        ? "text-yenko-blue"
                        : "text-yenko-muted"
                    }`}
                  >
                    {step.label}
                  </p>
                  {index === currentStepIndex && (
                    <p className="text-sm text-yenko-muted">
                      8 minutes remaining
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Driver Info */}
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-yenko-deep mb-4">Driver Details</h2>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-medium text-yenko-deep">John Doe</p>
              <p className="text-sm text-yenko-muted">
                Toyota Corolla • GH-4567-AC
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg">⭐ 4.8</div>
              <p className="text-xs text-yenko-muted">245 rides</p>
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

        {/* Route Summary */}
        <Card className="p-6 mb-6">
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

        {/* Safety Tip */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Your location is being shared with your emergency contact
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="fixed bottom-4 left-4 right-4 max-w-[calc(100%-2rem)] mx-auto flex gap-3">
          <Button variant="outline" className="flex-1">
            <AlertCircle className="w-4 h-4 mr-2" />
            Report Issue
          </Button>
          <Button
            onClick={() => navigate("/passenger/home")}
            className="flex-1 bg-yenko-blue hover:bg-yenko-deep text-white"
          >
            Cancel Trip
          </Button>
        </div>
      </div>
    </div>
  );
}
