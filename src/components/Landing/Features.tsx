import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  Users,
  CreditCard,
  ArrowRight,
  BarChart,
  HeadphonesIcon,
} from "lucide-react";

const features = [
  {
    icon: <Zap className="h-8 w-8 mb-4 text-blue-500" />,
    title: "Quick and Easy Setup",
    description:
      "Start managing payroll in minutes with a user-friendly platform tailored to Kenyan businesses.",
  },
  {
    icon: <Users className="h-8 w-8 mb-4 text-green-500" />,
    title: "Centralized Employee Management",
    description:
      "Organize all worker details securely in one place, making payroll administration easier than ever.",
  },
  {
    icon: <CreditCard className="h-8 w-8 mb-4 text-purple-500" />,
    title: "Flexible Payment Methods",
    description:
      "Pay your casual workers via M-Pesa, card, or bank transfer, giving you options that best suit your business needs.",
  },
  {
    icon: <ArrowRight className="h-8 w-8 mb-4 text-yellow-500" />,
    title: "Automatic Remittances",
    description:
      "Ensure compliance with effortless, automated contributions to retirement and healthcare benefits, so you can focus on growing your business.",
  },
  {
    icon: <BarChart className="h-8 w-8 mb-4 text-red-500" />,
    title: "Real-Time Reporting and Analytics",
    description:
      "Access up-to-date insights on payroll and benefits, helping you make informed decisions with accurate data at your fingertips.",
  },
  {
    icon: <HeadphonesIcon className="h-8 w-8 mb-4 text-indigo-500" />,
    title: "Dedicated Customer Support",
    description:
      "Receive priority support from our team to assist you with setup, troubleshooting, and any questions you have, so you're never on your own.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">
          Key Features of OlivaPay
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-center">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
