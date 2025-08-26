import { Metadata } from "next"
import AboutUsContent from "@/components/sections/aboutuscontent"

// ✅ SEO Metadata for the page
export const metadata: Metadata = {
  title: "About Us | Lighthouse Revival Church",
  description:
    "The journey of Lighthouse Revival Church, from a humble beginning to a thriving community. Learn about our history, mission, and the leadership of Pastor Manoj.",
}

export default function AboutUsPage() {
  return <AboutUsContent />
}
