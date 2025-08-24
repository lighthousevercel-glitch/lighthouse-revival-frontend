"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { useGSAP } from "@/hooks/use-gsap"
import { Quote } from "lucide-react"

export function VerseSection() {
  const { t, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { fadeIn } = useGSAP()

  useEffect(() => {
    if (sectionRef.current) {
      fadeIn(".verse-content", { delay: 0.3 })
    }
  }, [fadeIn])

  return (
    <section
      ref={sectionRef}
      className="animate-section relative overflow-hidden bg-muted/30 py-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50 mix-blend-soft-light">
        <div className="absolute top-10 left-10 h-32 w-32 rounded-full border border-primary/20" />
        <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full border border-accent/20" />
        <div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full border border-secondary/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/10 bg-card/50 p-8 text-center backdrop-blur-lg md:p-12">
          <div className="verse-content space-y-8">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
                <Quote className="h-8 w-8 text-primary" />
              </div>
            </div>

            <blockquote
              className={`text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-foreground ${isRTL ? "rtl:text-right" : ""}`}
            >
              "{t("verse.text")}"
            </blockquote>

            <cite
              className={`not-italic text-lg md:text-xl text-muted-foreground font-semibold ${isRTL ? "rtl:text-right" : ""}`}
            >
              — {t("verse.reference")}
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}
