import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppHeader, BottomNav } from "@/components/app-header";
import {
  TrendingUp,
  Calendar,
  Car,
  Star,
  Wallet,
  ArrowUpRight,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import { driverApi } from "@/lib/api";

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
      const data = await driverApi.getEarnings();
      setEarnings(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load earnings");
    } finally {
      setLoading(false);
    }
  };

  const availableBalance = earnings.thisWeek * 0.88;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 md:pb-0">
      <AppHeader title="Earnings" />

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-3 border-yenko-blue/30 border-t-yenko-blue rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Loading earnings...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Card */}
          <div className="bg-gradient-to-br from-yenko-blue via-blue-600 to-indigo-700 px-4 py-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-2xl mx-auto relative">
              <p className="text-white/70 text-sm font-medium mb-1">
                Total Earnings
              </p>
              <h1 className="text-5xl font-bold text-white mb-1">
                ₵
                {earnings.total.toLocaleString("en-GH", {
                  minimumFractionDigits: 2,
                })}
              </h1>
              <p className="text-white/60 text-sm">Since you joined Yenko</p>

              {/* Quick Stats */}
              <div className="flex gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                    <Car className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">{earnings.trips}</p>
                    <p className="text-white/60 text-xs">Trips</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold">
                      {earnings.rating.toFixed(1)}
                    </p>
                    <p className="text-white/60 text-xs">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
            {/* Period Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-yenko-blue" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    12%
                  </span>
                </div>
                <p className="text-sm text-gray-500">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₵{earnings.thisWeek.toFixed(2)}
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    8%
                  </span>
                </div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₵{earnings.thisMonth.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Withdrawal Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Available Balance</p>
                      <p className="text-3xl font-bold">
                        ₵{availableBalance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 bg-white text-green-600 hover:bg-white/90 rounded-2xl font-bold shadow-lg">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Request Withdrawal
                </Button>
              </div>
            </div>

            {/* Tip Card */}
            <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
              <div className="w-10 h-10 bg-yenko-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-yenko-blue" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Earn More</p>
                <p className="text-gray-600 text-sm">
                  You keep 88% of every fare. Post more routes to maximize your
                  earnings!
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link to="/driver/requests">
                <Button className="w-full h-12 bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/25">
                  View Requests
                </Button>
              </Link>
              <Link to="/driver/direction">
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl font-semibold"
                >
                  Post Route
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}

      <BottomNav />
    </div>
  );
}
