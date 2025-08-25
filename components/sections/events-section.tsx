"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useGSAP } from "@/hooks/use-gsap"
import { Calendar, Clock, MapPin } from "lucide-react"

export function EventsSection() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { staggerAnimation, fadeIn } = useGSAP()

  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sectionRef.current) {
      fadeIn(".events-title", { delay: 0.2 })
      staggerAnimation(".event-card", { delay: 0.5 })
    }
  }, [fadeIn, staggerAnimation])

  // Fetch Google Calendar Events
  useEffect(() => {
    async function fetchEvents() {
      try {
        // Replace with your Google Calendar ID + API KEY
        const calendarId = "your_calendar_id@group.calendar.google.com"
        const apiKey = "YOUR_API_KEY"

        const now = new Date().toISOString()
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=6`
        )
        const data = await response.json()

        const formatted = data.items.map((event: any) => ({
          id: event.id,
          title: event.summary,
          date: new Date(event.start.dateTime || event.start.date).toLocaleDateString(),
          time: event.start.dateTime
            ? new Date(event.start.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "All Day",
          location: event.location || null,
          description: event.description || "",
        }))

        setEvents(formatted)
      } catch (error) {
        console.error("Error fetching events", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <section
      id="events"
      ref={sectionRef}
      className="animate-section py-20 bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`events-title text-3xl md:text-4xl font-bold mb-4 ${
              isRTL ? "rtl:text-right" : ""
            }`}
          >
            Next Events
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-2xl mx-auto ${
              isRTL ? "rtl:text-right" : ""
            }`}
          >
            Join us for upcoming special services and community events
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-muted-foreground">No upcoming events</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {events.map((event, index) => (
              <Card
                key={event.id}
                className="event-card group overflow-hidden rounded-2xl border border-border/20 bg-card/60 backdrop-blur-md shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="h-1 bg-gradient-to-r from-primary to-accent" />

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle
                        className={`text-xl font-semibold mb-2 ${
                          isRTL ? "rtl:text-right" : ""
                        }`}
                      >
                        {event.title}
                      </CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        Upcoming
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>

                    {event.location && (
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              event.location
                            )}`,
                            "_blank"
                          )
                        }
                      >
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="secondary"
                    className="w-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
