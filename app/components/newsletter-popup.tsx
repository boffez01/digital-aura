"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "../contexts/language-context"
import { X, Mail, Sparkles } from "lucide-react"

export default function NewsletterPopup() {
  const { language } = useLanguage()
  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user has already seen or subscribed to the newsletter
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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(language === "it" ? "Inserisci un'email valida" : "Please enter a valid email")
      setIsSubmitting(false)
      return
    }

    try {
      // TODO: Replace with your actual API endpoint or server action
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSuccess(true)
      localStorage.setItem("newsletter-subscribed", "true")

      // Close popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false)
      }, 2000)
    } catch (err) {
      setError(language === "it" ? "Errore durante l'iscrizione. Riprova." : "Error subscribing. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const content = {
    it: {
      title: "Resta Aggiornato!",
      description: "Iscriviti alla nostra newsletter per ricevere le ultime novità su AI, automazione e tecnologia.",
      placeholder: "La tua email",
      button: "Iscriviti",
      submitting: "Invio...",
      success: "Grazie per l'iscrizione!",
      benefits: ["Contenuti esclusivi sull'AI", "Guide e tutorial pratici", "Offerte speciali riservate"],
    },
    en: {
      title: "Stay Updated!",
      description: "Subscribe to our newsletter to receive the latest news about AI, automation, and technology.",
      placeholder: "Your email",
      button: "Subscribe",
      submitting: "Sending...",
      success: "Thanks for subscribing!",
      benefits: ["Exclusive AI content", "Practical guides and tutorials", "Special reserved offers"],
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Content */}
              <div className="p-8">
                {!isSuccess ? (
                  <>
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-cyan-500/10 p-4 rounded-full">
                        <Mail className="h-8 w-8 text-cyan-400" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white text-center mb-2">{t.title}</h3>

                    {/* Description */}
                    <p className="text-gray-300 text-center mb-6 leading-relaxed">{t.description}</p>

                    {/* Benefits */}
                    <div className="space-y-2 mb-6">
                      {t.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <Sparkles className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder={t.placeholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500"
                          required
                        />
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/25"
                      >
                        {isSubmitting ? t.submitting : t.button}
                      </Button>
                    </form>
                  </>
                ) : (
                  // Success State
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                      <div className="bg-green-500/10 p-4 rounded-full">
                        <Mail className="h-8 w-8 text-green-400" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t.success}</h3>
                    <p className="text-gray-300">
                      {language === "it"
                        ? "Controlla la tua email per confermare l'iscrizione."
                        : "Check your email to confirm your subscription."}
                    </p>
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
