"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  ArrowRight,
  Bell,
  Navigation,
  Users,
  Clock,
  TrendingUp,
  PartyPopper,
  Car,
} from "lucide-react";
export function PilotRoute() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      id="pilot-route"
      className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#0057FF]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#FFD400]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Enhanced Route visualization */}
          <div className="relative order-2 lg:order-1">
            {/* Floating badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-2xl animate-bounce-slow z-20 hidden sm:block">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Live Soon!
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0057FF] to-[#0045CC] rounded-[2rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              </div>

              {/* Moving car animation */}
              <div className="absolute top-20 left-14 w-12 h-12 flex items-center justify-center shadow-lg animate-drive z-10">
                <Car className="w-10 h-10 text-yellow-500 rotate-90" />
              </div>

              <div className="space-y-8 relative z-10">
                {/* Route points */}
                <div className="flex items-center gap-4 animate-fade-in-up">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FFD400] rounded-full blur-lg animate-pulse"></div>
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD400] to-[#FFC700] flex items-center justify-center flex-shrink-0 shadow-xl">
                      <MapPin className="w-8 h-8 text-gray-900" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex-1 border border-white/20">
                    <p className="text-xs text-white/70 font-semibold uppercase tracking-wide">
                      Starting Point
                    </p>
                    <p className="text-2xl font-black text-white">Madina</p>
                    <p className="text-xs text-white/60 mt-1">Market Area</p>
                  </div>
                </div>

                {/* Animated route line */}
                <div className="ml-8 relative h-24">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#FFD400] via-white to-[#FFD400] animate-pulse"></div>
                  <div className="absolute left-0 top-0 w-1 h-full bg-white/30 animate-flow"></div>

                  {/* Route stats floating */}
                  <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/30 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-3 text-white">
                      <Clock className="w-4 h-4 text-[#FFD400]" />
                      <span className="text-sm font-bold">~25 min</span>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-4 animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-full blur-lg animate-pulse"></div>
                    <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-xl">
                      <MapPin className="w-8 h-8 text-[#0057FF]" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex-1 border border-white/20">
                    <p className="text-xs text-white/70 font-semibold uppercase tracking-wide">
                      Via Point
                    </p>
                    <p className="text-2xl font-black text-white">
                      37 Roundabout
                    </p>
                    <p className="text-xs text-white/60 mt-1">Major Junction</p>
                  </div>
                </div>

                {/* Animated route line */}
                <div className="ml-8 relative h-24">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-white via-[#FFD400] to-green-400 animate-pulse"></div>
                  <div
                    className="absolute left-0 top-0 w-1 h-full bg-white/30 animate-flow"
                    style={{ animationDelay: "0.5s" }}
                  ></div>

                  {/* Passenger count floating */}
                  <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/30 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-3 text-white">
                      <Users className="w-4 h-4 text-[#FFD400]" />
                      <span className="text-sm font-bold">4 seats</span>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-4 animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-lg animate-pulse"></div>
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-xl">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex-1 border border-white/20">
                    <p className="text-xs text-white/70 font-semibold uppercase tracking-wide">
                      Destination
                    </p>
                    <p className="text-2xl font-black text-white">
                      Accra Central
                    </p>
                    <p className="text-xs text-white/60 mt-1">CBD Area</p>
                  </div>
                </div>
              </div>

              {/* Route stats at bottom */}
              <div className="mt-8 grid grid-cols-3 gap-3 relative z-10">
                <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-[#FFD400]">15km</p>
                  <p className="text-xs text-white/70 font-semibold">
                    Distance
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-[#FFD400]">GH₵7-9</p>
                  <p className="text-xs text-white/70 font-semibold">
                    Fare Range
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-3 text-center">
                  <p className="text-2xl font-black text-[#FFD400]">50+</p>
                  <p className="text-xs text-white/70 font-semibold">
                    Daily Trips
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FFD400]/20 to-[#FFC700]/20 border border-[#FFD400]/30 px-6 py-3 rounded-full text-sm font-black mb-6 shadow-lg">
                <span className="w-2 h-2 bg-[#FFD400] rounded-full animate-pulse" />
                <span className="text-gray-900">Launching January 2026</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 text-balance leading-tight mb-4">
                Our First{" "}
                <span className="relative inline-block">
                  <span className="text-[#0057FF]">Pilot Route</span>
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2"
                    viewBox="0 0 200 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 4 Q 100 2, 200 4"
                      stroke="#FFD400"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                We're launching with{" "}
                <span className="font-black text-[#0057FF]">
                  Accra's busiest corridor
                </span>{" "}
                — a route thousands travel daily. This strategic start ensures:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      High Demand Coverage
                    </p>
                    <p className="text-sm text-gray-600">
                      Serving the most travelers from day one
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-[#0057FF]"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Smooth Operations</p>
                    <p className="text-sm text-gray-600">
                      Perfecting our service before scaling up
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-[#FFD400]"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Rapid Expansion</p>
                    <p className="text-sm text-gray-600">
                      Your area could be next — get notified!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0057FF] to-[#0045CC] flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-lg">
                    Want Yenko In Your Area?
                  </p>
                  <p className="text-sm text-gray-600">
                    Be first to know when we expand
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-700 font-bold flex items-center gap-2">
                    <PartyPopper className="w-5 h-5 text-green-600" />
                    Thanks! We'll notify you when we reach your area.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Input
                    type="text"
                    placeholder="Enter your area (e.g., Tema, Kasoa, Dansoman)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 rounded-xl flex-1 border-2 border-gray-300 focus:border-[#0057FF] text-base"
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#0057FF] to-[#0045CC] hover:from-[#0045CC] hover:to-[#003399] text-white rounded-xl h-14 px-8 font-black shadow-lg hover:shadow-xl transition-all"
                  >
                    <span>Notify Me</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes drive {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(400px);
          }
        }
        @keyframes flow {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-drive {
          animation: drive 8s linear infinite;
        }
        .animate-flow {
          animation: flow 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
