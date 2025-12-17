"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#passengers", label: "Passengers" },
    { href: "#drivers", label: "Drivers" },
    { href: "#safety", label: "Safety" },
    { href: "#pilot-route", label: "Pilot Route" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200"
          : "bg-white/80 backdrop-blur-md border-b border-white/20",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img
              src="/yenko.png"
              alt="Yenko Logo"
              width={120}
              height={100}
              className="transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-[#0057FF] transition-all relative group rounded-lg hover:bg-gray-50"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0057FF] transition-all group-hover:w-3/4 rounded-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="font-bold text-gray-700 hover:text-[#0057FF] hover:bg-gray-50"
            >
              <a href="#contact">Contact</a>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-[#0057FF] to-[#0045CC] hover:from-[#0045CC] hover:to-[#003399] text-white rounded-xl px-6 font-black shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
            >
              <a href="#waitlist" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-xl transition-all",
              isOpen
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200",
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 animate-slide-down">
            <div className="px-4 py-6 space-y-1 bg-white">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-3 px-4 text-sm font-bold text-gray-700 hover:text-[#0057FF] hover:bg-gray-50 rounded-lg transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="block py-3 px-4 text-sm font-bold text-gray-700 hover:text-[#0057FF] hover:bg-gray-50 rounded-lg transition-all animate-fade-in-up"
                style={{ animationDelay: `${navLinks.length * 0.05}s` }}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>

              <div className="pt-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-[#0057FF] to-[#0045CC] hover:from-[#0045CC] hover:to-[#003399] text-white rounded-xl py-6 font-black shadow-lg hover:shadow-xl transition-all group animate-fade-in-up"
                  style={{ animationDelay: `${(navLinks.length + 1) * 0.05}s` }}
                >
                  <a
                    href="#waitlist"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Join Waitlist</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </Button>
              </div>

              {/* Mobile Launch Badge */}
              <div
                className="pt-4 flex justify-center animate-fade-in-up"
                style={{ animationDelay: `${(navLinks.length + 2) * 0.05}s` }}
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>Launching January 2026</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </nav>
  );
}
