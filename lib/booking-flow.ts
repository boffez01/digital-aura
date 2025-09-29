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
  availableSlots?: string[]
}

interface BookingResponse {
  message: string
  nextStep?: string
  completed?: boolean
}

export class BookingFlow {
  private async getSessionData(sessionId: string): Promise<BookingData> {
    try {
      const result = await sql`
        SELECT booking_data 
        FROM chat_sessions 
        WHERE session_id = ${sessionId}
      `

      if (result.length > 0 && result[0].booking_data) {
        const bookingData = result[0].booking_data

        // Handle different data types
        if (typeof bookingData === "string") {
          try {
            return JSON.parse(bookingData)
          } catch (parseError) {
            console.error("Error parsing booking_data JSON:", parseError)
            return {}
          }
        } else if (typeof bookingData === "object" && bookingData !== null) {
          return bookingData as BookingData
        }
      }
      return {}
    } catch (error) {
      console.error("Error getting session data:", error)
      return {}
    }
  }

  private async updateSessionData(sessionId: string, data: BookingData, step: string): Promise<void> {
    try {
      // Ensure we're storing as JSONB
      const jsonData = JSON.stringify(data)

      await sql`
        INSERT INTO chat_sessions (session_id, booking_data, flow_step, booking_mode, created_at, updated_at)
        VALUES (${sessionId}, ${jsonData}::jsonb, ${step}, true, NOW(), NOW())
        ON CONFLICT (session_id) 
        DO UPDATE SET 
          booking_data = ${jsonData}::jsonb,
          flow_step = ${step},
          booking_mode = true,
          updated_at = NOW()
      `

      console.log(`✅ Session updated: ${sessionId}, Step: ${step}`)
    } catch (error) {
      console.error("Error updating session data:", error)
    }
  }

  private async clearSession(sessionId: string): Promise<void> {
    try {
      await sql`
        UPDATE chat_sessions 
        SET booking_mode = false, flow_step = null, booking_data = null
        WHERE session_id = ${sessionId}
      `
      console.log(`🧹 Session cleared: ${sessionId}`)
    } catch (error) {
      console.error("Error clearing session:", error)
    }
  }

  private async checkTimeSlotAvailability(date: string, time: string): Promise<boolean> {
    try {
      console.log(`🔍 Checking availability for ${date} at ${time}`)

      const existingAppointments = await sql`
        SELECT id, name, time, status 
        FROM appointments 
        WHERE date = ${date} 
        AND time = ${time}
        AND status IN ('pending', 'confirmed')
      `

      const isAvailable = existingAppointments.length === 0

      console.log(`📊 Slot ${date} ${time}: ${isAvailable ? "AVAILABLE" : "OCCUPIED"}`)
      if (!isAvailable) {
        console.log(`❌ Occupied by: ${existingAppointments[0].name}`)
      }

      return isAvailable
    } catch (error) {
      console.error("❌ Error checking slot availability:", error)
      return true // Default to available if check fails
    }
  }

  private async getAvailableTimeSlots(date: string): Promise<string[]> {
    try {
      console.log(`🔍 Getting available slots for ${date}`)

      // All possible time slots
      const allSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"]

      // Get occupied slots
      const occupiedSlots = await sql`
        SELECT DISTINCT time 
        FROM appointments 
        WHERE date = ${date} 
        AND status IN ('pending', 'confirmed')
      `

      const occupiedTimes = occupiedSlots.map((slot: any) => {
        // Normalize time format (remove seconds if present)
        let timeStr = slot.time.toString()
        if (timeStr.length > 5) {
          timeStr = timeStr.substring(0, 5)
        }
        return timeStr
      })

      console.log(`📊 Occupied slots for ${date}:`, occupiedTimes)

      // Filter available slots
      const availableSlots = allSlots.filter((slot) => !occupiedTimes.includes(slot))

      console.log(`✅ Available slots for ${date}:`, availableSlots)
      return availableSlots
    } catch (error) {
      console.error("❌ Error getting available slots:", error)
      return ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"]
    }
  }

