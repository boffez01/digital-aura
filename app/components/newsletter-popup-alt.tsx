"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "../contexts/language-context"
import { X, Mail, TrendingUp, Zap, Gift } from "lucide-react"

export default function NewsletterPopupAlt() {
  const { language } = useLanguage()
  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("newsletter-popup-seen")
    const hasSubscribed = localStorage.getItem("newsletter-subscribed")

    if (!hasSeenPopup && !hasSubscribed) {
      const handleScroll = () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

        if (scrollPercentage >= 25) {
          setShowPopup(true)
          window.removeEventListener("scroll", handleScroll)
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleClose = () => {
    setShowPopup(false)
    localStorage.setItem("newsletter-popup-seen", "true")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(language === "it" ? "Inserisci un'email valida" : "Please enter a valid email")
      setIsSubmitting(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      localStorage.setItem("newsletter-subscribed", "true")
      setTimeout(() => setShowPopup(false), 2000)
    } catch (err) {
      setError(language === "it" ? "Errore durante l'iscrizione. Riprova." : "Error subscribing. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const content = {
    it: {
      title: "Unisciti a 10.000+ Innovatori",
      subtitle: "Ricevi insights esclusivi ogni settimana",
      placeholder: "nome@email.com",
      button: "Iscriviti Gratis",
      submitting: "Invio...",
      success: "Benvenuto a bordo!",
      successMsg: "Controlla la tua inbox per confermare.",
      features: [
        { icon: TrendingUp, text: "Trend AI settimanali" },
        { icon: Zap, text: "Tutorial pratici" },
        { icon: Gift, text: "Risorse gratuite" },
      ],
    },
    en: {
      title: "Join 10,000+ Innovators",
      subtitle: "Get exclusive insights every week",
      placeholder: "name@email.com",
      button: "Subscribe Free",
      submitting: "Sending...",
      success: "Welcome aboard!",
      successMsg: "Check your inbox to confirm.",
      features: [
        { icon: TrendingUp, text: "Weekly AI trends" },
        { icon: Zap, text: "Practical tutorials" },
        { icon: Gift, text: "Free resources" },
      ],
    },
  }

  const t = content[language as keyof typeof content] || content.it

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={handleClose}
          />

          {/* Side Popup - Bottom Right */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-8 right-8 z-50 w-full max-w-sm"
          >
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden">
              {/* Accent Bar */}
              <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-6">
                {!isSuccess ? (
                  <>
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-cyan-500/10 p-2 rounded-lg">
                          <Mail className="h-5 w-5 text-cyan-500" />
                        </div>
                        <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wide">Newsletter</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t.subtitle}</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {t.features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Icon className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                            <span>{feature.text}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <Input
                          type="email"
                          placeholder={t.placeholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                          required
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-5 rounded-lg transition-all duration-300"
                      >
                        {isSubmitting ? t.submitting : t.button}
                      </Button>
                    </form>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                      {language === "it" ? "Niente spam. Cancellati quando vuoi." : "No spam. Unsubscribe anytime."}
                    </p>
                  </>
                ) : (
                  // Success State
                  <div className="text-center py-4">
                    <div className="flex justify-center mb-3">
                      <div className="bg-green-500/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.success}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.successMsg}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
