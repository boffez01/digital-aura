"use client"

import type React from "react"

import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  options?: string[]
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Ciao! Sono l'assistente AI di Digital Aura. Come posso aiutarti oggi?",
      timestamp: new Date(),
      options: ["Informazioni sui servizi", "Prenota un appuntamento", "Richiedi un preventivo", "Supporto tecnico"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationState, setConversationState] = useState("initial")
  const [userInfo, setUserInfo] = useState({ name: "", email: "", service: "", message: "" })

  const messagesContainerRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // Scroll sempre all'ultimo messaggio nel container
  const scrollMessagesToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = messagesContainerRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior })
  }

  // Scroll quando cambia messages
  useLayoutEffect(() => {
    scrollMessagesToBottom("auto")
  }, [messages])

  // Scroll quando isTyping cambia
  useEffect(() => {
    if (isTyping) scrollMessagesToBottom("smooth")
  }, [isTyping])

  // Autoresize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 160) + "px"
  }, [inputValue])

  const addMessage = (content: string, type: "user" | "bot", options?: string[]) => {
    const newMessage: Message = { id: Date.now().toString(), type, content, timestamp: new Date(), options }
    setMessages((prev) => [...prev, newMessage])
  }

  const simulateTyping = (callback: () => void, delay = 1000) => {
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
        case "Informazioni sui servizi":
          addMessage(
            "Offriamo tre servizi principali:\n\n🤖 **AI Automation** - Automatizza i tuoi processi aziendali\n💬 **Chatbot Development** - Assistenti virtuali intelligenti\n🌐 **Web Development** - Siti web e applicazioni moderne\n\nSu quale servizio vorresti saperne di più?",
            "bot",
            ["AI Automation", "Chatbot Development", "Web Development", "Tutti i servizi"],
          )
          setConversationState("services")
          break
        case "Prenota un appuntamento":
          addMessage(
            "Perfetto! Per prenotare un appuntamento ho bisogno di alcune informazioni. Iniziamo con il tuo nome:",
            "bot",
          )
          setConversationState("booking_name")
          break
        case "Richiedi un preventivo":
          addMessage(
            "Sarò felice di aiutarti con un preventivo personalizzato! Per iniziare, dimmi il tuo nome:",
            "bot",
          )
          setConversationState("quote_name")
          break
        case "Supporto tecnico":
          addMessage(
            "Sono qui per aiutarti con qualsiasi problema tecnico. Puoi descrivermi il problema che stai riscontrando?",
            "bot",
          )
          setConversationState("support")
          break
        default:
          handleServiceInquiry(option)
      }
    })
  }

  const handleServiceInquiry = (inquiry: string) => {
    switch (inquiry) {
      case "Prenota consulenza":
      case "Prenota appuntamento":
      case "Richiedi demo":
        addMessage("Ottimo! Per prenotare un appuntamento, dimmi il tuo nome:", "bot")
        setConversationState("booking_name")
        break
      case "Più informazioni":
        addMessage(
          "Puoi trovare informazioni dettagliate sui nostri servizi nelle pagine dedicate. Vuoi che ti mandi i link o preferisci che ti spieghi qualcosa di specifico?",
          "bot",
          ["Invia link", "Spiegazione personalizzata", "Prenota consulenza"],
        )
        break
      case "Altri servizi":
        addMessage(
          "Oltre ai nostri servizi principali, offriamo anche:\n• Consulenza digitale\n• Formazione AI per team\n• Supporto e manutenzione\n• Integrazione sistemi esistenti\n\nC'è qualcosa di specifico che ti interessa?",
          "bot",
          ["Consulenza digitale", "Formazione AI", "Supporto tecnico", "Torna ai servizi principali"],
        )
        break
      case "Discuti il mio progetto":
        addMessage(
          "Perfetto! Mi piacerebbe conoscere i dettagli del tuo progetto. Per iniziare, dimmi il tuo nome:",
          "bot",
        )
        setConversationState("project_name")
        break
      case "Vedi portfolio":
        addMessage(
          "Puoi vedere alcuni dei nostri progetti più significativi nella sezione Portfolio del sito. Ogni progetto include dettagli su problema risolto, soluzione implementata e risultati ottenuti.\n\nVorresti che ti mostri un progetto specifico o preferisci prenotare una call per discutere del tuo progetto?",
          "bot",
          ["Mostra progetti AI", "Mostra progetti Web", "Prenota call", "Torna al menu"],
        )
        break
    }
  }

  const handleTextInput = (text: string) => {
    addMessage(text, "user")
    simulateTyping(() => {
      switch (conversationState) {
        case "booking_name":
        case "quote_name":
        case "project_name":
          setUserInfo((prev) => ({ ...prev, name: text }))
          addMessage(`Piacere di conoscerti, ${text}! Ora ho bisogno della tua email per inviarti i dettagli:`, "bot")
          setConversationState(conversationState.replace("name", "email"))
          break
        case "booking_email":
        case "quote_email":
        case "project_email":
          setUserInfo((prev) => ({ ...prev, email: text }))
          if (conversationState.includes("booking")) {
            addMessage("Perfetto! Quale servizio ti interessa di più?", "bot", [
              "AI Automation",
              "Chatbot Development",
              "Web Development",
              "Consulenza generale",
            ])
            setConversationState("booking_service")
          } else {
            addMessage(
              "Ottimo! Ora dimmi: quale tipo di progetto hai in mente? Più dettagli mi dai, più preciso sarà il preventivo.",
              "bot",
            )
            setConversationState(conversationState.replace("email", "details"))
          }
          break
        case "booking_service": {
          const updated = { ...userInfo, service: text }
          setUserInfo(updated)
          addMessage(
            `Perfetto! Hai scelto ${text}. \n\nHo raccolto le tue informazioni:\n📧 Email: ${updated.email || "—"}\n🎯 Servizio: ${text}\n\nTi invierò una email con i link per prenotare un appuntamento. Nel frattempo, c'è qualcos'altro che vorresti sapere?`,
            "bot",
            ["Informazioni sui tempi", "Costi indicativi", "Processo di lavoro", "Niente altro, grazie"],
          )
          setConversationState("booking_complete")
          break
        }
        case "quote_details":
        case "project_details": {
          setUserInfo((prev) => ({ ...prev, message: text }))
          const info = { ...userInfo, message: text }
          addMessage(
            `Grazie per i dettagli! Ho raccolto le seguenti informazioni:\n\n👤 Nome: ${info.name || "—"}\n📧 Email: ${info.email || "—"}\n📝 Progetto: ${text}\n\nIl nostro team analizzerà la tua richiesta e ti invierà un preventivo dettagliato entro 24 ore. Ti contatteremo anche per una consulenza gratuita!\n\nC'è altro che posso aiutarti?`,
            "bot",
            ["Tempi di realizzazione", "Processo di lavoro", "Altri servizi", "Niente altro, grazie"],
          )
          setConversationState("quote_complete")
          break
        }
        case "support":
          addMessage(
            `Ho capito il tuo problema. Ecco alcune soluzioni che potrebbero aiutarti:\n\n1. Controlla la documentazione nella sezione supporto\n2. Verifica le impostazioni del tuo account\n3. Prova a svuotare la cache del browser\n\nSe il problema persiste, posso metterti in contatto con il nostro team tecnico. Vuoi che programmi una call di supporto?`,
            "bot",
            ["Programma call supporto", "Prova le soluzioni", "Altri problemi", "Problema risolto"],
          )
          break
        default:
          addMessage(
            "Grazie per il tuo messaggio! Per aiutarti meglio, puoi scegliere una delle opzioni qui sotto o descrivermi più nel dettaglio cosa stai cercando:",
            "bot",
            ["Informazioni sui servizi", "Prenota un appuntamento", "Richiedi un preventivo", "Supporto tecnico"],
          )
          setConversationState("initial")
      }
    })
  }

  const handleSendMessage = () => {
    const text = inputValue.trim()
    if (!text) return
    handleTextInput(text)
    setInputValue("")
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              >
                Digital Aura
              </motion.div>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-white/80 hover:text-blue-400 transition-colors flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Torna alla Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 mb-6"
            >
              <Bot className="w-12 h-12 text-blue-400" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Assistente AI
            </h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Chatta con il nostro assistente AI per informazioni sui servizi, prenotare appuntamenti o richiedere
              preventivi
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="outline" className="border-blue-400/30 text-blue-300">
                Disponibile 24/7
              </Badge>
              <Badge variant="outline" className="border-blue-400/30 text-blue-300">
                Risposte Immediate
              </Badge>
              <Badge variant="outline" className="border-blue-400/30 text-blue-300">
                Supporto Multilingue
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-white/5 border-white/10 backdrop-blur-lg h-[600px] flex flex-col">
            <CardHeader className="border-b border-white/10 flex-shrink-0">
              <CardTitle className="text-white flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" />
                Assistente AI Digital Aura
                <Badge variant="outline" className="ml-auto border-green-400/30 text-green-300">
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-4 min-h-0"
              >
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-purple-600 to-pink-600"
                              : "bg-gradient-to-r from-blue-600 to-cyan-600"
                          }`}
                        >
                          {message.type === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>

                        <div
                          className={`rounded-lg p-4 break-words ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              : "bg-white/10 text-white border border-white/20"
                          }`}
                        >
                          <div className="whitespace-pre-line">{message.content}</div>
                          {message.options && (
                            <div className="mt-3 space-y-2">
                              {message.options.map((option, index) => (
                                <motion.button
                                  key={index}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleOptionClick(option)}
                                  className="block w-full text-left p-2 rounded bg-white/10 hover:bg-white/20 transition-all border border-white/20 text-sm break-words"
                                >
                                  {option}
                                </motion.button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="border-t border-white/10 p-4 flex-shrink-0">
                <div className="flex space-x-4">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Scrivi il tuo messaggio... (Ctrl/Cmd + Invio per inviare)"
                    rows={1}
                    className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-all resize-none leading-6 min-h-0"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 flex-shrink-0"
                  >
                    <Send className="w-4 h-4 mr-2" /> Invia
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
