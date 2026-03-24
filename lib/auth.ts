import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export interface AuthUser extends User {
  profile?: {
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
  }
}

/**
 * Get the current authenticated user with profile data
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    // Get profile data
    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, last_name, avatar_url")
      .eq("id", user.id)
      .single()

    return {
      ...user,
      profile: profile || undefined,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  try {
    const supabase = createClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Get user display name
 */
export function getUserDisplayName(user: AuthUser): string {
  if (user.profile?.first_name) {
    return `${user.profile.first_name} ${user.profile.last_name || ""}`.trim()
  }
  return user.email?.split("@")[0] || "User"
}

/**
 * Get user initials for avatar fallback
 */
export function getUserInitials(user: AuthUser): string {
  if (user.profile?.first_name) {
    return `${user.profile.first_name[0]}${user.profile.last_name?.[0] || ""}`.toUpperCase()
  }
  return user.email?.[0].toUpperCase() || "U"
}