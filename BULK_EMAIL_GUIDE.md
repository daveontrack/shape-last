# Bulk Email Sender - Complete Guide

## Overview

This guide demonstrates how to send emails to multiple users from your database using Resend API with proper rate limiting, error handling, and logging.

---

## Why These Restrictions Exist

### Domain Verification Required

**The Problem:**
```
Error: The shapethiopia.org domain is not verified. 
Please add and verify your domain on https://resend.com/domains
```

**Why it's required:**

1. **Spam Prevention**
   - Prevents anyone from sending emails claiming to be from your domain
   - Domain verification proves YOU own the domain
   - ISPs require this to prevent domain spoofing

2. **Email Deliverability**
   - ISPs (Gmail, Outlook, Yahoo) verify domains using:
     - **SPF** (Sender Policy Framework) - IP whitelist
     - **DKIM** (DomainKeys Identified Mail) - Cryptographic signature
     - **DMARC** (Domain-based Message Authentication) - Policy enforcement
   - Without these DNS records, emails go to spam folders
   - Resend provides the DNS records when you add your domain

3. **Prevent Phishing**
   - Attackers could spoof legitimate domains (e.g., fake Amazon emails)
   - Verification prevents this abuse

### Why Sending to Random Emails Isn't Allowed

**The Problem:**
```
Error: Can only send to verified emails in test mode
```

**Why it's restricted:**

1. **Spam Definition**
   - Sending unsolicited emails to random addresses = spam by definition
   - ISPs will mark Resend's IP addresses as spam
   - Affects entire Resend service

2. **Bounce Management**
   - Invalid/random emails generate hard bounces
   - Too many bounces = email service suspension
   - Costs Resend money and credibility

3. **Legal Compliance**
   - **CAN-SPAM Act** (USA) - Requires opt-in or prior business relationship
   - **GDPR** (EU) - Requires explicit consent to email
   - **CASL** (Canada) - Requires express or implied consent
   - Sending to random emails violates these laws

4. **User Privacy**
   - Users haven't consented to receive your emails
   - No unsubscribe mechanism (they can't remove themselves)
   - Legally and ethically wrong

**Solution:** Only send to users who:
- Have email addresses stored in YOUR database
- Have explicitly opted in to communications
- Have not unsubscribed
- Have a legitimate relationship with your organization

---

## Implementation

### File 1: Standalone Script (`scripts/bulk-email-example.mjs`)

**Best for:** Background jobs, batch processing, server-side tasks

```bash
# Set environment variables
export RESEND_API_KEY="re_xxxxxxxxxxxx"
export VERIFIED_EMAIL_DOMAIN="noreply@shapethiopia.org"

# Run the script
node scripts/bulk-email-example.mjs
```

**Features:**
- ✓ Reads from hardcoded user list (replace with DB query in production)
- ✓ Sends 10 emails at a time (configurable batch size)
- ✓ 1 second delay between batches (prevents rate limiting)
- ✓ Comprehensive error handling
- ✓ Success/failure logging
- ✓ Unsubscribe links in email
- ✓ Summary report at the end

### File 2: API Endpoint (`app/api/send-bulk-email/route.ts`)

**Best for:** Web requests, admin panels, real-time triggering

```bash
curl -X POST http://localhost:3000/api/send-bulk-email \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Important Update",
    "htmlTemplate": "Hi {{userName}}, <a href=\"{{unsubscribeLink}}\">Unsubscribe</a>",
    "filterOptedOut": true
  }'
```

**Response:**
```json
{
  "success": true,
  "summary": {
    "total": 25,
    "successful": 23,
    "failed": 2
  },
  "results": [
    { "email": "user@example.com", "success": true, "messageId": "xxxx" },
    { "email": "invalid@example.com", "success": false, "error": "Invalid email" }
  ]
}
```

**Features:**
- ✓ Queries Supabase for user list
- ✓ Optional user ID filtering
- ✓ Optional opted-out filtering
- ✓ Dynamic email template
- ✓ Error handling with user feedback

---

## Setup Steps

### 1. Verify Your Domain in Resend (5-10 minutes)

1. Go to https://resend.com/domains
2. Click **"Add Domain"**
3. Enter: `shapethiopia.org`
4. Resend shows DNS records to add
5. Add records to your domain provider's DNS settings
6. Wait for verification (check Resend dashboard)

### 2. Set Environment Variables

**.env.local** (development):
```
RESEND_API_KEY=re_xxxxxxxxxxxx
VERIFIED_EMAIL_DOMAIN=noreply@shapethiopia.org
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Vercel** (production):
- Go to Settings → Environment Variables
- Add the same variables
- Redeploy

### 3. Update Your Database

Ensure your `profiles` table has:
```sql
- id (primary key)
- email (varchar)
- first_name (varchar)
- email_opt_out (boolean, default false)
```

### 4. Use the Endpoint or Script

**From API:**
```typescript
const response = await fetch('/api/send-bulk-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    subject: 'Welcome to SHAPEthiopia',
    htmlTemplate: `
      Hi {{userName}},
      Thank you for joining us!
      <a href="{{unsubscribeLink}}">Unsubscribe</a>
    `,
    filterOptedOut: true,
  }),
})
```

**From Script:**
```bash
node scripts/bulk-email-example.mjs
```

---

## Rate Limiting Strategy

### Resend Rate Limits

- **Free tier:** 100 emails/day
- **Paid tier:** 100,000 emails/month (~3,300/day)
- **Burst limit:** ~10 emails/second

### Safe Batching

```javascript
// Current implementation
const BATCH_SIZE = 10        // 10 emails per batch
const DELAY = 1000           // 1 second between batches
// = ~10 emails/second (within limits)

