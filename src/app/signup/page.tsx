"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SignUpFormComponent from "./SignUpFormComponent";
import { checkPasswordStrength } from '@/utils/passwordStrength';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      const passwordStrength = checkPasswordStrength(formData.password);
      
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        throw new Error("Password too short");
      }
      
      if (passwordStrength === 'weak') {
        toast.error("Please choose a stronger password.");
        throw new Error("Password too weak");
      }

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
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
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

      // Show success message
      toast.success("Signup successful!");

      // Redirect to the onboarding page
      console.log("Attempting to redirect to /onboarding");
      router.push('/onboarding');

      return userData;
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
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
