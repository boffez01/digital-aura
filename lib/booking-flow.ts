import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

interface BookingData {
  service?: string
  date?: string
  time?: string
  name?: string
  email?: string
  phone?: string
  message?: string
}

interface BookingResponse {
  message: string
  nextStep: string | null
  completed: boolean
}

export class BookingFlow {
  private services = {
    it: [
      "🤖 AI Automation - Automazione processi aziendali",
      "💬 Chatbot Intelligenti - Assistenti AI personalizzati",
      "🌐 Web Development - Siti web moderni e applicazioni",
      "📈 AI Marketing - Campagne di marketing automatizzate",
    ],
    en: [
      "🤖 AI Automation - Business process automation",
      "💬 Intelligent Chatbots - Personalized AI assistants",
      "🌐 Web Development - Modern websites and applications",
      "📈 AI Marketing - Automated marketing campaigns",
    ],
  }

  private timeSlots = [
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

  async handleBookingStep(
    sessionId: string,
    message: string,
    currentStep: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    console.log(`📋 Booking step: ${currentStep} for session: ${sessionId}`)

    // Get current booking data
    const sessionData = await sql`
      SELECT booking_data FROM chat_sessions WHERE session_id = ${sessionId}
    `

    let bookingData: BookingData = {}
    if (sessionData.length > 0 && sessionData[0].booking_data) {
      bookingData = sessionData[0].booking_data
    }

    switch (currentStep) {
      case "booking_start":
        return this.startBooking(sessionId, language)

      case "awaiting_service":
        return this.handleServiceSelection(sessionId, message, language)

      case "awaiting_date":
        return this.handleDateSelection(sessionId, message, bookingData, language)

      case "awaiting_time":
        return this.handleTimeSelection(sessionId, message, bookingData, language)

      case "awaiting_name":
        return this.handleNameInput(sessionId, message, bookingData, language)

      case "awaiting_email":
        return this.handleEmailInput(sessionId, message, bookingData, language)

      case "awaiting_phone":
        return this.handlePhoneInput(sessionId, message, bookingData, language)

      case "awaiting_message":
        return this.handleMessageInput(sessionId, message, bookingData, language)

      case "awaiting_confirmation":
        return this.handleConfirmation(sessionId, message, bookingData, language)

      default:
        return {
          message:
            language === "it"
              ? "Mi dispiace, qualcosa è andato storto. Ricominciamo! 🔄"
              : "Sorry, something went wrong. Let's start over! 🔄",
          nextStep: null,
          completed: true,
        }
    }
  }

  private async startBooking(sessionId: string, language: "it" | "en"): Promise<BookingResponse> {
    const services = this.services[language]

    await sql`
      INSERT INTO chat_sessions (session_id, booking_mode, flow_step, booking_data, created_at)
      VALUES (${sessionId}, true, 'awaiting_service', '{}', NOW())
      ON CONFLICT (session_id)
      DO UPDATE SET booking_mode = true, flow_step = 'awaiting_service', booking_data = '{}'
    `

    const message =
      language === "it"
        ? `Perfetto! Iniziamo a prenotare la tua consulenza! 🎯

**Per quale servizio vuoi prenotare?**

1️⃣ ${services[0]}
2️⃣ ${services[1]}
3️⃣ ${services[2]}
4️⃣ ${services[3]}

Rispondi con il numero (1, 2, 3 o 4) 📝`
        : `Perfect! Let's book your consultation! 🎯

**Which service do you want to book?**

1️⃣ ${services[0]}
2️⃣ ${services[1]}
3️⃣ ${services[2]}
4️⃣ ${services[3]}

Reply with the number (1, 2, 3, or 4) 📝`

    return {
      message,
      nextStep: "awaiting_service",
      completed: false,
    }
  }

  private async handleServiceSelection(
    sessionId: string,
    message: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const services = this.services[language]
    const serviceIndex = Number.parseInt(message.trim()) - 1

    if (serviceIndex < 0 || serviceIndex > 3 || isNaN(serviceIndex)) {
      return {
        message:
          language === "it"
            ? "Per favore, scegli un numero valido (1, 2, 3 o 4) 🔢"
            : "Please choose a valid number (1, 2, 3, or 4) 🔢",
        nextStep: "awaiting_service",
        completed: false,
      }
    }

    const selectedService = services[serviceIndex]
    const bookingData: BookingData = { service: selectedService }

    await sql`
      UPDATE chat_sessions
      SET flow_step = 'awaiting_date', booking_data = ${JSON.stringify(bookingData)}
      WHERE session_id = ${sessionId}
    `

    const responseMessage =
      language === "it"
        ? `Ottimo! Hai scelto: ${selectedService} ✅

**Quando vuoi prenotare?**

Scrivi la data nel formato:
📅 "20/12" oppure "20 dicembre"

⚠️ Ricorda: lavoriamo solo da lunedì a venerdì!`
        : `Great! You chose: ${selectedService} ✅

**When do you want to book?**

Write the date in format:
📅 "20/12" or "December 20"

⚠️ Remember: we work only Monday to Friday!`

    return {
      message: responseMessage,
      nextStep: "awaiting_date",
      completed: false,
    }
  }

  private async handleDateSelection(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const parsedDate = this.parseDate(message, language)

    if (!parsedDate) {
      return {
        message:
          language === "it"
            ? 'Per favore, usa un formato valido come "20/12" o "20 dicembre" 📅'
            : 'Please use a valid format like "20/12" or "December 20" 📅',
        nextStep: "awaiting_date",
        completed: false,
      }
    }

    // Check if date is in the past
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (parsedDate < today) {
      return {
        message:
          language === "it"
            ? "Non posso prenotare date passate! Per favore scegli una data futura 📅"
            : "I cannot book past dates! Please choose a future date 📅",
        nextStep: "awaiting_date",
        completed: false,
      }
    }

    // Check if it's weekend
    const dayOfWeek = parsedDate.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        message:
          language === "it"
            ? "Il weekend non lavoriamo! 😊 Scegli un giorno da lunedì a venerdì."
            : "We don't work on weekends! 😊 Choose a day from Monday to Friday.",
        nextStep: "awaiting_date",
        completed: false,
      }
    }

