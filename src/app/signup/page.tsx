"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SignUpFormComponent from "./SignUpFormComponent";

interface SignUpFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (formData: SignUpFormData): Promise<UserData> => {
    try {
      console.log("Attempting signup with data:", formData);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Signup response status:", response.status);

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const userData: UserData = await response.json();
      console.log("Received user data:", userData);
      
      // Ensure the returned data matches the UserData interface
      if (!userData.id || !userData.email || !userData.firstName || !userData.lastName) {
        throw new Error("Incomplete user data received");
      }

      // Store the user ID in localStorage
      localStorage.setItem('employerId', userData.id);
      console.log("Stored employerId in localStorage:", userData.id);

      // Redirect to the onboarding page
      console.log("Attempting to redirect to /onboarding");
      router.push('/onboarding');

      return userData;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <SignUpFormComponent onSubmit={handleSignup} />
    </div>
  );
}
