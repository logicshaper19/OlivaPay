"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Home, Users, CreditCard, Heart, FileText, PlusCircle, DollarSign, Clock, BarChart2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const payrollData = [
  { month: 'Jan', amount: 50000 },
  { month: 'Feb', amount: 55000 },
  { month: 'Mar', amount: 60000 },
  { month: 'Apr', amount: 58000 },
  { month: 'May', amount: 62000 },
  { month: 'Jun', amount: 65000 },
]

const recentActivities = [
  { id: 1, action: 'New employee added', time: '2 hours ago' },
  { id: 2, action: 'Payroll processed', time: '1 day ago' },
  { id: 3, action: 'Benefit plan updated', time: '3 days ago' },
  { id: 4, action: 'Tax filing completed', time: '1 week ago' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Welcome back, John!</h2>
              <div className="flex space-x-2">
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
                </Button>
                <Button size="sm">
                  <DollarSign className="mr-2 h-4 w-4" /> Process Payroll
                </Button>
                <Button size="sm">
                  <BarChart2 className="mr-2 h-4 w-4" /> View Reports
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">250</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$65,000</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Benefits</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payroll Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={payrollData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivities.map((activity) => (
                    <li key={activity.id} className="flex justify-between items-center">
                      <span>{activity.action}</span>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )
      case 'employees':
        return <div>Employees Content</div>
      case 'payments':
        return <div>Payments Content</div>
      case 'benefits':
        return <div>Benefits Content</div>
      case 'transactions':
        return <div>Transactions Content</div>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="text-2xl font-bold">OlivaPay</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Button variant={activeTab === 'home' ? 'default' : 'ghost'} onClick={() => setActiveTab('home')}>
                  <Home className="mr-2 h-4 w-4" /> Home
                </Button>
              </li>
              <li>
                <Button variant={activeTab === 'employees' ? 'default' : 'ghost'} onClick={() => setActiveTab('employees')}>
                  <Users className="mr-2 h-4 w-4" /> Employees
                </Button>
              </li>
              <li>
                <Button variant={activeTab === 'payments' ? 'default' : 'ghost'} onClick={() => setActiveTab('payments')}>
                  <CreditCard className="mr-2 h-4 w-4" /> Payments
                </Button>
              </li>
              <li>
                <Button variant={activeTab === 'benefits' ? 'default' : 'ghost'} onClick={() => setActiveTab('benefits')}>
                  <Heart className="mr-2 h-4 w-4" /> Benefits
                </Button>
              </li>
              <li>
                <Button variant={activeTab === 'transactions' ? 'default' : 'ghost'} onClick={() => setActiveTab('transactions')}>
                  <FileText className="mr-2 h-4 w-4" /> Transactions
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderTabContent()}
      </main>
    </div>
  )
}
