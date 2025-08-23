"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

import en from "@/locales/en.json"
import ml from "@/locales/ml.json"
import ta from "@/locales/ta.json"
import ur from "@/locales/ur.json"

type Language = "en" | "ur" | "ta" | "ml"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: { [lang: string]: { [key: string]: string } } = {
  en,
  ur,
  ta,
  ml,
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && ["en", "ur", "ta", "ml"].includes(savedLang)) {
      setLanguage(savedLang)
    }
  }, [])

  const isRTL = language === "ur"

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
      document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr")
      document.documentElement.setAttribute("lang", language)
    }
  }, [language, mounted, isRTL])

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en?.[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
