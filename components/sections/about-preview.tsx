import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Target, Eye, Gem, ArrowRight } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To educate and support vulnerable children, empower women, and strengthen communities to break the cycle of poverty, hunger, illiteracy, and disease while fostering dignity, hope, and opportunity.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "A future where all people in Ethiopia live healthy, happy, productive, and dignified lives, with access to education, healthcare, clean water, and economic empowerment.",
  },
  {
    icon: Gem,
    title: "Our Core Values",
    description: "Accountability, responsibility, transparency, integrity, equity, respect, collaboration, participation, hard work, courage, and compassion guide every action and program we undertake.",
  },
]

export function AboutPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                About SHAPEthiopia
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
                Empowering Children, Women, and Communities Across Ethiopia
              </h2>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
    SHAPEthiopia works to break the cycle of poverty, hunger, illiteracy, and disease by providing vulnerable children with education and nutritious meals, empowering women through income-generating activities and vocational training, and strengthening communities with sustainable development programs including clean water, sanitation, and healthcare initiatives.
            </p>

            <div className="space-y-6">
              {values.map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild size="lg">
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img
                  src="/images/children-education.jpg"
                  alt="Children learning in classroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <img
                  src="/images/women-empowerment.jpg"
                  alt="Women empowerment program"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <img
                  src="/images/clean-water.jpg"
                  alt="Clean water initiative"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img
                  src="/images/community-development.jpg"
                  alt="Community development project"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
