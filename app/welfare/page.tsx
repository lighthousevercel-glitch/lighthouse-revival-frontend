import { Metadata } from "next"
import WelfarePageClient from "@/components/sections/welfarepageclient"

// ✅ SEO Metadata (only allowed in server components)
export const metadata: Metadata = {
  title: "Church Welfare | Lighthouse Revival Church",
  description:
    "Discover Lighthouse Revival Church’s welfare program — dedicated to serving the community with compassion, kindness, and practical support.",
}

export default function WelfarePage() {
  return <WelfarePageClient />
}
