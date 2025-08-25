"use client"

import Image from "next/image"
import { Metadata } from "next"
import { useState } from "react"
import { motion } from "framer-motion"

// SEO Metadata
export const metadata: Metadata = {
  title: "Prayer Request | Lighthouse Revival Church",
  description:
    "Submit your prayer requests and let us stand with you in faith. Lighthouse Revival Church believes in the power of prayer to transform lives.",
}

export default function PrayerRequestPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    request: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const whatsappNumber = "971500000000" // 👉 Replace with Church WhatsApp number
  const googleSheetURL = "YOUR_GOOGLE_APPS_SCRIPT_URL" // 👉 Replace with Web App URL

  // Update form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Send to Google Sheets
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(googleSheetURL, {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      })
      setSuccess(true)
      setForm({ name: "", email: "", phone: "", request: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }

  // Send via WhatsApp
  const handleWhatsApp = () => {
    const message = `🙏 Prayer Request 🙏\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nRequest:\n${form.request}`
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <main className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Prayer Request
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              At Lighthouse Revival Church, we believe in the power of prayer to heal, restore, and
              transform lives. Whatever burden you carry, you don’t have to carry it alone. Share
              your request and allow us to join our faith with yours.
            </p>
          </motion.div>

          {/* Content */}
          <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2"
            >
              <div className="relative w-full aspect-[3/4] max-w-sm mx-auto md:max-w-none overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/prayer.jpg"
                  alt="Prayer"
                  fill
                  className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 90vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-3"
            >
              <div className="bg-muted/30 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-border">
                <h3 className="text-2xl font-bold mb-6 text-foreground">
                  Share Your Prayer Request
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-3 rounded-lg border border-border bg-background"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className="p-3 rounded-lg border border-border bg-background"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="p-3 rounded-lg border border-border bg-background"
                  />
                  <textarea
                    name="request"
                    placeholder="Write your prayer request..."
                    value={form.request}
                    onChange={handleChange}
                    className="p-3 rounded-lg border border-border bg-background h-32 resize-none"
                    required
                  />

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition"
                    >
                      {loading ? "Sending..." : success ? "Sent ✅" : "Send Request"}
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex-1 py-3 px-6 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      Send via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

          {/* About Church Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-24 text-center max-w-4xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Lighthouse Revival Church
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Lighthouse Revival Church is a place of hope, healing, and restoration. Since its
              humble beginnings in 2006, the church has grown into a vibrant community where people
              of all ages and backgrounds gather to worship, serve, and grow in faith. Under the
              leadership of Pastor Manoj, the church continues to shine as a testimony of God’s
              faithfulness and love across nations.
            </p>
          </motion.div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Lighthouse Revival Church Ministries. All Rights Reserved.</p>
          </div>
        </main>
      </div>
    </div>
  )
}
