import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"

export const metadata = {
  title: "Terms of Service | SHAPEthiopia",
  description: "Terms of Service for SHAPEthiopia - Read our terms and conditions for using our website and services.",
}

export default function TermsOfServicePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Terms of Service
              </h1>
              <p className="opacity-90">
                Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-10 prose prose-gray dark:prose-invert max-w-none">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    By accessing or using the SHAPEthiopia website and services, you agree to be bound by these 
                    Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Use of Services</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our services are provided for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                    <li>Making donations to support our charitable programs</li>
                    <li>Applying for volunteer opportunities</li>
                    <li>Accessing information about our programs and impact</li>
                    <li>Subscribing to newsletters and updates</li>
                    <li>Creating and managing your account</li>
                  </ul>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Donations</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    When making a donation through our website:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                    <li>All donations are voluntary and non-refundable unless otherwise specified</li>
                    <li>Donations made via Telebirr, CBE, or bank transfer require verification</li>
                    <li>You must provide accurate payment and contact information</li>
                    <li>Tax receipts are provided upon request for eligible donations</li>
                    <li>We reserve the right to decline any donation</li>
                  </ul>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">User Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    When creating an account, you agree to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Accept responsibility for all activities under your account</li>
                  </ul>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Volunteer Applications</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    By submitting a volunteer application, you acknowledge that acceptance is subject to our 
                    review process, background checks where applicable, and availability of positions. 
                    We reserve the right to accept or decline any application at our discretion.
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    All content on this website, including text, graphics, logos, images, and software, is the 
                    property of SHAPEthiopia Foundation and is protected by copyright and trademark laws. 
                    You may not reproduce, distribute, or use any content without our written permission.
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Prohibited Activities</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You agree not to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                    <li>Use our services for any unlawful purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt our services</li>
                    <li>Upload malicious code or content</li>
                    <li>Impersonate any person or entity</li>
                    <li>Make fraudulent donations or transactions</li>
                  </ul>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    SHAPEthiopia Foundation shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages arising from your use of our services. Our total 
                    liability shall not exceed the amount you have donated in the past 12 months.
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We reserve the right to modify these terms at any time. We will notify users of significant 
                    changes via email or website notification. Continued use of our services after changes 
                    constitutes acceptance of the modified terms.
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Governing Law</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    These Terms of Service shall be governed by and construed in accordance with the laws of 
                    the Federal Democratic Republic of Ethiopia, without regard to its conflict of law provisions.
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these Terms of Service, please contact us at:
                  </p>
                  <ul className="list-none pl-0 text-muted-foreground space-y-1 mt-2">
                    <li>Email: legal@shapeethiopia.org</li>
                    <li>Phone: +251 911 234 567</li>
                    <li>Address: Bole Sub City, Woreda 03, Addis Ababa, Ethiopia</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
