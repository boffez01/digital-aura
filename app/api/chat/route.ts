import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { BookingFlow } from "@/lib/booking-flow"
import { SupportFlow } from "@/lib/support-flow"
import { neon } from "@neondatabase/serverless"
import { ZohoService } from "@/lib/zoho-service"

const sql = neon(process.env.DATABASE_URL!)
const zohoService = new ZohoService()

const faqDatabase = {
  it: {
    // Pricing and Costs
    "quanto costa":
      "I nostri prezzi dipendono dalla complessità del progetto e dalle tue esigenze specifiche. 💰 Offriamo soluzioni personalizzate per ogni budget. Ti consiglio di prenotare una consulenza per discutere il tuo progetto e ricevere una valutazione dettagliata. Vuoi che ti aiuti a prenotare? 📅",
    prezzi:
      "I prezzi variano in base al tipo di servizio e alla complessità del progetto. 💼 Per darti un'idea generale: i chatbot partono da €2.000, i siti web da €3.000, mentre i progetti di automazione AI sono personalizzati. Prenota una consulenza per una valutazione precisa! 🎯",
    costo:
      "Il costo dipende dalla complessità del progetto. 📋 Offriamo consulenze per valutare le tue esigenze e fornirti una stima accurata. Ogni progetto include sviluppo e formazione. Vuoi prenotare una consulenza? 💡",

    // Services and Capabilities
    servizi:
      "Offriamo 4 servizi principali: 🎯\n\n1. **AI Automation** - Automazione processi aziendali\n2. **Chatbot Intelligenti** - Assistenti AI personalizzati\n3. **Web Development** - Siti moderni e applicazioni\n4. **AI Marketing** - Campagne automatizzate\n\nSu quale servizio vorresti saperne di più? 🤔",

    primo:
      "⚡ **AI Automation - Processi Automatizzati**\n\nLe nostre soluzioni possono:\n\n✅ Automatizzare task ripetitivi\n✅ Analizzare dati e generare report\n✅ Gestire email e comunicazioni\n✅ Ottimizzare workflow aziendali\n✅ Integrare sistemi diversi\n✅ Ridurre errori e costi\n\n💡 Ogni progetto include analisi completa e formazione!\n\nIn quale area vorresti automatizzare? Prenota una consulenza! 🎯",

    secondo:
      "🤖 **Chatbot Intelligenti - Assistenti AI 24/7**\n\nI nostre chatbot possono:\n\n✅ Rispondere automaticamente alle domande\n✅ Gestire prenotazioni e appuntamenti\n✅ Qualificare lead in automatico\n✅ Supportare multiple lingue\n✅ Integrarsi con i tuoi sistemi\n✅ Apprendere dalle conversazioni\n\n💡 Ogni progetto include training AI e formazione completa!\n\nVuoi prenotare una consulenza per discutere il tuo chatbot? 📅",

    terzo:
      "🌐 **Web Development - Siti Moderni e Performanti**\n\nCreiamo siti web professionali con:\n\n✅ Design responsive e moderno\n✅ Ottimizzazione SEO avanzata\n✅ Velocità di caricamento ottimale\n✅ E-commerce completo\n✅ Integrazione con sistemi esistenti\n✅ Sicurezza e backup automatici\n\n💡 Ogni progetto include formazione completa per il tuo team!\n\nVuoi prenotare una consulenza per discutere il tuo progetto? 🚀",

    quarto:
      "📈 **AI Marketing - Campagne Intelligenti**\n\nIl nostro Marketing AI include:\n\n✅ Analisi predittiva comportamento clienti\n✅ Personalizzazione contenuti automatica\n✅ Ottimizzazione campagne pubblicitarie\n✅ Segmentazione intelligente audience\n✅ Lead generation automatizzata\n✅ Analytics avanzati e reporting\n\n💡 Ogni progetto include strategia completa!\n\nVuoi sapere come può aiutare la tua azienda? 💡",

    "sviluppo web":
      "🌐 **Web Development - Siti Moderni e Performanti**\n\nCreiamo siti web professionali con:\n\n✅ Design responsive e moderno\n✅ Ottimizzazione SEO avanzata\n✅ Velocità di caricamento ottimale\n✅ E-commerce completo\n✅ Integrazione con sistemi esistenti\n✅ Sicurezza e backup automatici\n\n💡 Ogni progetto include formazione completa per il tuo team!\n\nVuoi prenotare una consulenza per discutere il tuo progetto? 🚀",

    chatbot:
      "🤖 **Chatbot Intelligenti - Assistenti AI 24/7**\n\nI nostre chatbot possono:\n\n✅ Rispondere automaticamente alle domande\n✅ Gestire prenotazioni e appuntamenti\n✅ Qualificare lead in automatico\n✅ Supportare multiple lingue\n✅ Integrarsi con i tuoi sistemi\n✅ Apprendere dalle conversazioni\n\n💡 Ogni progetto include training AI e formazione completa!\n\nVuoi prenotare una consulenza per discutere il tuo chatbot? 📅",

    automazione:
      "⚡ **AI Automation - Processi Automatizzati**\n\nLe nostre soluzioni possono:\n\n✅ Automatizzare task ripetitivi\n✅ Analizzare dati e generare report\n✅ Gestire email e comunicazioni\n✅ Ottimizzare workflow aziendali\n✅ Integrare sistemi diversi\n✅ Ridurre errori e costi\n\n💡 Ogni progetto include analisi completa e formazione!\n\nIn quale area vorresti automatizzare? Prenota una consulenza! 🎯",

    marketing:
      "📈 **AI Marketing - Campagne Intelligenti**\n\nIl nostro Marketing AI include:\n\n✅ Analisi predittiva comportamento clienti\n✅ Personalizzazione contenuti automatica\n✅ Ottimizzazione campagne pubblicitarie\n✅ Segmentazione intelligente audience\n✅ Lead generation automatizzata\n✅ Analytics avanzati e reporting\n\n💡 Ogni progetto include strategia completa!\n\nVuoi sapere come può aiutare la tua azienda? 💡",

    // Timeline and Process
    tempi:
      "I tempi di realizzazione dipendono dal progetto: ⏰\n\n🤖 **Chatbot**: 2-4 settimane\n🌐 **Sito Web**: 3-6 settimane\n⚡ **Automazione**: 4-8 settimane\n📈 **Marketing AI**: 2-6 settimane\n\nI tempi includono sviluppo, test e formazione completa del tuo team. Vuoi discutere le tempistiche per il tuo progetto? 📅",

    supporto:
      "Offriamo pacchetti di supporto personalizzati: 🛠️\n\n✅ Supporto tecnico prioritario\n✅ Manutenzione e aggiornamenti\n✅ Formazione continua del team\n✅ Monitoraggio performance\n✅ Backup e sicurezza\n✅ Consulenza strategica\n\nI pacchetti di supporto sono personalizzabili in base alle tue esigenze! 💪",

    // Booking - ATTIVA IL FLUSSO
    prenota: "BOOKING_START",
    prenotare: "BOOKING_START",
    appuntamento: "BOOKING_START",
    consulenza: "BOOKING_START",

    // Contact
    contatti:
      "Ecco come puoi contattarci: 📞\n\n📧 **Email**: info@praxisfutura.it\n📱 **Telefono**: +39 350 021 6480\n🌐 **Sito**: www.praxisfutura.it\n\n**Orari**: Lun-Ven 9:00-18:00\n\nPreferisci prenotare direttamente una consulenza? 📅",

    // General and Greetings
    ciao: "Ciao! 👋 Sono PraxisBot, l'assistente AI di Praxis Futura! Sono qui per aiutarti a scoprire come l'Intelligenza Artificiale può trasformare la tua azienda. Come posso aiutarti oggi? 🚀",

    aiuto:
      "Sono qui per aiutarti! 🤝 Posso rispondere a domande su:\n\n🤖 **Chatbot e AI Automation**\n🌐 **Sviluppo Web**\n📈 **Marketing AI**\n💰 **Costi e Tempistiche**\n📅 **Prenotazioni Consulenze**\n\nCosa ti interessa di più? 🎯",

    "chi siete":
      "Siamo Praxis Futura, esperti in trasformazione digitale e AI! 🌟\n\n**La nostra missione**: Aiutare le aziende a crescere attraverso l'innovazione tecnologica.\n\n**I nostri valori**:\n✅ Innovazione continua\n✅ Qualità eccellente\n✅ Risultati misurabili\n✅ Formazione completa\n\nVuoi sapere come possiamo aiutare la tua azienda? 💡",

    grazie:
      "Prego! 😊 È stato un piacere aiutarti! Se hai altre domande o vuoi approfondire qualche argomento, sono sempre qui. Ricorda che puoi prenotare una consulenza per discutere il tuo progetto in dettaglio! 🚀",

    // Default responses
    default:
      "🤖 Ciao! Sono qui per aiutarti con:\n\n✨ **Servizi AI** - Chatbot e automazione\n🌐 **Sviluppo Web** - Siti moderni\n📈 **Marketing AI** - Campagne intelligenti\n📅 **Prenotazioni** - Prenota qui!\n\nCosa ti interessa? 💡",
  },
  en: {
    services:
      "We offer 4 main services: 🎯\n\n1. **AI Automation** - Business process automation\n2. **Intelligent Chatbots** - Personalized AI assistants\n3. **Web Development** - Modern websites and applications\n4. **AI Marketing** - Automated campaigns\n\nWhich service would you like to know more about? 🤔",

    first:
      "⚡ **AI Automation - Automated Processes**\n\nOur solutions can:\n\n✅ Automate repetitive tasks\n✅ Analyze data and generate reports\n✅ Manage emails and communications\n✅ Optimize business workflows\n✅ Integrate different systems\n✅ Reduce errors and costs\n\n💡 Each project includes complete analysis and training!\n\nIn which area would you like to automate? Book a consultation! 🎯",

    second:
      "🤖 **Intelligent Chatbots - AI Assistants 24/7**\n\nOur chatbots can:\n\n✅ Automatically answer questions\n✅ Handle bookings and appointments\n✅ Automatically qualify leads\n✅ Support multiple languages\n✅ Integrate with your systems\n✅ Learn from conversations\n\n💡 Each project includes AI training and complete training!\n\nWant to book a consultation to discuss your chatbot? 📅",

    third:
      "🌐 **Web Development - Modern and Performant Websites**\n\nWe create professional websites with:\n\n✅ Responsive and modern design\n✅ Advanced SEO optimization\n✅ Optimal loading speed\n✅ Complete e-commerce\n✅ Integration with existing systems\n✅ Security and automatic backups\n\n💡 Each project includes complete training for your team!\n\nWant to book a consultation to discuss your project? 🚀",

    fourth:
      "📈 **AI Marketing - Intelligent Campaigns**\n\nOur AI Marketing includes:\n\n✅ Predictive customer behavior analysis\n✅ Automatic content personalization\n✅ Advertising campaign optimization\n✅ Intelligent audience segmentation\n✅ Automated lead generation\n✅ Advanced analytics and reporting\n\n💡 Each project includes complete strategy!\n\nWant to know how it can help your business? Book a consultation! 💡",

    book: "BOOKING_START",
    booking: "BOOKING_START",
    appointment: "BOOKING_START",
    consultation: "BOOKING_START",

    default:
      "🤖 Hi! I'm here to help you with:\n\n✨ **AI Services** - Chatbots and automation\n🌐 **Web Development** - Modern websites\n📈 **AI Marketing** - Intelligent campaigns\n📅 **Consultations** - Book here!\n\nWhat would you like to know? 💡",
  },
}

