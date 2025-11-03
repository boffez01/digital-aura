"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Send, Calendar, Headphones, HelpCircle, Briefcase } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import Link from "next/link"

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const { language } = useLanguage()

  const translations = {
    it: {
      quickActions: "Azioni rapide:",
      services: "Servizi",
      faq: "FAQ",
      book: "Prenota",
      support: "Supporto",
      greeting: "👋 Ciao! Sono AuraBot, l'assistente AI di Digital Aura.",
      helpText: "Posso aiutarti con:",
      aiServices: "🤖 AI Services - Automazione e chatbot intelligenti",
      webDev: "💻 Web Development - Siti web moderni ed e-commerce",
      aiMarketing: "📊 AI Marketing - Campagne automatizzate",
      bookings: "📅 Bookings - Consulenze gratuite DIRETTAMENTE QUI",
      helpQuestion: "Come posso aiutarti oggi? 😊",
      placeholder: "Scrivi un messaggio...",
    },
    en: {
      quickActions: "Quick actions:",
      services: "Services",
      faq: "FAQ",
      book: "Book",
      support: "Support",
      greeting: "👋 Hello! I'm AuraBot, Digital Aura's AI assistant.",
      helpText: "I can help you with:",
      aiServices: "🤖 AI Services - Automation and intelligent chatbots",
      webDev: "💻 Web Development - Modern websites and e-commerce",
      aiMarketing: "📊 AI Marketing - Automated campaigns",
      bookings: "📅 Bookings - Free consultations DIRECTLY HERE",
      helpQuestion: "How can I help you today? 😊",
      placeholder: "Type a message...",
    },
  }

  const t = translations[language]

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString(language === "it" ? "it-IT" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
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
              className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-2xl"
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
            className="fixed bottom-6 right-6 z-50 w-[420px] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              border: "2px solid transparent",
              backgroundImage: "linear-gradient(#1e293b, #1e293b), linear-gradient(135deg, #06b6d4, #a855f7)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            {/* Header with Close Button */}
            <div className="flex justify-end p-2 bg-slate-900">
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-4">
              <div className="text-white text-sm font-medium mb-3 flex items-center">
                <span className="text-red-500 mr-2">🚀</span>
                {t.quickActions}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/services">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {t.services}
                  </Button>
                </Link>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  {t.faq}
                </Button>
                <Link href="/appointments">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium">
                    <Calendar className="h-4 w-4 mr-2" />
                    {t.book}
                  </Button>
                </Link>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium">
                  <Headphones className="h-4 w-4 mr-2" />
                  {t.support}
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="px-6 pb-4 max-h-[400px] overflow-y-auto">
              {/* Bot Avatar and Greeting */}
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🤖</span>
                </div>
                <div className="flex-1">
                  <div className="bg-slate-800 rounded-lg p-3 text-white text-sm">
                    <p className="font-semibold mb-1">{t.greeting}</p>
                    <p className="mb-2">{t.helpText}</p>
                    <div className="space-y-1 text-xs">
                      <p>{t.aiServices}</p>
                      <p>{t.webDev}</p>
                      <p>{t.aiMarketing}</p>
                      <p>{t.bookings}</p>
                    </div>
                    <p className="mt-3">{t.helpQuestion}</p>
                    <div className="text-xs text-slate-400 mt-2">{getCurrentTime()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="px-6 pb-6">
              <div className="flex space-x-2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <Button
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-full w-12 h-12 p-0"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
