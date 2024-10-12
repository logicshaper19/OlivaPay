import { Leaf } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="text-xl font-bold text-black">OlivaPay</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-black">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Contact Us</a></li>
            </ul>
          </nav>
        </div>
        <div className="text-center mt-8 text-gray-600">
          © 2024 OlivaPay. All rights reserved.
        </div>
      </div>
    </footer>
  )
}