// Detect language from message
function detectLanguage(message: string): "it" | "en" {
  const italianKeywords = [
    "ciao",
    "salve",
    "buongiorno",
    "buonasera",
    "grazie",
    "prego",
    "scusi",
    "aiuto",
    "quanto",
    "costa",
    "prezzo",
    "servizi",
    "chatbot",
    "sito",
    "web",
    "automazione",
    "marketing",
    "prenota",
    "prenotare",
    "appuntamento",
    "consulenza",
    "contatti",
    "chi",
    "siete",
    "come",
    "stai",
    "voglio",
    "sapere",
    "sviluppo",
    "maggiori",
    "informazioni",
    "si",
    "sì",
    "più",
    "piu",
    "sui",
    "intelligenti",
    "intelligente",
    "primo",
    "secondo",
    "terzo",
    "quarto",
    "supporto",
    "tecnico",
    "problema",
  ]

  const englishKeywords = [
    "hello",
    "hi",
    "good",
    "morning",
    "evening",
    "thanks",
    "thank",
    "help",
    "how",
    "much",
    "cost",
    "price",
    "services",
    "chatbot",
    "website",
    "automation",
    "marketing",
    "book",
    "booking",
    "appointment",
    "consultation",
    "contact",
    "who",
    "are",
    "want",
    "know",
    "development",
    "more",
    "information",
    "yes",
    "intelligent",
    "first",
    "second",
    "third",
    "fourth",
    "need",
    "technical",
    "support",
    "problem",
    "issue",
  ]

  const lowerMessage = message.toLowerCase()

  const italianMatches = italianKeywords.filter((keyword) => lowerMessage.includes(keyword)).length
  const englishMatches = englishKeywords.filter((keyword) => lowerMessage.includes(keyword)).length

  return italianMatches > englishMatches ? "it" : "en"
}

