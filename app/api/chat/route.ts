import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { createAppointment, type CreateAppointmentData } from "@/lib/database"
import { SessionManager } from "@/lib/session-manager"
import { SupportFlow } from "@/lib/support-flow"

// --- Inizializzazione dei gestori ---
// Queste istanze vengono create una sola volta quando il server parte.
const sessionManager = new SessionManager()
const supportFlow = new SupportFlow()

// --- Configurazione del modello AI ---
// Utilizziamo l'SDK 'ai' che semplifica la gestione.
const model = google("gemini-1.5-flash")

// --- Funzione Principale che gestisce le richieste POST ---
export async function POST(request: NextRequest) {
  try {
    // 🔹 1. Controllo preliminare della chiave API all'avvio della richiesta
    // Se la chiave non è impostata, l'errore sarà chiaro e immediato.
    if (!process.env.GOOGLE_API_KEY) {
      console.error("❌ ERRORE FATALE: La variabile d'ambiente GOOGLE_API_KEY non è impostata.")
      return NextResponse.json({ error: "Server configuration error: Missing Google API key" }, { status: 500 })
    }

    const { message, sessionId, language = "it" } = await request.json()

    // 🔹 2. Validazione dell'input ricevuto dal client
    if (!message || typeof message !== "string" || !sessionId) {
        console.warn("⚠️ Richiesta non valida: mancano 'message' o 'sessionId'.", { message, sessionId })
        return NextResponse.json({ error: "Richiesta non valida: 'message' e 'sessionId' sono obbligatori." }, { status: 400 });
    }

    console.log(`📨 Messaggio ricevuto: "${message}" (Sessione: ${sessionId}, Lingua: ${language})`)

    // Get or create session
    let session = await sessionManager.getSession(sessionId)
    if (!session) {
      session = await sessionManager.createSession(sessionId, language)
    }

    // Update session language if changed
    if (session.language !== language) {
      session = await sessionManager.updateSessionLanguage(sessionId, language)
    }

    // Translations
    const translations = {
      it: {
        greeting: "👋 Ciao! Sono l'assistente AI di Digital Aura. Come posso aiutarti oggi?",
        services: "🔧 Servizi",
        support: "🆘 Supporto",
        booking: "📅 Prenota",
        info: "ℹ️ Info",
        selectService: "Perfetto! Quale servizio ti interessa di più?",
        aiAutomation: "🤖 AI Automation",
        chatbot: "💬 Chatbot Intelligenti",
        webDevelopment: "🌐 Web Development",
        aiMarketing: "📈 AI Marketing",
        bookingStart: "Ottimo! Ti aiuto a prenotare una consulenza gratuita. Per iniziare, come ti chiami?",
        askEmail: "Perfetto! Qual è la tua email?",
        askPhone: "Ottimo! Qual è il tuo numero di telefono?",
        askDate: "Perfetto! Quale data preferisci per la consulenza? (formato: YYYY-MM-DD, es: 2025-01-20)",
        askTime:
          "Ottimo! Che orario preferisci? I nostri orari sono: 9:00-12:00 e 14:00-18:00 (formato: HH:MM, es: 10:30)",
        confirmBooking:
          "Perfetto! Ecco il riepilogo della tua prenotazione:\n\n📋 **RIEPILOGO CONSULENZA**\n👤 **Nome:** {name}\n📧 **Email:** {email}\n📱 **Telefono:** {phone}\n🔧 **Servizio:** {service}\n📅 **Data:** {date}\n🕐 **Orario:** {time}\n\nTutto corretto? Scrivi 'CONFERMA' per completare la prenotazione.",
        bookingSuccess:
          "🎉 **PRENOTAZIONE CONFERMATA!**\n\nLa tua consulenza gratuita è stata prenotata con successo!\n\n📋 **Dettagli:**\n📅 Data: {date}\n🕐 Orario: {time}\n🔧 Servizio: {service}\n\n✅ Riceverai una email di conferma a breve\n📞 Ti contatteremo il giorno prima per confermare\n\nGrazie per aver scelto Digital Aura! 🚀",
        bookingError:
          "❌ Si è verificato un errore durante il salvataggio della prenotazione.\n\n📞 **Contattaci direttamente:**\n📧 Email: info@digitalaura.it\n📱 WhatsApp: +39 333 1234567\n\nCi scusiamo per l'inconveniente!",
        invalidEmail: "❌ L'email inserita non è valida. Inserisci un'email corretta (es: mario@esempio.com)",
        invalidPhone: "❌ Il numero di telefono non è valido. Inserisci un numero corretto (es: +39 333 1234567)",
        invalidDate: "❌ La data non è valida. Usa il formato YYYY-MM-DD (es: 2025-01-20)",
        invalidTime: "❌ L'orario non è valido. Usa il formato HH:MM negli orari 9:00-12:00 o 14:00-18:00 (es: 10:30)",
        supportActivated:
          "🔴 **SUPPORTO TECNICO ATTIVATO**\n\nHo rilevato che hai un problema tecnico. Il nostro team di supporto è qui per aiutarti!\n\n🛠️ **Cosa posso fare per te:**\n• Risolvere problemi tecnici\n• Assistenza con i nostri servizi\n• Supporto per il sito web\n• Aiuto con prenotazioni\n\n📝 Descrivi il tuo problema e ti aiuterò subito!",
        escalateToHuman:
          "🔄 **ESCALATION AL SUPPORTO UMANO**\n\nVedo che il problema persiste. Ti sto trasferendo al nostro team di supporto umano.\n\n📞 **Contatti diretti:**\n📧 Email: supporto@digitalaura.it\n📱 WhatsApp: +39 333 1234567\n🕐 Orari: Lun-Ven 9:00-18:00\n\nUn nostro operatore ti contatterà entro 30 minuti!",
        backToMenu: "🏠 Torna al Menu Principale",
      },
      en: {
        greeting: "👋 Hello! I'm Digital Aura's AI assistant. How can I help you today?",
        services: "🔧 Services",
        support: "🆘 Support",
        booking: "📅 Book",
        info: "ℹ️ Info",
        selectService: "Perfect! Which service interests you most?",
        aiAutomation: "🤖 AI Automation",
        chatbot: "💬 Intelligent Chatbots",
        webDevelopment: "🌐 Web Development",
        aiMarketing: "📈 AI Marketing",
        bookingStart: "Great! I'll help you book a free consultation. To start, what's your name?",
        askEmail: "Perfect! What's your email?",
        askPhone: "Great! What's your phone number?",
        askDate: "Perfect! What date do you prefer for the consultation? (format: YYYY-MM-DD, e.g: 2025-01-20)",
        askTime:
          "Great! What time do you prefer? Our hours are: 9:00-12:00 and 14:00-18:00 (format: HH:MM, e.g: 10:30)",
        confirmBooking:
          "Perfect! Here's your booking summary:\n\n📋 **CONSULTATION SUMMARY**\n👤 **Name:** {name}\n📧 **Email:** {email}\n📱 **Phone:** {phone}\n🔧 **Service:** {service}\n📅 **Date:** {date}\n🕐 **Time:** {time}\n\nIs everything correct? Write 'CONFIRM' to complete the booking.",
        bookingSuccess:
          "🎉 **BOOKING CONFIRMED!**\n\nYour free consultation has been successfully booked!\n\n📋 **Details:**\n📅 Date: {date}\n🕐 Time: {time}\n🔧 Service: {service}\n\n✅ You'll receive a confirmation email shortly\n📞 We'll contact you the day before to confirm\n\nThank you for choosing Digital Aura! 🚀",
        bookingError:
          "❌ An error occurred while saving the booking.\n\n📞 **Contact us directly:**\n📧 Email: info@digitalaura.it\n📱 WhatsApp: +39 333 1234567\n\nWe apologize for the inconvenience!",
        invalidEmail: "❌ The email entered is not valid. Enter a correct email (e.g: mario@example.com)",
        invalidPhone: "❌ The phone number is not valid. Enter a correct number (e.g: +39 333 1234567)",
        invalidDate: "❌ The date is not valid. Use format YYYY-MM-DD (e.g: 2025-01-20)",
        invalidTime: "❌ The time is not valid. Use format HH:MM in hours 9:00-12:00 or 14:00-18:00 (e.g: 10:30)",
        supportActivated:
          "🔴 **TECHNICAL SUPPORT ACTIVATED**\n\nI detected you have a technical problem. Our support team is here to help!\n\n🛠️ **What I can do for you:**\n• Solve technical problems\n• Assistance with our services\n• Website support\n• Help with bookings\n\n📝 Describe your problem and I'll help you right away!",
        escalateToHuman:
          "🔄 **ESCALATION TO HUMAN SUPPORT**\n\nI see the problem persists. I'm transferring you to our human support team.\n\n📞 **Direct contacts:**\n📧 Email: support@digitalaura.it\n📱 WhatsApp: +39 333 1234567\n🕐 Hours: Mon-Fri 9:00-18:00\n\nOne of our operators will contact you within 30 minutes!",
        backToMenu: "🏠 Back to Main Menu",
      },
    }

    const t = translations[language as keyof typeof translations] || translations.it

    // Check for support keywords
    const supportKeywords = {
      it: ["problema", "errore", "bug", "non funziona", "aiuto", "supporto", "assistenza"],
      en: ["problem", "error", "bug", "not working", "help", "support", "assistance"],
    }

    const currentKeywords = supportKeywords[language as keyof typeof supportKeywords] || supportKeywords.it
    const hasSupportKeyword = currentKeywords.some((keyword) => message.toLowerCase().includes(keyword))

    // Handle support flow
    if (hasSupportKeyword || session.context === "support") {
      const supportResponse = await supportFlow.handleSupportMessage(sessionId, message, language)
      if (supportResponse) {
        return NextResponse.json({
          response: supportResponse,
          quickActions: [{ text: t.backToMenu, action: "back_to_menu" }],
        })
      }
    }

    // Handle booking flow
    if (session.context === "booking") {
      return await handleBookingFlow(session, message, t, sessionId)
    }

    // Handle quick actions and menu navigation
    if (message === "back_to_menu" || message.toLowerCase().includes("menu")) {
      await sessionManager.updateSession(sessionId, { context: "general", data: {} })
      return NextResponse.json({
        response: t.greeting,
        quickActions: [
          { text: t.services, action: "services" },
          { text: t.support, action: "support" },
          { text: t.booking, action: "booking" },
          { text: t.info, action: "info" },
        ],
      })
    }

    // Handle service selection
    if (message === "services") {
      await sessionManager.updateSession(sessionId, { context: "services" })
      return NextResponse.json({
        response: t.selectService,
        quickActions: [
          { text: t.aiAutomation, action: "ai-automation" },
          { text: t.chatbot, action: "chatbot" },
          { text: t.webDevelopment, action: "web-development" },
          { text: t.aiMarketing, action: "ai-marketing" },
        ],
      })
    }

    // Handle booking initiation
    if (
      message === "booking" ||
      message.toLowerCase().includes("prenotare") ||
      message.toLowerCase().includes("book")
    ) {
      await sessionManager.updateSession(sessionId, {
        context: "booking",
        data: { step: "name" },
      })
      return NextResponse.json({
        response: t.bookingStart,
        quickActions: [],
      })
    }

    // Handle support activation
    if (message === "support" || hasSupportKeyword) {
      await sessionManager.updateSession(sessionId, { context: "support" })
      return NextResponse.json({
        response: t.supportActivated,
        quickActions: [{ text: t.backToMenu, action: "back_to_menu" }],
      })
    }

    // Default: Use Gemini AI for general conversation
    try {
      const { text } = await generateText({
        model,
        system: `You are a helpful AI assistant for Digital Aura, an Italian company specializing in AI solutions, web development, chatbots, and digital marketing. 
        
        Respond in ${language === "en" ? "English" : "Italian"}.
        
        Keep responses concise and helpful. If users ask about services, guide them to use the quick action buttons.
        
        Company services:
        - AI Automation: Intelligent business process automation
        - Chatbots: 24/7 virtual assistants
        - Web Development: Modern websites and e-commerce
        - AI Marketing: Automated and personalized campaigns
        
        Always be professional, friendly, and helpful.`,
        prompt: message,
      })

      return NextResponse.json({
        response: text,
        quickActions: [
          { text: t.services, action: "services" },
          { text: t.booking, action: "booking" },
          { text: t.support, action: "support" },
        ],
      })
    } catch (aiError: any) {
      console.error("❌ Gemini AI Error:", aiError)

      // Fallback response when AI fails
      const fallbackResponse =
        language === "en"
          ? "I'm here to help! Use the buttons below to explore our services or book a consultation."
          : "Sono qui per aiutarti! Usa i pulsanti qui sotto per esplorare i nostri servizi o prenotare una consulenza."

      return NextResponse.json({
        response: fallbackResponse,
        quickActions: [
          { text: t.services, action: "services" },
          { text: t.booking, action: "booking" },
          { text: t.support, action: "support" },
        ],
      })
    }
  } catch (error: any) {
    // 🔹 3. Gestione centralizzata degli errori
    // Qualsiasi errore nel codice sopra finirà qui.
    // Lo stampiamo nel log del server per un debug facile e veloce.
    console.error("❌ ERRORE CRITICO NELL'API CHAT:", error);

    // Invia una risposta generica al client per non mostrare dettagli sensibili.
    return NextResponse.json(
        { 
            error: "Si è verificato un errore interno nel server.",
            // Aggiungiamo dettagli solo se siamo in ambiente di sviluppo
            details: process.env.NODE_ENV === "development" ? error.message : undefined
        }, 
        { status: 500 }
    );
  }
}

