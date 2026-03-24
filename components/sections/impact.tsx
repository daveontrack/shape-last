import { TrendingUp, Users, School, Droplets, Home } from "lucide-react"

const impactStats = [
  {
    icon: Users,
    number: "20,000+",
    label: "Lives Impacted",
    description: "Individuals directly benefiting from our programs",
  },
  {
    icon: School,
    number: "5,000+",
    label: "Children Educated",
    description: "Students receiving quality education",
  },
  {
    icon: Droplets,
    number: "30+",
    label: "Clean Water Projects",
    description: "Wells and water systems built",
  },
  {
    icon: Home,
    number: "50+",
    label: "Communities Served",
    description: "Villages with active programs",
  },
]

export function ImpactSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Our Impact</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Measuring Our Progress, Celebrating Our Impact
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Every number represents a life changed, a community transformed, and a step 
            closer to our vision of a thriving Ethiopia.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactStats.map((stat) => (
            <div 
              key={stat.label} 
              className="text-center p-8 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">{stat.number}</p>
              <p className="text-lg font-semibold mb-2">{stat.label}</p>
              <p className="text-sm text-primary-foreground/70">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
