"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, CreditCard, Building2, Globe, MapPin, Smartphone, ArrowRight, ArrowLeft } from "lucide-react"

interface DonationFormData {
  // Payment selection
  paymentType: string
  paymentMethod: string

  // Common fields
  fullName: string
  phoneNumber: string
  email: string

  // International specific
  streetAddress: string
  city: string
  country: string
  postalCode: string
  bankName: string
  bankAddress: string
  accountNumber: string
  swiftCode: string
  paymentAmount: string
  currency: string
  purposeOfPayment: string
  companyName: string
  taxId: string
  intermediaryBank: string

  // Ethiopian specific
  accountHolderName: string
  mobileWalletProvider: string
  registeredPhoneNumber: string

  // Payment method specific
  cardNumber: string
  expirationDate: string
  cvv: string
  paypalEmail: string
}

interface DonationFormProps {
  onSubmit?: (data: DonationFormData) => void
}

export function DynamicDonationForm({ onSubmit }: DonationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<DonationFormData>({
    paymentType: "",
    paymentMethod: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    city: "",
    country: "",
    postalCode: "",
    bankName: "",
    bankAddress: "",
    accountNumber: "",
    swiftCode: "",
    paymentAmount: "",
    currency: "USD",
    purposeOfPayment: "",
    companyName: "",
    taxId: "",
    intermediaryBank: "",
    accountHolderName: "",
    mobileWalletProvider: "",
    registeredPhoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    paypalEmail: "",
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

  // Payment method options based on type
  const getPaymentMethods = () => {
    if (formData.paymentType === "international") {
      return [
        { value: "credit_card", label: "Credit Card", icon: CreditCard },
        { value: "paypal", label: "PayPal", icon: Building2 },
        { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
      ]
    } else if (formData.paymentType === "ethiopian") {
      return [
        { value: "bank_transfer", label: "Bank Transfer", icon: Building2 },
        { value: "mobile_money", label: "Mobile Money", icon: Smartphone },
      ]
    }
    return []
  }

  // Handle input changes
  const handleInputChange = (field: keyof DonationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle payment type change
  const handlePaymentTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      paymentType: value,
      paymentMethod: "", // Reset payment method when type changes
    }))
  }

  // Navigation
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Validation for each step
  const canProceedFromStep1 = () => {
    return formData.paymentType && formData.paymentMethod
  }

  const canProceedFromStep2 = () => {
    if (formData.paymentType === "international") {
      return formData.fullName && formData.email && formData.phoneNumber
    } else if (formData.paymentType === "ethiopian") {
      return formData.fullName && formData.phoneNumber
    }
    return false
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log("Form submitted:", formData)
    }
  }

  // Render Step 1: Payment Selection
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Payment Method</h2>
        <p className="text-muted-foreground">Choose how you would like to make your donation</p>
      </div>

      {/* Payment Type Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Payment Type</Label>
        <RadioGroup value={formData.paymentType} onValueChange={handlePaymentTypeChange}>
          <div className="grid gap-3">
            {paymentTypes.map((type) => (
              <div key={type.value}>
                <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                <Label
                  htmlFor={type.value}
                  className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted transition-colors"
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
        </RadioGroup>
      </div>

      {/* Payment Method Selection */}
      {formData.paymentType && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Payment Method</Label>
          <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
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

      <Button
        onClick={nextStep}
        disabled={!canProceedFromStep1()}
        className="w-full"
        size="lg"
      >
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )

  // Render Step 2: Donor Information
  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Donor Information</h2>
        <p className="text-muted-foreground">
          {formData.paymentType === "international"
            ? "Please provide your banking and contact information for international transfer"
            : "Please provide your banking and mobile information for Ethiopian payments"
          }
        </p>
      </div>

      {/* Common Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full Name {formData.paymentType === "international" ? "(as on bank account)" : "(as registered on bank/mobile account)"} *
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="Enter your full legal name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">
            Phone Number {formData.paymentType === "ethiopian" ? "(+251XXXXXXXXX)" : ""} *
          </Label>
          <Input
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            placeholder={formData.paymentType === "ethiopian" ? "+251911123456" : "+1 (555) 123-4567"}
          />
        </div>
      </div>

      {/* International Specific Fields */}
      {formData.paymentType === "international" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Residential Address</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="New York"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="United States"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
                placeholder="Chase Bank"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number / IBAN</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                placeholder="IBAN or Account Number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="swiftCode">SWIFT/BIC Code *</Label>
              <Input
                id="swiftCode"
                value={formData.swiftCode}
                onChange={(e) => handleInputChange("swiftCode", e.target.value)}
                placeholder="CHASUS33"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purposeOfPayment">Purpose of Payment</Label>
            <Textarea
              id="purposeOfPayment"
              value={formData.purposeOfPayment}
              onChange={(e) => handleInputChange("purposeOfPayment", e.target.value)}
              placeholder="Donation to SHAPEthiopia"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name (Optional)</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="Your Company Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / National ID (Optional)</Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={(e) => handleInputChange("taxId", e.target.value)}
                placeholder="Tax or National ID"
              />
            </div>
          </div>
        </>
      )}

      {/* Ethiopian Specific Fields */}
      {formData.paymentType === "ethiopian" && (
        <>
          {formData.paymentMethod === "bank_transfer" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountHolderName">Account Holder Name (must match Full Name)</Label>
                <Input
                  id="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                  placeholder="Account holder name as on bank records"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Select value={formData.bankName} onValueChange={(value) => handleInputChange("bankName", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbe">Commercial Bank of Ethiopia (CBE)</SelectItem>
                      <SelectItem value="dashen">Dashen Bank</SelectItem>
                      <SelectItem value="awash">Awash International Bank</SelectItem>
                      <SelectItem value="lion">Lion International Bank</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    placeholder="Your account number"
                  />
                </div>
              </div>
            </div>
          )}

          {formData.paymentMethod === "mobile_money" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobileWalletProvider">Mobile Wallet Provider</Label>
                <Select value={formData.mobileWalletProvider} onValueChange={(value) => handleInputChange("mobileWalletProvider", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your mobile wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telebirr">Tele Birr</SelectItem>
                    <SelectItem value="cbe_mobile">CBE Mobile</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registeredPhoneNumber">Registered Phone Number (+251XXXXXXXXX)</Label>
                <Input
                  id="registeredPhoneNumber"
                  value={formData.registeredPhoneNumber}
                  onChange={(e) => handleInputChange("registeredPhoneNumber", e.target.value)}
                  placeholder="+251911123456"
                />
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={!canProceedFromStep2()}
          className="flex-1"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  // Render Step 3: Payment-Specific Fields
  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Payment Details</h2>
        <p className="text-muted-foreground">
          Complete your payment information for {formData.paymentMethod.replace("_", " ")}
        </p>
      </div>

      {/* Payment Amount (for all types) */}
      <div className="space-y-2">
        <Label htmlFor="paymentAmount">Payment Amount</Label>
        <Input
          id="paymentAmount"
          type="number"
          value={formData.paymentAmount}
          onChange={(e) => handleInputChange("paymentAmount", e.target.value)}
          placeholder="Enter amount"
          min="1"
        />
      </div>

      {/* Credit Card Fields */}
      {formData.paymentMethod === "credit_card" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input
                id="expirationDate"
                value={formData.expirationDate}
                onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
        </div>
      )}

      {/* PayPal Fields */}
      {formData.paymentMethod === "paypal" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paypalEmail">PayPal Email or Account</Label>
            <Input
              id="paypalEmail"
              type="email"
              value={formData.paypalEmail}
              onChange={(e) => handleInputChange("paypalEmail", e.target.value)}
              placeholder="your@email.com or PayPal account"
            />
          </div>
        </div>
      )}

      {/* Bank Transfer Fields (International) */}
      {formData.paymentMethod === "bank_transfer" && formData.paymentType === "international" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankAddress">Bank Address (if required)</Label>
            <Textarea
              id="bankAddress"
              value={formData.bankAddress}
              onChange={(e) => handleInputChange("bankAddress", e.target.value)}
              placeholder="Complete bank address for international transfer"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="intermediaryBank">Intermediary Bank Details (Optional)</Label>
            <Textarea
              id="intermediaryBank"
              value={formData.intermediaryBank}
              onChange={(e) => handleInputChange("intermediaryBank", e.target.value)}
              placeholder="If your bank requires an intermediary bank"
              rows={3}
            />
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1"
          size="lg"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Complete Donation
        </Button>
      </div>
    </div>
  )

  // Progress indicator
  const steps = [
    { number: 1, label: "Payment Selection" },
    { number: 2, label: "Donor Information" },
    { number: 3, label: "Payment Details" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 md:gap-4 overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= step.number
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`hidden sm:inline text-sm font-medium ${
                  currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 md:w-16 h-0.5 mx-2 ${
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-6 md:p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </CardContent>
      </Card>
    </div>
  )
}