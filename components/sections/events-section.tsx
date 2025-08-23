"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useGSAP } from "@/hooks/use-gsap"
import { Calendar, Clock, Users, Zap } from "lucide-react"

export function EventsSection() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { staggerAnimation, fadeIn } = useGSAP()

  useEffect(() => {
    if (sectionRef.current) {
      fadeIn(".events-title", { delay: 0.2 })
      staggerAnimation(".event-card", { delay: 0.5 })
    }
  }, [fadeIn, staggerAnimation])

  const upcomingEvents = [
    {
      title: "Fasting Prayer",
      date: "1, 2 & 3rd Aug",
      time: "Online",
      platform: "Zoom Platform",
      type: "Prayer",
      icon: Zap,
      color: "bg-primary",
    },
    {
      title: "Water Baptism Service",
      date: "27th July",
      time: "05:00 PM",
      platform: "Sunday Service",
      type: "Baptism",
      icon: Users,
      color: "bg-accent",
    },
  ]

  return (
    <section
      id="events"
      ref={sectionRef}
      className="animate-section py-20 bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`events-title text-3xl md:text-4xl font-bold mb-4 ${isRTL ? "rtl:text-right" : ""}`}>
            Next Events
          </h2>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${isRTL ? "rtl:text-right" : ""}`}>
            Join us for upcoming special services and community events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {upcomingEvents.map((event, index) => {
            const IconComponent = event.icon

            return (
              <Card
                key={index}
                className="event-card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className={`h-2 ${event.color}`} />

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className={`text-xl mb-2 ${isRTL ? "rtl:text-right" : ""}`}>{event.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        {event.type}
                      </Badge>
                    </div>
                    <div className={`w-12 h-12 ${event.color} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.platform}</span>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Join Event
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
