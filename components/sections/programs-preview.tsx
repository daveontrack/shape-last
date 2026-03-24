import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Droplets, Building2, ArrowRight } from "lucide-react"

const programs = [
  {
    id: "children",
    icon: GraduationCap,
    title: "Children's Education",
    description: "Providing quality education, school supplies, and nutritional support to over 5,000 children across our centers.",
    image: "/images/children-education.jpg",
    stats: { number: "5,000+", label: "Children Supported" },
  },
  {
    id: "women",
    icon: Users,
    title: "Women Empowerment",
    description: "Empowering women through vocational training, microfinance programs, and entrepreneurship support.",
    image: "/images/women-empowerment.jpg",
    stats: { number: "2,500+", label: "Women Trained" },
  },
  {
    id: "water",
    icon: Droplets,
    title: "Clean Water Access",
    description: "Building wells and water systems to provide clean, safe drinking water to rural communities.",
    image: "/images/clean-water.jpg",
    stats: { number: "30+", label: "Wells Built" },
  },
  {
    id: "community",
    icon: Building2,
    title: "Community Development",
    description: "Supporting infrastructure projects, healthcare initiatives, and sustainable agriculture programs.",
    image: "/images/community-development.jpg",
    stats: { number: "50+", label: "Communities Served" },
  },
]

export function ProgramsPreview() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Programs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Creating Lasting Impact Through Action
          </h2>
          <p className="text-muted-foreground text-lg">
            Our comprehensive programs address the most pressing needs of Ethiopian communities, 
            from education and healthcare to economic empowerment and infrastructure.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <Card key={program.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <program.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-background">
                    <p className="text-2xl font-bold">{program.stats.number}</p>
                    <p className="text-sm text-background/80">{program.stats.label}</p>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-serif text-xl">{program.title}</CardTitle>
                <CardDescription className="text-base">{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0 h-auto text-primary">
                  <Link href={`/programs#${program.id}`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/programs">
              View All Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
