"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Search, ChevronRight, Bot, Send, User, X, ArrowLeft } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "faq" | "search"
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

interface FAQChatbotProps {
  onBack: () => void
}

export default function FAQChatbot({ onBack }: FAQChatbotProps) {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const texts = {
    en: {
      title: "FAQ Assistant",
      subtitle: "Quick answers to common questions",
      online: "Online",
      greeting:
        "Hi! I'm your FAQ assistant. I can help you find answers to common questions about our services, pricing, and policies. What would you like to know?",
      popularQuestions: "Here are some popular questions:",
      searchResults: "I found these answers for you:",
      placeholder: "Ask a question...",
      moreInfo: "More Info",
      helpful: "Was this helpful?",
    },
    it: {
      title: "Assistente FAQ",
      subtitle: "Risposte rapide alle domande comuni",
      online: "Online",
      greeting:
        "Ciao! Sono il tuo assistente FAQ. Posso aiutarti a trovare risposte alle domande comuni sui nostri servizi, prezzi e politiche. Cosa vorresti sapere?",
      popularQuestions: "Ecco alcune domande popolari:",
      searchResults: "Ho trovato queste risposte per te:",
      placeholder: "Fai una domanda...",
      moreInfo: "Più Info",
      helpful: "È stato utile?",
    },
  }

  const t = texts[language]

  const faqs: FAQ[] = [
    {
      id: "pricing",
      question: language === "en" ? "What are your pricing plans?" : "Quali sono i vostri piani tariffari?",
      answer:
        language === "en"
          ? "We offer flexible pricing starting from €299 for basic services up to €1999 for enterprise solutions. All plans include setup, training, and 6 months of support."
          : "Offriamo prezzi flessibili a partire da €299 per servizi base fino a €1999 per soluzioni enterprise. Tutti i piani includono setup, formazione e 6 mesi di supporto.",
      category: language === "en" ? "Pricing" : "Prezzi",
    },
    {
      id: "timeline",
      question: language === "en" ? "How long does implementation take?" : "Quanto tempo richiede l'implementazione?",
      answer:
        language === "en"
          ? "Most projects are completed within 2-4 weeks. Simple chatbots can be ready in 24-48 hours, while complex AI automation projects may take up to 6 weeks."
          : "La maggior parte dei progetti viene completata entro 2-4 settimane. I chatbot semplici possono essere pronti in 24-48 ore, mentre i progetti di automazione AI complessi possono richiedere fino a 6 settimane.",
      category: language === "en" ? "Timeline" : "Tempistiche",
    },
    {
      id: "support",
      question: language === "en" ? "What support do you provide?" : "Che supporto fornite?",
      answer:
        language === "en"
          ? "We provide 24/7 technical support, regular updates, training sessions, and dedicated account management for enterprise clients."
          : "Forniamo supporto tecnico 24/7, aggiornamenti regolari, sessioni di formazione e gestione account dedicata per i clienti enterprise.",
      category: language === "en" ? "Support" : "Supporto",
    },
    {
      id: "integration",
      question:
        language === "en" ? "Can you integrate with existing systems?" : "Potete integrarvi con i sistemi esistenti?",
      answer:
        language === "en"
          ? "Yes! We integrate with most CRM systems, databases, e-commerce platforms, and business tools. We also provide custom API integrations."
          : "Sì! Ci integriamo con la maggior parte dei sistemi CRM, database, piattaforme e-commerce e strumenti aziendali. Forniamo anche integrazioni API personalizzate.",
      category: language === "en" ? "Integration" : "Integrazione",
    },
    {
      id: "languages",
      question: language === "en" ? "What languages do you support?" : "Che lingue supportate?",
      answer:
        language === "en"
          ? "Our AI systems support over 50 languages including Italian, English, Spanish, French, German, and many more. We can customize for specific regional dialects."
          : "I nostri sistemi AI supportano oltre 50 lingue inclusi italiano, inglese, spagnolo, francese, tedesco e molte altre. Possiamo personalizzare per dialetti regionali specifici.",
      category: language === "en" ? "Languages" : "Lingue",
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

  const addMessage = (text: string, sender: "user" | "bot", type: "text" | "faq" | "search" = "text") => {
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
      // Search for relevant FAQs
      const searchTerm = message.toLowerCase()
      const relevantFAQs = faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm) ||
          faq.answer.toLowerCase().includes(searchTerm) ||
          faq.category.toLowerCase().includes(searchTerm),
      )

      if (relevantFAQs.length > 0) {
        addMessage(t.searchResults, "bot", "search")
        relevantFAQs.slice(0, 2).forEach((faq) => {
          setTimeout(() => {
            addMessage(faq.answer, "bot", "faq")
          }, 500)
        })
      } else {
        addMessage(t.popularQuestions, "bot", "faq")
      }
    })
  }

  const handleFAQSelect = (faq: FAQ) => {
    addMessage(faq.question, "user")
    simulateTyping(() => {
      addMessage(faq.answer, "bot", "faq")
    })
  }

  return (
    <div className="flex flex-col h-full bg-slate-800">
      {/* Header - STILE BOOKING ASSISTANT */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="hover:bg-white/20 p-1 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
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
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`rounded-lg p-3 ${
                  message.sender === "user" ? "bg-cyan-500 text-white" : "bg-slate-700 text-white"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="text-xs bg-cyan-500/20 text-cyan-300">
                      FAQ Assistant
                    </Badge>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <div className="text-xs opacity-75 mt-1">04:27 PM</div>

                {message.type === "faq" && message.text === t.popularQuestions && (
                  <div className="mt-3 space-y-2">
                    {faqs.slice(0, 3).map((faq) => (
                      <Button
                        key={faq.id}
                        variant="outline"
                        className="w-full text-left justify-between h-auto py-3 bg-slate-800 border-slate-600 hover:bg-slate-700"
                        onClick={() => handleFAQSelect(faq)}
                      >
                        <div className="flex items-center space-x-3">
                          <Search className="h-4 w-4 text-cyan-400" />
                          <div>
                            <div className="font-medium text-sm text-white">{faq.question}</div>
                            <Badge variant="outline" className="text-xs mt-1 border-slate-600 text-slate-400">
                              {faq.category}
                            </Badge>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </Button>
                    ))}
                  </div>
                )}

                {message.type === "faq" && message.text !== t.popularQuestions && message.text !== t.searchResults && (
                  <div className="mt-3 p-3 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{t.helpful}</span>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs bg-slate-700 border-slate-600 hover:bg-slate-600"
                        >
                          👍 {language === "en" ? "Yes" : "Sì"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs bg-slate-700 border-slate-600 hover:bg-slate-600"
                        >
                          👎 {language === "en" ? "No" : "No"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {message.sender === "user" && (
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
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
          <Button onClick={() => handleSend(inputValue)} className="bg-cyan-500 hover:bg-cyan-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
