"use client"

import { useEffect, useRef } from "react"
import { Navigation } from "@/components/layout/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { TransportationSection } from "@/components/sections/transportation-section"
import { VerseSection } from "@/components/sections/verse-section"
import { EventsSection } from "@/components/sections/events-section"
import { Footer } from "@/components/layout/footer"
import { useGSAP } from "@/hooks/use-gsap"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { fadeIn, staggerAnimation } = useGSAP()

  useEffect(() => {
    if (containerRef.current) {
      // Animate sections on load
      fadeIn(".hero-section", { delay: 0.2 })
      staggerAnimation(".animate-section", { delay: 0.5 })
    }
  }, [fadeIn, staggerAnimation])

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <VerseSection />
        <TransportationSection />
        <EventsSection />
      </main>
      <Footer />
    </div>
  )
}
