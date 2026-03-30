# SHAPETHIOPIA - Email & Auth Configuration Guide

## Overview

This guide covers three core fixes implemented for the SHAPEthiopia app:

1. **Sign-up Route 404 Fix** - `/auth/sign-up` now works (hyphenated URL)
2. **Profile Update Database Integration** - Real Supabase saving + Resend email notifications
3. **Email Confirmation UX** - Better error messages, loading states, and verification flow

---

## Issue 1: Sign-up Route 404 Error - FIXED

### What Was Changed
- Created new route: `/app/auth/sign-up/page.tsx`
- Both `/auth/signup` and `/auth/sign-up` now work

### Status
✅ **COMPLETE** - No user action needed. Both URLs work.

---

## Issue 2: Profile Update Not Reflecting - FIXED

### What Was Implemented

**Backend:**
- New API endpoint: `/app/api/profile/route.ts`
  - `GET /api/profile` - Fetch user's current profile data
  - `POST /api/profile` - Update profile and send confirmation email via Resend

**Frontend:**
- Updated `/app/dashboard/profile/page.tsx` to:
  - Fetch real user data on page load via `useEffect`
  - Call `/api/profile` POST endpoint to save changes
  - Refetch data after successful save
  - Show proper loading/success/error states

**Email Integration:**
- Profile updates trigger automatic email via Resend API
- Uses existing `RESEND_API_KEY` from your `.env.local`
- Professional HTML email template with all profile changes

### Key Features
- Loading spinner while data is fetching
- Real-time form population with user's current data
- Automatic Resend email with profile confirmation
- Success toast notification + green success banner
- Error handling with clear error messages
- Form fields disabled during save operation
- Auto-hide success message after 5 seconds

### Status
✅ **COMPLETE** - Works with your existing Supabase + Resend setup

### Testing
```
1. Go to: http://localhost:3000/dashboard/profile
2. Page loads with your current profile data
3. Edit any field (first name, last name, phone, etc.)
4. Click "Save Changes"
5. Shows "Saving..." spinner
6. Profile updates in database
7. Confirmation email sent to your inbox
8. Green success banner appears
9. Page refreshes and shows updated data
10. Email contains all profile changes
```

---

## Issue 3: Email Confirmation - NEEDS SUPABASE SETUP

### What Was Implemented

**Enhanced UX:**
- Better error messages in auth form
- Clear success/error toast notifications
- Informative messages about email confirmation
- Added debug logging for troubleshooting

**Current Flow:**
1. User signs up with email/password or Google
2. If email signup: Supabase sends confirmation email
3. User clicks link in email
4. Account becomes verified
5. User redirected to dashboard

### What Needs User Action: Supabase SMTP Configuration

**⚠️ Important:** Email confirmations require SMTP setup in Supabase dashboard (not code changes).

#### Steps to Configure Supabase SMTP:

**Option 1: Using Gmail (Testing)**
1. Go to https://app.supabase.com
2. Select your project
3. Settings → Authentication → Email Templates
4. Click "Configure SMTP"
5. Choose "Gmail"
6. Fill in:
   - Email: your-gmail@gmail.com
   - Password: Generate app-specific password at https://myaccount.google.com/apppasswords
7. Save and test

**Option 2: Using SendGrid (Production Recommended)**
1. Get SendGrid API key from https://app.sendgrid.com/settings/api_keys
2. Go to Supabase dashboard (same path as above)
3. Click "Configure SMTP"
4. Choose "SendGrid"
5. Fill in SendGrid credentials
6. Enable "Confirm signup" template

#### Verification
After SMTP setup:
1. Go to http://localhost:3000/auth/sign-up
2. Create new account with email
3. Check inbox for "Confirm your email" message
4. Click confirmation link
5. Account is verified

### Status
⏳ **AWAITING SUPABASE CONFIG** - Code is ready, just needs SMTP setup in dashboard

---

## Current Configuration

### Environment Variables in `.env.local`

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# Email (Resend)
RESEND_API_KEY=re_G6jNNB5r_CxodxpGUXTa5yvGnrr7TjwhR

# SMTP (for Supabase confirmation emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### What Works Now
✅ Profile updates save to Supabase  
✅ Profile update confirmation emails via Resend  
✅ Sign-up route `/auth/sign-up` works  
✅ Better error handling in auth flow  
✅ Loading states and user feedback  

### What Needs Setup
⏳ Supabase SMTP configuration (in dashboard, not code)  
⏳ Email confirmation sending (after SMTP setup)  

---

