import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { createAppointment, type CreateAppointmentData } from "@/lib/database"
import { getSession, updateSession, createSession, type ChatSession } from "@/lib/session-manager"
import { handleSupportFlow, isBookingComplete } from "@/lib/support-flow"

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, language = "it" } = await request.json()

    // Get or create session
    let session: ChatSession
    if (sessionId) {
      session = (await getSession(sessionId)) || (await createSession(`session_${Date.now()}`))
    } else {
      session = await createSession(`session_${Date.now()}`)
    }

    // Handle support flow first (priority)
    const supportResponse = handleSupportFlow(message, session, language)
    if (supportResponse) {
      // Update session with support state
      await updateSession(session.session_id, {
        support_mode: true,
        last_activity: new Date().toISOString(),
      })

      return NextResponse.json({
        response: supportResponse.message,
        sessionId: session.session_id,
        supportMode: true,
        escalated: supportResponse.escalated || false,
      })
    }

    // Handle booking flow
    if (session.booking_mode) {
      const bookingResponse = await handleBookingFlow(message, session, language)
      if (bookingResponse) {
        return NextResponse.json(bookingResponse)
      }
    }

    // Check for booking intent
    const bookingKeywords = {
      it: ["prenota", "prenotare", "appuntamento", "consulenza", "incontro", "meeting"],
      en: ["book", "booking", "appointment", "consultation", "meeting", "schedule"],
    }

    const keywords = bookingKeywords[language as keyof typeof bookingKeywords] || bookingKeywords.it
    const hasBookingIntent = keywords.some((keyword) => message.toLowerCase().includes(keyword.toLowerCase()))

    if (hasBookingIntent) {
      // Start booking flow
      await updateSession(session.session_id, {
        booking_mode: true,
        flow_step: "service",
        last_activity: new Date().toISOString(),
      })

      const t = {
        it: {
          greeting: "🎯 Perfetto! Ti aiuto a prenotare una consulenza gratuita.",
          servicePrompt: "Quale servizio ti interessa?",
          services: [
            "🤖 AI Automation - Automatizza i processi aziendali",
            "💬 Chatbot Intelligenti - Assistenti virtuali 24/7",
            "🌐 Web Development - Siti web e e-commerce",
            "📈 AI Marketing - Campagne automatizzate",
          ],
        },
        en: {
          greeting: "🎯 Perfect! I'll help you book a free consultation.",
          servicePrompt: "Which service are you interested in?",
          services: [
            "🤖 AI Automation - Automate business processes",
            "💬 Intelligent Chatbots - 24/7 virtual assistants",
            "🌐 Web Development - Websites and e-commerce",
            "📈 AI Marketing - Automated campaigns",
          ],
        },
      }

      const currentT = t[language as keyof typeof t] || t.it
      const servicesText = currentT.services.join("\n")

      return NextResponse.json({
        response: `${currentT.greeting}\n\n${currentT.servicePrompt}\n\n${servicesText}`,
        sessionId: session.session_id,
        bookingFlow: true,
        step: "service",
      })
    }

    // Regular AI conversation with Gemini
    try {
      const systemPrompt =
        language === "en"
          ? `You are a helpful AI assistant for Digital Aura, an Italian company specializing in AI automation, chatbots, web development, and AI marketing. 

Key information about Digital Aura:
- We create intelligent chatbots and AI automation solutions
- We develop modern websites and e-commerce platforms  
- We offer AI-powered marketing campaigns
- We provide free consultations to discuss business needs
- We help businesses transform through AI technology

Guidelines:
- Be professional, helpful, and enthusiastic about AI solutions
- Keep responses concise and focused
- If users ask about services, briefly explain and suggest booking a consultation
- If users want to book, guide them to use booking keywords like "book appointment"
- Answer in English since the user is using English
- Don't mention technical details unless specifically asked`
          : `Sei un assistente AI per Digital Aura, un'azienda italiana specializzata in automazione AI, chatbot, sviluppo web e marketing AI.

Informazioni chiave su Digital Aura:
- Creiamo chatbot intelligenti e soluzioni di automazione AI
- Sviluppiamo siti web moderni e piattaforme e-commerce
- Offriamo campagne di marketing potenziate dall'AI  
- Forniamo consulenze gratuite per discutere le esigenze aziendali
- Aiutiamo le aziende a trasformarsi attraverso la tecnologia AI

Linee guida:
- Sii professionale, utile ed entusiasta delle soluzioni AI
- Mantieni le risposte concise e focalizzate
- Se gli utenti chiedono dei servizi, spiega brevemente e suggerisci di prenotare una consulenza
- Se gli utenti vogliono prenotare, guidali a usare parole chiave come "prenota appuntamento"
- Rispondi in italiano dato che l'utente sta usando l'italiano
- Non menzionare dettagli tecnici a meno che non vengano specificamente richiesti`

      const { text } = await generateText({
        model: google("gemini-1.5-flash"),
        system: systemPrompt,
        prompt: message,
        maxTokens: 300,
      })

      // Update session with conversation
      await updateSession(session.session_id, {
        last_activity: new Date().toISOString(),
      })

      return NextResponse.json({
        response: text,
        sessionId: session.session_id,
      })
    } catch (aiError) {
      console.error("AI Error:", aiError)

      // Fallback response when AI fails
      const fallbackResponse =
        language === "en"
          ? "I'm having trouble connecting right now. For immediate assistance, please contact us directly or try booking an appointment through our website."
          : "Sto avendo problemi di connessione. Per assistenza immediata, contattaci direttamente o prova a prenotare un appuntamento tramite il nostro sito."

      return NextResponse.json({
        response: fallbackResponse,
        sessionId: session.session_id,
        fallback: true,
      })
    }
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleBookingFlow(message: string, session: ChatSession, language: string) {
  const step = session.flow_step
  const bookingData = session.context || {}

  const t = {
    it: {
      serviceSelected: "Perfetto! Hai scelto:",
      datePrompt: "Ora dimmi la data che preferisci (es: 2025-01-16):",
      timePrompt: "Che orario preferisci? (es: 10:00, 14:30)\n\nOrari disponibili: 9:00-12:00 e 14:00-18:00",
      namePrompt: "Come ti chiami?",
      emailPrompt: "Qual è la tua email?",
      phonePrompt: "Qual è il tuo numero di telefono?",
      confirmPrompt:
        "Perfetto! Ecco il riepilogo della tua prenotazione:\n\n📋 **RIEPILOGO PRENOTAZIONE**\n\n🔹 **Servizio:** {service}\n🔹 **Data:** {date}\n🔹 **Orario:** {time}\n🔹 **Nome:** {name}\n🔹 **Email:** {email}\n🔹 **Telefono:** {phone}\n\n✅ Scrivi **CONFERMA** per completare la prenotazione\n❌ Scrivi **MODIFICA** per cambiare qualcosa",
      success:
        "🎉 **PRENOTAZIONE CONFERMATA!**\n\nLa tua consulenza è stata prenotata con successo!\n\n📧 Riceverai una email di conferma a breve\n📞 Ti contatteremo per confermare i dettagli\n\n✨ Grazie per aver scelto Digital Aura!",
      error:
        "❌ Si è verificato un errore nel salvare la prenotazione.\n\n📞 Contattaci direttamente:\n• Email: info@digitalaura.it\n• Telefono: +39 123 456 7890\n\nCi scusiamo per l'inconveniente!",
      invalidService:
        "Servizio non riconosciuto. Scegli tra:\n🤖 AI Automation\n💬 Chatbot\n🌐 Web Development\n📈 AI Marketing",
      invalidDate: "Formato data non valido. Usa il formato YYYY-MM-DD (es: 2025-01-16)",
      invalidTime: "Orario non valido. Usa il formato HH:MM (es: 10:00, 14:30)",
      invalidEmail: "Email non valida. Inserisci un indirizzo email corretto.",
      invalidPhone: "Numero di telefono non valido. Inserisci un numero valido.",
      modify:
        "Cosa vuoi modificare?\n\n1️⃣ Servizio\n2️⃣ Data\n3️⃣ Orario\n4️⃣ Nome\n5️⃣ Email\n6️⃣ Telefono\n\nScrivi il numero o il nome del campo da modificare.",
    },
    en: {
      serviceSelected: "Perfect! You chose:",
      datePrompt: "Now tell me your preferred date (e.g., 2025-01-16):",
      timePrompt: "What time do you prefer? (e.g., 10:00, 14:30)\n\nAvailable hours: 9:00-12:00 and 14:00-18:00",
      namePrompt: "What's your name?",
      emailPrompt: "What's your email?",
      phonePrompt: "What's your phone number?",
      confirmPrompt:
        "Perfect! Here's your booking summary:\n\n📋 **BOOKING SUMMARY**\n\n🔹 **Service:** {service}\n🔹 **Date:** {date}\n🔹 **Time:** {time}\n🔹 **Name:** {name}\n🔹 **Email:** {email}\n🔹 **Phone:** {phone}\n\n✅ Write **CONFIRM** to complete the booking\n❌ Write **MODIFY** to change something",
      success:
        "🎉 **BOOKING CONFIRMED!**\n\nYour consultation has been successfully booked!\n\n📧 You'll receive a confirmation email shortly\n📞 We'll contact you to confirm the details\n\n✨ Thank you for choosing Digital Aura!",
      error:
        "❌ An error occurred while saving the booking.\n\n📞 Contact us directly:\n• Email: info@digitalaura.it\n• Phone: +39 123 456 7890\n\nWe apologize for the inconvenience!",
      invalidService:
        "Service not recognized. Choose from:\n🤖 AI Automation\n💬 Chatbot\n🌐 Web Development\n📈 AI Marketing",
      invalidDate: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)",
      invalidTime: "Invalid time format. Use HH:MM format (e.g., 10:00, 14:30)",
      invalidEmail: "Invalid email. Please enter a correct email address.",
      invalidPhone: "Invalid phone number. Please enter a valid number.",
      modify:
        "What do you want to modify?\n\n1️⃣ Service\n2️⃣ Date\n3️⃣ Time\n4️⃣ Name\n5️⃣ Email\n6️⃣ Phone\n\nWrite the number or name of the field to modify.",
    },
  }

  const currentT = t[language as keyof typeof t] || t.it

  // Handle modification requests
  if (message.toLowerCase().includes("modifica") || message.toLowerCase().includes("modify")) {
    await updateSession(session.session_id, {
      flow_step: "modify",
      last_activity: new Date().toISOString(),
    })
    return { response: currentT.modify, sessionId: session.session_id, bookingFlow: true, step: "modify" }
  }

  // Handle confirmation
  if (message.toLowerCase().includes("conferma") || message.toLowerCase().includes("confirm")) {
    if (isBookingComplete(bookingData)) {
      try {
        // Prepare appointment data for database
        const appointmentData: CreateAppointmentData = {
          name: bookingData.name!,
          email: bookingData.email!,
          phone: bookingData.phone!,
          service: bookingData.service!,
          date: bookingData.date!,
          time: bookingData.time!,
          message: `Prenotazione via chatbot - Lingua: ${language}`,
          status: "pending",
          priority: false,
        }

        // Save appointment to database
        const newAppointment = await createAppointment(appointmentData)

        if (newAppointment) {
          // Clear booking flow
          await updateSession(session.session_id, {
            booking_mode: false,
            flow_step: undefined,
            context: {},
            last_activity: new Date().toISOString(),
          })

          return {
            response: currentT.success,
            sessionId: session.session_id,
            bookingFlow: false,
            bookingComplete: true,
          }
        } else {
          return { response: currentT.error, sessionId: session.session_id, bookingFlow: true, step: "error" }
        }
      } catch (error) {
        console.error("❌ Error saving appointment:", error)
        return { response: currentT.error, sessionId: session.session_id, bookingFlow: true, step: "error" }
      }
    }
  }

  // Process booking steps
  switch (step) {
    case "service":
      const serviceMap = {
        "ai automation": "ai-automation",
        automation: "ai-automation",
        automazione: "ai-automation",
        chatbot: "chatbot",
        bot: "chatbot",
        "web development": "web-development",
        web: "web-development",
        sito: "web-development",
        website: "web-development",
        "ai marketing": "ai-marketing",
        marketing: "ai-marketing",
      }

      const service = serviceMap[message.toLowerCase() as keyof typeof serviceMap]
      if (service) {
        const newBookingData = { ...bookingData, service }
        await updateSession(session.session_id, {
          flow_step: "date",
          context: newBookingData,
          last_activity: new Date().toISOString(),
        })
        return {
          response: `${currentT.serviceSelected} **${message}**\n\n${currentT.datePrompt}`,
          sessionId: session.session_id,
          bookingFlow: true,
          step: "date",
        }
      } else {
        return { response: currentT.invalidService, sessionId: session.session_id, bookingFlow: true, step: "service" }
      }

    case "date":
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (dateRegex.test(message.trim())) {
        const newBookingData = { ...bookingData, date: message.trim() }
        await updateSession(session.session_id, {
          flow_step: "time",
          context: newBookingData,
          last_activity: new Date().toISOString(),
        })
        return { response: currentT.timePrompt, sessionId: session.session_id, bookingFlow: true, step: "time" }
      } else {
        return { response: currentT.invalidDate, sessionId: session.session_id, bookingFlow: true, step: "date" }
      }

    case "time":
      const timeRegex = /^\d{1,2}:\d{2}$/
      if (timeRegex.test(message.trim())) {
        const newBookingData = { ...bookingData, time: message.trim() }
        await updateSession(session.session_id, {
          flow_step: "name",
          context: newBookingData,
          last_activity: new Date().toISOString(),
        })
        return { response: currentT.namePrompt, sessionId: session.session_id, bookingFlow: true, step: "name" }
      } else {
        return { response: currentT.invalidTime, sessionId: session.session_id, bookingFlow: true, step: "time" }
      }

    case "name":
      if (message.trim().length >= 2) {
        const newBookingData = { ...bookingData, name: message.trim() }
        await updateSession(session.session_id, {
          flow_step: "email",
          context: newBookingData,
          last_activity: new Date().toISOString(),
        })
        return { response: currentT.emailPrompt, sessionId: session.session_id, bookingFlow: true, step: "email" }
      } else {
        return { response: currentT.namePrompt, sessionId: session.session_id, bookingFlow: true, step: "name" }
      }

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(message.trim())) {
        const newBookingData = { ...bookingData, email: message.trim() }
        await updateSession(session.session_id, {
          flow_step: "phone",
          context: newBookingData,
          last_activity: new Date().toISOString(),
        })
        return { response: currentT.phonePrompt, sessionId: session.session_id, bookingFlow: true, step: "phone" }
      } else {
        return { response: currentT.invalidEmail, sessionId: session.session_id, bookingFlow: true, step: "email" }
      }

    case "phone":
      const phoneRegex = /^[+]?[0-9\s\-()]{8,}$/
      if (phoneRegex.test(message.trim())) {
        const newBookingData = { ...bookingData, phone: message.trim() }
        await updateSession(session.session_id, {
          flow_step: "confirm",
          context: newBookingData,
          last_activity: new Date().toISOString(),
        })

        const confirmMessage = currentT.confirmPrompt
          .replace("{service}", newBookingData.service || "")
          .replace("{date}", newBookingData.date || "")
          .replace("{time}", newBookingData.time || "")
          .replace("{name}", newBookingData.name || "")
          .replace("{email}", newBookingData.email || "")
          .replace("{phone}", newBookingData.phone || "")

        return { response: confirmMessage, sessionId: session.session_id, bookingFlow: true, step: "confirm" }
      } else {
        return { response: currentT.invalidPhone, sessionId: session.session_id, bookingFlow: true, step: "phone" }
      }

    default:
      return null
  }
}
