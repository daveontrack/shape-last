import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, GraduationCap, Heart, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Centers",
  description: "Visit SHAPEthiopia's community centers across Ethiopia - Shanto, Hawasa, Dale, Humbo, Boricha, and Arbamich. Each center serves as a hub for community transformation.",
}

const centers = [
  {
    id: "shanto",
    name: "Shanto Center",
    location: "Shanto village, Damot Pulassa district, Wolayta Zone, SNNPRS, Ethiopia",
    description: "The Shanto H.O.P.E. Center supports 150 children and a few widowed women, providing education, nutritious meals, medical care, hygiene materials, school supplies, and mentorship. Children pre-K through 8th grade attend Kamfourd School of Excellence, while 9th–12th graders attend Shanto High School with food stipends. During summer, children continue learning and receive meals at the center.",
    established: "2005",
    beneficiaries: "150 children and a few widows",
      programs: [
    "Educational support: uniforms, books, stationery",
    "Nutrition: hot meals in school or food items for home",
    "Medical care and annual pediatric screenings",
    "Hygiene support: soap, lotion, sanitary pads",
    "Mentorship and life skills",
    "Community worker and leader training for OVC support"
  ],
    coordinates: { lat: 7.0546, lng: 37.5553 },
    mapUrl: "https://maps.google.com/?q=7.0546,37.5553&ll=7.0546,37.5553&z=15",
  highlights: [
    "Supports 150 children and few widowed women",
    "Partnership with Kamfourd School of Excellence and Shanto High School",
    "Daily meals and summer learning programs",
    "Comprehensive child development services",
    "Mentorship and staff engagement",
    "Community development: hygiene, health, clean water",
    "U.S. partner: Partners with Ethiopia, tax-deductible donations"
  ],
},
  {
    id: "hawasa",
    name: "Hawassa Center",
    location: "Hawasa City, Sidama Region",
    description: "The Hawassa H.O.P.E. Center serves vulnerable children and their families in Tilte and Fara Kebeles. It is a drop-in center where 150 children can come year-round for fun activities, hot meals, and educational tutoring. Sponsors support the entire center, providing children with school access, nutritious meals, medical and hygiene care, and mentorship opportunities.",
    established: "2010",
    beneficiaries: "150 children",
    programs: [
    "Educational support and tutoring",
    "Daily nutritious meals",
    "Medical care and hygiene support",
    "Mentorship and life skills",
  ],
    coordinates: { lat: 7.0622, lng: 38.4767 },
    mapUrl: "https://maps.google.com/?q=7.0622,38.4767&ll=7.0622,38.4767&z=15",
  highlights: [
    "Located in Tabor Sub-City, Hawassa",
    "Drop-in center for 150 children year-round",
    "Fun activities, tutoring, and hot meals",
    "Sponsorship model supports the entire center",
    "Access to medical care and hygiene support",
    "Opportunities for mentors and volunteers",
    "Annual sponsor visits and program updates",
  ],
  },
  {
    id: "dale",
    name: "Dale Center",
    location: "Awada village, Yirgalem, Dale Woreda, Sidama Region, Ethiopia",
  description: "H.O.P.E. (Helping Orphans Prosper through Education) was established to break the cycle of poverty for orphans and vulnerable children in Dale. The center hosts 150 children and a few widowed women, providing education, nutrition, mentorship, and community support programs.",
  established: "2011",
  beneficiaries: "150 children and a few widows",
      programs: [
    "Education support for orphans",
    "Nutrition and daily meals",
    "Mentorship and life skills",
    "Community development: clean water, sanitation, hygiene, environmental protection",
  ],
    coordinates: { lat: 6.7833, lng: 38.2333 },
    mapUrl: "https://maps.google.com/?q=6.7833,38.2333&ll=6.7833,38.2333&z=15",
  highlights: [
    "First H.O.P.E. Center in Dale established in 2011",
    "Supports 150 orphan and vulnerable children",
    "Includes a few widowed women in programs",
    "Educational tutoring and mentorship provided",
    "Community development initiatives (water, sanitation, hygiene, environment)",
    "Located at Awada village, below Yirgalem Hospital",
    "Breaking the cycle of poverty in Dale Woreda",
  ],
  },
  {
    id: "humbo",
    name: "Humbo Center",
    location: "Humbo/Tebela district, Wolayta Zone, Southern Ethiopia",
    description: "The Humbo/Tebela H.O.P.E. Center serves 150 orphan and vulnerable children, providing daily meals, school supplies, uniforms, school fees, hygiene materials, and medical care to support their education and well-being.",
    established: "2014",
    beneficiaries: "2,500+",
      programs: [
    "Daily nutritious meals",
    "Educational support: uniforms, books, school fees",
    "Medical care and health support",
    "Hygiene materials provision"
  ],
    coordinates: { lat: 6.7000, lng: 37.8333 },
    mapUrl: "https://maps.google.com/?q=6.7000,37.8333&ll=6.7000,37.8333&z=15",
  highlights: [
    "Supports 150 orphan and vulnerable children",
    "Daily meals and summer learning programs",
    "Comprehensive education support",
    "Health and hygiene care included"
  ]
  },
  {
    id: "boricha",
    name: "Boricha Center",
  location: "Yirba village, Boricha Woreda, Sidama Zone, SNNPRS, Ethiopia",
  description: "Launched in 2016, Boricha H.O.P.E. Center serves 150 orphan and vulnerable children, providing daily meals, school supplies, uniforms, school fees, hygiene materials, and medical care. The center also addresses marginalized widowed women through community development initiatives.",
  established: "2016",
  beneficiaries: "150 children and some widowed women",
      programs: [
    "Child and Youth Development Program",
    "Widows’ Empowerment Program (Poultry & Livestock Development)",
    "Daily meals, school supplies, uniforms, school fees",
    "Medical care and hygiene support",
    "Community development: clean water, sanitation, environmental protection"
  ],
    coordinates: { lat: 6.9167, lng: 38.2667 },
    mapUrl: "https://maps.google.com/?q=6.9167,38.2667&ll=6.9167,38.2667&z=15",
  highlights: [
    "Supports 150 children and marginalized widowed women",
    "Addresses severe socio-economic challenges",
    "Provides education, nutrition, medical care, and hygiene support",
    "Boricha Widows’ Hope Poultry & Livestock Development Project",
    "Focus on clean water, sanitation, and environmental protection",
    "Managed in partnership with Partners With Ethiopia"
  ],
  },
  {
    id: "arbamich",
    name: "Arbamich Center",
    location: "Arbamich Town, Gamo Zone",
    description: "Our newest center in Arbamich focuses on youth development and skills training. We provide educational support, vocational training, and mentorship to help young people build successful futures.",
    established: "2019",
    beneficiaries: "600+",
    programs: ["Youth Development", "Skills Training", "Education Support"],
    coordinates: { lat: 6.0333, lng: 37.5500 },
    mapUrl: "https://maps.google.com/?q=6.0333,37.5500&ll=6.0333,37.5500&z=15",
    highlights: [
      "Youth skills development center",
      "Computer and IT training",
      "Career guidance programs",
      "Sports and recreation facilities",
    ],
  },
]

