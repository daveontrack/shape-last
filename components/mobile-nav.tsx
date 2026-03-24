"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, LogOut, LayoutDashboard, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface Profile {
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
}

interface MobileNavProps {
  user: SupabaseUser | null
  profile: Profile | null
  displayName: string
  initials: string
  navLinks: { href: string; label: string }[]
  onLogout: () => void
}

export function MobileNav({ user, profile, displayName, initials, navLinks, onLogout }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show static button during SSR and initial hydration
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    )
  }

  return (
    <div suppressHydrationWarning>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px]">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex flex-col gap-6 mt-8">
            {user && (
              <div className="flex items-center gap-3 pb-4 border-b">
                <Avatar>
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{displayName}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            )}
            
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
              {user ? (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/profile" onClick={() => setIsOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => { onLogout(); setIsOpen(false); }}
                    className="text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/donate" onClick={() => setIsOpen(false)}>
                      Donate Now
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
