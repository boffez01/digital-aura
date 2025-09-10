// Booking Flow - Complete appointment booking system
// Version 244 - Integrated with support escalation

import { SessionManager } from "./session-manager"

export interface BookingResponse {
  message: string
  nextStep?: string
  completed?: boolean
  needsInput?: boolean
}

export interface BookingData {
  service?: string
  date?: string
  time?: string
  name?: string
  email?: string
  phone?: string
  message?: string
}

export class BookingFlow {
  private sessionManager: SessionManager

  constructor() {
    this.sessionManager = SessionManager.getInstance()
  }

  async handleBookingStep(
    sessionId: string,
    message: string,
    currentStep: string,
    language = "it",
  ): Promise<BookingResponse> {
    try {
      console.log(`📅 Processing booking step: ${currentStep} for session ${sessionId}`)

      const session = await this.sessionManager.getSession(sessionId)
      if (!session) {
        throw new Error("Session not found")
      }

      // Activate booking mode if not already active
      if (!session.booking_mode) {
        await this.sessionManager.activateBookingMode(sessionId)
      }

      // Get existing booking data from context
      const bookingData: BookingData = session.context.booking_data || {}

      // Process based on current step
      switch (currentStep) {
        case "booking_start":
          return await this.startBooking(sessionId, language)

        case "service_selection":
          return await this.handleServiceSelection(sessionId, message, language)

        case "date_selection":
          return await this.handleDateSelection(sessionId, message, bookingData, language)

        case "time_selection":
          return await this.handleTimeSelection(sessionId, message, bookingData, language)

        case "contact_info":
          return await this.handleContactInfo(sessionId, message, bookingData, language)

        case "confirmation":
          return await this.handleConfirmation(sessionId, message, bookingData, language)

        default:
          return await this.startBooking(sessionId, language)
      }
    } catch (error) {
      console.error("❌ Error in booking flow:", error)

      const errorMessages = {
        it: "📅 Si è verificato un errore durante la prenotazione. Riprova o contattaci: +39 02 1234567",
        en: "📅 An error occurred during booking. Please try again or contact us: +39 02 1234567",
      }

      return {
        message: errorMessages[language as keyof typeof errorMessages] || errorMessages.it,
        completed: false,
      }
    }
  }

  private async startBooking(sessionId: string, language: string): Promise<BookingResponse> {
    const messages = {
      it: `📅 **PRENOTAZIONE CONSULENZA GRATUITA**

Perfetto! Ti aiuto a prenotare una consulenza gratuita.

**🎯 SERVIZI DISPONIBILI:**

1️⃣ **AI Automation** - Automazione processi aziendali
2️⃣ **Chatbot Intelligenti** - Assistenti virtuali 24/7  
3️⃣ **Web Development** - Siti web e e-commerce
4️⃣ **AI Marketing** - Campagne automatizzate

**Per quale servizio vuoi prenotare?**
Scrivi il numero (1, 2, 3, 4) o il nome del servizio.`,

      en: `📅 **FREE CONSULTATION BOOKING**

Perfect! I'll help you book a free consultation.

**🎯 AVAILABLE SERVICES:**

1️⃣ **AI Automation** - Business process automation
2️⃣ **Intelligent Chatbots** - 24/7 virtual assistants
3️⃣ **Web Development** - Websites and e-commerce
4️⃣ **AI Marketing** - Automated campaigns

**Which service do you want to book for?**
Write the number (1, 2, 3, 4) or service name.`,
    }

    await this.sessionManager.updateSession(sessionId, {
      flow_step: "service_selection",
    })

    return {
      message: messages[language as keyof typeof messages] || messages.it,
      nextStep: "service_selection",
      needsInput: true,
    }
  }

