import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface BookingResponse {
  message: string
  completed: boolean
  nextStep?: string
}

export class BookingFlow {
  private services = {
    it: [
      { id: "ai-automation", name: "AI Automation" },
      { id: "chatbot", name: "Chatbot Intelligenti" },
      { id: "web-development", name: "Web Development" },
      { id: "ai-marketing", name: "AI Marketing" },
    ],
    en: [
      { id: "ai-automation", name: "AI Automation" },
      { id: "chatbot", name: "Intelligent Chatbots" },
      { id: "web-development", name: "Web Development" },
      { id: "ai-marketing", name: "AI Marketing" },
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
    userMessage: string,
    currentStep: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    console.log(`📝 Booking step: ${currentStep}, Message: ${userMessage}`)

    switch (currentStep) {
      case "booking_start":
        return this.startBooking(sessionId, language)

      case "awaiting_service":
        return this.handleServiceSelection(sessionId, userMessage, language)

      case "awaiting_date":
        return this.handleDateSelection(sessionId, userMessage, language)

      case "awaiting_time":
        return this.handleTimeSelection(sessionId, userMessage, language)

      case "awaiting_name":
        return this.handleNameInput(sessionId, userMessage, language)

      case "awaiting_email":
        return this.handleEmailInput(sessionId, userMessage, language)

      case "awaiting_phone":
        return this.handlePhoneInput(sessionId, userMessage, language)

      case "awaiting_message":
        return this.handleMessageInput(sessionId, userMessage, language)

      case "awaiting_confirmation":
        return this.handleConfirmation(sessionId, userMessage, language)

      default:
        return this.startBooking(sessionId, language)
    }
  }

  private async startBooking(sessionId: string, language: "it" | "en"): Promise<BookingResponse> {
    const services = this.services[language]

    const message =
      language === "it"
        ? `🎯 **Perfetto! Prenotiamo la tua consulenza gratuita!**

Per quale servizio vuoi la consulenza?

1️⃣ ${services[0].name}
2️⃣ ${services[1].name}
3️⃣ ${services[2].name}
4️⃣ ${services[3].name}

Scrivi il numero (1-4) o il nome del servizio. 👇`
        : `🎯 **Perfect! Let's book your free consultation!**

Which service would you like a consultation for?

1️⃣ ${services[0].name}
2️⃣ ${services[1].name}
3️⃣ ${services[2].name}
4️⃣ ${services[3].name}

Write the number (1-4) or the service name. 👇`

    // Create or update session
    await sql`
      INSERT INTO chat_sessions (session_id, booking_mode, flow_step, booking_data, updated_at)
      VALUES (${sessionId}, true, 'awaiting_service', '{}', NOW())
      ON CONFLICT (session_id)
      DO UPDATE SET booking_mode = true, flow_step = 'awaiting_service', updated_at = NOW()
    `

    return { message, completed: false, nextStep: "awaiting_service" }
  }

  private async handleServiceSelection(
    sessionId: string,
    userMessage: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const services = this.services[language]
    const lowerMessage = userMessage.toLowerCase().trim()

    let selectedService = null

    // Check for number
    if (["1", "2", "3", "4"].includes(lowerMessage)) {
      selectedService = services[Number.parseInt(lowerMessage) - 1]
    } else {
      // Check for service name
      selectedService = services.find((s) => lowerMessage.includes(s.name.toLowerCase()) || lowerMessage.includes(s.id))
    }

    if (!selectedService) {
      const message =
        language === "it"
          ? `❌ Non ho capito. Scegli un servizio scrivendo il numero (1-4) o il nome:

1️⃣ ${services[0].name}
2️⃣ ${services[1].name}
3️⃣ ${services[2].name}
4️⃣ ${services[3].name}`
          : `❌ I didn't understand. Choose a service by writing the number (1-4) or name:

1️⃣ ${services[0].name}
2️⃣ ${services[1].name}
3️⃣ ${services[2].name}
4️⃣ ${services[3].name}`

      return { message, completed: false, nextStep: "awaiting_service" }
    }

    // Save service selection
    await sql`
      UPDATE chat_sessions
      SET booking_data = jsonb_set(booking_data, '{service}', to_jsonb(${selectedService.id}::text)),
          flow_step = 'awaiting_date',
          updated_at = NOW()
      WHERE session_id = ${sessionId}
    `

    const message =
      language === "it"
        ? `✅ Perfetto! Hai scelto **${selectedService.name}**

📅 **Quando preferisci la consulenza?**

Scrivi la data nel formato:
• **20/12** o **20/12/2024**
• **20 dicembre**

⏰ Lavoriamo **Lun-Ven 9:00-18:00**
❌ Weekend non disponibili

Quale data preferisci? 📆`
        : `✅ Perfect! You chose **${selectedService.name}**

📅 **When would you prefer the consultation?**

Write the date in format:
• **20/12** or **20/12/2024**
• **20 December**

⏰ We work **Mon-Fri 9:00-18:00**
❌ Weekends not available

Which date do you prefer? 📆`

    return { message, completed: false, nextStep: "awaiting_date" }
  }

  private async handleDateSelection(
    sessionId: string,
    userMessage: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const parsedDate = this.parseDate(userMessage)

    if (!parsedDate) {
      const message =
        language === "it"
          ? `❌ **Formato data non valido!**

Scrivi la data in uno di questi formati:
• **20/12** o **20/12/2024**
• **20 dicembre**

Riprova: 📆`
          : `❌ **Invalid date format!**

Write the date in one of these formats:
• **20/12** or **20/12/2024**
• **20 December**

Try again: 📆`

      return { message, completed: false, nextStep: "awaiting_date" }
    }

    // Check if weekend
    const dayOfWeek = parsedDate.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      const message =
        language === "it"
          ? `❌ **Weekend non disponibile!**

⏰ Lavoriamo solo **Lun-Ven 9:00-18:00**

Scegli una data in settimana: 📅`
          : `❌ **Weekend not available!**

⏰ We only work **Mon-Fri 9:00-18:00**

Choose a weekday: 📅`

      return { message, completed: false, nextStep: "awaiting_date" }
    }

    // Check if past date
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (parsedDate < today) {
      const message =
        language === "it"
          ? `❌ **Non posso prenotare date passate!**

Scegli una data futura: 📅`
          : `❌ **Cannot book past dates!**

Choose a future date: 📅`

      return { message, completed: false, nextStep: "awaiting_date" }
    }

    // Format date for DB (YYYY-MM-DD)
    const formattedDate = parsedDate.toISOString().split("T")[0]

    // Get available time slots for this date
    const availableSlots = await this.getAvailableTimeSlots(formattedDate)

    if (availableSlots.length === 0) {
      const message =
        language === "it"
          ? `😔 **Tutti gli orari sono occupati per questa data!**

Prova con un'altra data: 📅`
          : `😔 **All time slots are booked for this date!**

Try another date: 📅`

      return { message, completed: false, nextStep: "awaiting_date" }
    }

    // Save date
    await sql`
      UPDATE chat_sessions
      SET booking_data = jsonb_set(booking_data, '{date}', to_jsonb(${formattedDate}::text)),
          flow_step = 'awaiting_time',
          updated_at = NOW()
      WHERE session_id = ${sessionId}
    `

    // Format date for display
    const displayDate = parsedDate.toLocaleDateString(language === "it" ? "it-IT" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })

