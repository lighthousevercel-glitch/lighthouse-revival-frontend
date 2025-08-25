"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useGSAP } from "@/hooks/use-gsap"
import { Calendar, Clock, MapPin, FileText, CalendarPlus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// 🎯 Calendar links generator
function generateCalendarLinks(event: any) {
  const start = new Date(event.startDate).toISOString().replace(/-|:|\.\d+/g, "")
  const end = new Date(event.endDate).toISOString().replace(/-|:|\.\d+/g, "")

  const title = encodeURIComponent(event.title)
  const location = encodeURIComponent(event.location || "")
  const description = encodeURIComponent(event.description || "")

  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${description}&location=${location}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${title}&startdt=${new Date(
      event.startDate
    ).toISOString()}&enddt=${new Date(event.endDate).toISOString()}&body=${description}&location=${location}`,
    ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(
      `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${start}
DTEND:${end}
DESCRIPTION:${event.description}
LOCATION:${event.location || ""}
END:VEVENT
END:VCALENDAR`
    )}`,
  }
}

// 📅 Format with weekday
function formatDateWithDay(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// ⏰ Format time properly
function formatTimeRange(start: string, end: string) {
  const startDate = new Date(start)
  const endDate = new Date(end)

  return `${startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} – ${endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`
}

export function EventsSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { staggerAnimation, fadeIn } = useGSAP()

  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"week" | "month" | "all">("week")
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)

  // GSAP animations
  useEffect(() => {
    if (sectionRef.current) {
      fadeIn(".events-title", { delay: 0.2 })
      staggerAnimation(".event-item", { delay: 0.5 })
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
            date: formatDateWithDay(startDate),
            time: event.start.dateTime ? formatTimeRange(startDate, endDate) : "All Day",
            location: event.location || null,
            description: event.description || "",
            startDate,
            endDate,
          }
        })

        setEvents(formatted)
        setSelectedEvent(formatted[0] || null)
      } catch (error) {
        console.error("Error fetching events", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Memoized filtering
  const filteredEvents = useMemo(() => {
    const today = new Date()
    return events.filter((event) => {
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
  }, [events, filter])

  // Limit display for "all"
  const visibleEvents = useMemo(() => {
    if (filter === "all") return filteredEvents
    return filteredEvents.slice(0, 3)
  }, [filteredEvents, filter])

  const handleEventClick = useCallback((event: any) => {
    setSelectedEvent(event)
  }, [])

  return (
    <section id="events" ref={sectionRef} className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="events-title text-3xl md:text-4xl font-bold mb-4">Next Events</h2>
          <p className="text-lg text-muted-foreground">
            Join us for upcoming special services and community events
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-6 mb-10">
          {["all", "week", "month"].map((option) => (
            <Button
              key={option}
              variant="ghost"
              onClick={() => setFilter(option as any)}
              className={`relative px-6 py-2 text-lg transition-all ${
                filter === option ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              {option === "all" ? "All" : option === "week" ? "This Week" : "This Month"}
              {filter === option && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 -z-10 rounded-xl bg-primary/10 shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
            </Button>
          ))}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Events List */}
          <div
            className={`space-y-4 ${
              filter === "all" ? "max-h-[400px] overflow-y-auto pr-2 custom-scrollbar" : ""
            }`}
          >
            {loading ? (
              <p className="text-muted-foreground">Loading events...</p>
            ) : visibleEvents.length === 0 ? (
              <p className="text-muted-foreground">No upcoming events</p>
            ) : (
              <AnimatePresence>
                {visibleEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`event-item cursor-pointer rounded-xl border border-border/20 bg-card/50 backdrop-blur-md p-4 transition-all hover:shadow-lg ${
                      selectedEvent?.id === event.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleEventClick(event)}
                  >
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date} · {event.time}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Event Details */}
          <AnimatePresence mode="wait">
            {selectedEvent && (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="rounded-2xl border-0 shadow-xl bg-gradient-to-br from-background/80 to-muted/30 backdrop-blur-lg">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl font-bold">{selectedEvent.title}</CardTitle>
                    <Badge variant="secondary" className="w-fit">Upcoming</Badge>
                  </CardHeader>
                  <CardContent className="space-y-5 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-base">{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-base">{selectedEvent.time}</span>
                    </div>
                    {selectedEvent.location && (
                      <div
                        className="flex items-center gap-3 cursor-pointer hover:text-primary transition"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              selectedEvent.location
                            )}`,
                            "_blank"
                          )
                        }
                      >
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-base">{selectedEvent.location}</span>
                      </div>
                    )}
                    {selectedEvent.description && (
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <p className="leading-relaxed">{selectedEvent.description}</p>
                      </div>
                    )}

                    {/* Add to Calendar */}
                    <div className="pt-4">
                      <p className="font-medium mb-2 flex items-center gap-2">
                        <CalendarPlus className="w-5 h-5 text-primary" />
                        Add to Calendar
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {(() => {
                          const links = generateCalendarLinks(selectedEvent)
                          return (
                            <>
                              <Button size="sm" variant="outline" onClick={() => window.open(links.google, "_blank")}>
                                Google
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => window.open(links.outlook, "_blank")}>
                                Outlook
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <a href={links.ics} download={`${selectedEvent.title}.ics`}>Apple / ICS</a>
                              </Button>
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Custom scrollbar CSS */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 20px;
        }
      `}</style>
    </section>
  )
}
