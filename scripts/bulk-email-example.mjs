#!/usr/bin/env node

/**
 * Bulk Email Sender using Resend API
 * Sends emails ONLY to verified user emails from your database
 * Includes rate limiting, batching, error handling, and logging
 */

import { Resend } from 'resend'

// ============================================================================
// CONFIGURATION
// ============================================================================

const RESEND_API_KEY = process.env.RESEND_API_KEY
const VERIFIED_EMAIL_DOMAIN = process.env.VERIFIED_EMAIL_DOMAIN || 'noreply@shapethiopia.org'
const BATCH_SIZE = 10 // Send 10 emails at a time
const DELAY_BETWEEN_BATCHES_MS = 1000 // 1 second between batches

// ============================================================================
// WHY THESE RESTRICTIONS EXIST
// ============================================================================

/*
  WHY RESEND REQUIRES DOMAIN VERIFICATION:
  
  1. SPAM PREVENTION
     - Unverified domains could be used to send spam from anyone's domain
     - Domain verification proves YOU own the domain
     - Resend (and ISPs) check DNS records to confirm ownership
  
  2. EMAIL DELIVERABILITY
     - ISPs (Gmail, Outlook, etc.) verify the domain using SPF, DKIM, DMARC
     - These are DNS records that prove the email came from a trusted sender
     - Without verification, emails go to spam folders
  
  3. PREVENT PHISHING
     - Attackers could spoof legitimate domains (e.g., sending as "noreply@google.com")
     - Verification prevents this abuse
  
  WHY SENDING TO RANDOM EMAILS ISN'T ALLOWED:
  
  1. SPAM PROTECTION
     - Sending to random/unverified addresses = spam by definition
     - ISPs will mark Resend's IP as spam
     - Your domain reputation suffers
  
  2. BOUNCE HANDLING
     - Random emails generate bounces
     - Too many bounces = Resend account suspension
  
  3. USER PRIVACY
     - Users haven't opted in to receive emails from you
     - Violates anti-spam laws (CAN-SPAM, GDPR)
  
  SOLUTION: Only send to users who:
  - Have email addresses in YOUR database
  - Have explicitly opted in to communications
  - Have not unsubscribed
*/

// ============================================================================
// EMAIL SENDING FUNCTION
// ============================================================================

async function sendBulkEmails() {
  // Initialize Resend client
  if (!RESEND_API_KEY) {
    console.error('[ERROR] RESEND_API_KEY environment variable not set')
    process.exit(1)
  }

  const resend = new Resend(RESEND_API_KEY)

  // STEP 1: Get email list from your database
  // In production, this would be: const users = await db.users.findAll({ where: { opted_in: true } })
  const users = [
    { id: '1', email: 'dawitberiso406@gmail.com', name: 'Dawit Beriso' },
    // Add more users from your database
    // { id: '2', email: 'user2@example.com', name: 'User Two' },
    // { id: '3', email: 'user3@example.com', name: 'User Three' },
  ]

  console.log(`[INFO] Starting bulk email send to ${users.length} users`)
  console.log(`[INFO] Using domain: ${VERIFIED_EMAIL_DOMAIN}`)
  console.log(`[INFO] Batch size: ${BATCH_SIZE}, Delay: ${DELAY_BETWEEN_BATCHES_MS}ms\n`)

  // STEP 2: Split into batches
  const batches = []
  for (let i = 0; i < users.length; i += BATCH_SIZE) {
    batches.push(users.slice(i, i + BATCH_SIZE))
  }

  console.log(`[INFO] Split into ${batches.length} batch(es)\n`)

  // STEP 3: Send emails in batches
  let totalSuccess = 0
  let totalFailed = 0
  const failedEmails = []

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex]
    console.log(`[BATCH ${batchIndex + 1}/${batches.length}] Sending ${batch.length} emails...`)

    // Send all emails in this batch in parallel
    const sendPromises = batch.map(user =>
      sendSingleEmail(resend, user)
        .then(result => {
          if (result.success) {
            console.log(`  ✓ ${user.email} - ID: ${result.messageId}`)
            totalSuccess++
          } else {
            console.log(`  ✗ ${user.email} - Error: ${result.error}`)
            totalFailed++
            failedEmails.push({ email: user.email, error: result.error })
          }
        })
    )

    // Wait for all emails in batch to send
    await Promise.all(sendPromises)

    // Add delay between batches (except after the last batch)
    if (batchIndex < batches.length - 1) {
      console.log(`[WAIT] Waiting ${DELAY_BETWEEN_BATCHES_MS}ms before next batch...\n`)
      await sleep(DELAY_BETWEEN_BATCHES_MS)
    }
  }

  // STEP 4: Summary report
  console.log('\n' + '='.repeat(60))
  console.log('EMAIL SEND SUMMARY')
  console.log('='.repeat(60))
  console.log(`✓ Successful: ${totalSuccess}`)
  console.log(`✗ Failed: ${totalFailed}`)
  console.log(`Total: ${totalSuccess + totalFailed}`)

  if (failedEmails.length > 0) {
    console.log('\nFailed emails:')
    failedEmails.forEach(({ email, error }) => {
      console.log(`  - ${email}: ${error}`)
    })
  }

  console.log('='.repeat(60))

  return {
    totalSent: totalSuccess,
    totalFailed: totalFailed,
    failedEmails,
  }
}

// ============================================================================
// HELPER: Send single email with error handling
// ============================================================================

async function sendSingleEmail(resend, user) {
  try {
    const unsubscribeId = `${user.id}-${Date.now()}`

    const { data, error } = await resend.emails.send({
      from: VERIFIED_EMAIL_DOMAIN,
      to: user.email,
      subject: 'Update from SHAPEthiopia',
      html: generateEmailHTML(user.name, unsubscribeId),
    })

    if (error) {
      console.error(`[ERROR] Failed to send to ${user.email}:`, error.message)
      return {
        success: false,
        email: user.email,
        error: error.message,
      }
    }

    return {
      success: true,
      email: user.email,
      messageId: data?.id,
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[ERROR] Exception sending to ${user.email}:`, errorMessage)
    return {
      success: false,
      email: user.email,
      error: errorMessage,
    }
  }
}

// ============================================================================
// HELPER: Generate email HTML with unsubscribe link
// ============================================================================

function generateEmailHTML(userName, unsubscribeId) {
  const unsubscribeLink = `https://shapethiopia.org/unsubscribe?id=${unsubscribeId}`

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a365d; color: white; padding: 20px; border-radius: 4px 4px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 4px 4px; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          .unsubscribe { text-align: center; margin-top: 20px; }
          a { color: #007bff; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SHAPEthiopia Update</h1>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>
            <p>Thank you for being part of the SHAPEthiopia community. We're excited to share updates on our work.</p>
            <p>This is a bulk email sent to ${new Date().toLocaleDateString()}.</p>
            <p>With gratitude,<br>The SHAPEthiopia Team</p>
          </div>
          <div class="footer">
            <div class="unsubscribe">
              <p>
                <a href="${unsubscribeLink}">Unsubscribe from this mailing list</a>
              </p>
            </div>
            <p>© 2024 SHAPEthiopia. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// ============================================================================
// HELPER: Sleep function for delays
// ============================================================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

console.log('[v0] Resend Bulk Email Sender')
console.log('=============================\n')

sendBulkEmails()
  .then(result => {
    console.log('\n[SUCCESS] Bulk email send completed')
    process.exit(result.totalFailed > 0 ? 1 : 0)
  })
  .catch(err => {
    console.error('[FATAL]', err)
    process.exit(1)
  })
