import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Coins,
  MapPin,
  Smartphone,
  Shield,
  Star,
  Car,
  Users,
} from "lucide-react";

const passengerBenefits = [
  { icon: Zap, text: "Instant matches with nearby drivers" },
  { icon: Coins, text: "Affordable shared pricing" },
  { icon: MapPin, text: "Convenient pickup along your route" },
  { icon: Smartphone, text: "Secure MoMo payments" },
  { icon: Shield, text: "Real-time trip tracking" },
];

export function PassengerSection() {
  return (
    <section
      id="passengers"
      className="py-8 lg:py-6 bg-gradient-to-br from-blue-50/50 via-white to-blue-100/30 relative overflow-hidden"
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yenko-blue/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating decorative shapes */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 border-3 border-blue-200/30 rounded-2xl rotate-12 animate-float-slow hidden lg:block"></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-blue-200/20 rounded-full animate-bounce-slow hidden lg:block"></div>

        {/* Route path SVG */}
        <svg
          className="absolute top-1/2 left-1/4 w-32 h-32 text-blue-300/20 hidden lg:block"
          viewBox="0 0 100 100"
        >
          <path
            d="M 20 20 Q 50 50, 80 80"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className="animate-dash"
          />
          <circle cx="20" cy="20" r="4" fill="currentColor" />
          <circle cx="80" cy="80" r="4" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Enhanced Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-gradient-to-br from-blue-100/50 to-blue-200/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-12 shadow-xl">
              {/* Route matching UI mockup - enhanced */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 border-2 border-blue-100">
                {/* Header with animation */}
                <div className="flex items-center justify-between mb-2 sm:mb-4 animate-slide-down">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    Find Your Ride
                  </h3>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] sm:text-xs font-semibold text-green-700">
                      Live
                    </span>
                  </div>
                </div>

                {/* Route input */}
                <div className="flex items-center gap-3 sm:gap-4 bg-blue-50/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-yenko-blue to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 font-semibold">
                      Your route
                    </p>
                    <p className="font-bold text-gray-900 text-sm sm:text-base truncate">
                      Madina → Accra Central
                    </p>
                  </div>
                  <div className="bg-yenko-yellow rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 flex-shrink-0">
                    <p className="text-[10px] sm:text-xs font-black text-gray-900 whitespace-nowrap">
                      GH₵ 7-9
                    </p>
                  </div>
                </div>

                {/* Available matches with animations */}
                <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Available Now
                    </p>
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-600">
                      3 drivers
                    </span>
                  </div>

                  {[
                    {
                      name: "Kofi A.",
                      rating: 4.9,
                      time: "3 min",
                      price: "GH₵ 8",
                      trips: "150+",
                      verified: true,
                    },
                    {
                      name: "Ama K.",
                      rating: 4.8,
                      time: "5 min",
                      price: "GH₵ 7",
                      trips: "200+",
                      verified: true,
                    },
                  ].map((driver, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer group animate-fade-in-up"
                      style={{ animationDelay: `${i * 150}ms` }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="relative flex-shrink-0">
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs sm:text-sm font-bold text-white shadow-md group-hover:scale-110 transition-transform">
                            {driver.name.charAt(0)}
                          </div>
                          {driver.verified && (
                            <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <span className="text-white text-[8px] sm:text-[10px]">
                                ✓
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-1 flex-wrap">
                            <span>{driver.name}</span>
                            <span className="text-[10px] sm:text-xs text-gray-500">
                              • {driver.trips}
                            </span>
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-600 flex items-center gap-1">
                            <Star className="w-3 h-3 text-[#FFD400] fill-[#FFD400]" />
                            {driver.rating} • {driver.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-black text-yenko-blue text-sm sm:text-base">
                          {driver.price}
                        </p>
                        <p className="text-[9px] sm:text-xs text-gray-500 font-semibold">
                          per seat
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Request button */}
                <button className="w-full bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-yenko-blue text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] mt-2 sm:mt-4 text-sm sm:text-base flex items-center justify-center gap-2">
                  Request Match
                  <Car className="w-5 h-5" />
                </button>
              </div>

              {/* Floating badges - hidden on mobile */}
              <div className="hidden sm:flex absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 border-2 border-green-200 animate-float">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-500 flex items-center justify-center">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-black text-gray-900">
                      Instant
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-gray-600 font-semibold">
                      Matches
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="hidden sm:flex absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 border-2 border-yellow-200 animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-yenko-yellow flex items-center justify-center">
                    <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-black text-gray-900">
                      Save 50%
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-gray-600 font-semibold">
                      vs Taxis
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yenko-yellow/20 rounded-full opacity-50 blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-yenko-blue/20 rounded-full opacity-50 blur-xl" />
            </div>
          </div>

          {/* Right - Enhanced Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full animate-slide-down">
                <Users className="w-4 h-4 text-yenko-blue" />
                <p className="text-yenko-blue font-black text-xs uppercase tracking-wider">
                  FOR PASSENGERS
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                <span className="text-gray-900">A smarter way to</span>
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-yenko-blue to-blue-600 bg-clip-text text-transparent">
                    get around the city
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 6 Q 150 2, 300 6"
                      stroke="#0057FF"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Skip the trotro queues and get matched with verified drivers
                instantly.
                <span className="font-bold text-yenko-blue">
                  {" "}
                  Pay less, travel better.
                </span>
              </p>
            </div>

            {/* Enhanced benefits */}
            <div className="space-y-2">
              {passengerBenefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 group bg-white/60 hover:bg-white p-2 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-x-1 cursor-pointer"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0 group-hover:from-yenko-blue group-hover:to-blue-600 group-hover:scale-110 transition-all shadow-md">
                    <benefit.icon className="w-6 h-6 text-yenko-blue group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-gray-900 font-bold group-hover:text-yenko-blue transition-colors">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-yenko-blue text-white rounded-full px-8 h-14 text-base font-semibold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105 group"
            >
              <a href="#waitlist">
                Join Passenger Waitlist
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-600">
                  100% Verified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#FFD400] fill-[#FFD400]" />
                <span className="text-sm font-semibold text-gray-600">
                  4.8+ Rating
                </span>
              </div>
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
            transform: translateY(-15px) rotate(5deg);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -10;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
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
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-dash {
          animation: dash 2s linear infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
