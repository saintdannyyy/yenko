import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Card } from "@/components/card";
import { ArrowRight, MapPin, DollarSign, Users, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Landing() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistPhone, setWaitlistPhone] = useState("");
  const [waitlistRole, setWaitlistRole] = useState<"driver" | "passenger">(
    "passenger",
  );

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: waitlistEmail,
          phone: waitlistPhone,
          role: waitlistRole,
        }),
      });
      if (response.ok) {
        toast.success("You've been added to the waitlist!");
        setWaitlistEmail("");
        setWaitlistPhone("");
      } else {
        toast.error("Failed to join waitlist");
      }
    } catch (error) {
      toast.error("Error joining waitlist");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yenko-blue to-yenko-deep">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">🚗 Yenko</div>
        <Link to="/auth/login">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white/10"
          >
            Sign In
          </Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's Go Together
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Share your route with local drivers going the same way. Save on
            transport, reduce traffic, build community.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/auth/login">
              <Button
                size="lg"
                className="bg-yenko-yellow text-yenko-deep hover:bg-yenko-yellow/90"
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 py-16">
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <div className="p-6">
              <MapPin className="w-12 h-12 text-yenko-yellow mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Direction-Based Matching
              </h3>
              <p className="text-white/70">
                AI matches you with drivers already going your way
              </p>
            </div>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <div className="p-6">
              <DollarSign className="w-12 h-12 text-yenko-yellow mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Affordable Rides
              </h3>
              <p className="text-white/70">
                Transparent pricing from ₵3 base fare + per km rate
              </p>
            </div>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <div className="p-6">
              <Zap className="w-12 h-12 text-yenko-yellow mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Real-Time Tracking
              </h3>
              <p className="text-white/70">
                Live location updates and instant notifications
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="bg-white/5 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Join the Yenko Movement
            </h2>
            <p className="text-white/70">
              Be among the first to transform how Accra commutes
            </p>
          </div>

          <form onSubmit={handleWaitlist} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder="Email address"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                type="tel"
                placeholder="Phone number"
                value={waitlistPhone}
                onChange={(e) => setWaitlistPhone(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-white">
                <input
                  type="radio"
                  value="passenger"
                  checked={waitlistRole === "passenger"}
                  onChange={() => setWaitlistRole("passenger")}
                  className="w-4 h-4"
                />
                I'm a Passenger
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-white">
                <input
                  type="radio"
                  value="driver"
                  checked={waitlistRole === "driver"}
                  onChange={() => setWaitlistRole("driver")}
                  className="w-4 h-4"
                />
                I'm a Driver
              </label>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-yenko-yellow text-yenko-deep hover:bg-yenko-yellow/90"
            >
              Join Waitlist
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/50">
        <p>&copy; 2024 Yenko. Let's go together.</p>
      </footer>
    </div>
  );
}
