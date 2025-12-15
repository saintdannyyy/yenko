import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import { TrendingUp, Calendar, Car, Star, Info } from "lucide-react";
import { toast } from "sonner";

interface Earnings {
  total: number;
  thisWeek: number;
  thisMonth: number;
  trips: number;
  rating: number;
}

export default function DriverEarnings() {
  const [earnings, setEarnings] = useState<Earnings>({
    total: 0,
    thisWeek: 0,
    thisMonth: 0,
    trips: 0,
    rating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/driver/earnings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setEarnings(data);
      }
    } catch (error) {
      toast.error("Failed to load earnings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yenko-bgSecondary">
      {/* Header */}
      <header className="bg-white border-b border-yenko-separator px-4 py-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-title-md text-yenko-label">Your Earnings</h1>
          <p className="text-callout text-yenko-secondary mt-1">
            Track your income and performance
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-apple">
            <p className="text-body text-yenko-secondary">
              Loading earnings...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Total Earnings Card */}
            <div className="bg-white rounded-2xl p-6 shadow-apple">
              <p className="text-callout text-yenko-secondary mb-1">
                Total Earnings
              </p>
              <h2 className="text-4xl font-semibold text-yenko-label mb-1">
                ₵{earnings.total.toFixed(2)}
              </h2>
              <p className="text-footnote text-yenko-muted">
                Since you joined Yenko
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 shadow-apple">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 bg-yenko-blue/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-yenko-blue" />
                  </div>
                </div>
                <p className="text-footnote text-yenko-secondary mb-0.5">
                  This Week
                </p>
                <p className="text-title-md text-yenko-blue font-semibold">
                  ₵{earnings.thisWeek.toFixed(2)}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-apple">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 bg-yenko-success/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-yenko-success" />
                  </div>
                </div>
                <p className="text-footnote text-yenko-secondary mb-0.5">
                  This Month
                </p>
                <p className="text-title-md text-yenko-success font-semibold">
                  ₵{earnings.thisMonth.toFixed(2)}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-apple">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 bg-yenko-warning/10 rounded-xl flex items-center justify-center">
                    <Car className="w-5 h-5 text-yenko-warning" />
                  </div>
                </div>
                <p className="text-footnote text-yenko-secondary mb-0.5">
                  Completed Trips
                </p>
                <p className="text-title-md text-yenko-label font-semibold">
                  {earnings.trips}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-apple">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
                <p className="text-footnote text-yenko-secondary mb-0.5">
                  Your Rating
                </p>
                <p className="text-title-md text-yenko-label font-semibold">
                  {earnings.rating.toFixed(1)} ⭐
                </p>
              </div>
            </div>

            {/* Withdrawal Card */}
            <div className="bg-white rounded-2xl shadow-apple overflow-hidden">
              <div className="p-4 border-b border-yenko-separator">
                <h2 className="text-subheadline font-semibold text-yenko-label">
                  Available for Withdrawal
                </h2>
              </div>
              <div className="p-4">
                <p className="text-footnote text-yenko-secondary mb-1">
                  Balance
                </p>
                <p className="text-3xl font-semibold text-yenko-blue mb-4">
                  ₵{(earnings.thisWeek * 0.8).toFixed(2)}
                </p>
                <Button className="w-full h-12 bg-yenko-blue hover:bg-yenko-blue/90 text-white text-body font-semibold rounded-xl shadow-apple transition-apple">
                  Request Withdrawal
                </Button>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-yenko-blue/5 rounded-2xl p-4 flex gap-3">
              <Info className="w-5 h-5 text-yenko-blue flex-shrink-0 mt-0.5" />
              <p className="text-callout text-yenko-secondary">
                <span className="font-medium text-yenko-label">Tip:</span> You
                earn 88% of the ride fare. The remaining 12% goes to Yenko
                operations.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Link to="/driver/requests">
                <Button className="w-full h-12 bg-yenko-blue hover:bg-yenko-blue/90 text-white text-body font-semibold rounded-xl shadow-apple transition-apple">
                  View Requests
                </Button>
              </Link>
              <Link to="/driver/direction">
                <Button
                  variant="outline"
                  className="w-full h-12 border-yenko-separator text-yenko-label hover:bg-yenko-bgSecondary text-body font-medium rounded-xl transition-apple"
                >
                  Post Another Route
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
