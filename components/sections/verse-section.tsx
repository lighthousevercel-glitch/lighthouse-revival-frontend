"use client"

import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@/hooks/use-gsap"
import { Quote } from "lucide-react"

function decodeHtmlEntities(str: string) {
  if (!str) return ""
  const txt = document.createElement("textarea")
  txt.innerHTML = str
  return txt.value
}

export function VerseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { fadeIn } = useGSAP()

  const [verseText, setVerseText] = useState("Loading Verse of the Day...")
  const [verseRef, setVerseRef] = useState("")

  useEffect(() => {
    if (sectionRef.current) fadeIn(".verse-content", { delay: 0.3 })
  }, [fadeIn])

  useEffect(() => {
    async function fetchVerse() {
      try {
        const res = await fetch("/api/votd")
        const data = await res.json()
        setVerseText(decodeHtmlEntities(data?.votd?.text || "Verse unavailable"))
        setVerseRef(decodeHtmlEntities(data?.votd?.display_ref || ""))
      } catch (err) {
        console.error("Error fetching verse:", err)
        setVerseText("Unable to load Verse of the Day")
      }
    }
    fetchVerse()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="animate-section relative overflow-hidden bg-muted/30 py-20"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/10 bg-card/50 p-8 text-center backdrop-blur-lg md:p-12">
          <div className="verse-content space-y-8">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
                <Quote className="h-8 w-8 text-primary" />
              </div>
            </div>

            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-foreground">
              “{verseText}”
            </blockquote>

            {verseRef && (
              <cite className="not-italic text-lg md:text-xl text-muted-foreground font-semibold">
                — {verseRef}
              </cite>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}