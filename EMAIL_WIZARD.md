# Email Setup Wizard 🧙‍♂️

## Complete Setup in 3 Steps

---

## STEP 1: Configure Supabase Email Confirmation (5 min)

### For Gmail Users:

1. **Get App Password**
   - Go: https://myaccount.google.com/apppasswords
   - Select: Mail + Windows Computer (or your device)
   - Copy: 16-character password (e.g., `ehwq kcrz svaf utlk`)

2. **Configure in Supabase**
   ```
   https://app.supabase.com
   ↓
   Your Project
   ↓
   Authentication (left menu)
   ↓
   Email Templates
   ↓
   Click "Configure SMTP" (top button)
   ```

3. **Fill SMTP Form**
   ```
   SMTP Host:       smtp.gmail.com
   SMTP Port:       587
   SMTP User:       your-email@gmail.com
   SMTP Password:   ehwq kcrz svaf utlk (your 16-char app password)
   From Address:    your-email@gmail.com
   From Name:       SHAPEthiopia
   ```

4. **Enable Email Template**
   ```
   Back in Email Templates section
   ↓
   Find "Confirm signup" template
   ↓
   Click toggle to enable
   ↓
   Done!
   ```

### For SendGrid Users:

1. **Get API Key**
   - Go: https://sendgrid.com
   - Settings → API Keys → Create New
   - Copy API key

2. **Configure in Supabase**
   ```
   https://app.supabase.com
   ↓
   Your Project → Authentication → Email Templates
   ↓
   Click "Configure SMTP"
   ```

3. **Fill SMTP Form**
   ```
   SMTP Host:       smtp.sendgrid.net
   SMTP Port:       587
   SMTP User:       apikey
   SMTP Password:   SG.your_sendgrid_api_key_here
   From Address:    verified-sender@yourdomain.com
   From Name:       SHAPEthiopia
   ```

4. **Enable Email Template**
   ```
   Back in Email Templates
   ↓
   Find "Confirm signup"
   ↓
   Toggle to enable
   ↓
   Done!
   ```

✅ **Supabase Email Confirmation:** READY!

---

## STEP 2: Verify Resend for Donation Emails ✅ ALREADY WORKING!

### Check Your .env.local File

```bash
# Open .env.local and verify this line exists:
RESEND_API_KEY=re_G6jNNB5r_CxodxpGUXTa5yvGnrr7TjwhR
```

**Status:** ✅ Present - Donation emails will auto-send!

### If Missing, Add It:

1. Get API Key
   - Go: https://app.resend.com/api-keys
   - Copy your key

2. Add to `.env.local`
   ```
   RESEND_API_KEY=re_YOUR_KEY_HERE
   ```

3. Save file

4. Restart dev server
   ```bash
   npm run dev
   ```

✅ **Donation Email Sending:** READY!

---

## STEP 3: Test Both Email Systems

### Test Supabase Confirmation Email

```
1. Open: http://localhost:3000/auth/signup
   
2. Fill form:
   - First Name: Test
   - Last Name: User
   - Email: your-email@gmail.com
   - Password: TestPass123!
   - Confirm: TestPass123!
   
3. Click "Create Account"

4. Check your email inbox
   - Look for: "Confirm your signup"
   - Should arrive in 1-2 minutes
   - Check spam folder if not found
   
5. Click confirmation link in email

6. ✅ You're signed up!
```

### Test Resend Donation Email

```
1. Open: http://localhost:3000/donate

2. Fill donation form:
   - Full Name: Your Name
   - Phone: +1234567890
   - Amount: 50 (or any amount)
   - Select Program: Any option
   - Email: your-email@gmail.com
   - Payment Method: Stripe (Credit Card)

3. Click "Donate" or "Proceed to Payment"

4. If Stripe popup appears:
   - Card Number: 4242 4242 4242 4242
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any (e.g., 10001)
   - Click "Pay"

5. Check your email inbox
   - Look for: "Thank You for Your Donation! ❤️"
   - Should show your donation amount
   - Should arrive in 1-2 minutes

6. ✅ Thank you email received!
```

---

## STEP 4: Verify Everything Works

### Run Verification Script

```bash
npm run setup:email
```

