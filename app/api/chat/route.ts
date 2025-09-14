import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

// Simple in-memory session storage for demo
const sessions = new Map<string, any>()

// Bilingual responses
const responses = {
  it: {
    greeting: "👋 Ciao! Sono AuraBot, l'assistente AI di Digital Aura. Come posso aiutarti oggi?",
    services: `🚀 **I NOSTRI SERVIZI DIGITALI**

🤖 **AI AUTOMATION**
- Automazione processi aziendali
- Chatbot intelligenti 24/7
- Integrazione sistemi esistenti

🌐 **WEB DEVELOPMENT** 
- Siti web moderni e responsive
- E-commerce personalizzati
- Applicazioni web avanzate

📊 **AI MARKETING**
- Campagne automatizzate
- Analisi predittiva clienti
- Personalizzazione contenuti

💡 **Vuoi saperne di più su un servizio specifico?**
📅 **Oppure prenota una consulenza gratuita!**`,

    booking: `📅 **PRENOTAZIONE CONSULENZA GRATUITA**

Perfetto! Ti aiuto a prenotare una consulenza gratuita.

**🎯 SERVIZI DISPONIBILI:**

1️⃣ **AI Automation** - Automazione processi aziendali
2️⃣ **Chatbot Intelligenti** - Assistenti virtuali 24/7
3️⃣ **Web Development** - Siti web e e-commerce
4️⃣ **AI Marketing** - Campagne automatizzate

**Per quale servizio vuoi prenotare?**
Scrivi il numero (1, 2, 3, 4) o il nome del servizio.`,

    support: `🔧 **Supporto Tecnico Attivato**

Sto analizzando il tuo problema. Puoi descrivermi:

❓ Che tipo di problema stai riscontrando?
🖥️ Su quale dispositivo/browser?
⏰ Quando è iniziato il problema?

Sono qui per aiutarti a risolverlo!`,

    faq: `❓ **DOMANDE FREQUENTI**

💰 **Quanto costano i vostri servizi?**
I prezzi variano in base alle esigenze. Offriamo consulenze gratuite per valutare il progetto.

⏱️ **Quanto tempo serve per un progetto?**
- Chatbot: 1-2 settimane
- Sito web: 2-4 settimane  
- Automazione: 2-6 settimane

🔧 **Offrite supporto post-vendita?**
Sì, supporto tecnico e manutenzione inclusi.

📞 **Come posso contattarvi?**
- Email: info@digitalaura.it
- Telefono: +39 02 1234567
- Oppure prenota una consulenza qui!`,
  },
  en: {
    greeting: "👋 Hello! I'm AuraBot, Digital Aura's AI assistant. How can I help you today?",
    services: `🚀 **OUR DIGITAL SERVICES**

🤖 **AI AUTOMATION**
- Business process automation
- 24/7 intelligent chatbots
- Existing systems integration

🌐 **WEB DEVELOPMENT** 
- Modern responsive websites
- Custom e-commerce solutions
- Advanced web applications

📊 **AI MARKETING**
- Automated campaigns
- Predictive customer analysis
- Content personalization

💡 **Want to know more about a specific service?**
📅 **Or book a free consultation!**`,

    booking: `📅 **FREE CONSULTATION BOOKING**

Perfect! I'll help you book a free consultation.

**🎯 AVAILABLE SERVICES:**

1️⃣ **AI Automation** - Business process automation
2️⃣ **Intelligent Chatbots** - 24/7 virtual assistants
3️⃣ **Web Development** - Websites and e-commerce
4️⃣ **AI Marketing** - Automated campaigns

**Which service do you want to book for?**
Write the number (1, 2, 3, 4) or service name.`,

    support: `🔧 **Technical Support Activated**

I'm analyzing your problem. Can you describe:

❓ What type of problem are you experiencing?
🖥️ On which device/browser?
⏰ When did the problem start?

I'm here to help you solve it!`,

    faq: `❓ **FREQUENTLY ASKED QUESTIONS**

💰 **How much do your services cost?**
Prices vary based on needs. We offer free consultations to evaluate projects.

⏱️ **How long does a project take?**
- Chatbot: 1-2 weeks
- Website: 2-4 weeks  
- Automation: 2-6 weeks

🔧 **Do you offer post-sale support?**
Yes, technical support and maintenance included.

📞 **How can I contact you?**
- Email: info@digitalaura.it
- Phone: +39 02 1234567
- Or book a consultation here!`,
  },
}

