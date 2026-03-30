"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Heart, ArrowRight, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export const dynamic = "force-dynamic"

export default function VolunteerPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" })
      return false
    }
    if (!formData.email.trim()) {
      toast({ title: "Email is required", variant: "destructive" })
      return false
    }
    if (!formData.interest) {
      toast({ title: "Please select an area of interest", variant: "destructive" })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user ?? null

      const nameParts = formData.name.trim().split(" ")
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(" ") || ""

      const { error } = await supabase
        .from("volunteer_applications")
        .insert({
          user_id: user?.id || null,
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: formData.phone || null,
          interests: formData.interest || null,
          motivation: formData.message || null,
          status: "pending",
        })

      if (error) throw error

      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", interest: "", message: "" })
      
      toast({
        title: "Thank you!",
        description: "Your application has been submitted. We will contact you within 48 hours.",
      })
    } catch (error) {
      console.error("Submit error:", error)
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-secondary py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6">Join Our Mission</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              There are many ways to contribute to our work. Whether through volunteering, 
              partnerships, or sponsorship, your involvement makes a real difference.
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Volunteer Application</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we will be in touch within 48 hours.
                </p>
              </div>

              {isSubmitted ? (
                <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                  <CardContent className="p-8 text-center">
                    <p className="text-lg font-semibold mb-4">Thank you for your interest!</p>
                    <p className="text-muted-foreground mb-6">
                      Your application has been submitted successfully. We will contact you within 48 hours.
                    </p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      Submit Another Application
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            disabled={isSubmitting}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            disabled={isSubmitting}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interest">Area of Interest *</Label>
                          <select
                            id="interest"
                            value={formData.interest}
                            onChange={(e) => handleInputChange("interest", e.target.value)}
                            disabled={isSubmitting}
                            required
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                          >
                            <option value="">Select an option</option>
                            <option value="global">Global Volunteer</option>
                            <option value="visit">Visit Centers</option>
                            <option value="partner">Partnership</option>
                            <option value="sponsor">Sponsorship</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Tell Us About Yourself</Label>
                        <Textarea
                          id="message"
                          placeholder="Share your background, skills, and why you want to volunteer..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                        <Mail className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold mb-6">Prefer to Donate?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              If you would like to support our work financially, every contribution helps us reach more communities.
            </p>
            <Button size="lg" asChild>
              <a href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Make a Donation
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
