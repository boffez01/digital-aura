"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function BusinessTransformationCTA() {
  const [language, setLanguage] = useState<"it" | "en">("it")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "it" | "en"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<string>) => {
      setLanguage(event.detail as "it" | "en")
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "language" && event.newValue) {
        setLanguage(event.newValue as "it" | "en")
      }
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const content = {
    it: {
      title: "Trasforma il Tuo Business con l'AI",
      subtitle: "Scopri come l'intelligenza artificiale può rivoluzionare la tua azienda",
      description:
        "Ottieni una consulenza gratuita personalizzata per identificare le opportunità di automazione e crescita nel tuo settore.",
      bookButton: "Prenota Consulenza Gratuita",
      contactButton: "Contattaci Ora",
      features: [
        "Analisi gratuita del tuo business",
        "Strategia AI personalizzata",
        "ROI garantito entro 6 mesi",
        "Supporto completo post-implementazione",
      ],
    },
    en: {
      title: "Transform Your Business with AI",
      subtitle: "Discover how artificial intelligence can revolutionize your company",
      description:
        "Get a free personalized consultation to identify automation and growth opportunities in your industry.",
      bookButton: "Book Free Consultation",
      contactButton: "Contact Us Now",
      features: [
        "Free business analysis",
        "Personalized AI strategy",
        "ROI guaranteed within 6 months",
        "Complete post-implementation support",
      ],
    },
  }

  const currentContent = content[language]

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.6))]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-500/20 rounded-full blur-lg animate-bounce" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {currentContent.title}
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">{currentContent.subtitle}</p>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {currentContent.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <div className="w-6 h-6 bg-white rounded-sm" />
                </div>
                <p className="text-white font-medium text-sm leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/appointments">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 group min-w-[280px]"
              >
                <Calendar className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                {currentContent.bookButton}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <a href="#contact">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 group min-w-[280px] bg-transparent"
              >
                <MessageCircle className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                {currentContent.contactButton}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-slate-400 text-sm mb-4">
              {language === "it" ? "Aziende che si fidano di noi:" : "Companies that trust us:"}
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="w-24 h-8 bg-white/20 rounded" />
              <div className="w-20 h-8 bg-white/20 rounded" />
              <div className="w-28 h-8 bg-white/20 rounded" />
              <div className="w-22 h-8 bg-white/20 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
