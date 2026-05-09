import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CinematicFlavourShowcase } from "@/components/cinematic-flavour-showcase"
import { BentoGrid } from "@/components/bento-grid"
import { AboutSection } from "@/components/about-section"
import { SocialSection } from "@/components/social-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CinematicFlavourShowcase />
      <BentoGrid />
      <AboutSection />
      <SocialSection />
      <Footer />
    </main>
  )
}
