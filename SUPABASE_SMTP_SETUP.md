# Supabase SMTP Configuration for Email Confirmation

## Quick Start (5 Minutes)

### Step 1: Access Supabase Dashboard
```
1. Go to https://app.supabase.com
2. Select your "SHAPEthiopia" project
3. Left sidebar → Authentication → Email Templates
```

### Step 2: Configure SMTP
```
1. Look for "Configure SMTP" button/option
2. Click it
3. Choose email provider:
   - Gmail (for testing)
   - SendGrid (for production)
```

### Step 3: Choose Your Provider

#### Option A: Gmail (Quickest for Testing)

1. You need a Google Account
2. Generate "App Password":
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the 16-character password
   
3. In Supabase SMTP config, enter:
   ```
   Provider: Gmail
   Email: your-email@gmail.com
   Password: [paste 16-char app password]
   Port: 587
   ```

4. Click "Send Test Email"
5. Check your email for test message

#### Option B: SendGrid (Recommended for Production)

1. Go to: https://app.sendgrid.com
2. Settings → API Keys
3. Create new API key (Full Access)
4. Copy the API key

5. In Supabase SMTP config, enter:
   ```
   Provider: SendGrid
   API Key: [your sendgrid api key]
   From Email: noreply@shapethiopia.com
   ```

6. Click "Send Test Email"
7. Check your email for test message

### Step 4: Enable Confirmation Email Template

1. Still in Email Templates section
2. Find "Confirm signup" email template
3. Make sure it's enabled
4. Can customize the template if desired
5. Save changes

### Step 5: Test It

1. Go to: http://localhost:3000/auth/sign-up
2. Create new test account with email
3. Enter email, password, first name, last name
4. Click "Create Account"
5. Check your email inbox
6. Look for "Confirm your email" from Supabase
7. Click confirmation link
8. Should be redirected back to app, now verified

---

## Verification Steps

### Check If Email Confirmations Are Working

After SMTP setup:

```
1. Create test account:
   Email: test-unique-123@gmail.com (use unique to test each time)
   Password: TestPass123!
   
2. Watch for "Check Your Email" message
3. Go to email inbox
4. Should see email from noreply@shapethiopia.com or your domain
5. Subject: "Confirm your email"
6. Click the confirmation link in email
7. Should be logged in and redirected to dashboard
```

### In Supabase Dashboard

Check email delivery:
```
1. Go to Supabase → Project → Logs → Auth
2. Look for email sending events
3. Should see "Confirmation email sent" entries
4. If errors appear, note the error message
```

---

## Troubleshooting

### Email Not Arriving

**Check 1: SMTP Configuration**
- Go to Supabase dashboard → Authentication → Email Templates
- Verify SMTP settings are saved
- Look for green checkmark or "Connected" status

**Check 2: Spam Folder**
- Check spam/promotions folder in email
- Add noreply@shapethiopia.com to contacts

**Check 3: Gmail Specific**
- App password must be 16 characters
- Make sure "App Passwords" feature is enabled
- Two-factor authentication must be on

**Check 4: SendGrid Specific**
- API key must have "Mail Send" permission
- Verify API key isn't expired
- Check SendGrid dashboard for bounces/blocks

### "SMTP Error" in Supabase

**If you see SMTP error when testing:**
1. Double-check credentials
2. Verify email address format
3. For Gmail: use App Password, not regular password
4. Try different provider (Gmail → SendGrid)

### Email Template Issues

**If email arrives but looks wrong:**
1. Go to Email Templates
2. Click "Confirm signup"
3. Customize template if needed
4. Make sure `{{ .ConfirmationURL }}` is in template (where link goes)
5. Save changes
6. Test again

---

## Configuration Files

### What You Don't Need to Change

The code already handles everything:

```typescript
// Profile update emails work automatically via:
// POST /api/profile → Resend API

// Confirmation emails work automatically via:
// Supabase Auth + SMTP settings in dashboard

// You don't need to modify:
// - .env.local SMTP variables
// - Email templates in code
// - Verification logic
```

### What You DO Need to Do

```
1. Configure SMTP in Supabase dashboard (this file's steps)
2. Test with email signup
3. Verify confirmation email arrives
4. Click confirmation link
5. Done!
```

---

## Email Flow Diagram

```
User Signup (Email Option)
    ↓
Form POST to Supabase Auth
    ↓
Supabase creates user account
    ↓
Supabase SMTP sends confirmation email
    ↓
User receives email in inbox
    ↓
User clicks confirmation link
    ↓
Link redirects to /auth/callback
    ↓
Callback verifies token
    ↓
User session created
    ↓
Redirect to /dashboard
    ↓
User logged in!
```

---

## Two Types of Emails Now Working

### 1. Email Confirmation (via Supabase SMTP)
- **When:** User signs up with email/password
- **Sent By:** Supabase
- **Template:** Customizable in dashboard
- **Status:** Needs SMTP config (this guide)
- **Needs:** SMTP credentials

### 2. Profile Update Confirmation (via Resend API)
- **When:** User updates profile in dashboard
- **Sent By:** Resend
- **Template:** HTML in code
- **Status:** Already working
- **Needs:** RESEND_API_KEY (already set)

---

## Command Line Verification (Optional)

If you want to test SMTP connectivity locally:

```bash
# Test Gmail SMTP
telnet smtp.gmail.com 587
# Should connect if firewall allows

# Test SendGrid SMTP
telnet smtp.sendgrid.net 587
# Should connect if firewall allows
```

---

## Timeout Issues

If emails take a long time to arrive:

**Gmail Timeout:**
- Gmail SMTP can be slow (5-30 seconds)
- This is normal
- Check spam folder
- Retry if not received

**SendGrid Timeout:**
- Generally faster than Gmail
- If timeout, check dashboard for status
- Verify domain isn't blacklisted

---

## Production Deployment

When deploying to production (Vercel):

1. **Set Environment Variables:**
   - Already done in `.env.local`
   - Vercel automatically reads these
   - No additional config needed

2. **Supabase SMTP:**
   - Settings saved in Supabase (cloud)
   - Not tied to `.env`
   - Will work on production

3. **Resend API Key:**
   - Already in `.env.local`
   - Vercel dashboard has it
   - Will work on production

4. **Test:**
   - Sign up on production URL
   - Verify email confirmation works
   - Update profile, check email

---

## Support

### If SMTP Configuration Fails

1. **Check Credentials:**
   - Email format correct?
   - Password/API key correct?
   - Copy-paste carefully

2. **Check Firewall:**
   - Corporate firewall might block SMTP
   - Try from different network
   - Use VPN if needed

3. **Check Provider:**
   - Is Gmail/SendGrid account active?
   - Has API/app password permission?
   - Check their status pages

4. **Check Supabase:**
   - Is project active?
   - Is auth enabled?
   - Check Supabase status page

### Debug Logs

Check these for clues:

```
Browser Console:
- F12 → Console tab
- Look for [v0] logs
- Check for auth errors

Supabase Logs:
- Dashboard → Logs section
- Look for email/auth events
- Check for error messages

Network Tab:
- F12 → Network
- Check /auth/signup request
- Look at response status/errors
```

---

## Reference

- **Supabase Docs:** https://supabase.com/docs/guides/auth/auth-smtp
- **Gmail App Passwords:** https://support.google.com/accounts/answer/185833
- **SendGrid Setup:** https://docs.sendgrid.com/for-developers/sending-email/getting-started-smtp

---

Last Updated: 2024
Estimated Setup Time: 5 minutes
