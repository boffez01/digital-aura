"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, MessageCircle, HelpCircle, CheckCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  faqs?: FAQ[]
  options?: string[]
  priority?: "low" | "medium" | "high"
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  helpful: number
}

const sampleFAQs: FAQ[] = [
  {
    id: "1",
    question: "Come posso reimpostare la mia password?",
    answer: "Vai alla pagina di login e clicca su 'Password dimenticata'. Riceverai un'email con le istruzioni.",
    category: "account",
    helpful: 95,
  },
  {
    id: "2",
    question: "Quali sono i metodi di pagamento accettati?",
    answer: "Accettiamo carte di credito, PayPal, bonifico bancario e pagamento alla consegna.",
    category: "pagamenti",
    helpful: 88,
  },
  {
    id: "3",
    question: "Come posso contattare il supporto tecnico?",
    answer: "Puoi contattarci via email a support@digitalaura.it o tramite questo chat. Siamo disponibili 24/7.",
    category: "supporto",
    helpful: 92,
  },
]

export default function SupportChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Ciao! Sono l'assistente di supporto di Digital Aura. Sono qui per aiutarti a risolvere qualsiasi problema o domanda. Come posso aiutarti oggi? 🎧",
      timestamp: new Date(),
      options: ["Problema tecnico", "Domande frequenti", "Contatta operatore", "Stato del servizio"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [ticketCount, setTicketCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const addMessage = (
    content: string,
    type: "user" | "bot",
    faqs?: FAQ[],
    options?: string[],
    priority?: "low" | "medium" | "high",
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      faqs,
      options,
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

  const handleOptionClick = (option: string) => {
    addMessage(option, "user")
    simulateTyping(() => {
      switch (option) {
        case "Problema tecnico":
          addMessage(
            "Mi dispiace che tu stia riscontrando un problema tecnico. Puoi descrivermi il problema in dettaglio? Nel frattempo, ecco alcune soluzioni comuni:",
            "bot",
            undefined,
            ["Sito non carica", "Errore di login", "Pagamento non funziona", "App si blocca", "Altro problema"],
            "high",
          )
          break
        case "Domande frequenti":
          addMessage(
            "Ecco le domande più frequenti dei nostri clienti. Clicca su una domanda per vedere la risposta:",
            "bot",
            sampleFAQs,
            ["Vedi tutte le FAQ", "Cerca FAQ", "La mia domanda non c'è"],
          )
          break
        case "Contatta operatore":
          setTicketCount((prev) => prev + 1)
          addMessage(
            "🎫 Ho creato un ticket di supporto (#" +
              (ticketCount + 1).toString().padStart(4, "0") +
              ") e ti ho messo in coda per parlare con un operatore umano. Tempo di attesa stimato: 3-5 minuti. Vuoi aspettare o preferisci che ti ricontatti?",
            "bot",
            undefined,
            ["Aspetto in linea", "Richiamami", "Invia email", "Torna al menu"],
            "medium",
          )
          break
        case "Stato del servizio":
          addMessage(
            "✅ Tutti i nostri servizi sono operativi al 100%. Ultimo aggiornamento: " +
              new Date().toLocaleTimeString() +
              ". Hai problemi specifici?",
            "bot",
            undefined,
            ["Segnala problema", "Cronologia interruzioni", "Notifiche stato", "Torna al menu"],
          )
          break
        case "Sito non carica":
          addMessage(
            "Proviamo a risolvere il problema del sito che non carica:\n\n1. Svuota la cache del browser\n2. Prova in modalità incognito\n3. Controlla la connessione internet\n4. Prova un browser diverso\n\nHa funzionato?",
            "bot",
            undefined,
            ["Sì, risolto!", "No, ancora problemi", "Prova altra soluzione", "Contatta tecnico"],
            "high",
          )
          break
        case "Sì, risolto!":
          addMessage(
            "🎉 Perfetto! Sono felice di aver risolto il tuo problema. Ti è stata utile questa soluzione?",
            "bot",
            undefined,
            ["Molto utile", "Abbastanza utile", "Poco utile", "Altro supporto"],
          )
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
          context: "support",
          faqs: sampleFAQs,
          tickets: ticketCount,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        addMessage(data.response, "bot", undefined, [
          "Problema risolto",
          "Serve altro aiuto",
          "Contatta operatore",
          "FAQ",
        ])
      } else {
        addMessage(
          "Mi dispiace, sto avendo problemi tecnici. Ti metto subito in contatto con un operatore umano:",
          "bot",
          undefined,
          ["Contatta operatore", "Riprova più tardi", "Invia email"],
          "high",
        )
      }
    } catch (error) {
      addMessage(
        "Scusa, c'è stato un errore. Prova con una delle opzioni qui sotto:",
        "bot",
        undefined,
        ["Contatta operatore", "Domande frequenti", "Riprova"],
        "high",
      )
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

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-purple-600 bg-purple-50 border-purple-200"
    }
  }

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-3 h-3" />
      case "medium":
        return <HelpCircle className="w-3 h-3" />
      case "low":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <MessageCircle className="w-3 h-3" />
    }
  }

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-to-br from-purple-50 to-white border-purple-200">
      <CardHeader className="border-b border-purple-200 bg-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg">Customer Support Bot</CardTitle>
              <p className="text-purple-100 text-sm">Il tuo assistente di supporto 24/7</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-white/20 text-white border-white/30">
              <HelpCircle className="w-3 h-3 mr-1" />
              {ticketCount}
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
                        ? "bg-purple-600 text-white"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    }`}
                  >
                    {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-purple-600 text-white"
                        : `bg-white border ${getPriorityColor(message.priority)} text-gray-800`
                    }`}
                  >
                    {message.priority && message.type === "bot" && (
                      <div className="flex items-center space-x-1 mb-2">
                        {getPriorityIcon(message.priority)}
                        <span className="text-xs font-medium">
                          {message.priority === "high"
                            ? "Alta Priorità"
                            : message.priority === "medium"
                              ? "Media Priorità"
                              : "Bassa Priorità"}
                        </span>
                      </div>
                    )}

                    <p className="text-sm whitespace-pre-line">{message.content}</p>

                    {/* FAQs Display */}
                    {message.faqs && (
                      <div className="mt-3 space-y-2">
                        {message.faqs.map((faq) => (
                          <div
                            key={faq.id}
                            className="bg-gray-50 rounded-lg p-3 border cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => {
                              addMessage(faq.question, "user")
                              simulateTyping(() => {
                                addMessage(
                                  faq.answer + `\n\n✅ ${faq.helpful}% degli utenti ha trovato utile questa risposta.`,
                                  "bot",
                                  undefined,
                                  ["Molto utile", "Abbastanza utile", "Poco utile", "Serve altro aiuto"],
                                )
                              })
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-gray-900">{faq.question}</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className="text-xs bg-purple-100 text-purple-800">{faq.category}</Badge>
                                  <span className="text-xs text-green-600">✅ {faq.helpful}% utile</span>
                                </div>
                              </div>
                              <HelpCircle className="w-4 h-4 text-purple-400 flex-shrink-0 ml-2" />
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
                            className="block w-full text-left p-2 rounded bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200 text-sm text-purple-800"
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-purple-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-purple-200 p-4 bg-purple-50">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Descrivi il tuo problema..."
              className="flex-1 border-purple-200 focus:border-purple-400"
            />
            <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