  private formatTimeSlot(startTime: string): string {
    const [hours, minutes] = startTime.split(":").map(Number)

    // Calculate end time (30 minutes later)
    let endHours = hours
    let endMinutes = minutes + 30

    // Handle minute overflow
    if (endMinutes >= 60) {
      endMinutes -= 60
      endHours += 1
    }

    const endTime = `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`

    return `${startTime} - ${endTime}`
  }

  async handleBookingStep(
    sessionId: string,
    message: string,
    currentStep: string,
    language = "it",
  ): Promise<BookingResponse> {
    console.log(`📅 Booking Step: ${currentStep}, Message: "${message}", Session: ${sessionId}`)

    const bookingData = await this.getSessionData(sessionId)
    const lowerMessage = message.toLowerCase().trim()

    switch (currentStep) {
      case "booking_start":
        await this.updateSessionData(sessionId, {}, "booking_service")
        return {
          message:
            "🎯 **PERFETTO! INIZIAMO LA PRENOTAZIONE**\n\n**Quale servizio ti interessa?**\n\n1️⃣ **AI Automation** - Automatizza i processi aziendali\n2️⃣ **Chatbot Intelligenti** - Assistenti virtuali 24/7\n3️⃣ **Web Development** - Siti web e e-commerce moderni\n4️⃣ **AI Marketing** - Campagne automatizzate\n\n💬 **Scrivi il numero (1-4) o il nome del servizio**",
          nextStep: "booking_service",
        }

      case "booking_service":
        let selectedService = ""

        if (
          lowerMessage.includes("1") ||
          lowerMessage.includes("ai automation") ||
          lowerMessage.includes("automazione")
        ) {
          selectedService = "AI Automation"
        } else if (lowerMessage.includes("2") || lowerMessage.includes("chatbot")) {
          selectedService = "Chatbot Intelligenti"
        } else if (lowerMessage.includes("3") || lowerMessage.includes("web") || lowerMessage.includes("sviluppo")) {
          selectedService = "Web Development"
        } else if (lowerMessage.includes("4") || lowerMessage.includes("marketing")) {
          selectedService = "AI Marketing"
        } else {
          return {
            message:
              "❌ **Selezione non valida**\n\nPer favore scegli:\n1️⃣ AI Automation\n2️⃣ Chatbot Intelligenti\n3️⃣ Web Development\n4️⃣ AI Marketing\n\n💬 **Scrivi il numero (1-4)**",
            nextStep: "booking_service",
          }
        }

        const updatedData1 = { ...bookingData, service: selectedService }
        await this.updateSessionData(sessionId, updatedData1, "booking_date")

        return {
          message: `✅ **Perfetto! Hai scelto: ${selectedService}**\n\n📅 **Quando preferisci la consulenza?**\n\n1️⃣ **Oggi** - Disponibilità immediata\n2️⃣ **Domani** - Prossimo giorno lavorativo\n3️⃣ **Data specifica** - Scegli tu la data\n\n💬 **Scrivi il numero (1-3) o una data (es: 20/12/2024)**`,
          nextStep: "booking_date",
        }

      case "booking_date":
        let selectedDate = ""
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        if (lowerMessage.includes("1") || lowerMessage.includes("oggi")) {
          selectedDate = today.toISOString().split("T")[0]
        } else if (lowerMessage.includes("2") || lowerMessage.includes("domani")) {
          selectedDate = tomorrow.toISOString().split("T")[0]
        } else if (lowerMessage.includes("3") || lowerMessage.includes("/")) {
          // Try to parse date
          const dateMatch = message.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/)
          if (dateMatch) {
            const [, day, month, year] = dateMatch
            const parsedDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
            if (parsedDate > today) {
              selectedDate = parsedDate.toISOString().split("T")[0]
            } else {
              return {
                message:
                  "❌ **Data non valida**\n\nLa data deve essere futura. Riprova con:\n1️⃣ Oggi\n2️⃣ Domani\n3️⃣ Data specifica (es: 25/12/2024)",
                nextStep: "booking_date",
              }
            }
          } else {
            return {
              message:
                "❌ **Formato data non valido**\n\nUsa il formato GG/MM/AAAA (es: 25/12/2024) o scegli:\n1️⃣ Oggi\n2️⃣ Domani",
              nextStep: "booking_date",
            }
          }
        } else {
          return {
            message: "❌ **Selezione non valida**\n\nScegli:\n1️⃣ Oggi\n2️⃣ Domani\n3️⃣ Data specifica (es: 25/12/2024)",
            nextStep: "booking_date",
          }
        }

        // Get available time slots for the selected date
        const availableSlots = await this.getAvailableTimeSlots(selectedDate)

        if (availableSlots.length === 0) {
          return {
            message: `❌ **Nessun orario disponibile per ${new Date(selectedDate).toLocaleDateString("it-IT")}**\n\nTutti gli slot sono già occupati. Per favore scegli un'altra data:\n\n1️⃣ Oggi\n2️⃣ Domani\n3️⃣ Data specifica (es: 25/12/2024)`,
            nextStep: "booking_date",
          }
        }

        const updatedData2 = { ...bookingData, date: selectedDate }
        await this.updateSessionData(sessionId, updatedData2, "booking_time")

        const formattedDate = new Date(selectedDate).toLocaleDateString("it-IT")

        // Build time slots message with only available slots and correct time calculation
        let timeMessage = `✅ **Data selezionata: ${formattedDate}**\n\n🕐 **Orari disponibili:**\n\n`

        const morningSlots = availableSlots.filter((slot) => Number.parseInt(slot.split(":")[0]) < 12)
        const afternoonSlots = availableSlots.filter((slot) => Number.parseInt(slot.split(":")[0]) >= 14)

        if (morningSlots.length > 0) {
          timeMessage += "**MATTINA:**\n"
          morningSlots.forEach((slot, index) => {
            timeMessage += `${index + 1}️⃣ ${this.formatTimeSlot(slot)}\n`
          })
          timeMessage += "\n"
        }

        if (afternoonSlots.length > 0) {
          timeMessage += "**POMERIGGIO:**\n"
          afternoonSlots.forEach((slot, index) => {
            const slotNumber = morningSlots.length + index + 1
            timeMessage += `${slotNumber}️⃣ ${this.formatTimeSlot(slot)}\n`
          })
        }

        timeMessage += `\n💬 **Scrivi il numero (1-${availableSlots.length})**`

        // Store available slots for validation
        const updatedData2WithSlots = { ...updatedData2, availableSlots }
        await this.updateSessionData(sessionId, updatedData2WithSlots, "booking_time")

        return {
          message: timeMessage,
          nextStep: "booking_time",
        }

      case "booking_time":
        const availableSlotsFromData = bookingData.availableSlots || []

        if (availableSlotsFromData.length === 0) {
          return {
            message:
              "❌ **Errore nel recupero degli orari disponibili**\n\nRicominciamo dalla selezione della data. Scrivi 'prenota' per riiniziare.",
            completed: true,
          }
        }

        let selectedTimeIndex = -1

        // Parse the selected slot number
        for (let i = 1; i <= availableSlotsFromData.length; i++) {
          if (lowerMessage.includes(i.toString()) && !lowerMessage.includes((i + 10).toString())) {
            selectedTimeIndex = i - 1
            break
          }
        }

        if (selectedTimeIndex === -1 || selectedTimeIndex >= availableSlotsFromData.length) {
          return {
            message: `❌ **Orario non valido**\n\nScegli un numero da 1 a ${availableSlotsFromData.length} per selezionare l'orario desiderato.`,
            nextStep: "booking_time",
          }
        }

        const selectedTime = availableSlotsFromData[selectedTimeIndex]

        // Double-check availability before proceeding
        const isStillAvailable = await this.checkTimeSlotAvailability(bookingData.date!, selectedTime)

        if (!isStillAvailable) {
          return {
            message: `❌ **Orario appena occupato**\n\nMi dispiace, l'orario ${selectedTime} è stato appena prenotato da qualcun altro.\n\n🔄 **Scegli un altro orario dalla lista precedente**`,
            nextStep: "booking_time",
          }
        }

        const updatedData3 = { ...bookingData, time: selectedTime }
        // Remove availableSlots from stored data as it's no longer needed
        delete updatedData3.availableSlots
        await this.updateSessionData(sessionId, updatedData3, "booking_name")

        return {
          message: `✅ **Orario selezionato: ${this.formatTimeSlot(selectedTime)}**\n\n👤 **Perfetto! Ora ho bisogno dei tuoi dati di contatto.**\n\n**Come ti chiami?**\n\n💬 **Scrivi il tuo nome completo**`,
          nextStep: "booking_name",
        }

      case "booking_name":
        const name = message.trim()

        if (name.length < 2) {
          return {
            message: "❌ **Nome troppo corto**\n\nPer favore inserisci il tuo nome completo.",
            nextStep: "booking_name",
          }
        }

        const updatedData4 = { ...bookingData, name }
        await this.updateSessionData(sessionId, updatedData4, "booking_email")

        return {
          message: `✅ **Ciao ${name}! Piacere di conoscerti!**\n\n📧 **Qual è il tuo indirizzo email?**\n\n💬 **Scrivi la tua email (es: nome@email.com)**`,
          nextStep: "booking_email",
        }

      case "booking_email":
        const email = message.trim().toLowerCase()

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          return {
            message: "❌ **Email non valida**\n\nInserisci un indirizzo email valido (es: nome@email.com)",
            nextStep: "booking_email",
          }
        }