**Output will show:**
```
✅ NEXT_PUBLIC_SUPABASE_URL is configured
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is configured
✅ RESEND_API_KEY is configured
✅ SMTP variables configured (for Supabase SMTP)

Supabase Auth:
  Status: Configured
  Email Confirmation: Requires SMTP setup in Supabase Dashboard
  
Donation Emails:
  Service: Resend
  Status: Configured (with RESEND_API_KEY)
  Auto-Send: Yes, after successful donation
```

✅ **All systems verified!**

---

## Email Message Examples

### What Your Users Will Receive

**Confirmation Email:**
```
Subject: Confirm your signup

Hi [Name],

Please confirm your email address by clicking the link below:

[Confirmation Link]

The SHAPEthiopia Team
```

**Donation Thank You Email:**
```
Subject: Thank You for Your Donation! ❤️

Dear [Donor Name],

Thank you so much for your generous donation of $50 USD!
We truly appreciate your support in helping communities and 
changing lives across Ethiopia.

Donation Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Amount:          $50 USD
Program:         Children's Education
Payment Method:  Stripe
Transaction ID:  ch_1ABC123XYZ
Date:            March 30, 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your Impact:
Your donation will directly support children's education programs,
helping to create sustainable change in Ethiopian communities.

We'll keep you updated through our newsletter and impact reports.

Questions? Contact us: support@shapethiopia.org

With gratitude,
The SHAPEthiopia Team
```

---

## Troubleshooting During Setup

### Problem: "SMTP Password Invalid" (Gmail)

**Solution:**
- You used regular Gmail password ❌
- Use 16-character app password instead ✅
- Get from: https://myaccount.google.com/apppasswords
- Make sure 2FA is enabled first

### Problem: "Confirmation Email Not Arriving"

**Checks:**
1. ✅ Check spam/promotions folder
2. ✅ Wait 2-3 minutes
3. ✅ Try with different email (test@gmail.com)
4. ✅ Check Supabase Dashboard → Logs
5. ✅ Verify SMTP settings are saved in Supabase

### Problem: "Donation Email Not Arriving"

**Checks:**
1. ✅ Open DevTools (F12) and check Console tab
2. ✅ Check spam/promotions folder
3. ✅ Wait 1-2 minutes
4. ✅ Go to https://app.resend.com → Emails tab
5. ✅ Check if RESEND_API_KEY is in .env.local
6. ✅ Did you provide email in donation form?

### Problem: "Need Help, Still Not Working"

See these files for detailed help:
- `EMAIL_QUICK_START.md` - Quick checklist
- `DONATION_EMAIL_FIX.md` - Full troubleshooting
- `EMAIL_SETUP_GUIDE.md` - Detailed guide

---

## Quick Reference

### Donation Email Status: ✅ AUTO-SENDING
```
What you see now:
→ User donates
→ Email automatically sent (no manual action needed!)
→ Includes: "Thank You for Your Donation! ❤️"
→ Shows donation amount
→ Lists all details
```

### Confirmation Email Status: ⏳ CONFIGURE SUPABASE
```
What you need to do:
→ 1. Configure SMTP (Gmail or SendGrid)
→ 2. Enable "Confirm signup" template
→ 3. Test by signing up
→ 4. Users receive confirmation email
```

### Files You Need to Know About

| File | Purpose | Read Time |
|------|---------|-----------|
| EMAIL_QUICK_START.md | Fast setup | 5 min |
| DONATION_EMAIL_FIX.md | Full guide | 15 min |
| EMAIL_SETUP_GUIDE.md | Reference | 20 min |
| README_EMAIL_FIX.md | Overview | 10 min |
| .env.local | Your settings | - |

---

## Success Checklist ✅

- [ ] SMTP configured in Supabase (or will do)
- [ ] RESEND_API_KEY in .env.local (already there!)
- [ ] Tested sign up → got confirmation email
- [ ] Tested donation → got thank you email
- [ ] `npm run setup:email` shows all ✅
- [ ] Ready to deploy!

---

## You're All Set! 🎉

**Next Steps:**
1. Complete Step 1 (if not done)
2. Run Step 3 tests
3. Check both email types arrive
4. When ready: Deploy to production!

**Questions?** Check the documentation files or see `DONATION_EMAIL_FIX.md` troubleshooting section.

**Ready to go live?** See `DONATION_EMAIL_FIX.md` → Production Deployment section.

---

*Email setup wizard - Complete this to enable all email features!*
