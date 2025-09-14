"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Headphones, AlertCircle, CheckCircle, Bot, Send, Phone, User, X, ArrowLeft } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "issue" | "solution"
  priority?: "low" | "medium" | "high"
}

interface SupportChatbotProps {
  onBack: () => void
}

export default function SupportChatbot({ onBack }: SupportChatbotProps) {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const texts = {
    en: {
      title: "Customer Support",
      subtitle: "We're here to help 24/7",
      online: "Online",
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
      online: "Online",
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
        return "text-red-400 bg-red-500/10 border-red-600"
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-600"
      case "low":
        return "text-green-400 bg-green-500/10 border-green-600"
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-600"
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-800">
      {/* Header - STILE BOOKING ASSISTANT */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="hover:bg-white/20 p-1 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Headphones className="w-5 h-5" />
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
        <button onClick={onBack} className="hover:bg-white/20 p-1 rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-800">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex items-start space-x-3 max-w-xs">
              {message.sender === "bot" && (
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`rounded-lg p-3 ${
                  message.sender === "user" ? "bg-orange-500 text-white" : "bg-slate-700 text-white"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="text-xs bg-orange-500/20 text-orange-300">
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
                <div className="text-xs opacity-75 mt-1">04:27 PM</div>

                {message.type === "issue" && (
                  <div className="mt-3 space-y-2">
                    {commonIssues.map((issue) => (
                      <Button
                        key={issue.id}
                        variant="outline"
                        className="w-full text-left justify-start h-auto py-3 bg-slate-800 border-slate-600 hover:bg-slate-700"
                        onClick={() => handleIssueSelect(issue)}
                      >
                        <div className="flex items-center space-x-3">
                          <AlertCircle
                            className={`h-4 w-4 ${
                              issue.priority === "high"
                                ? "text-red-400"
                                : issue.priority === "medium"
                                  ? "text-yellow-400"
                                  : "text-green-400"
                            }`}
                          />
                          <div>
                            <div className="font-medium text-white">{issue.title}</div>
                            <div className="text-xs text-slate-400">{issue.description}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}

                {message.type === "solution" && (
                  <div className="mt-3 p-3 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium text-white">
                          {language === "en" ? "Solution Provided" : "Soluzione Fornita"}
                        </span>
                      </div>
                      {message.priority === "high" && (
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          <Phone className="h-3 w-3 mr-1" />
                          {t.contactSupport}
                        </Button>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-slate-700 border-slate-600 hover:bg-slate-600"
                      >
                        {t.solved}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-slate-700 border-slate-600 hover:bg-slate-600"
                      >
                        {language === "en" ? "Need More Help" : "Serve Altro Aiuto"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {message.sender === "user" && (
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-700 rounded-lg p-3">
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
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 p-4 bg-slate-800">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.placeholder}
            onKeyPress={(e) => e.key === "Enter" && handleSend(inputValue)}
            className="flex-1 bg-slate-700 border-slate-600 text-white"
          />
          <Button onClick={() => handleSend(inputValue)} className="bg-orange-500 hover:bg-orange-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
