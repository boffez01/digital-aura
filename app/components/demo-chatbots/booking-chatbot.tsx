"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Bot, User, Send, CalendarIcon, Clock, CheckCircle, Phone, Mail } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  type?: "text" | "service-selection" | "date-selection" | "time-selection" | "form" | "confirmation"
  data?: any
}

interface BookingData {
  service: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  message: string
}

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

const translations = {
  it: {
    title: "Assistente Prenotazioni",
    subtitle: "Con controllo disponibilità",
    welcome:
      "👋 Ciao! Sono l'assistente per le prenotazioni di Digital Aura. Ti aiuto a prenotare un appuntamento con controllo disponibilità in tempo reale!",
    serviceQuestion: "Per quale servizio vorresti prenotare?",
    dateSelection: "Perfetto! Ora seleziona la data per il tuo appuntamento:",
    timeSelection: "Ottimo! Scegli l'orario che preferisci:",
    formRequest: "Perfetto! Ora ho bisogno dei tuoi dati per completare la prenotazione:",
    confirming: "Sto confermando la tua prenotazione...",
    confirmed: "Prenotazione Confermata!",
    placeholder: "Scrivi un messaggio...",
    generalResponse: "Grazie per il tuo messaggio! Per prenotare un appuntamento, usa i pulsanti qui sopra.",
    formPlaceholders: {
      name: "Nome e Cognome *",
      email: "Email *",
      phone: "Telefono *",
      message: "Note aggiuntive (opzionale)",
    },
    confirmButton: "Conferma Prenotazione",
    services: [
      { name: "🤖 AI Automation", description: "Automazione intelligente per il tuo business" },
      { name: "🌐 Web Development", description: "Siti web moderni e performanti" },
      { name: "💬 Chatbot AI", description: "Assistenti virtuali personalizzati" },
      { name: "📊 AI Marketing", description: "Marketing automatizzato con intelligenza artificiale" },
    ],
  },
  en: {
    title: "Booking Assistant",
    subtitle: "With availability check",
    welcome:
      "👋 Hello! I'm Digital Aura's booking assistant. I'll help you book an appointment with real-time availability checking!",
    serviceQuestion: "Which service would you like to book?",
    dateSelection: "Perfect! Now select the date for your appointment:",
    timeSelection: "Great! Choose your preferred time:",
    formRequest: "Perfect! Now I need your details to complete the booking:",
    confirming: "Confirming your booking...",
    confirmed: "Booking Confirmed!",
    placeholder: "Type a message...",
    generalResponse: "Thank you for your message! To book an appointment, use the buttons above.",
    formPlaceholders: {
      name: "Full Name *",
      email: "Email *",
      phone: "Phone *",
      message: "Additional notes (optional)",
    },
    confirmButton: "Confirm Booking",
    services: [
      { name: "🤖 AI Automation", description: "Intelligent automation for your business" },
      { name: "🌐 Web Development", description: "Modern and performant websites" },
      { name: "💬 AI Chatbot", description: "Personalized virtual assistants" },
      { name: "📊 AI Marketing", description: "Automated marketing with artificial intelligence" },
    ],
  },
}

