"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useGSAP } from "@/hooks/use-gsap"
import { CHURCH_INFO } from "@/lib/constants"
import { Bus, MapPin, Phone } from "lucide-react"

export function TransportationSection() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { staggerAnimation, fadeIn } = useGSAP()

  useEffect(() => {
    if (sectionRef.current) {
      fadeIn(".transport-title", { delay: 0.2 })
      staggerAnimation(".transport-box", { delay: 0.4, stagger: 0.2 })
    }
  }, [fadeIn, staggerAnimation])

  return (
    <section ref={sectionRef} className="animate-section py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`transport-title text-3xl md:text-4xl font-bold mb-4 ${isRTL ? "rtl:text-right" : ""}`}>
            {t("transportation.title")}
          </h2>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${isRTL ? "rtl:text-right" : ""}`}>
            {t("transportation.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Contact CTA */}
          <div className="transport-box rounded-2xl border border-border/10 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 h-full flex flex-col items-center justify-center text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Need Transportation?</h3>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Contact us to arrange your free pickup from any of these locations
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              Contact Us
            </Button>
          </div>

          {/* Pickup Points */}
          <div className="transport-box rounded-2xl border border-border/10 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 h-full flex flex-col items-center justify-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Bus className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-6 text-center">Available Pickup Points</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {CHURCH_INFO.transportation.locations.map((location) => (
                <li key={location} className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