// Intent detection
function detectIntent(message: string, language: "it" | "en"): string | null {
  const lowerMessage = message.toLowerCase()

  // Greeting
  if (
    lowerMessage.includes("ciao") ||
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("salve")
  ) {
    return "greeting"
  }

  // Services
  if (
    lowerMessage.includes("servizi") ||
    lowerMessage.includes("services") ||
    lowerMessage.includes("cosa fate") ||
    lowerMessage.includes("what do you do")
  ) {
    return "services"
  }

  // Booking
  if (
    lowerMessage.includes("prenota") ||
    lowerMessage.includes("book") ||
    lowerMessage.includes("appuntamento") ||
    lowerMessage.includes("appointment") ||
    lowerMessage.includes("consulenza") ||
    lowerMessage.includes("consultation")
  ) {
    return "booking"
  }

  // Support
  if (
    lowerMessage.includes("problema") ||
    lowerMessage.includes("problem") ||
    lowerMessage.includes("aiuto") ||
    lowerMessage.includes("help") ||
    lowerMessage.includes("assistenza") ||
    lowerMessage.includes("support")
  ) {
    return "support"
  }

  // FAQ
  if (
    lowerMessage.includes("faq") ||
    lowerMessage.includes("domande") ||
    lowerMessage.includes("questions") ||
    lowerMessage.includes("prezzi") ||
    lowerMessage.includes("price")
  ) {
    return "faq"
  }

  return null
}

