import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Navigation,
  Users,
  Banknote,
  Clock,
  Car,
} from "lucide-react";

const driverBenefits = [
  { icon: Navigation, text: "Set your destination and drive" },
  { icon: Users, text: "Auto-match with passengers on your route" },
  { icon: Banknote, text: "Quick MoMo payouts after each trip" },
  { icon: Clock, text: "Drive on your own schedule" },
  { icon: Car, text: "Earn without being a full-time driver" },
];

export function DriverSection() {
  return (
    <section
      id="drivers"
      className="py-8 lg:py-8 bg-gradient-to-br from-yellow-50/50 via-white to-yellow-100/30 relative overflow-hidden"
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-yenko-yellow/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating decorative shapes */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border-3 border-yellow-200/30 rounded-2xl rotate-12 animate-float-slow hidden lg:block"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-yellow-200/20 rounded-full animate-bounce-slow hidden lg:block"></div>

        {/* Money/coin SVG */}
        <svg
          className="absolute top-1/2 right-1/4 w-32 h-32 text-yellow-300/20 hidden lg:block animate-spin-slow"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
          <circle cx="50" cy="50" r="25" fill="white" fillOpacity="0.5" />
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontSize="30"
            fontWeight="bold"
            fill="white"
          >
            ₵
          </text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Enhanced Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yenko-yellow to-yellow-500 px-4 py-2 rounded-full shadow-lg animate-slide-down">
                <Car className="w-4 h-4 text-gray-900" />
                <p className="text-gray-900 font-black text-xs uppercase tracking-wider">
                  FOR DRIVERS
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                <span className="text-gray-900">Earn money on trips</span>
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-yenko-yellow to-yellow-600 bg-clip-text text-transparent">
                    you already take
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 6 Q 150 2, 300 6"
                      stroke="#FFD400"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Already commuting to work? Heading across town?{" "}
                <span className="font-bold text-yellow-700">
                  Turn your empty seats into extra income.
                </span>{" "}
                No need to be a full-time driver — just share rides on routes
                you're already driving.
              </p>
            </div>

            {/* Enhanced benefits */}
            <div className="space-y-2">
              {driverBenefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 group bg-white/60 hover:bg-white p-2 rounded-2xl border border-gray-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg hover:-translate-x-1 cursor-pointer"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center flex-shrink-0 group-hover:from-yenko-yellow group-hover:to-yellow-500 group-hover:scale-110 transition-all shadow-md">
                    <benefit.icon className="w-6 h-6 text-yellow-700 group-hover:text-gray-900 transition-colors" />
                  </div>
                  <p className="text-gray-900 font-bold group-hover:text-yellow-700 transition-colors">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yenko-yellow to-yellow-500 hover:from-yellow-500 hover:to-yenko-yellow text-gray-900 rounded-full px-8 h-14 text-base font-semibold shadow-xl shadow-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/40 transition-all hover:scale-105 group"
            >
              <a href="#waitlist">
                Become an Early Driver
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-600">
                  Instant Payouts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-600">
                  Flexible Hours
                </span>
              </div>
            </div>
          </div>

          {/* Right - Enhanced Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-yellow-100/50 to-yellow-200/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-12 shadow-xl">
              {/* Driver dashboard mockup - enhanced */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 border-2 border-yellow-100">
                {/* Header with earnings */}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 animate-slide-down">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                      Today's earnings
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-gray-900">
                      GH₵ 156
                    </p>
                    <p className="text-[10px] sm:text-xs text-green-600 font-bold">
                      +GH₵ 28 vs yesterday
                    </p>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Banknote className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center border border-blue-200 hover:scale-105 transition-transform cursor-pointer">
                    <p className="text-xl sm:text-2xl font-black text-gray-900">
                      5
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 font-semibold">
                      Trips
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center border border-yellow-200 hover:scale-105 transition-transform cursor-pointer">
                    <p className="text-xl sm:text-2xl font-black text-gray-900">
                      4.9
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 font-semibold">
                      Rating
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center border border-purple-200 hover:scale-105 transition-transform cursor-pointer">
                    <p className="text-xl sm:text-2xl font-black text-gray-900">
                      12
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 font-semibold">
                      Reviews
                    </p>
                  </div>
                </div>

                {/* Upcoming route with animation */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Upcoming Route
                    </p>
                    <span className="bg-yellow-100 text-yellow-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-yellow-200 hover:border-yellow-300 transition-all cursor-pointer group animate-fade-in-up">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yenko-yellow to-yellow-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                        <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                          Madina → 37 Roundabout
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-600 flex items-center gap-1">
                          <Users className="w-3 h-3" />2 passengers matched
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-black text-green-600 text-sm sm:text-base">
                          +GH₵ 25
                        </p>
                        <p className="text-[9px] sm:text-xs text-gray-500 font-semibold">
                          earnings
                        </p>
                      </div>
                    </div>

                    {/* Passenger list */}
                    <div className="flex items-center gap-2 pt-2 border-t border-yellow-200">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                          K
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                          A
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-600 font-semibold">
                        Kofi & Ama waiting
                      </p>
                    </div>
                  </div>
                </div>

                {/* Start trip button */}
                <button className="w-full bg-gradient-to-r from-yenko-yellow to-yellow-500 hover:from-yellow-500 hover:to-yenko-yellow text-gray-900 font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] text-sm sm:text-base flex items-center justify-center gap-2">
                  Start Trip
                  <Car className="w-5 h-5" />
                </button>
              </div>

              {/* Floating badges */}
              <div className="hidden sm:flex absolute -top-3 sm:-top-4 -left-3 sm:-left-4 bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 border-2 border-green-200 animate-float">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-500 flex items-center justify-center">
                    <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-black text-gray-900">
                      GH₵500+
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-gray-600 font-semibold">
                      Per Week
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="hidden sm:flex absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 border-2 border-blue-200 animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-black text-gray-900">
                      Flexible
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-gray-600 font-semibold">
                      Schedule
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-yenko-yellow/20 rounded-full opacity-50 blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-yellow-400/20 rounded-full opacity-50 blur-xl" />
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
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
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
