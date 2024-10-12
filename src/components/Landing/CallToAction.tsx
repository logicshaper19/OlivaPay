import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CallToAction() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your Payroll?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">Join over 1,000 Kenyan businesses that trust OlivaPay to simplify their casual worker payments and benefits.</p>
        <Link href="/signup">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
