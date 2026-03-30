// import { NextResponse } from 'next/server'
// import nodemailer from 'nodemailer'

// export async function POST(request: Request) {
//   try {
//     const { email, name, amount, currency, cause, donationId, paymentMethod } = await request.json()

//     // Configure email transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST || 'smtp.gmail.com',
//       port: parseInt(process.env.SMTP_PORT || '587'),
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     })

//     const causeLabels: Record<string, string> = {
//       education: "Children's Education",
//       water: "Clean Water",
//       women: "Women Empowerment",
//       community: "Community Development",
//       general: "General Support",
//     }

//     const emailHtml = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Thank You for Your Donation</title>
//         <style>
//           body {
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//             line-height: 1.6;
//             color: #333;
//             margin: 0;
//             padding: 0;
//             background-color: #f4f4f4;
//           }
//           .container {
//             max-width: 600px;
//             margin: 0 auto;
//             padding: 20px;
//             background-color: #ffffff;
//             border-radius: 16px;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//           }
//           .header {
//             text-align: center;
//             padding: 30px 20px;
//             background: linear-gradient(135deg, #10b981 0%, #059669 100%);
//             border-radius: 16px 16px 0 0;
//             color: white;
//           }
//           .content {
//             padding: 30px;
//           }
//           .donation-details {
//             background-color: #f0fdf4;
//             padding: 20px;
//             border-radius: 12px;
//             margin: 20px 0;
//             border-left: 4px solid #10b981;
//           }
//           .detail-row {
//             display: flex;
//             justify-content: space-between;
//             padding: 10px 0;
//             border-bottom: 1px solid #e5e7eb;
//           }
//           .detail-label {
//             font-weight: 600;
//             color: #6b7280;
//           }
//           .detail-value {
//             font-weight: 500;
//             color: #111827;
//           }
//           .impact-message {
//             background-color: #fef3c7;
//             padding: 20px;
//             border-radius: 12px;
//             margin: 20px 0;
//             text-align: center;
//           }
//           .button {
//             display: inline-block;
//             padding: 12px 24px;
//             background-color: #10b981;
//             color: white;
//             text-decoration: none;
//             border-radius: 8px;
//             margin-top: 20px;
//             font-weight: 600;
//           }
//           .footer {
//             text-align: center;
//             padding: 20px;
//             font-size: 12px;
//             color: #9ca3af;
//             border-top: 1px solid #e5e7eb;
//             margin-top: 20px;
//           }
//           .heart {
//             color: #ef4444;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>Thank You for Your Donation! ❤️</h1>
//             <p>Your generosity changes lives</p>
//           </div>
//           <div class="content">
//             <p>Dear ${name},</p>
//             <p>Thank you so much for your generous donation! We truly appreciate your support in helping communities and changing lives across Ethiopia.</p>
            
//             <div class="donation-details">
//               <h3 style="margin-top: 0; color: #059669;">Donation Details:</h3>
//               <div class="detail-row">
//                 <span class="detail-label">Amount:</span>
//                 <span class="detail-value">${amount} ${currency}</span>
//               </div>
//               <div class="detail-row">
//                 <span class="detail-label">Cause:</span>
//                 <span class="detail-value">${causeLabels[cause] || cause || 'General Support'}</span>
//               </div>
//               <div class="detail-row">
//                 <span class="detail-label">Payment Method:</span>
//                 <span class="detail-value">${paymentMethod}</span>
//               </div>
//               <div class="detail-row">
//                 <span class="detail-label">Transaction ID:</span>
//                 <span class="detail-value">${donationId}</span>
//               </div>
//               <div class="detail-row">
//                 <span class="detail-label">Date:</span>
//                 <span class="detail-value">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
//               </div>
//             </div>
            
//             <div class="impact-message">
//               <p style="margin: 0; font-size: 14px;">
//                 <strong>Your Impact:</strong> Your donation will directly support ${causeLabels[cause]?.toLowerCase() || 'community development'} programs, 
//                 helping to create sustainable change in Ethiopian communities.
//               </p>
//             </div>
            
//             <p>We'll keep you updated on how your donation is making a difference through our newsletter and impact reports.</p>
            
//             <p>If you have any questions or need assistance, please don't hesitate to contact us at <a href="mailto:support@shapethiopia.org" style="color: #10b981;">support@shapethiopia.org</a>.</p>
            
