# How to Verify Your Domain in Resend (Complete Step-by-Step Guide)

## The Problem
Currently, Resend can only send confirmation emails to your test email (`dawitberiso406@gmail.com`) because the domain `shapethiopia.org` is not verified.

## The Solution: Verify Your Domain

### Step 1: Go to Resend Dashboard
1. Visit: https://resend.com
2. Log in with your account
3. Click **"Domains"** in the left sidebar

### Step 2: Add Your Domain
1. Click **"Add Domain"** button
2. Enter: `shapethiopia.org`
3. Click **"Add Domain"**

### Step 3: Add DNS Records
Resend will show you DNS records to add. You'll see something like:

```
Type: CNAME
Name: default._domainkey
Value: default.resend.dev
```

You need to add these records to your domain provider (wherever you registered/manage shapethiopia.org).

**Common domain providers:**
- Google Domains
- Namecheap
- GoDaddy
- Cloudflare
- AWS Route53

**How to add DNS records (general steps):**
1. Log into your domain provider
2. Go to "DNS Settings" or "DNS Management"
3. Add a new CNAME record for each one Resend shows
4. Save changes

### Step 4: Wait for Verification
- Verification usually takes 5-10 minutes
- You can check status in Resend dashboard
- Once verified, it will show a green checkmark

### Step 5: Enable in Your App
Once verified, add this environment variable to your `.env.local` and Vercel:

```
RESEND_DOMAIN_VERIFIED=true
```

Then restart your app - it will automatically use `noreply@shapethiopia.org` as the sender.

## What Happens After Verification

**Before:** Users sign up → only `dawitberiso406@gmail.com` receives confirmation emails

**After:** Users sign up → ALL emails receive confirmation emails from `noreply@shapethiopia.org`

## The Code is Already Ready

The app is already configured to automatically switch from test mode to verified domain mode. Just:
1. Verify the domain (5 minutes)
2. Add the environment variable (1 minute)
3. That's it!

## Need Help?

- Resend docs: https://resend.com/docs/api-reference/send-email
- Domain verification issues: Contact your domain provider support

---

**Current Status:** Test mode (emails only to dawitberiso406@gmail.com)
**Next Step:** Verify domain at https://resend.com/domains