export default function BookingChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({})
  const [currentStep, setCurrentStep] = useState("welcome")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [language, setLanguage] = useState<"it" | "en">("it")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get current translations
  const t = translations[language]

  useEffect(() => {
    const checkLanguage = () => {
      const savedLanguage = localStorage.getItem("language")
      if (savedLanguage === "it" || savedLanguage === "en") {
        setLanguage(savedLanguage)
      }
    }

    checkLanguage()
    const interval = setInterval(checkLanguage, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Reset messages when language changes - show only ONE welcome and ONE service selection
    const welcomeMessage: Message = {
      id: `welcome-${language}-${Date.now()}`,
      text: t.welcome,
      isUser: false,
      timestamp: new Date(),
      type: "text",
    }

    const serviceMessage: Message = {
      id: `service-selection-${language}-${Date.now()}`,
      text: t.serviceQuestion,
      isUser: false,
      timestamp: new Date(),
      type: "service-selection",
    }

    // Set both messages at once to avoid duplication
    setMessages([welcomeMessage, serviceMessage])

    // Reset booking state when language changes
    setCurrentStep("welcome")
    setBookingData({})
    setSelectedDate(undefined)
  }, [language, t.welcome, t.serviceQuestion])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const addMessage = (text: string, isUser: boolean, type = "text", data?: any) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      type: type as any,
      data,
    }
    setMessages((prev) => [...prev, message])
  }

  const handleServiceSelection = (service: any) => {
    setBookingData((prev) => ({ ...prev, service: service.name }))
    addMessage(`${language === "en" ? "I chose:" : "Ho scelto:"} ${service.name}`, true)

    setTimeout(() => {
      addMessage(t.dateSelection, false, "date-selection")
      setCurrentStep("date-selection")
    }, 500)
  }

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date)
    const dateString = date.toLocaleDateString(language === "en" ? "en-US" : "it-IT")
    setBookingData((prev) => ({ ...prev, date: dateString }))
    addMessage(`${language === "en" ? "Selected date:" : "Data selezionata:"} ${dateString}`, true)

    setTimeout(() => {
      addMessage(t.timeSelection, false, "time-selection")
      setCurrentStep("time-selection")
    }, 500)
  }

  const handleTimeSelection = (time: string) => {
    setBookingData((prev) => ({ ...prev, time }))
    addMessage(`${language === "en" ? "Selected time:" : "Orario selezionato:"} ${time}`, true)

    setTimeout(() => {
      addMessage(t.formRequest, false, "form")
      setCurrentStep("form")
    }, 500)
  }

  const handleFormSubmit = (formData: any) => {
    const updatedBookingData = { ...bookingData, ...formData }
    setBookingData(updatedBookingData)
    addMessage(language === "en" ? "Details entered correctly" : "Dati inseriti correttamente", true)

    setTimeout(() => {
      addMessage(t.confirming, false)
      setIsLoading(true)

      // Simulate booking confirmation
      setTimeout(() => {
        setIsLoading(false)
        addMessage("", false, "confirmation", updatedBookingData)
        setCurrentStep("completed")
      }, 2000)
    }, 500)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addMessage(inputValue, true)
    setInputValue("")

    // Simple responses for general questions
    setTimeout(() => {
      addMessage(t.generalResponse, false)
    }, 500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === "en" ? "en-US" : "it-IT", { hour: "2-digit", minute: "2-digit" })
  }

  const renderMessage = (message: Message) => {
    if (message.type === "service-selection") {
      return (
        <div className="space-y-3">
          <p className="text-sm text-gray-700 mb-3">{message.text}</p>
          <div className="grid grid-cols-1 gap-2">
            {t.services.map((service, index) => (
              <Button
                key={index}
                onClick={() => handleServiceSelection(service)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-left h-auto"
                disabled={currentStep !== "welcome"}
              >
                <div>
                  <div className="font-semibold">{service.name}</div>
                  <div className="text-sm text-blue-100">{service.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )
    }

    if (message.type === "date-selection") {
      return (
        <div className="space-y-3">
          <p className="text-sm text-gray-700 mb-3">{message.text}</p>
          <div className="bg-white border rounded-lg p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && handleDateSelection(date)}
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              locale={language}
              className="w-full"
            />
          </div>
        </div>
      )
    }

    if (message.type === "time-selection") {
      return (
        <div className="space-y-3">
          <p className="text-sm text-gray-700 mb-3">{message.text}</p>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                onClick={() => handleTimeSelection(time)}
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={currentStep !== "time-selection"}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )
    }

    if (message.type === "form") {
      return (
        <div className="space-y-3">
          <p className="text-sm text-gray-700 mb-3">{message.text}</p>
          <BookingForm onSubmit={handleFormSubmit} disabled={currentStep !== "form"} language={language} />
        </div>
      )
    }

    if (message.type === "confirmation") {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            <h3 className="font-bold text-green-800">{t.confirmed}</h3>
          </div>
          <div className="space-y-2 text-sm text-green-700">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>
                <strong>{language === "en" ? "Service:" : "Servizio:"}</strong> {message.data.service}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>
                <strong>{language === "en" ? "Date and Time:" : "Data e Ora:"}</strong> {message.data.date}{" "}
                {language === "en" ? "at" : "alle"} {message.data.time}
              </span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>
                <strong>{language === "en" ? "Name:" : "Nome:"}</strong> {message.data.name}
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>
                <strong>Email:</strong> {message.data.email}
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>
                <strong>{language === "en" ? "Phone:" : "Telefono:"}</strong> {message.data.phone}
              </span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>{language === "en" ? "Booking ID:" : "ID Prenotazione:"}</strong> #BOOK-
              {Date.now().toString().slice(-6)}
            </p>
            <p className="text-sm text-green-700 mt-1">
              {language === "en"
                ? "You will receive a confirmation email shortly. We will contact you to confirm the details."
                : "Riceverai una email di conferma a breve. Ti contatteremo per confermare i dettagli."}
            </p>
          </div>
        </div>
      )
    }

    return <p className="text-sm text-gray-700">{message.text}</p>
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{t.title}</h3>
              <p className="text-blue-100 text-sm">{t.subtitle}</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-white border-0">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            {language === "en" ? "Online" : "Online"}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[85%]">
              {!message.isUser && (
                <div className="flex items-start space-x-2">
                  <div className="p-2 bg-blue-100 rounded-full mt-1 flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border">
                    {renderMessage(message)}
                    <div className="text-xs text-gray-500 mt-2">{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              )}
              {message.isUser && (
                <div className="flex items-start space-x-2 justify-end">
                  <div className="bg-blue-500 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-sm">
                    <div className="text-sm">{message.text}</div>
                    <div className="text-xs text-blue-100 mt-2">{formatTime(message.timestamp)}</div>
                  </div>
                  <div className="p-2 bg-blue-500 rounded-full mt-1 flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={t.placeholder}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function BookingForm({
  onSubmit,
  disabled,
  language,
}: { onSubmit: (data: any) => void; disabled: boolean; language: "it" | "en" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.phone) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Input
          placeholder={t.formPlaceholders.name}
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder={t.formPlaceholders.email}
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Input
          type="tel"
          placeholder={t.formPlaceholders.phone}
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Input
          placeholder={t.formPlaceholders.message}
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          disabled={disabled}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white"
        disabled={disabled || !formData.name || !formData.email || !formData.phone}
      >
        <CheckCircle className="w-4 h-4 mr-2" />
        {t.confirmButton}
      </Button>
    </form>
  )
}
