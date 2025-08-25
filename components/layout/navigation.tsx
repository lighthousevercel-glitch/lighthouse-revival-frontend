"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/ui/language-selector"
import { useLanguage } from "@/components/providers/language-provider"
import { Menu, X, Church } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, isRTL } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { key: "nav.home", href: "/" },
    { key: "nav.about", href: "/about" },
    { key: "nav.services", href: "/#services" },
    { key: "nav.events", href: "/#events" },
    { key: "nav.contact", href: "/#contact" },
  ]

  return (
    <nav
      className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50" : "bg-transparent",
        isRTL && "rtl:text-right",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Church className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">Lighthouse Revival</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"

              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <div className="hidden sm:flex">
              <Button asChild variant="ghost">
                <Link href="/sign-in">{t("nav.signin")}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="pt-4 pb-2 px-3 border-t border-border/50">
                <Button asChild className="w-full" variant="secondary">
                  <Link href="/sign-in">{t("nav.signin")}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
