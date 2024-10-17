import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const faqData = {
  all: [
    {
      question: "What is OlivaPay?",
      answer:
        "OlivaPay is a comprehensive payroll management platform designed specifically for Kenyan businesses to handle casual worker payments, ensuring compliance with local regulations and streamlining retirement and healthcare benefits.",
    },
    {
      question: "How does OlivaPay ensure compliance with Kenyan regulations?",
      answer:
        "OlivaPay is built with Kenyan labor laws and regulations in mind. Our system automatically calculates the correct deductions, taxes, and contributions required by law, helping you stay compliant without the hassle of manual calculations.",
    },
    {
      question: "What payment methods does OlivaPay support?",
      answer:
        "OlivaPay supports various payment methods including M-Pesa, bank transfers, and card payments, giving you flexibility in how you pay your casual workers.",
    },
  ],
  general: [
    {
      question: "How do I get started with OlivaPay?",
      answer:
        "Getting started is easy! Simply sign up for a free 30-day trial on our website. Our team will guide you through the setup process and help you import your employee data.",
    },
    {
      question: "Is OlivaPay suitable for businesses of all sizes?",
      answer:
        "Yes, OlivaPay is designed to scale with your business. Whether you're a small startup or a large corporation, our platform can accommodate your payroll needs.",
    },
  ],
  payments: [
    {
      question: "How often can I run payroll with OlivaPay?",
      answer:
        "You can run payroll as frequently as you need. Our system supports daily, weekly, bi-weekly, or monthly payroll cycles to suit your business needs.",
    },
    {
      question: "Are there any transaction fees for payments?",
      answer:
        "Transaction fees may vary depending on the payment method chosen. We strive to keep our fees competitive and transparent. Please check our pricing page for the most up-to-date information.",
    },
  ],
  compliance: [
    {
      question: "Does OlivaPay handle tax calculations and remittances?",
      answer:
        "Yes, OlivaPay automatically calculates the correct taxes and statutory deductions based on current Kenyan regulations. We also generate reports to help you with remittances to the relevant authorities.",
    },
    {
      question: "How does OlivaPay stay updated with changing regulations?",
      answer:
        "Our team of experts constantly monitors changes in Kenyan labor laws and tax regulations. We promptly update our system to ensure ongoing compliance, giving you peace of mind.",
    },
  ],
  security: [
    {
      question: "How secure is my data with OlivaPay?",
      answer:
        "We take data security very seriously. OlivaPay uses bank-level encryption to protect your data, and we comply with international data protection standards to ensure your information is always safe.",
    },
    {
      question: "Can I control access levels for different users?",
      answer:
        "Absolutely! OlivaPay offers role-based access control, allowing you to set different permission levels for various users in your organization, ensuring data privacy and security.",
    },
  ],
};

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Got questions? We&apos;ve got answers.
        </h2>
        <h3 className="text-2xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h3>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Find answers to common questions about OlivaPay&apos;s features,
          technology, and security.
        </p>
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <Tabs defaultValue="all" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          {Object.entries(faqData).map(([category, questions]) => (
            <TabsContent key={category} value={category}>
              <div className="space-y-4">
                {questions.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold mb-2">{item.question}</h4>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
