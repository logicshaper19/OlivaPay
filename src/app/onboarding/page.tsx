"use client";

// Implement your onboarding process here

import OnboardingFormComponent from "./OnboardingFormComponent";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface OnboardingFormData {
  // Add all the fields from your onboarding form
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  countryId: number;
  // Add any other fields your form includes
}

const OnboardingPage = () => {
  const [countries, setCountries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/api/countries");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        console.log("Fetched countries:", data);
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  console.log("Current countries state:", countries);

  const handleOnboardingSubmit = async (formData: OnboardingFormData) => {
    try {
      // Process onboarding data submission
      const response = await fetch("/api/onboarding", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // If onboarding is successful, redirect to dashboard
        console.log("Attempting to redirect to dashboard...");
        router.push("/dashboard");
      } else {
        // Handle onboarding error
        console.error("Onboarding failed");
      }
    } catch (error) {
      console.error("Error during onboarding:", error);
    }
  };

  return <OnboardingFormComponent />;
};

export default OnboardingPage;
