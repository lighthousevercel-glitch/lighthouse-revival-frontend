"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { CHURCH_INFO } from "@/lib/constants"
import { Church, Mail, Phone, MapPin, Youtube, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const { t, isRTL } = useLanguage()

  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  return (
    <footer id="contact" className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Church className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Lighthouse Revival</span>
            </div>
            <p className={`text-muted-foreground leading-relaxed ${isRTL ? "rtl:text-right" : ""}`}>
              Multi-lingual church serving the diverse community of Abu Dhabi since 2006.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Button key={social.label} variant="outline" size="sm" className="w-10 h-10 p-0 bg-transparent">
                    <IconComponent className="w-4 h-4" />
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-lg ${isRTL ? "rtl:text-right" : ""}`}>Quick Links</h3>
            <div className="space-y-2">
              {[
                { key: "nav.home", href: "#home" },
                { key: "nav.about", href: "#about" },
                { key: "nav.services", href: "#services" },
                { key: "nav.events", href: "#events" },
              ].map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className={`block text-muted-foreground hover:text-primary transition-colors ${isRTL ? "rtl:text-right" : ""}`}
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Service Times */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-lg ${isRTL ? "rtl:text-right" : ""}`}>Service Times</h3>
            <div className="space-y-2 text-sm">
              <div className={`flex justify-between ${isRTL ? "rtl:flex-row-reverse" : ""}`}>
                <span className="text-muted-foreground">English:</span>
                <span>{t("services.time.english")}</span>
              </div>
              <div className={`flex justify-between ${isRTL ? "rtl:flex-row-reverse" : ""}`}>
                <span className="text-muted-foreground">Tamil:</span>
                <span>{t("services.time.tamil")}</span>
              </div>
              <div className={`flex justify-between ${isRTL ? "rtl:flex-row-reverse" : ""}`}>
                <span className="text-muted-foreground">Hindi:</span>
                <span>{t("services.time.hindi")}</span>
              </div>
              <div className={`flex justify-between ${isRTL ? "rtl:flex-row-reverse" : ""}`}>
                <span className="text-muted-foreground">Malayalam:</span>
                <span>{t("services.time.malayalam")}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-lg ${isRTL ? "rtl:text-right" : ""}`}>Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Abu Dhabi, UAE</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{CHURCH_INFO.contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{CHURCH_INFO.contact.phone}</span>
              </div>
            </div>
            <Button className="w-full">Need Prayer?</Button>
          </div>
        </div>

        <Separator className="my-8" />

        <div
          className={`flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground ${isRTL ? "rtl:text-right" : ""}`}
        >
          <p>© 2024 Lighthouse Revival Church Ministries. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
