"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
      staggerAnimation(".transport-card", { delay: 0.5 })
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CHURCH_INFO.transportation.locations.map((location, index) => (
            <Card
              key={location}
              className="transport-card group border border-border/20 bg-card/50 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 hover:border-primary/50"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Bus className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{location}</h3>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Pickup Point</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="rounded-2xl border border-border/10 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Need Transportation?</h3>
            <p className="text-muted-foreground mb-4">
              Contact us to arrange your free pickup from any of these locations
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
