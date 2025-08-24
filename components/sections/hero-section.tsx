"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { ArrowDown, Play } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const { t, isRTL } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Ensure animations only run client-side
    setMounted(true)
  }, [])

  if (!mounted) return null // prevents SSR mismatch

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover scale-105 animate-slow-zoom"
        poster="/placeholder-0cncc.png"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.3 } },
          }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter"
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              {t("hero.title")}
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="px-8 py-3 text-lg relative overflow-hidden group hover:scale-105 transition-transform"
            >
              <span className="relative z-10 flex items-center">
                Join Our Service
                <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg bg-background/50 backdrop-blur-md border-primary/40 hover:scale-105 transition-transform relative group"
            >
              <Play className="mr-2 w-5 h-5 group-hover:rotate-90 transition-transform" />
              Watch Online
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
