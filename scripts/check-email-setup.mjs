#!/usr/bin/env node

/**
 * Email Configuration Setup Script
 * Helps verify and test email configuration for the app
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

async function checkEnvironmentVariables() {
  log('\n📋 Checking Environment Variables...', 'cyan')

  const envPath = path.join(__dirname, '../.env.local')
  
  if (!fs.existsSync(envPath)) {
    log('❌ .env.local file not found', 'red')
    return false
  }

  const envContent = fs.readFileSync(envPath, 'utf-8')
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'RESEND_API_KEY',
  ]

  let allPresent = true
  requiredVars.forEach((variable) => {
    if (envContent.includes(variable)) {
      log(`✅ ${variable} is configured`, 'green')
    } else {
      log(`❌ ${variable} is missing`, 'red')
      allPresent = false
    }
  })

  // Check SMTP settings
  const smtpVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
  const hasSmtp = smtpVars.every((v) => envContent.includes(v))
  
  if (hasSmtp) {
    log('✅ SMTP variables configured (for Supabase SMTP)', 'green')
  } else {
    log('⚠️  SMTP variables not configured (configure in Supabase Dashboard)', 'yellow')
  }

  return allPresent
}

function showConfiguration() {
  log('\n⚙️  Configuration Summary:', 'cyan')

  const config = {
    'Supabase Auth': {
      'Status': 'Configured',
      'Email Confirmation': 'Requires SMTP setup in Supabase Dashboard',
      'Location': 'https://app.supabase.com → Authentication → Email Templates',
    },
    'Donation Emails': {
      'Service': 'Resend',
      'Status': 'Configured (with RESEND_API_KEY)',
      'Auto-Send': 'Yes, after successful donation',
      'Documentation': 'See EMAIL_SETUP_GUIDE.md',
    },
  }

  Object.entries(config).forEach(([section, details]) => {
    log(`\n${section}:`, 'blue')
    Object.entries(details).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`)
    })
  })
}

function showNextSteps() {
  log('\n🚀 Next Steps:', 'cyan')

  const steps = [
    '1. Complete Supabase SMTP Configuration:',
    '   → Go to Supabase Dashboard → Authentication → Email Templates',
    '   → Click "Configure SMTP"',
    '   → Fill in your SMTP credentials (Gmail/SendGrid)',
    '',
    '2. Verify RESEND_API_KEY in .env.local:',
    '   → Get key from resend.com/api-keys',
    '   → Add to .env.local: RESEND_API_KEY=re_YOUR_KEY',
    '',
    '3. Test Email Sending:',
    '   → Sign up at /auth/signup (tests Supabase confirmation email)',
    '   → Donate at /donate (tests Resend thank you email)',
    '',
    '4. Check Email Logs:',
    '   → Supabase: Dashboard → Logs → Recent events',
    '   → Resend: app.resend.com → Emails',
  ]

  steps.forEach((step) => {
    if (step.startsWith('→')) {
      console.log(`  ${colors.yellow}${step}${colors.reset}`)
    } else if (step === '') {
      console.log('')
    } else {
      log(step, 'yellow')
    }
  })
}

function main() {
  log('\n═══════════════════════════════════════════════════════════', 'cyan')
  log('    Email Configuration Helper for SHAPEthiopia App', 'cyan')
  log('═══════════════════════════════════════════════════════════\n', 'cyan')

  const envOk = checkEnvironmentVariables()
  showConfiguration()
  showNextSteps()

  if (envOk) {
    log('\n✨ Environment variables are configured!', 'green')
  } else {
    log('\n⚠️  Some environment variables are missing. Please configure them.', 'yellow')
  }

  log('\n📚 For detailed information, see: EMAIL_SETUP_GUIDE.md\n', 'cyan')
}

main()
