"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface VerifyEmailComponentProps {
  onVerify: (token: string) => Promise<void>;
}

const VerifyEmailComponent: React.FC<VerifyEmailComponentProps> = ({
  onVerify,
}) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: verificationCode,
        type: "signup",
      });

      if (error) throw error;

      // After successful verification, redirect to onboarding
      router.push("/onboarding");
    } catch (error) {
      console.error("Error during verification:", error);
      // Handle error (show error message to user)
    }
  };

  const handleResendCode = async () => {
    try {
      const { data, error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error) throw error;

      // Notify user that the code has been resent
      alert("Verification code has been resent to your email.");
    } catch (error) {
      console.error("Error resending code:", error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Leaf className="h-8 w-8 text-green-500 mr-2" />
          <span className="text-2xl font-bold">OlivaPay</span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Verify your email
            </CardTitle>
            <CardDescription className="text-center">
              We&apos;ve sent a verification code to your email. Please enter it
              below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  placeholder="Enter the 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 mt-4"
              >
                Submit
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-4 text-sm text-center text-gray-600">
              Didn&apos;t receive the code?{" "}
              <Button
                variant="link"
                onClick={handleResendCode}
                className="text-black hover:underline p-0"
              >
                Resend
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmailComponent;
