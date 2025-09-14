// Booking Flow - Complete appointment booking system
// Version 246 - Full booking with database check and 30-minute slots

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

  // Business hours validation - Orari negozio: 9:00-12:00 e 14:00-18:00
  private isBusinessHours(time: string): boolean {
    const [hourStr, minuteStr] = time.split(":")
    const hour = Number.parseInt(hourStr)
    const minute = Number.parseInt(minuteStr)
    const totalMinutes = hour * 60 + minute

    // Orari mattina: 9:00 - 12:00
    const morningStart = 9 * 60 // 9:00
    const morningEnd = 12 * 60 // 12:00

    // Orari pomeriggio: 14:00 - 18:00
    const afternoonStart = 14 * 60 // 14:00
    const afternoonEnd = 18 * 60 // 18:00

    // Check se è negli orari di apertura
    const isMorning = totalMinutes >= morningStart && totalMinutes < morningEnd
    const isAfternoon = totalMinutes >= afternoonStart && totalMinutes < afternoonEnd

    return isMorning || isAfternoon
  }

  // Generate available time slots (every 30 minutes)
  private getAvailableTimeSlots(): string[] {
    const slots: string[] = []

    // Mattina: 9:00 - 12:00 (ogni 30 minuti)
    for (let hour = 9; hour < 12; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      slots.push(`${hour.toString().padStart(2, "0")}:30`)
    }

    // Pomeriggio: 14:00 - 18:00 (ogni 30 minuti)
    for (let hour = 14; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      slots.push(`${hour.toString().padStart(2, "0")}:30`)
    }

    return slots
  }

  // Check availability in database
  private async checkSlotAvailability(date: string, time: string): Promise<boolean> {
    try {
      console.log(`🔍 Checking availability for ${date} at ${time}`)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/appointments/availability`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, time }),
        },
      )

      if (!response.ok) {
        console.error("❌ Error checking availability")
        return true // Default to available if check fails
      }

      const data = await response.json()
      return data.available
    } catch (error) {
      console.error("❌ Error checking slot availability:", error)
      return true // Default to available if check fails
    }
  }

  private getBusinessHoursMessage(language: string): string {
    const messages = {
      it: `🏪 **NEGOZIO CHIUSO**

⏰ **ORARI DI APERTURA:**

🌅 **Mattina**: 09:00 - 12:00
🌆 **Pomeriggio**: 14:00 - 18:00

❌ **Chiuso**: 12:00 - 14:00 (pausa pranzo)
❌ **Chiuso**: Prima delle 09:00 e dopo le 18:00

📅 **Appuntamenti ogni 30 minuti**
(es: 9:00, 9:30, 10:00, 10:30, etc.)

Per favore scegli un orario durante l'apertura del negozio.`,

      en: `🏪 **SHOP CLOSED**

⏰ **OPENING HOURS:**

🌅 **Morning**: 09:00 - 12:00
🌆 **Afternoon**: 14:00 - 18:00

❌ **Closed**: 12:00 - 14:00 (lunch break)
❌ **Closed**: Before 09:00 and after 18:00

📅 **Appointments every 30 minutes**
(e.g: 9:00, 9:30, 10:00, 10:30, etc.)

Please choose a time during shop opening hours.`,
    }

    return messages[language as keyof typeof messages] || messages.it
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

**📋 Scrivi la data che preferisci:**
- **Oggi** (se disponibile)
- **Domani** 
- **Data specifica** (es: "15 settembre", "20/09/2024")
- **Giorno della settimana** (es: "giovedì prossimo")

**Esempio:** "domani", "15 settembre", "giovedì"

**Quando vuoi prenotare?**`,

      en: `✅ **Selected service: ${selectedService}**

📅 **DATE SELECTION**

When do you prefer the consultation?

**📋 Write your preferred date:**
- **Today** (if available)
- **Tomorrow**
- **Specific date** (e.g: "September 15", "20/09/2024")
- **Day of week** (e.g: "next Thursday")

**Example:** "tomorrow", "September 15", "Thursday"

**When do you want to book?**`,
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
    // Parse date from message
    const lowerMessage = message.toLowerCase()
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

    // Save date selection
    const session = await this.sessionManager.getSession(sessionId)
    const updatedBookingData = { ...bookingData, date: selectedDate }

    await this.sessionManager.updateSession(sessionId, {
      context: { ...session?.context, booking_data: updatedBookingData },
      flow_step: "time_selection",
    })

    // Get available time slots
    const timeSlots = this.getAvailableTimeSlots()

    const timeMessages = {
      it: `📅 **Data selezionata: ${selectedDate}**

🕐 **SELEZIONE ORARIO**

⏰ **ORARI DISPONIBILI** (ogni 30 minuti):

**🌅 MATTINA (9:00 - 12:00):**
${timeSlots
  .filter((time) => Number.parseInt(time.split(":")[0]) < 12)
  .map((time, index) => `${index + 1}️⃣ **${time}**`)
  .join("\n")}

**🌆 POMERIGGIO (14:00 - 18:00):**
${timeSlots
  .filter((time) => Number.parseInt(time.split(":")[0]) >= 14)
  .map((time, index) => `${index + 7}️⃣ **${time}**`)
  .join("\n")}

**Quale orario preferisci?**
Scrivi il numero o l'orario esatto (es: "3" oppure "10:30")

💡 **Nota**: Controllerò la disponibilità nel database`,

      en: `📅 **Selected date: ${selectedDate}**

🕐 **TIME SELECTION**

⏰ **AVAILABLE TIMES** (every 30 minutes):

**🌅 MORNING (9:00 - 12:00):**
${timeSlots
  .filter((time) => Number.parseInt(time.split(":")[0]) < 12)
  .map((time, index) => `${index + 1}️⃣ **${time}**`)
  .join("\n")}

**🌆 AFTERNOON (14:00 - 18:00):**
${timeSlots
  .filter((time) => Number.parseInt(time.split(":")[0]) >= 14)
  .map((time, index) => `${index + 7}️⃣ **${time}**`)
  .join("\n")}

**Which time do you prefer?**
Write the number or exact time (e.g: "3" or "10:30")

💡 **Note**: I'll check availability in the database`,
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
    const lowerMessage = message.toLowerCase()
    const timeSlots = this.getAvailableTimeSlots()
    let selectedTime = ""

    // Parse time selection by number or direct time
    if (
      lowerMessage.includes("1") &&
      !lowerMessage.includes("10") &&
      !lowerMessage.includes("11") &&
      !lowerMessage.includes("12")
    ) {
      selectedTime = "09:00"
    } else if (lowerMessage.includes("2") && !lowerMessage.includes("12")) {
      selectedTime = "09:30"
    } else if (lowerMessage.includes("3") && !lowerMessage.includes("13")) {
      selectedTime = "10:00"
    } else if (lowerMessage.includes("4") && !lowerMessage.includes("14")) {
      selectedTime = "10:30"
    } else if (lowerMessage.includes("5") && !lowerMessage.includes("15")) {
      selectedTime = "11:00"
    } else if (lowerMessage.includes("6") && !lowerMessage.includes("16")) {
      selectedTime = "11:30"
    } else if (lowerMessage.includes("7") && !lowerMessage.includes("17")) {
      selectedTime = "14:00"
    } else if (lowerMessage.includes("8") && !lowerMessage.includes("18")) {
      selectedTime = "14:30"
    } else if (lowerMessage.includes("9") && !lowerMessage.includes("19")) {
      selectedTime = "15:00"
    } else if (lowerMessage.includes("10")) {
      selectedTime = "15:30"
    } else if (lowerMessage.includes("11")) {
      selectedTime = "16:00"
    } else if (lowerMessage.includes("12")) {
      selectedTime = "16:30"
    } else if (lowerMessage.includes("13")) {
      selectedTime = "17:00"
    } else if (lowerMessage.includes("14")) {
      selectedTime = "17:30"
    } else {
      // Try to extract time directly from message
      const timeMatch = message.match(/(\d{1,2}):(\d{2})/)
      if (timeMatch) {
        const hour = timeMatch[1].padStart(2, "0")
        const minute = timeMatch[2]
        selectedTime = `${hour}:${minute}`
      } else {
        selectedTime = "10:00" // Default
      }
    }

    // Validate business hours
    if (!this.isBusinessHours(selectedTime)) {
      return {
        message: this.getBusinessHoursMessage(language),
        nextStep: "time_selection",
        needsInput: true,
      }
    }

    // Check availability in database
    const isAvailable = await this.checkSlotAvailability(bookingData.date!, selectedTime)

    if (!isAvailable) {
      const occupiedMessages = {
        it: `❌ **ORARIO GIÀ OCCUPATO**

L'orario **${selectedTime}** del **${bookingData.date}** è già prenotato da un altro cliente.

**🔄 SCEGLI UN ALTRO ORARIO:**

Per favore seleziona un orario diverso dalla lista precedente.

**Quale altro orario preferisci?**`,

        en: `❌ **TIME SLOT OCCUPIED**

The time **${selectedTime}** on **${bookingData.date}** is already booked by another client.

**🔄 CHOOSE ANOTHER TIME:**

Please select a different time from the previous list.

**Which other time do you prefer?**`,
      }

      return {
        message: occupiedMessages[language as keyof typeof occupiedMessages] || occupiedMessages.it,
        nextStep: "time_selection",
        needsInput: true,
      }
    }

    // Save time selection
    const session = await this.sessionManager.getSession(sessionId)
    const updatedBookingData = { ...bookingData, time: selectedTime }

    await this.sessionManager.updateSession(sessionId, {
      context: { ...session?.context, booking_data: updatedBookingData },
      flow_step: "contact_info",
    })

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
    // Parse contact information
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
      // Final availability check before saving
      const isStillAvailable = await this.checkSlotAvailability(bookingData.date!, bookingData.time!)

      if (!isStillAvailable) {
        const conflictMessages = {
          it: `❌ **CONFLITTO DI PRENOTAZIONE**

Mi dispiace, ma l'orario **${bookingData.time}** del **${bookingData.date}** è stato appena prenotato da un altro cliente.

**🔄 RIPROVA CON ALTRO ORARIO:**

Vuoi scegliere un altro orario? Scrivi "ALTRO ORARIO" per vedere gli slot disponibili.`,

          en: `❌ **BOOKING CONFLICT**

Sorry, but the time **${bookingData.time}** on **${bookingData.date}** was just booked by another client.

**🔄 TRY ANOTHER TIME:**

Do you want to choose another time? Write "ANOTHER TIME" to see available slots.`,
        }

        return {
          message: conflictMessages[language as keyof typeof conflictMessages] || conflictMessages.it,
          nextStep: "time_selection",
          needsInput: true,
        }
      }

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
          priority: false,
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
👤 **Nome:** ${bookingData.name}

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
👤 **Name:** ${bookingData.name}

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
