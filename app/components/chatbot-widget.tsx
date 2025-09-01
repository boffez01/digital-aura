"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Loader2, Headphones, Calendar, HelpCircle, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatbotWidgetProps {
  context?: "ecommerce" | "business" | "support"
  products?: any[]
  services?: any[]
  faqs?: any[]
  cart?: any[]
  appointments?: any[]
}

export default function ChatbotWidget({
  context = "default",
  products,
  services,
  faqs,
  cart,
  appointments,
}: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "1",
        content: "Ciao! Sono l'assistente virtuale di Digital Aura. Come posso aiutarti oggi?",
        isUser: false,
        timestamp: new Date(),
      }

      setMessages([welcomeMessage])
    }
  }, [isOpen, context])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          context,
          products,
          services,
          faqs,
          cart,
          appointments,
        }),
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Errore invio messaggio:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Mi dispiace, si è verificato un errore. Riprova tra qualche momento.",
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
    setInputValue(action)
    sendMessage()
  }

  const renderMessage = (message: Message) => {
    if (!message.content) {
      return <div className="text-gray-500 italic">Messaggio non disponibile</div>
    }

    return <div className="whitespace-pre-wrap">{message.content}</div>
  }

  return (
    <>
      {/* Pulsante floating con gradiente viola-blu */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-40 transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
        size="icon"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </Button>

      {/* Widget chat con nuovo design */}
      <div
        className={`fixed bottom-6 right-6 w-96 h-[500px] z-50 transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <Card className="h-full flex flex-col shadow-2xl border-0 rounded-2xl overflow-hidden">
          {/* Header con gradiente */}
          <CardHeader className="pb-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Digital Aura AI</CardTitle>
                  <p className="text-white/80 text-sm">Il tuo assistente AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Timestamp */}
            <div className="px-4 py-2 bg-gray-50 border-b">
              <p className="text-xs text-gray-500 text-center">
                {new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            {/* Area messaggi */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.isUser
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white ml-8"
                        : "bg-gray-100 text-gray-800 mr-8"
                    }`}
                  >
                    {renderMessage(message)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl max-w-[80%] mr-8">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                      <span className="text-gray-600 text-sm">Sto scrivendo...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Azioni rapide */}
            {messages.length === 1 && (
              <div className="px-4 pb-3">
                <p className="text-xs text-gray-500 mb-3 text-center">Azioni rapide:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleQuickAction("Vorrei informazioni sui vostri servizi")}
                    className="bg-purple-500 hover:bg-purple-600 text-white text-xs py-2 px-3 rounded-full flex items-center gap-1"
                    size="sm"
                  >
                    <Briefcase className="w-3 h-3" />
                    Servizi
                  </Button>
                  <Button
                    onClick={() => handleQuickAction("Ho bisogno di supporto tecnico")}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded-full flex items-center gap-1"
                    size="sm"
                  >
                    <HelpCircle className="w-3 h-3" />
                    FAQ
                  </Button>
                  <Button
                    onClick={() => handleQuickAction("Vorrei prenotare una consulenza")}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-3 rounded-full flex items-center gap-1"
                    size="sm"
                  >
                    <Calendar className="w-3 h-3" />
                    Prenota
                  </Button>
                  <Button
                    onClick={() => handleQuickAction("Ho bisogno di assistenza")}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs py-2 px-3 rounded-full flex items-center gap-1"
                    size="sm"
                  >
                    <Headphones className="w-3 h-3" />
                    Assistenza
                  </Button>
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 text-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  size="icon"
                  disabled={!inputValue.trim() || isLoading}
                  className="h-10 w-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