        const updatedData5 = { ...bookingData, email }
        await this.updateSessionData(sessionId, updatedData5, "booking_phone")

        return {
          message: `✅ **Email salvata: ${email}**\n\n📱 **Qual è il tuo numero di telefono?**\n\n💬 **Scrivi il tuo numero (es: +39 333 1234567)**`,
          nextStep: "booking_phone",
        }

      case "booking_phone":
        const phone = message.trim()

        if (phone.length < 8) {
          return {
            message:
              "❌ **Numero di telefono troppo corto**\n\nInserisci un numero di telefono valido (es: +39 333 1234567)",
            nextStep: "booking_phone",
          }
        }

        const updatedData6 = { ...bookingData, phone }
        await this.updateSessionData(sessionId, updatedData6, "booking_message")

        return {
          message: `✅ **Numero salvato: ${phone}**\n\n💬 **Hai qualche richiesta specifica o messaggio per noi?**\n\n📝 **Scrivi eventuali note, domande o dettagli sul progetto**\n\n⏭️ **Oppure scrivi 'nessun messaggio' per continuare**`,
          nextStep: "booking_message",
        }

      case "booking_message":
        let userMessage = message.trim()

        if (
          lowerMessage.includes("nessun messaggio") ||
          lowerMessage.includes("no") ||
          lowerMessage.includes("niente")
        ) {
          userMessage = "Nessun messaggio aggiuntivo"
        }

