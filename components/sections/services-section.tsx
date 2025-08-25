"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/components/providers/language-provider"
import { useGSAP } from "@/hooks/use-gsap"
import { CHURCH_INFO } from "@/lib/constants"
import { Clock, MapPin, Phone, MessageCircle, ExternalLink } from "lucide-react"

export function ServicesSection() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { staggerAnimation } = useGSAP()

  const [openService, setOpenService] = useState<null | string>(null)

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
      hasYoutube: true,
      contact: "+971501234567",
    },
    {
      key: "tamil",
      titleKey: "services.tamil",
      timeKey: "services.time.tamil",
      hasYoutube: true,
      contact: "+971509876543",
    },
    {
      key: "hindi",
      titleKey: "services.hindi",
      timeKey: "services.time.hindi",
      hasYoutube: false,
      contact: "+971523456789",
    },
    {
      key: "malayalam",
      titleKey: "services.malayalam",
      timeKey: "services.time.malayalam",
      hasYoutube: true,
      contact: "+971502468135",
    },
  ]

  const handleOpen = (key: string) => setOpenService(key)
  const handleClose = () => setOpenService(null)

  return (
    <section
      id="services"
      ref={sectionRef}
      className="animate-section py-20 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        {/* Sleek Header & Paragraph */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isRTL ? "rtl:text-right" : ""}`}>
            Our Services
          </h2>
          <p
            className={`text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide ${isRTL ? "rtl:text-right" : ""}`}
          >
            Looking for a vibrant, diverse community where you can worship and grow spiritually?  
            <span className="text-primary font-medium"> Lighthouse Revival Church International</span> warmly invites you to join our multi-lingual Sunday services.  
            Experience worship in <span className="font-medium">English, Hindi, Tamil, and Malayalam</span> — whether fluent or exploring something new, you’ll find a place here to belong and glorify God together.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const serviceInfo = CHURCH_INFO.services[service.key as keyof typeof CHURCH_INFO.services]
            const isOpen = openService === service.key

            return (
              <>
                {/* Service Card */}
                <Card
                  key={service.key}
                  className="service-card group rounded-2xl border border-border/20 overflow-hidden cursor-pointer relative transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
                  onClick={() => handleOpen(service.key)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src="/poster.jpg"
                      alt="Service Poster"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <CardHeader className="p-4">
                      <h3 className="text-lg font-semibold text-white drop-shadow-md">
                        {t(service.titleKey)}
                      </h3>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3 text-sm text-white/90">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{t(service.timeKey)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{serviceInfo.location}</span>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                        {serviceInfo.day}
                      </Badge>
                    </CardContent>
                  </div>
                </Card>

                {/* Modal */}
                {isOpen && (
                  <Dialog open={isOpen} onOpenChange={handleClose}>
                    <DialogContent className="sm:max-w-md rounded-2xl p-6">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                          {t(service.titleKey)}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{t(service.timeKey)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{serviceInfo.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{service.contact}</span>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3 pt-3">
                          <Button
                            className="w-full"
                            onClick={() => (window.location.href = `tel:${service.contact}`)}
                          >
                            <Phone className="w-4 h-4 mr-1" /> Call
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() =>
                              window.open(`https://wa.me/${service.contact.replace(/\D/g, "")}`, "_blank")
                            }
                          >
                            <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
                          </Button>
                          <Button
                            variant="outline"
                            className="col-span-2"
                            onClick={() =>
                              window.open(
                                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                  serviceInfo.location
                                )}`,
                                "_blank"
                              )
                            }
                          >
                            <ExternalLink className="w-4 h-4 mr-1" /> Open in Maps
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </>
            )
          })}
        </div>
      </div>
    </section>
  )
}
