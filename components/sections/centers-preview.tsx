import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, ArrowRight } from "lucide-react"

const centers = [
  {
    id: "shanto",
    name: "Shanto Center",
    location: "Shanto, SNNPR",
    description: "Our flagship center serving over 800 children with education and nutrition programs.",
    coordinates: { lat: 7.0546, lng: 37.5553 },
  },
  {
    id: "hawasa",
    name: "Hawasa Center",
    location: "Hawasa City",
    description: "Urban community center focusing on women empowerment and vocational training.",
    coordinates: { lat: 7.0622, lng: 38.4767 },
  },
  {
    id: "dale",
    name: "Dale Center",
    location: "Dale Woreda",
    description: "Rural development hub providing clean water access and agricultural support.",
    coordinates: { lat: 6.7833, lng: 38.2333 },
  },
  {
    id: "humbo",
    name: "Humbo Center",
    location: "Humbo District",
    description: "Community-driven initiatives for sustainable farming and reforestation.",
    coordinates: { lat: 6.7000, lng: 37.8333 },
  },
  {
    id: "boricha",
    name: "Boricha Center",
    location: "Boricha Woreda",
    description: "Healthcare and maternal care programs serving remote communities.",
    coordinates: { lat: 6.9167, lng: 38.2667 },
  },
  {
    id: "arbamich",
    name: "Arbamich Center",
    location: "Arbamich Town",
    description: "Youth development and skills training center for urban youth.",
    coordinates: { lat: 6.0333, lng: 37.5500 },
  },
]

export function CentersPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Presence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            6 Centers Across Ethiopia
          </h2>
          <p className="text-muted-foreground text-lg">
            Our centers serve as hubs for community transformation, providing essential 
            services and support to thousands of families across Southern Ethiopia.
          </p>
        </div>

        {/* Centers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centers.map((center) => (
            <Card key={center.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
              {/* Map Preview - Visual representation */}
              <div className="relative h-40 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <pattern id={`grid-${center.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-600"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${center.id})`} />
                    <circle cx="200" cy="100" r="8" className="fill-primary" />
                    <circle cx="200" cy="100" r="16" className="fill-primary/20" />
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <MapPin className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-primary" />
                  {center.location}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {center.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {center.description}
                </p>
                <Button variant="link" asChild className="p-0 h-auto text-primary">
                  <Link href={`/centers#${center.id}`}>
                    Visit Center
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/centers">
              Explore All Centers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
