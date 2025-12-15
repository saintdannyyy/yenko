import { MapPin, Users, Zap, Car, Wind, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    step: "01",
    title: "Enter your destination",
    description:
      "Tell us where you're headed. We'll find drivers going the same way.",
  },
  {
    icon: Users,
    step: "02",
    title: "Match with a driver",
    description:
      "Get paired with verified drivers already heading in your direction.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Ride safely & skip queues",
    description:
      "Enjoy a comfortable ride and arrive faster. No more waiting in long lines.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-8 lg:py-2 bg-gradient-to-br from-white via-blue-50/30 to-white relative overflow-hidden"
    >
      {/* Enhanced background decoration with motion */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Animated dotted path connecting steps */}
        <svg
          className="absolute top-1/2 left-1/4 w-1/2 h-24 hidden lg:block"
          viewBox="0 0 600 100"
        >
          <path
            d="M 50 50 Q 150 20, 300 50 T 550 50"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeDasharray="8,12"
            fill="none"
            className="animate-dash-flow"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#0057FF", stopOpacity: 0.3 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#0057FF", stopOpacity: 0.6 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#FFD400", stopOpacity: 0.5 }}
              />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating icons representing journey */}
        <div className="absolute top-1/4 left-1/4 animate-float-gentle hidden lg:block opacity-30">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#0057FF">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div
          className="absolute top-1/3 right-1/4 animate-float-gentle hidden lg:block opacity-20"
          style={{ animationDelay: "1.5s" }}
        >
          <svg width="35" height="35" viewBox="0 0 24 24" fill="#FFD400">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced header with motion */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-800 to-yellow-300 px-6 py-2 rounded-full mb-6 animate-slide-down shadow-md">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            <p className="text-white font-black text-sm uppercase tracking-wider">
              HOW IT WORKS
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-yenko-blue to-gray-900 bg-clip-text text-transparent">
              Three simple steps
            </span>
            <br />
            <span className="relative inline-block mt-2">
              to your ride
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 5, 100 2, 198 8"
                  stroke="#FFD400"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-draw-line"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto flex items-center justify-center gap-2">
            Getting from A to B has never been easier. Join the movement!
            <Car className="w-5 h-5 text-[#0057FF]" />
            <Wind className="w-5 h-5 text-gray-400" />
          </p>
        </div>

        {/* Enhanced step cards with animations */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Stepped connecting line - diagonal staircase effect */}
          <svg
            className="hidden md:block absolute top-0 left-0 w-full h-32 pointer-events-none"
            viewBox="0 0 1000 150"
            preserveAspectRatio="none"
          >
            <path
              d="M 80 30 L 350 30 L 350 60 L 500 60 L 500 90 L 920 90"
              stroke="url(#stepGradient)"
              strokeWidth="3"
              strokeDasharray="10,8"
              fill="none"
              className="animate-dash-flow"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="stepGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#0057FF", stopOpacity: 0.6 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#0057FF", stopOpacity: 0.8 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#FFD400", stopOpacity: 0.7 }}
                />
              </linearGradient>
            </defs>
          </svg>

          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group relative animate-fade-in-up"
              style={{
                animationDelay: `${index * 200}ms`,
                marginTop: `${index * 2}rem`, // Creates stepped/staircase layout
              }}
            >
              {/* Step card */}
              <div className="relative bg-white rounded-3xl p-8 pt-10 border-2 border-gray-200 hover:border-yenko-blue/60 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-3 cursor-pointer overflow-visible">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                {/* Animated corner decoration */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-yenko-blue/10 to-yellow-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                {/* Step number badge - enhanced and repositioned for staircase effect */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                  <div className="relative">
                    {/* Vertical connecting line from badge to card */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-yenko-blue to-transparent"></div>

                    {/* Pulsing glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yenko-blue to-blue-600 rounded-full blur-lg opacity-40 animate-pulse scale-110"></div>

                    {/* Step number - larger and more prominent */}
                    <div className="relative bg-gradient-to-br from-yenko-blue via-blue-600 to-blue-700 text-white text-2xl font-black w-16 h-16 rounded-2xl shadow-2xl border-4 border-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <span className="relative z-10">{step.step}</span>
                      {/* Inner gradient shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
                    </div>

                    {/* "STEP" label above number */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                      STEP
                    </div>
                  </div>
                </div>

                {/* Icon container with enhanced animation */}
                <div className="relative w-20 h-20 mx-auto mb-6 mt-4">
                  {/* Pulsing ring behind icon */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yenko-blue/20 to-blue-400/20 rounded-2xl group-hover:scale-110 transition-transform duration-500 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-yenko-blue/10 to-blue-400/10 rounded-2xl blur-lg group-hover:scale-125 transition-transform duration-700"></div>

                  {/* Icon */}
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-yenko-blue group-hover:to-blue-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-md">
                    <step.icon className="w-10 h-10 text-yenko-blue group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-yenko-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Animated progress indicator on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yenko-blue to-blue-600 w-0 group-hover:w-full transition-all duration-700 rounded-b-3xl"></div>
              </div>

              {/* Enhanced connector arrow with animation */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 -right-6 lg:-right-8 z-20 transform -translate-y-1/2">
                  <div className="relative">
                    {/* Glowing background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yenko-blue/20 to-blue-400/20 rounded-full blur-xl scale-150 animate-pulse"></div>

                    {/* Arrow with motion */}
                    <svg
                      className="relative w-10 h-10 text-yenko-blue animate-bounce-horizontal"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to action after steps */}
        <div className="text-center mt-3">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 rounded-2xl border border-blue-200/50 shadow-lg animate-float-gentle">
            <PartyPopper className="w-8 h-8 text-[#FFD400] animate-bounce" />
            <p className="text-gray-700 font-semibold">
              Ready to skip the queues?{" "}
              <span className="text-yenko-blue font-bold">
                Join the waitlist!
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash-flow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -100;
          }
        }
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes draw-line {
          from {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
          }
          to {
            stroke-dasharray: 200;
            stroke-dashoffset: 0;
          }
        }
        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
        .animate-dash-flow {
          animation: dash-flow 3s linear infinite;
        }
        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-draw-line {
          animation: draw-line 2s ease-out forwards;
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
