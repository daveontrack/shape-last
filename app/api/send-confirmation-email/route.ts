import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, confirmationLink, firstName } = await request.json()

    console.log("[v0] Sending confirmation email to:", email)

    if (!email || !confirmationLink) {
      return NextResponse.json(
        { error: "Email and confirmation link are required" },
        { status: 400 }
      )
    }

    // Resend domain verification check
    // Once you verify shapethiopia.org domain at resend.com/domains, set this to true
    const isDomainVerified = process.env.RESEND_DOMAIN_VERIFIED === 'true'
    
    let fromEmail = "onboarding@resend.dev"
    
    if (isDomainVerified) {
      // Use custom domain once verified
      fromEmail = "noreply@shapethiopia.org"
      console.log("[v0] Using verified domain for email")
    } else {
      // In test mode, can only send to test email
      const testEmail = "dawitberiso406@gmail.com"
      const isTestEmail = email === testEmail
      
      if (!isTestEmail) {
        console.log(`[v0] Domain not verified. Resend test mode - can only send to ${testEmail}`)
        return NextResponse.json({
          success: true,
          message: "Email verification recorded. To send to other addresses, verify domain at resend.com/domains",
          skipped: true,
          reason: "Resend test mode - domain not verified",
        })
      }
      console.log("[v0] Using test mode - sending to verified test email only")
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Confirm Your SHAPEthiopia Account",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background: #f9fafb;
              }
              .card {
                background: white;
                border-radius: 8px;
                padding: 32px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 24px;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                color: #1a1a1a;
              }
              .logo .primary {
                color: #dc2626;
              }
              h1 {
                color: #1a1a1a;
                margin: 16px 0;
                font-size: 24px;
              }
              .content {
                margin-bottom: 24px;
                color: #666;
              }
              .button {
                display: inline-block;
                background: #dc2626;
                color: white;
                padding: 12px 24px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 500;
                margin-bottom: 24px;
              }
              .button:hover {
                background: #b91c1c;
              }
              .footer {
                text-align: center;
                font-size: 12px;
                color: #999;
                margin-top: 24px;
                padding-top: 24px;
                border-top: 1px solid #eee;
              }
              .link-text {
                color: #dc2626;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <div class="header">
                  <div class="logo">
                    SHAPE<span class="primary">ethiopia</span>
                  </div>
                </div>
                
                <h1>Confirm Your Email Address</h1>
                
                <div class="content">
                  <p>Hi ${firstName || 'there'},</p>
                  
                  <p>Thank you for signing up with SHAPEthiopia! To complete your registration and start making an impact, please confirm your email address by clicking the button below.</p>
                  
                  <div style="text-align: center; margin: 32px 0;">
                    <a href="${confirmationLink}" class="button">Confirm Email Address</a>
                  </div>
                  
                  <p style="color: #999; font-size: 14px;">If the button doesn't work, you can also click this link:<br>
                    <a href="${confirmationLink}" class="link-text">${confirmationLink}</a>
                  </p>
                  
                  <p>This link will expire in 24 hours for security reasons.</p>
                </div>
                
                <div class="footer">
                  <p>© ${new Date().getFullYear()} SHAPEthiopia. All rights reserved.</p>
                  <p>If you didn't create this account, please ignore this email.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send confirmation email" },
        { status: 500 }
      )
    }

    console.log("[v0] Confirmation email sent:", data)

    return NextResponse.json({
      success: true,
      message: "Confirmation email sent successfully",
      data,
    })
  } catch (error) {
    console.error("[v0] Error sending confirmation email:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
