"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useGSAP } from "@/hooks/use-gsap"
import { CHURCH_INFO } from "@/lib/constants"
import { Clock, MapPin, Youtube, ExternalLink } from "lucide-react"

export function ServicesSection() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { staggerAnimation } = useGSAP()

  useEffect(() => {
    if (sectionRef.current) {
      staggerAnimation(".service-card", { delay: 0.2 })
    }
  }, [staggerAnimation])

  const services = [
    {
      key: "english",
      titleKey: "services.english",
      timeKey: "services.time.english",
      color: "bg-primary",
      textColor: "text-primary-foreground",
      hasYoutube: true,
    },
    {
      key: "tamil",
      titleKey: "services.tamil",
      timeKey: "services.time.tamil",
      color: "bg-accent",
      textColor: "text-accent-foreground",
      hasYoutube: true,
    },
    {
      key: "hindi",
      titleKey: "services.hindi",
      timeKey: "services.time.hindi",
      color: "bg-secondary",
      textColor: "text-secondary-foreground",
      hasYoutube: false,
    },
    {
      key: "malayalam",
      titleKey: "services.malayalam",
      timeKey: "services.time.malayalam",
      color: "bg-muted",
      textColor: "text-muted-foreground",
      hasYoutube: true,
    },
  ]

  return (
    <section
      id="services"
      ref={sectionRef}
      className="animate-section py-20 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isRTL ? "rtl:text-right" : ""}`}>Our Services</h2>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${isRTL ? "rtl:text-right" : ""}`}>
            Experience the beauty of worship in various languages, including English, Hindi, Tamil, and Malayalam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const serviceInfo = CHURCH_INFO.services[service.key as keyof typeof CHURCH_INFO.services]

            return (
              <Card
                key={service.key}
                className="service-card group rounded-lg border border-border/20 bg-card/50 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-2 hover:border-primary/50"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-full h-32 ${service.color} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent" />
                    <span className={`text-2xl font-bold ${service.textColor} relative z-10`}>
                      {t(service.titleKey)}
                    </span>
                  </div>
                  <CardTitle className={`text-lg ${isRTL ? "rtl:text-right" : ""}`}>{t(service.titleKey)}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{t(service.timeKey)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-2">{serviceInfo.location}</span>
                  </div>

                  <Badge variant="secondary" className="w-fit">
                    {serviceInfo.day}
                  </Badge>

                  <div className="flex gap-2 pt-2">
                    {service.hasYoutube && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Youtube className="w-4 h-4 mr-1" />
                        Watch
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Location
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