## File Changes Summary

### New Files Created
1. `/app/auth/sign-up/page.tsx` - Sign-up route (hyphenated URL)
2. `/app/api/profile/route.ts` - Profile API endpoint for CRUD operations

### Files Modified
1. `/app/dashboard/profile/page.tsx` - Added real database integration
2. `/components/auth-form.tsx` - Enhanced UX with logging and better messages

---

## Debugging & Logs

### Where to Find Debug Information

**Browser Console:**
- Open DevTools (F12)
- Check Console tab for `[v0]` prefixed logs
- Look for auth flow, profile update, and email logs

**Network Tab:**
- Check `/api/profile` requests
- Verify request/response payloads
- Look for auth errors

### Common Issues & Solutions

**Issue: Profile page shows "Loading..." indefinitely**
- Check browser console for errors
- Verify Supabase credentials in `.env.local`
- Check that user is authenticated (check dashboard/cookies)

**Issue: "Unauthorized" error when saving profile**
- User not logged in - redirect to login first
- Session expired - need to login again
- Check Supabase auth status

**Issue: Profile email not sending**
- Check Resend API key is correct in `.env.local`
- Verify `RESEND_API_KEY` is set in Vercel dashboard
- Check Resend account has available credits

**Issue: Email confirmation not sending**
- Supabase SMTP not configured
- Follow steps in "Issue 3" section above
- Check Supabase dashboard Email Templates

---

## Testing Checklist

```
SIGN-UP FLOW
[ ] Go to /auth/sign-up - loads without 404
[ ] Go to /auth/signup - still works
[ ] Create account with email
[ ] See "Check Your Email" message
[ ] Check email for confirmation link
[ ] Click link and get verified
[ ] Redirected to dashboard

PROFILE UPDATES
[ ] Go to /dashboard/profile
[ ] Page loads with current data
[ ] Edit first/last name
[ ] Click "Save Changes"
[ ] See loading spinner
[ ] Form disables during save
[ ] See green success banner
[ ] Check email for update confirmation
[ ] Page refreshes with updated data
[ ] Try invalid data - see error message
[ ] Form re-enables after error

ERROR HANDLING
[ ] Try signup with existing email - error message
[ ] Try password < 6 chars - error message
[ ] Try passwords that don't match - error message
[ ] Try save profile with empty first name - error
[ ] Check toast notifications appear
[ ] Check browser console for debug logs
```

---

## Next Steps

1. **Configure Supabase SMTP** (5 minutes)
   - Follow steps in "Issue 3" section
   - Test with signup flow

2. **Test Full Flow** (5 minutes)
   - Sign up with new email
   - Verify email
   - Update profile
   - Check emails

3. **Monitor Logs** (ongoing)
   - Browser console logs help debugging
   - Check Resend dashboard for email delivery status
   - Check Supabase logs for database errors

---

## Support

### If Something Breaks

1. Check browser console (F12) for `[v0]` debug logs
2. Check Network tab for failed requests
3. Verify all env variables are set
4. Check Supabase dashboard for SMTP config status
5. Check Resend dashboard for API key validity

### Email Questions

- **Supabase Email Confirmations:** Need SMTP config in Supabase dashboard
- **Profile Update Emails:** Handled by Resend API (auto-working with your key)
- **Testing Emails:** Use real email addresses, check spam folder

---

## Architecture Overview

```
User Signs Up (email)
    ↓
/auth/signup form
    ↓
Supabase Auth creates user
    ↓
If email signup: SMTP sends confirmation email
    ↓
User clicks confirmation link
    ↓
/auth/callback processes confirmation
    ↓
User logged in, redirected to /dashboard

---

User Updates Profile
    ↓
/dashboard/profile form
    ↓
POST /api/profile with form data
    ↓
Supabase updates profiles table
    ↓
Resend sends confirmation email
    ↓
Profile page refetches data
    ↓
UI updates with new data
    ↓
Success toast + banner shown
```

---

## Environment Variables Checklist

```
Required for everything:
✓ NEXT_PUBLIC_SUPABASE_URL
✓ NEXT_PUBLIC_SUPABASE_ANON_KEY
✓ RESEND_API_KEY=re_G6jNNB5r_CxodxpGUXTa5yvGnrr7TjwhR

Required for email confirmation (Supabase SMTP):
⏳ Configure in Supabase dashboard, not .env

Optional but recommended:
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (for Supabase setup)
```

---

Last Updated: 2024
Status: 3 Issues - 2 Fixed, 1 Awaiting Supabase Config
