"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, HelpCircle, ThumbsUp, ThumbsDown, User, Phone } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  source?: "faq" | "ai" | "escalation"
  showRating?: boolean
  rating?: "up" | "down" | null
}

export default function FAQChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [escalated, setEscalated] = useState(false)
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
        "👋 Ciao! Sono l'assistente del supporto clienti. Posso aiutarti con domande frequenti, problemi tecnici e molto altro. Come posso aiutarti?",
      sender: "bot",
      timestamp: new Date(),
      source: "faq",
    }
    setMessages([welcomeMessage])
  }, [])

  const findFAQResponse = (message: string): { response: string; source: string; showRating?: boolean } | null => {
    const lowerMessage = message.toLowerCase()

    // Saluti
    if (lowerMessage.includes("ciao") || lowerMessage.includes("salve") || lowerMessage.includes("hello")) {
      return {
        response:
          "👋 Ciao! Benvenuto nel nostro centro assistenza. Sono qui per rispondere alle tue domande. Di cosa hai bisogno?",
        source: "faq",
      }
    }

    // Password
    if (lowerMessage.includes("password") || lowerMessage.includes("accesso") || lowerMessage.includes("login")) {
      return {
        response:
          '🔐 **Problemi con la password?**\n\n1️⃣ Vai alla pagina di login\n2️⃣ Clicca su "Password dimenticata"\n3️⃣ Inserisci la tua email\n4️⃣ Controlla la tua casella email\n5️⃣ Segui le istruzioni nel messaggio\n\n⚠️ Se non ricevi l\'email, controlla la cartella spam. Hai ancora problemi?',
        source: "faq",
        showRating: true,
      }
    }

    // Account
    if (
      lowerMessage.includes("account") ||
      lowerMessage.includes("profilo") ||
      lowerMessage.includes("registrazione")
    ) {
      return {
        response:
          '👤 **Gestione Account:**\n\n✅ **Creare account**: Clicca "Registrati" e compila il form\n🔧 **Modificare profilo**: Vai in Impostazioni > Profilo\n🗑️ **Eliminare account**: Contatta il supporto\n📧 **Cambiare email**: Impostazioni > Email\n\nCosa vuoi fare esattamente?',
        source: "faq",
        showRating: true,
      }
    }

    // Fatturazione
    if (lowerMessage.includes("fattura") || lowerMessage.includes("pagamento") || lowerMessage.includes("billing")) {
      return {
        response:
          "💳 **Fatturazione e Pagamenti:**\n\n📄 **Scaricare fatture**: Area clienti > Fatture\n💰 **Metodi pagamento**: Carta, PayPal, Bonifico\n🔄 **Rinnovo automatico**: Gestibile dalle impostazioni\n❌ **Annullare abbonamento**: Impostazioni > Abbonamento\n\n📞 Per problemi di pagamento, contatta il supporto.",
        source: "faq",
        showRating: true,
      }
    }

    // Tecnico
    if (lowerMessage.includes("errore") || lowerMessage.includes("bug") || lowerMessage.includes("problema tecnico")) {
      return {
        response:
          "🔧 **Problemi Tecnici:**\n\n1️⃣ **Ricarica la pagina** (Ctrl+F5)\n2️⃣ **Svuota cache** del browser\n3️⃣ **Prova browser diverso** (Chrome, Firefox)\n4️⃣ **Disabilita estensioni** temporaneamente\n5️⃣ **Controlla connessione** internet\n\n🆘 Se il problema persiste, descrivimi l'errore esatto.",
        source: "faq",
        showRating: true,
      }
    }

    // Spedizione
    if (lowerMessage.includes("spedizione") || lowerMessage.includes("consegna") || lowerMessage.includes("tracking")) {
      return {
        response:
          "📦 **Spedizioni e Consegne:**\n\n🚚 **Tempi**: 2-5 giorni lavorativi\n📍 **Tracking**: Riceverai email con codice\n💰 **Costi**: Gratis sopra €50\n🏠 **Indirizzo**: Modificabile fino alla spedizione\n📞 **Problemi**: Contatta il corriere\n\nHai un codice di tracking da verificare?",
        source: "faq",
        showRating: true,
      }
    }

    // Reso
    if (lowerMessage.includes("reso") || lowerMessage.includes("rimborso") || lowerMessage.includes("return")) {
      return {
        response:
          "↩️ **Resi e Rimborsi:**\n\n⏰ **Tempo**: 30 giorni dall'acquisto\n📦 **Condizioni**: Prodotto integro e imballaggio originale\n💰 **Rimborso**: 5-10 giorni lavorativi\n📋 **Procedura**: Area clienti > I miei ordini > Richiedi reso\n\n🆘 Vuoi iniziare una procedura di reso?",
        source: "faq",
        showRating: true,
      }
    }

    // Contatti
    if (lowerMessage.includes("contatto") || lowerMessage.includes("telefono") || lowerMessage.includes("email")) {
      return {
        response:
          "📞 **Contatti Supporto:**\n\n📧 **Email**: support@digitalaura.it\n📱 **Telefono**: +39 02 1234 5678\n💬 **Chat**: Disponibile 24/7 (qui!)\n⏰ **Orari**: Lun-Ven 9:00-18:00\n🏢 **Sede**: Milano, Via Innovation 123\n\n🚨 Per urgenze, usa il telefono!",
        source: "faq",
        showRating: true,
      }
    }

    // Aiuto generico
    if (lowerMessage.includes("aiuto") || lowerMessage.includes("help") || lowerMessage.includes("supporto")) {
      return {
        response:
          "🆘 **Come posso aiutarti?**\n\n🔐 Problemi di accesso\n👤 Gestione account\n💳 Fatturazione\n🔧 Problemi tecnici\n📦 Spedizioni\n↩️ Resi e rimborsi\n📞 Contatti\n\n💬 Scrivi la tua domanda o scegli un argomento!",
        source: "faq",
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
      // Prima cerca nelle FAQ
      const faqResponse = findFAQResponse(content)

      if (faqResponse) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: faqResponse.response,
          sender: "bot",
          timestamp: new Date(),
          source: faqResponse.source as any,
          showRating: faqResponse.showRating,
        }
        setMessages((prev) => [...prev, botMessage])
      } else if (escalated) {
        // Se già escalato, simula risposta umana
        const humanMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "👨‍💼 **Operatore Umano**: Ho ricevuto la tua richiesta. Ti ricontatterò entro 2 ore lavorative via email con una soluzione personalizzata. Grazie per la pazienza!",
          sender: "bot",
          timestamp: new Date(),
          source: "escalation",
        }
        setMessages((prev) => [...prev, humanMessage])
      } else {
        // Usa AI per domande complesse
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Come assistente supporto clienti, rispondi a: ${content}`,
            language: "it",
          }),
        })

        const data = await response.json()

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            data.response ||
            "Mi dispiace, non ho trovato una risposta specifica. Vuoi che trasferisca la tua richiesta a un operatore umano?",
          sender: "bot",
          timestamp: new Date(),
          source: "ai",
          showRating: true,
        }

        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "❌ Si è verificato un errore. Sto trasferendo la tua richiesta a un operatore umano che ti contatterà a breve.",
        sender: "bot",
        timestamp: new Date(),
        source: "escalation",
      }
      setMessages((prev) => [...prev, errorMessage])
      setEscalated(true)
    } finally {
      setIsLoading(false)
    }
  }

  const rateMessage = (messageId: string, rating: "up" | "down") => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, rating } : msg)))

    if (rating === "down") {
      // Se rating negativo, offri escalation
      const escalationMessage: Message = {
        id: Date.now().toString(),
        content:
          "😔 Mi dispiace che la risposta non sia stata utile. Vuoi che trasferisca la tua richiesta a un operatore umano per un supporto personalizzato?",
        sender: "bot",
        timestamp: new Date(),
        source: "faq",
      }
      setMessages((prev) => [...prev, escalationMessage])
    } else {
      // Se rating positivo, ringrazia
      const thankMessage: Message = {
        id: Date.now().toString(),
        content: "😊 Perfetto! Sono felice di essere stato utile. C'è altro con cui posso aiutarti?",
        sender: "bot",
        timestamp: new Date(),
        source: "faq",
      }
      setMessages((prev) => [...prev, thankMessage])
    }
  }

  const escalateToHuman = () => {
    setEscalated(true)
    const escalationMessage: Message = {
      id: Date.now().toString(),
      content:
        "👨‍💼 **Trasferimento in corso...**\n\nLa tua richiesta è stata inoltrata al nostro team di supporto umano. Un operatore specializzato ti contatterà entro 2 ore lavorative.\n\n📧 Riceverai una email di conferma a breve.\n\nGrazie per la pazienza!",
      sender: "bot",
      timestamp: new Date(),
      source: "escalation",
    }
    setMessages((prev) => [...prev, escalationMessage])
  }

  const getSourceBadge = (source?: string) => {
    if (!source) return null

    const badges = {
      faq: { label: "FAQ", color: "bg-blue-500" },
      ai: { label: "AI", color: "bg-purple-500" },
      escalation: { label: "Umano", color: "bg-orange-500" },
    }

    const badge = badges[source as keyof typeof badges]
    if (!badge) return null

    return <Badge className={`${badge.color} text-white text-xs ml-2`}>{badge.label}</Badge>
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5" />
              <span>FAQ Support Bot</span>
            </CardTitle>
            <p className="text-sm text-white/80">Assistenza clienti intelligente</p>
          </div>
          {escalated && (
            <Badge className="bg-orange-500 text-white">
              <User className="h-3 w-3 mr-1" />
              Operatore Umano
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
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  {message.sender === "bot" && (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-60">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <div className="flex items-center space-x-2">
                        {getSourceBadge(message.source)}
                        {message.showRating && !message.rating && (
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => rateMessage(message.id, "up")}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => rateMessage(message.id, "down")}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        {message.rating && (
                          <Badge variant={message.rating === "up" ? "default" : "destructive"}>
                            {message.rating === "up" ? "👍" : "👎"}
                          </Badge>
                        )}
                      </div>
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

        {/* Quick Actions */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-600">Domande frequenti:</p>
            {!escalated && (
              <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent" onClick={escalateToHuman}>
                <Phone className="h-3 w-3 mr-1" />
                Operatore Umano
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 bg-transparent"
              onClick={() => sendMessage("Ho dimenticato la password")}
            >
              🔐 Password
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 bg-transparent"
              onClick={() => sendMessage("Problemi con il pagamento")}
            >
              💳 Pagamenti
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 bg-transparent"
              onClick={() => sendMessage("Dove è il mio ordine?")}
            >
              📦 Spedizioni
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 bg-transparent"
              onClick={() => sendMessage("Voglio fare un reso")}
            >
              ↩️ Resi
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Descrivi il tuo problema..."
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
