import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[v0] RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const supabase = await createClient()

    console.log('[v0] Requesting resend confirmation for:', email)

    // Get user by email to check if they exist
    const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers()
    
    if (getUserError) {
      console.error('[v0] Error fetching users:', getUserError)
      return NextResponse.json(
        { error: 'Failed to verify email' },
        { status: 500 }
      )
    }

    const user = users.find(u => u.email === email)

    if (!user) {
      // Don't reveal if email exists or not
      console.log('[v0] User not found for email:', email)
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, a confirmation link will be sent.',
      })
    }

    if (user.email_confirmed_at) {
      return NextResponse.json({
        success: false,
        message: 'This email is already verified. You can log in directly.',
      })
    }

    // Resend confirmation email
    const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'SHAPEthiopia <onboarding@resend.dev>',
      to: [email],
      subject: 'Confirm Your Email - SHAPEthiopia Account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Email</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 16px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              padding: 30px 20px;
              background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
              border-radius: 16px 16px 0 0;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content {
              padding: 30px;
            }
            .button-container {
              text-align: center;
              margin: 30px 0;
            }
            .button {
              display: inline-block;
              padding: 14px 32px;
              background-color: #d97706;
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
            }
            .info-box {
              background-color: #fef3c7;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #d97706;
              margin: 20px 0;
              font-size: 14px;
              color: #78350f;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #9ca3af;
              border-top: 1px solid #e5e7eb;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Confirm Your Email ✉️</h1>
            </div>
            <div class="content">
              <p>We received a request to resend the confirmation email for your SHAPEthiopia account.</p>
              
              <p><strong>Click the button below to confirm your email:</strong></p>
              
              <div class="button-container">
                <a href="${confirmationLink}" class="button">Confirm Email</a>
              </div>
              
              <div class="info-box">
                <strong>⏱️ Confirmation expires in 24 hours.</strong> After that, you'll need to request a new confirmation link.
              </div>
              
              <p>If you didn't request this email, please ignore it.</p>
              
              <p>Having trouble? Contact us at <a href="mailto:support@shapethiopia.org" style="color: #d97706;">support@shapethiopia.org</a></p>
              
              <p>Best regards,<br><strong>The SHAPEthiopia Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} SHAPEthiopia Foundation. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (emailError) {
      console.error('[v0] Email resend error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    console.log('[v0] Confirmation email resent successfully')

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent! Please check your inbox within the next few minutes.',
    })
  } catch (error: any) {
    console.error('[v0] Resend confirmation error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
