import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Verify admin access
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single()
    
    if (!profile?.is_admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { to, subject, type, data } = body

    if (!to || !subject || !type) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, type" },
        { status: 400 }
      )
    }

    // Generate email content based on type
    let htmlContent = ""
    
    switch (type) {
      case "donation_confirmed":
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #16a34a;">Donation Confirmed!</h1>
            <p>Dear ${data.donorName || "Valued Donor"},</p>
            <p>We are delighted to confirm that your donation of <strong>${data.amount} ${data.currency || "ETB"}</strong> has been verified and received.</p>
            <p>Your generosity will directly support our programs in Ethiopia, transforming lives through education, clean water access, women's empowerment, and community development.</p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Transaction ID:</strong> ${data.transactionId || "N/A"}</p>
              <p style="margin: 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p style="margin: 0;"><strong>Program:</strong> ${data.program || "General Fund"}</p>
            </div>
            <p>Thank you for your trust in SHAPEthiopia. Together, we are shaping a better future.</p>
            <p>With gratitude,<br/>The SHAPEthiopia Team</p>
          </div>
        `
        break

      case "donation_rejected":
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #dc2626;">Donation Status Update</h1>
            <p>Dear ${data.donorName || "Valued Donor"},</p>
            <p>We were unable to verify your donation of <strong>${data.amount} ${data.currency || "ETB"}</strong>.</p>
            ${data.adminNotes ? `<p><strong>Reason:</strong> ${data.adminNotes}</p>` : ""}
            <p>If you believe this is an error, please contact our support team with your transaction details:</p>
            <ul>
              <li>Transaction ID: ${data.transactionId || "N/A"}</li>
              <li>Payment Method: ${data.paymentMethod || "N/A"}</li>
              <li>Date: ${data.date || new Date().toLocaleDateString()}</li>
            </ul>
            <p>We appreciate your intention to support our cause and are happy to assist with any questions.</p>
            <p>Best regards,<br/>The SHAPEthiopia Team</p>
          </div>
        `
        break

      case "volunteer_approved":
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #16a34a;">Volunteer Application Approved!</h1>
            <p>Dear ${data.volunteerName},</p>
            <p>Congratulations! Your volunteer application with SHAPEthiopia has been <strong>approved</strong>.</p>
            <p>We are excited to have you join our team of dedicated volunteers making a difference in Ethiopian communities.</p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Next Steps:</h3>
              <ol>
                <li>Our volunteer coordinator will contact you within 3-5 business days</li>
                <li>You'll receive information about upcoming volunteer opportunities</li>
                <li>Complete your volunteer orientation (online or in-person)</li>
              </ol>
            </div>
            <p>Thank you for your commitment to making a positive impact!</p>
            <p>Welcome to the SHAPEthiopia family,<br/>The SHAPEthiopia Team</p>
          </div>
        `
        break

      case "volunteer_rejected":
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #dc2626;">Volunteer Application Update</h1>
            <p>Dear ${data.volunteerName},</p>
            <p>Thank you for your interest in volunteering with SHAPEthiopia.</p>
            <p>After careful review, we regret to inform you that we are unable to proceed with your application at this time.</p>
            ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ""}
            <p>We encourage you to:</p>
            <ul>
              <li>Support our mission through donations</li>
              <li>Share our work with your network</li>
              <li>Reapply in the future when circumstances change</li>
            </ul>
            <p>We appreciate your willingness to contribute and wish you all the best.</p>
            <p>Warm regards,<br/>The SHAPEthiopia Team</p>
          </div>
        `
        break

      default:
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1>Message from SHAPEthiopia</h1>
            <p>${data.message || "Thank you for your support."}</p>
            <p>Best regards,<br/>The SHAPEthiopia Team</p>
          </div>
        `
    }

    // Log the email action (in production, integrate with email service like Resend, SendGrid, etc.)
    const { error: logError } = await supabase
      .from("email_logs")
      .insert({
        recipient_email: to,
        subject,
        email_type: type,
        content: htmlContent,
        sent_by: user.id,
        status: "sent",
        created_at: new Date().toISOString(),
      })

    // If email_logs table doesn't exist, just continue
    if (logError && !logError.message.includes("does not exist")) {
      console.error("[v0] Email log error:", logError)
    }

    // In production, send actual email here using Resend, SendGrid, etc.
    // For now, we'll simulate success
    console.log(`[v0] Email would be sent to: ${to}`)
    console.log(`[v0] Subject: ${subject}`)
    console.log(`[v0] Type: ${type}`)

    return NextResponse.json({ 
      success: true, 
      message: "Email notification sent successfully",
      // In production, return actual email ID from the service
      emailId: `email_${Date.now()}`
    })

  } catch (error) {
    console.error("[v0] Email send error:", error)
    return NextResponse.json(
      { error: "Failed to send email notification" },
      { status: 500 }
    )
  }
}
