import Hero from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import FAQ from "@/components/Landing/FAQ";
import CallToAction from "@/components/Landing/CallToAction";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main>
        <Hero />
        <Features />
        <FAQ />
        <CallToAction />
      </main>
    </div>
  );
}
