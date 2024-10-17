"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SignUpFormComponent from "./SignUpFormComponent";
import { toast } from "react-hot-toast";

interface SignUpFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function SignupPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (formData: SignUpFormData) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Signup successful!");
        router.push("/onboarding");
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred during signup");
        toast.error(data.message || "An error occurred during signup");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <SignUpFormComponent onSubmit={handleSignup} />
    </div>
  );
}
