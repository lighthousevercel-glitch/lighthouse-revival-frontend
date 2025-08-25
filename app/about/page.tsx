import Image from "next/image" 
import { Metadata } from "next"

// SEO Metadata for the page
export const metadata: Metadata = {
  title: "About Us | Lighthouse Revival Church",
  description:
    "The journey of Lighthouse Revival Church, from a humble beginning to a thriving community. Learn about our history, mission, and the leadership of Pastor Manoj.",
}

const aboutText = [
  "Lighthouse Revival Church began in 2006 as a small gathering inside a 7-seater Fortuner on the outskirts of Abu Dhabi. Pastor Manoj’s journey started as a transport coordinator in a local Malayalam church, serving labor camps with compassion. His heart for missions led to the vision of building an independent church that would bless the labor community.",
  "In January 2017, after overcoming severe health issues, rejection, and financial struggles, God gave Pastor Manoj and the church a fresh beginning. That year, Lighthouse joined the World Wide Missionary Movement, Inc., headquartered in Washington D.C. and Puerto Rico—marking a new season of growth and global connection.",
  "By 2019, the church was renamed Lighthouse Revival following DCD’s involvement. Under this new identity, it flourished with services in English, Malayalam, Tamil, Hindi, and even outstations in Uganda, carrying forward its mission of planting churches across nations and languages.",
  "Even during the COVID-19 pandemic, when churches worldwide stood empty, Lighthouse Revival remained steadfast. Though many members faced job losses and hardships, the church stayed united in prayer, only closing during the complete lockdown. God’s presence preserved and strengthened the congregation through those challenging times.",
  "Today, Lighthouse Revival Church is known for its caring atmosphere, strong leadership, and vibrant community outreach. People of all ages, backgrounds, and walks of life are drawn to its message of hope. Under Pastor Manoj’s leadership and the dedication of its members, the church continues to grow—shining as a testimony of faith, resilience, and the enduring power of God’s love.",
]

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <main className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Our Journey of Faith
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              The story of Lighthouse Revival Church and Pastor Manoj.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Image Section */}
            <div className="md:col-span-2">
              <div className="relative group w-full aspect-[3/4] max-w-sm mx-auto md:max-w-none overflow-hidden rounded-2xl">
                <Image
                  src="/pastor.jpg"
                  alt="Pastor Manoj"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 40vw"
                />
                {/* Gradient overlays to blend photo edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold">Pastor Manoj</h3>
                <p className="text-muted-foreground">Founder & Lead Pastor</p>
              </div>
            </div>

            {/* Bio Section */}
            <div className="md:col-span-3 space-y-6 text-lg text-muted-foreground leading-relaxed">
              {aboutText.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
