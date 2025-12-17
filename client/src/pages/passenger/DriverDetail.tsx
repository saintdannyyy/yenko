import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Star, MapPin, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PassengerDriverDetail() {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      // Initialize Paystack payment
      const response = await fetch("/api/payments/paystack/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 2500, // Example amount in pesewas
          email: "user@example.com",
          metadata: { driverId },
        }),
      });

      if (response.ok) {
        const { authorization_url } = await response.json();
        window.location.href = authorization_url;
      } else {
        toast.error("Payment initialization failed");
      }
    } catch (error) {
      toast.error("Error booking ride");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yenko-bg">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <Button variant="outline" onClick={() => navigate(-1)}>
          ← Back
        </Button>

        {/* Driver Info */}
        <Card className="p-6 mt-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-yenko-deep mb-2">
                Driver Name
              </h1>
              <div className="flex items-center gap-2 text-sm text-yenko-muted mb-4">
                <Star className="w-4 h-4 fill-yenko-yellow text-yenko-yellow" />
                <span>4.8 (245 rides)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yenko-blue mb-2">
                ₵25.00
              </div>
              <span className="bg-yenko-yellow text-yenko-deep px-3 py-1 rounded font-bold text-sm">
                BASIC
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Car:</strong> Toyota Corolla 2020 (White)
            </p>
            <p>
              <strong>Plate:</strong> GH-4567-AC
            </p>
            <p>
              <strong>Seats Available:</strong> 2 / 4
            </p>
            <p>
              <strong>ETA to Pickup:</strong> 8 minutes
            </p>
          </div>
        </Card>

        {/* Conditions */}
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-yenko-deep mb-4">Ride Conditions</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yenko-bg rounded">
              <div className="text-2xl mb-2">❄️</div>
              <p className="text-sm">Air Conditioned</p>
            </div>
            <div className="text-center p-4 bg-yenko-bg rounded opacity-50">
              <div className="text-2xl mb-2">🤐</div>
              <p className="text-sm">Not Quiet</p>
            </div>
            <div className="text-center p-4 bg-yenko-bg rounded">
              <div className="text-2xl mb-2">🎵</div>
              <p className="text-sm">Music</p>
            </div>
          </div>
        </Card>

        {/* Route Info */}
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-yenko-deep mb-4">Route Information</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-yenko-blue flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-yenko-muted">Pickup</p>
                <p className="font-medium text-yenko-deep">Osu, Accra</p>
              </div>
            </div>
            <div className="h-12 border-l-2 border-dashed border-yenko-blue ml-2.5" />
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-yenko-blue flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-yenko-muted">Destination</p>
                <p className="font-medium text-yenko-deep">Tema, Accra</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Price Breakdown */}
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-yenko-deep mb-4">Price Breakdown</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-yenko-muted">Base Fare</span>
              <span className="font-medium">₵3.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yenko-muted">Distance (20 km)</span>
              <span className="font-medium">₵24.00</span>
            </div>
            <div className="border-t border-yenko-muted pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-yenko-blue">₵27.00</span>
            </div>
          </div>
        </Card>

        {/* Safety Notice */}
        <Card className="p-4 mb-6 bg-yellow-50 border-yellow-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              Share your trip details with a trusted contact before departing
            </p>
          </div>
        </Card>

        {/* Booking Button */}
        <div className="sticky bottom-4 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBooking}
            disabled={loading}
            className="flex-1 bg-yenko-blue hover:bg-yenko-deep text-white"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
}
