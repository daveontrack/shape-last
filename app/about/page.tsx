import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Target, Eye, Heart, Users, Shield, Handshake, Award, 
  ArrowRight, CheckCircle, TrendingUp 
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SHAPEthiopia's mission, vision, values, and 18+ years of community development work across Ethiopia. Meet our team and understand our approach.",
}

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every community with empathy and genuine care for their wellbeing.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We maintain the highest standards of transparency and accountability in all our work.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "We work alongside communities, not for them, ensuring local ownership of solutions.",
  },
  {
    icon: TrendingUp,
    title: "Sustainability",
    description: "We design programs that create lasting change and empower self-reliance.",
  },
]

const milestones = [
  { year: "2005", title: "Founded", description: "SHAPEthiopia established with first center in Shanto" },
  { year: "2008", title: "First 500 Children", description: "Reached milestone of 500 children in education program" },
  { year: "2010", title: "Hawasa Center", description: "Opened second center focusing on women empowerment" },
  { year: "2012", title: "Clean Water Initiative", description: "Launched clean water program with first 10 wells" },
  { year: "2015", title: "10,000 Lives", description: "Programs reached over 10,000 beneficiaries" },
  { year: "2019", title: "6th Center", description: "Opened Arbamich center for youth development" },
  { year: "2024", title: "20,000+ Impact", description: "Now serving over 20,000 people across 6 centers" },
]

const leadership = [
  {
    name: "Dr. Abebe Tadesse",
    role: "Executive Director",
    bio: "20+ years in community development across East Africa.",
  },
  {
    name: "Meron Haile",
    role: "Programs Director",
    bio: "Expert in education and child welfare programs.",
  },
  {
    name: "Samuel Bekele",
    role: "Operations Manager",
    bio: "Oversees all center operations and field teams.",
  },
  {
    name: "Hanna Girma",
    role: "Development Director",
    bio: "Leads fundraising and partnership initiatives.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 bg-secondary">
          <div className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                About Us
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-3 mb-6">
                Our Story of Impact
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                For over 18 years, SHAPEthiopia has been dedicated to empowering 
                communities and transforming lives across Ethiopia through sustainable 
                development programs.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero-ethiopia.jpg"
                  alt="Ethiopian community members"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              <div className="space-y-8">
                {/* Vision */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed pl-15">
                    A transformed Ethiopia where every community thrives with access to 
                    quality education, clean water, healthcare, and economic opportunities, 
                    enabling all individuals to live with dignity and hope.
                  </p>
                </div>

                {/* Mission */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed pl-15">
                    To empower vulnerable communities in Ethiopia through sustainable 
                    development programs that foster self-reliance, dignity, and lasting 
                    transformation by addressing root causes of poverty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Values
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
                The Principles That Guide Us
              </h2>
              <p className="text-muted-foreground text-lg">
                Our core values shape every decision we make and every program we implement.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="text-center border-0 shadow-lg">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 lg:order-2">
                <div>
                  <span className="text-primary font-medium text-sm uppercase tracking-wider">
                    Our Approach
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
                    Community-Driven Development
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We believe that sustainable change comes from within communities. 
                    Our approach centers on empowering local leaders, building capacity, 
                    and creating systems that communities can maintain independently.
                  </p>
                </div>

                <ul className="space-y-4">
                  {[
                    "Partner with local leaders and community organizations",
                    "Conduct thorough needs assessments before implementing programs",
                    "Build local capacity through training and mentorship",
                    "Ensure community ownership of all initiatives",
                    "Measure impact and continuously improve our methods",
                    "Create sustainable systems that outlast our direct involvement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden lg:order-1">
                <Image
                  src="/images/team-meeting.jpg"
                  alt="SHAPEthiopia team meeting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-medium text-sm uppercase tracking-wider opacity-80">
                Our Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 mb-6">
                18+ Years of Impact
              </h2>
              <p className="opacity-80 text-lg">
                From our humble beginnings to serving over 20,000 people today.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary-foreground/20 hidden lg:block" />
              
              <div className="space-y-8 lg:space-y-0">
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.year}
                    className={`relative lg:flex lg:items-center ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                      <div className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
                        <span className="text-2xl font-bold">{milestone.year}</span>
                        <h3 className="font-serif text-xl font-semibold mt-2">{milestone.title}</h3>
                        <p className="opacity-80 mt-2">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-foreground hidden lg:block" />
                    
                    {/* Spacer for alternating layout */}
                    <div className="lg:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Governance / Leadership */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Governance
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
                Leadership Team
              </h2>
              <p className="text-muted-foreground text-lg">
                Our dedicated team brings decades of experience in community development, 
                education, and nonprofit management.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((person) => (
                <Card key={person.name} className="text-center border-0 shadow-lg overflow-hidden">
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <Users className="w-20 h-20 text-muted-foreground/30" />
                  </div>
                  <CardContent className="pt-6 pb-6">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {person.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mt-1">{person.role}</p>
                    <p className="text-muted-foreground text-sm mt-3">{person.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                SHAPEthiopia is governed by a Board of Directors comprised of experienced 
                professionals committed to our mission.
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Contact Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Join Our Mission
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Whether through donations, volunteering, or partnerships, there are many 
              ways to be part of the SHAPEthiopia family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/volunteer">
                  Get Involved
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
