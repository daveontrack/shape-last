import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { AboutPreview } from "@/components/sections/about-preview"
import { ProgramsPreview } from "@/components/sections/programs-preview"
import { CentersPreview } from "@/components/sections/centers-preview"
import { ImpactSection } from "@/components/sections/impact"
import { CTASection } from "@/components/sections/cta"

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutPreview />
        <ProgramsPreview />
        <ImpactSection />
        <CentersPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
