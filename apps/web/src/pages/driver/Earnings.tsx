import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { TrendingUp, DollarSign, Calendar, Users } from "lucide-react";
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
    <div className="min-h-screen bg-yenko-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yenko-deep mb-2">
            Your Earnings
          </h1>
          <p className="text-yenko-muted">Track your income and performance</p>
        </div>

        {loading ? (
          <Card className="p-8 text-center text-yenko-muted">
            Loading earnings...
          </Card>
        ) : (
          <>
            {/* Total Earnings */}
            <Card className="p-6 mb-6 bg-gradient-to-r from-yenko-blue to-yenko-deep text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/70 mb-2">Total Earnings</p>
                  <h2 className="text-4xl font-bold mb-2">
                    ₵{earnings.total.toFixed(2)}
                  </h2>
                  <p className="text-white/70 text-sm">
                    Since you joined Yenko
                  </p>
                </div>
                <DollarSign className="w-12 h-12 opacity-50" />
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-yenko-muted mb-1">This Week</p>
                    <p className="text-2xl font-bold text-yenko-blue">
                      ₵{earnings.thisWeek.toFixed(2)}
                    </p>
                  </div>
                  <Calendar className="w-6 h-6 text-yenko-muted" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-yenko-muted mb-1">This Month</p>
                    <p className="text-2xl font-bold text-yenko-blue">
                      ₵{earnings.thisMonth.toFixed(2)}
                    </p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-yenko-muted" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-yenko-muted mb-1">
                      Completed Trips
                    </p>
                    <p className="text-2xl font-bold text-yenko-blue">
                      {earnings.trips}
                    </p>
                  </div>
                  <Users className="w-6 h-6 text-yenko-muted" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-yenko-muted mb-1">Your Rating</p>
                    <p className="text-2xl font-bold text-yenko-blue">
                      {earnings.rating.toFixed(1)} ⭐
                    </p>
                  </div>
                  <div className="text-3xl">⭐</div>
                </div>
              </Card>
            </div>

            {/* Withdrawal Card */}
            <Card className="p-6 mb-6">
              <h2 className="font-bold text-yenko-deep mb-4">
                Available for Withdrawal
              </h2>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-yenko-muted mb-1">Balance</p>
                  <p className="text-3xl font-bold text-yenko-blue">
                    ₵{(earnings.thisWeek * 0.8).toFixed(2)}
                  </p>
                </div>
              </div>
              <Button className="w-full bg-yenko-yellow text-yenko-deep hover:bg-yenko-yellow/90 font-bold">
                Request Withdrawal
              </Button>
            </Card>

            {/* Info Card */}
            <Card className="p-4 bg-blue-50 border-blue-200 mb-8">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> You earn 88% of the ride fare. The
                remaining 12% goes to Yenko operations.
              </p>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link to="/driver/requests">
                <Button className="w-full bg-yenko-blue hover:bg-yenko-deep text-white">
                  View Requests
                </Button>
              </Link>
              <Link to="/driver/direction">
                <Button variant="outline" className="w-full">
                  Post Another Route
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
