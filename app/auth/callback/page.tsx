"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AuthCallbackPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (!data?.session) {
          toast({
            title: "Authentication needed",
            description: "Could not complete OAuth callback. Please sign in again.",
            variant: "destructive",
          })
          router.replace("/auth/login")
          return
        }

        toast({
          title: "Signed in successfully",
          description: "Redirecting to your dashboard...",
        })
        router.replace("/dashboard")
      } catch (error) {
        toast({
          title: "OAuth callback failed",
          description: error instanceof Error ? error.message : "Please try logging in again.",
          variant: "destructive",
        })
        router.replace("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    handleCallback()
  }, [router, toast])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return null
}
