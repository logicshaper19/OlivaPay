'use client';
import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Leaf } from "lucide-react"

const steps = [
  { title: "Verify Your Phone", description: "Provide your phone number for account verification" },
  { title: "Company Details", description: "Provide information about your company" },
  { title: "Employee Setup", description: "Set up your employee onboarding preferences" },
]

interface FormData {
  phoneNumber: string;
  companyName: string;
  companyType: string;
  website: string;
  country: string;
  county: string;
  companySize: string;
  employeeCount: string;
  needAssistance: boolean;
}

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    companyName: '',
    companyType: '',
    website: '',
    country: '',
    county: '',
    companySize: '',
    employeeCount: '',
    needAssistance: false,
  })
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prevData => ({ ...prevData, needAssistance: checked }))
  }

  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(prevStep => prevStep - 1)
  }

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId })
      });

      if (response.ok) {
        console.log('Onboarding completed successfully');
        router.push('/dashboard'); // Redirect to dashboard after successful onboarding
      } else {
        console.error('Onboarding failed');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
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
              <p className="text-sm text-gray-500">Your phone number will be used to verify certain actions, ensuring secure access and transactions.</p>
            </div>
          </div>
        )
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
              <Select name="companyType" onValueChange={(value) => handleSelectChange("companyType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="businessName">Business Name</SelectItem>
                  <SelectItem value="privateLimited">Private Limited Company</SelectItem>
                  <SelectItem value="publicLimited">Public Limited Company</SelectItem>
                  <SelectItem value="limitedByGuarantee">Company Limited by Guarantee</SelectItem>
                  <SelectItem value="llp">Limited Liability Partnership</SelectItem>
                  <SelectItem value="limitedPartnership">Limited Partnership</SelectItem>
                  <SelectItem value="foreignCompany">Foreign Company</SelectItem>
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
              <Select name="country" onValueChange={(value) => handleSelectChange("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kenya">Kenya</SelectItem>
                  <SelectItem value="uganda">Uganda</SelectItem>
                  <SelectItem value="tanzania">Tanzania</SelectItem>
                  <SelectItem value="rwanda">Rwanda</SelectItem>
                  <SelectItem value="burundi">Burundi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.country === 'kenya' && (
              <div className="space-y-2">
                <Label htmlFor="county">County</Label>
                <Select name="county" onValueChange={(value) => handleSelectChange("county", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nairobi">Nairobi</SelectItem>
                    <SelectItem value="mombasa">Mombasa</SelectItem>
                    <SelectItem value="kisumu">Kisumu</SelectItem>
                    {/* Add all 47 Kenyan counties here */}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select name="companySize" onValueChange={(value) => handleSelectChange("companySize", value)}>
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
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeCount">How Many Employees Would You Like to Onboard?</Label>
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
              <Label htmlFor="needAssistance">Do You Need Assistance with Onboarding?</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needAssistance"
                  checked={formData.needAssistance}
                  onCheckedChange={handleCheckboxChange}
                />
                <label htmlFor="needAssistance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Yes, I need assistance
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Support options include bulk uploads, data input guidance, and additional onboarding assistance.
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center mb-8">
          <Leaf className="h-8 w-8 text-green-500 mr-2" />
          <span className="text-2xl font-bold">OlivaPay</span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-4">
          <Progress value={(currentStep + 1) / steps.length * 100} className="w-full" />
          <p className="text-center mt-2 text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</p>
        </div>
      </div>
    </div>
  )
}