    const slotsText = availableSlots.map((slot, idx) => `${idx + 1}. ${slot}`).join("\n")

    const message =
      language === "it"
        ? `✅ Data selezionata: **${displayDate}**

⏰ **Orari disponibili:**

${slotsText}

Scrivi il numero o l'orario che preferisci: 👇`
        : `✅ Date selected: **${displayDate}**

⏰ **Available times:**

${slotsText}

Write the number or time you prefer: 👇`

    return { message, completed: false, nextStep: "awaiting_time" }
  }

  private async handleTimeSelection(
    sessionId: string,
    userMessage: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    // Get session data
    const session = await sql`
      SELECT booking_data FROM chat_sessions WHERE session_id = ${sessionId}
    `

    if (!session.length) {
      return this.startBooking(sessionId, language)
    }

    const bookingData = session[0].booking_data
    const selectedDate = bookingData.date

    // Get available slots
    const availableSlots = await this.getAvailableTimeSlots(selectedDate)

    let selectedTime = null
    const lowerMessage = userMessage.toLowerCase().trim()

    // Check for number selection
    const slotNumber = Number.parseInt(lowerMessage)
    if (!isNaN(slotNumber) && slotNumber >= 1 && slotNumber <= availableSlots.length) {
      selectedTime = availableSlots[slotNumber - 1]
    } else {
      // Check for direct time format (09:00, 9:00, etc)
      const timeMatch = lowerMessage.match(/(\d{1,2}):?(\d{2})?/)
      if (timeMatch) {
        const hour = timeMatch[1].padStart(2, "0")
        const minute = timeMatch[2] || "00"
        const timeStr = `${hour}:${minute}`
        if (availableSlots.includes(timeStr)) {
          selectedTime = timeStr
        }
      }
    }

    if (!selectedTime) {
      const slotsText = availableSlots.map((slot, idx) => `${idx + 1}. ${slot}`).join("\n")

      const message =
        language === "it"
          ? `❌ Orario non valido o non disponibile!

Scegli uno di questi orari:

${slotsText}

Scrivi il numero o l'orario: 👇`
          : `❌ Invalid or unavailable time!

Choose one of these times:

${slotsText}

Write the number or time: 👇`

      return { message, completed: false, nextStep: "awaiting_time" }
    }

    // Double-check availability
    const isAvailable = await this.checkSlotAvailability(selectedDate, selectedTime)
    if (!isAvailable) {
      const message =
        language === "it"
          ? `😔 **Questo orario è stato appena prenotato!**

Scegli un altro orario disponibile: ⏰`
          : `😔 **This time slot was just booked!**

Choose another available time: ⏰`

      return { message, completed: false, nextStep: "awaiting_time" }
    }

    // Save time
    await sql`
      UPDATE chat_sessions
      SET booking_data = jsonb_set(booking_data, '{time}', to_jsonb(${selectedTime}::text)),
          flow_step = 'awaiting_name',
          updated_at = NOW()
      WHERE session_id = ${sessionId}
    `

    const message =
      language === "it"
        ? `✅ Orario confermato: **${selectedTime}**

👤 **Come ti chiami?**

Scrivi il tuo nome completo: 📝`
        : `✅ Time confirmed: **${selectedTime}**

👤 **What's your name?**

Write your full name: 📝`

    return { message, completed: false, nextStep: "awaiting_name" }
  }

  private async handleNameInput(
    sessionId: string,
    userMessage: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const name = userMessage.trim()

    if (name.length < 2) {
      const message =
        language === "it"
          ? `❌ Il nome sembra troppo corto!

Scrivi il tuo nome completo: 📝`
          : `❌ Name seems too short!

Write your full name: 📝`

      return { message, completed: false, nextStep: "awaiting_name" }
    }

    // Save name
    await sql`
      UPDATE chat_sessions
      SET booking_data = jsonb_set(booking_data, '{name}', to_jsonb(${name}::text)),
          flow_step = 'awaiting_email',
          updated_at = NOW()
      WHERE session_id = ${sessionId}
    `

    const message =
      language === "it"
        ? `✅ Ciao **${name}**!

📧 **Qual è la tua email?**

Scrivi la tua email: 📬`
        : `✅ Hi **${name}**!

📧 **What's your email?**

Write your email: 📬`

    return { message, completed: false, nextStep: "awaiting_email" }
  }

  private async handleEmailInput(
    sessionId: string,
    userMessage: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const email = userMessage.trim()

    if (!this.isValidEmail(email)) {
      const message =
        language === "it"
          ? `❌ Email non valida!

Scrivi una email corretta (es: nome@email.com): 📧`
          : `❌ Invalid email!

Write a valid email (e.g: name@email.com): 📧`

      return { message, completed: false, nextStep: "awaiting_email" }
    }

    // Save email
    await sql`
      UPDATE chat_sessions
      SET booking_data = jsonb_set(booking_data, '{email}', to_jsonb(${email}::text)),
          flow_step = 'awaiting_phone',
          updated_at = NOW()
      WHERE session_id = ${sessionId}
    `

    const message =
      language === "it"
        ? `✅ Email salvata: **${email}**

📱 **Qual è il tuo numero di telefono?**

Scrivi il tuo telefono: 📞`
        : `✅ Email saved: **${email}**

📱 **What's your phone number?**

Write your phone: 📞`

    return { message, completed: false, nextStep: "awaiting_phone" }
  }

  private async handlePhoneInput(
    sessionId: string,
    userMessage: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const phone = userMessage.trim()

    if (!this.isValidPhone(phone)) {
      const message =
        language === "it"
          ? `❌ Telefono non valido!

Scrivi un numero valido (es: +39 123 456 7890): 📱`
          : `❌ Invalid phone!

Write a valid number (e.g: +39 123 456 7890): 📱`

      return { message, completed: false, nextStep: "awaiting_phone" }
    }

    // Save phone
    await sql`
      UPDATE chat_sessions
      SET booking_data = jsonb_set(booking_data, '{phone}', to_jsonb(${phone}::text)),
          flow_step = 'awaiting_message',
          updated_at = NOW()
      WHERE session_id = ${sessionId}
    `

    const message =
      language === "it"
        ? `✅ Telefono salvato: **${phone}**

💬 **Vuoi aggiungere un messaggio? (Opzionale)**

Descrivi brevemente il tuo progetto o scrivi "salta": ✍️`
        : `✅ Phone saved: **${phone}**

💬 **Want to add a message? (Optional)**

Briefly describe your project or write "skip": ✍️`

    return { message, completed: false, nextStep: "awaiting_message" }
  }

  private async handleMessageInput(
    sessionId: string,
    userMessage: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const message =
      userMessage.toLowerCase().trim() === "salta" || userMessage.toLowerCase().trim() === "skip"
        ? ""
        : userMessage.trim()

    // Save message
    await sql`
      UPDATE chat_sessions
      SET booking_data = jsonb_set(booking_data, '{message}', to_jsonb(${message}::text)),
          flow_step = 'awaiting_confirmation',
          updated_at = NOW()
      WHERE session_id = ${sessionId}
    `

    // Get complete booking data
    const session = await sql`
      SELECT booking_data FROM chat_sessions WHERE session_id = ${sessionId}
    `

    const bookingData = session[0].booking_data

    // Format date for display
    const dateObj = new Date(bookingData.date + "T00:00:00")
    const displayDate = dateObj.toLocaleDateString(language === "it" ? "it-IT" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    const confirmMessage =
      language === "it"
        ? `📋 **RIEPILOGO PRENOTAZIONE**

✅ **Servizio**: ${bookingData.service}
📅 **Data**: ${displayDate}
⏰ **Ora**: ${bookingData.time}
👤 **Nome**: ${bookingData.name}
📧 **Email**: ${bookingData.email}
📱 **Telefono**: ${bookingData.phone}
${message ? `💬 **Messaggio**: ${message}` : ""}

✅ Confermi la prenotazione? (Scrivi "SI" o "NO") 🎯`
        : `📋 **BOOKING SUMMARY**

✅ **Service**: ${bookingData.service}
📅 **Date**: ${displayDate}
⏰ **Time**: ${bookingData.time}
👤 **Name**: ${bookingData.name}
📧 **Email**: ${bookingData.email}
📱 **Phone**: ${bookingData.phone}
${message ? `💬 **Message**: ${message}` : ""}

✅ Confirm booking? (Write "YES" or "NO") 🎯`

    return { message: confirmMessage, completed: false, nextStep: "awaiting_confirmation" }
  }

  private async handleConfirmation(
    sessionId: string,
    userMessage: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const lowerMessage = userMessage.toLowerCase().trim()

    if (lowerMessage === "no" || lowerMessage === "annulla" || lowerMessage === "cancel") {
      // Reset booking
      await sql`
        UPDATE chat_sessions
        SET booking_mode = false, flow_step = null, booking_data = '{}'
        WHERE session_id = ${sessionId}
      `

      const message =
        language === "it"
          ? `❌ Prenotazione annullata!

Vuoi riprenotare? Scrivi "prenota" 📅`
          : `❌ Booking cancelled!

Want to rebook? Write "book" 📅`

      return { message, completed: true }
    }

    if (lowerMessage !== "si" && lowerMessage !== "sì" && lowerMessage !== "yes") {
      const message =
        language === "it"
          ? `❓ Scrivi "SI" per confermare o "NO" per annullare: 👇`
          : `❓ Write "YES" to confirm or "NO" to cancel: 👇`

      return { message, completed: false, nextStep: "awaiting_confirmation" }
    }

    // Get booking data
    const session = await sql`
      SELECT booking_data FROM chat_sessions WHERE session_id = ${sessionId}
    `

    const bookingData = session[0].booking_data

    // Final availability check
    const isAvailable = await this.checkSlotAvailability(bookingData.date, bookingData.time)
    if (!isAvailable) {
      const message =
        language === "it"
          ? `😔 **Questo orario è stato appena prenotato da qualcun altro!**

Vuoi scegliere un altro orario? Scrivi "SI" 📅`
          : `😔 **This time slot was just booked by someone else!**

Want to choose another time? Write "YES" 📅`

      return { message, completed: true }
    }

    // Save to database
    try {
      const result = await sql`
        INSERT INTO appointments (
          name, email, phone, service, date, time, message, status, created_at
        ) VALUES (
          ${bookingData.name},
          ${bookingData.email},
          ${bookingData.phone},
          ${bookingData.service},
          ${bookingData.date},
          ${bookingData.time},
          ${bookingData.message || ""},
          'pending',
          NOW()
        )
        RETURNING id
      `

      const appointmentId = result[0].id

      // Reset session
      await sql`
        UPDATE chat_sessions
        SET booking_mode = false, flow_step = null, booking_data = '{}'
        WHERE session_id = ${sessionId}
      `

      const message =
        language === "it"
          ? `🎉 **PRENOTAZIONE CONFERMATA!**

✅ **ID Prenotazione**: #${appointmentId}
📧 Ti abbiamo inviato una email di conferma

📞 Ti contatteremo prima dell'appuntamento per confermare.

**Cosa succede ora?**
1. ✅ Riceverai email di conferma
2. 📞 Ti richiameremo per confermare
3. 📅 L'appuntamento verrà aggiunto al calendario

Grazie per aver scelto Digital Aura! 🚀

Hai altre domande? 💡`
          : `🎉 **BOOKING CONFIRMED!**

✅ **Booking ID**: #${appointmentId}
📧 We sent you a confirmation email

📞 We'll contact you before the appointment to confirm.

**What happens now?**
1. ✅ You'll receive confirmation email
2. 📞 We'll call you to confirm
3. 📅 Appointment will be added to calendar

Thank you for choosing Digital Aura! 🚀

Any other questions? 💡`

      return { message, completed: true }
    } catch (error) {
      console.error("Error saving appointment:", error)

      const message =
        language === "it"
          ? `❌ Errore nel salvare la prenotazione!

Riprova o contattaci: info@digitalaura.it 📧`
          : `❌ Error saving booking!

Try again or contact us: info@digitalaura.it 📧`

      return { message, completed: true }
    }
  }

  // Helper methods
  private parseDate(input: string): Date | null {
    const cleaned = input.trim().toLowerCase()

    // Italian month names
    const italianMonths: Record<string, number> = {
      gennaio: 0,
      febbraio: 1,
      marzo: 2,
      aprile: 3,
      maggio: 4,
      giugno: 5,
      luglio: 6,
      agosto: 7,
      settembre: 8,
      ottobre: 9,
      novembre: 10,
      dicembre: 11,
    }

    // English month names
    const englishMonths: Record<string, number> = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
    }

    // Try format: "20 dicembre" or "20 december"
    const textMatch = cleaned.match(/(\d{1,2})\s+([a-z]+)/)
    if (textMatch) {
      const day = Number.parseInt(textMatch[1])
      const monthName = textMatch[2]
      const month = italianMonths[monthName] ?? englishMonths[monthName]

      if (month !== undefined) {
        const year = new Date().getFullYear()
        const date = new Date(year, month, day)
        if (date.getMonth() === month && date.getDate() === day) {
          return date
        }
      }
    }

    // Try format: "20/12" or "20/12/2024"
    const slashMatch = cleaned.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/)
    if (slashMatch) {
      const day = Number.parseInt(slashMatch[1])
      const month = Number.parseInt(slashMatch[2]) - 1
      const year = slashMatch[3] ? Number.parseInt(slashMatch[3]) : new Date().getFullYear()

      const date = new Date(year, month, day)
      if (date.getMonth() === month && date.getDate() === day) {
        return date
      }
    }

    return null
  }

  private async getAvailableTimeSlots(date: string): Promise<string[]> {
    // Get booked slots for this date
    const booked = await sql`
      SELECT DISTINCT time
      FROM appointments
      WHERE date = ${date}
      AND status IN ('pending', 'confirmed')
    `

    const bookedTimes = booked.map((row: any) => row.time)

    // Return available slots
    return this.timeSlots.filter((slot) => !bookedTimes.includes(slot))
  }

  private async checkSlotAvailability(date: string, time: string): Promise<boolean> {
    const result = await sql`
      SELECT COUNT(*) as count
      FROM appointments
      WHERE date = ${date}
      AND time = ${time}
      AND status IN ('pending', 'confirmed')
    `

    return result[0].count === 0
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private isValidPhone(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-$$$$]/g, "")
    return cleaned.length >= 8 && /^[+]?[\d]+$/.test(cleaned)
  }
}
