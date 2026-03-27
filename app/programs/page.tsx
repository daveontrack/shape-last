import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Droplets, Building2, Heart, ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Programs",
  description: "Discover SHAPEthiopia's community development programs including children's education, women empowerment, clean water access, and sustainable development initiatives.",
}

const programs = [
  {
    id: "children",
    icon: GraduationCap,
    title: "Children & Youth Development Program",
    subtitle: "Investing in Tomorrow's Leaders",
    description: "Our Children's Education Program provides comprehensive support to over 5,000 children across Ethiopia, ensuring they have access to quality education, nutritious meals, and a safe learning environment.",
    image: "/images/children-education.jpg",
  stats: [
    { number: "5,000+", label: "Children Enrolled" },
    { number: "600+", label: "Children Fed Daily" },
    { number: "12,000+", label: "Exercise Books Distributed" },
    { number: "25,000+", label: "Pens & Pencils Distributed" },
  ],
  features: [
    "Quality primary and secondary education",
    "Daily nutritious meals",
    "School supplies, uniforms, and shoes",
    "Tutoring, mentorship, and safe learning environments",
    "H.O.P.E. Child Development Program supporting orphans and vulnerable children",
    "Meserete Hiwot Fund for youth career guidance, skills, and job placement",
    "Medical care and general health screenings",
    "Hygiene and sanitation support for children and adolescents",
    "Widows' empowerment and vocational training programs",
    "Higher education support and youth leadership development",
    "Community engagement and development programs",
  ],
  },
  {
    id: "women",
    icon: Users,
    title: "Women Empowerment Program",
    subtitle: "Enabling Women to Realize Their Potential",
  description: "SHAPEthiopia's Women's Empowerment Program supports impoverished women to gain skills, start businesses, and provide for their families. Through our programs, women become economically independent and contribute to healthier, more resilient communities.",
    image: "/images/women-empowerment.jpg",
    stats: [
      { number: "2,500+", label: "Women Trained" },
      { number: "500+", label: "Businesses Started" },
      { number: "85%", label: "Income Increase" },
    ],
      programs: [
    {
      name: "Widows' Hope Crops Farming Project",
      description: "Supports widows in rural Ethiopia to restart small-scale farms with improved seeds, farming training, and technical support. Women produce maize, teff, sorghum, beans, potatoes, sweet potatoes, and onions, providing nutritious food and sustainable income.",
      impact: "71 women supported in 2016, producing high-yield crops and contributing to the Crops for Widows Fund for future beneficiaries."
    },
    {
      name: "Widows' Hope Poultry & Livestock Development Project",
      description: "Provides widows with chickens, sheep, or cows to generate nutritious food and income. SHAPEthiopia offers training, ongoing support, and veterinary care. Beneficiaries repay small amounts to sustain the Livestock for Widows Fund.",
      impact: "Over 100 widows benefited with livestock, ensuring food security and income generation."
    },
    {
      name: "Widows' Hope Handcrafting & Small Business Project",
      description: "Trains widows in handcrafting (pottery, sewing, bamboo products), money management, and small business skills. A small seed fund is provided to help start their own businesses, creating economic independence.",
      impact: "Hundreds of widows trained and supported in income-generating activities."
    }
  ],
    features: [
      "Vocational skills training",
      "Microfinance and savings groups",
      "Business development support",
      "Financial literacy education",
      "Leadership development",
      "Community support networks",
    ],
  },
  {
    id: "water",
    icon: Droplets,
    title: "Clean Water Access",
    subtitle: "The Foundation of Healthy Communities",
    description: "Access to clean water is fundamental to community health. We work with local communities to build wells, water systems, and sanitation facilities that serve thousands of families.",
    image: "/images/clean-water.jpg",
    stats: [
      { number: "30+", label: "Wells Built" },
      { number: "15,000+", label: "People Served" },
      { number: "90%", label: "Disease Reduction" },
    ],
    features: [
      "Deep well construction",
      "Water system maintenance",
      "Sanitation facilities",
      "Hygiene education programs",
      "Community water committees",
      "Sustainable water management",
    ],
  },
  {
    id: "community",
    icon: Building2,
    title: "Community Development",
    subtitle: "Building Sustainable Futures Together",
    description: "Our community development initiatives focus on creating sustainable infrastructure, supporting healthcare, and promoting agricultural best practices that enable communities to thrive.",
    image: "/images/community-development.jpg",
    stats: [
      { number: "50+", label: "Communities Reached" },
      { number: "100+", label: "Projects Completed" },
      { number: "20,000+", label: "Lives Impacted" },
    ],
    features: [
      "Infrastructure development",
      "Healthcare support programs",
      "Sustainable agriculture training",
      "Community center construction",
      "Environmental conservation",
      "Local leadership development",
    ],
  },
]

export default function ProgramsPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 bg-secondary">
          <div className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Programs
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-3 mb-6">
                Transforming Lives Through Sustainable Programs
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our comprehensive programs address the most pressing needs of Ethiopian communities, 
                from education and healthcare to economic empowerment and infrastructure development.
              </p>
            </div>
          </div>
        </section>

        {/* Programs List */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 space-y-32">
            {programs.map((program, index) => (
              <div
                key={program.id}
                id={program.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Stats Overlay */}
                  <div className="absolute -bottom-6 left-6 right-6 bg-card rounded-xl shadow-lg p-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {program.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-2xl font-bold text-primary">{stat.number}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <program.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <span className="text-primary font-medium text-sm">{program.subtitle}</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
                      {program.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {program.description}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4 pt-4">
                    <Button asChild>
                      <Link href="/donate">
                        <Heart className="mr-2 h-4 w-4" />
                        Support This Program
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/volunteer">
                        Get Involved
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Your support enables us to continue transforming lives across Ethiopia. 
              Join us in creating lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/volunteer">
                  Become a Volunteer
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
