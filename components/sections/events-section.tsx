"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useGSAP } from "@/hooks/use-gsap"
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

// Helper to generate Add to Calendar links
function generateCalendarLinks(event: any) {
  const start = new Date(event.startDate).toISOString().replace(/-|:|\.\d+/g, "")
  const end = new Date(event.endDate).toISOString().replace(/-|:|\.\d+/g, "")

  const title = encodeURIComponent(event.title)
  const location = encodeURIComponent(event.location || "")
  const description = encodeURIComponent(event.description || "")

  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${description}&location=${location}`,
    outlook: `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&subject=${title}&body=${description}&location=${location}&startdt=${start}&enddt=${end}`,
    apple: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${location}
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`,
  }
}

export function EventsSection() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { staggerAnimation, fadeIn } = useGSAP()

  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Pagination
  const [filter, setFilter] = useState<"week" | "month" | "all">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 4

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
        const calendarId = "lighthouseweb8@gmail.com"
        const apiKey = "AIzaSyCE6pZ2N62XJO5W7Boaw8oQG6Zt-B-fC9c"

        const now = new Date().toISOString()
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=20`
        )
        const data = await response.json()

        const formatted = data.items.map((event: any) => {
          const startDate = event.start.dateTime || event.start.date
          const endDate = event.end?.dateTime || event.end?.date || startDate
          return {
            id: event.id,
            title: event.summary,
            date: new Date(startDate).toLocaleDateString(),
            time: event.start.dateTime
              ? new Date(startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "All Day",
            location: event.location || null,
            description: event.description || "",
            startDate,
            endDate,
          }
        })

        setEvents(formatted)
      } catch (error) {
        console.error("Error fetching events", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Filtering
  const filteredEvents = events.filter((event) => {
    const today = new Date()
    const eventDate = new Date(event.startDate)

    if (filter === "week") {
      const endOfWeek = new Date(today)
      endOfWeek.setDate(today.getDate() + 7)
      return eventDate >= today && eventDate <= endOfWeek
    }
    if (filter === "month") {
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      return eventDate >= today && eventDate <= endOfMonth
    }
    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  )

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

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-10">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "week" ? "default" : "outline"}
            onClick={() => setFilter("week")}
          >
            This Week
          </Button>
          <Button
            variant={filter === "month" ? "default" : "outline"}
            onClick={() => setFilter("month")}
          >
            This Month
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-center text-muted-foreground">No upcoming events</p>
        ) : (
          <>
            {/* Events List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {paginatedEvents.map((event) => {
                const links = generateCalendarLinks(event)
                return (
                  <Card
                    key={event.id}
                    className="event-card group overflow-hidden rounded-2xl border border-border/20 bg-card/60 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
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

                      {/* Calendar Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => window.open(links.google, "_blank")}
                        >
                          Google
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => window.open(links.outlook, "_blank")}
                        >
                          Outlook
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            const blob = new Blob([decodeURIComponent(links.apple)], {
                              type: "text/calendar;charset=utf-8",
                            })
                            const url = URL.createObjectURL(blob)
                            const a = document.createElement("a")
                            a.href = url
                            a.download = `${event.title}.ics`
                            a.click()
                          }}
                        >
                          Apple
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
