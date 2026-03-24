import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | SHAPEthiopia",
  description: "Privacy policy for SHAPEthiopia - Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Privacy Policy
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
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    SHAPEthiopia Foundation ("we," "our," or "us") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                    when you visit our website or use our services.
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may collect information about you in a variety of ways, including:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                    <li><strong>Personal Data:</strong> Name, email address, phone number, mailing address, and other similar contact information you provide when donating, volunteering, or contacting us.</li>
                    <li><strong>Payment Information:</strong> Payment method details for processing donations, including Telebirr, CBE, bank transfer, or card details (processed securely through our payment partners).</li>
                    <li><strong>Account Data:</strong> Username, password, and preferences when you create an account.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent.</li>
                  </ul>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                    <li>Processing your donations and sending receipts</li>
                    <li>Managing volunteer applications and communications</li>
                    <li>Sending newsletters and updates about our programs (with your consent)</li>
                    <li>Responding to your inquiries and providing support</li>
                    <li>Improving our website and services</li>
                    <li>Complying with legal obligations</li>
                  </ul>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We implement appropriate technical and organizational security measures to protect your 
                    personal information. This includes encryption of sensitive data, secure servers, and 
                    regular security assessments. However, no method of transmission over the Internet is 
                    100% secure, and we cannot guarantee absolute security.
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Sharing Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share 
                    your information with:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                    <li>Payment processors to complete transactions</li>
                    <li>Service providers who assist in our operations</li>
                    <li>Legal authorities when required by law</li>
                  </ul>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Our website uses cookies to enhance your experience. You can set your browser to refuse 
                    cookies, but some features of our website may not function properly without them.
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us at:
                  </p>
                  <ul className="list-none pl-0 text-muted-foreground space-y-1 mt-2">
                    <li>Email: privacy@shapeethiopia.org</li>
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
