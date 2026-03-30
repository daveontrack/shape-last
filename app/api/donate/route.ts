import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate required fields
    const { donor_name, donor_phone, amount, payment_method, campaign } = body
    
    if (!donor_name || !donor_name.trim()) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      )
    }
    
    if (!donor_phone || !donor_phone.trim()) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      )
    }
    
    if (!amount || amount < 10) {
      return NextResponse.json(
        { error: "Minimum donation amount is 10" },
        { status: 400 }
      )
    }
    
    if (!payment_method) {
      return NextResponse.json(
        { error: "Payment method is required" },
        { status: 400 }
      )
    }
    
    if (!campaign) {
      return NextResponse.json(
        { error: "Please select a cause/campaign" },
        { status: 400 }
      )
    }
    
    // For non-stripe payments, transaction_id is required
    if (payment_method !== "stripe" && (!body.transaction_id || !body.transaction_id.trim())) {
      return NextResponse.json(
        { error: "Transaction ID is required for verification" },
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // Insert donation record
    const donationData = {
      user_id: body.user_id || null,
      donor_name: donor_name.trim(),
      donor_phone: donor_phone.trim(),
      donor_email: body.donor_email || null,
      amount: Number(amount),
      currency: body.currency || "ETB",
      payment_method: payment_method,
      transaction_id: body.transaction_id?.trim() || null,
      program: campaign, // store cause in the existing `program` column
      payment_status: payment_method === "stripe" ? "completed" : "pending",
      donation_type: "one-time",
      is_anonymous: !body.donor_name,
      created_at: new Date().toISOString(),
    }
    
    const { data, error } = await supabase
      .from("donations")
      .insert(donationData)
      .select()
      .single()
    
    if (error) {
      console.error("[v0] Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to save donation. Please try again." },
        { status: 500 }
      )
    }
    
    // Send thank you email if donor email is provided
    if (body.donor_email) {
      try {
        const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-donation-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: body.donor_email,
            name: donor_name.trim(),
            amount: Number(amount),
            currency: body.currency || "ETB",
            program: campaign,
            donationId: data.id,
            paymentMethod: payment_method,
            frequency: "one-time",
          }),
        })

        if (emailResponse.ok) {
          console.log("[v0] Thank you email sent successfully to:", body.donor_email)
        } else {
          console.error("[v0] Failed to send thank you email:", await emailResponse.text())
        }
      } catch (error) {
        console.error("[v0] Error sending thank you email:", error)
        // Don't fail the donation if email fails to send
      }
    }

    console.log("[v0] Donation recorded:", {
      id: data.id,
      amount: data.amount,
      payment_method: data.payment_method,
      status: data.payment_status
    })
    
    return NextResponse.json({
      success: true,
      id: data.id,
      message: payment_method === "stripe" 
        ? "Thank you for your donation!" 
        : "Your donation has been submitted and is pending verification.",
    })
    
  } catch (error) {
    console.error("[v0] Donate API error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch donation by ID (for success page)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json(
        { error: "Donation ID is required" },
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from("donations")
      .select("id, amount, currency, payment_method, program, payment_status, created_at, donor_name, transaction_id")
      .eq("id", id)
      .single()
    
    if (error || !data) {
      return NextResponse.json(
        { error: "Donation not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(data)
    
  } catch (error) {
    console.error("[v0] Get donation error:", error)
    return NextResponse.json(
      { error: "Failed to fetch donation" },
      { status: 500 }
    )
  }
}
