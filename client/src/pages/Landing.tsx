import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { WhyYenko } from "@/components/why-yenko";
import { PassengerSection } from "@/components/passenger-section";
import { DriverSection } from "@/components/driver-section";
import { SafetySection } from "@/components/safety-section";
import { WaitlistSection } from "@/components/waitlist-section";
import { PilotRoute } from "@/components/pilot-route";
import { Testimonials } from "@/components/testimonials";
import { DownloadApp } from "@/components/download-app";
import { Footer } from "@/components/footer";

export default function Landing() {
  return (
    <main className="min-h-screen scroll-smooth">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <WhyYenko />
      <PassengerSection />
      <DriverSection />
      <SafetySection />
      <WaitlistSection />
      <PilotRoute />
      {/* <Testimonials /> */}
      {/* <DownloadApp /> */}
      <Footer />
    </main>
  );
}
