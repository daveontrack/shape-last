/**
 * Environment variable validation and access utilities
 * This file provides centralized access to all environment variables
 * with proper validation and helpful error messages
 */

type EnvConfig = {
  // Supabase
  supabaseUrl: string
  supabaseAnonKey: string
  supabaseDbUrl?: string
  
  // Stripe
  stripePublishableKey?: string
  stripeSecretKey?: string
  
  // OpenAI
  openaiApiKey?: string
}

function getEnvVar(key: string, required: boolean = true): string | undefined {
  const value = process.env[key]
  
  if (required && !value) {
    console.error(`[v0] Missing required environment variable: ${key}`)
    throw new Error(`Missing required environment variable: ${key}. Please check your configuration.`)
  }
  
  return value
}

export function validateEnv(): EnvConfig {
  // Required variables
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL', true)!
  const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', true)!
  
  // Optional variables (will log if missing but won't throw)
  const supabaseDbUrl = getEnvVar('SUPABASE_DB_URL', false)
  const stripePublishableKey = getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', false)
  const stripeSecretKey = getEnvVar('STRIPE_SECRET_KEY', false)
  const openaiApiKey = getEnvVar('OPENAI_API_KEY', false)
  
  // Log status of optional services
  if (!supabaseDbUrl) {
    console.warn('[v0] SUPABASE_DB_URL not set - direct database access will not be available')
  }
  
  if (!stripePublishableKey || !stripeSecretKey) {
    console.warn('[v0] Stripe keys not fully configured - payment processing will not be available')
  }
  
  if (!openaiApiKey) {
    console.warn('[v0] OPENAI_API_KEY not set - AI features will not be available')
  }
  
  return {
    supabaseUrl,
    supabaseAnonKey,
    supabaseDbUrl,
    stripePublishableKey,
    stripeSecretKey,
    openaiApiKey,
  }
}

// Export individual getters for convenience
export const env = {
  get supabaseUrl() {
    return getEnvVar('NEXT_PUBLIC_SUPABASE_URL', true)!
  },
  get supabaseAnonKey() {
    return getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', true)!
  },
  get supabaseDbUrl() {
    return getEnvVar('SUPABASE_DB_URL', false)
  },
  get stripePublishableKey() {
    return getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', false)
  },
  get stripeSecretKey() {
    return getEnvVar('STRIPE_SECRET_KEY', false)
  },
  get openaiApiKey() {
    return getEnvVar('OPENAI_API_KEY', false)
  },
}
