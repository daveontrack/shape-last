"use client"

import { DonationForm } from "@/components/donation-form"

export default function DonationPage() {
  const handleDonationSubmit = (data: any) => {
    console.log("Donation data:", data)
    // Handle the donation submission
    // You can integrate with your payment processing here
  }

  return (
    <div className="container mx-auto py-8">
      <DonationForm onSubmit={handleDonationSubmit} />
    </div>
  )
}