export default function CentersPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 bg-secondary">
          <div className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Centers
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-3 mb-6">
                6 Centers Serving Communities Across Ethiopia
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Each of our centers serves as a hub for community transformation, providing
                essential services and support to thousands of families in Southern Ethiopia.
              </p>
            </div>
          </div>
        </section>

        {/* Map Overview */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-amber-50">
              {/* Visual Map Background */}
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-600" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                </svg>
              </div>
              {/* Center Markers */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-4xl h-full">
                  {/* Shanto */}
                  <div className="absolute left-[30%] top-[25%] group">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse">
                      <MapPin className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div className="absolute left-8 top-0 px-2 py-1 bg-background rounded text-xs font-medium shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Shanto</div>
                  </div>
                  {/* Hawasa */}
                  <div className="absolute left-[65%] top-[28%] group">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: '0.1s' }}>
                      <MapPin className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div className="absolute left-8 top-0 px-2 py-1 bg-background rounded text-xs font-medium shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Hawasa</div>
                  </div>
                  {/* Dale */}
                  <div className="absolute left-[58%] top-[45%] group">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: '0.2s' }}>
                      <MapPin className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div className="absolute left-8 top-0 px-2 py-1 bg-background rounded text-xs font-medium shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Dale</div>
                  </div>
                  {/* Humbo */}
                  <div className="absolute left-[35%] top-[50%] group">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: '0.3s' }}>
                      <MapPin className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div className="absolute left-8 top-0 px-2 py-1 bg-background rounded text-xs font-medium shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Humbo</div>
                  </div>
                  {/* Boricha */}
                  <div className="absolute left-[62%] top-[38%] group">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: '0.4s' }}>
                      <MapPin className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div className="absolute left-8 top-0 px-2 py-1 bg-background rounded text-xs font-medium shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Boricha</div>
                  </div>
                  {/* Arbamich */}
                  <div className="absolute left-[28%] top-[70%] group">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}>
                      <MapPin className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div className="absolute left-8 top-0 px-2 py-1 bg-background rounded text-xs font-medium shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Arbamich</div>
                  </div>
                </div>
              </div>
              {/* Legend */}
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-lg shadow text-sm">
                <span className="font-medium">Southern Ethiopia</span> - 6 Community Centers
              </div>
            </div>
          </div>
        </section>

        {/* Centers Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {centers.map((center, index) => (
                <Card
                  key={center.id}
                  id={center.id}
                  className="overflow-hidden border-0 shadow-lg"
                >
                  <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? "" : ""}`}>
                    {/* Map Visual */}
                    <div className={`relative h-[300px] lg:h-auto min-h-[300px] bg-gradient-to-br from-green-100 to-green-200 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="absolute inset-0 opacity-20">
                        <svg viewBox="0 0 600 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                          <defs>
                            <pattern id={`center-grid-${center.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-600" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#center-grid-${center.id})`} />
                        </svg>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                          <MapPin className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-background/95 backdrop-blur-sm flex items-center gap-2 shadow-md">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{center.location}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className={`p-8 lg:p-12 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="space-y-6">
                        <div>
                          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                            {center.name}
                          </h2>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Est.</span> {center.established}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {center.beneficiaries} beneficiaries
                            </span>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          {center.description}
                        </p>

                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Programs</h3>
                          <div className="flex flex-wrap gap-2">
                            {center.programs.map((program) => (
                              <span
                                key={program}
                                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                              >
                                {program}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Highlights</h3>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {center.highlights.map((highlight) => (
                              <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <GraduationCap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                          <Button asChild>
                            <Link href="/volunteer#visit">
                              Visit This Center
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <a href={center.mapUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Get Directions
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Want to Visit Our Centers?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Experience our work firsthand. We welcome visitors, volunteers, and partners
              to tour our centers and see the impact of community-driven development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/volunteer#visit">
                  Plan a Visit
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  Support Our Centers
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
