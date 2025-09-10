"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Bot, Send, Calendar } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "services" | "consultation"
}

export default function BusinessChatbot() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const texts = {
    en: {
      title: "Business Consultant",
      subtitle: "Grow your business with AI",
      greeting:
        "Hello! I'm your business consultant. I can help you understand our services, provide business insights, and schedule consultations. How can I help your business grow today?",
      services: "Here are our main business services:",
      consultation:
        "I'd be happy to schedule a consultation for you. Our experts can provide personalized advice for your business needs.",
      placeholder: "Ask about our services...",
      bookConsultation: "Book Consultation",
      learnMore: "Learn More",
    },
    it: {
      title: "Consulente Business",
      subtitle: "Fai crescere il tuo business con l'AI",
      greeting:
        "Ciao! Sono il tuo consulente business. Posso aiutarti a capire i nostri servizi, fornire insights aziendali e programmare consulenze. Come posso aiutare la tua azienda a crescere oggi?",
      services: "Ecco i nostri principali servizi business:",
      consultation:
        "Sarò felice di programmare una consulenza per te. I nostri esperti possono fornire consigli personalizzati per le esigenze della tua azienda.",
      placeholder: "Chiedi sui nostri servizi...",
      bookConsultation: "Prenota Consulenza",
      learnMore: "Scopri di Più",
    },
  }

  const t = texts[language]

  const services = [
    {
      id: "automation",
      name: language === "en" ? "AI Automation" : "Automazione AI",
      description:
        language === "en"
          ? "Streamline your processes with intelligent automation"
          : "Ottimizza i tuoi processi con automazione intelligente",
      icon: "🤖",
      benefits: language === "en" ? "75% time reduction" : "75% riduzione tempo",
    },
    {
      id: "analytics",
      name: language === "en" ? "Business Analytics" : "Analytics Aziendali",
      description:
        language === "en"
          ? "Data-driven insights for better decisions"
          : "Insights basati sui dati per decisioni migliori",
      icon: "📊",
      benefits: language === "en" ? "300% ROI increase" : "300% aumento ROI",
    },
    {
      id: "marketing",
      name: language === "en" ? "AI Marketing" : "Marketing AI",
      description:
        language === "en"
          ? "Personalized marketing campaigns that convert"
          : "Campagne marketing personalizzate che convertono",
      icon: "🎯",
      benefits: language === "en" ? "180% conversion boost" : "180% aumento conversioni",
    },
  ]

  useEffect(() => {
    const initialMessage: Message = {
      id: "1",
      text: t.greeting,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages([initialMessage])
  }, [language])

  const addMessage = (text: string, sender: "user" | "bot", type: "text" | "services" | "consultation" = "text") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type,
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

  const handleSend = (message: string) => {
    if (!message.trim()) return

    addMessage(message, "user")
    setInputValue("")

    simulateTyping(() => {
      if (
        message.toLowerCase().includes("service") ||
        message.toLowerCase().includes("serviz") ||
        message.toLowerCase().includes("help") ||
        message.toLowerCase().includes("aiut")
      ) {
        addMessage(t.services, "bot", "services")
      } else if (
        message.toLowerCase().includes("consultation") ||
        message.toLowerCase().includes("consulenz") ||
        message.toLowerCase().includes("meeting") ||
        message.toLowerCase().includes("appointment")
      ) {
        addMessage(t.consultation, "bot", "consultation")
      } else {
        const responses =
          language === "en"
            ? [
                "I can help you understand how AI can transform your business. Would you like to see our services?",
                "Our solutions have helped businesses increase efficiency by up to 75%. What's your biggest business challenge?",
                "We specialize in AI automation, analytics, and marketing. Which area interests you most?",
              ]
            : [
                "Posso aiutarti a capire come l'AI può trasformare la tua azienda. Vuoi vedere i nostri servizi?",
                "Le nostre soluzioni hanno aiutato le aziende ad aumentare l'efficienza fino al 75%. Qual è la tua sfida aziendale più grande?",
                "Siamo specializzati in automazione AI, analytics e marketing. Quale area ti interessa di più?",
              ]
        addMessage(responses[Math.floor(Math.random() * responses.length)], "bot")
      }
    })
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5" />
          <div>
            <div className="font-semibold">{t.title}</div>
            <div className="text-sm opacity-90">{t.subtitle}</div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] ${message.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-100"} rounded-lg p-3`}
              >
                {message.sender === "bot" && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="h-4 w-4 text-purple-600" />
                    <Badge variant="secondary" className="text-xs">
                      Business Consultant
                    </Badge>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>

                {message.type === "services" && (
                  <div className="mt-3 space-y-3">
                    {services.map((service) => (
                      <div key={service.id} className="border rounded-lg p-3 bg-white">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{service.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                {service.benefits}
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-purple-600 border-purple-200 hover:bg-purple-50 bg-transparent"
                              >
                                {t.learnMore}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {message.type === "consultation" && (
                  <div className="mt-3 p-4 bg-white rounded-lg border border-purple-200">
                    <div className="text-center">
                      <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900 mb-2">
                        {language === "en" ? "Free Business Consultation" : "Consulenza Business Gratuita"}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {language === "en"
                          ? "30-minute session with our business experts"
                          : "Sessione di 30 minuti con i nostri esperti business"}
                      </p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">{t.bookConsultation}</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-purple-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.placeholder}
              onKeyPress={(e) => e.key === "Enter" && handleSend(inputValue)}
              className="flex-1"
            />
            <Button onClick={() => handleSend(inputValue)} className="bg-purple-600 hover:bg-purple-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
