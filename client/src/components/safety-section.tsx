import {
  Shield,
  Star,
  Phone,
  Eye,
  MapPin,
  Lock,
  CheckCircle2,
  Users,
} from "lucide-react";

export function SafetySection() {
  return (
    <section
      id="safety"
      className="py-10 lg:py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Shield icons floating */}
        <div className="absolute top-1/4 right-1/4 opacity-5 animate-float-slow hidden lg:block">
          <Shield className="w-32 h-32" strokeWidth={1} />
        </div>
        <div
          className="absolute bottom-1/4 left-1/4 opacity-5 animate-float-slow hidden lg:block"
          style={{ animationDelay: "1.5s" }}
        >
          <Lock className="w-24 h-24" strokeWidth={1} />
        </div>

        {/* Dotted grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Bold heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block text-white mb-2 lg:inline lg:mb-0">
              Your safety is
            </span>
            <span className="relative inline-block lg:ml-2">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_auto]">
                our priority
              </span>
              {/* Underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 6 Q 200 2, 400 6"
                  stroke="#4ade80"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We've built{" "}
            <span className="font-bold text-white">
              multiple layers of safety
            </span>{" "}
            into every Yenko ride. Travel with confidence knowing you're
            protected.
          </p>

          {/* Trust stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-white">100%</div>
                <div className="text-xs text-gray-400 font-semibold">
                  Verified Drivers
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-white">24/7</div>
                <div className="text-xs text-gray-400 font-semibold">
                  Support
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-white">Zero</div>
                <div className="text-xs text-gray-400 font-semibold">
                  Tolerance
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-white">100%</div>
                <div className="text-xs text-gray-400 font-semibold">
                  Trip Transparency
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-3 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-6 rounded-2xl">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-3 border-gray-800 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 border-3 border-gray-800 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-3 border-gray-800 flex items-center justify-center shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-white text-lg">
                Ride with peace of mind
              </p>
              <p className="text-sm text-gray-400">
                Join our community of verified, trusted users
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
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-gradient-flow {
          animation: gradient-flow 3s ease infinite;
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
