import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { neon } from "@neondatabase/serverless"
import { language } from "some-module" // Declare or import the language variable

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const sql = neon(process.env.DATABASE_URL!)

interface ChatSession {
  id: string
  messages: Array<{
    role: "user" | "assistant"
    content: string
    timestamp: Date
  }>
  context: {
    flow: string
    step: number | string
    hasUserInfo: boolean
    needsHuman: boolean
    escalationActive?: boolean
    bookingMode?: boolean
    completed?: boolean
    userInfo?: {
      name?: string
      email?: string
      phone?: string
      company?: string
      service?: string
      date?: string
      time?: string
    }
  }
  supportActive: boolean
  supportLevel: number
  language: "it" | "en"
  createdAt: Date
  updatedAt: Date
}

// In-memory session storage (in production, use Redis or database)
const sessions = new Map<string, ChatSession>()

const translations = {
  it: {
    greeting: "👋 **Ciao! Sono AuraBot, l'assistente AI di Digital Aura.**",
    servicePrompt: "Posso aiutarti con:",
    services: [
      "🤖 **Servizi AI** - Automazione e chatbots intelligenti",
      "🌐 **Sviluppo Web** - Siti moderni e e-commerce",
      "📊 **AI Marketing** - Campagne automatizzate",
      "📅 **Prenotazioni** - Consulenze gratuite DIRETTAMENTE QUI",
    ],
    howCanHelp: "**Come posso aiutarti oggi?** 😊",
    supportActivated:
      "🔴 **SUPPORTO TECNICO ATTIVATO**\n\nHo rilevato che hai bisogno di assistenza tecnica. Ti sto trasferendo al nostro team di supporto specializzato.\n\n**Descrivi il problema che stai riscontrando:**",
    bookingStart:
      "📅 **PRENOTAZIONE CONSULENZA GRATUITA**\n\nPerfetto! Ti aiuto a prenotare la tua consulenza gratuita.\n\n**Per quale servizio sei interessato?**\n\n1. 🤖 AI Automation\n2. 🌐 Web Development\n3. 📊 AI Marketing\n4. 💬 Chatbot Development",
    nameRequest: "Perfect! Now I need your **full name**:",
    emailRequest: "Thanks! Now enter your **email**:",
    phoneRequest: "Great! Enter your **phone number**:",
    companyRequest: "Perfect! What's your **company name**? (optional)",
    dateRequest: "Excellent! When would you prefer the consultation? Enter a **date** (e.g., January 15th):",
    timeRequest: "Perfect! What **time** would you prefer? (e.g., 2:00 PM):",
    bookingComplete:
      "🎉 **PRENOTAZIONE COMPLETATA!**\n\nLa tua consulenza è stata prenotata con successo!\n\n**Dettagli:**\n- Servizio: {service}\n- Data: {date}\n- Ora: {time}\n\nRiceverai una email di conferma a breve. Grazie per aver scelto Digital Aura!",
    errorMessage: "Mi dispiace, c'è stato un errore. Riprova o contattaci direttamente.",
    escalationMessage: "Ti sto trasferendo a un operatore umano per un'assistenza più approfondita.",
    supportIntro:
      "🔧 **ASSISTENZA TECNICA**\n\nSono qui per aiutarti con qualsiasi problema tecnico. Descrivi il problema che stai riscontrando:",
    supportEscalation:
      "Capisco la tua frustrazione. Ti sto mettendo in contatto con il nostro team di supporto tecnico specializzato.",
    generalResponse: "Grazie per il tuo messaggio. Come posso aiutarti specificamente oggi?",
  },
  en: {
    greeting: "👋 **Hello! I'm AuraBot, Digital Aura's AI assistant.**",
    servicePrompt: "I can help you with:",
    services: [
      "🤖 **AI Services** - Automation and intelligent chatbots",
      "🌐 **Web Development** - Modern websites and e-commerce",
      "📊 **AI Marketing** - Automated campaigns",
      "📅 **Bookings** - Free consultations DIRECTLY HERE",
    ],
    howCanHelp: "**How can I help you today?** 😊",
    supportActivated:
      "🔴 **TECHNICAL SUPPORT ACTIVATED**\n\nI detected that you need technical assistance. I'm transferring you to our specialized support team.\n\n**Describe the problem you're experiencing:**",
    bookingStart:
      "📅 **FREE CONSULTATION BOOKING**\n\nPerfect! I'll help you book your free consultation.\n\n**Which service are you interested in?**\n\n1. 🤖 AI Automation\n2. 🌐 Web Development\n3. 📊 AI Marketing\n4. 💬 Chatbot Development",
    nameRequest: "Perfect! Now I need your **full name**:",
    emailRequest: "Thanks! Now enter your **email**:",
    phoneRequest: "Great! Enter your **phone number**:",
    companyRequest: "Perfect! What's your **company name**? (optional)",
    dateRequest: "Excellent! When would you prefer the consultation? Enter a **date** (e.g., January 15th):",
    timeRequest: "Perfect! What **time** would you prefer? (e.g., 2:00 PM):",
    bookingComplete:
      "🎉 **BOOKING COMPLETED!**\n\nYour consultation has been successfully booked!\n\n**Details:**\n- Service: {service}\n- Date: {date}\n- Time: {time}\n\nYou'll receive a confirmation email shortly. Thank you for choosing Digital Aura!",
    errorMessage: "Sorry, there was an error. Please try again or contact us directly.",
    escalationMessage: "I'm transferring you to a human operator for more in-depth assistance.",
    supportIntro:
      "🔧 **TECHNICAL SUPPORT**\n\nI'm here to help you with any technical issues. Describe the problem you're experiencing:",
    supportEscalation: "I understand your frustration. I'm connecting you with our specialized technical support team.",
    generalResponse: "Thank you for your message. How can I help you specifically today?",
  },
}

