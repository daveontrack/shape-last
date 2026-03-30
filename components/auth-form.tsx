"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Chrome, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface AuthFormProps {
  mode: "login" | "signup"
  redirectTo?: string
}

export function AuthForm({ mode, redirectTo = "/dashboard" }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authMode, setAuthMode] = useState<"oauth" | "email">("oauth")

  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleOAuthLogin = async (provider: 'google') => {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast({
          title: "Authentication Failed",
          description: error.message,
          variant: "destructive",
        })
      }
      // OAuth will redirect, so we don't need to handle success here
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        if (password.length < 6) {
          toast({
            title: "Password too short",
            description: "Password must be at least 6 characters long.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        // Use custom signup API that handles email sending
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          toast({
            title: "Sign Up Failed",
            description: data.error || "An error occurred during signup.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        // Email confirmation required - redirect to verification page
        toast({
          title: "Account Created!",
          description: data.message || "Please check your email for a confirmation link.",
        })
        router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`)
      } else {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully.",
        })
        router.push(redirectTo)
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Primary OAuth Buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          size="lg"
          className="w-full h-12 text-base font-medium"
          onClick={() => handleOAuthLogin('google')}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Chrome className="mr-2 h-5 w-5" />
          )}
          Continue with Google
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailAuth} className="space-y-4">
        {mode === "signup" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
            </div>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "signup" ? "Creating Account..." : "Signing In..."}
            </>
          ) : (
            mode === "signup" ? "Create Account" : "Sign In"
          )}
        </Button>
      </form>

      {/* Auth Mode Toggle */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => router.push(mode === "login" ? "/auth/signup" : "/auth/login")}
            className="text-primary hover:underline font-medium"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  )
}
