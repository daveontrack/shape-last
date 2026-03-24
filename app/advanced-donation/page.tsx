"use client"

import { DynamicDonationForm } from "@/components/dynamic-donation-form"

export default function AdvancedDonationPage() {
  const handleDonationSubmit = (data: any) => {
    console.log("Advanced donation data:", data)

    // Here you would typically:
    // 1. Validate the data
    // 2. Process the payment based on type/method
    // 3. Save to database
    // 4. Send confirmation emails
    // 5. Redirect to success page

    alert(`Thank you for your donation! Payment type: ${data.paymentType}, Method: ${data.paymentMethod}`)
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Make a Difference Today
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your generous donation directly supports our programs and transforms lives across Ethiopia.
            Choose your preferred payment method below.
          </p>
        </div>

        <DynamicDonationForm onSubmit={handleDonationSubmit} />
      </div>
    </div>
  )
}