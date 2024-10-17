"use client";
import { useState, useEffect, ChangeEvent } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Leaf } from "lucide-react";
import { toast } from "react-hot-toast";

const steps = [
  {
    title: "Verify Your Phone",
    description: "Provide your phone number for account verification",
  },
  {
    title: "Company Details",
    description: "Provide information about your company",
  },
  {
    title: "Employee Setup",
    description: "Set up your employee onboarding preferences",
  },
];

interface Country {
  id: number;
  name: string;
  code: string;
}

interface County {
  id: number;
  countryId: number;
  name: string;
}

interface FormData {
  phoneNumber: string;
  companyName: string;
  companyType: string;
  website: string;
  countryId: number | null;
  countyId: number | null;
  companySize: string;
  employeeCount: string;
  needAssistance: boolean;
}

export default function OnboardingFormComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [countries, setCountries] = useState<Country[]>([]);
  const [counties, setCounties] = useState<County[]>([]);
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: "",
    companyName: "",
    companyType: "",
    website: "",
    countryId: null,
    countyId: null,
    companySize: "",
    employeeCount: "",
    needAssistance: false,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        console.log("Fetching countries...");
        const response = await fetch("/api/countries");
        console.log("API response:", response);
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

  const fetchCounties = async (countryId: number) => {
    if (countryId === 1) {
      // 1 is the ID for Kenya
      try {
        console.log("Fetching counties...");
        const response = await fetch(`/api/counties?countryId=${countryId}`);
        console.log("Response status:", response.status);
        const text = await response.text();
        console.log("Response text:", text);
        if (!response.ok)
          throw new Error(
            `Failed to fetch counties: ${response.status} ${text}`,
          );
        const data = JSON.parse(text);
        console.log("Fetched counties:", data);
        setCounties(data);
      } catch (error: unknown) {
        console.error("Error fetching counties:", error);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(`Failed to fetch counties: ${errorMessage}`);
      }
    } else {
      setCounties([]); // Clear counties if not Kenya
    }
  };

  useEffect(() => {
    if (formData.countryId) {
      fetchCounties(formData.countryId);
    }
  }, [formData.countryId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    const numValue = parseInt(value, 10);
    setFormData((prevData) => ({
      ...prevData,
      [name]: isNaN(numValue) ? null : numValue,
      // Reset countyId when country changes
      ...(name === "countryId" ? { countyId: null } : {}),
    }));

    // If a country is selected, fetch counties
    if (name === "countryId" && !isNaN(numValue)) {
      fetchCounties(numValue);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prevData) => ({ ...prevData, needAssistance: checked }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const validateForm = () => {
    if (!formData.phoneNumber) {
      toast.error("Phone number is required");
      return false;
    }
    if (!formData.companyName) {
      toast.error("Company name is required");
      return false;
    }
    if (!formData.companyType) {
      toast.error("Company type is required");
      return false;
    }
    if (!formData.countryId) {
      toast.error("Country is required");
      return false;
    }
    if (!formData.companySize) {
      toast.error("Company size is required");
      return false;
    }
    if (!formData.employeeCount) {
      toast.error("Employee count is required");
      return false;
    }
    if (formData.countryId === 1 && !formData.countyId) {
      toast.error("County is required for Kenya");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    const employerId = localStorage.getItem("employerId");
    if (!employerId) {
      console.log("Employer ID not found, redirecting to signup");
      toast.error("Employer ID not found. Please sign up again.");
      router.push("/signup");
      return;
    }

    try {
      console.log("Submitting onboarding data:", formData);
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employerId: parseInt(employerId),
          phoneNumber: formData.phoneNumber,
          companyName: formData.companyName,
          companyType: formData.companyType,
          website: formData.website,
          countryId: formData.countryId,
          countyId: formData.countyId,
          companySize: formData.companySize,
          employeeCount: parseInt(formData.employeeCount),
          needAssistance: formData.needAssistance,
        }),
      });

      const data = await response.json();
      console.log("Full onboarding response:", response);
      console.log("Onboarding response data:", data);

      if (response.ok) {
        toast.success("Onboarding completed successfully");
        console.log("Attempting to redirect to dashboard...");
        try {
          router.push("/dashboard");
          console.log("Router.push to dashboard initiated");
        } catch (err) {
          console.error("Error during redirection:", err);
        }
      } else {
        console.error("Onboarding failed:", data.error || "Unknown error");
        toast.error(`Onboarding failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Your phone number will be used to verify certain actions,
                ensuring secure access and transactions.
              </p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyType">Company Type</Label>
              <Select
                name="companyType"
                onValueChange={(value) =>
                  handleSelectChange("companyType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="businessName">Business Name</SelectItem>
                  <SelectItem value="privateLimited">
                    Private Limited Company
                  </SelectItem>
                  <SelectItem value="publicLimited">
                    Public Limited Company
                  </SelectItem>
                  <SelectItem value="limitedByGuarantee">
                    Company Limited by Guarantee
                  </SelectItem>
                  <SelectItem value="llp">
                    Limited Liability Partnership
                  </SelectItem>
                  <SelectItem value="limitedPartnership">
                    Limited Partnership
                  </SelectItem>
                  <SelectItem value="foreignCompany">
                    Foreign Company
                  </SelectItem>
                  <SelectItem value="trusts">Trusts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="Enter your website URL"
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                name="countryId"
                onValueChange={(value) =>
                  handleSelectChange("countryId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id.toString()}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.countryId === 1 && (
              <div className="space-y-2">
                <Label htmlFor="county">County</Label>
                <Select
                  name="countyId"
                  onValueChange={(value) =>
                    handleSelectChange("countyId", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    {counties.map((county) => (
                      <SelectItem key={county.id} value={county.id.toString()}>
                        {county.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select
                name="companySize"
                onValueChange={(value) =>
                  handleSelectChange("companySize", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 Employees</SelectItem>
                  <SelectItem value="11-50">11-50 Employees</SelectItem>
                  <SelectItem value="51-100">51-100 Employees</SelectItem>
                  <SelectItem value="101+">101+ Employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeCount">
                How Many Employees Would You Like to Onboard?
              </Label>
              <Input
                id="employeeCount"
                name="employeeCount"
                type="number"
                placeholder="Enter number of employees"
                value={formData.employeeCount}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="needAssistance">
                Do You Need Assistance with Onboarding?
              </Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needAssistance"
                  checked={formData.needAssistance}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="needAssistance"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Yes, I need assistance
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Support options include bulk uploads, data input guidance, and
                additional onboarding assistance.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center mb-8">
          <Leaf className="h-8 w-8 text-green-500 mr-2" />
          <span className="text-2xl font-bold">OlivaPay</span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={
                currentStep === steps.length - 1 ? handleSubmit : handleNext
              }
            >
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-4">
          <Progress
            value={((currentStep + 1) / steps.length) * 100}
            className="w-full"
          />
          <p className="text-center mt-2 text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
}