function getOrCreateSession(sessionId: string, language: "it" | "en"): ChatSession {
  if (!sessions.has(sessionId)) {
    const newSession: ChatSession = {
      id: sessionId,
      messages: [],
      context: {
        flow: "general",
        step: 0,
        hasUserInfo: false,
        needsHuman: false,
        escalationActive: false,
        bookingMode: false,
        completed: false,
        userInfo: {},
      },
      supportActive: false,
      supportLevel: 0,
      language,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    sessions.set(sessionId, newSession)
  }

  const session = sessions.get(sessionId)!
  session.language = language
  session.updatedAt = new Date()
  return session
}

function detectIntent(message: string, language: "it" | "en") {
  const lowerMessage = message.toLowerCase()

  // Support keywords
  const supportKeywords = {
    it: ["problema", "errore", "bug", "non funziona", "aiuto", "assistenza", "supporto", "tecnico"],
    en: ["problem", "error", "bug", "not working", "help", "support", "technical", "issue"],
  }

  // Booking keywords
  const bookingKeywords = {
    it: ["prenotare", "appuntamento", "consulenza", "incontrare", "parlare", "prenota"],
    en: ["book", "appointment", "consultation", "meeting", "schedule", "talk"],
  }

  // Check for support intent
  if (supportKeywords[language].some((keyword) => lowerMessage.includes(keyword))) {
    return "support"
  }

  // Check for booking intent
  if (bookingKeywords[language].some((keyword) => lowerMessage.includes(keyword))) {
    return "booking"
  }

  return "general"
}

async function handleBookingFlow(session: ChatSession, message: string, currentT: any) {
  const { context } = session

  if (!context.bookingMode) {
    context.bookingMode = true
    context.flow = "booking"
    context.step = 1
    return {
      message: currentT.bookingStart,
      supportActive: false,
      supportLevel: 0,
      context,
    }
  }

  switch (context.step) {
    case 1: // Service selection
      const services = ["AI Automation", "Web Development", "AI Marketing", "Chatbot Development"]
      const serviceIndex = Number.parseInt(message) - 1
      if (serviceIndex >= 0 && serviceIndex < services.length) {
        context.userInfo!.service = services[serviceIndex]
        context.step = 2
        return {
          message: currentT.nameRequest,
          supportActive: false,
          supportLevel: 0,
          context,
        }
      } else {
        context.userInfo!.service = message
        context.step = 2
        return {
          message: currentT.nameRequest,
          supportActive: false,
          supportLevel: 0,
          context,
        }
      }

    case 2: // Name
      context.userInfo!.name = message
      context.step = 3
      return {
        message: currentT.emailRequest,
        supportActive: false,
        supportLevel: 0,
        context,
      }

    case 3: // Email
      if (message.includes("@")) {
        context.userInfo!.email = message
        context.step = 4
        return {
          message: currentT.phoneRequest,
          supportActive: false,
          supportLevel: 0,
          context,
        }
      } else {
        return {
          message: "Per favore inserisci un'email valida:",
          supportActive: false,
          supportLevel: 0,
          context,
        }
      }

    case 4: // Phone
      context.userInfo!.phone = message
      context.step = 5
      return {
        message: currentT.companyRequest,
        supportActive: false,
        supportLevel: 0,
        context,
      }

    case 5: // Company (optional)
      context.userInfo!.company = message
      context.step = 6
      return {
        message: currentT.dateRequest,
        supportActive: false,
        supportLevel: 0,
        context,
      }

    case 6: // Date
      context.userInfo!.date = message
      context.step = 7
      return {
        message: currentT.timeRequest,
        supportActive: false,
        supportLevel: 0,
        context,
      }

    case 7: // Time - Complete booking
      context.userInfo!.time = message
      context.completed = true

      // Save to database
      try {
        await sql`
          INSERT INTO appointments (
            name, email, phone, company, service, preferred_date, preferred_time, 
            status, created_at, notes
          ) VALUES (
            ${context.userInfo!.name},
            ${context.userInfo!.email},
            ${context.userInfo!.phone},
            ${context.userInfo!.company || ""},
            ${context.userInfo!.service},
            ${context.userInfo!.date},
            ${context.userInfo!.time},
            'pending',
            NOW(),
            'Booked via chatbot'
          )
        `
      } catch (error) {
        console.error("Error saving appointment:", error)
      }

      const completionMessage = currentT.bookingComplete
        .replace("{service}", context.userInfo!.service)
        .replace("{date}", context.userInfo!.date)
        .replace("{time}", context.userInfo!.time)

      return {
        message: completionMessage,
        supportActive: false,
        supportLevel: 0,
        context,
      }

    default:
      return {
        message: currentT.errorMessage,
        supportActive: false,
        supportLevel: 0,
        context,
      }
  }
}

async function handleSupportFlow(session: ChatSession, message: string, currentT: any) {
  session.supportActive = true
  session.supportLevel = Math.min(session.supportLevel + 1, 4)

  if (session.supportLevel >= 3) {
    session.context.escalationActive = true
    return {
      message: currentT.supportEscalation,
      supportActive: true,
      supportLevel: session.supportLevel,
      context: session.context,
    }
  }

  return {
    message: currentT.supportIntro,
    supportActive: true,
    supportLevel: session.supportLevel,
    context: session.context,
  }
}

async function generateAIResponse(message: string, language: "it" | "en") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
    You are AuraBot, Digital Aura's AI assistant. Respond in ${language === "it" ? "Italian" : "English"}.
    
    Digital Aura offers:
    - AI Automation and Chatbots
    - Web Development
    - AI Marketing
    - Free consultations
    
    User message: "${message}"
    
    Provide a helpful, professional response in ${language === "it" ? "Italian" : "English"}. Keep it concise and friendly.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Gemini API error:", error)
    return language === "it"
      ? "Grazie per il tuo messaggio. Come posso aiutarti specificamente oggi?"
      : "Thank you for your message. How can I help you specifically today?"
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, language = "it", sessionId } = await request.json()

    if (!message || !sessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Message and sessionId are required",
        },
        { status: 400 },
      )
    }

    const session = getOrCreateSession(sessionId, language)
    const currentT = translations[language]

    // Add user message to session
    session.messages.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    })

    // Detect intent
    const intent = detectIntent(message, language)

    let response

    // Handle different flows
    if (intent === "support" || session.supportActive) {
      response = await handleSupportFlow(session, message, currentT)
    } else if (intent === "booking" || session.context.bookingMode) {
      response = await handleBookingFlow(session, message, currentT)
    } else {
      // General conversation with AI
      const aiResponse = await generateAIResponse(message, language)
      response = {
        message: aiResponse,
        supportActive: false,
        supportLevel: 0,
        context: session.context,
      }
    }

    // Add bot response to session
    session.messages.push({
      role: "assistant",
      content: response.message,
      timestamp: new Date(),
    })

    // Update session
    session.supportActive = response.supportActive
    session.supportLevel = response.supportLevel
    session.context = response.context

    // Save session to database
    try {
      await sql`
        INSERT INTO chat_sessions (
          session_id, messages, context, support_active, support_level, 
          language, created_at, updated_at
        ) VALUES (
          ${sessionId},
          ${JSON.stringify(session.messages)},
          ${JSON.stringify(session.context)},
          ${session.supportActive},
          ${session.supportLevel},
          ${language},
          ${session.createdAt.toISOString()},
          ${session.updatedAt.toISOString()}
        )
        ON CONFLICT (session_id) DO UPDATE SET
          messages = ${JSON.stringify(session.messages)},
          context = ${JSON.stringify(session.context)},
          support_active = ${session.supportActive},
          support_level = ${session.supportLevel},
          language = ${language},
          updated_at = ${session.updatedAt.toISOString()}
      `
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Continue without failing - session is still in memory
    }

    return NextResponse.json({
      success: true,
      message: response.message,
      supportActive: response.supportActive,
      supportLevel: response.supportLevel,
      context: response.context,
    })
  } catch (error) {
    console.error("Chat API error:", error)

    const errorMessage =
      language === "it"
        ? "Mi dispiace, c'è stato un errore. Riprova o contattaci direttamente."
        : "Sorry, there was an error. Please try again or contact us directly."

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        supportActive: false,
        supportLevel: 0,
      },
      { status: 500 },
    )
  }
}
