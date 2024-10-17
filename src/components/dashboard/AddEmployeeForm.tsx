import React from "react";

interface AddEmployeeFormProps {
  onComplete: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date | null;
  jobTitle: string;
  department: string;
  startDate: Date | null;
  identityType: "nationalID" | "passport";
  identityNumber: string;
  kraPIN: string;
  salary: string;
  paymentFrequency: "weekly" | "biweekly" | "monthly";
  paymentMode: "mpesa" | "bankTransfer";
  bankName: string;
  accountNumber: string;
  nhifNumber: string;
  nssfNumber: string;
}

export function AddEmployeeForm({ onComplete }: AddEmployeeFormProps) {
  const handleSubmit = async () => {
    try {
      const employerId = localStorage.getItem("employerId");
      if (!employerId) {
        console.error("Employer ID not found");
        return;
      }

      const formData: FormData = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: null,
        jobTitle: "",
        department: "",
        startDate: null,
        identityType: "nationalID",
        identityNumber: "",
        kraPIN: "",
        salary: "",
        paymentFrequency: "monthly",
        paymentMode: "mpesa",
        bankName: "",
        accountNumber: "",
        nhifNumber: "",
        nssfNumber: "",
      };

      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employerId,
          ...formData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Employee added successfully:", data.employee);
        alert("Employee added successfully!");
        onComplete();
      } else {
        console.error("Failed to add employee");
        alert("Failed to add employee. Please try again.");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Add your form JSX here */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