// Find best FAQ match
function findBestFAQMatch(message: string, language: "it" | "en"): string | null {
  const faq = faqDatabase[language]
  const lowerMessage = message.toLowerCase().trim()

  // Check for booking triggers
  const bookingTriggers = ["prenota", "prenotare", "appuntamento", "consulenza", "book", "booking", "appointment"]
  if (bookingTriggers.some((trigger) => lowerMessage.includes(trigger))) {
    return "BOOKING_START"
  }

  // Direct keyword matching
  const keywords = Object.keys(faq)
  for (const keyword of keywords) {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      return faq[keyword as keyof typeof faq]
    }
  }

  // Fuzzy matching for service numbers
  if (lowerMessage.includes("primo") || lowerMessage.includes("1")) {
    return faq.primo || null
  }
  if (lowerMessage.includes("secondo") || lowerMessage.includes("2")) {
    return faq.secondo || null
  }
  if (lowerMessage.includes("terzo") || lowerMessage.includes("3")) {
    return faq.terzo || null
  }
  if (lowerMessage.includes("quarto") || lowerMessage.includes("4")) {
    return faq.quarto || null
  }

  // Fuzzy matching for services
  const variations: Record<string, Record<string, string[]>> = {
    it: {
      servizi: ["servizio", "cosa fate", "che servizi", "offrite"],
      chatbot: ["bot", "assistente", "virtuale", "intelligenti", "intelligente"],
      "sviluppo web": ["sito web", "sito", "website"],
      automazione: ["automatizzare", "automazione ai"],
      marketing: ["marketing ai", "campagne", "pubblicità"],
    },
    en: {
      services: ["service", "what do you do", "what services"],
      chatbot: ["bot", "assistant", "virtual", "intelligent"],
      first: ["1st"],
      second: ["2nd"],
      third: ["3rd"],
      fourth: ["4th"],
    },
  }

  const langVariations = variations[language]
  for (const [key, synonyms] of Object.entries(langVariations)) {
    if (synonyms.some((synonym) => lowerMessage.includes(synonym))) {
      return faq[key as keyof typeof faq] || null
    }
  }

  return null
}

