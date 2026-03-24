"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"

interface NewsletterSignupProps {
  variant?: "default" | "inline" | "card"
  className?: string
}

export function NewsletterSignup({ variant = "default", className = "" }: NewsletterSignupProps) {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)
    toast({
      title: "Subscribed Successfully!",
      description: "Thank you for joining our newsletter. You'll receive updates about our work.",
    })
    setEmail("")

    // Reset success state after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000)
  }

  if (isSuccess) {
    return (
      <div className={`flex items-center gap-2 text-primary ${className}`}>
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Thank you for subscribing!</span>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`space-y-2 ${className}`}>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            className={`flex-1 ${error ? "border-destructive" : ""}`}
            disabled={isSubmitting}
          />
          <Button type="submit" disabled={isSubmitting} size="sm">
            {isSubmitting ? <Spinner className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
          </Button>
        </div>
        {error && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
      </form>
    )
  }

  if (variant === "card") {
    return (
      <div className={`bg-secondary rounded-xl p-6 ${className}`}>
        <h3 className="font-serif text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Subscribe to our newsletter for the latest stories and updates.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            className={error ? "border-destructive" : ""}
            disabled={isSubmitting}
          />
          {error && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner className="mr-2" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </>
            )}
          </Button>
        </form>
      </div>
    )
  }

  // Default variant
  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError("")
          }}
          className={`flex-1 ${error ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner className="mr-2" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Subscribe
            </>
          )}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </form>
  )
}
