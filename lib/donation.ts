// Donation API utilities
export interface DonationSubmission {
  donor_name: string
  donor_phone: string
  donor_email?: string
  amount: number
  payment_method: string
  transaction_id?: string
  program: string
  message?: string
  }

export interface DonationResponse {
  id: string
  donation_id: string
  success: boolean
  message: string
  receipt_number?: string
}

export async function submitDonation(data: DonationSubmission): Promise<DonationResponse> {
  const response = await fetch("/api/donate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to submit donation")
  }

  return response.json()
}

export async function getDonationReceipt(donationId: string) {
  const response = await fetch(`/api/donate?id=${donationId}`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch donation receipt")
  }

  return response.json()
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function generateReceiptNumber(): string {
  return `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}
