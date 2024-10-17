"use client";

import React, { useState } from "react";
import VerifyEmailComponent from "./VerifyEmailComponent";

const Feedback = ({
  message,
  type,
}: {
  message: string;
  type: "error" | "success";
}) => (
  <div
    className={`mt-4 p-2 rounded ${type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
  >
    {message}
  </div>
);

export default function VerifyEmailPage() {
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleVerification = async (token: string) => {
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        setFeedback({
          message: "Email verified successfully!",
          type: "success",
        });
      } else {
        const data = await response.json();
        setFeedback({
          message: data.message || "Verification failed",
          type: "error",
        });
      }
    } catch (error) {
      setFeedback({ message: "An unexpected error occurred", type: "error" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <VerifyEmailComponent onVerify={handleVerification} />
      {feedback && <Feedback message={feedback.message} type={feedback.type} />}
    </div>
  );
}
