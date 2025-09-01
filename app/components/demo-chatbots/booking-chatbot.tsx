"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Calendar, CheckCircle } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  source?: "booking" | "ai" | "confirmation"
}

interface BookingData {
  service?: string
  date?: string
  time?: string
  name?: string
  email?: string
  phone?: string
  notes?: string
}

export default function BookingChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData>({})
  const [bookingStep, setBookingStep] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const welcomeMessage: Message = {
      id: "1",
      content:
        "📅 Benvenuto nel sistema di prenotazioni! Sono qui per aiutarti a prenotare il servizio perfetto per le tue esigenze. Che tipo di appuntamento vorresti prenotare?",
      sender: "bot",
      timestamp: new Date(),
      source: "booking",
    }
    setMessages([welcomeMessage])
  }, [])

  const services = [
    { id: "consultation", name: "Consulenza Generale", duration: "30 min", price: "Gratuita" },
    { id: "ai-automation", name: "AI Automation", duration: "60 min", price: "€150" },
    { id: "chatbot-dev", name: "Sviluppo Chatbot", duration: "45 min", price: "€120" },
    { id: "web-dev", name: "Sviluppo Web", duration: "60 min", price: "€150" },
    { id: "ai-marketing", name: "AI Marketing", duration: "45 min", price: "€120" },
  ]

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ]

  const findBookingResponse = (message: string): { response: string; source: string; nextStep?: string } | null => {
    const lowerMessage = message.toLowerCase()

    // Saluti e inizio prenotazione
    if (lowerMessage.includes("ciao") || lowerMessage.includes("salve") || lowerMessage.includes("hello")) {
      return {
        response: "👋 Ciao! Perfetto, sei nel posto giusto per prenotare un appuntamento. Che servizio ti interessa?",
        source: "booking",
        nextStep: "service",
      }
    }

    // Servizi specifici
    if (lowerMessage.includes("consulenza") || lowerMessage.includes("consultation")) {
      setBookingData((prev) => ({ ...prev, service: "Consulenza Generale (30 min) - Gratuita" }))
      return {
        response:
          "✅ Perfetto! Hai scelto una **Consulenza Generale** (30 min, gratuita).\n\nQuando preferiresti l'appuntamento? Puoi dirmi una data specifica o scegliere tra:\n• Oggi\n• Domani\n• Questa settimana\n• La prossima settimana",
        source: "booking",
        nextStep: "date",
      }
    }

    if (lowerMessage.includes("chatbot")) {
      setBookingData((prev) => ({ ...prev, service: "Sviluppo Chatbot (45 min) - €120" }))
      return {
        response:
          "🤖 Ottima scelta! **Sviluppo Chatbot** (45 min, €120).\n\nQuando ti va bene? Dimmi una data o scegli:\n• Oggi\n• Domani\n• Questa settimana\n• La prossima settimana",
        source: "booking",
        nextStep: "date",
      }
    }

    if (lowerMessage.includes("web") || lowerMessage.includes("sito")) {
      setBookingData((prev) => ({ ...prev, service: "Sviluppo Web (60 min) - €150" }))
      return {
        response:
          "🌐 Fantastico! **Sviluppo Web** (60 min, €150).\n\nQuando preferisci l'appuntamento?\n• Oggi\n• Domani\n• Questa settimana\n• La prossima settimana",
        source: "booking",
        nextStep: "date",
      }
    }

    // Gestione date
    if (
      bookingStep === "date" &&
      (lowerMessage.includes("oggi") || lowerMessage.includes("domani") || lowerMessage.includes("settimana"))
    ) {
      let dateText = ""
      if (lowerMessage.includes("oggi")) dateText = "Oggi"
      else if (lowerMessage.includes("domani")) dateText = "Domani"
      else if (lowerMessage.includes("questa settimana")) dateText = "Questa settimana"
      else if (lowerMessage.includes("prossima settimana")) dateText = "Prossima settimana"

      setBookingData((prev) => ({ ...prev, date: dateText }))
      return {
        response: `📅 Perfetto! ${dateText}.\n\nOra scegli l\'orario che preferisci:\n\n🌅 **Mattina**: 09:00, 09:30, 10:00, 10:30, 11:00, 11:30\n🌞 **Pomeriggio**: 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00\n\nQuale orario ti va meglio?`,
        source: "booking",
        nextStep: "time",
      }
    }

    // Gestione orari
    if (bookingStep === "time" && timeSlots.some((slot) => lowerMessage.includes(slot))) {
      const selectedTime = timeSlots.find((slot) => lowerMessage.includes(slot))
      setBookingData((prev) => ({ ...prev, time: selectedTime }))
      return {
        response: `🕐 Ottimo! Orario selezionato: **${selectedTime}**.\n\nOra ho bisogno dei tuoi dati per completare la prenotazione. Come ti chiami?`,
        source: "booking",
        nextStep: "name",
      }
    }

    // Gestione nome
    if (bookingStep === "name" && !lowerMessage.includes("email") && !lowerMessage.includes("@")) {
      setBookingData((prev) => ({ ...prev, name: message.trim() }))
      return {
        response: `👤 Piacere di conoscerti, ${message.trim()}!\n\nOra mi serve la tua email per inviarti la conferma dell\'appuntamento:`,
        source: "booking",
        nextStep: "email",
      }
    }

    // Gestione email
    if (bookingStep === "email" && lowerMessage.includes("@")) {
      setBookingData((prev) => ({ ...prev, email: message.trim() }))
      return {
        response: `📧 Email registrata: ${message.trim()}\n\nVuoi aggiungere un numero di telefono? (opzionale ma consigliato per eventuali comunicazioni urgenti)`,
        source: "booking",
        nextStep: "phone",
      }
    }

    // Gestione telefono
    if (bookingStep === "phone") {
      if (lowerMessage.includes("no") || lowerMessage.includes("skip") || lowerMessage.includes("salta")) {
        return {
          response:
            "Nessun problema! Procediamo senza telefono.\n\nHai qualche nota particolare o richiesta speciale per l'appuntamento? (opzionale)",
          source: "booking",
          nextStep: "notes",
        }
      } else {
        setBookingData((prev) => ({ ...prev, phone: message.trim() }))
        return {
          response: `📱 Telefono registrato: ${message.trim()}\n\nHai qualche nota particolare o richiesta speciale per l\'appuntamento? (opzionale)`,
          source: "booking",
          nextStep: "notes",
        }
      }
    }

    // Gestione note e conferma finale
    if (bookingStep === "notes") {
      if (!lowerMessage.includes("no") && !lowerMessage.includes("niente") && message.trim().length > 3) {
        setBookingData((prev) => ({ ...prev, notes: message.trim() }))
      }
      return {
        response: "Perfetto! Ora ho tutti i dati necessari. Vuoi confermare la prenotazione?",
        source: "booking",
        nextStep: "confirm",
      }
    }

    return null
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Prima cerca risposte di prenotazione
      const bookingResponse = findBookingResponse(content)

      if (bookingResponse) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: bookingResponse.response,
          sender: "bot",
          timestamp: new Date(),
          source: bookingResponse.source as any,
        }
        setMessages((prev) => [...prev, botMessage])

        if (bookingResponse.nextStep) {
          setBookingStep(bookingResponse.nextStep)
        }

        // Se è conferma, completa la prenotazione
        if (
          bookingStep === "confirm" &&
          (content.toLowerCase().includes("sì") ||
            content.toLowerCase().includes("si") ||
            content.toLowerCase().includes("yes") ||
            content.toLowerCase().includes("conferma"))
        ) {
          setTimeout(() => {
            const confirmationMessage: Message = {
              id: Date.now().toString(),
              content: `✅ **PRENOTAZIONE CONFERMATA!**\n\n📋 **Riepilogo:**\n• **Servizio**: ${bookingData.service}\n• **Data**: ${bookingData.date}\n• **Orario**: ${bookingData.time}\n• **Nome**: ${bookingData.name}\n• **Email**: ${bookingData.email}${bookingData.phone ? `\n• **Telefono**: ${bookingData.phone}` : ""}${bookingData.notes ? `\n• **Note**: ${bookingData.notes}` : ""}\n\n📧 **Riceverai una email di conferma a breve**\n📱 **Ti contatteremo 24h prima per conferma**\n\n🎉 Grazie per aver scelto Digital Aura!`,
              sender: "bot",
              timestamp: new Date(),
              source: "confirmation",
            }
            setMessages((prev) => [...prev, confirmationMessage])
            setBookingStep(null)
          }, 1000)
        }
      } else {
        // Usa AI per domande generali
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Come assistente prenotazioni, rispondi a: ${content}`,
            language: "it",
          }),
        })

        const data = await response.json()

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response || "Posso aiutarti con la prenotazione di un appuntamento. Che servizio ti interessa?",
          sender: "bot",
          timestamp: new Date(),
          source: "ai",
        }

        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Mi dispiace, si è verificato un errore. Puoi riprovare o contattarci direttamente al +39 02 1234 5678.",
        sender: "bot",
        timestamp: new Date(),
        source: "booking",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const selectService = (service: any) => {
    const serviceText = `${service.name} (${service.duration}) - ${service.price}`
    setBookingData((prev) => ({ ...prev, service: serviceText }))
    sendMessage(service.name)
  }

  const selectQuickOption = (option: string) => {
    sendMessage(option)
  }

  const getSourceBadge = (source?: string) => {
    if (!source) return null

    const badges = {
      booking: { label: "Booking", color: "bg-green-500" },
      ai: { label: "AI", color: "bg-purple-500" },
      confirmation: { label: "Confermato", color: "bg-blue-500" },
    }

    const badge = badges[source as keyof typeof badges]
    if (!badge) return null

    return <Badge className={`${badge.color} text-white text-xs ml-2`}>{badge.label}</Badge>
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Booking Assistant</span>
            </CardTitle>
            <p className="text-sm text-white/80">Prenota il tuo appuntamento</p>
          </div>
          {bookingData.service && (
            <Badge className="bg-white/20 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              In corso
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col" style={{ minHeight: 0 }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 0 }}>
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-green-600 to-teal-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  {message.sender === "bot" && (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-60">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      {getSourceBadge(message.source)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
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
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Services Selection */}
        {!bookingData.service && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-600 mb-3">Seleziona un servizio:</p>
            <div className="space-y-2">
              {services.map((service) => (
                <Button
                  key={service.id}
                  variant="outline"
                  className="w-full justify-between text-left h-auto py-3 bg-transparent"
                  onClick={() => selectService(service)}
                >
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-xs text-gray-500">{service.duration}</div>
                  </div>
                  <Badge variant={service.price === "Gratuita" ? "default" : "secondary"}>{service.price}</Badge>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {bookingData.service && bookingStep && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-600 mb-3">Opzioni rapide:</p>
            <div className="grid grid-cols-2 gap-2">
              {bookingStep === "date" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => selectQuickOption("Oggi")}
                  >
                    📅 Oggi
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => selectQuickOption("Domani")}
                  >
                    📅 Domani
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => selectQuickOption("Questa settimana")}
                  >
                    📅 Questa settimana
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => selectQuickOption("Prossima settimana")}
                  >
                    📅 Prossima settimana
                  </Button>
                </>
              )}
              {bookingStep === "time" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => selectQuickOption("09:00")}
                  >
                    🌅 09:00
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => selectQuickOption("10:00")}
                  >
                    🌅 10:00
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => selectQuickOption("14:00")}
                  >
                    🌞 14:00
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => selectQuickOption("15:00")}
                  >
                    🌞 15:00
                  </Button>
                </>
              )}
              {bookingStep === "confirm" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => selectQuickOption("Sì, conferma")}
                  >
                    ✅ Conferma
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => selectQuickOption("Modifica")}
                  >
                    ✏️ Modifica
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                bookingStep === "name"
                  ? "Il tuo nome..."
                  : bookingStep === "email"
                    ? "la-tua-email@esempio.com"
                    : bookingStep === "phone"
                      ? "Il tuo telefono (opzionale)..."
                      : bookingStep === "notes"
                        ? "Note aggiuntive (opzionale)..."
                        : "Scrivi un messaggio..."
              }
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  sendMessage(inputValue)
                }
              }}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={() => sendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              size="icon"
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
