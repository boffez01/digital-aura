"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, Building2, Calendar, Clock } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  services?: Service[]
  options?: string[]
}

interface Service {
  id: string
  name: string
  duration: string
  price: number
  description: string
  available: boolean
}

const sampleServices: Service[] = [
  {
    id: "1",
    name: "Consulenza Strategica",
    duration: "2 ore",
    price: 200,
    description: "Analisi completa della strategia aziendale",
    available: true,
  },
  {
    id: "2",
    name: "Audit Digitale",
    duration: "4 ore",
    price: 350,
    description: "Valutazione completa della presenza digitale",
    available: true,
  },
  {
    id: "3",
    name: "Formazione Team",
    duration: "1 giornata",
    price: 800,
    description: "Workshop di formazione per il team",
    available: false,
  },
]

export default function BusinessChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Benvenuto! Sono l'assistente di Digital Aura Business Services. Posso aiutarti con prenotazioni, preventivi e informazioni sui nostri servizi. 💼",
      timestamp: new Date(),
      options: ["Prenota un servizio", "Richiedi preventivo", "I nostri servizi", "Supporto"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [appointments, setAppointments] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const addMessage = (content: string, type: "user" | "bot", services?: Service[], options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      services,
      options,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      callback()
    }, delay)
  }

  const handleOptionClick = (option: string) => {
    addMessage(option, "user")
    simulateTyping(() => {
      switch (option) {
        case "Prenota un servizio":
          addMessage(
            "Perfetto! Ecco i nostri servizi disponibili per la prenotazione. Seleziona quello che ti interessa:",
            "bot",
            sampleServices.filter((s) => s.available),
            ["Prenota ora", "Vedi dettagli", "Confronta servizi"],
          )
          break
        case "Richiedi preventivo":
          addMessage(
            "Sarò felice di prepararti un preventivo personalizzato! Di che tipo di servizio hai bisogno?",
            "bot",
            undefined,
            ["Consulenza", "Sviluppo", "Marketing", "Formazione", "Altro"],
          )
          break
        case "I nostri servizi":
          addMessage("Ecco una panoramica completa dei nostri servizi business:", "bot", sampleServices, [
            "Prenota servizio",
            "Richiedi info",
            "Confronta prezzi",
          ])
          break
        case "Supporto":
          addMessage("Il nostro team di supporto è qui per aiutarti! Come posso assisterti?", "bot", undefined, [
            "Problema tecnico",
            "Modifica prenotazione",
            "Fatturazione",
            "Altro",
          ])
          break
        case "Prenota ora":
          if (sampleServices[0]) {
            const service = sampleServices[0]
            setAppointments((prev) => [...prev, service])
            addMessage(
              `✅ Prenotazione confermata per ${service.name}! Ti invieremo una email di conferma con tutti i dettagli. Hai bisogno di altro?`,
              "bot",
              undefined,
              ["Prenota altro servizio", "Modifica prenotazione", "Vai al riepilogo"],
            )
          }
          break
        default:
          handleGeminiResponse(option)
      }
    })
  }

  const handleGeminiResponse = async (userMessage: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: "business",
          services: sampleServices,
          appointments: appointments,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        addMessage(data.response, "bot", undefined, [
          "Prenota servizio",
          "Richiedi preventivo",
          "I nostri servizi",
          "Supporto",
        ])
      } else {
        addMessage(
          "Mi dispiace, sto avendo problemi tecnici. Posso aiutarti con le opzioni qui sotto:",
          "bot",
          undefined,
          ["I nostri servizi", "Supporto", "Richiedi preventivo"],
        )
      }
    } catch (error) {
      addMessage("Scusa, c'è stato un errore. Prova con una delle opzioni qui sotto:", "bot", undefined, [
        "I nostri servizi",
        "Prenota un servizio",
        "Supporto",
      ])
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    const message = inputValue.trim()
    addMessage(message, "user")
    setInputValue("")
    simulateTyping(() => handleGeminiResponse(message))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-to-br from-green-50 to-white border-green-200">
      <CardHeader className="border-b border-green-200 bg-green-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg">Business Services Bot</CardTitle>
              <p className="text-green-100 text-sm">Il tuo assistente business</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-white/20 text-white border-white/30">
              <Calendar className="w-3 h-3 mr-1" />
              {appointments.length}
            </Badge>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                    }`}
                  >
                    {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-green-600 text-white"
                        : "bg-white border border-green-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>

                    {/* Services Display */}
                    {message.services && (
                      <div className="mt-3 space-y-2">
                        {message.services.map((service) => (
                          <div key={service.id} className="bg-gray-50 rounded-lg p-3 border">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-gray-900">{service.name}</h4>
                                <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                                <div className="flex items-center space-x-3 mt-2">
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {service.duration}
                                  </div>
                                  <span className="text-lg font-bold text-green-600">€{service.price}</span>
                                  <Badge
                                    className={`text-xs ${
                                      service.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {service.available ? "Disponibile" : "Non disponibile"}
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white ml-3"
                                disabled={!service.available}
                                onClick={() => {
                                  if (service.available) {
                                    setAppointments((prev) => [...prev, service])
                                    addMessage(`✅ Prenotazione confermata per ${service.name}!`, "bot", undefined, [
                                      "Prenota altro",
                                      "Vai al riepilogo",
                                    ])
                                  }
                                }}
                              >
                                <Calendar className="w-3 h-3 mr-1" />
                                {service.available ? "Prenota" : "Non disp."}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Options */}
                    {message.options && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="block w-full text-left p-2 rounded bg-green-50 hover:bg-green-100 transition-colors border border-green-200 text-sm text-green-800"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-green-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-green-200 p-4 bg-green-50">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Scrivi il tuo messaggio..."
              className="flex-1 border-green-200 focus:border-green-400"
            />
            <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