        const updatedData7 = { ...bookingData, message: userMessage }
        await this.updateSessionData(sessionId, updatedData7, "booking_confirm")

        const confirmDate = new Date(updatedData7.date!).toLocaleDateString("it-IT")
        return {
          message: `📋 **RIEPILOGO PRENOTAZIONE**\n\n✅ **Servizio:** ${updatedData7.service}\n📅 **Data:** ${confirmDate}\n🕐 **Orario:** ${this.formatTimeSlot(updatedData7.time!)}\n👤 **Nome:** ${updatedData7.name}\n📧 **Email:** ${updatedData7.email}\n📱 **Telefono:** ${updatedData7.phone}\n💬 **Messaggio:** ${updatedData7.message}\n\n**Confermi la prenotazione?**\n\n✅ **Scrivi 'CONFERMA' per completare**\n❌ **Scrivi 'ANNULLA' per ricominciare**`,
          nextStep: "booking_confirm",
        }

      case "booking_confirm":
        if (lowerMessage.includes("conferma") || lowerMessage.includes("si") || lowerMessage.includes("sì")) {
          // Final availability check before saving
          const finalCheck = await this.checkTimeSlotAvailability(bookingData.date!, bookingData.time!)

          if (!finalCheck) {
            return {
              message: `❌ **Orario appena occupato**\n\nMi dispiace, l'orario ${this.formatTimeSlot(bookingData.time!)} del ${new Date(bookingData.date!).toLocaleDateString("it-IT")} è stato appena prenotato.\n\n🔄 **Vuoi scegliere un altro orario?**\nScrivi 'prenota' per ricominciare.`,
              completed: true,
            }
          }

          try {
            // Save to database
            const result = await sql`
              INSERT INTO appointments (
                name, email, phone, service, date, time, message, status, priority
              ) VALUES (
                ${bookingData.name}, ${bookingData.email}, ${bookingData.phone}, 
                ${bookingData.service}, ${bookingData.date}, ${bookingData.time}, 
                ${bookingData.message || "Nessun messaggio"}, 'pending', false
              )
              RETURNING id
            `

            await this.clearSession(sessionId)

            const appointmentId = result[0].id
            const confirmDate = new Date(bookingData.date!).toLocaleDateString("it-IT")

            return {
              message: `🎉 **PRENOTAZIONE CONFERMATA!**\n\n✅ **ID Prenotazione:** #${appointmentId}\n📅 **Data:** ${confirmDate}\n🕐 **Orario:** ${this.formatTimeSlot(bookingData.time!)}\n🎯 **Servizio:** ${bookingData.service}\n\n📧 **Riceverai una email di conferma a:** ${bookingData.email}\n\n📞 **Ti contatteremo entro 24 ore per:**\n• Confermare l'appuntamento\n• Inviarti il link per la videochiamata\n• Prepararci al meglio per la consulenza\n\n🚀 **Grazie per aver scelto Digital Aura!**\n\n💬 **Hai altre domande? Sono sempre qui per aiutarti!**`,
              completed: true,
            }
          } catch (error) {
            console.error("Error saving appointment:", error)
            return {
              message:
                "❌ **Errore nel salvare la prenotazione**\n\nSi è verificato un problema tecnico. Per favore:\n\n📞 **Contattaci direttamente:**\n📧 Email: info@digitalaura.it\n📱 WhatsApp: +39 333 1234567\n\n**Oppure riprova la prenotazione scrivendo 'prenota'**",
              completed: true,
            }
          }
        } else if (lowerMessage.includes("annulla") || lowerMessage.includes("no")) {
          await this.clearSession(sessionId)
          return {
            message:
              "❌ **Prenotazione annullata**\n\n🔄 **Vuoi riprovare?**\nScrivi 'prenota' per iniziare una nuova prenotazione\n\n💬 **Oppure dimmi come posso aiutarti!**",
            completed: true,
          }
        } else {
          return {
            message:
              "❓ **Conferma richiesta**\n\n✅ **Scrivi 'CONFERMA' per completare la prenotazione**\n❌ **Scrivi 'ANNULLA' per annullare**",
            nextStep: "booking_confirm",
          }
        }

      default:
        await this.clearSession(sessionId)
        return {
          message:
            "❌ **Errore nel processo di prenotazione**\n\nRicominciamo da capo. Scrivi 'prenota' per iniziare una nuova prenotazione.",
          completed: true,
        }
    }
  }
}
