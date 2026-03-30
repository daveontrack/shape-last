# Email Configuration Guide

## Overview
This guide explains how to configure email sending for:
1. **Supabase Email Confirmation** - For sign-up verification emails
2. **Donation Thank You Emails** - Automatic emails after donations using Resend

---

## Part 1: Supabase Email Confirmation Setup

### Option A: Using Gmail SMTP (Recommended for Testing)

1. **Enable 2-Factor Authentication on Gmail**
   - Go to myaccount.google.com → Security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to myaccount.google.com → App passwords
   - Select Mail and Windows Computer (or your device)
   - Copy the generated 16-character password

3. **Update Supabase Settings**
   - Go to Supabase Dashboard → Authentication → Email Templates
   - Click "Configure SMTP"
   - Fill in:
     - **SMTP Host:** `smtp.gmail.com`
     - **SMTP Port:** `587`
     - **SMTP User:** `your-email@gmail.com`
     - **SMTP Password:** Your 16-character app password (from step 2)
     - **SMTP Sender Email:** `your-email@gmail.com`
     - **SMTP Sender Name:** `SHAPEthiopia`

4. **Configure Email Templates**
   - Go to Authentication → Email Templates
   - Enable "Confirm signup" template
   - Customize the email content

### Option B: Using SendGrid (Recommended for Production)

1. **Create SendGrid Account**
   - Sign up at sendgrid.com
   - Verify your sender email

2. **Get SendGrid API Key**
   - Go to Settings → API Keys
   - Create new API key with Mail Send permission

3. **Update Supabase Settings**
   - Go to Supabase Dashboard → Authentication → Email Templates
   - Click "Configure SMTP"
   - Fill in:
     - **SMTP Host:** `smtp.sendgrid.net`
     - **SMTP Port:** `587`
     - **SMTP User:** `apikey`
     - **SMTP Password:** Your SendGrid API key
     - **SMTP Sender Email:** Your verified sender email

---

## Part 2: Donation Thank You Email Setup

The app uses **Resend** API for sending donation confirmation emails.

### Setup Instructions

1. **Get Resend API Key**
   - Sign up at resend.com (free tier available)
   - Go to API Keys section
   - Create new API key

2. **Add to Environment Variables**
   - Add to `.env.local`:
     ```
     RESEND_API_KEY=re_YOUR_API_KEY_HERE
     ```

3. **Verify Sender Email in Resend**
   - In Resend dashboard, add and verify sender email
   - Default: `onboarding@resend.dev` (works during testing)

### Current Donation Email Flow

1. User completes donation
2. Donation saved to Supabase database
3. **Automatic email sent** with:
   - Donation amount
   - Program/cause
   - Payment method
   - Thank you message

---

## Testing Email Sending

### Test Supabase Confirmation Email

1. Go to `/auth/signup`
2. Create new account
3. Check inbox for confirmation email
4. If not received:
   - Check spam folder
   - Check Supabase logs in dashboard
   - Verify SMTP settings in Supabase

### Test Donation Thank You Email

1. Go to `/donate`
2. Complete a donation (use test card: 4242 4242 4242 4242 for Stripe)
3. Enter your email
4. Check inbox for thank you email
5. If not received:
   - Check spam folder
   - Check browser console for errors
   - Verify RESEND_API_KEY is set

---

## Environment Variables Reference

```env
# Supabase (used by Supabase Console)
# Configure SMTP in Supabase Dashboard → Authentication → Email Templates

# Donation Emails (Resend API)
RESEND_API_KEY=re_YOUR_KEY_HERE

# Optional: App URL (used for email links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Troubleshooting

### Supabase Confirmation Emails Not Sending

**Issue:** Users sign up but don't receive confirmation email

**Solutions:**
1. Check SMTP settings in Supabase Dashboard → Authentication
2. Verify SMTP credentials are correct
3. Check Gmail/SendGrid settings:
   - Gmail: Ensure app password is used, not regular password
   - SendGrid: Verify sender email is added and verified
4. Look at Supabase logs for errors
5. Check email's spam folder

### Donation Thank You Emails Not Sending

**Issue:** Donors complete donation but don't receive thank you email

**Solutions:**
1. Verify `RESEND_API_KEY` is set in `.env.local`
2. Check that donor provided email address
3. Look at browser console (F12) for error messages
4. Check Resend dashboard for bounced emails
5. Verify sender email is verified in Resend dashboard

### Email Formatting Issues

**Issue:** Email received but formatting looks broken

**Solutions:**
1. Resend automatically handles HTML formatting
2. Make sure to use the provided email template
3. Test with different email clients
4. Check spam filters aren't stripping styling

---

## Email Templates Customization

### Donation Email Template
- File: `/app/api/send-donation-email/route.ts`
- Customize the HTML template as needed
- Update `programLabels` mapping for program names
- Modify colors and styling using inline CSS

---

## Production Checklist

- [ ] Set up SendGrid or other production SMTP provider
- [ ] Configure SMTP in Supabase Dashboard
- [ ] Set RESEND_API_KEY in production environment
- [ ] Verify sender emails in both services
- [ ] Test end-to-end: Sign up → Email received
- [ ] Test donation flow → Thank you email received
- [ ] Set up email monitoring/logging
- [ ] Add unsubscribe links if needed for compliance

---

## Support

For issues:
1. Check Supabase Dashboard logs
2. Check Resend dashboard logs
3. Verify all environment variables are set
4. Test with simple email first (no HTML)
