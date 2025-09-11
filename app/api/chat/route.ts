import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

// Bilingual responses for different scenarios
const responses = {
  it: {
    greeting: "👋 Ciao! Sono AuraBot, l'assistente AI di Digital Aura. Come posso aiutarti oggi?",
    services:
      "🚀 I nostri servizi includono:\n\n🤖 **Automazione AI** - Chatbot intelligenti e automazione processi\n🌐 **Sviluppo Web** - Siti moderni, e-commerce e applicazioni\n📊 **AI Marketing** - Campagne automatizzate e analisi predittive\n📈 **Consulenza** - Strategia digitale personalizzata\n\nSu quale servizio vorresti saperne di più?",
    booking:
      "📅 **Perfetto! Organizziamo una consulenza gratuita.**\n\nPer prenotare un appuntamento, puoi:\n\n1️⃣ Andare alla pagina appuntamenti\n2️⃣ Scegliere data e orario\n3️⃣ Compilare i tuoi dati\n\n🔗 [Prenota ora](/appointments)\n\nHai preferenze per data/orario?",
    support:
      "🔧 **Supporto Tecnico Attivato**\n\nSto analizzando il tuo problema. Puoi descrivermi:\n\n❓ Che tipo di problema stai riscontrando?\n🖥️ Su quale dispositivo/browser?\n⏰ Quando è iniziato il problema?\n\nSono qui per aiutarti a risolverlo!",
    faq: "❓ **Domande Frequenti**\n\n💰 **Prezzi**: Consulenza gratuita, preventivi personalizzati\n⏱️ **Tempi**: Progetti da 2-8 settimane\n🛠️ **Tecnologie**: React, Next.js, AI, Node.js\n📞 **Supporto**: Assistenza continua post-lancio\n\nHai una domanda specifica?",
    fallback:
      "Mi dispiace, sto avendo problemi di connessione con l'AI. Posso comunque aiutarti con:\n\n🤖 Informazioni sui servizi\n📅 Prenotazione appuntamenti\n🔧 Supporto tecnico\n❓ Domande frequenti\n\nCosa ti serve?",
  },
  en: {
    greeting: "👋 Hello! I'm AuraBot, Digital Aura's AI assistant. How can I help you today?",
    services:
      "🚀 Our services include:\n\n🤖 **AI Automation** - Intelligent chatbots and process automation\n🌐 **Web Development** - Modern websites, e-commerce and applications\n📊 **AI Marketing** - Automated campaigns and predictive analytics\n📈 **Consulting** - Personalized digital strategy\n\nWhich service would you like to know more about?",
    booking:
      "📅 **Perfect! Let's organize a free consultation.**\n\nTo book an appointment, you can:\n\n1️⃣ Go to the appointments page\n2️⃣ Choose date and time\n3️⃣ Fill in your details\n\n🔗 [Book now](/appointments)\n\nDo you have any preferences for date/time?",
    support:
      "🔧 **Technical Support Activated**\n\nI'm analyzing your problem. Can you describe:\n\n❓ What type of problem are you experiencing?\n🖥️ On which device/browser?\n⏰ When did the problem start?\n\nI'm here to help you solve it!",
    faq: "❓ **Frequently Asked Questions**\n\n💰 **Pricing**: Free consultation, custom quotes\n⏱️ **Timeline**: Projects from 2-8 weeks\n🛠️ **Technologies**: React, Next.js, AI, Node.js\n📞 **Support**: Continuous post-launch assistance\n\nDo you have a specific question?",
    fallback:
      "Sorry, I'm having connection issues with the AI. I can still help you with:\n\n🤖 Service information\n📅 Appointment booking\n🔧 Technical support\n❓ Frequently asked questions\n\nWhat do you need?",
  },
}

