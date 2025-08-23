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
      className="animate-section py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-accent/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-secondary/20 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="verse-content space-y-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-primary" />
              </div>
            </div>

            <blockquote
              className={`text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-foreground ${isRTL ? "rtl:text-right" : ""}`}
            >
              "{t("verse.text")}"
            </blockquote>

            <cite className={`text-lg md:text-xl text-muted-foreground font-semibold ${isRTL ? "rtl:text-right" : ""}`}>
              — {t("verse.reference")}
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}
