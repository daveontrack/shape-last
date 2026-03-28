'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Menu, Heart, User, LogOut, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MobileNav = dynamic(
  () => import('@/components/mobile-nav').then((mod) => mod.MobileNav),
  {
    ssr: false,
    loading: () => (
      <Button variant='ghost' size='icon' className='lg:hidden'>
        <Menu className='h-6 w-6' />
      </Button>
    ),
  },
)

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/programs', label: 'Programs' },
  { href: '/centers', label: 'Our Centers' },
  { href: '/volunteer', label: 'Get Involved' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
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
    
    // If Supabase is not configured, just show logged out state
    if (!supabase) {
      setIsLoading(false)
      return
    }

    const loadUser = async () => {
      setIsLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)

      if (user) {
        await loadProfile(user)
      }

      setIsLoading(false)
    }

    const loadProfile = async (user: SupabaseUser) => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single()

        const avatar =
          data?.avatar_url ||
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          null

        setProfile({
          first_name:
            data?.first_name ||
            user.user_metadata?.full_name?.split(' ')[0] ||
            null,
          last_name:
            data?.last_name ||
            user.user_metadata?.full_name?.split(' ').slice(1).join(' ') ||
            null,
          avatar_url: avatar,
        })
      } catch (err) {
        console.error('Profile error:', err)
        setProfile(null)
      }
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        loadProfile(currentUser)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    if (supabase) {
      await supabase.auth.signOut()
    }
    setUser(null)
    setProfile(null)
    router.push('/')
    router.refresh()
  }

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : user?.email?.split('@')[0] || 'User'

  const initials = profile?.first_name
    ? `${profile.first_name[0]}${profile.last_name?.[0] || ''}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() || 'U'

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b'>
      <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center'>
            <Heart className='w-5 h-5 text-primary-foreground' />
          </div>
          <span className='font-bold text-lg'>
            SHAPE<span className='text-primary'>ethiopia</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className='hidden lg:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className='hidden lg:flex items-center gap-3'>
          {isLoading ? (
            <div className='w-8 h-8 rounded-full bg-muted animate-pulse' />
          ) : user ? (
            <DropdownMenu>
              {/* ✅ FIXED TRIGGER */}
              <DropdownMenuTrigger asChild>
                <Avatar className='h-10 w-10 cursor-pointer'>
                  <AvatarImage
                    src={profile?.avatar_url || undefined}
                    alt={displayName}
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align='end' className='w-56'>
                <div className='p-2'>
                  <p className='font-medium'>{displayName}</p>
                  <p className='text-sm text-muted-foreground'>{user.email}</p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href='/dashboard'>
                    <LayoutDashboard className='mr-2 h-4 w-4' />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href='/dashboard/profile'>
                    <User className='mr-2 h-4 w-4' />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className='text-red-500'
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant='ghost' asChild>
                <Link href='/auth/login'>Sign In</Link>
              </Button>
              <Button asChild>
                <Link href='/donate'>Donate</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile */}
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
