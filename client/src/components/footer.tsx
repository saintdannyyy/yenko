import {
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Blog", href: "#" },
  ],
  product: [
    { label: "For Passengers", href: "#passengers" },
    { label: "For Drivers", href: "#drivers" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pilot Route", href: "#pilot-route" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Safety", href: "#safety" },
    { label: "Driver Support", href: "#" },
    { label: "FAQs", href: "#" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "WhatsApp",
    href: "#",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "hover:bg-green-500",
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    color: "hover:bg-gray-900",
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color:
      "hover:bg-gradient-to-tr hover:from-purple-500 hover:via-pink-500 hover:to-orange-500",
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "hover:bg-gray-900",
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-gray-900 via-[#001a3d] to-gray-900 text-white py-8 lg:py-8 relative overflow-hidden"
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0057FF]/10 rounded-full blur-3xl animate-float-slow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFD400]/10 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>
        <Sparkles className="absolute top-20 right-20 w-6 h-6 text-[#FFD400]/20 animate-pulse" />
        <Sparkles
          className="absolute bottom-32 left-32 w-4 h-4 text-[#0057FF]/20 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section - CTA Banner */}
        <div className="mb-8 lg:mb-10">
          <div className="bg-gradient-to-r from-[#0057FF] to-[#0045CC] rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-[#FFD400]/20 backdrop-blur-sm border border-[#FFD400]/30 px-4 py-2 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-[#FFD400]" />
                  <span className="text-sm font-black text-white">
                    January 2026 Launch
                  </span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-3 leading-tight">
                  Ready to Transform Your Commute?
                </h3>
                <p className="text-white/80 text-lg max-w-2xl">
                  Join the waitlist and be part of Accra's ridesharing
                  revolution. Yɛnkɔ!
                </p>
              </div>
              <Button className="bg-[#FFD400] hover:bg-[#FFC700] text-gray-900 font-black px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(255,212,0,0.5)] transition-all group">
                <span>Join Waitlist</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand & Contact - Takes more space */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/favicon.png"
                  alt="Yenko Logo"
                  width={40}
                  height={40}
                />
                <span className="text-3xl font-black text-white">Yenko</span>
              </div>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                Moving Accra forward, together. Ghana's first community-focused
                ridesharing platform built for real commuters.
              </p>
              <p className="text-[#FFD400] font-black text-lg italic">
                Yɛnkɔ! Let's go!
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-black text-white text-sm uppercase tracking-wider mb-4">
                Get In Touch
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:hello@yenko.com"
                  className="flex items-center gap-3 text-white/70 hover:text-[#FFD400] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#FFD400]/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">hello@yenko.com</span>
                </a>
                <a
                  href="tel:+233000000000"
                  className="flex items-center gap-3 text-white/70 hover:text-[#FFD400] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#FFD400]/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">
                    +233 (0) 000 000 000
                  </span>
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">Accra, Ghana</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-black text-white text-sm uppercase tracking-wider mb-5">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-[#FFD400] text-sm transition-colors font-medium hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white text-sm uppercase tracking-wider mb-5">
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-[#FFD400] text-sm transition-colors font-medium hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white text-sm uppercase tracking-wider mb-5">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-[#FFD400] text-sm transition-colors font-medium hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/50 text-sm font-medium">
              © {new Date().getFullYear()} Yenko Mobility Ltd. All rights
              reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-xs font-bold uppercase tracking-wider mr-2 hidden sm:block">
                Follow Us
              </span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110 hover:border-white/30 ${social.color}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
