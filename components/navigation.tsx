"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Menu, Heart, User, LogOut, LayoutDashboard, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const MobileNav = dynamic(() => import("@/components/mobile-nav").then(mod => mod.MobileNav), {
  ssr: false,
  loading: () => (
    <Button variant="ghost" size="icon" className="lg:hidden">
      <Menu className="h-6 w-6" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  )
})
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/centers", label: "Our Centers" },
  { href: "/volunteer", label: "Get Involved" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

interface Profile {
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
}

export function Navigation() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial user
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
        if (user) {
          // Try to get profile, but also use Google avatar if available
          const { data: profileData } = await supabase
            .from("profiles")
            .select("first_name, last_name, avatar_url")
            .eq("id", user.id)
            .single()
          
          // Use profile avatar, or fallback to user metadata avatar (from Google/OAuth)
          const avatarUrl = profileData?.avatar_url || 
            user.user_metadata?.avatar_url || 
            user.user_metadata?.picture ||
            null
          
          setProfile({
            first_name: profileData?.first_name || user.user_metadata?.full_name?.split(' ')[0] || null,
            last_name: profileData?.last_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || null,
            avatar_url: avatarUrl,
          })
        }
      } catch (error) {
        console.error("[v0] Error fetching user:", error)
      }
      setIsLoading(false)
    }
    
    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        try {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("first_name, last_name, avatar_url")
            .eq("id", session.user.id)
            .single()
          
          // Use profile avatar, or fallback to user metadata avatar (from Google/OAuth)
          const avatarUrl = profileData?.avatar_url || 
            session.user.user_metadata?.avatar_url || 
            session.user.user_metadata?.picture ||
            null
          
          setProfile({
            first_name: profileData?.first_name || session.user.user_metadata?.full_name?.split(' ')[0] || null,
            last_name: profileData?.last_name || session.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || null,
            avatar_url: avatarUrl,
          })
        } catch (error) {
          console.error("[v0] Error fetching profile:", error)
          setProfile(null)
        }
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      // Sign out on the server to clear the cookie session
      await fetch("/auth/signout", { method: "POST" })
    } catch {
      // ignore network errors
    }
    // Also sign out the browser client to clear local storage / in-memory session
    try {
      const supabase = createClient()
      await supabase.auth.signOut({ scope: "local" })
    } catch {
      // ignore
    }
    setUser(null)
    setProfile(null)
    router.push("/")
    router.refresh()
  }

  const displayName = profile?.first_name 
    ? `${profile.first_name} ${profile.last_name || ""}`.trim()
    : user?.email?.split("@")[0] || "User"

  const initials = profile?.first_name 
    ? `${profile.first_name[0]}${profile.last_name?.[0] || ""}`.toUpperCase()
    : user?.email?.[0].toUpperCase() || "U"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold text-foreground">
            SHAPE<span className="text-primary">ethiopia</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons / User Menu */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <DropdownMenu>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile?.avatar_url || undefined} alt={displayName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{displayName}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/donate">Donate Now</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <MobileNav 
          user={user}
          profile={profile}
          displayName={displayName}
          initials={initials}
          navLinks={navLinks}
          onLogout={handleLogout}
        />
      </nav>
    </header>
  )
}
