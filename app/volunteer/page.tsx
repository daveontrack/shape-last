"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { 
  Globe, MapPin, Handshake, Building2, Users, Heart, 
  CheckCircle, ArrowRight, Mail, Calendar, Clock, AlertCircle, CheckCircle2
} from "lucide-react"

const volunteerOptions = [
  {
    id: "global",
    icon: Globe,
    title: "Global Volunteer",
    description: "Support our mission remotely through skills-based volunteering, fundraising, or awareness campaigns.",
    commitment: "Flexible hours",
    features: [
      "Remote work opportunities",
      "Use your professional skills",
      "Flexible scheduling",
      "Regular team meetings",
    ],
  },
  {
    id: "visit",
    icon: MapPin,
    title: "Visit Our Centers",
    description: "Experience our work firsthand by visiting one of our six centers in Ethiopia for a short-term mission trip.",
    commitment: "1-4 weeks",
    features: [
      "Immersive cultural experience",
      "Direct community engagement",
      "Accommodation provided",
      "Guided orientation program",
    ],
  },
  {
    id: "partner",
    icon: Handshake,
    title: "Become a Partner",
    description: "Organizations and businesses can partner with us for corporate social responsibility initiatives.",
    commitment: "Ongoing",
    features: [
      "Corporate volunteering programs",
      "Matched giving opportunities",
      "Brand partnership benefits",
      "Impact reporting",
    ],
  },
  {
    id: "sponsor",
    icon: Building2,
    title: "Become a Sponsor",
    description: "Sponsor a child, program, or center to provide sustained support for our community initiatives.",
    commitment: "Monthly/Annual",
    features: [
      "Direct impact on lives",
      "Regular progress updates",
      "Personal connection with beneficiaries",
      "Tax-deductible contributions",
    ],
  },
]

type FormErrors = {
  name?: string
  email?: string
  interest?: string
  message?: string
}

const interestLabels: Record<string, string> = {
  global: "Global Volunteer",
  visit: "Visit Centers",
  partner: "Partnership",
  sponsor: "Sponsorship",
}

