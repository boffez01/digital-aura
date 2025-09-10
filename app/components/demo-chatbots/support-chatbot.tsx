"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Headphones, AlertCircle, CheckCircle, Bot, Send, Phone } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "issue" | "solution"
  priority?: "low" | "medium" | "high"
}

export default function SupportChatbot() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const texts = {
    en: {
      title: "Customer Support",
      subtitle: "We're here to help 24/7",
      greeting:
        "Hi! I'm your support assistant. I can help you with technical issues, account problems, or general questions. What can I help you with today?",
      commonIssues: "Here are some common issues I can help with:",
      escalate: "I'll escalate this to our human support team. You should receive a response within 2 hours.",
      placeholder: "Describe your issue...",
      contactSupport: "Contact Human Support",
      solved: "Issue Resolved",
    },
    it: {
      title: "Supporto Clienti",
      subtitle: "Siamo qui per aiutarti 24/7",
      greeting:
        "Ciao! Sono il tuo assistente di supporto. Posso aiutarti con problemi tecnici, problemi dell'account o domande generali. Con cosa posso aiutarti oggi?",
      commonIssues: "Ecco alcuni problemi comuni con cui posso aiutare:",
      escalate: "Inoltrerò questo al nostro team di supporto umano. Dovresti ricevere una risposta entro 2 ore.",
      placeholder: "Descrivi il tuo problema...",
      contactSupport: "Contatta Supporto Umano",
      solved: "Problema Risolto",
    },
  }

  const t = texts[language]

  const commonIssues = [
    {
      id: "login",
      title: language === "en" ? "Login Problems" : "Problemi di Accesso",
      description: language === "en" ? "Can't access your account" : "Non riesci ad accedere al tuo account",
      priority: "medium" as const,
      solution:
        language === "en"
          ? "Try resetting your password or clearing your browser cache. If the issue persists, I can help you recover your account."
          : "Prova a reimpostare la password o cancellare la cache del browser. Se il problema persiste, posso aiutarti a recuperare il tuo account.",
    },
    {
      id: "payment",
      title: language === "en" ? "Payment Issues" : "Problemi di Pagamento",
      description: language === "en" ? "Billing or payment problems" : "Problemi di fatturazione o pagamento",
      priority: "high" as const,
      solution:
        language === "en"
          ? "I can check your payment status and help resolve billing issues. Let me connect you with our billing specialist."
          : "Posso controllare lo stato del tuo pagamento e aiutare a risolvere problemi di fatturazione. Ti metto in contatto con il nostro specialista fatturazione.",
    },
    {
      id: "technical",
      title: language === "en" ? "Technical Issues" : "Problemi Tecnici",
      description: language === "en" ? "Website or app not working" : "Sito web o app non funziona",
      priority: "medium" as const,
      solution:
        language === "en"
          ? "Let's troubleshoot this together. Can you tell me what browser you're using and what error message you're seeing?"
          : "Risolviamo questo problema insieme. Puoi dirmi che browser stai usando e che messaggio di errore vedi?",
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

  const addMessage = (
    text: string,
    sender: "user" | "bot",
    type: "text" | "issue" | "solution" = "text",
    priority?: "low" | "medium" | "high",
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type,
      priority,
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
        message.toLowerCase().includes("help") ||
        message.toLowerCase().includes("issue") ||
        message.toLowerCase().includes("problem") ||
        message.toLowerCase().includes("aiuto") ||
        message.toLowerCase().includes("problema")
      ) {
        addMessage(t.commonIssues, "bot", "issue")
      } else if (
        message.toLowerCase().includes("urgent") ||
        message.toLowerCase().includes("emergency") ||
        message.toLowerCase().includes("urgente") ||
        message.toLowerCase().includes("emergenza")
      ) {
        addMessage(t.escalate, "bot", "solution", "high")
      } else {
        const responses =
          language === "en"
            ? [
                "I understand your concern. Can you provide more details about the issue you're experiencing?",
                "I'm here to help! Let me know what specific problem you're facing and I'll do my best to assist you.",
                "Thank you for contacting support. Can you describe the issue in more detail so I can better assist you?",
              ]
            : [
                "Capisco la tua preoccupazione. Puoi fornire più dettagli sul problema che stai riscontrando?",
                "Sono qui per aiutare! Fammi sapere che problema specifico stai affrontando e farò del mio meglio per assisterti.",
                "Grazie per aver contattato il supporto. Puoi descrivere il problema in modo più dettagliato così posso assisterti meglio?",
              ]
        addMessage(responses[Math.floor(Math.random() * responses.length)], "bot")
      }
    })
  }

  const handleIssueSelect = (issue: (typeof commonIssues)[0]) => {
    addMessage(issue.title, "user")
    simulateTyping(() => {
      addMessage(issue.solution, "bot", "solution", issue.priority)
    })
  }

  const getPriorityColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Headphones className="h-5 w-5" />
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
                className={`max-w-[80%] ${message.sender === "user" ? "bg-orange-600 text-white" : "bg-gray-100"} rounded-lg p-3`}
              >
                {message.sender === "bot" && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="h-4 w-4 text-orange-600" />
                    <Badge variant="secondary" className="text-xs">
                      Support Agent
                    </Badge>
                    {message.priority && (
                      <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                        {message.priority.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                )}
                <p className="text-sm">{message.text}</p>

                {message.type === "issue" && (
                  <div className="mt-3 space-y-2">
                    {commonIssues.map((issue) => (
                      <Button
                        key={issue.id}
                        variant="outline"
                        className="w-full text-left justify-start h-auto py-3 bg-transparent"
                        onClick={() => handleIssueSelect(issue)}
                      >
                        <div className="flex items-center space-x-3">
                          <AlertCircle
                            className={`h-4 w-4 ${
                              issue.priority === "high"
                                ? "text-red-500"
                                : issue.priority === "medium"
                                  ? "text-yellow-500"
                                  : "text-green-500"
                            }`}
                          />
                          <div>
                            <div className="font-medium">{issue.title}</div>
                            <div className="text-xs text-gray-600">{issue.description}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}

                {message.type === "solution" && (
                  <div className="mt-3 p-3 bg-white rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {language === "en" ? "Solution Provided" : "Soluzione Fornita"}
                        </span>
                      </div>
                      {message.priority === "high" && (
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          <Phone className="h-3 w-3 mr-1" />
                          {t.contactSupport}
                        </Button>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        {t.solved}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        {language === "en" ? "Need More Help" : "Serve Altro Aiuto"}
                      </Button>
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
                  <Bot className="h-4 w-4 text-orange-600" />
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
            <Button onClick={() => handleSend(inputValue)} className="bg-orange-600 hover:bg-orange-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