// Initialize Gemini AI with correct model
let genAI: GoogleGenerativeAI | null = null
let model: any = null

try {
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })
    console.log("✅ Gemini 2.5 Flash Lite initialized successfully")
  } else {
    console.warn("⚠️ GOOGLE_GENERATIVE_AI_API_KEY not found")
  }
} catch (error) {
  console.error("❌ Failed to initialize Gemini AI:", error)
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const currentSessionId = sessionId || `session_${Date.now()}`
    const sessionData = await sql`
      SELECT booking_mode, flow_step, booking_data, language, support_mode, attempt_count
      FROM chat_sessions
      WHERE session_id = ${currentSessionId}
    `

    let language: "it" | "en" = "it"

    if (sessionData.length === 0) {
      language = detectLanguage(message)
      console.log(`[v0] 🆕 NEW session - Detected language from message: ${language}`)
    } else if (sessionData[0].language) {
      language = sessionData[0].language as "it" | "en"
      console.log(`[v0] 🔄 EXISTING session - Using stored language: ${language}`)
    } else {
      language = detectLanguage(message)
      console.log(`[v0] 🔍 Session exists but no language stored - Detected: ${language}`)
    }

    console.log(`[v0] 📨 Message: "${message}", Language: ${language}, Session: ${currentSessionId}`)

    const isBookingMode = sessionData.length > 0 && sessionData[0].booking_mode === true
    const isSupportMode = sessionData.length > 0 && sessionData[0].support_mode === true
    const currentStep = sessionData.length > 0 ? sessionData[0].flow_step : null

    console.log(`[v0] 🔍 Booking mode: ${isBookingMode}, Support mode: ${isSupportMode}, Step: ${currentStep}`)

    const supportTriggers = [
      "supporto tecnico",
      "technical support",
      "need help",
      "problema tecnico",
      "technical problem",
      "technical issue",
      "aiuto tecnico",
      "help me",
      "aiutami",
    ]

    const bookSupportTriggers = [
      "prenota supporto",
      "book support",
      "book a support",
      "book support consultation",
      "prenota consulenza supporto",
      "voglio prenotare supporto",
    ]

    const lowerMessage = message.toLowerCase()
    const isSupportRequest = supportTriggers.some((trigger) => lowerMessage.includes(trigger))
    const isBookSupportRequest = bookSupportTriggers.some((trigger) => lowerMessage.includes(trigger))

    if (isBookSupportRequest) {
      console.log(`[v0] 📞 User wants to book support consultation - Starting booking with Priority Support`)

      // Create session if doesn't exist
      if (sessionData.length === 0) {
        console.log(`[v0] 📝 Creating new session for support booking with language: ${language}`)
        await sql`
          INSERT INTO chat_sessions (session_id, language, support_mode, created_at)
          VALUES (${currentSessionId}, ${language}, false, NOW())
        `
      }

      // Set booking data to Priority Support service
      await sql`
        UPDATE chat_sessions 
        SET booking_data = ${JSON.stringify({ service: "Priority Support" })},
            booking_mode = true,
            flow_step = 'service_selection'
        WHERE session_id = ${currentSessionId}
      `

      const bookingFlow = new BookingFlow()
      const bookingResponse = await bookingFlow.handleBookingStep(
        currentSessionId,
        message,
        "service_selection",
        language,
      )

      return NextResponse.json({
        response: bookingResponse.message,
        type: "booking",
        language,
        sessionId: currentSessionId,
        bookingMode: true,
        nextStep: bookingResponse.nextStep,
      })
    }

    // Handle booking flow - THIS MUST BE CHECKED FIRST
    if (isBookingMode && currentStep) {
      console.log("📅 Processing booking step...")
      const bookingFlow = new BookingFlow()
      const bookingResponse = await bookingFlow.handleBookingStep(currentSessionId, message, currentStep, language)

      return NextResponse.json({
        response: bookingResponse.message,
        type: "booking",
        language,
        sessionId: currentSessionId,
        bookingMode: !bookingResponse.completed,
        nextStep: bookingResponse.nextStep,
      })
    }

    // Handle support flow - THIS IS CHECKED AFTER BOOKING
    if (isSupportMode) {
      console.log(`[v0] 🛠️ Processing EXISTING support session with language: ${language}`)
      const supportFlow = new SupportFlow()
      const supportResponse = await supportFlow.handleSupportRequest(currentSessionId, message, language)

      return NextResponse.json({
        response: supportResponse.message,
        type: "support",
        language,
        sessionId: currentSessionId,
        supportMode: !supportResponse.completed,
      })
    }

    if (isSupportRequest) {
      console.log(`[v0] 🛠️ Starting NEW support flow with language: ${language}`)

      if (sessionData.length === 0) {
        console.log(`[v0] 📝 Creating new session for support request with language: ${language}`)
        await sql`
          INSERT INTO chat_sessions (session_id, language, support_mode, created_at)
          VALUES (${currentSessionId}, ${language}, false, NOW())
        `
      }

      const supportFlow = new SupportFlow()
      const supportResponse = await supportFlow.handleSupportRequest(currentSessionId, message, language)

      return NextResponse.json({
        response: supportResponse.message,
        type: "support",
        language,
        sessionId: currentSessionId,
        supportMode: true,
      })
    }

    const faqResponse = findBestFAQMatch(message, language)

    if (faqResponse === "BOOKING_START") {
      console.log("🎯 Starting booking flow...")
      const bookingFlow = new BookingFlow()
      const bookingResponse = await bookingFlow.handleBookingStep(currentSessionId, message, "booking_start", language)

      return NextResponse.json({
        response: bookingResponse.message,
        type: "booking",
        language,
        sessionId: currentSessionId,
        bookingMode: true,
        nextStep: bookingResponse.nextStep,
      })
    }

    // Regular FAQ response
    if (faqResponse && faqResponse !== "BOOKING_START") {
      console.log("✅ Using FAQ response")
      return NextResponse.json({
        response: faqResponse,
        type: "faq",
        language,
        sessionId: currentSessionId,
      })
    }

    // Use AI for complex queries
    if (model) {
      try {
        const userEmail = sessionData.length > 0 ? sessionData[0].booking_data?.email : null
        let contextString = ""

        if (userEmail) {
          const customerInfo = await zohoService.getCustomerContext(userEmail)
          if (customerInfo) {
            contextString = `\n\nZOHO ZIA CONTEXT: User found. Status: ${customerInfo.status}, Lead Score: ${customerInfo.lead_score}, Priority: ${customerInfo.priority}. Adapt the response based on this data, maintaining the user's language.`
          }
        }

        const systemPrompt = `You are PraxisBot, the AI assistant for Praxis Futura. Your expertise includes:
          - 🤖 AI Automation
          - 💬 Intelligent Chatbots
          - 🌐 Web Development
          - 📈 AI Marketing
          
          YOUR PRIMARY DIRECTIVE: Always detect the language of the user's question (e.g., Italian, English) and ensure the ENTIRE response is ONLY in that language.
          
          If the question is completely outside the scope of AI, Chatbots, Web Development, or AI Marketing, or is inappropriate, you MUST politely decline the request and redirect the user back to the business services, maintaining the exact language of the user's query for your refusal.

          ${contextString}

          IMPORTANT RULES:
          - Keep responses brief (max 100 words).
          - DO NOT mention "demo" or "free support".
          - Always encourage the user to book a consultation.
          - Use relevant emojis.
          - CRITICAL: Even when refusing inappropriate requests, ALWAYS respond in the same language as the user's question.

          User Question to Answer: ${message}`

        const result = await model.generateContent(systemPrompt)
        const response = await result.response
        const text = response.text()

        return NextResponse.json({
          response: text,
          type: "ai",
          language,
          sessionId: currentSessionId,
        })
      } catch (aiError) {
        console.error("AI Error:", aiError)
      }
    }

    // Fallback response
    const fallbackResponse =
      language === "it"
        ? "🤖 Sono qui per aiutarti! Posso risponderti su:\n\n✨ **Servizi AI**\n🌐 **Web Development**\n📈 **Marketing AI**\n💰 **Costi e Tempistiche**\n📅 **Prenotazioni Consulenze**\n\nCosa ti interessa? 💡"
        : "🤖 I'm here to help! I can answer about:\n\n✨ **AI Services**\n🌐 **Web Development**\n📈 **AI Marketing**\n📅 **Bookings**\n\nWhat interests you? 💡"

    return NextResponse.json({
      response: fallbackResponse,
      type: "fallback",
      language,
      sessionId: currentSessionId,
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        response: "Mi dispiace, si è verificato un errore. Riprova! 🔄",
      },
      { status: 500 },
    )
  }
}