  private async handleServiceSelection(sessionId: string, message: string, language: string): Promise<BookingResponse> {
    const lowerMessage = message.toLowerCase()
    let selectedService = ""

    // Parse service selection
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
        message: retryMessages[language as keyof typeof retryMessages] || retryMessages.it,
        nextStep: "service_selection",
        needsInput: true,
      }
    }

    // Save service selection
    const session = await this.sessionManager.getSession(sessionId)
    const bookingData = { ...session?.context.booking_data, service: selectedService }

    await this.sessionManager.updateSession(sessionId, {
      context: { ...session?.context, booking_data: bookingData },
      flow_step: "date_selection",
    })

    const confirmMessages = {
      it: `✅ **Servizio selezionato: ${selectedService}**

📅 **SELEZIONE DATA**

Quando preferisci la consulenza?

**📋 Opzioni disponibili:**
- **Oggi** - Se disponibile
- **Domani** - Slot mattina/pomeriggio
- **Questa settimana** - Maggiore flessibilità
- **Prossima settimana** - Più opzioni

**Scrivi quando preferisci** (es: "domani mattina", "giovedì pomeriggio", "la prossima settimana")`,

      en: `✅ **Selected service: ${selectedService}**

📅 **DATE SELECTION**

When do you prefer the consultation?

**📋 Available options:**
- **Today** - If available
- **Tomorrow** - Morning/afternoon slots
- **This week** - Greater flexibility  
- **Next week** - More options

**Write when you prefer** (e.g., "tomorrow morning", "Thursday afternoon", "next week")`,
    }

    return {
      message: confirmMessages[language as keyof typeof confirmMessages] || confirmMessages.it,
      nextStep: "date_selection",
      needsInput: true,
    }
  }

  private async handleDateSelection(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: string,
  ): Promise<BookingResponse> {
    // Simple date parsing (in production, use more sophisticated date parsing)
    const lowerMessage = message.toLowerCase()
    let suggestedDate = ""
    let timeSlots = []

    if (lowerMessage.includes("oggi") || lowerMessage.includes("today")) {
      suggestedDate = new Date().toLocaleDateString("it-IT")
      timeSlots = ["15:00", "16:00", "17:00"]
    } else if (lowerMessage.includes("domani") || lowerMessage.includes("tomorrow")) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      suggestedDate = tomorrow.toLocaleDateString("it-IT")
      timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
    } else {
      // Default to next available slots
      const nextWeek = new Date()
      nextWeek.setDate(nextWeek.getDate() + 7)
      suggestedDate = nextWeek.toLocaleDateString("it-IT")
      timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]
    }

    // Save date preference
    const session = await this.sessionManager.getSession(sessionId)
    const updatedBookingData = { ...bookingData, date: suggestedDate }

    await this.sessionManager.updateSession(sessionId, {
      context: { ...session?.context, booking_data: updatedBookingData },
      flow_step: "time_selection",
    })

    const timeMessages = {
      it: `📅 **Data proposta: ${suggestedDate}**

🕐 **SELEZIONE ORARIO**

Orari disponibili per ${suggestedDate}:

${timeSlots.map((time, index) => `${index + 1}️⃣ **${time}** - Disponibile`).join("\n")}

**Quale orario preferisci?**
Scrivi il numero o l'orario (es: "2" oppure "10:00")`,

      en: `📅 **Proposed date: ${suggestedDate}**

🕐 **TIME SELECTION**

Available times for ${suggestedDate}:

${timeSlots.map((time, index) => `${index + 1}️⃣ **${time}** - Available`).join("\n")}

**Which time do you prefer?**
Write the number or time (e.g., "2" or "10:00")`,
    }

    return {
      message: timeMessages[language as keyof typeof timeMessages] || timeMessages.it,
      nextStep: "time_selection",
      needsInput: true,
    }
  }

  private async handleTimeSelection(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: string,
  ): Promise<BookingResponse> {
    // Simple time parsing
    const lowerMessage = message.toLowerCase()
    let selectedTime = ""

    if (lowerMessage.includes("1") || lowerMessage.includes("09:00") || lowerMessage.includes("9:00")) {
      selectedTime = "09:00"
    } else if (lowerMessage.includes("2") || lowerMessage.includes("10:00")) {
      selectedTime = "10:00"
    } else if (lowerMessage.includes("3") || lowerMessage.includes("11:00")) {
      selectedTime = "11:00"
    } else if (lowerMessage.includes("4") || lowerMessage.includes("14:00") || lowerMessage.includes("2:00")) {
      selectedTime = "14:00"
    } else if (lowerMessage.includes("5") || lowerMessage.includes("15:00") || lowerMessage.includes("3:00")) {
      selectedTime = "15:00"
    } else if (lowerMessage.includes("6") || lowerMessage.includes("16:00") || lowerMessage.includes("4:00")) {
      selectedTime = "16:00"
    } else {
      selectedTime = "10:00" // Default
    }

    // Save time selection
    const session = await this.sessionManager.getSession(sessionId)
    const updatedBookingData = { ...bookingData, time: selectedTime }

    await this.sessionManager.updateSession(sessionId, {
      context: { ...session?.context, booking_data: updatedBookingData },
      flow_step: "contact_info",
    })

    const contactMessages = {
      it: `🕐 **Orario selezionato: ${selectedTime}**

📋 **INFORMAZIONI DI CONTATTO**

Per completare la prenotazione, ho bisogno dei tuoi dati:

**📝 Inserisci le seguenti informazioni:**
- **Nome e Cognome**
- **Email** 
- **Numero di telefono**
- **Messaggio opzionale** (descrivi brevemente le tue esigenze)

**Esempio:**
Mario Rossi
mario.rossi@email.com  
+39 333 1234567
Vorrei automatizzare il customer service della mia azienda

**Scrivi tutti i dati insieme:**`,

      en: `🕐 **Selected time: ${selectedTime}**

📋 **CONTACT INFORMATION**

To complete the booking, I need your details:

**📝 Enter the following information:**
- **Full Name**
- **Email**
- **Phone Number** 
- **Optional Message** (briefly describe your needs)

**Example:**
Mario Rossi
mario.rossi@email.com
+39 333 1234567
I would like to automate my company's customer service

**Write all details together:**`,
    }

    return {
      message: contactMessages[language as keyof typeof contactMessages] || contactMessages.it,
      nextStep: "contact_info",
      needsInput: true,
    }
  }

  private async handleContactInfo(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: string,
  ): Promise<BookingResponse> {
    // Parse contact information (simple parsing)
    const lines = message.split("\n").filter((line) => line.trim().length > 0)

    // Extract information from the message
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    const phoneRegex = /[+]?[0-9\s\-()]{8,}/

    const email = message.match(emailRegex)?.[0] || ""
    const phone = message.match(phoneRegex)?.[0] || ""

    // Extract name (assume first line is name)
    const name = lines[0] || ""

    // Extract message (everything after phone/email)
    const userMessage = lines.slice(3).join(" ") || ""

    if (!name || !email || !phone) {
      const retryMessages = {
        it: `❌ **Informazioni incomplete**

Per favore fornisci tutti i dati richiesti:

**📝 Formato richiesto:**
Nome e Cognome
email@esempio.com
+39 333 1234567
Messaggio opzionale

**Riprova con tutti i dati:**`,

        en: `❌ **Incomplete information**

Please provide all required details:

**📝 Required format:**
Full Name
email@example.com
+39 333 1234567
Optional message

**Try again with all details:**`,
      }

      return {
        message: retryMessages[language as keyof typeof retryMessages] || retryMessages.it,
        nextStep: "contact_info",
        needsInput: true,
      }
    }

    // Save contact information
    const session = await this.sessionManager.getSession(sessionId)
    const updatedBookingData = {
      ...bookingData,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: userMessage.trim(),
    }

    await this.sessionManager.updateSession(sessionId, {
      context: { ...session?.context, booking_data: updatedBookingData },
      flow_step: "confirmation",
    })

    const confirmationMessages = {
      it: `✅ **RIEPILOGO PRENOTAZIONE**

📋 **Dettagli della tua consulenza:**

🎯 **Servizio:** ${bookingData.service}
📅 **Data:** ${bookingData.date}
🕐 **Orario:** ${bookingData.time}
👤 **Nome:** ${updatedBookingData.name}
📧 **Email:** ${updatedBookingData.email}
📱 **Telefono:** ${updatedBookingData.phone}
${updatedBookingData.message ? `💬 **Messaggio:** ${updatedBookingData.message}` : ""}

**🔄 CONFERMA PRENOTAZIONE**

Tutto corretto? 

✅ **Scrivi "CONFERMA"** per completare la prenotazione
❌ **Scrivi "MODIFICA"** per cambiare qualcosa`,

      en: `✅ **BOOKING SUMMARY**

📋 **Your consultation details:**

🎯 **Service:** ${bookingData.service}
📅 **Date:** ${bookingData.date}
🕐 **Time:** ${bookingData.time}
👤 **Name:** ${updatedBookingData.name}
📧 **Email:** ${updatedBookingData.email}
📱 **Phone:** ${updatedBookingData.phone}
${updatedBookingData.message ? `💬 **Message:** ${updatedBookingData.message}` : ""}

**🔄 BOOKING CONFIRMATION**

Everything correct?

✅ **Write "CONFIRM"** to complete booking
❌ **Write "MODIFY"** to change something`,
    }

    return {
      message: confirmationMessages[language as keyof typeof confirmationMessages] || confirmationMessages.it,
      nextStep: "confirmation",
      needsInput: true,
    }
  }

  private async handleConfirmation(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: string,
  ): Promise<BookingResponse> {
    const lowerMessage = message.toLowerCase()

    if (
      lowerMessage.includes("conferma") ||
      lowerMessage.includes("confirm") ||
      lowerMessage.includes("sì") ||
      lowerMessage.includes("yes")
    ) {
      // Save appointment to database
      try {
        const appointmentData = {
          service: bookingData.service,
          date: bookingData.date,
          time: bookingData.time,
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          message: bookingData.message,
          status: "confirmed",
          created_via: "chatbot",
          session_id: sessionId,
        }

        // Call appointments API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/appointments`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointmentData),
          },
        )

        if (response.ok) {
          // Mark booking as completed
          await this.sessionManager.updateSession(sessionId, {
            flow_step: "completed",
            context: {
              ...(await this.sessionManager.getSession(sessionId).then((s) => s?.context)),
              booking_completed: true,
              booking_data: appointmentData,
            },
          })

          const successMessages = {
            it: `🎉 **PRENOTAZIONE CONFERMATA!**

✅ **La tua consulenza è stata prenotata con successo!**

📋 **Dettagli confermati:**
🎯 **Servizio:** ${bookingData.service}
📅 **Data:** ${bookingData.date}
🕐 **Orario:** ${bookingData.time}

📧 **Email di conferma inviata a:** ${bookingData.email}

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
🎯 **Service:** ${bookingData.service}
📅 **Date:** ${bookingData.date}
🕐 **Time:** ${bookingData.time}

📧 **Confirmation email sent to:** ${bookingData.email}

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
            message: successMessages[language as keyof typeof successMessages] || successMessages.it,
            completed: true,
            needsInput: false,
          }
        } else {
          throw new Error("Failed to save appointment")
        }
      } catch (error) {
        console.error("❌ Error saving appointment:", error)

        const errorMessages = {
          it: `❌ **Errore durante il salvataggio**

Si è verificato un problema tecnico. 

**📞 PRENOTAZIONE MANUALE:**
Contattaci direttamente per completare la prenotazione:

📧 **Email:** info@digitalaura.it
📱 **Telefono:** +39 02 1234567

**Menziona questi dettagli:**
- Servizio: ${bookingData.service}
- Data: ${bookingData.date}
- Orario: ${bookingData.time}
- Nome: ${bookingData.name}

Ci scusiamo per l'inconveniente!`,

          en: `❌ **Error during saving**

A technical problem occurred.

**📞 MANUAL BOOKING:**
Contact us directly to complete the booking:

📧 **Email:** info@digitalaura.it
📱 **Phone:** +39 02 1234567

**Mention these details:**
- Service: ${bookingData.service}
- Date: ${bookingData.date}
- Time: ${bookingData.time}
- Name: ${bookingData.name}

We apologize for the inconvenience!`,
        }

        return {
          message: errorMessages[language as keyof typeof errorMessages] || errorMessages.it,
          completed: false,
          needsInput: false,
        }
      }
    } else if (
      lowerMessage.includes("modifica") ||
      lowerMessage.includes("modify") ||
      lowerMessage.includes("cambia") ||
      lowerMessage.includes("change")
    ) {
      // Restart booking process
      await this.sessionManager.updateSession(sessionId, {
        flow_step: "booking_start",
        context: {
          ...(await this.sessionManager.getSession(sessionId).then((s) => s?.context)),
          booking_data: {},
        },
      })

      return await this.startBooking(sessionId, language)
    } else {
      const clarificationMessages = {
        it: `❓ **Conferma richiesta**

Per completare la prenotazione:

✅ **Scrivi "CONFERMA"** se i dati sono corretti
❌ **Scrivi "MODIFICA"** se vuoi cambiare qualcosa

Cosa vuoi fare?`,

        en: `❓ **Confirmation required**

To complete the booking:

✅ **Write "CONFIRM"** if the details are correct
❌ **Write "MODIFY"** if you want to change something

What do you want to do?`,
      }

      return {
        message: clarificationMessages[language as keyof typeof clarificationMessages] || clarificationMessages.it,
        nextStep: "confirmation",
        needsInput: true,
      }
    }
  }
}