//             <div style="text-align: center;">
//               <a href="https://shapethiopia.org" class="button">Visit Our Website</a>
//             </div>
            
//             <p>With gratitude,<br><strong>The SHAPEthiopia Team</strong></p>
//           </div>
//           <div class="footer">
//             <p>This is an automated confirmation email. Please do not reply to this email.</p>
//             <p>© ${new Date().getFullYear()} SHAPEthiopia Foundation. All rights reserved.</p>
//             <p style="margin-top: 10px;">
//               <a href="https://shapethiopia.org/privacy" style="color: #10b981;">Privacy Policy</a> | 
//               <a href="https://shapethiopia.org/contact" style="color: #10b981;">Contact Us</a>
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `

//     const mailOptions = {
//       from: process.env.SMTP_FROM || '"SHAPEthiopia" <donations@shapethiopia.org>',
//       to: email,
//       subject: 'Thank You for Your Donation! ❤️',
//       html: emailHtml,
//     }

//     await transporter.sendMail(mailOptions)
    
//     return NextResponse.json({ success: true, message: 'Email sent successfully' })
//   } catch (error) {
//     console.error('Email sending error:', error)
//     return NextResponse.json(
//       { error: 'Failed to send email', details: error.message },
//       { status: 500 }
//     )
//   }
// }



import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, name, amount, currency, program, donationId, paymentMethod, frequency } = await request.json()

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Program labels mapping
    const programLabels: Record<string, string> = {
      children: "Children's Education",
      'clean water': "Clean Water",
      women: "Women Empowerment",
      community: "Community Development",
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'SHAPEthiopia <onboarding@resend.dev>',
      to: [email],
      subject: `Thank You for Your ${frequency === 'monthly' ? 'Monthly ' : ''}Donation! ❤️`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Donation</title>
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
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              border-radius: 16px 16px 0 0;
              color: white;
            }
            .content {
              padding: 30px;
            }
            .donation-details {
              background-color: #f0fdf4;
              padding: 20px;
              border-radius: 12px;
              margin: 20px 0;
              border-left: 4px solid #10b981;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail-label {
              font-weight: 600;
              color: #6b7280;
            }
            .detail-value {
              font-weight: 500;
              color: #111827;
            }
            .impact-message {
              background-color: #fef3c7;
              padding: 20px;
              border-radius: 12px;
              margin: 20px 0;
              text-align: center;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #10b981;
              color: white;
              text-decoration: none;
              border-radius: 8px;
              margin-top: 20px;
              font-weight: 600;
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
              <h1>Thank You for Your Donation! ❤️</h1>
              <p>Your donation of ${amount} ${currency} has been received successfully</p>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you so much for your generous donation of <strong>${amount} ${currency}</strong>! We truly appreciate your support in helping communities and changing lives across Ethiopia.</p>
              
              <div class="donation-details">
                <h3 style="margin-top: 0; color: #059669;">Donation Details:</h3>
                <div class="detail-row">
                  <span class="detail-label">Amount:</span>
                  <span class="detail-value">${amount} ${currency}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Program:</span>
                  <span class="detail-value">${programLabels[program] || program || 'Community Development'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Payment Method:</span>
                  <span class="detail-value">${paymentMethod}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Frequency:</span>
                  <span class="detail-value">${frequency === 'monthly' ? 'Monthly Recurring' : 'One-time'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Transaction ID:</span>
                  <span class="detail-value">${donationId}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              
              <div class="impact-message">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Your Impact:</strong> Your ${frequency === 'monthly' ? 'monthly ' : ''}donation will directly support ${programLabels[program]?.toLowerCase() || 'community development'} programs, 
                  helping to create sustainable change in Ethiopian communities.
                </p>
              </div>
              
              <p>We'll keep you updated on how your donation is making a difference through our newsletter and impact reports.</p>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact us at <a href="mailto:support@shapethiopia.org" style="color: #10b981;">support@shapethiopia.org</a>.</p>
              
              <div style="text-align: center;">
                <a href="https://shapethiopia.org" class="button">Visit Our Website</a>
              </div>
              
              <p>With gratitude,<br><strong>The SHAPEthiopia Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply to this email.</p>
              <p>© ${new Date().getFullYear()} SHAPEthiopia Foundation. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully', data })
  } catch (error: any) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    )
  }
};
