import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface UpdateProfileRequest {
  first_name: string
  last_name: string
  phone: string
  address: string
  city: string
  country: string
}

interface ProfileResponse {
  success: boolean
  data?: any
  error?: string
  message?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<ProfileResponse>> {
  try {
    const supabase = await createClient()
    const body: UpdateProfileRequest = await request.json()

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('[v0] Auth error:', authError)
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate required fields
    if (!body.first_name?.trim() || !body.last_name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'First name and last name are required' },
        { status: 400 }
      )
    }

    // Update profile in Supabase
    const { data, error } = await supabase
      .from('profiles')
      .update({
        first_name: body.first_name.trim(),
        last_name: body.last_name.trim(),
        phone: body.phone?.trim() || null,
        address: body.address?.trim() || null,
        city: body.city?.trim() || null,
        country: body.country?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('[v0] Profile update error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update profile' },
        { status: 400 }
      )
    }

    // Send profile update email via Resend
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'noreply@shapethiopia.com',
          to: user.email,
          subject: 'Profile Updated Successfully',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background-color: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                  .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
                  .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
                  .detail { margin: 10px 0; }
                  .label { font-weight: bold; color: #374151; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Profile Updated</h1>
                  </div>
                  <div class="content">
                    <p>Hello ${body.first_name},</p>
                    <p>Your profile has been successfully updated on SHAPEthiopia.</p>
                    
                    <h3>Updated Information:</h3>
                    <div class="detail">
                      <span class="label">Name:</span> ${body.first_name} ${body.last_name}
                    </div>
                    ${body.phone ? `<div class="detail"><span class="label">Phone:</span> ${body.phone}</div>` : ''}
                    ${body.address ? `<div class="detail"><span class="label">Address:</span> ${body.address}</div>` : ''}
                    ${body.city ? `<div class="detail"><span class="label">City:</span> ${body.city}</div>` : ''}
                    ${body.country ? `<div class="detail"><span class="label">Country:</span> ${body.country}</div>` : ''}
                    
                    <p>If you did not make this change, please contact us immediately.</p>
                    
                    <div class="footer">
                      <p>Best regards,<br>The SHAPEthiopia Team</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
        }),
      })

      if (response.ok) {
        console.log('[v0] Profile update email sent to:', user.email)
      } else {
        console.error('[v0] Failed to send email:', await response.text())
      }
    } catch (emailError) {
      console.error('[v0] Error sending profile update email:', emailError)
      // Don't fail the response if email fails to send
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Profile updated successfully',
    })
  } catch (error) {
    console.error('[v0] Unexpected error in profile API:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest): Promise<NextResponse<ProfileResponse>> {
  try {
    const supabase = await createClient()

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch user profile
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('[v0] Profile fetch error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch profile' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...data,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('[v0] Unexpected error in profile API:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
