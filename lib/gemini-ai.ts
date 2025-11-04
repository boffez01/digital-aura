import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

if (!apiKey) {
  throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set")
}

const genAI = new GoogleGenerativeAI(apiKey)

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface ChatContext {
  sessionId: string
  language: "it" | "en"
  history: ChatMessage[]
  userInfo?: {
    name?: string
    email?: string
    phone?: string
  }
}

export async function generateChatResponse(context: ChatContext, userMessage: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const systemPrompt =
      context.language === "it"
        ? `Sei AuraBot, l'assistente AI di Praxis Futura. Aiuti i clienti con:
- Servizi AI (automazione, chatbot intelligenti)
- Sviluppo Web (siti moderni, e-commerce)
- Marketing AI (campagne automatizzate)
- Prenotazioni (consulenze gratuite)

Rispondi in modo professionale, amichevole e conciso. Se l'utente vuole prenotare, chiedi nome, email e preferenze.`
        : `You are AuraBot, Praxis Futura's AI assistant. You help clients with:
- AI Services (automation, intelligent chatbots)
- Web Development (modern websites, e-commerce)
- AI Marketing (automated campaigns)
- Bookings (free consultations)

Respond professionally, friendly and concisely. If the user wants to book, ask for name, email and preferences.`

    const chatHistory = context.history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    })

    const result = await chat.sendMessage(`${systemPrompt}\n\nUser: ${userMessage}`)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("[v0] Gemini AI error:", error)
    return context.language === "it"
      ? "Mi dispiace, si è verificato un errore. Riprova tra poco."
      : "Sorry, an error occurred. Please try again shortly."
  }
}

export async function detectIntent(message: string, language: "it" | "en"): Promise<string> {
  const bookingKeywords =
    language === "it"
      ? ["prenota", "prenotare", "appuntamento", "consulenza", "incontro"]
      : ["book", "booking", "appointment", "consultation", "meeting"]

  const supportKeywords =
    language === "it" ? ["aiuto", "supporto", "problema", "assistenza"] : ["help", "support", "problem", "assistance"]

  const servicesKeywords =
    language === "it"
      ? ["servizi", "cosa fate", "offrite", "prezzi"]
      : ["services", "what do you do", "offer", "pricing"]

  const lowerMessage = message.toLowerCase()

  if (bookingKeywords.some((keyword) => lowerMessage.includes(keyword))) {
    return "booking"
  }
  if (supportKeywords.some((keyword) => lowerMessage.includes(keyword))) {
    return "support"
  }
  if (servicesKeywords.some((keyword) => lowerMessage.includes(keyword))) {
    return "services"
  }

  return "general"
}