// Intent detection patterns
const intents = {
  services: {
    it: ["servizi", "cosa fate", "cosa offrite", "sviluppo", "ai", "marketing", "automazione", "chatbot"],
    en: ["services", "what do you do", "what do you offer", "development", "ai", "marketing", "automation", "chatbot"],
  },
  booking: {
    it: ["prenota", "appuntamento", "consulenza", "incontro", "prenotare", "voglio prenotare"],
    en: ["book", "appointment", "consultation", "meeting", "schedule", "want to book"],
  },
  support: {
    it: ["problema", "aiuto", "supporto", "errore", "non funziona", "assistenza", "ho un problema"],
    en: ["problem", "help", "support", "error", "not working", "assistance", "i have a problem"],
  },
  faq: {
    it: ["domande", "faq", "prezzi", "costi", "tempi", "quanto costa", "informazioni"],
    en: ["questions", "faq", "pricing", "costs", "timeline", "how much", "information"],
  },
}

function detectIntent(message: string, language: "it" | "en"): string | null {
  const lowerMessage = message.toLowerCase()

  for (const [intent, patterns] of Object.entries(intents)) {
    const langPatterns = patterns[language] || []
    if (langPatterns.some((pattern) => lowerMessage.includes(pattern))) {
      return intent
    }
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const { message, language = "it", sessionId } = await request.json()

    if (!message || !sessionId) {
      return NextResponse.json({ success: false, message: "Message and sessionId are required" }, { status: 400 })
    }

    const lang = language as "it" | "en"
    const intent = detectIntent(message, lang)

    // Handle specific intents with predefined responses
    if (intent && responses[lang][intent as keyof (typeof responses)[typeof lang]]) {
      const response = responses[lang][intent as keyof (typeof responses)[typeof lang]]

      return NextResponse.json({
        success: true,
        message: response,
        supportActive: intent === "support",
        supportLevel: intent === "support" ? 1 : 0,
        context: {
          flow: intent,
          step: 1,
          hasUserInfo: false,
          needsHuman: intent === "support",
          escalationActive: intent === "support",
        },
      })
    }

    // Try AI response with fallback - only if API key is available
    if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      try {
        const systemPrompt =
          lang === "it"
            ? `Sei AuraBot, l'assistente AI di Digital Aura, un'azienda italiana specializzata in soluzioni AI e sviluppo web.

SERVIZI:
- Automazione AI e chatbot intelligenti
- Sviluppo web moderno (React, Next.js)
- AI Marketing e campagne automatizzate
- Consulenza digitale personalizzata

PERSONALITÀ:
- Professionale ma amichevole
- Esperto in tecnologia
- Orientato alle soluzioni
- Sempre disponibile ad aiutare

ISTRUZIONI:
- Rispondi sempre in italiano
- Usa emoji per rendere le risposte più accattivanti
- Fornisci informazioni concrete sui servizi
- Incoraggia a prenotare una consulenza gratuita
- Se non sai qualcosa, indirizza al team

Rispondi in modo naturale e utile.`
            : `You are AuraBot, the AI assistant of Digital Aura, an Italian company specialized in AI solutions and web development.

SERVICES:
- AI Automation and intelligent chatbots
- Modern web development (React, Next.js)
- AI Marketing and automated campaigns
- Personalized digital consulting

PERSONALITY:
- Professional but friendly
- Technology expert
- Solution-oriented
- Always ready to help

INSTRUCTIONS:
- Always respond in English
- Use emojis to make responses more engaging
- Provide concrete information about services
- Encourage booking a free consultation
- If you don't know something, direct to the team

Respond naturally and helpfully.`

        const { text } = await generateText({
          model: google("gemini-1.5-flash", {
            apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
          }),
          system: systemPrompt,
          prompt: message,
          maxTokens: 500,
        })

        return NextResponse.json({
          success: true,
          message: text,
          supportActive: false,
          supportLevel: 0,
          context: {
            flow: "general",
            step: 1,
            hasUserInfo: false,
            needsHuman: false,
            escalationActive: false,
          },
        })
      } catch (aiError) {
        console.error("AI Error:", aiError)
        // Fall through to fallback response
      }
    }

    // Fallback response when AI is not available
    return NextResponse.json({
      success: true,
      message: responses[lang].fallback,
      supportActive: false,
      supportLevel: 0,
      context: {
        flow: "fallback",
        step: 1,
        hasUserInfo: false,
        needsHuman: false,
        escalationActive: false,
      },
    })
  } catch (error) {
    console.error("Chat API Error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Sorry, there was an error processing your message.",
      },
      { status: 500 },
    )
  }
}
