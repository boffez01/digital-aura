"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ArrowLeft, Bot, User, CheckCircle } from "lucide-react"

interface BookingChatbotProps {
  onBack: () => void
}

export default function BookingChatbot({ onBack }: BookingChatbotProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  // Get current language from localStorage
  const [language, setLanguage] = useState<"it" | "en">("it")

  useEffect(() => {
    const savedLanguage = (localStorage.getItem("language") as "it" | "en") || "it"
    setLanguage(savedLanguage)

    const handleLanguageChange = () => {
      const newLanguage = (localStorage.getItem("language") as "it" | "en") || "it"
      setLanguage(newLanguage)
    }

    window.addEventListener("storage", handleLanguageChange)
    return () => window.removeEventListener("storage", handleLanguageChange)
  }, [])

  const translations = {
    it: {
      title: "Booking Assistant",
      subtitle: "Con controllo disponibilità",
      online: "Online",
      greeting:
        "👋 Ciao! Sono l'assistente di prenotazione di Digital Aura. Ti aiuterò a prenotare un appuntamento con controllo disponibilità in tempo reale!",
      serviceQuestion: "Per quale servizio vorresti prenotare?",
      dateQuestion: "Perfetto! Quando vorresti prenotare la consulenza?",
      timeQuestion: "Quale orario preferisci?",
      infoQuestion: "Ottimo! Ora ho bisogno di alcune informazioni per completare la prenotazione:",
      services: {
        "ai-automation": {
          title: "🤖 AI Automation",
          subtitle: "Automazione intelligente per il tuo business",
        },
        "web-development": {
          title: "💻 Web Development",
          subtitle: "Siti web moderni e performanti",
        },
        "ai-chatbot": {
          title: "💬 AI Chatbot",
          subtitle: "Assistenti virtuali personalizzati",
        },
        "ai-marketing": {
          title: "📈 AI Marketing",
          subtitle: "Marketing automatizzato con intelligenza artificiale",
        },
      },
      form: {
        name: "Nome completo",
        email: "Email",
        phone: "Telefono",
        company: "Azienda (opzionale)",
        message: "Messaggio (opzionale)",
      },
      buttons: {
        book: "Prenota Consulenza",
        back: "Indietro",
      },
      success:
        "🎉 Perfetto! La tua consulenza è stata prenotata con successo. Riceverai una email di conferma a breve.",
      availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    },
    en: {
      title: "Booking Assistant",
      subtitle: "With availability check",
      online: "Online",
      greeting:
        "👋 Hello! I'm Digital Aura's booking assistant. I'll help you book an appointment with real-time availability checking!",
      serviceQuestion: "Which service would you like to book?",
      dateQuestion: "Perfect! When would you like to book the consultation?",
      timeQuestion: "What time do you prefer?",
      infoQuestion: "Great! Now I need some information to complete the booking:",
      services: {
        "ai-automation": {
          title: "🤖 AI Automation",
          subtitle: "Intelligent automation for your business",
        },
        "web-development": {
          title: "💻 Web Development",
          subtitle: "Modern and performant websites",
        },
        "ai-chatbot": {
          title: "💬 AI Chatbot",
          subtitle: "Personalized virtual assistants",
        },
        "ai-marketing": {
          title: "📈 AI Marketing",
          subtitle: "Automated marketing with artificial intelligence",
        },
      },
      form: {
        name: "Full name",
        email: "Email",
        phone: "Phone",
        company: "Company (optional)",
        message: "Message (optional)",
      },
      buttons: {
        book: "Book Consultation",
        back: "Back",
      },
      success:
        "🎉 Perfect! Your consultation has been booked successfully. You will receive a confirmation email shortly.",
      availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    },
  }

  const t = translations[language]

  const handleServiceSelect = (service: string) => {
    setSelectedService(service)
    setCurrentStep(1)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setCurrentStep(2)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setCurrentStep(3)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: selectedService,
          date: selectedDate,
          time: selectedTime,
          ...formData,
          source: "chatbot",
        }),
      })

      if (response.ok) {
        setIsCompleted(true)
        setCurrentStep(4)
      }
    } catch (error) {
      console.error("Error booking appointment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "it" ? "it-IT" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="hover:bg-white/20 p-1 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-xs opacity-90">{t.subtitle}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm">{t.online}</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Bot greeting */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
            <p className="text-sm">{t.greeting}</p>
            <div className="text-xs text-gray-500 mt-1">04:27 PM</div>
          </div>
        </div>

        {/* Service selection */}
        {currentStep >= 0 && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="space-y-2 max-w-xs">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm">{t.serviceQuestion}</p>
                <div className="text-xs text-gray-500 mt-1">04:27 PM</div>
              </div>

              {currentStep === 0 && (
                <div className="space-y-2">
                  {Object.entries(t.services).map(([key, service]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleServiceSelect(key)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-left transition-colors"
                    >
                      <div className="font-medium text-sm">{service.title}</div>
                      <div className="text-xs opacity-90">{service.subtitle}</div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* User service selection */}
        {selectedService && (
          <div className="flex items-start space-x-3 justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
              <p className="text-sm">{t.services[selectedService as keyof typeof t.services].title}</p>
              <div className="text-xs opacity-90 mt-1">04:28 PM</div>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        {/* Date selection */}
        {currentStep >= 1 && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="space-y-2 max-w-xs">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm">{t.dateQuestion}</p>
                <div className="text-xs text-gray-500 mt-1">04:28 PM</div>
              </div>

              {currentStep === 1 && (
                <div className="grid grid-cols-1 gap-2">
                  {generateDates()
                    .slice(0, 5)
                    .map((date) => (
                      <motion.button
                        key={date}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDateSelect(date)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg text-left transition-colors"
                      >
                        <div className="text-sm">{formatDate(date)}</div>
                      </motion.button>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* User date selection */}
        {selectedDate && (
          <div className="flex items-start space-x-3 justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
              <p className="text-sm">{formatDate(selectedDate)}</p>
              <div className="text-xs opacity-90 mt-1">04:29 PM</div>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        {/* Time selection */}
        {currentStep >= 2 && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="space-y-2 max-w-xs">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm">{t.timeQuestion}</p>
                <div className="text-xs text-gray-500 mt-1">04:29 PM</div>
              </div>

              {currentStep === 2 && (
                <div className="grid grid-cols-2 gap-2">
                  {t.availableTimes.map((time) => (
                    <motion.button
                      key={time}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTimeSelect(time)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <div className="text-sm">{time}</div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* User time selection */}
        {selectedTime && (
          <div className="flex items-start space-x-3 justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
              <p className="text-sm">{selectedTime}</p>
              <div className="text-xs opacity-90 mt-1">04:30 PM</div>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        {/* Form */}
        {currentStep === 3 && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm">{t.infoQuestion}</p>
                <div className="text-xs text-gray-500 mt-1">04:30 PM</div>
              </div>

              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <Input
                  placeholder={t.form.name}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white"
                />
                <Input
                  type="email"
                  placeholder={t.form.email}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white"
                />
                <Input
                  placeholder={t.form.phone}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white"
                />
                <Input
                  placeholder={t.form.company}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white"
                />
                <Textarea
                  placeholder={t.form.message}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white"
                  rows={3}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t.buttons.book}...</span>
                    </div>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 mr-2" />
                      {t.buttons.book}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Success message */}
        {currentStep === 4 && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <div className="bg-green-100 border border-green-200 rounded-lg p-3 max-w-xs">
              <p className="text-sm text-green-800">{t.success}</p>
              <div className="text-xs text-green-600 mt-1">04:31 PM</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
