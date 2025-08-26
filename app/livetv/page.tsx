"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Radio } from "lucide-react"

interface Video {
  id: string
  title: string
  thumbnail: string
  live: boolean
}

export default function LiveTVSection() {
  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(`/api/livetv`)
        const data = await res.json()
        setVideos(data)
        setCurrentVideo(data.find((v: Video) => v.live) || data[0])
      } catch (err) {
        console.error("Error fetching YouTube videos:", err)
      }
    }
    fetchVideos()
  }, [])

  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Live TV
            </span>
          </h2>
          <p className="text-muted-foreground mt-2 text-base md:text-lg">
            Watch our live services or latest sermons
          </p>
        </motion.div>

        {/* Main Video Player */}
        {currentVideo && (
          <motion.div
            className="relative aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg mb-6 md:mb-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=0`}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {currentVideo.live && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <Radio className="h-3 w-3 animate-pulse" />
                LIVE
              </span>
            )}
          </motion.div>
        )}

        {/* Video List */}
        {/* 📱 Mobile → horizontal scroll | 🖥️ Desktop → grid */}
        <div className="
          flex gap-4 overflow-x-auto scrollbar-hide pb-2 
          sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:overflow-visible
        ">
          {videos.slice(0, 6).map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="
                flex-shrink-0 w-40 sm:w-auto 
                cursor-pointer group relative overflow-hidden 
                rounded-lg shadow-md transition sm:rounded-xl
              "
              onClick={() => setCurrentVideo(video)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="
                  w-full object-cover 
                  aspect-[16/10]   /* 📱 Mobile smaller thumbnails */
                  sm:aspect-video  /* 🖥️ Normal ratio */
                  group-hover:opacity-90 transition
                "
              />
              {video.live && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Radio className="h-2.5 w-2.5 sm:h-3 sm:w-3 animate-pulse" />
                  LIVE
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-2 sm:p-3">
                <p className="text-white text-xs sm:text-sm line-clamp-2">
                  {video.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
