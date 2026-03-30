## Email Setup Quick Checklist

### ⚡ Quick Start (Complete in 5 minutes)

**Supabase Email Confirmation**
- [ ] Go to https://app.supabase.com → Your Project
- [ ] Navigate to: Authentication → Email Templates
- [ ] Click "Configure SMTP"
- [ ] Enter SMTP credentials (Gmail or SendGrid)
- [ ] Click "Save"
- [ ] Enable "Confirm signup" template

**Donation Email (Already Configured!)**
- [ ] Check `.env.local` has `RESEND_API_KEY=re_...`
- [ ] If missing, add it from https://app.resend.com/api-keys
- [ ] No other changes needed - auto-sending is active!

### ✅ Testing

**Test Supabase Email:**
- [ ] Go to http://localhost:3000/auth/signup
- [ ] Create account with your email
- [ ] Check inbox for confirmation email (check spam too)

**Test Donation Email:**
- [ ] Go to http://localhost:3000/donate  
- [ ] Fill form with your email
- [ ] Use test card: 4242 4242 4242 4242 (Stripe)
- [ ] Check inbox for thank you email
- [ ] Verify it includes: Amount, Program, Payment method

### 📋 Environment Variables

**Required in `.env.local`:**
```
RESEND_API_KEY=re_YOUR_KEY_HERE
```

**Optional (for SMTP):**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-password
```

### 🆘 If Emails Not Arriving

**For Confirmation Emails:**
1. Check Supabase logs: Dashboard → Logs
2. Verify SMTP settings in Supabase
3. Check spam folder
4. Try from different email account

**For Donation Emails:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check https://app.resend.com for failed emails
4. Verify RESEND_API_KEY is set

### 📚 Documentation

- `DONATION_EMAIL_FIX.md` - Full implementation details
- `EMAIL_SETUP_GUIDE.md` - Detailed setup guide  
- `.env.local.email.example` - Environment variable reference
- `scripts/check-email-setup.mjs` - Verification script

### 🚀 Run Verification

```bash
npm run setup:email
```

---

**Status:** ✅ Donation emails are auto-sending with message:
> "Thank You for Your Donation! ❤️
> Your donation of $X has been received successfully. 
> We truly appreciate your support..."

**Next:** Configure Supabase SMTP for confirmation emails!
