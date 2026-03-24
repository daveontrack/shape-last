"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Heart, Mail, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold text-foreground">
            SHAPE<span className="text-primary">ethiopia</span>
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="font-serif text-2xl">Check Your Email</CardTitle>
            <CardDescription>
              We&apos;ve sent you a confirmation link to complete your registration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Icon Animation */}
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <div className="flex items-center justify-center gap-3 text-primary">
                <Mail className="h-8 w-8" />
              </div>
              <p className="mt-3 font-medium text-foreground">
                Confirmation email sent!
              </p>
              {email && (
                <p className="text-sm text-muted-foreground mt-1">
                  Sent to: <span className="font-medium">{email}</span>
                </p>
              )}
            </div>

            {/* Instructions */}
            <div className="text-left space-y-4">
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Check your inbox</p>
                  <p className="text-xs text-muted-foreground">
                    Open the email from SHAPEthiopia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Click the confirmation link</p>
                  <p className="text-xs text-muted-foreground">
                    This will activate your account
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Start making an impact</p>
                  <p className="text-xs text-muted-foreground">
                    Log in and explore how you can help
                  </p>
                </div>
              </div>
            </div>

            {/* Spam Notice */}
            <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-200 text-left">
                <strong>Didn&apos;t receive the email?</strong> Please check your email inbox and click
                the confirmation link to activate your account. If you don&apos;t see it, check your spam folder.
                The email may take a few minutes to arrive.
              </p>
            </div>

            {/* Resend Option */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">
                Still no email after 5 minutes?
              </p>
              <Button variant="ghost" size="sm" className="text-primary" asChild>
                <Link href="/auth/sign-up">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Try signing up again
                </Link>
              </Button>
            </div>
          </CardContent>

          <div className="p-6 pt-0">
            <Button asChild className="w-full">
              <Link href="/auth/login">Go to Login</Link>
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-primary animate-pulse" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}