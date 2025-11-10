import { neon } from "@neondatabase/serverless"
import { ZohoService } from "@/lib/zoho-service"

const sql = neon(process.env.DATABASE_URL!)
const zohoService = new ZohoService()

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
  bookingData?: BookingData
}

export class BookingFlow {
  private monthMap: Record<string, number> = {
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

  private parseDate(input: string): Date | null {
    const lowerInput = input.toLowerCase().trim()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Formato 1: "3/10" o "03/10" (giorno/mese)
    const dateSlashMatch = lowerInput.match(/^(\d{1,2})\/(\d{1,2})$/)
    if (dateSlashMatch) {
      const day = Number.parseInt(dateSlashMatch[1])
      const month = Number.parseInt(dateSlashMatch[2]) - 1 // JavaScript months are 0-based
      const year = today.getFullYear()

      const parsedDate = new Date(year, month, day)
      parsedDate.setHours(0, 0, 0, 0)

      console.log(`📅 Input: "${input}" → day=${day}, month=${month + 1} (JS month=${month}), year=${year}`)
      console.log(`📅 Parsed Date: ${parsedDate.toISOString()}`)
      console.log(`📅 Display: ${parsedDate.getDate()}/${parsedDate.getMonth() + 1}/${parsedDate.getFullYear()}`)

      return parsedDate
    }

    // Formato 2: "3/10/2024" (giorno/mese/anno)
    const fullDateMatch = lowerInput.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
    if (fullDateMatch) {
      const day = Number.parseInt(fullDateMatch[1])
      const month = Number.parseInt(fullDateMatch[2]) - 1
      const year = Number.parseInt(fullDateMatch[3])

      const parsedDate = new Date(year, month, day)
      parsedDate.setHours(0, 0, 0, 0)

      console.log(`📅 Input: "${input}" → day=${day}, month=${month + 1}, year=${year}`)
      console.log(`📅 Parsed: ${parsedDate.toISOString()}`)

      return parsedDate
    }

    // Formato 3: "3 ottobre" o "3 dicembre"
    const textDateMatch = lowerInput.match(/^(\d{1,2})\s+(\w+)$/)
    if (textDateMatch) {
      const day = Number.parseInt(textDateMatch[1])
      const monthName = textDateMatch[2].toLowerCase()
      const month = this.monthMap[monthName]

      if (month !== undefined) {
        const year = today.getFullYear()
        const parsedDate = new Date(year, month, day)
        parsedDate.setHours(0, 0, 0, 0)

        console.log(`📅 Input: "${input}" → day=${day}, month=${monthName}(${month}), year=${year}`)
        console.log(`📅 Parsed: ${parsedDate.toISOString()}`)

        return parsedDate
      }
    }

    return null
  }

  private isWeekend(date: Date): boolean {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  private getTimeSlots(): string[] {
    const slots: string[] = []
    for (let hour = 9; hour < 12; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      slots.push(`${hour.toString().padStart(2, "0")}:30`)
    }
    for (let hour = 14; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      slots.push(`${hour.toString().padStart(2, "0")}:30`)
    }
    return slots
  }

  private async getAvailableSlots(date: string, serviceName: string): Promise<string[]> {
    try {
      const allSlots = this.getTimeSlots()

      console.log("[v0] Tentativo di recupero disponibilità da Zoho...")
      const zohoSlots = await zohoService.getAvailableSlots(date, serviceName)

      if (zohoSlots.length > 0) {
        console.log("[v0] Disponibilità recuperata da Zoho:", zohoSlots)
        return zohoSlots
      }

      // Fallback: usa il database locale se Zoho non risponde
      console.log("[v0] Zoho non ha restituito slot, fallback su database locale")
      const occupiedSlots = await sql`
        SELECT DISTINCT time 
        FROM appointments 
        WHERE date = ${date}
        AND status IN ('pending', 'confirmed')
      `
      const occupiedTimes = occupiedSlots.map((row) => row.time)
      const availableSlots = allSlots.filter((slot) => !occupiedTimes.includes(slot))

      console.log(`📅 Date: ${date}`)
      console.log(`⏰ Occupied: ${occupiedTimes.join(", ") || "none"}`)
      console.log(`✅ Available: ${availableSlots.join(", ")}`)

      return availableSlots
    } catch (error) {
      console.error("❌ Error checking slots:", error)
      return this.getTimeSlots()
    }
  }

  async handleBookingStep(
    sessionId: string,
    message: string,
    step: string,
    language: "it" | "en",
  ): Promise<BookingResponse> {
    const lowerMessage = message.toLowerCase().trim()

    let bookingData: BookingData = {}
    try {
      const sessionResult = await sql`
        SELECT booking_data FROM chat_sessions WHERE session_id = ${sessionId}
      `
      if (sessionResult.length > 0 && sessionResult[0].booking_data) {
        bookingData = sessionResult[0].booking_data as BookingData
      }
    } catch (error) {
      console.error("Error getting session:", error)
    }

    switch (step) {
      case "booking_start": {
        await sql`
          INSERT INTO chat_sessions (session_id, booking_mode, flow_step, booking_data, created_at)
          VALUES (${sessionId}, true, 'service_selection', ${JSON.stringify(bookingData)}, NOW())
          ON CONFLICT (session_id) 
          DO UPDATE SET booking_mode = true, flow_step = 'service_selection', booking_data = ${JSON.stringify(bookingData)}
        `

        const startMessage =
          language === "it"
            ? `📅 **PRENOTAZIONE CONSULENZA GRATUITA**

Perfetto! Ti aiuto a prenotare una consulenza gratuita.

**🎯 SERVIZI DISPONIBILI:**

1️⃣ **AI Automation** - Automazione processi aziendali
2️⃣ **Chatbot Intelligenti** - Assistenti virtuali 24/7
3️⃣ **Web Development** - Siti web e e-commerce
4️⃣ **AI Marketing** - Campagne automatizzate

**Quale servizio ti interessa?**
Scrivi il numero (1, 2, 3, 4) o il nome del servizio.`
            : `📅 **FREE CONSULTATION BOOKING**

Perfect! I'll help you book a free consultation.

**🎯 AVAILABLE SERVICES:**

1️⃣ **AI Automation** - Business process automation
2️⃣ **Intelligent Chatbots** - 24/7 virtual assistants
3️⃣ **Web Development** - Websites and e-commerce
4️⃣ **AI Marketing** - Automated campaigns

**Which service interests you?**
Write the number (1, 2, 3, 4) or service name.`

        return {
          message: startMessage,
          nextStep: "service_selection",
          completed: false,
        }
      }

      case "service_selection": {
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
          const retryMessage =
            language === "it"
              ? "❌ Servizio non riconosciuto. Scegli tra: 1️⃣ AI Automation, 2️⃣ Chatbot, 3️⃣ Web Development, 4️⃣ Marketing"
              : "❌ Service not recognized. Choose: 1️⃣ AI Automation, 2️⃣ Chatbot, 3️⃣ Web Development, 4️⃣ Marketing"

          return {
            message: retryMessage,
            nextStep: "service_selection",
            completed: false,
          }
        }

        bookingData.service = selectedService

        await sql`
          UPDATE chat_sessions 
          SET flow_step = 'date_selection', booking_data = ${JSON.stringify(bookingData)}
          WHERE session_id = ${sessionId}
        `

        const dateMessage =
          language === "it"
            ? `✅ **Servizio: ${selectedService}**

📅 **QUANDO VUOI PRENOTARE?**

Scrivi la data che preferisci:

📝 **Esempi:**
- **3/10** (3 ottobre)
- **20/12** (20 dicembre)  
- **25 dicembre**
- **15/01/2025**

⚠️ **Nota:** Lavoriamo solo **Lun-Ven** (no weekend)

**Quando vuoi prenotare?**`
            : `✅ **Service: ${selectedService}**

📅 **WHEN DO YOU WANT TO BOOK?**

Write your preferred date:

📝 **Examples:**
- **3/10** (October 3rd)
- **20/12** (December 20th)
- **December 25**
- **01/15/2025**

⚠️ **Note:** We work only **Mon-Fri** (no weekends)

**When do you want to book?**`

        return {
          message: dateMessage,
          nextStep: "date_selection",
          completed: false,
          bookingData,
        }
      }

      case "date_selection": {
        const parsedDate = this.parseDate(message)

        if (!parsedDate || isNaN(parsedDate.getTime())) {
          const errorMessage =
            language === "it"
              ? "❌ Data non valida. Scrivi nel formato: **3/10**, **20 dicembre**, o **25/12/2024**"
              : "❌ Invalid date. Write in format: **3/10**, **December 20**, or **12/25/2024**"

          return {
            message: errorMessage,
            nextStep: "date_selection",
            completed: false,
          }
        }

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (parsedDate < today) {
          const errorMessage =
            language === "it"
              ? "❌ Non puoi prenotare nel passato. Scegli una data futura."
              : "❌ You cannot book in the past. Choose a future date."

          return {
            message: errorMessage,
            nextStep: "date_selection",
            completed: false,
          }
        }

        if (this.isWeekend(parsedDate)) {
          const errorMessage =
            language === "it"
              ? `❌ **${parsedDate.toLocaleDateString("it-IT", { weekday: "long" })}** è nel weekend!

Lavoriamo solo **Lun-Ven**. Scegli un giorno lavorativo.`
              : `❌ **${parsedDate.toLocaleDateString("en-US", { weekday: "long" })}** is on weekend!

We work only **Mon-Fri**. Choose a working day.`

          return {
            message: errorMessage,
            nextStep: "date_selection",
            completed: false,
          }
        }

        // DOPO (CORRETTO):
        const year = parsedDate.getFullYear()
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
        const day = String(parsedDate.getDate()).padStart(2, "0")
        const formattedDate = `${year}-${month}-${day}`

        console.log(`✅ Formatted date for database: ${formattedDate}`)
        console.log(
          `📅 Verification: day=${parsedDate.getDate()}, month=${parsedDate.getMonth() + 1}, year=${parsedDate.getFullYear()}`,
        )

        bookingData.date = formattedDate

        console.log(`✅ Saving date to database: ${formattedDate}`)

        const availableSlots = await this.getAvailableSlots(formattedDate, bookingData.service!)

        const timeMessage =
          language === "it"
            ? `📅 **Data: ${parsedDate.toLocaleDateString("it-IT")}**

🕐 **ORARI DISPONIBILI:**

${
  availableSlots.filter((slot) => Number.parseInt(slot.split(":")[0]) < 12).length > 0
    ? `**🌅 MATTINA (9:00-12:00):**
${availableSlots
  .filter((slot) => Number.parseInt(slot.split(":")[0]) < 12)
  .map((slot, i) => `${i + 1}️⃣ ${slot}`)
  .join("\n")}`
    : "❌ Nessuno slot disponibile al mattino"
}

${
  availableSlots.filter((slot) => Number.parseInt(slot.split(":")[0]) >= 14).length > 0
    ? `**🌆 POMERIGGIO (14:00-18:00):**
${availableSlots
  .filter((slot) => Number.parseInt(slot.split(":")[0]) >= 14)
  .map((slot, i) => `${i + 1}️⃣ ${slot}`)
  .join("\n")}`
    : "❌ Nessuno slot disponibile al pomeriggio"
}

**Quale orario preferisci?**
Scrivi il numero o l'orario (es: "3" oppure "10:30")`
            : `📅 **Date: ${parsedDate.toLocaleDateString("en-US")}**

🕐 **AVAILABLE TIMES:**

${
  availableSlots.filter((slot) => Number.parseInt(slot.split(":")[0]) < 12).length > 0
    ? `**🌅 MORNING (9:00-12:00):**
${availableSlots
  .filter((slot) => Number.parseInt(slot.split(":")[0]) < 12)
  .map((slot, i) => `${i + 1}️⃣ ${slot}`)
  .join("\n")}`
    : "❌ No morning slots available"
}

${
  availableSlots.filter((slot) => Number.parseInt(slot.split(":")[0]) >= 14).length > 0
    ? `**🌆 AFTERNOON (14:00-18:00):**
${availableSlots
  .filter((slot) => Number.parseInt(slot.split(":")[0]) >= 14)
  .map((slot, i) => `${i + 1}️⃣ ${slot}`)
  .join("\n")}`
    : "❌ No afternoon slots available"
}

**Which time do you prefer?**
Write the number or time (e.g: "3" or "10:30")`

        return {
          message: timeMessage,
          nextStep: "time_selection",
          completed: false,
          bookingData,
        }
      }

      case "time_selection": {
        const availableSlots = await this.getAvailableSlots(bookingData.date!, bookingData.service!)
        let selectedTime = ""

        const timeMatch = message.match(/(\d{1,2}):(\d{2})/)
        if (timeMatch) {
          selectedTime = `${timeMatch[1].padStart(2, "0")}:${timeMatch[2]}`
        } else {
          const slotIndex = Number.parseInt(message) - 1
          if (slotIndex >= 0 && slotIndex < availableSlots.length) {
            selectedTime = availableSlots[slotIndex]
          }
        }

        if (!selectedTime || !availableSlots.includes(selectedTime)) {
          const errorMessage =
            language === "it"
              ? "❌ Orario non valido o già occupato. Scegli un orario dalla lista."
              : "❌ Invalid or occupied time. Choose a time from the list."

          return {
            message: errorMessage,
            nextStep: "time_selection",
            completed: false,
          }
        }

        bookingData.time = selectedTime

        await sql`
          UPDATE chat_sessions 
          SET flow_step = 'name_input', booking_data = ${JSON.stringify(bookingData)}
          WHERE session_id = ${sessionId}
        `

        const nameMessage =
          language === "it"
            ? `🕐 **Orario: ${selectedTime}** ✅

👤 **DATI DI CONTATTO**

**Come ti chiami?**

Scrivi il tuo nome e cognome (es: Mario Rossi):`
            : `🕐 **Time: ${selectedTime}** ✅

👤 **CONTACT INFORMATION**

**What's your name?**

Write your full name (e.g: Mario Rossi):`

        return {
          message: nameMessage,
          nextStep: "name_input",
          completed: false,
          bookingData,
        }
      }

      case "name_input": {
        const name = message.trim()

        if (name.length < 3) {
          const errorMessage =
            language === "it"
              ? "❌ Il nome deve essere almeno 3 caratteri. Scrivi nome e cognome:"
              : "❌ Name must be at least 3 characters. Write your full name:"

          return {
            message: errorMessage,
            nextStep: "name_input",
            completed: false,
          }
        }

        bookingData.name = name

        await sql`
          UPDATE chat_sessions 
          SET flow_step = 'email_input', booking_data = ${JSON.stringify(bookingData)}
          WHERE session_id = ${sessionId}
        `

        const emailMessage =
          language === "it"
            ? `✅ **Nome: ${name}**

📧 **Qual è la tua email?**

Scrivi il tuo indirizzo email (es: mario@email.com):`
            : `✅ **Name: ${name}**

📧 **What's your email?**

Write your email address (e.g: mario@email.com):`

        return {
          message: emailMessage,
          nextStep: "email_input",
          completed: false,
          bookingData,
        }
      }

      case "email_input": {
        const email = message.trim()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
          const errorMessage =
            language === "it"
              ? "❌ Email non valida. Scrivi un indirizzo email corretto (es: nome@email.com):"
              : "❌ Invalid email. Write a valid email address (e.g: name@email.com):"

          return {
            message: errorMessage,
            nextStep: "email_input",
            completed: false,
          }
        }

        bookingData.email = email

        await sql`
          UPDATE chat_sessions 
          SET flow_step = 'phone_input', booking_data = ${JSON.stringify(bookingData)}
          WHERE session_id = ${sessionId}
        `

        const phoneMessage =
          language === "it"
            ? `✅ **Email: ${email}**

📱 **Qual è il tuo numero di telefono?**

Scrivi il tuo telefono (es: +39 333 1234567):`
            : `✅ **Email: ${email}**

📱 **What's your phone number?**

Write your phone (e.g: +39 333 1234567):`

        return {
          message: phoneMessage,
          nextStep: "phone_input",
          completed: false,
          bookingData,
        }
      }

      case "phone_input": {
        const phone = message.trim()
        const phoneRegex = /^[+]?[\d\s\-()]{8,}$/

        if (!phoneRegex.test(phone)) {
          const errorMessage =
            language === "it"
              ? "❌ Telefono non valido. Scrivi un numero valido (es: +39 333 1234567):"
              : "❌ Invalid phone. Write a valid number (e.g: +39 333 1234567):"

          return {
            message: errorMessage,
            nextStep: "phone_input",
            completed: false,
          }
        }

        bookingData.phone = phone

        await sql`
          UPDATE chat_sessions 
          SET flow_step = 'message_input', booking_data = ${JSON.stringify(bookingData)}
          WHERE session_id = ${sessionId}
        `

        const messagePrompt =
          language === "it"
            ? `✅ **Telefono: ${phone}**

💬 **Vuoi aggiungere un messaggio? (opzionale)**

Descrivi brevemente il tuo progetto o scrivi "skip" per saltare:`
            : `✅ **Phone: ${phone}**

💬 **Want to add a message? (optional)**

Briefly describe your project or write "skip" to skip:`

        return {
          message: messagePrompt,
          nextStep: "message_input",
          completed: false,
          bookingData,
        }
      }

      case "message_input": {
        const userMessage = message.trim()

        if (lowerMessage !== "skip" && userMessage.length > 0) {
          bookingData.message = userMessage
        }

        await sql`
          UPDATE chat_sessions 
          SET flow_step = 'confirmation', booking_data = ${JSON.stringify(bookingData)}
          WHERE session_id = ${sessionId}
        `

        const confirmMessage =
          language === "it"
            ? `✅ **RIEPILOGO PRENOTAZIONE**

🎯 **Servizio:** ${bookingData.service}
📅 **Data:** ${bookingData.date}
🕐 **Orario:** ${bookingData.time}
👤 **Nome:** ${bookingData.name}
📧 **Email:** ${bookingData.email}
📱 **Telefono:** ${bookingData.phone}
${bookingData.message ? `💬 **Messaggio:** ${bookingData.message}` : ""}

**Tutto corretto?**

✅ Scrivi **"CONFERMA"** per completare
❌ Scrivi **"ANNULLA"** per ricominciare`
            : `✅ **BOOKING SUMMARY**

🎯 **Service:** ${bookingData.service}
📅 **Date:** ${bookingData.date}
🕐 **Time:** ${bookingData.time}
👤 **Name:** ${bookingData.name}
📧 **Email:** ${bookingData.email}
📱 **Phone:** ${bookingData.phone}
${bookingData.message ? `💬 **Message:** ${bookingData.message}` : ""}

**Everything correct?**

✅ Write **"CONFIRM"** to complete
❌ Write **"CANCEL"** to restart`

        return {
          message: confirmMessage,
          nextStep: "confirmation",
          completed: false,
          bookingData,
        }
      }

      case "confirmation": {
        if (lowerMessage.includes("conferma") || lowerMessage.includes("confirm")) {
          const availableSlots = await this.getAvailableSlots(bookingData.date!, bookingData.service!)
          if (!availableSlots.includes(bookingData.time!)) {
            const conflictMessage =
              language === "it"
                ? "❌ L'orario è stato appena prenotato da qualcun altro. Scegli un altro orario."
                : "❌ The time was just booked by someone else. Choose another time."

            await sql`
              UPDATE chat_sessions 
              SET flow_step = 'time_selection'
              WHERE session_id = ${sessionId}
            `

            return {
              message: conflictMessage,
              nextStep: "time_selection",
              completed: false,
            }
          }

          try {
            console.log(`💾 TENTATIVO 1: Prenotazione su Zoho Bookings...`)

            const zohoBookingId = await zohoService.bookAppointment({
              service: bookingData.service!,
              date: bookingData.date!,
              time: bookingData.time!,
              name: bookingData.name!,
              email: bookingData.email!,
              phone: bookingData.phone!,
              message: bookingData.message,
            })

            console.log(`✅ Zoho Booking successful. ID: ${zohoBookingId}`)

            await sql`
              INSERT INTO appointments (
                service, date, time, name, email, phone, message, status, priority, created_at
              ) VALUES (
                ${bookingData.service},
                ${bookingData.date},
                ${bookingData.time},
                ${bookingData.name},
                ${bookingData.email},
                ${bookingData.phone},
                ${bookingData.message || ""},
                'confirmed',
                false,
                NOW()
              )
            `

            await sql`
              UPDATE chat_sessions 
              SET booking_mode = false, flow_step = NULL, booking_data = NULL
              WHERE session_id = ${sessionId}
            `

            const successMessage =
              language === "it"
                ? `🎉 **PRENOTAZIONE CONFERMATA!**

✅ La tua consulenza è stata prenotata su Zoho Bookings!

📋 **Dettagli:**
🎯 Servizio: ${bookingData.service}
📅 Data: ${bookingData.date}
🕐 Orario: ${bookingData.time}

📧 Riceverai un'email di conferma a: ${bookingData.email}

**Grazie per aver scelto Praxis Futura!** 🌟`
                : `🎉 **BOOKING CONFIRMED!**

✅ Your consultation has been booked via Zoho Bookings!

📋 **Details:**
🎯 Service: ${bookingData.service}
📅 Date: ${bookingData.date}
🕐 Time: ${bookingData.time}

📧 You'll receive a confirmation email at: ${bookingData.email}

**Thank you for choosing Praxis Futura!** 🌟`

            return {
              message: successMessage,
              nextStep: null,
              completed: true,
              bookingData,
            }
          } catch (error: any) {
            if (error.message === "BOOKING_CONFLICT") {
              const conflictMessage =
                language === "it"
                  ? "❌ L'orario è stato appena prenotato da qualcun altro. Scegli un altro orario."
                  : "❌ The time was just booked by someone else. Choose another time."

              await sql`
                UPDATE chat_sessions 
                SET flow_step = 'time_selection'
                WHERE session_id = ${sessionId}
              `

              return {
                message: conflictMessage,
                nextStep: "time_selection",
                completed: false,
              }
            }

            // Errore generico
            const errorMessage =
              language === "it"
                ? "❌ Errore nel salvare la prenotazione su Zoho. Contattaci: info@praxisfutura.it"
                : "❌ Error saving booking to Zoho. Contact us: info@praxisfutura.it"

            return {
              message: errorMessage,
              nextStep: null,
              completed: true,
            }
          }
        } else if (lowerMessage.includes("annulla") || lowerMessage.includes("cancel")) {
          await sql`
            UPDATE chat_sessions 
            SET booking_mode = false, flow_step = NULL, booking_data = NULL
            WHERE session_id = ${sessionId}
          `

          const cancelMessage =
            language === "it"
              ? "❌ Prenotazione annullata. Scrivi 'prenota' per ricominciare."
              : "❌ Booking cancelled. Write 'book' to restart."

          return {
            message: cancelMessage,
            nextStep: null,
            completed: true,
          }
        } else {
          const retryMessage =
            language === "it"
              ? "❓ Scrivi **'CONFERMA'** per completare o **'ANNULLA'** per ricominciare."
              : "❓ Write **'CONFIRM'** to complete or **'CANCEL'** to restart."

          return {
            message: retryMessage,
            nextStep: "confirmation",
            completed: false,
          }
        }
      }

      default:
        return {
          message: "Errore nel flusso di prenotazione.",
          nextStep: null,
          completed: true,
        }
    }
  }
}
