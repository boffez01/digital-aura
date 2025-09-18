"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  AlertTriangle,
  Settings,
  HelpCircle,
  Calendar,
  Headphones,
  Minimize2,
} from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  supportActive?: boolean
  supportLevel?: number
}

interface ChatResponse {
  response: string
  supportActive?: boolean
  supportLevel?: number
  context?: {
    bookingMode?: boolean
  }
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [supportMode, setSupportMode] = useState({ active: false, level: 0 })
  const [bookingMode, setBookingMode] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState<"it" | "en">("it")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Genera session ID
  useEffect(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
  }, [])

  // Monitora cambio lingua
  useEffect(() => {
    const checkLanguage = () => {
      const savedLanguage = localStorage.getItem("language")
      if (savedLanguage === "it" || savedLanguage === "en") {
        setCurrentLanguage(savedLanguage)
      }
    }
    checkLanguage()
    const interval = setInterval(checkLanguage, 500)
    return () => clearInterval(interval)
  }, [])

  const translations = {
    it: {
      title: "Digital Aura AI",
      supportTitle: "Supporto Tecnico",
      bookingTitle: "Prenotazione Attiva",
      placeholder: "Scrivi un messaggio...",
      quickActions: "Azioni rapide:",
      services: "Servizi",
      faq: "FAQ",
      book: "Prenota",
      support: "Assistenza",
      welcome:
        "👋 **Ciao! Sono AuraBot, l'assistente AI di Digital Aura.**\n\nPosso aiutarti con:\n\n🤖 **Servizi AI** - Automazione e chatbots intelligenti\n🌐 **Sviluppo Web** - Siti moderni e e-commerce\n📊 **AI Marketing** - Campagne automatizzate\n📅 **Prenotazioni** - Consulenze gratuite DIRETTAMENTE QUI\n\n**Come posso aiutarti oggi?** 😊",
      connectionError: "Mi dispiace, ho problemi di connessione. Riprova tra poco o contattaci direttamente.",
    },
    en: {
      title: "Digital Aura AI",
      supportTitle: "Technical Support",
      bookingTitle: "Booking Active",
      placeholder: "Type a message...",
      quickActions: "Quick actions:",
      services: "Services",
      faq: "FAQ",
      book: "Book",
      support: "Support",
      welcome:
        "👋 **Hello! I'm AuraBot, Digital Aura's AI assistant.**\n\nI can help you with:\n\n🤖 **AI Services** - Automation and intelligent chatbots\n🌐 **Web Development** - Modern websites and e-commerce\n📊 **AI Marketing** - Automated campaigns\n📅 **Bookings** - Free consultations DIRECTLY HERE\n\n**How can I help you today?** 😊",
      connectionError: "Sorry, I'm having connection issues. Please try again or contact us directly.",
    },
  }

  const t = translations[currentLanguage]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mostra messaggio di benvenuto
  useEffect(() => {
    if (isOpen && !isMinimized) {
      const welcomeMessage: Message = {
        id: `welcome-${currentLanguage}-${Date.now()}`,
        text: t.welcome,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [currentLanguage, isOpen, isMinimized, t.welcome])

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim()
    if (!textToSend || !sessionId) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      console.log(`📤 Sending: "${textToSend}"`)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          language: currentLanguage,
          sessionId: sessionId,
        }),
      })

      console.log(`📥 Status: ${response.status}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data: ChatResponse = await response.json()
      console.log("✅ Response:", data)

      // Verifica che la risposta sia valida
      if (!data || !data.response || typeof data.response !== "string") {
        throw new Error("Invalid response format")
      }

      // Aggiorna stati
      if (data.supportActive !== undefined) {
        setSupportMode({
          active: data.supportActive,
          level: data.supportLevel || 0,
        })
      }

      if (data.context?.bookingMode !== undefined) {
        setBookingMode(data.context.bookingMode)
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
        supportActive: data.supportActive,
        supportLevel: data.supportLevel,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error: any) {
      console.error("❌ Error:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t.connectionError,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      it: {
        services: "Dimmi di più sui vostri servizi",
        faq: "Ho alcune domande frequenti",
        book: "Voglio prenotare un appuntamento",
        support: "Ho bisogno di assistenza tecnica",
      },
      en: {
        services: "Tell me more about your services",
        faq: "I have some frequently asked questions",
        book: "I want to book an appointment",
        support: "I need technical support",
      },
    }

    const messages = actionMessages[currentLanguage]
    const messageText = messages[action as keyof typeof messages] || action
    sendMessage(messageText)
  }

  // FUNZIONE CORRETTA per formattare i messaggi
  const formatMessage = (text: string) => {
    if (!text || typeof text !== "string") {
      return "Messaggio non valido"
    }

    return text.split("\n").map((line, index) => {
      // Gestisce il grassetto **testo**
      const parts = line.split(/(\*\*.*?\*\*)/)

      return (
        <span key={index}>
          {parts.map((part, partIndex) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={partIndex}>{part.slice(2, -2)}</strong>
            }
            return part
          })}
          {index < text.split("\n").length - 1 && <br />}
        </span>
      )
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(currentLanguage === "en" ? "en-US" : "it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getHeaderColor = () => {
    if (bookingMode) {
      return "bg-gradient-to-r from-green-500 via-green-600 to-green-700"
    }
    if (supportMode.active) {
      return "bg-gradient-to-r from-red-500 via-red-600 to-red-700 animate-pulse"
    }
    return "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700"
  }

  const getFloatingButtonColor = () => {
    if (bookingMode) {
      return "bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800"
    }
    if (supportMode.active) {
      return "bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 animate-pulse"
    }
    return "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:from-cyan-600 hover:via-blue-700 hover:to-indigo-800 animate-pulse hover:animate-none"
  }

  const getFloatingButtonIcon = () => {
    if (bookingMode) {
      return <Calendar className="w-8 h-8" />
    }
    if (supportMode.active) {
      return <AlertTriangle className="w-8 h-8" />
    }
    return <MessageCircle className="w-8 h-8" />
  }

  const getTitle = () => {
    if (bookingMode) {
      return t.bookingTitle
    }
    if (supportMode.active) {
      return t.supportTitle
    }
    return t.title
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulsante fluttuante */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${getFloatingButtonColor()} text-white`}
        >
          {getFloatingButtonIcon()}
        </Button>
      )}

      {/* Widget chat */}
      {isOpen && (
        <Card
          className={`w-96 bg-slate-800 shadow-2xl border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-16" : "h-[600px]"
          }`}
        >
          {/* Header */}
          <div className={`p-4 rounded-t-2xl ${getHeaderColor()} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-white/20 rounded-full">
                  {bookingMode ? (
                    <Calendar className="w-4 h-4" />
                  ) : supportMode.active ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div className="text-lg font-bold">{getTitle()}</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 w-8 h-8"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 w-8 h-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <div className="p-0 flex flex-col h-[536px] bg-slate-800">
              {/* Azioni rapide */}
              <div className="p-4 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center mb-3">
                  <span className="text-sm font-semibold text-slate-300">🚀 {t.quickActions}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleQuickAction("services")}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>{t.services}</span>
                  </Button>
                  <Button
                    onClick={() => handleQuickAction("faq")}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{t.faq}</span>
                  </Button>
                  <Button
                    onClick={() => handleQuickAction("book")}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.book}</span>
                  </Button>
                  <Button
                    onClick={() => handleQuickAction("support")}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Headphones className="w-4 h-4" />
                    <span>{t.support}</span>
                  </Button>
                </div>
              </div>

              {/* Area messaggi */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[85%]">
                      {!message.isUser && (
                        <div className="flex items-start space-x-2">
                          <div className="p-2 bg-slate-700 rounded-full mt-1 flex-shrink-0">
                            <Bot className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="bg-slate-700 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                            <div className="text-sm leading-relaxed text-slate-200">{formatMessage(message.text)}</div>
                            <div className="text-xs text-slate-500 mt-2">{formatTime(message.timestamp)}</div>
                          </div>
                        </div>
                      )}
                      {message.isUser && (
                        <div className="flex items-start space-x-2 justify-end">
                          <div className="bg-cyan-600 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-sm">
                            <div className="text-sm leading-relaxed font-medium">{message.text}</div>
                            <div className="text-xs text-cyan-100 mt-2">{formatTime(message.timestamp)}</div>
                          </div>
                          <div className="p-2 bg-cyan-600 rounded-full mt-1 flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Indicatore di digitazione */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="p-2 bg-slate-700 rounded-full">
                        <Bot className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="bg-slate-700 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Area input */}
              <div className="p-4 bg-slate-800 border-t border-slate-700">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.placeholder}
                    className="flex-1 border border-slate-600 focus:border-cyan-500 rounded-full px-4 py-2 bg-slate-700 text-white"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => sendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
