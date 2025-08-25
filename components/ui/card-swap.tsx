"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CardSwapProps {
  children: React.ReactNode[]
  width?: number
  height?: number
  delay?: number
  pauseOnHover?: boolean
}

export default function CardSwap({
  children,
  width = 400,
  height = 250,
  delay = 3000,
  pauseOnHover = true,
}: CardSwapProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const childArray = React.Children.toArray(children)

  // Auto-rotate cards
  useEffect(() => {
    if (!childArray.length) return
    if (paused) return

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % childArray.length)
    }, delay)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [childArray.length, delay, paused])

  return (
    <div
      className="relative perspective-[1200px]"
      style={{ width, height }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {childArray[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
