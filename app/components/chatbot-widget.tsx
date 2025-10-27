"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send, Bot, User } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean; time: string }>>([])
  const [inputValue, setInputValue] = useState("")
  const { language } = useLanguage()

  const translations = {
    it: {
      title: "Assistente Virtuale",
      subtitle: "Siamo qui per aiutarti",
      placeholder: "Scrivi un messaggio...",
      greeting: "👋 Ciao! Sono l'assistente virtuale di Praxis Futura. Come posso aiutarti oggi?",
      quickReplies: ["Vorrei informazioni sui servizi", "Voglio prenotare una consulenza", "Ho bisogno di supporto"],
    },
    en: {
      title: "Virtual Assistant",
      subtitle: "We're here to help",
      placeholder: "Type a message...",
      greeting: "👋 Hello! I'm Praxis Futura's virtual assistant. How can I help you today?",
      quickReplies: ["I'd like information about services", "I want to book a consultation", "I need support"],
    },
  }

  const t = translations[language]

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const now = new Date()
      const timeString = now.toLocaleTimeString(language === "it" ? "it-IT" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
      setMessages([
        {
          text: t.greeting,
          isBot: true,
          time: timeString,
        },
      ])
    }
  }, [isOpen, messages.length, t.greeting, language])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const now = new Date()
    const timeString = now.toLocaleTimeString(language === "it" ? "it-IT" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        text: inputValue,
        isBot: false,
        time: timeString,
      },
    ])

    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse =
        language === "it"
          ? "Grazie per il tuo messaggio! Un nostro consulente ti risponderà a breve. Nel frattempo, puoi prenotare una consulenza gratuita dalla pagina appuntamenti."
          : "Thank you for your message! One of our consultants will respond shortly. In the meantime, you can book a free consultation from the appointments page."

      setMessages((prev) => [
        ...prev,
        {
          text: botResponse,
          isBot: true,
          time: new Date().toLocaleTimeString(language === "it" ? "it-IT" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ])
    }, 1000)
  }

  const handleQuickReply = (reply: string) => {
    const now = new Date()
    const timeString = now.toLocaleTimeString(language === "it" ? "it-IT" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    setMessages((prev) => [
      ...prev,
      {
        text: reply,
        isBot: false,
        time: timeString,
      },
    ])

    // Simulate bot response based on quick reply
    setTimeout(() => {
      let botResponse = ""
      if (reply.toLowerCase().includes("servizi") || reply.toLowerCase().includes("services")) {
        botResponse =
          language === "it"
            ? "Offriamo diversi servizi: AI Automation, Chatbot Intelligenti, Sviluppo Web e AI Marketing. Quale ti interessa di più?"
            : "We offer several services: AI Automation, Intelligent Chatbots, Web Development and AI Marketing. Which one interests you most?"
      } else if (reply.toLowerCase().includes("consulenza") || reply.toLowerCase().includes("consultation")) {
        botResponse =
          language === "it"
            ? "Perfetto! Puoi prenotare una consulenza gratuita visitando la nostra pagina appuntamenti. Ti serve aiuto per prenotare?"
            : "Perfect! You can book a free consultation by visiting our appointments page. Do you need help booking?"
      } else {
        botResponse =
          language === "it"
            ? "Sarò felice di aiutarti! Puoi descrivermi meglio di cosa hai bisogno?"
            : "I'll be happy to help you! Can you describe what you need in more detail?"
      }

      setMessages((prev) => [
        ...prev,
        {
          text: botResponse,
          isBot: true,
          time: new Date().toLocaleTimeString(language === "it" ? "it-IT" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ])
    }, 1000)
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl"
            >
              <MessageSquare className="h-7 w-7 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">{t.title}</div>
                  <div className="text-xs opacity-90">{t.subtitle}</div>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-900">
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start space-x-3 ${message.isBot ? "" : "justify-end"}`}>
                  {message.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-xs ${
                      message.isBot ? "bg-slate-700 text-white" : "bg-blue-500 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className={`text-xs mt-1 ${message.isBot ? "text-slate-400" : "opacity-90"}`}>
                      {message.time}
                    </div>
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  {t.quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickReply(reply)}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg text-left text-sm transition-colors"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-800 border-t border-slate-700">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={t.placeholder}
                  className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
