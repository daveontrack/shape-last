'use server'

import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'

// Donation causes mapping
const causesMap: Record<string, { name: string; description: string }> = {
  education: { 
    name: "Children's Education", 
    description: "Supporting quality education for children in Ethiopia" 
  },
  water: { 
    name: "Clean Water Initiative", 
    description: "Building wells and water systems for communities" 
  },
  women: { 
    name: "Women Empowerment", 
    description: "Supporting women's economic independence" 
  },
  community: { 
    name: "Community Development", 
    description: "Funding infrastructure and community projects" 
  },
  general: { 
    name: "General Donation", 
    description: "Supporting SHAPEthiopia's mission" 
  },
}

export async function createDonationCheckout(
  amountInCents: number,
  cause: string,
  donorEmail?: string,
  donorName?: string,
  donorPhone?: string
) {
  const headersList = await headers()
  const origin = headersList.get('origin') || 'http://localhost:3000'
  
  const causeInfo = causesMap[cause] || causesMap.general
  
  // Create Checkout Session for donation with redirect mode
  const session = await stripe.checkout.sessions.create({
    customer_email: donorEmail || undefined,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Donation: ${causeInfo.name}`,
            description: causeInfo.description,
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}&cause=${cause}`,
    cancel_url: `${origin}/donate?cancelled=true`,
    metadata: {
      cause,
      donor_name: donorName || '',
      donor_phone: donorPhone || '',
      type: 'donation',
    },
  })

  return {
    url: session.url,
    sessionId: session.id,
  }
}

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return {
    status: session.status,
    paymentStatus: session.payment_status,
    customerEmail: session.customer_details?.email,
    amountTotal: session.amount_total,
    metadata: session.metadata,
  }
}
