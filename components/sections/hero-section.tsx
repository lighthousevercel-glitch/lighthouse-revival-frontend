"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useGSAP } from "@/hooks/use-gsap"
import { ArrowDown, Play } from "lucide-react"

export function HeroSection() {
  const { t, isRTL } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const { fadeIn, slideIn } = useGSAP()

  useEffect(() => {
    if (heroRef.current) {
      fadeIn(".hero-title", { delay: 0.5 })
      fadeIn(".hero-subtitle", { delay: 0.8 })
      slideIn(".hero-buttons", "left", { delay: 1.1 })
    }
  }, [fadeIn, slideIn])

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/placeholder-0cncc.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/30 rounded-full blur-lg animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1
            className={`hero-title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight ${isRTL ? "rtl:text-right" : ""}`}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t("hero.title")}
            </span>
          </h1>

          <p
            className={`hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed ${isRTL ? "rtl:text-right" : ""}`}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className={`hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? "rtl:flex-row-reverse" : ""}`}
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
              Join Our Service
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
              <Play className="mr-2 w-5 h-5" />
              Watch Online
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
