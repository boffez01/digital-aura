"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, CheckCircle, AlertCircle, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function BusinessTransformationCTA() {
  const [language, setLanguage] = useState<"it" | "en">("it")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Load language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "it" | "en"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail)
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

  const translations = {
    it: {
      title: "Trasforma il Tuo Business con l'AI",
      subtitle:
        "Scopri come l'intelligenza artificiale può rivoluzionare la tua azienda. Prenota una consulenza gratuita e inizia il tuo percorso di trasformazione digitale.",
      bookConsultation: "Prenota Consulenza",
      contactNow: "Contattaci Ora",
      name: "Nome",
      email: "Email",
      phone: "Telefono",
      company: "Azienda",
      serviceInterest: "Servizio di Interesse",
      message: "Messaggio",
      selectService: "Seleziona un servizio",
      aiAutomation: "AI Automation",
      smartChatbots: "Smart Chatbots",
      webDevelopment: "Web Development",
      aiMarketing: "AI Marketing",
      consultation: "Consulenza",
      sendRequest: "Invia Richiesta",
      sending: "Invio in corso...",
      successMessage: "Grazie! La tua richiesta è stata inviata con successo. Ti contatteremo presto.",
      errorMessage: "Si è verificato un errore. Riprova o contattaci direttamente.",
      requiredFields: "Compila tutti i campi obbligatori",
      invalidEmail: "Inserisci un indirizzo email valido",
    },
    en: {
      title: "Transform Your Business with AI",
      subtitle:
        "Discover how artificial intelligence can revolutionize your company. Book a free consultation and start your digital transformation journey.",
      bookConsultation: "Book Consultation",
      contactNow: "Contact Now",
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      serviceInterest: "Service of Interest",
      message: "Message",
      selectService: "Select a service",
      aiAutomation: "AI Automation",
      smartChatbots: "Smart Chatbots",
      webDevelopment: "Web Development",
      aiMarketing: "AI Marketing",
      consultation: "Consultation",
      sendRequest: "Send Request",
      sending: "Sending...",
      successMessage: "Thank you! Your request has been sent successfully. We'll contact you soon.",
      errorMessage: "An error occurred. Please try again or contact us directly.",
      requiredFields: "Please fill in all required fields",
      invalidEmail: "Please enter a valid email address",
    },
  }

  const t = translations[language]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error status when user starts typing
    if (submitStatus === "error") {
      setSubmitStatus("idle")
      setErrorMessage("")
    }
  }

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage(t.requiredFields)
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(t.invalidEmail)
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("🚀 Form submission started")

    if (!validateForm()) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      console.log("📤 Sending form data:", formData)

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          company: formData.company.trim() || null,
          service_type: formData.service || null,
          message: formData.message.trim(),
        }),
      })

      console.log("📡 Response status:", response.status)

      const responseData = await response.json()
      console.log("📋 Response data:", responseData)

      if (!response.ok) {
        throw new Error(responseData.error || "Network error")
      }

      console.log("✅ Form submitted successfully")
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      })

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("❌ Form submission error:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : t.errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.title}</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - CTA Buttons */}
            <div className="space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {language === "it" ? "Inizia Subito" : "Get Started Now"}
                </h3>

                <div className="space-y-4">
                  <Link href="/appointments">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Calendar className="mr-3 h-5 w-5" />
                      {t.bookConsultation}
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={scrollToContact}
                    className="w-full border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 bg-transparent"
                  >
                    <MessageCircle className="mr-3 h-5 w-5" />
                    {t.contactNow}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t.name} *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                      placeholder={t.name}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t.email} *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                      placeholder="info@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t.phone}</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                      placeholder="+39 123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t.company}</label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                      placeholder={t.company}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.serviceInterest}</label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500">
                      <SelectValue placeholder={t.selectService} className="text-slate-400" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="ai-automation" className="text-white hover:bg-slate-600 focus:bg-slate-600">
                        {t.aiAutomation}
                      </SelectItem>
                      <SelectItem value="chatbot" className="text-white hover:bg-slate-600 focus:bg-slate-600">
                        {t.smartChatbots}
                      </SelectItem>
                      <SelectItem value="web-development" className="text-white hover:bg-slate-600 focus:bg-slate-600">
                        {t.webDevelopment}
                      </SelectItem>
                      <SelectItem value="ai-marketing" className="text-white hover:bg-slate-600 focus:bg-slate-600">
                        {t.aiMarketing}
                      </SelectItem>
                      <SelectItem value="consultation" className="text-white hover:bg-slate-600 focus:bg-slate-600">
                        {t.consultation}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.message} *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500 min-h-[120px]"
                    placeholder={t.message}
                    required
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-4 rounded-lg border border-green-400/20">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{t.successMessage}</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{errorMessage || t.errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {t.sending}
                    </>
                  ) : (
                    <>
                      {t.sendRequest}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
