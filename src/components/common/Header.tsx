import { Leaf } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-green-500" />
          <span className="text-2xl font-bold">OlivaPay</span>
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><a href="#features" className="text-gray-600 hover:text-black">Features</a></li>
            <li><a href="#pricing" className="text-gray-600 hover:text-black">Pricing</a></li>
            <li><a href="#faq" className="text-gray-600 hover:text-black">FAQ</a></li>
            <li><Link href="/login"><Button variant="outline">Login</Button></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}