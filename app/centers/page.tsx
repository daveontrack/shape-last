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
    location: "Shanto, SNNPR Region",
    description: "Our flagship center and the heart of SHAPEthiopia's operations. The Shanto Center serves over 800 children with comprehensive education and nutrition programs, while also supporting women's empowerment initiatives in the surrounding communities.",
    established: "2005",
    beneficiaries: "1,200+",
    programs: ["Children's Education", "Nutrition Program", "Women's Groups"],
    coordinates: { lat: 7.0546, lng: 37.5553 },
    mapUrl: "https://maps.google.com/?q=7.0546,37.5553&ll=7.0546,37.5553&z=15",
    highlights: [
      "First SHAPEthiopia center established",
      "Full primary school facility",
      "Daily feeding program for 800+ children",
      "Vocational training center for women",
    ],
  },
  {
    id: "hawasa",
    name: "Hawasa Center",
    location: "Hawasa City, Sidama Region",
    description: "Located in the vibrant city of Hawasa, this urban center focuses on women empowerment and vocational training. We provide skills development, microfinance support, and business mentorship to help women achieve economic independence.",
    established: "2010",
    beneficiaries: "800+",
    programs: ["Women Empowerment", "Vocational Training", "Microfinance"],
    coordinates: { lat: 7.0622, lng: 38.4767 },
    mapUrl: "https://maps.google.com/?q=7.0622,38.4767&ll=7.0622,38.4767&z=15",
    highlights: [
      "Urban women's resource center",
      "Skills training workshops",
      "Business incubation support",
      "Community savings groups",
    ],
  },
  {
    id: "dale",
    name: "Dale Center",
    location: "Dale Woreda, Sidama Region",
    description: "The Dale Center serves rural communities with a focus on clean water access and agricultural development. We've constructed multiple wells and provide training in sustainable farming practices.",
    established: "2012",
    beneficiaries: "3,000+",
    programs: ["Clean Water", "Agriculture", "Community Health"],
    coordinates: { lat: 6.7833, lng: 38.2333 },
    mapUrl: "https://maps.google.com/?q=6.7833,38.2333&ll=6.7833,38.2333&z=15",
    highlights: [
      "Multiple clean water wells",
      "Sustainable agriculture training",
      "Community health education",
      "Environmental conservation projects",
    ],
  },
  {
    id: "humbo",
    name: "Humbo Center",
    location: "Humbo District, SNNPR",
    description: "Situated in the lush Humbo district, this center champions sustainable development through reforestation initiatives and community-driven farming programs that improve food security and environmental health.",
    established: "2014",
    beneficiaries: "2,500+",
    programs: ["Reforestation", "Sustainable Farming", "Community Development"],
    coordinates: { lat: 6.7000, lng: 37.8333 },
    mapUrl: "https://maps.google.com/?q=6.7000,37.8333&ll=6.7000,37.8333&z=15",
    highlights: [
      "Large-scale reforestation project",
      "Farmer cooperative support",
      "Climate-smart agriculture",
      "Youth environmental education",
    ],
  },
  {
    id: "boricha",
    name: "Boricha Center",
    location: "Boricha Woreda, Sidama Region",
    description: "The Boricha Center specializes in healthcare and maternal care programs, providing essential medical services and health education to remote communities with limited access to healthcare facilities.",
    established: "2016",
    beneficiaries: "4,000+",
    programs: ["Healthcare", "Maternal Care", "Health Education"],
    coordinates: { lat: 6.9167, lng: 38.2667 },
    mapUrl: "https://maps.google.com/?q=6.9167,38.2667&ll=6.9167,38.2667&z=15",
    highlights: [
      "Community health clinic",
      "Maternal and child health programs",
      "Health worker training",
      "Mobile health outreach",
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
