import { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Leaf, Calendar, CreditCard, Briefcase, UserCircle, ShieldCheck } from "lucide-react"
import { format } from 'date-fns'
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const steps = [
  { title: "Personal Information", description: "Basic details", icon: UserCircle },
  { title: "Job Details", description: "Role and department", icon: Briefcase },
  { title: "Identity Verification", description: "ID and KRA PIN", icon: ShieldCheck },
  { title: "Payment Setup", description: "Salary and method", icon: CreditCard },
  { title: "Review and Submit", description: "Confirm details", icon: Leaf },
]

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
  identityType: 'nationalID' | 'passport';
  identityNumber: string;
  kraPIN: string;
  salary: string;
  paymentFrequency: 'weekly' | 'biweekly' | 'monthly';
  paymentMode: 'mpesa' | 'bankTransfer';
  bankName: string;
  accountNumber: string;
  nhifNumber: string;
  nssfNumber: string;
}

export function AddEmployeeForm({ onComplete }: AddEmployeeFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: null,
    jobTitle: '',
    department: '',
    startDate: null,
    identityType: 'nationalID',
    identityNumber: '',
    kraPIN: '',
    salary: '',
    paymentFrequency: 'monthly',
    paymentMode: 'mpesa',
    bankName: '',
    accountNumber: '',
    nhifNumber: '',
    nssfNumber: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleDateChange = (name: 'dateOfBirth' | 'startDate', date: Date | null) => {
    setFormData(prevData => ({ ...prevData, [name]: date }))
  }

  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(prevStep => prevStep - 1)
  }

  const handleSubmit = async () => {
    try {
      const employerId = localStorage.getItem('employerId'); // Assuming you store the employer ID after login
      if (!employerId) {
        console.error('Employer ID not found');
        return;
      }

      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employerId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          jobTitle: formData.jobTitle,
          department: formData.department,
          startDate: formData.startDate,
          identityType: formData.identityType,
          identityNumber: formData.identityNumber,
          kraPIN: formData.kraPIN,
          nhifNumber: formData.nhifNumber,
          nssfNumber: formData.nssfNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Employee added successfully:', data.employee);
        alert('Employee added successfully!');
        // Reset form or redirect as needed
      } else {
        console.error('Failed to add employee');
        alert('Failed to add employee. Please try again.');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // ... (rest of the component code remains the same)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* ... (component JSX remains the same) */}
    </div>
  )
}
