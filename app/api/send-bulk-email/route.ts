import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const VERIFIED_EMAIL_DOMAIN = process.env.VERIFIED_EMAIL_DOMAIN || 'noreply@shapethiopia.org'
const BATCH_SIZE = 10
const DELAY_BETWEEN_BATCHES_MS = 1000

interface BulkEmailRequest {
  subject: string
  htmlTemplate: string
  userIds?: string[] // If provided, only send to these user IDs
  filterOptedOut?: boolean // If true, exclude opted-out users
}

interface EmailResult {
  email: string
  success: boolean
  messageId?: string
  error?: string
}

// Helper function to sleep
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Generate email HTML with unsubscribe link
function generateEmailHTML(
  baseHTML: string,
  userName: string,
  userId: string
): string {
  const unsubscribeId = `${userId}-${Date.now()}`
  const unsubscribeLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/unsubscribe?id=${unsubscribeId}`

  return baseHTML
    .replace('{{userName}}', userName)
    .replace('{{unsubscribeLink}}', unsubscribeLink)
}

export async function POST(request: Request) {
  try {
    if (!RESEND_API_KEY) {
      console.error('[v0] RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const body: BulkEmailRequest = await request.json()

    if (!body.subject || !body.htmlTemplate) {
      return NextResponse.json(
        { error: 'Missing required fields: subject, htmlTemplate' },
        { status: 400 }
      )
    }

    console.log('[v0] Bulk email request received')
    console.log('[v0] Subject:', body.subject)

    // Get Supabase server client
    const supabase = createClient()

    // Fetch users to email
    let query = supabase
      .from('profiles')
      .select('id, email, first_name')
      .not('email', 'is', null)

    // Filter by specific user IDs if provided
    if (body.userIds && body.userIds.length > 0) {
      query = query.in('id', body.userIds)
      console.log('[v0] Filtering to specific user IDs:', body.userIds.length)
    }

    // Exclude opted-out users
    if (body.filterOptedOut) {
      query = query.eq('email_opt_out', false)
      console.log('[v0] Excluding opted-out users')
    }

    const { data: users, error: dbError } = await query

    if (dbError) {
      console.error('[v0] Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to fetch user list' },
        { status: 500 }
      )
    }

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: 'No users found to email' },
        { status: 404 }
      )
    }

    console.log(`[v0] Found ${users.length} users to email`)

    // Initialize Resend
    const resend = new Resend(RESEND_API_KEY)

    // Send emails in batches
    const results: EmailResult[] = []
    const batches = []

    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      batches.push(users.slice(i, i + BATCH_SIZE))
    }

    console.log(`[v0] Split into ${batches.length} batch(es)`)

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex]
      console.log(`[v0] Sending batch ${batchIndex + 1}/${batches.length}...`)

      const sendPromises = batch.map(async user => {
        try {
          const emailHTML = generateEmailHTML(
            body.htmlTemplate,
            user.first_name || 'Valued Member',
            user.id
          )

          const { data, error } = await resend.emails.send({
            from: VERIFIED_EMAIL_DOMAIN,
            to: user.email,
            subject: body.subject,
            html: emailHTML,
          })

          if (error) {
            console.error(`[v0] Failed to send to ${user.email}:`, error.message)
            return {
              email: user.email,
              success: false,
              error: error.message,
            }
          }

          console.log(`[v0] ✓ Sent to ${user.email} - ID: ${data?.id}`)
          return {
            email: user.email,
            success: true,
            messageId: data?.id,
          }
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Unknown error'
          console.error(`[v0] Exception sending to ${user.email}:`, errorMsg)
          return {
            email: user.email,
            success: false,
            error: errorMsg,
          }
        }
      })

      const batchResults = await Promise.all(sendPromises)
      results.push(...batchResults)

      // Delay between batches
      if (batchIndex < batches.length - 1) {
        console.log(`[v0] Waiting ${DELAY_BETWEEN_BATCHES_MS}ms before next batch...`)
        await sleep(DELAY_BETWEEN_BATCHES_MS)
      }
    }

    // Compile summary
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length
    const failedEmails = results.filter(r => !r.success)

    console.log(`[v0] Bulk email complete: ${successful} sent, ${failed} failed`)

    return NextResponse.json({
      success: true,
      summary: {
        total: results.length,
        successful,
        failed,
      },
      results,
      failedEmails: failedEmails.length > 0 ? failedEmails : undefined,
    })
  } catch (error) {
    console.error('[v0] Bulk email error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