// For higher volume:
const BATCH_SIZE = 50        // 50 emails per batch
const DELAY = 5000           // 5 seconds between batches
// = ~10 emails/second (stays safe)

// For lower volume:
const BATCH_SIZE = 5         // 5 emails per batch
const DELAY = 500            // 500ms between batches
// = ~10 emails/second (safe, faster)
```

### Monitoring

Monitor these metrics:
- **Success rate:** Should be >95%
- **Failed emails:** Check error reasons
- **Bounce rate:** Should be <2% (sign of bad data)
- **Unsubscribe rate:** Track opt-outs over time

---

## Common Issues & Solutions

### Issue: Emails in spam folder

**Cause:** Domain not verified or email flagged as spam

**Solution:**
- Verify domain in Resend
- Check email content (avoid spam trigger words)
- Monitor Resend dashboard for reputation

### Issue: 403 Domain not verified error

**Cause:** Domain verification incomplete or DNS records not added

**Solution:**
- Go to https://resend.com/domains
- Verify domain is checked in Resend
- Confirm DNS records are added to your provider
- Wait 10-15 minutes for propagation

### Issue: High bounce rate

**Cause:** Sending to invalid or non-existent emails

**Solution:**
- Validate emails before storing in database
- Implement email verification on signup
- Mark bounced emails in database
- Don't re-send to bounced addresses

### Issue: Some emails not sending

**Cause:** Throttling by ISP or email validation

**Solution:**
- Increase delay between batches
- Reduce batch size
- Implement exponential backoff for retries
- Check Resend logs for detailed errors

---

## Best Practices

### ✓ DO:
- Send only to opted-in users
- Include unsubscribe links (legally required)
- Monitor delivery rates
- Test with small batch first
- Use authenticated domain
- Personalize emails ({{userName}})
- Handle failures gracefully

### ✗ DON'T:
- Send to lists purchased from third parties
- Buy or scrape email addresses
- Send without unsubscribe option
- Use misleading subject lines
- Exceed Resend rate limits
- Ignore bounce notifications
- Change sender address between sends

---

## Unsubscribe Implementation

Add to your database schema:

```sql
ALTER TABLE profiles ADD COLUMN email_opt_out BOOLEAN DEFAULT FALSE;
```

Handle unsubscribe requests:

```typescript
// app/api/unsubscribe/route.ts
export async function POST(request: Request) {
  const { userId } = await request.json()
  
  await supabase
    .from('profiles')
    .update({ email_opt_out: true })
    .eq('id', userId)
  
  return new Response('Unsubscribed successfully', { status: 200 })
}
```

---

## Next Steps

1. Verify your domain at https://resend.com/domains
2. Add `VERIFIED_EMAIL_DOMAIN` to environment variables
3. Test with `scripts/bulk-email-example.mjs`
4. Use `/api/send-bulk-email` endpoint in your app
5. Monitor delivery rates and adjust batching as needed

Good luck with your bulk email campaigns!
