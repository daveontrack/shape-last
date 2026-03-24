"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CreditCard, Building2, Globe, MapPin } from "lucide-react"

interface DonationFormProps {
  onSubmit?: (data: any) => void
}

export function DonationForm({ onSubmit }: DonationFormProps) {
  // State for payment selections
  const [paymentType, setPaymentType] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("")

  // State for form fields
  const [formData, setFormData] = useState({
    // Credit Card fields
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    // PayPal fields
    paypalEmail: "",
    // Bank Transfer fields
    accountNumber: "",
    bankName: "",
  })

  // Payment type options
  const paymentTypes = [
    {
      value: "international",
      label: "International Payments",
      description: "For donors outside Ethiopia",
      icon: Globe,
    },
    {
      value: "ethiopian",
      label: "Ethiopian Payments",
      description: "For donors in Ethiopia",
      icon: MapPin,
    },
  ]

  // Payment method options (filtered by type)
  const getPaymentMethods = () => {
    if (paymentType === "international") {
      return [
        { value: "credit_card", label: "Credit Card", icon: CreditCard },
        { value: "paypal", label: "PayPal", icon: Building2 },
      ]
    } else if (paymentType === "ethiopian") {
      return [
        { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
      ]
    }
    return []
  }

  // Handle form field changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const submissionData = {
      paymentType,
      paymentMethod,
      ...formData,
    }

    if (onSubmit) {
      onSubmit(submissionData)
    } else {
      console.log("Form submitted:", submissionData)
      // Handle form submission logic here
    }
  }

  // Render payment method specific fields
  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "credit_card":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input
                  id="expirationDate"
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expirationDate}
                  onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        )

      case "paypal":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paypalEmail">PayPal Email</Label>
              <Input
                id="paypalEmail"
                type="email"
                placeholder="your@email.com"
                value={formData.paypalEmail}
                onChange={(e) => handleInputChange("paypalEmail", e.target.value)}
              />
            </div>
          </div>
        )

      case "bank_transfer":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                type="text"
                placeholder="Enter bank name"
                value={formData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Enter Your Details</CardTitle>
        <CardDescription>Complete your donation information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Type Selection */}
          <div className="space-y-3">
            <div>
              <Label className="text-base font-medium">Select Payment Method</Label>
              <p className="text-sm text-muted-foreground">Choose how you would like to make your donation</p>
            </div>

            <div className="grid gap-3">
              {paymentTypes.map((type) => (
                <div key={type.value}>
                  <input
                    type="radio"
                    id={type.value}
                    name="paymentType"
                    value={type.value}
                    checked={paymentType === type.value}
                    onChange={(e) => {
                      setPaymentType(e.target.value)
                      setPaymentMethod("") // Reset payment method when type changes
                    }}
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor={type.value}
                    className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <type.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{type.label}</p>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          {paymentType && (
            <div className="space-y-3">
              <Label className="text-base font-medium">Choose Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a payment method" />
                </SelectTrigger>
                <SelectContent>
                  {getPaymentMethods().map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      <div className="flex items-center gap-2">
                        <method.icon className="w-4 h-4" />
                        {method.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Dynamic Payment Fields */}
          {paymentMethod && (
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Payment Details</h3>
                {renderPaymentFields()}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {paymentMethod && (
            <Button type="submit" className="w-full" size="lg">
              Complete Donation
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}