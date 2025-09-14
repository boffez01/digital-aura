"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function BusinessTransformationCTA() {
  const [language, setLanguage] = useState<"it" | "en">("it")

  // Carica la lingua da localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "it" | "en"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Ascolta i cambi di lingua da altri componenti
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"it" | "en">) => {
      setLanguage(event.detail)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)

    // Ascolta anche i cambi da localStorage (per sincronizzazione cross-tab)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "language" && event.newValue) {
        setLanguage(event.newValue as "it" | "en")
      }
    }

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
        "Ottieni una consulenza gratuita personalizzata e scopri le opportunità di crescita per il tuo business attraverso soluzioni AI innovative.",
      features: ["Analisi gratuita del tuo business", "Strategia AI personalizzata", "ROI garantito entro 6 mesi"],
      cta: "Prenota Consulenza Gratuita",
      contact: "Contattaci Ora",
    },
    en: {
      title: "Transform Your Business with AI",
      subtitle: "Discover how artificial intelligence can revolutionize your company",
      description:
        "Get a personalized free consultation and discover growth opportunities for your business through innovative AI solutions.",
      features: ["Free business analysis", "Personalized AI strategy", "Guaranteed ROI within 6 months"],
      cta: "Book Free Consultation",
      contact: "Contact Us Now",
    },
  }

  const currentContent = content[language]

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 mb-6"
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 font-medium">{currentContent.subtitle}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {currentContent.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {currentContent.description}
            </motion.p>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {currentContent.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg mb-4 mx-auto">
                  {index === 0 && <Target className="w-6 h-6 text-white" />}
                  {index === 1 && <Sparkles className="w-6 h-6 text-white" />}
                  {index === 2 && <TrendingUp className="w-6 h-6 text-white" />}
                </div>
                <p className="text-white font-medium">{feature}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/appointments">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
              >
                {currentContent.cta}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300 bg-transparent"
            >
              {currentContent.contact}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
    </section>
  )
}
