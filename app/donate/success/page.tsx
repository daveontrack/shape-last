"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  CheckCircle, Clock, Home, Heart, Download, Share2,
  GraduationCap, Droplets, Users, Building2, Loader2
} from "lucide-react"
import { getCheckoutSession } from "@/app/actions/stripe"
import { createClient } from "@/lib/supabase/client"

const causeLabels: Record<string, { label: string; icon: React.ElementType }> = {
  education: { label: "Children's Education", icon: GraduationCap },
  water: { label: "Clean Water", icon: Droplets },
  women: { label: "Women Empowerment", icon: Users },
  community: { label: "Community Development", icon: Building2 },
}

const paymentMethodLabels: Record<string, string> = {
  stripe: "Card Payment (International)",
}

function DonationSuccessContent() {
  const searchParams = useSearchParams()
  
  // Get params - could be from Stripe payment
  const sessionId = searchParams.get("session_id") // Stripe
  const donationId = searchParams.get("id")
  const paramAmount = searchParams.get("amount")
  const paramMethod = searchParams.get("method")
  const paramCause = searchParams.get("cause")
  
  const [isLoading, setIsLoading] = useState(!!sessionId)
  const [paymentData, setPaymentData] = useState<{
    amount: number
    cause: string
    email: string | null
    donorName: string
    method: string
    currency: string
  } | null>(null)
  const [savedToDb, setSavedToDb] = useState(false)
  
  // Fetch payment data from Stripe
  useEffect(() => {
    const fetchPaymentData = async () => {
      // Handle Stripe session
      if (sessionId) {
        try {
          const session = await getCheckoutSession(sessionId)
          
          if (session.paymentStatus === "paid") {
            setPaymentData({
              amount: (session.amountTotal || 0) / 100,
              cause: session.metadata?.cause || "general",
              email: session.customerEmail || null,
              donorName: session.metadata?.donor_name || "Anonymous",
              method: "stripe",
              currency: "USD",
            })
            
            // Save to database if not already saved
            if (!savedToDb) {
              const supabase = createClient()
              const { data: { user } } = await supabase.auth.getUser()
              
              await supabase.from("donations").insert({
                user_id: user?.id || null,
                donor_name: session.metadata?.donor_name || "Anonymous",
                donor_phone: session.metadata?.donor_phone || null,
                donor_email: session.customerEmail || null,
                amount: (session.amountTotal || 0) / 100,
                currency: "USD",
                payment_method: "stripe",
                transaction_id: sessionId,
                program: session.metadata?.cause || "general",
                payment_status: "completed",
                donation_type: "one-time",
                is_anonymous: false,
              })
              setSavedToDb(true)
            }
          }
        } catch (error) {
          console.error("[v0] Error fetching Stripe session:", error)
        } finally {
          setIsLoading(false)
        }
        return
      }
      
      setIsLoading(false)
    }
    
    fetchPaymentData()
  }, [sessionId, savedToDb, paramCause])
  
  // Determine values based on payment data
  const amount = paymentData?.amount?.toString() || paramAmount
  const method = paymentData?.method || paramMethod || "stripe"
  const cause = paymentData?.cause || paramCause
  const currency = "USD"
  
  const causeInfo = cause ? causeLabels[cause] : null
  const CauseIcon = causeInfo?.icon || Heart
  
  if (isLoading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Confirming your payment...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const handleShare = async () => {
    const shareText = `I just donated ${amount} ${currency} to SHAPEthiopia for ${causeInfo?.label || "a good cause"}! Join me in making a difference.`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "I donated to SHAPEthiopia!",
          text: shareText,
          url: "https://shapethiopia.org/donate",
        })
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText)
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                {isPending ? (
                  <Clock className="w-10 h-10" />
                ) : (
                  <CheckCircle className="w-10 h-10" />
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Thank You for Your Donation!
              </h1>
              <p className="opacity-90 text-lg max-w-xl mx-auto">
                Thank you for your donation of <strong>{amount} {currency}</strong>! 
                A confirmation email has been sent to your registered email address. Your generosity helps transform lives across Ethiopia.
              </p>
            </div>
          </div>
        </section>

        {/* Receipt Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              {/* Receipt Card */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center mb-6 pb-6 border-b border-border">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <CauseIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Donation Receipt
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      SHAPEthiopia Foundation
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Amount */}
                    <div className="text-center py-4 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Donation Amount</p>
                      <p className="text-4xl font-bold text-primary">
                        ${amount}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Reference ID</span>
                        <span className="font-mono text-foreground">{donationId?.slice(0, 8) || "N/A"}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Cause</span>
                        <span className="font-medium text-foreground">{causeInfo?.label || "General"}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span className="font-medium text-foreground">
                          {method ? paymentMethodLabels[method] || method : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Status</span>
                        <span className={`font-medium ${isPending ? "text-amber-600" : "text-green-600"}`}>
                          {isPending ? "Pending Verification" : "Completed"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium text-green-600">Completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Message */}
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-sm text-foreground text-center">
                      <Heart className="w-4 h-4 inline-block mr-1 text-primary" />
                      Your donation will help {causeInfo?.label?.toLowerCase() || "transform lives"} across Ethiopia. 
                      Thank you for your generosity!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link href="/donate">
                    <Heart className="mr-2 h-4 w-4" />
                    Donate Again
                  </Link>
                </Button>
                <Button variant="secondary" asChild className="flex-1">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Questions about your donation?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <DonationSuccessContent />
    </Suspense>
  )
}