// Handle booking flow
function handleBookingFlow(sessionId: string, message: string, language: "it" | "en") {
  const session = sessions.get(sessionId) || { step: "start", data: {} }
  const lowerMessage = message.toLowerCase()

  switch (session.step) {
    case "start":
    case "service_selection":
      // Parse service selection
      let selectedService = ""
      if (lowerMessage.includes("1") || lowerMessage.includes("automation") || lowerMessage.includes("automazione")) {
        selectedService = "AI Automation"
      } else if (lowerMessage.includes("2") || lowerMessage.includes("chatbot") || lowerMessage.includes("bot")) {
        selectedService = "Chatbot Intelligenti"
      } else if (lowerMessage.includes("3") || lowerMessage.includes("web") || lowerMessage.includes("sito")) {
        selectedService = "Web Development"
      } else if (lowerMessage.includes("4") || lowerMessage.includes("marketing")) {
        selectedService = "AI Marketing"
      }

      if (!selectedService) {
        const retryMessages = {
          it: `❌ **Servizio non riconosciuto**

Per favore scegli uno dei servizi disponibili:

1️⃣ **AI Automation**
2️⃣ **Chatbot Intelligenti** 
3️⃣ **Web Development**
4️⃣ **AI Marketing**

Scrivi il numero o il nome del servizio.`,
          en: `❌ **Service not recognized**

Please choose one of the available services:

1️⃣ **AI Automation**
2️⃣ **Intelligent Chatbots**
3️⃣ **Web Development** 
4️⃣ **AI Marketing**

Write the number or service name.`,
        }

        return {
          message: retryMessages[language],
          nextStep: "service_selection",
          bookingMode: true,
        }
      }

      // Service selected, ask for date
      session.data.service = selectedService
      session.step = "date_selection"
      sessions.set(sessionId, session)

      const dateMessages = {
        it: `✅ **Servizio selezionato: ${selectedService}**

📅 **SELEZIONE DATA**

Quando preferisci la consulenza?

**📋 Scrivi la data che preferisci:**
- **Oggi** (se disponibile)
- **Domani** 
- **Data specifica** (es: "15 settembre", "20/09/2024")
- **Giorno della settimana** (es: "giovedì prossimo")

**Quando vuoi prenotare?**`,
        en: `✅ **Selected service: ${selectedService}**

📅 **DATE SELECTION**

When do you prefer the consultation?

**📋 Write your preferred date:**
- **Today** (if available)
- **Tomorrow**
- **Specific date** (e.g: "September 15", "20/09/2024")
- **Day of week** (e.g: "next Thursday")

**When do you want to book?**`,
      }

      return {
        message: dateMessages[language],
        nextStep: "date_selection",
        bookingMode: true,
      }

    case "date_selection":
      // Parse date
      let selectedDate = ""
      if (lowerMessage.includes("oggi") || lowerMessage.includes("today")) {
        selectedDate = new Date().toLocaleDateString("it-IT")
      } else if (lowerMessage.includes("domani") || lowerMessage.includes("tomorrow")) {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        selectedDate = tomorrow.toLocaleDateString("it-IT")
      } else {
        // Default to tomorrow if can't parse
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        selectedDate = tomorrow.toLocaleDateString("it-IT")
      }

      session.data.date = selectedDate
      session.step = "time_selection"
      sessions.set(sessionId, session)

      const timeMessages = {
        it: `📅 **Data selezionata: ${selectedDate}**

🕐 **SELEZIONE ORARIO**

⏰ **ORARI DISPONIBILI** (ogni 30 minuti):

**🌅 MATTINA (9:00 - 12:00):**
1️⃣ **09:00**    2️⃣ **09:30**
3️⃣ **10:00**    4️⃣ **10:30**
5️⃣ **11:00**    6️⃣ **11:30**

**🌆 POMERIGGIO (14:00 - 18:00):**
7️⃣ **14:00**    8️⃣ **14:30**
9️⃣ **15:00**    🔟 **15:30**
1️⃣1️⃣ **16:00**    1️⃣2️⃣ **16:30**
1️⃣3️⃣ **17:00**    1️⃣4️⃣ **17:30**

**Quale orario preferisci?**
Scrivi il numero o l'orario esatto (es: "3" oppure "10:00")`,

        en: `📅 **Selected date: ${selectedDate}**

🕐 **TIME SELECTION**

⏰ **AVAILABLE TIMES** (every 30 minutes):

**🌅 MORNING (9:00 - 12:00):**
1️⃣ **09:00**    2️⃣ **09:30**
3️⃣ **10:00**    4️⃣ **10:30**
5️⃣ **11:00**    6️⃣ **11:30**

**🌆 AFTERNOON (14:00 - 18:00):**
7️⃣ **14:00**    8️⃣ **14:30**
9️⃣ **15:00**    🔟 **15:30**
1️⃣1️⃣ **16:00**    1️⃣2️⃣ **16:30**
1️⃣3️⃣ **17:00**    1️⃣4️⃣ **17:30**

**Which time do you prefer?**
Write the number or exact time (e.g: "3" or "10:00")`,
      }

      return {
        message: timeMessages[language],
        nextStep: "time_selection",
        bookingMode: true,
      }

    case "time_selection":
      // Parse time selection
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
        "17:30",
      ]

      let selectedTime = ""
      const messageNum = Number.parseInt(message.trim())
      if (messageNum >= 1 && messageNum <= 14) {
        selectedTime = timeSlots[messageNum - 1]
      } else {
        // Try to extract time directly
        const timeMatch = message.match(/(\d{1,2}):(\d{2})/)
        if (timeMatch) {
          selectedTime = `${timeMatch[1].padStart(2, "0")}:${timeMatch[2]}`
        } else {
          selectedTime = "10:00" // Default
        }
      }

      session.data.time = selectedTime
      session.step = "contact_info"
      sessions.set(sessionId, session)

      const contactMessages = {
        it: `🕐 **Orario confermato: ${selectedTime}** ✅

📋 **INFORMAZIONI DI CONTATTO**

Per completare la prenotazione, ho bisogno dei tuoi dati:

**📝 Inserisci le seguenti informazioni (una per riga):**

1️⃣ **Nome e Cognome**
2️⃣ **Email** 
3️⃣ **Numero di telefono**
4️⃣ **Messaggio opzionale** (descrivi le tue esigenze)

**Esempio:**
Mario Rossi
mario.rossi@email.com  
+39 333 1234567
Vorrei automatizzare il customer service

**Scrivi tutti i dati:**`,

        en: `🕐 **Time confirmed: ${selectedTime}** ✅

📋 **CONTACT INFORMATION**

To complete the booking, I need your details:

**📝 Enter the following information (one per line):**

1️⃣ **Full Name**
2️⃣ **Email**
3️⃣ **Phone Number** 
4️⃣ **Optional Message** (describe your needs)

**Example:**
Mario Rossi
mario.rossi@email.com
+39 333 1234567
I want to automate customer service

**Write all details:**`,
      }

      return {
        message: contactMessages[language],
        nextStep: "contact_info",
        bookingMode: true,
      }

    case "contact_info":
      // Parse contact information
      const lines = message.split("\n").filter((line) => line.trim().length > 0)
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
      const phoneRegex = /[+]?[0-9\s\-()]{8,}/

      const email = message.match(emailRegex)?.[0] || ""
      const phone = message.match(phoneRegex)?.[0] || ""
      const name = lines[0] || ""
      const userMessage = lines.slice(3).join(" ") || ""

      if (!name || !email || !phone) {
        const retryMessages = {
          it: `❌ **Informazioni incomplete**

Per favore fornisci tutti i dati richiesti:

**📝 Formato richiesto (una per riga):**
Nome e Cognome
email@esempio.com
+39 333 1234567
Messaggio opzionale

**Riprova con tutti i dati:**`,

          en: `❌ **Incomplete information**

Please provide all required details:

**📝 Required format (one per line):**
Full Name
email@example.com
+39 333 1234567
Optional message

**Try again with all details:**`,
        }

        return {
          message: retryMessages[language],
          nextStep: "contact_info",
          bookingMode: true,
        }
      }

      session.data.name = name.trim()
      session.data.email = email.trim()
      session.data.phone = phone.trim()
      session.data.message = userMessage.trim()
      session.step = "confirmation"
      sessions.set(sessionId, session)

      const confirmationMessages = {
        it: `✅ **RIEPILOGO PRENOTAZIONE**

📋 **Dettagli della tua consulenza:**

🎯 **Servizio:** ${session.data.service}
📅 **Data:** ${session.data.date}
🕐 **Orario:** ${session.data.time}
👤 **Nome:** ${session.data.name}
📧 **Email:** ${session.data.email}
📱 **Telefono:** ${session.data.phone}
${session.data.message ? `💬 **Messaggio:** ${session.data.message}` : ""}

**🔄 CONFERMA PRENOTAZIONE**

Tutto corretto? 

✅ **Scrivi "CONFERMA"** per completare la prenotazione
❌ **Scrivi "MODIFICA"** per cambiare qualcosa`,

        en: `✅ **BOOKING SUMMARY**

📋 **Your consultation details:**

🎯 **Service:** ${session.data.service}
📅 **Date:** ${session.data.date}
🕐 **Time:** ${session.data.time}
👤 **Name:** ${session.data.name}
📧 **Email:** ${session.data.email}
📱 **Phone:** ${session.data.phone}
${session.data.message ? `💬 **Message:** ${session.data.message}` : ""}

**🔄 BOOKING CONFIRMATION**

Everything correct?

✅ **Write "CONFIRM"** to complete booking
❌ **Write "MODIFY"** to change something`,
      }

      return {
        message: confirmationMessages[language],
        nextStep: "confirmation",
        bookingMode: true,
      }

    case "confirmation":
      if (
        lowerMessage.includes("conferma") ||
        lowerMessage.includes("confirm") ||
        lowerMessage.includes("sì") ||
        lowerMessage.includes("yes")
      ) {
        // Save appointment (simplified for demo)
        console.log("📅 Appointment booked:", session.data)

        // Clear session
        sessions.delete(sessionId)

        const successMessages = {
          it: `🎉 **PRENOTAZIONE CONFERMATA!**

✅ **La tua consulenza è stata prenotata con successo!**

📋 **Dettagli confermati:**
🎯 **Servizio:** ${session.data.service}
📅 **Data:** ${session.data.date}
🕐 **Orario:** ${session.data.time}
👤 **Nome:** ${session.data.name}

📧 **Email di conferma inviata a:** ${session.data.email}

**📞 COSA SUCCEDE ORA:**
1. Riceverai un'email di conferma entro 5 minuti
2. Ti contatteremo 24h prima per confermare
3. Riceverai il link per la videocall il giorno stesso

**🚀 PREPARATI PER LA CONSULENZA:**
- Pensa alle tue esigenze specifiche
- Prepara domande sui nostri servizi
- Porta esempi del tuo business

**Grazie per aver scelto Digital Aura!** 🌟

Hai altre domande?`,

          en: `🎉 **BOOKING CONFIRMED!**

✅ **Your consultation has been successfully booked!**

📋 **Confirmed details:**
🎯 **Service:** ${session.data.service}
📅 **Date:** ${session.data.date}
🕐 **Time:** ${session.data.time}
👤 **Name:** ${session.data.name}

📧 **Confirmation email sent to:** ${session.data.email}

**📞 WHAT HAPPENS NOW:**
1. You'll receive a confirmation email within 5 minutes
2. We'll contact you 24h before to confirm
3. You'll receive the videocall link on the same day

**🚀 PREPARE FOR THE CONSULTATION:**
- Think about your specific needs
- Prepare questions about our services
- Bring examples of your business

**Thank you for choosing Digital Aura!** 🌟

Do you have other questions?`,
        }

        return {
          message: successMessages[language],
          completed: true,
          bookingMode: false,
        }
      } else {
        // Restart booking
        sessions.delete(sessionId)
        return {
          message: responses[language].booking,
          nextStep: "service_selection",
          bookingMode: true,
        }
      }

    default:
      return {
        message: responses[language].booking,
        nextStep: "service_selection",
        bookingMode: true,
      }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, language = "it", sessionId } = await request.json()

    console.log(`💬 Chat API - Message: "${message}", Language: ${language}, Session: ${sessionId}`)

    if (!message || !sessionId) {
      return NextResponse.json({ success: false, message: "Message and sessionId are required" }, { status: 400 })
    }

    const lang = language as "it" | "en"

    // Check if we're in booking mode or user wants to book
    const session = sessions.get(sessionId)
    const isBookingFlow =
      session?.step ||
      message.toLowerCase().includes("prenota") ||
      message.toLowerCase().includes("book") ||
      /^[1-4]$/.test(message.trim())

    if (isBookingFlow) {
      console.log(`📅 Handling booking flow`)
      const bookingResponse = handleBookingFlow(sessionId, message, lang)

      return NextResponse.json({
        success: true,
        message: bookingResponse.message,
        context: {
          bookingMode: bookingResponse.bookingMode,
          flow: "booking",
          step: bookingResponse.nextStep,
          completed: bookingResponse.completed || false,
        },
      })
    }

    // Detect intent for regular responses
    const intent = detectIntent(message, lang)

    if (intent && responses[lang][intent as keyof (typeof responses)[typeof lang]]) {
      const response = responses[lang][intent as keyof (typeof responses)[typeof lang]]

      return NextResponse.json({
        success: true,
        message: response,
        supportActive: intent === "support",
        supportLevel: intent === "support" ? 1 : 0,
        context: {
          flow: intent,
          step: intent === "booking" ? "service_selection" : 1,
          bookingMode: intent === "booking",
        },
      })
    }

    // Try Gemini AI for general conversation
    if (process.env.GEMINI_API_KEY) {
      try {
        const systemPrompt =
          lang === "it"
            ? `Sei AuraBot, l'assistente AI di Digital Aura, specializzata in AI automation, web development e AI marketing.

Rispondi sempre in italiano, sii professionale ma amichevole, usa emoji e suggerisci sempre di prenotare una consulenza gratuita.

Servizi: AI Automation, Chatbot Intelligenti, Web Development, AI Marketing.
Contatti: info@digitalaura.it, +39 02 1234567`
            : `You are AuraBot, Digital Aura's AI assistant, specialized in AI automation, web development and AI marketing.

Always respond in English, be professional but friendly, use emojis and always suggest booking a free consultation.

Services: AI Automation, Intelligent Chatbots, Web Development, AI Marketing.
Contact: info@digitalaura.it, +39 02 1234567`

        const { text } = await generateText({
          model: google("gemini-1.5-flash"),
          system: systemPrompt,
          prompt: message,
          maxTokens: 300,
        })

        return NextResponse.json({
          success: true,
          message: text,
        })
      } catch (aiError) {
        console.error("AI Error:", aiError)
        // Fall through to fallback
      }
    }

    // Fallback response
    const fallbackResponse =
      lang === "it"
        ? `Ciao! 👋 Sono AuraBot di Digital Aura. 

Posso aiutarti con:
🤖 Servizi AI e automazione
🌐 Sviluppo web moderno
📊 AI Marketing
📅 Prenotazioni consulenze

Scrivi "servizi" per saperne di più o "prenota" per una consulenza gratuita!`
        : `Hello! 👋 I'm AuraBot from Digital Aura.

I can help you with:
🤖 AI services and automation
🌐 Modern web development
📊 AI Marketing
📅 Consultation bookings

Write "services" to learn more or "book" for a free consultation!`

    return NextResponse.json({
      success: true,
      message: fallbackResponse,
    })
  } catch (error) {
    console.error("Chat API Error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Mi dispiace, c'è stato un errore. Riprova tra poco!",
      },
      { status: 500 },
    )
  }
}
