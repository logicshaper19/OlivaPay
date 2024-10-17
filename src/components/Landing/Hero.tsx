import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-24 text-center bg-gray-50">
      <h1 className="text-5xl font-bold mb-6">
        Simplify Casual Worker Payments and Benefits
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Built for Kenyan businesses handling casual worker payments, OlivaPay
        ensures compliance and streamlines retirement and healthcare
        benefits—all while supporting your employees' well-being.
      </p>
      <div className="flex justify-center space-x-4 mb-8">
        <Button size="lg" className="bg-black text-white hover:bg-gray-800">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button size="lg" variant="outline">
          Watch Demo
        </Button>
      </div>
      <div className="flex justify-center space-x-4">
        <Button variant="outline">Download for iOS</Button>
        <Button variant="outline">Get it on Android</Button>
      </div>
    </section>
  );
}
