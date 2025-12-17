"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Car,
  Star,
  CheckCircle2,
  Sparkles,
  Rocket,
  PartyPopper,
  Gift,
  DollarSign,
  CheckCircle,
  Zap,
  TrendingUp,
  Clock,
  ArrowRight,
  Loader2,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export function WaitlistSection() {
  const [activeTab, setActiveTab] = useState<"passenger" | "driver">(
    "passenger",
  );
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalSignups] = useState(327);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/waitlist/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          area: formData.area,
          email: formData.email || undefined,
          role: activeTab,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to join waitlist");
      }

      setSubmitted(true);
      setFormData({ name: "", phone: "", area: "", email: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="py-10 lg:py-10 bg-gradient-to-br from-[#0057FF] via-[#0045CC] to-[#0057FF] relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD400]/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-float-slow hidden lg:block">
          <Sparkles className="w-16 h-16 text-white" strokeWidth={1.5} />
        </div>
        <div
          className="absolute bottom-32 right-20 opacity-20 animate-float-slow hidden lg:block"
          style={{ animationDelay: "1.5s" }}
        >
          <Zap className="w-20 h-20 text-[#FFD400]" strokeWidth={1.5} />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-8 lg:mb-8">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full mb-4 shadow-2xl animate-slide-down group hover:bg-white/15 transition-all cursor-default">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFD400] rounded-full blur-md animate-pulse"></div>
              <Sparkles className="w-5 h-5 text-[#FFD400] relative z-10" />
            </div>
            <span className="font-black text-sm uppercase tracking-wider text-white flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              EARLY ACCESS OPEN
            </span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          </div>
          <p className="text-xl sm:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
            Be among the{" "}
            <span className="font-black text-[#FFD400]">
              first to experience
            </span>{" "}
            seamless, affordable rides in Accra.{" "}
            <span className="font-black text-white">
              Exclusive perks await.
            </span>
          </p>

          {/* Social proof bar with live counter */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 px-6 py-4 rounded-2xl shadow-xl group hover:bg-white/15 transition-all">
              <div className="relative">
                <Users className="w-6 h-6 text-[#FFD400] animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-black text-white">
                  {totalSignups}+
                </div>
                <div className="text-xs text-white/70 font-semibold uppercase tracking-wide">
                  People Waiting
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 px-6 py-4 rounded-2xl shadow-xl group hover:bg-white/15 transition-all">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div className="text-left">
                <div className="text-3xl font-black text-white">24</div>
                <div className="text-xs text-white/70 font-semibold uppercase tracking-wide">
                  Joined Today
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 px-6 py-4 rounded-2xl shadow-xl group hover:bg-white/15 transition-all">
              <Clock className="w-6 h-6 text-[#FFD400]" />
              <div className="text-left">
                <div className="text-3xl font-black text-white">2min</div>
                <div className="text-xs text-white/70 font-semibold uppercase tracking-wide">
                  Avg. Sign Up
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main card with perks sidebar */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8">
          {/* Form card */}
          <div className="bg-white rounded-[2rem] shadow-2xl p-6 sm:p-10 relative overflow-hidden order-2 lg:order-1">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#FFD400]/20 to-transparent rounded-bl-full"></div>

            {/* Tabs */}
            <div className="flex rounded-2xl bg-gray-100 p-1.5 mb-8 relative z-10">
              <button
                onClick={() => setActiveTab("passenger")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "passenger"
                    ? "bg-gradient-to-r from-[#0057FF] to-[#0045CC] text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users className="w-5 h-5" />
                Ride with Yenko
              </button>
              <button
                onClick={() => setActiveTab("driver")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "driver"
                    ? "bg-gradient-to-r from-[#FFD400] to-[#FFC700] text-gray-900 shadow-lg scale-105"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Car className="w-5 h-5" />
                Drive with Yenko
              </button>
            </div>

            {/* Form */}
            {submitted ? (
              <div className="text-center py-16 relative z-10">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 mx-auto flex items-center justify-center shadow-2xl">
                    <CheckCircle
                      className="w-12 h-12 text-white"
                      strokeWidth={3}
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3 flex items-center justify-center gap-3">
                  <PartyPopper className="w-8 h-8 text-[#FFD400]" />
                  You're In!
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  Welcome to the Yenko community. We'll notify you when we
                  launch!
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-[#FFD400] fill-[#FFD400]" />
                  <span>Check your phone for a confirmation message</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Error banner */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <span className="text-red-500 text-sm font-medium">
                      {error}
                    </span>
                  </div>
                )}

                {/* Info banner */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#0057FF] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-gray-900">
                      {activeTab === "passenger" ? "Passengers:" : "Drivers:"}
                    </span>{" "}
                    <span className="flex items-center gap-1.5">
                      {activeTab === "passenger" ? (
                        <>
                          <span>
                            Get priority access & exclusive launch discounts
                          </span>
                          <Gift className="w-4 h-4 text-[#FFD400] inline-block flex-shrink-0" />
                        </>
                      ) : (
                        <>
                          <span>
                            Enjoy zero commission for your first 50 trips
                          </span>
                          <DollarSign className="w-4 h-4 text-green-500 inline-block flex-shrink-0" />
                        </>
                      )}
                    </span>
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Kwame Asante"
                      required
                      disabled={loading}
                      className="h-14 rounded-xl border-2 border-gray-200 focus:border-[#0057FF] text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="024 XXX XXXX"
                      required
                      disabled={loading}
                      className="h-14 rounded-xl border-2 border-gray-200 focus:border-[#0057FF] text-base"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Area / Location *
                    </label>
                    <Input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g., Madina, East Legon"
                      required
                      disabled={loading}
                      className="h-14 rounded-xl border-2 border-gray-200 focus:border-[#0057FF] text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Email (Optional)
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="kwame@example.com"
                      disabled={loading}
                      className="h-14 rounded-xl border-2 border-gray-200 focus:border-[#0057FF] text-base"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className={`w-full h-16 rounded-xl text-lg font-black shadow-2xl transition-all hover:scale-105 ${
                    activeTab === "passenger"
                      ? "bg-gradient-to-r from-[#0057FF] to-[#0045CC] hover:from-[#0045CC] hover:to-[#003399] text-white"
                      : "bg-gradient-to-r from-[#FFD400] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFB600] text-gray-900"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                      Securing Your Spot...
                    </>
                  ) : (
                    <>
                      <span>
                        {activeTab === "passenger"
                          ? "Get Early Access"
                          : "Start Earning Early"}
                      </span>
                      <ArrowRight className="w-6 h-6 ml-2" />
                    </>
                  )}
                </Button>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-6 pt-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No spam</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Unsubscribe anytime</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>100% free</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Perks sidebar */}
          <div className="space-y-4 order-1 lg:order-2">
            {/* Early access perks */}
            <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-[2rem] p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD400] to-[#FFC700] flex items-center justify-center shadow-lg">
                  <Gift className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-xl font-black text-white">
                  {activeTab === "passenger"
                    ? "Passenger Perks"
                    : "Driver Benefits"}
                </h3>
              </div>

              <div className="space-y-4">
                {activeTab === "passenger" ? (
                  <>
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-green-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          Priority Booking
                        </p>
                        <p className="text-xs text-white/70">
                          Skip the line when we launch
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          50% Off First Ride
                        </p>
                        <p className="text-xs text-white/70">
                          Exclusive launch discount
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          Referral Bonuses
                        </p>
                        <p className="text-xs text-white/70">
                          Earn free rides by inviting friends
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-purple-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          VIP Treatment
                        </p>
                        <p className="text-xs text-white/70">
                          Matched with top-rated drivers
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-green-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          Zero Commission
                        </p>
                        <p className="text-xs text-white/70">
                          First 50 trips are 100% yours
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          GH₵500+ Weekly
                        </p>
                        <p className="text-xs text-white/70">
                          Average early driver earnings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          Flexible Schedule
                        </p>
                        <p className="text-xs text-white/70">
                          Drive on your own terms
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-purple-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          Instant Payouts
                        </p>
                        <p className="text-xs text-white/70">
                          Get paid immediately
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Urgency card */}
            <div className="bg-gradient-to-br from-[#FFD400] to-[#FFC700] rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-gray-900" />
                  <span className="text-xs font-black uppercase tracking-wider text-gray-900">
                    Limited Spots
                  </span>
                </div>
                <p className="text-2xl font-black text-gray-900 mb-2">
                  Only 100 spots left
                </p>
                <p className="text-sm text-gray-800">
                  Early access is filling up fast. Lock in your exclusive perks
                  today.
                </p>
              </div>
            </div>

            {/* Social proof */}
            <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-[2rem] p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center text-xs font-bold text-gray-900">
                    +{totalSignups}
                  </div>
                </div>
              </div>
              <p className="text-sm text-white font-medium">
                <span className="font-black text-[#FFD400]">
                  {totalSignups}+ people
                </span>{" "}
                have already joined. Be part of something big.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-gradient-flow {
          animation: gradient-flow 3s ease infinite;
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
