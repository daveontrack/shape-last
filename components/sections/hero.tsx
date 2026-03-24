import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-ethiopia.jpg"
          alt="Ethiopian community members working together"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 text-background animate-fade-up">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Transforming Lives Since 2005</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-background leading-tight animate-fade-up animation-delay-100">
            Empowering Communities,{" "}
            <span className="text-primary">Transforming Lives</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-background/90 max-w-2xl mx-auto leading-relaxed animate-fade-up animation-delay-200">
            Join us in creating sustainable change across Ethiopia through education, 
            clean water, women empowerment, and community development programs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-up animation-delay-300">
            <Button size="lg" asChild className="text-base px-8">
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 bg-background/10 border-background/30 text-background hover:bg-background/20 hover:text-background">
              <Link href="/volunteer">
                Become a Volunteer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 animate-fade-up animation-delay-400">
            {[
              { number: "20K+", label: "Lives Impacted" },
              { number: "6", label: "Centers" },
              { number: "50+", label: "Communities" },
              { number: "18", label: "Years of Service" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-background">{stat.number}</p>
                <p className="text-sm text-background/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-background/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-background/50" />
        </div>
      </div>
    </section>
  )
}