async function handleBookingFlow(session: any, message: string, t: any, sessionId: string) {
  const step = session.data?.step
  const data = session.data || {}

  switch (step) {
    case "name":
      if (message.trim().length < 2) {
        return NextResponse.json({
          response: "❌ Il nome deve essere di almeno 2 caratteri. Come ti chiami?",
          quickActions: [],
        })
      }

      await sessionManager.updateSession(sessionId, {
        context: "booking",
        data: { ...data, step: "email", name: message.trim() },
      })

      return NextResponse.json({
        response: t.askEmail,
        quickActions: [],
      })

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(message.trim())) {
        return NextResponse.json({
          response: t.invalidEmail,
          quickActions: [],
        })
      }

      await sessionManager.updateSession(sessionId, {
        context: "booking",
        data: { ...data, step: "phone", email: message.trim() },
      })

      return NextResponse.json({
        response: t.askPhone,
        quickActions: [],
      })

    case "phone":
      const phoneRegex = /^[+]?[0-9\s\-()]{8,}$/
      if (!phoneRegex.test(message.trim())) {
        return NextResponse.json({
          response: t.invalidPhone,
          quickActions: [],
        })
      }

      await sessionManager.updateSession(sessionId, {
        context: "booking",
        data: { ...data, step: "service", phone: message.trim() },
      })

      return NextResponse.json({
        response: "Perfetto! Quale servizio ti interessa?",
        quickActions: [
          { text: "🤖 AI Automation", action: "service:ai-automation" },
          { text: "💬 Chatbot", action: "service:chatbot" },
          { text: "🌐 Web Development", action: "service:web-development" },
          { text: "📈 AI Marketing", action: "service:ai-marketing" },
        ],
      })

    case "service":
      let service = ""
      if (message.startsWith("service:")) {
        service = message.replace("service:", "")
      } else {
        // Try to match service from text
        const serviceMap: { [key: string]: string } = {
          "ai-automation": "AI Automation",
          chatbot: "Chatbot Intelligenti",
          "web-development": "Web Development",
          "ai-marketing": "AI Marketing",
        }

        for (const [key, value] of Object.entries(serviceMap)) {
          if (
            message.toLowerCase().includes(key.replace("-", "")) ||
            message.toLowerCase().includes(value.toLowerCase())
          ) {
            service = key
            break
          }
        }
      }

      if (!service) {
        return NextResponse.json({
          response: "❌ Seleziona un servizio valido usando i pulsanti.",
          quickActions: [
            { text: "🤖 AI Automation", action: "service:ai-automation" },
            { text: "💬 Chatbot", action: "service:chatbot" },
            { text: "🌐 Web Development", action: "service:web-development" },
            { text: "📈 AI Marketing", action: "service:ai-marketing" },
          ],
        })
      }

      await sessionManager.updateSession(sessionId, {
        context: "booking",
        data: { ...data, step: "date", service },
      })

      return NextResponse.json({
        response: t.askDate,
        quickActions: [],
      })

    case "date":
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(message.trim())) {
        return NextResponse.json({
          response: t.invalidDate,
          quickActions: [],
        })
      }

      const selectedDate = new Date(message.trim())
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        return NextResponse.json({
          response: "❌ Non puoi prenotare per una data passata. Scegli una data futura.",
          quickActions: [],
        })
      }

      await sessionManager.updateSession(sessionId, {
        context: "booking",
        data: { ...data, step: "time", date: message.trim() },
      })

      return NextResponse.json({
        response: t.askTime,
        quickActions: [
          { text: "09:00", action: "time:09:00" },
          { text: "10:30", action: "time:10:30" },
          { text: "14:00", action: "time:14:00" },
          { text: "16:30", action: "time:16:30" },
        ],
      })

    case "time":
      let time = ""
      if (message.startsWith("time:")) {
        time = message.replace("time:", "")
      } else {
        time = message.trim()
      }

      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
      if (!timeRegex.test(time)) {
        return NextResponse.json({
          response: t.invalidTime,
          quickActions: [
            { text: "09:00", action: "time:09:00" },
            { text: "10:30", action: "time:10:30" },
            { text: "14:00", action: "time:14:00" },
            { text: "16:30", action: "time:16:30" },
          ],
        })
      }

      const [hours, minutes] = time.split(":").map(Number)
      const isValidBusinessHour =
        (hours >= 9 && hours < 12) ||
        (hours >= 14 && hours < 18) ||
        (hours === 12 && minutes === 0) ||
        (hours === 18 && minutes === 0)

      if (!isValidBusinessHour) {
        return NextResponse.json({
          response: t.invalidTime,
          quickActions: [
            { text: "09:00", action: "time:09:00" },
            { text: "10:30", action: "time:10:30" },
            { text: "14:00", action: "time:14:00" },
            { text: "16:30", action: "time:16:30" },
          ],
        })
      }

      await sessionManager.updateSession(sessionId, {
        context: "booking",
        data: { ...data, step: "confirm", time },
      })

      const serviceNames = {
        "ai-automation": "AI Automation",
        chatbot: "Chatbot Intelligenti",
        "web-development": "Web Development",
        "ai-marketing": "AI Marketing",
      }

      const confirmMessage = t.confirmBooking
        .replace("{name}", data.name)
        .replace("{email}", data.email)
        .replace("{phone}", data.phone)
        .replace("{service}", serviceNames[data.service as keyof typeof serviceNames] || data.service)
        .replace("{date}", data.date)
        .replace("{time}", time)

      return NextResponse.json({
        response: confirmMessage,
        quickActions: [
          { text: "✅ CONFERMA", action: "confirm_booking" },
          { text: "❌ Annulla", action: "back_to_menu" },
        ],
      })

    case "confirm":
      if (message === "confirm_booking" || message.toUpperCase().includes("CONFERMA")) {
        // Save appointment to database
        try {
          const serviceNames = {
            "ai-automation": "AI Automation",
            chatbot: "Chatbot Intelligenti",
            "web-development": "Web Development",
            "ai-marketing": "AI Marketing",
          }

          const appointmentData: CreateAppointmentData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service,
            date: data.date,
            time: data.time,
            message: `Prenotazione via chatbot - Sessione: ${sessionId}`,
            status: "pending",
            priority: false,
          }

          console.log("💾 Saving appointment:", appointmentData)

          const newAppointment = await createAppointment(appointmentData)

          console.log("✅ Appointment saved successfully:", newAppointment)

          // Reset session
          await sessionManager.updateSession(sessionId, { context: "general", data: {} })

          const successMessage = t.bookingSuccess
            .replace("{date}", data.date)
            .replace("{time}", data.time)
            .replace("{service}", serviceNames[data.service as keyof typeof serviceNames] || data.service)

          return NextResponse.json({
            response: successMessage,
            quickActions: [{ text: t.backToMenu, action: "back_to_menu" }],
          })
        } catch (error) {
          console.error("❌ Error saving appointment:", error)

          // Reset session on error
          await sessionManager.updateSession(sessionId, { context: "general", data: {} })

          return NextResponse.json({
            response: t.bookingError,
            quickActions: [{ text: t.backToMenu, action: "back_to_menu" }],
          })
        }
      } else {
        return NextResponse.json({
          response: "❌ Per confermare scrivi 'CONFERMA' o usa il pulsante.",
          quickActions: [
            { text: "✅ CONFERMA", action: "confirm_booking" },
            { text: "❌ Annulla", action: "back_to_menu" },
          ],
        })
      }

    default:
      await sessionManager.updateSession(sessionId, { context: "general", data: {} })
      return NextResponse.json({
        response: t.greeting,
        quickActions: [
          { text: t.services, action: "services" },
          { text: t.support, action: "support" },
          { text: t.booking, action: "booking" },
          { text: t.info, action: "info" },
        ],
      })
  }
}
