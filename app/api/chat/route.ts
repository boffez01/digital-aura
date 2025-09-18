import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

// Configurazione del modello AI
const model = google("gemini-1.5-flash")

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, sessionId, language = "it" } = body

    console.log("📨 Received:", { message, sessionId, language })

    // Validazione input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        {
          response: "Messaggio non valido",
        },
        { status: 400 },
      )
    }

    const lowerMessage = message.toLowerCase()

    // Risposte per parole chiave di supporto
    const supportKeywords = [
      "problema",
      "errore",
      "bug",
      "aiuto",
      "supporto",
      "assistenza",
      "problem",
      "error",
      "help",
      "support",
    ]
    if (supportKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return NextResponse.json({
        response:
          "🔴 **SUPPORTO TECNICO ATTIVATO**\n\nHo rilevato che hai un problema tecnico. Il nostro team di supporto è qui per aiutarti!\n\n🛠️ **Cosa posso fare per te:**\n• Risolvere problemi tecnici\n• Assistenza con i nostri servizi\n• Supporto per il sito web\n• Aiuto con prenotazioni\n\n📝 Descrivi il tuo problema e ti aiuterò subito!",
        supportActive: true,
        supportLevel: 1,
      })
    }

    // Risposte per parole chiave di prenotazione
    const bookingKeywords = [
      "prenota",
      "prenotare",
      "appuntamento",
      "consulenza",
      "book",
      "booking",
      "appointment",
      "consultation",
    ]
    if (bookingKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return NextResponse.json({
        response:
          "🎯 **PERFETTO! PRENOTIAMO LA TUA CONSULENZA GRATUITA**\n\nQuale servizio ti interessa?\n\n🤖 **AI Automation** - Automatizza i processi aziendali\n💬 **Chatbot Intelligenti** - Assistenti virtuali 24/7\n🌐 **Web Development** - Siti web e e-commerce moderni\n📈 **AI Marketing** - Campagne automatizzate e personalizzate\n\n📞 **Contattaci direttamente:**\n📧 Email: info@digitalaura.it\n📱 WhatsApp: +39 333 1234567",
        context: {
          bookingMode: true,
        },
      })
    }

    // Risposte per parole chiave servizi
    const serviceKeywords = ["servizi", "services", "cosa fate", "what do you do"]
    if (serviceKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return NextResponse.json({
        response:
          "🔧 **I NOSTRI SERVIZI DIGITALI**\n\n🤖 **AI Automation**\n• Automazione processi aziendali\n• Integrazione sistemi intelligenti\n• Ottimizzazione workflow\n\n💬 **Chatbot Intelligenti**\n• Assistenti virtuali 24/7\n• Supporto clienti automatizzato\n• Lead generation automatica\n\n🌐 **Web Development**\n• Siti web moderni e responsive\n• E-commerce avanzati\n• Applicazioni web personalizzate\n\n📈 **AI Marketing**\n• Campagne automatizzate\n• Analisi predittiva\n• Personalizzazione contenuti\n\n📅 **Vuoi saperne di più? Prenota una consulenza gratuita!**",
      })
    }

    // Saluti
    const greetingKeywords = ["ciao", "salve", "buongiorno", "buonasera", "hello", "hi"]
    if (greetingKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return NextResponse.json({
        response:
          "👋 **Ciao! Sono AuraBot, l'assistente AI di Digital Aura!**\n\nSono qui per aiutarti con:\n\n🤖 **Servizi AI** - Automazione e chatbot intelligenti\n🌐 **Sviluppo Web** - Siti moderni e e-commerce\n📊 **AI Marketing** - Campagne automatizzate\n📅 **Prenotazioni** - Consulenze gratuite\n\n**Come posso aiutarti oggi?** 😊",
      })
    }

    // Prova con AI Gemini
    try {
      const systemPrompt =
        language === "en"
          ? `You are AuraBot, Digital Aura's helpful AI assistant. Digital Aura is an Italian company specializing in AI automation, intelligent chatbots, web development, and AI marketing.

Keep responses concise, helpful, and professional. Always respond in English since the user is using English.

Our services:
- AI Automation: Business process automation
- Intelligent Chatbots: 24/7 virtual assistants  
- Web Development: Modern websites and e-commerce
- AI Marketing: Automated campaigns

If users ask about services, briefly explain and suggest booking a free consultation.`
          : `Sei AuraBot, l'assistente AI di Digital Aura. Digital Aura è un'azienda italiana specializzata in automazione AI, chatbot intelligenti, sviluppo web e marketing AI.

Mantieni le risposte concise, utili e professionali. Rispondi sempre in italiano.

I nostri servizi:
- Automazione AI: Automazione processi aziendali
- Chatbot Intelligenti: Assistenti virtuali 24/7
- Sviluppo Web: Siti web moderni e e-commerce  
- Marketing AI: Campagne automatizzate

Se gli utenti chiedono dei servizi, spiega brevemente e suggerisci di prenotare una consulenza gratuita.`

      const { text } = await generateText({
        model,
        system: systemPrompt,
        prompt: message,
        maxTokens: 200,
      })

      return NextResponse.json({
        response: text,
      })
    } catch (aiError) {
      console.error("AI Error:", aiError)

      // Risposta di fallback
      return NextResponse.json({
        response:
          language === "en"
            ? "I'm here to help! I can assist you with AI automation, chatbots, web development, and AI marketing. What would you like to know?"
            : "Sono qui per aiutarti! Posso assisterti con automazione AI, chatbot, sviluppo web e marketing AI. Cosa vorresti sapere?",
      })
    }
  } catch (error) {
    console.error("❌ Chat API Error:", error)

    return NextResponse.json(
      {
        response: "Mi dispiace, si è verificato un errore tecnico. Riprova tra poco.",
      },
      { status: 500 },
    )
  }
}
