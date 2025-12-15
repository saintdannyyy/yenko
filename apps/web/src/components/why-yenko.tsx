import {
  Clock,
  Coins,
  Car,
  Heart,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Sparkles,
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Beat Rush Hour Stress",
    description:
      "Skip the long trotro queues and get matched instantly with drivers heading your way.",
    color: "from-blue-500 to-blue-600",
    bgGlow: "bg-blue-500/20",
    stat: "2x",
    statLabel: "Faster",
  },
  {
    icon: Coins,
    title: "Affordable Rides",
    description:
      "Share rides with others going your direction. Pay less than taxis, travel in comfort.",
    color: "from-yellow-500 to-yellow-600",
    bgGlow: "bg-yellow-500/20",
    stat: "50%",
    statLabel: "Cheaper",
  },
  {
    icon: Car,
    title: "Extra Income for Drivers",
    description:
      "Already driving that route? Earn money on trips you're already taking.",
    color: "from-green-500 to-green-600",
    bgGlow: "bg-green-500/20",
    stat: "GH₵500+",
    statLabel: "Per Week",
  },
  {
    icon: Heart,
    title: "Community Powered",
    description:
      "Safe, verified, and transparent. Built by the community, for the community.",
    color: "from-pink-500 to-pink-600",
    bgGlow: "bg-pink-500/20",
    stat: "100%",
    statLabel: "Verified",
  },
];

export function WhyYenko() {
  return (
    <section className="py-10 lg:py-8 bg-gradient-to-b from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Bold animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-yenko-blue/30 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-yenko-yellow/30 to-yellow-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-yellow-400/10 rounded-full blur-3xl"></div>

        {/* Animated geometric shapes */}
        <div className="absolute top-20 left-1/4 w-32 h-32 border-4 border-yenko-blue/20 rounded-3xl rotate-12 animate-spin-slow"></div>
        <div className="absolute bottom-32 right-1/4 w-24 h-24 bg-gradient-to-br from-yenko-yellow/20 to-yellow-500/10 rounded-full animate-float-slow"></div>

        {/* SVG decorative elements */}
        <svg
          className="absolute top-1/4 right-20 w-32 h-32 text-blue-400/10 hidden lg:block animate-pulse"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
          <circle cx="50" cy="50" r="25" fill="white" fillOpacity="0.5" />
        </svg>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yenko-blue/30 rounded-full animate-float-particles"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bold header section */}
        <div className="text-center mb-10">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-3 bg-blue-800 text-white px-8 py-3 rounded-full shadow-2xl shadow-blue-500/40 animate-slide-down group hover:scale-105 transition-transform cursor-default">
            <TrendingUp className="w-5 h-5 animate-bounce" />
            <span className="font-black text-sm uppercase tracking-wider">
              WHY CHOOSE YENKO?
            </span>
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>

          {/* Bold statement heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="block mb-2 text-gray-900">Moving Accra</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yenko-blue via-blue-600 to-yenko-blue bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_auto]">
                Forward, Together
              </span>
              {/* Curved underline */}
              <svg
                className="absolute -bottom-4 left-0 w-full h-4"
                viewBox="0 0 400 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 8 Q 100 2, 200 8 T 400 8"
                  stroke="#FFD400"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              {/* Sparkle decorations */}
              <span className="absolute -top-6 -right-8 animate-spin-slow">
                <Sparkles className="w-10 h-10 text-[#FFD400]" />
              </span>
              <span className="absolute -bottom-6 -left-8 animate-bounce-slow">
                <Zap className="w-10 h-10 text-[#0057FF] fill-[#0057FF]" />
              </span>
            </span>
          </h2>

          <p className="mt-2 text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto font-semibold leading-relaxed">
            We're reimagining urban mobility to save you{" "}
            <span className="relative inline-block">
              <span className="text-yenko-blue font-black">time</span>
              <svg
                className="absolute -bottom-1 left-0 w-full h-2"
                viewBox="0 0 100 8"
              >
                <path
                  d="M0 4 Q 50 0, 100 4"
                  stroke="#0057FF"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
            ,{" "}
            <span className="relative inline-block">
              <span className="text-yenko-yellow font-black">money</span>
              <svg
                className="absolute -bottom-1 left-0 w-full h-2"
                viewBox="0 0 100 8"
              >
                <path
                  d="M0 4 Q 50 0, 100 4"
                  stroke="#FFD400"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
            , and{" "}
            <span className="relative inline-block">
              <span className="text-green-600 font-black">stress</span>
              <svg
                className="absolute -bottom-1 left-0 w-full h-2"
                viewBox="0 0 100 8"
              >
                <path
                  d="M0 4 Q 50 0, 100 4"
                  stroke="#16a34a"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
            .
          </p>

          {/* Bold stats banner */}
          <div className="mt-4 flex flex-wrap justify-center gap-6 lg:gap-12">
            {[
              { number: "10+", label: "Early Users", icon: Users },
              { number: "0", label: "Queue Time", icon: Clock },
              { number: "5★", label: "Experience", icon: Shield },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 rounded-full shadow-xl border-2 border-gray-200 hover:border-yenko-blue/50 hover:scale-110 transition-all duration-300 cursor-default group"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yenko-blue to-blue-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-black bg-gradient-to-r from-yenko-blue to-blue-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-semibold">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced benefit cards with bold styling */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Simplified card with subtle effects */}
              <div className="relative h-full bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
                {/* Subtle background glow on hover */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 ${benefit.bgGlow} rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                ></div>

                {/* Simplified icon and stat in line */}
                <div className="relative mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Icon container */}
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-10 rounded-2xl`}
                      ></div>
                      <div
                        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}
                      >
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Stat badge aligned with icon */}
                    <div
                      className={`bg-gradient-to-br ${benefit.color} text-white px-3 py-1.5 rounded-lg shadow-lg`}
                    >
                      <div className="text-sm font-bold">{benefit.stat}</div>
                      <div className="text-[9px] font-semibold opacity-90">
                        {benefit.statLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yenko-blue transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Simple bottom accent */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${benefit.color} w-0 group-hover:w-full transition-all duration-500 rounded-b-3xl`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
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
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
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
        @keyframes float-particles {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float-up {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-60px);
            opacity: 0;
          }
        }
        .animate-gradient-flow {
          animation: gradient-flow 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-float-particles {
          animation: float-particles linear infinite;
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-float-up {
          animation: float-up 2s ease-out infinite;
        }
      `}</style>
    </section>
  );
}