    const dateString = parsedDate.toISOString().split("T")[0]

    // Check available time slots
    const bookedSlots = await sql`
      SELECT time FROM appointments
      WHERE date = ${dateString}
      AND status IN ('pending', 'confirmed')
    `

    const bookedTimes = bookedSlots.map((slot) => slot.time)
    const availableSlots = this.timeSlots.filter((slot) => !bookedTimes.includes(slot))

    if (availableSlots.length === 0) {
      return {
        message:
          language === "it"
            ? "Mi dispiace, non ci sono slot disponibili per questa data! 😔 Prova un'altra data."
            : "Sorry, no available slots for this date! 😔 Try another date.",
        nextStep: "awaiting_date",
        completed: false,
      }
    }

    bookingData.date = dateString

    await sql`
      UPDATE chat_sessions
      SET flow_step = 'awaiting_time', booking_data = ${JSON.stringify(bookingData)}
      WHERE session_id = ${sessionId}
    `

    const formattedDate = parsedDate.toLocaleDateString(language === "it" ? "it-IT" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })

    const slotsMessage = availableSlots.map((slot, index) => `${index + 1}️⃣ ${slot}`).join("\n")

    const responseMessage =
      language === "it"
        ? `Perfetto! Data selezionata: ${formattedDate} ✅

**Scegli un orario disponibile:**

${slotsMessage}

Rispondi con il numero dello slot! 🕐`
        : `Perfect! Selected date: ${formattedDate} ✅

**Choose an available time:**

${slotsMessage}

Reply with the slot number! 🕐`

    return {
      message: responseMessage,
      nextStep: "awaiting_time",
      completed: false,
    }
  }

  private async handleTimeSelection(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    if (!bookingData.date) {
      return {
        message:
          language === "it" ? "Errore: data non trovata. Ricominciamo! 🔄" : "Error: date not found. Let's restart! 🔄",
        nextStep: null,
        completed: true,
      }
    }

    // Get available slots again
    const bookedSlots = await sql`
      SELECT time FROM appointments
      WHERE date = ${bookingData.date}
      AND status IN ('pending', 'confirmed')
    `

    const bookedTimes = bookedSlots.map((slot) => slot.time)
    const availableSlots = this.timeSlots.filter((slot) => !bookedTimes.includes(slot))

    const slotIndex = Number.parseInt(message.trim()) - 1

    if (slotIndex < 0 || slotIndex >= availableSlots.length || isNaN(slotIndex)) {
      return {
        message:
          language === "it"
            ? "Per favore, scegli un numero valido dalla lista! 🔢"
            : "Please choose a valid number from the list! 🔢",
        nextStep: "awaiting_time",
        completed: false,
      }
    }

    const selectedTime = availableSlots[slotIndex]

    // Double-check availability
    const finalCheck = await sql`
      SELECT id FROM appointments
      WHERE date = ${bookingData.date}
      AND time = ${selectedTime}
      AND status IN ('pending', 'confirmed')
    `

    if (finalCheck.length > 0) {
      return {
        message:
          language === "it"
            ? "Mi dispiace, questo slot è stato appena prenotato! 😔 Scegline un altro."
            : "Sorry, this slot was just booked! 😔 Choose another one.",
        nextStep: "awaiting_time",
        completed: false,
      }
    }

    bookingData.time = selectedTime

    await sql`
      UPDATE chat_sessions
      SET flow_step = 'awaiting_name', booking_data = ${JSON.stringify(bookingData)}
      WHERE session_id = ${sessionId}
    `

    const responseMessage =
      language === "it"
        ? `Perfetto! Orario selezionato: ${selectedTime} ✅

**Come ti chiami?**

Inserisci il tuo nome completo 👤`
        : `Perfect! Selected time: ${selectedTime} ✅

**What's your name?**

Enter your full name 👤`

    return {
      message: responseMessage,
      nextStep: "awaiting_name",
      completed: false,
    }
  }

  private async handleNameInput(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const name = message.trim()

    if (name.length < 2) {
      return {
        message:
          language === "it" ? "Il nome deve essere almeno 2 caratteri! 📝" : "Name must be at least 2 characters! 📝",
        nextStep: "awaiting_name",
        completed: false,
      }
    }

    bookingData.name = name

    await sql`
      UPDATE chat_sessions
      SET flow_step = 'awaiting_email', booking_data = ${JSON.stringify(bookingData)}
      WHERE session_id = ${sessionId}
    `

    const responseMessage =
      language === "it"
        ? `Ciao ${name}! 👋

**Qual è la tua email?**

Inserisci un indirizzo email valido 📧`
        : `Hi ${name}! 👋

**What's your email?**

Enter a valid email address 📧`

    return {
      message: responseMessage,
      nextStep: "awaiting_email",
      completed: false,
    }
  }

  private async handleEmailInput(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const email = message.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return {
        message: language === "it" ? "Per favore, inserisci un'email valida! 📧" : "Please enter a valid email! 📧",
        nextStep: "awaiting_email",
        completed: false,
      }
    }

    bookingData.email = email

    await sql`
      UPDATE chat_sessions
      SET flow_step = 'awaiting_phone', booking_data = ${JSON.stringify(bookingData)}
      WHERE session_id = ${sessionId}
    `

    const responseMessage =
      language === "it"
        ? `Email confermata: ${email} ✅

**Qual è il tuo numero di telefono?**

Inserisci un numero valido 📱`
        : `Email confirmed: ${email} ✅

**What's your phone number?**

Enter a valid number 📱`

    return {
      message: responseMessage,
      nextStep: "awaiting_phone",
      completed: false,
    }
  }

  private async handlePhoneInput(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const phone = message.trim().replace(/\s/g, "")
    const phoneRegex = /^[\d+\-()]{8,}$/

    if (!phoneRegex.test(phone)) {
      return {
        message:
          language === "it"
            ? "Per favore, inserisci un numero di telefono valido! 📱"
            : "Please enter a valid phone number! 📱",
        nextStep: "awaiting_phone",
        completed: false,
      }
    }

    bookingData.phone = phone

    await sql`
      UPDATE chat_sessions
      SET flow_step = 'awaiting_message', booking_data = ${JSON.stringify(bookingData)}
      WHERE session_id = ${sessionId}
    `

    const responseMessage =
      language === "it"
        ? `Telefono confermato: ${phone} ✅

**Vuoi aggiungere un messaggio? (opzionale)**

Scrivi un messaggio o "skip" per saltare 💬`
        : `Phone confirmed: ${phone} ✅

**Want to add a message? (optional)**

Write a message or "skip" to skip 💬`

    return {
      message: responseMessage,
      nextStep: "awaiting_message",
      completed: false,
    }
  }

  private async handleMessageInput(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const userMessage = message.trim()

    if (userMessage.toLowerCase() !== "skip") {
      bookingData.message = userMessage
    }

    await sql`
      UPDATE chat_sessions
      SET flow_step = 'awaiting_confirmation', booking_data = ${JSON.stringify(bookingData)}
      WHERE session_id = ${sessionId}
    `

    const date = new Date(bookingData.date!)
    const formattedDate = date.toLocaleDateString(language === "it" ? "it-IT" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    const summaryMessage =
      language === "it"
        ? `📋 **RIEPILOGO PRENOTAZIONE**

✅ **Servizio**: ${bookingData.service}
📅 **Data**: ${formattedDate}
🕐 **Orario**: ${bookingData.time}
👤 **Nome**: ${bookingData.name}
📧 **Email**: ${bookingData.email}
📱 **Telefono**: ${bookingData.phone}
${bookingData.message ? `💬 **Messaggio**: ${bookingData.message}` : ""}

Tutto corretto? Rispondi **"SI"** per confermare o **"NO"** per annullare 🎯`
        : `📋 **BOOKING SUMMARY**

✅ **Service**: ${bookingData.service}
📅 **Date**: ${formattedDate}
🕐 **Time**: ${bookingData.time}
👤 **Name**: ${bookingData.name}
📧 **Email**: ${bookingData.email}
📱 **Phone**: ${bookingData.phone}
${bookingData.message ? `💬 **Message**: ${bookingData.message}` : ""}

Everything correct? Reply **"YES"** to confirm or **"NO"** to cancel 🎯`

    return {
      message: summaryMessage,
      nextStep: "awaiting_confirmation",
      completed: false,
    }
  }

  private async handleConfirmation(
    sessionId: string,
    message: string,
    bookingData: BookingData,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const response = message.trim().toLowerCase()

    if (response === "no") {
      await sql`
        UPDATE chat_sessions
        SET booking_mode = false, flow_step = null, booking_data = null
        WHERE session_id = ${sessionId}
      `

      return {
        message:
          language === "it"
            ? "Prenotazione annullata! 🙏 Se vuoi riprenotare, scrivi 'prenota'."
            : "Booking cancelled! 🙏 If you want to book again, write 'book'.",
        nextStep: null,
        completed: true,
      }
    }

    if (response !== "si" && response !== "sì" && response !== "yes") {
      return {
        message: language === "it" ? 'Per favore, rispondi "SI" o "NO" 📝' : 'Please reply "YES" or "NO" 📝',
        nextStep: "awaiting_confirmation",
        completed: false,
      }
    }

    // Final check for slot availability
    const finalCheck = await sql`
      SELECT id FROM appointments
      WHERE date = ${bookingData.date}
      AND time = ${bookingData.time}
      AND status IN ('pending', 'confirmed')
    `

    if (finalCheck.length > 0) {
      await sql`
        UPDATE chat_sessions
        SET booking_mode = false, flow_step = null, booking_data = null
        WHERE session_id = ${sessionId}
      `

      return {
        message:
          language === "it"
            ? "Mi dispiace, questo slot è stato appena prenotato da qualcun altro! 😔 Riprova con un altro orario."
            : "Sorry, this slot was just booked by someone else! 😔 Try another time.",
        nextStep: null,
        completed: true,
      }
    }

    // Save appointment to database
    try {
      const result = await sql`
        INSERT INTO appointments (
          date, time, name, email, phone, service, message, status, created_at
        ) VALUES (
          ${bookingData.date},
          ${bookingData.time},
          ${bookingData.name},
          ${bookingData.email},
          ${bookingData.phone},
          ${bookingData.service},
          ${bookingData.message || ""},
          'pending',
          NOW()
        )
        RETURNING id
      `

      const appointmentId = result[0].id

      // Clear session
      await sql`
        UPDATE chat_sessions
        SET booking_mode = false, flow_step = null, booking_data = null
        WHERE session_id = ${sessionId}
      `

      const date = new Date(bookingData.date!)
      const formattedDate = date.toLocaleDateString(language === "it" ? "it-IT" : "en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })

      const successMessage =
        language === "it"
          ? `✅ **PRENOTAZIONE CONFERMATA!**

🎉 La tua consulenza è stata prenotata con successo!

📋 **ID Prenotazione**: #${appointmentId}
📅 **Data**: ${formattedDate}
🕐 **Orario**: ${bookingData.time}

📧 Ti abbiamo inviato una conferma via email a ${bookingData.email}

Ti aspettiamo! 🚀

Se hai domande, scrivimi pure! 💬`
          : `✅ **BOOKING CONFIRMED!**

🎉 Your consultation has been successfully booked!

📋 **Booking ID**: #${appointmentId}
📅 **Date**: ${formattedDate}
🕐 **Time**: ${bookingData.time}

📧 We sent you a confirmation email at ${bookingData.email}

See you there! 🚀

If you have questions, just ask! 💬`

      return {
        message: successMessage,
        nextStep: null,
        completed: true,
      }
    } catch (error) {
      console.error("Error saving appointment:", error)

      await sql`
        UPDATE chat_sessions
        SET booking_mode = false, flow_step = null, booking_data = null
        WHERE session_id = ${sessionId}
      `

      return {
        message:
          language === "it"
            ? "Mi dispiace, si è verificato un errore. Riprova! 🔄"
            : "Sorry, an error occurred. Please try again! 🔄",
        nextStep: null,
        completed: true,
      }
    }
  }

  private parseDate(message: string, language: "it" | "en"): Date | null {
    const cleaned = message.toLowerCase().trim()

    // Format: "20/12" or "20/12/2024"
    const slashMatch = cleaned.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/)
    if (slashMatch) {
      const day = Number.parseInt(slashMatch[1])
      const month = Number.parseInt(slashMatch[2]) - 1
      const year = slashMatch[3] ? Number.parseInt(slashMatch[3]) : new Date().getFullYear()
      return new Date(year, month, day)
    }

    // Format: "20 dicembre" or "December 20"
    const months = {
      it: [
        "gennaio",
        "febbraio",
        "marzo",
        "aprile",
        "maggio",
        "giugno",
        "luglio",
        "agosto",
        "settembre",
        "ottobre",
        "novembre",
        "dicembre",
      ],
      en: [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ],
    }

    const monthNames = months[language]
    for (let i = 0; i < monthNames.length; i++) {
      if (cleaned.includes(monthNames[i])) {
        const dayMatch = cleaned.match(/(\d{1,2})/)
        if (dayMatch) {
          const day = Number.parseInt(dayMatch[1])
          const year = new Date().getFullYear()
          return new Date(year, i, day)
        }
      }
    }

    return null
  }
}
