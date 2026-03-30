import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    // Validate inputs
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('[v0] RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      )
    }

    const supabase = await createClient()

    console.log('[v0] Starting signup process for:', email)

    // Sign up with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
      },
    })

    if (authError) {
      console.error('[v0] Supabase signup error:', authError)
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    console.log('[v0] User created in Supabase:', authData.user?.id)

    // Generate confirmation link manually for Resend
    const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback?code=${authData.session?.access_token || 'verify'}`

    // Send confirmation email via Resend
    console.log('[v0] Sending confirmation email to:', email)
    
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
              transition: background-color 0.3s;
            }
            .button:hover {
              background-color: #b45309;
            }
            .code-box {
              background-color: #fef3c7;
              padding: 20px;
              border-radius: 12px;
              margin: 20px 0;
              text-align: center;
              border: 2px solid #d97706;
            }
            .code-box p {
              margin: 0;
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
            .footer a {
              color: #d97706;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to SHAPEthiopia! 🎉</h1>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>Thank you for creating an account with SHAPEthiopia! We're excited to have you join our community of changemakers.</p>
              
              <p><strong>To complete your registration, please confirm your email address by clicking the button below:</strong></p>
              
              <div class="button-container">
                <a href="${confirmationLink}" class="button">Confirm Your Email</a>
              </div>
              
              <p style="text-align: center; color: #6b7280; font-size: 14px;">Or copy and paste this link in your browser:</p>
              <div class="code-box">
                <p style="word-break: break-all; font-size: 12px;">${confirmationLink}</p>
              </div>
              
              <p>Once confirmed, you'll be able to:</p>
              <ul style="line-height: 2;">
                <li>Make donations to support our programs</li>
                <li>Track your impact and contributions</li>
                <li>Receive updates on projects you support</li>
                <li>Join our community events</li>
              </ul>
              
              <p>If you didn't create this account, please ignore this email.</p>
              
              <p>Questions? Contact us at <a href="mailto:support@shapethiopia.org" style="color: #d97706;">support@shapethiopia.org</a></p>
              
              <p>Best regards,<br><strong>The SHAPEthiopia Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
              <p>© ${new Date().getFullYear()} SHAPEthiopia Foundation. All rights reserved.</p>
              <p>
                <a href="https://shapethiopia.org/privacy">Privacy Policy</a> | 
                <a href="https://shapethiopia.org/terms">Terms of Service</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (emailError) {
      console.error('[v0] Email sending error:', emailError)
      // Don't fail the signup if email fails - user can request resend
      return NextResponse.json({
        success: true,
        message: 'Account created but email delivery delayed. Please check spam folder or request a new confirmation link.',
        user: authData.user,
        email_delayed: true,
      })
    }

    console.log('[v0] Confirmation email sent successfully:', emailData)

    return NextResponse.json({
      success: true,
      message: 'Account created successfully! Please check your email to confirm.',
      user: authData.user,
      email_sent: true,
    })
  } catch (error: any) {
    console.error('[v0] Signup error:', error)
    return NextResponse.json(
      { error: 'An error occurred during signup. Please try again.' },
      { status: 500 }
    )
  }
}
