"use client"

import { useState } from "react"
import Link from "next/link"
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
import { 
  Mail, Phone, MapPin, Clock, Send, MessageCircle, 
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  CheckCircle, AlertCircle
} from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "SHAPEthiopia Head Office",
      "Bole Sub City, Woreda 03",
      "Addis Ababa, Ethiopia",
    ],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [
      "info@shapeethiopia.org",
      "volunteer@shapeethiopia.org",
      "donate@shapeethiopia.org",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [
      "+251 911 234 567",
      "+251 911 234 568",
      "Mon-Fri: 8AM - 5PM (EAT)",
    ],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: [
      "Monday - Friday: 8:00 AM - 5:00 PM",
      "Saturday: 9:00 AM - 1:00 PM",
      "Sunday: Closed",
    ],
  },
]

const socialLinks = [
  { href: "https://facebook.com/shapeethiopia", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com/shapeethiopia", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com/shapeethiopia", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/company/shapeethiopia", icon: Linkedin, label: "LinkedIn" },
  { href: "https://youtube.com/shapeethiopia", icon: Youtube, label: "YouTube" },
]

type FormErrors = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

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
    
    if (!formData.subject) {
      newErrors.subject = "Please select a subject"
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
      })
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    toast({
      title: "Message Sent Successfully",
      description: "Thank you for contacting us. We will respond within 24-48 hours.",
    })
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setErrors({})
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
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
                Contact Us
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-3 mb-6">
                Get in Touch
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Have questions about our programs, want to volunteer, or interested in 
                partnering with us? We would love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info) => (
                <Card key={info.title} className="border-0 shadow-lg text-center">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl flex items-center gap-2">
                      <MessageCircle className="w-6 h-6 text-primary" />
                      Send Us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we will get back to you within 24-48 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                          <Label htmlFor="subject" className="flex items-center gap-1">
                            Subject <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => handleInputChange("subject", value)}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className={errors.subject ? "border-destructive" : ""}>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="volunteer">Volunteering</SelectItem>
                              <SelectItem value="donate">Donations</SelectItem>
                              <SelectItem value="partner">Partnerships</SelectItem>
                              <SelectItem value="media">Media Inquiry</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.subject && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.subject}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="flex items-center gap-1">
                          Your Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="How can we help you?"
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className={errors.message ? "border-destructive" : ""}
                          disabled={isSubmitting}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Spinner className="mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Map & Social */}
              <div className="space-y-8">
                {/* Map */}
                <Card className="border-0 shadow-xl overflow-hidden">
                  <div className="relative h-[300px] bg-gradient-to-br from-green-100 to-green-200">
                    <div className="absolute inset-0 opacity-20">
                      <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                          <pattern id="office-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-600"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#office-grid)" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-lg shadow text-sm">
                      <span className="font-medium">Addis Ababa, Ethiopia</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg font-semibold mb-2">Head Office Location</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Bole Sub City, Woreda 03, Addis Ababa, Ethiopia
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <a 
                        href="https://maps.google.com/?q=8.9806,38.7578" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Get Directions
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <h3 className="font-serif text-lg font-semibold mb-4">Connect With Us</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Follow us on social media for the latest updates, stories, and ways to get involved.
                    </p>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Link */}
                <Card className="border-0 shadow-xl bg-secondary">
                  <CardContent className="pt-6">
                    <h3 className="font-serif text-lg font-semibold mb-2">Have Questions?</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Check out our frequently asked questions for quick answers about 
                      our programs, donations, and volunteering.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/about#faq">
                        View FAQs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="opacity-90 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of supporters who are helping transform communities across Ethiopia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/donate">
                  Donate Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/volunteer">
                  Volunteer With Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
