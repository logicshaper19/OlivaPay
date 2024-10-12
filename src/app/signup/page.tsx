'use client';  // Add this at the top of the file

import SignUpFormComponent from './SignUpFormComponent'
import { Leaf } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center mb-8 hover:opacity-80 transition-opacity">
          <Leaf className="h-8 w-8 text-green-500 mr-2" />
          <span className="text-2xl font-bold">OlivaPay</span>
        </Link>
        <SignUpFormComponent />
      </div>
    </div>
  )
}
