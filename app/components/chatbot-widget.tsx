// in app/components/chatbot-widget.tsx

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
  CheckCircle,
  Clock,
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
  response: string; // Si aspetta SEMPRE 'response'
  quickActions?: Array<{ text: string; action: string }>;
  supportActive?: boolean;
  supportLevel?: number;
  context?: {
    flow: string;
    step: number | string;
    hasUserInfo: boolean;
    needsHuman: boolean;
    escalationActive?: boolean;
    bookingMode?: boolean;
    completed?: boolean;
  };
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [supportMode, setSupportMode] = useState({ active: false, level: 0 })
  const [bookingMode, setBookingMode] = useState(false)
  const [escalationActive, setEscalationActive] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState<"it" | "en">("it")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
  }, [])

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
      onlineNow: "Online ora",
      placeholder: "Scrivi un messaggio...",
      quickActions: "Azioni rapide:",
      services: "Servizi",
      faq: "FAQ",
      book: "Prenota",
      support: "Assistenza",
      welcome: `👋 **Ciao! Sono AuraBot, l'assistente AI di Digital Aura.**

Posso aiutarti con:

🤖 **Servizi AI** - Automazione e chatbots intelligenti
🌐 **Sviluppo Web** - Siti moderni e e-commerce  
📊 **AI Marketing** - Campagne automatizzate
📅 **Prenotazioni** - Consulenze gratuite DIRETTAMENTE QUI

**Come posso aiutarti oggi?** 😊`,
      connectionError: "Mi dispiace, ho problemi di connessione. Riprova tra poco o contattaci direttamente.",
      supportHeader: "Assistenza Tecnica Attiva",
      bookingHeader: "Prenotazione in Corso",
      supportSubtext: "Sto analizzando il tuo problema per trovare la soluzione migliore",
      bookingSubtext: "Ti sto guidando nella prenotazione della tua consulenza gratuita",
    },
    en: {
      title: "Digital Aura AI",
      supportTitle: "Technical Support",
      bookingTitle: "Booking Active",
      onlineNow: "Online now",
      placeholder: "Type a message...",
      quickActions: "Quick actions:",
      services: "Services",
      faq: "FAQ",
      book: "Book",
      support: "Support",
      welcome: `👋 **Hello! I'm AuraBot, Digital Aura's AI assistant.**

I can help you with:

🤖 **AI Services** - Automation and intelligent chatbots
🌐 **Web Development** - Modern websites and e-commerce
📊 **AI Marketing** - Automated campaigns  
📅 **Bookings** - Free consultations DIRECTLY HERE

**How can I help you today?** 😊`,
      connectionError: "Sorry, I'm having connection issues. Please try again or contact us directly.",
      supportHeader: "Technical Support Active",
      bookingHeader: "Booking in Progress",
      supportSubtext: "Analyzing your problem to find the best solution",
      bookingSubtext: "Guiding you through booking your free consultation",
    },
  }

  const t = translations[currentLanguage]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      const welcomeMessage: Message = {
        id: `welcome-${currentLanguage}-${Date.now()}`,
        text: t.welcome,
        isUser: false,
        timestamp: new Date(),
        supportActive: false,
        supportLevel: 0,
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
      console.log(`📤 Sending message: "${textToSend}"`)

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

      console.log(`📥 Response status: ${response.status}`)
      
      const data: ChatResponse = await response.json();
      console.log(`✅ Received response:`, data)

      // --- LOGICA DI GESTIONE ROBUSTA ---
      // Ora gestiamo sia le risposte di successo che quelle di errore (es. 500),
      // purché abbiano la proprietà 'response'.
      if (!data.response) {
          throw new Error("Risposta del server non valida o malformata.");
      }

      // Update states based on response context if available
      if (data.supportActive !== undefined) {
        setSupportMode({
          active: data.supportActive,
          level: data.supportLevel || 0,
        })
      }
      if (data.context?.bookingMode !== undefined) {
        setBookingMode(data.context.bookingMode)
      }
      if (data.context?.escalationActive !== undefined) {
        setEscalationActive(data.context.escalationActive)
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response, // Ora siamo sicuri che esista
        isUser: false,
        timestamp: new Date(),
        supportActive: data.supportActive,
        supportLevel: data.supportLevel,
      }

      setMessages((prev) => [...prev, botMessage])

    } catch (error: any) {
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error.message || t.connectionError, // Mostra l'errore specifico o uno generico
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
    sendMessage(messages[action as keyof typeof messages] || action)
  }

  const formatMessage = (text: string) => {
    if (typeof text !== 'string') {
        return 'Si è verificato un errore nella visualizzazione del messaggio.';
    }
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line.replace(/\*\*(.*?)\*\*/g, (match, p1) => <strong>{p1}</strong>)}
        {index < text.split("\n").length - 1 && <br />}
      </span>
    ))
  }

  const getSupportIcon = (level?: number) => {
    switch (level) {
      case 1:
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 2:
        return <Clock className="w-4 h-4 text-orange-500" />
      case 3:
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 4:
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return bookingMode ? <Calendar className="w-4 h-4 text-green-500" /> : <Bot className="w-4 h-4 text-blue-500" />
    }
  }

  const getStatusHeader = (supportActive?: boolean, supportLevel?: number) => {
    if (bookingMode) {
      return (
        <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-3 rounded-r-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-green-700">{t.bookingHeader}</span>
          </div>
          <p className="text-sm text-green-600 mt-1">{t.bookingSubtext}</p>
          <p className="text-xs text-green-500 mt-2">
            {new Date().toLocaleTimeString(currentLanguage === "en" ? "en-US" : "it-IT", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      )
    }

    if (!supportActive && !escalationActive) return null

    const headerText = escalationActive
      ? currentLanguage === "en"
        ? "Support Data Collection"
        : "Raccolta Dati Supporto"
      : t.supportHeader
    const subText = escalationActive
      ? currentLanguage === "en"
        ? "Collecting your data to organize technical support"
        : "Sto raccogliendo i tuoi dati per organizzare il supporto tecnico"
      : t.supportSubtext

    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-3 rounded-r-lg">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span className="font-semibold text-red-700">{headerText}</span>
        </div>
        <p className="text-sm text-red-600 mt-1">{subText}</p>
        <p className="text-xs text-red-500 mt-2">
          {new Date().toLocaleTimeString(currentLanguage === "en" ? "en-US" : "it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    )
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
    if (supportMode.active || escalationActive) {
      return "bg-gradient-to-r from-red-500 via-red-600 to-red-700 animate-pulse"
    }
    return "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700"
  }

  const getFloatingButtonColor = () => {
    if (bookingMode) {
      return "bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800"
    }
    if (supportMode.active || escalationActive) {
      return "bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 animate-pulse"
    }
    return "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:from-cyan-600 hover:via-blue-700 hover:to-indigo-800 animate-pulse hover:animate-none"
  }

  const getFloatingButtonIcon = () => {
    if (bookingMode) {
      return <Calendar className="w-8 h-8" />
    }
    if (supportMode.active || escalationActive) {
      return <AlertTriangle className="w-8 h-8" />
    }
    return <MessageCircle className="w-8 h-8" />
  }

  const getTitle = () => {
    if (bookingMode) {
      return t.bookingTitle
    }
    if (supportMode.active || escalationActive) {
      return t.supportTitle
    }
    return t.title
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${getFloatingButtonColor()} text-white`}
        >
          {getFloatingButtonIcon()}
        </Button>
      )}

      {isOpen && (
        <Card
          className={`w-96 bg-slate-800 shadow-2xl border border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-16" : "h-[600px]"
          }`}
        >
          <div className={`p-4 rounded-t-2xl ${getHeaderColor()} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-white/20 rounded-full">
                  {bookingMode ? (
                    <Calendar className="w-4 h-4" />
                  ) : supportMode.active || escalationActive ? (
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

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
                {(supportMode.active || escalationActive || bookingMode) &&
                  getStatusHeader(supportMode.active, supportMode.level)}

                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[85%]">
                      {!message.isUser && (
                        <div className="flex items-start space-x-2">
                          <div
                            className={`p-2 rounded-full mt-1 flex-shrink-0 ${
                              message.supportActive || escalationActive
                                ? "bg-red-100"
                                : bookingMode
                                  ? "bg-green-100"
                                  : "bg-slate-700"
                            }`}
                          >
                            {getSupportIcon(message.supportLevel)}
                          </div>
                          <div
                            className={`rounded-2xl rounded-tl-md px-4 py-3 shadow-sm ${
                              message.supportActive || escalationActive
                                ? "bg-red-50 border border-red-200"
                                : bookingMode
                                  ? "bg-green-50 border border-green-200"
                                  : "bg-slate-700"
                            }`}
                          >
                            <div
                              className={`text-sm leading-relaxed ${
                                message.supportActive || escalationActive
                                  ? "text-red-900"
                                  : bookingMode
                                    ? "text-green-900"
                                    : "text-slate-200"
                              }`}
                            >
                              {formatMessage(message.text)}
                            </div>
                            <div
                              className={`text-xs mt-2 ${
                                message.supportActive || escalationActive
                                  ? "text-red-500"
                                  : bookingMode
                                    ? "text-green-500"
                                    : "text-slate-500"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </div>
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

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className={`p-2 rounded-full ${ supportMode.active || escalationActive ? "bg-red-100" : bookingMode ? "bg-green-100" : "bg-slate-700"}`}>
                        <Bot className={`w-4 h-4 ${ supportMode.active || escalationActive ? "text-red-600" : bookingMode ? "text-green-600" : "text-slate-400"}`} />
                      </div>
                      <div className={`rounded-2xl rounded-tl-md px-4 py-3 shadow-sm ${ supportMode.active || escalationActive ? "bg-red-100" : bookingMode ? "bg-green-100" : "bg-slate-700"}`}>
                        <div className="flex space-x-1">
                          <div className={`w-2 h-2 rounded-full animate-bounce ${ supportMode.active || escalationActive ? "bg-red-400" : bookingMode ? "bg-green-400" : "bg-slate-400"}`}></div>
                          <div className={`w-2 h-2 rounded-full animate-bounce ${ supportMode.active || escalationActive ? "bg-red-400" : bookingMode ? "bg-green-400" : "bg-slate-400"}`} style={{ animationDelay: "0.1s" }}></div>
                          <div className={`w-2 h-2 rounded-full animate-bounce ${ supportMode.active || escalationActive ? "bg-red-400" : bookingMode ? "bg-green-400" : "bg-slate-400"}`} style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

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
                    className={`rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200 ${
                      supportMode.active || escalationActive
                        ? "bg-red-600 hover:bg-red-700"
                        : bookingMode
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-cyan-600 hover:bg-cyan-700"
                    } text-white`}
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
