"use client";

// Implement your onboarding process here

import OnboardingFormComponent from "./OnboardingFormComponent";
import { useState, useEffect } from "react";

const OnboardingPage = () => {
  const [countries, setCountries] = useState([]);

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

  return <OnboardingFormComponent />;
};

export default OnboardingPage;
