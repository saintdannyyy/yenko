import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MapPin,
  Users,
  Rocket,
  Sparkles,
  Car,
  Wind,
  Zap,
  Target,
  DollarSign,
  Star,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-14 lg:pt-2 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-yellow-50/30">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#66666612_1px,transparent_1px),linear-gradient(to_bottom,#66666612_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Gradient orbs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-yellow-400/30 to-yellow-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-blue-200/30 rounded-lg rotate-12 animate-float"></div>
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-yellow-200/20 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-yellow-300/30 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Decorative SVG illustrations */}
        <svg
          className="absolute top-20 right-20 w-40 h-40 text-blue-500/10 hidden lg:block animate-float"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="60" fill="white" fillOpacity="0.5" />
          <circle cx="100" cy="100" r="40" />
        </svg>

        {/* Car icon SVG */}
        <svg
          className="absolute bottom-32 right-32 w-24 h-24 text-yellow-500/20 hidden lg:block animate-bounce-slow"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
        </svg>

        {/* Route path illustration */}
        <svg
          className="absolute top-1/2 left-10 w-32 h-32 text-blue-400/20 hidden lg:block"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M 10 10 Q 30 50, 50 50 T 90 90"
            strokeDasharray="5,5"
            className="animate-dash"
          />
          <circle cx="10" cy="10" r="4" fill="currentColor" />
          <circle cx="50" cy="50" r="4" fill="currentColor" />
          <circle cx="90" cy="90" r="4" fill="currentColor" />
        </svg>

        {/* Connection lines */}
        <svg
          className="absolute bottom-20 left-1/4 w-40 h-40 text-yellow-400/15 hidden lg:block"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <line x1="20" y1="20" x2="80" y2="20" />
          <line x1="20" y1="50" x2="80" y2="50" />
          <line x1="20" y1="80" x2="80" y2="80" />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <circle cx="80" cy="50" r="3" fill="currentColor" />
          <circle cx="20" cy="80" r="3" fill="currentColor" />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-dash {
          animation: dash 2s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-2">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 relative z-10">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 text-yellow-900 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all cursor-default border-2 border-yellow-300/50 backdrop-blur-sm group">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-600"></span>
              </span>
              <span className="group-hover:scale-105 transition-transform flex items-center gap-1.5">
                Launching soon in Accra
                <Rocket className="w-4 h-4" />
              </span>
            </div>

            {/* Main heading with enhanced styling */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] text-balance relative">
              Let's Move{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yenko-blue via-blue-500 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Together.
                </span>
                {/* Underline decoration */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 5, 150 2, 298 8"
                    stroke="#FFD400"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="animate-draw"
                  />
                </svg>
              </span>
              {/* Sparkle decorations */}
              <span className="absolute -top-4 -right-4 animate-pulse">
                <Sparkles className="w-8 h-8 text-[#FFD400]" />
              </span>
            </h1>

            {/* Enhanced description */}
            <p className="text-xl text-gray-700 max-w-lg leading-relaxed font-medium">
              Beat the queues. Get matched with drivers heading your direction.
              <span className="block mt-2 text-yenko-blue font-bold text-2xl">
                Yɛnkɔ — Let's go!
                <span className="inline-flex items-center gap-1 ml-2 animate-bounce">
                  <Car className="w-6 h-6" />
                  <Wind className="w-5 h-5 text-gray-400" />
                </span>
              </span>
            </p>

            <style>{`
              @keyframes gradient {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }
              @keyframes draw {
                from {
                  stroke-dasharray: 300;
                  stroke-dashoffset: 300;
                }
                to {
                  stroke-dasharray: 300;
                  stroke-dashoffset: 0;
                }
              }
              .animate-gradient {
                animation: gradient 3s ease infinite;
              }
              .animate-draw {
                animation: draw 2s ease-out forwards;
              }
            `}</style>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-gradient-to-r from-yenko-yellow to-yellow-500 hover:from-yellow-500 hover:to-yenko-yellow text-gray-900 border-0 rounded-full px-8 h-14 text-base font-semibold shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30 transition-all hover:scale-105"
              >
                <a href="#waitlist">Become an Early Driver</a>
              </Button>
            </div>

            {/* Social proof with avatars */}
            <div className="flex items-center gap-6 pt-4 bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200/50">
              <div className="flex -space-x-4">
                {[
                  { emoji: "👨", bg: "bg-blue-100" },
                  { emoji: "👩", bg: "bg-yellow-100" },
                  { emoji: "🧑", bg: "bg-green-100" },
                  { emoji: "👨", bg: "bg-purple-100" },
                ].map((avatar, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 rounded-full ${avatar.bg} border-3 border-white flex items-center justify-center text-xl shadow-md hover:scale-110 transition-transform cursor-pointer`}
                    style={{ zIndex: 10 - i }}
                  >
                    {avatar.emoji}
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yenko-blue to-blue-600 border-3 border-white flex items-center justify-center text-white text-xs font-bold shadow-md hover:scale-110 transition-transform cursor-pointer">
                  +300
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-900 font-bold">
                  Join 300+ early users
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  Already on the waitlist
                  <Zap className="w-3 h-3 text-[#FFD400] fill-[#FFD400]" />
                </p>
              </div>
            </div>
          </div>

          {/* Right content - App mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-80 animate-float-slow">
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-gradient-to-r from-yenko-blue/30 to-blue-600/30 rounded-[3rem] blur-2xl"></div>

              {/* Phone frame */}
              <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl ring-1 ring-gray-700">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-inner">
                  {/* Notch */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full z-10"></div>

                  {/* Status bar */}
                  <div className="bg-gradient-to-r from-yenko-blue to-blue-600 px-6 py-5">
                    <div className="flex items-center justify-between text-white text-xs font-medium">
                      <span className="font-bold">9:41</span>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-3"
                          viewBox="0 0 16 12"
                          fill="currentColor"
                        >
                          <rect width="3" height="12" rx="1" opacity="0.6" />
                          <rect
                            x="5"
                            width="3"
                            height="12"
                            rx="1"
                            opacity="0.8"
                          />
                          <rect x="10" width="3" height="12" rx="1" />
                        </svg>
                        <svg
                          className="w-5 h-3"
                          viewBox="0 0 20 12"
                          fill="currentColor"
                        >
                          <rect width="18" height="12" rx="2" opacity="0.3" />
                          <rect width="14" height="12" rx="2" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="p-4 space-y-4">
                    <div className="text-center py-2">
                      <p className="text-sm text-muted-foreground">
                        Welcome back!
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        Where to?
                      </p>
                    </div>

                    <div className="bg-muted rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Pickup
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            Madina Market
                          </p>
                        </div>
                      </div>
                      <div className="border-l-2 border-dashed border-border h-4 ml-1.5" />
                      <div className="flex items-center gap-3">
                        <MapPin className="w-3 h-3 text-secondary" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Drop-off
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            Accra Central
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yenko-yellow to-yellow-500 flex items-center justify-center shadow-md">
                            <Users className="w-5 h-5 text-gray-900" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              3 drivers found
                            </p>
                            <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                              Going your way
                              <Sparkles className="w-3 h-3" />
                            </p>
                          </div>
                        </div>
                        <div className="bg-white rounded-full p-2 shadow-sm">
                          <ArrowRight className="w-4 h-4 text-yenko-blue" />
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-yenko-blue to-blue-600 hover:from-blue-600 hover:to-yenko-blue text-white rounded-xl h-12 font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                      Find a Ride
                      <Car className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating elements - Enhanced */}
              <div className="absolute -left-12 top-1/4 bg-white rounded-2xl shadow-2xl p-4 border border-green-200 animate-float-delayed backdrop-blur-sm z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-white text-lg font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Matched!</p>
                    <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                      2 min away
                      <Target className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-8 bottom-1/3 bg-gradient-to-r from-yenko-yellow to-yellow-500 rounded-2xl shadow-2xl p-4 animate-float-delayed-2 z-10"
                style={{ animationDelay: "0.5s" }}
              >
                <p className="text-lg font-black text-gray-900">GH₵ 8</p>
                <p className="text-xs text-gray-800 font-semibold flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Est. fare
                </p>
              </div>

              {/* Rating badge */}
              <div className="absolute top-8 -right-8 bg-white rounded-xl shadow-xl p-3 animate-float z-10 border-2 border-yellow-200">
                <div className="flex items-center gap-1">
                  <Star className="w-6 h-6 text-[#FFD400] fill-[#FFD400]" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">4.9</p>
                    <p className="text-[10px] text-gray-600">Rating</p>
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              @keyframes float-slow {
                0%,
                100% {
                  transform: translateY(0px);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
              @keyframes float-delayed {
                0%,
                100% {
                  transform: translateY(0px) translateX(0px);
                }
                50% {
                  transform: translateY(-15px) translateX(5px);
                }
              }
              @keyframes float-delayed-2 {
                0%,
                100% {
                  transform: translateY(0px) translateX(0px);
                }
                50% {
                  transform: translateY(-12px) translateX(-5px);
                }
              }
              .animate-float-slow {
                animation: float-slow 4s ease-in-out infinite;
              }
              .animate-float-delayed {
                animation: float-delayed 5s ease-in-out infinite;
              }
              .animate-float-delayed-2 {
                animation: float-delayed-2 4.5s ease-in-out infinite;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