export default function VolunteerPage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  })

  // Handle URL hash to pre-select interest and scroll to form
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash && ["global", "visit", "partner", "sponsor"].includes(hash)) {
      setFormData(prev => ({ ...prev, interest: hash }))
      setSelectedOption(hash)
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [searchParams])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.interest) {
      newErrors.interest = "Please select an area of interest"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
    
  //   if (!validateForm()) {
  //     toast({
  //       variant: "destructive",
  //       title: "Validation Error",
  //       description: "Please fix the errors in the form before submitting.",
  //     })
  //     return
  //   }
    
  //   setIsSubmitting(true)
    
  //   try {
  //     const supabase = createClient()
  //     const { data: { user } } = await supabase.auth.getUser()
      
  //     // Parse name into first and last name
  //     const nameParts = formData.name.trim().split(" ")
  //     const firstName = nameParts[0]
  //     const lastName = nameParts.slice(1).join(" ") || ""
      
  //     const { error } = await supabase
  //       .from("volunteer_applications")
  //       .insert({
  //         user_id: user?.id || null,
  //         first_name: firstName,
  //         last_name: lastName,
  //         email: formData.email,
  //         phone: formData.phone || null,
  //         interests: formData.interest ? [formData.interest] : null,
  //         motivation: formData.message || null,
  //         status: "pending",
  //       })
      
  //     if (error) {
  //       throw error
  //     }
      
  //     setIsSubmitted(true)
  //     setFormData({ name: "", email: "", phone: "", interest: "", message: "" })
  //     setErrors({})
      
  //     // Scroll to the success message
  //     document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Something went wrong",
  //       description: "Please try again.",
  //     })
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // ✅ Validate first
  if (!validateForm()) {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: "Please fix the errors in the form before submitting.",
    })
    return
  }

  setIsSubmitting(true)

  try {
    const supabase = createClient()

    // ✅ SAFE auth (no lock error)
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const user = session?.user ?? null

    // ✅ Split name
    const nameParts = formData.name.trim().split(" ")
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(" ") || ""

    // ✅ Insert into DB
    const { error } = await supabase
      .from("volunteer_applications")
      .insert({
        user_id: user?.id || null,
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phone || null,

        // 🔥 IMPORTANT FIX (no array unless DB supports it)
        interests: formData.interest || null,

        motivation: formData.message || null,
        status: "pending",
      })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    // ✅ SUCCESS
    setIsSubmitted(true)

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    })

    setErrors({})

    // Scroll to success message
    setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
    }, 100)

  } catch (error) {
    console.error("Submit error:", error)

    toast({
      variant: "destructive",
      title: "Submission Failed",
      description: "Something went wrong. Please try again.",
    })
  } finally {
    setIsSubmitting(false)
  }
}

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 bg-secondary">
          <div className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Get Involved
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-3 mb-6">
                Join Our Mission
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                There are many ways to contribute to our work. Whether through volunteering, 
                partnerships, or sponsorship, your involvement makes a real difference.
              </p>
            </div>
          </div>
        </section>

        {/* Volunteer Options */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Ways to Get Involved
              </h2>
              <p className="text-muted-foreground text-lg">
                Choose the option that best fits your availability and interests.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {volunteerOptions.map((option) => (
                <Card 
                  key={option.id} 
                  id={option.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <option.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-serif text-xl">{option.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {option.commitment}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">
                      {option.description}
                    </CardDescription>
                    <ul className="space-y-2">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, interest: option.id }))
                        setSelectedOption(option.id)
                        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Volunteer */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <span className="font-medium text-sm uppercase tracking-wider opacity-80">
                    Why Volunteer With Us
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 mb-6">
                    Make a Lasting Impact
                  </h2>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Heart,
                      title: "Transform Lives",
                      description: "Your contribution directly improves the lives of children, women, and communities.",
                    },
                    {
                      icon: Users,
                      title: "Join a Community",
                      description: "Connect with like-minded individuals passionate about making a difference.",
                    },
                    {
                      icon: Calendar,
                      title: "Flexible Commitment",
                      description: "We offer opportunities for all schedules, from one-time events to ongoing roles.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="opacity-80 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/community-development.jpg"
                  alt="Volunteers working with community"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-primary font-medium text-sm uppercase tracking-wider">
                  Get Started
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
                  {selectedOption ? `Apply for ${interestLabels[selectedOption]}` : "Volunteer Application"}
                </h2>
                <p className="text-muted-foreground text-lg">
                  Fill out the form below and we will be in touch within 48 hours.
                </p>
                {selectedOption && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedOption(null)
                      setFormData(prev => ({ ...prev, interest: "" }))
                    }}
                  >
                    Change selection
                  </Button>
                )}
              </div>

              {isSubmitted ? (
                <Alert className="border-primary/20 bg-primary/5">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <AlertTitle className="text-lg font-semibold text-foreground">
                    Thank you for your interest!
                  </AlertTitle>
                  <AlertDescription className="text-muted-foreground mt-2">
                    <p className="mb-4">
                      Your application has been submitted successfully. We will contact you within 48 hours.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSubmitted(false)}
                    >
                      Submit Another Application
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : (
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-1">
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={errors.name ? "border-destructive" : ""}
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-1">
                          Email Address <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={errors.email ? "border-destructive" : ""}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
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
                        <Label htmlFor="interest" className="flex items-center gap-1">
                          Area of Interest <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.interest}
                          onValueChange={(value) => handleInputChange("interest", value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger className={errors.interest ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="global">Global Volunteer</SelectItem>
                            <SelectItem value="visit">Visit Centers</SelectItem>
                            <SelectItem value="partner">Partnership</SelectItem>
                            <SelectItem value="sponsor">Sponsorship</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.interest && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.interest}
                          </p>
                        )}
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
                      {isSubmitting ? (
                        <>
                          <Spinner className="mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-5 w-5" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Prefer to Donate?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              If you would like to support our work financially, every contribution 
              helps us reach more communities.
            </p>
            <Button size="lg" asChild>
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Make a Donation
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

// Allow dynamic rendering for this page (required because of useSearchParams and window.location)
export const dynamic = "force-dynamic"
