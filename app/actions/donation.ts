'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createEthiopianDonation(
  amount: number,
  currency: string,
  cause: string,
  paymentMethod: string,
  donorName: string,
  donorEmail?: string,
  donorPhone?: string
) {
  try {
    const supabase = createClient()

    // Get current user if logged in
    const { data: { user } } = await supabase.auth.getUser()

    // Generate transaction ID
    const transactionId = `ET-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create donation record
    const { data, error } = await supabase
      .from('donations')
      .insert({
        user_id: user?.id || null,
        amount,
        currency,
        program: cause,
        status: 'pending',
        payment_method: paymentMethod,
        transaction_id: transactionId,
        message: `Donation via ${paymentMethod}`,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating donation:', error)
      throw new Error('Failed to create donation record')
    }

    revalidatePath('/donate')
    revalidatePath('/dashboard/donations')

    return {
      success: true,
      transactionId,
      donationId: data.id,
    }
  } catch (error) {
    console.error('Error in createEthiopianDonation:', error)
    throw error
  }
}

// Payment instructions for different Ethiopian payment methods
export const paymentInstructions: Record<string, { instructions: string[], accountInfo: string }> = {
  telebirr: {
    instructions: [
      'Open your Tele Birr app',
      'Go to the payment section',
      'Select "Transfer to Merchant" or "Pay Bill"',
      'Enter the account number below',
      'Enter the donation amount',
      'Add transaction ID as reference',
      'Complete the payment',
      'Send screenshot to our team for verification'
    ],
    accountInfo: 'Account: SHAPEthiopia - 0912345678'
  },
  cbe: {
    instructions: [
      'Visit your nearest CBE branch',
      'Request a bank transfer form',
      'Fill in the account details below',
      'Include transaction ID in the reference field',
      'Submit the form with the donation amount',
      'Keep the receipt for your records',
      'Send receipt to our team for verification'
    ],
    accountInfo: 'Account: SHAPEthiopia - 1000123456789, CBE Main Branch'
  },
  cbe_bank: {
    instructions: [
      'Open your CBE Mobile Banking app',
      'Go to Transfer > To Other Bank Account',
      'Enter the account details below',
      'Include transaction ID in the description',
      'Confirm the payment',
      'Save the transaction reference',
      'Send confirmation to our team'
    ],
    accountInfo: 'Account: SHAPEthiopia - 1000123456789, CBE'
  },
  absiniya: {
    instructions: [
      'Visit your nearest Awash International Bank branch',
      'Request a transfer to the account below',
      'Include transaction ID as reference',
      'Complete the transfer',
      'Keep the receipt',
      'Send receipt to our team for verification'
    ],
    accountInfo: 'Account: SHAPEthiopia - 1234567890123, Awash International Bank'
  },
  bank_transfer: {
    instructions: [
      'Visit your bank branch',
      'Request a transfer to the account below',
      'Include transaction ID as reference',
      'Complete the transfer',
      'Keep the receipt',
      'Send receipt to our team for verification'
    ],
    accountInfo: 'Account: SHAPEthiopia - Contact us for account details'
  }
}