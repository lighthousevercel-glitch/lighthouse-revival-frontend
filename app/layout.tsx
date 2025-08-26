import type React from "react"
import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/providers/language-provider"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Lighthouse Revival Church International",
  description: "Multi-lingual church services in Abu Dhabi - English, Tamil, Hindi, Malayalam",
  generator: "Aswin Andro",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
     <html lang="en" suppressHydrationWarning className={`${geist.variable} ${manrope.variable} antialiased`}>
      <body  className={geist.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}
           <Navigation />
           <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
