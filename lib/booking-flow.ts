export interface BookingData {
  name: string
  email: string
  phone?: string
  service: string
  preferredDate?: string
  preferredTime?: string
  message?: string
}

export type BookingStep = "initial" | "name" | "email" | "phone" | "service" | "datetime" | "confirmation"

export interface BookingState {
  step: BookingStep
  data: Partial<BookingData>
  language: "it" | "en"
}

const translations = {
  it: {
    askName: "Perfetto! Per iniziare, come ti chiami?",
    askEmail: "Grazie {name}! Qual è il tuo indirizzo email?",
    askPhone: "Ottimo! Vuoi condividere il tuo numero di telefono? (opzionale)",
    askService:
      "Per quale servizio sei interessato?\n\n1. 🤖 AI Services\n2. 💻 Web Development\n3. 📊 AI Marketing\n4. 🎓 Formazione AI",
    askDateTime: "Quando preferiresti la consulenza? Indica data e ora preferite.",
    confirmation:
      "Perfetto! Ecco il riepilogo:\n\n👤 Nome: {name}\n📧 Email: {email}\n📱 Telefono: {phone}\n🎯 Servizio: {service}\n📅 Data/Ora: {datetime}\n\nConfermi la prenotazione?",
    success: "✅ Prenotazione confermata! Riceverai una email di conferma a breve.",
    invalidEmail: "L'email non sembra valida. Riprova.",
  },
  en: {
    askName: "Perfect! To get started, what's your name?",
    askEmail: "Thanks {name}! What's your email address?",
    askPhone: "Great! Would you like to share your phone number? (optional)",
    askService:
      "Which service are you interested in?\n\n1. 🤖 AI Services\n2. 💻 Web Development\n3. 📊 AI Marketing\n4. 🎓 AI Training",
    askDateTime: "When would you prefer the consultation? Please indicate your preferred date and time.",
    confirmation:
      "Perfect! Here's the summary:\n\n👤 Name: {name}\n📧 Email: {email}\n📱 Phone: {phone}\n🎯 Service: {service}\n📅 Date/Time: {datetime}\n\nConfirm booking?",
    success: "✅ Booking confirmed! You'll receive a confirmation email shortly.",
    invalidEmail: "The email doesn't seem valid. Please try again.",
  },
}

export function initializeBookingFlow(language: "it" | "en" = "it"): BookingState {
  return {
    step: "initial",
    data: {},
    language,
  }
}

export function processBookingStep(
  state: BookingState,
  userInput: string,
): { message: string; nextStep: BookingStep; completed: boolean } {
  const t = translations[state.language]

  switch (state.step) {
    case "initial":
      return {
        message: t.askName,
        nextStep: "name",
        completed: false,
      }

    case "name":
      state.data.name = userInput.trim()
      return {
        message: t.askEmail.replace("{name}", state.data.name),
        nextStep: "email",
        completed: false,
      }

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userInput.trim())) {
        return {
          message: t.invalidEmail,
          nextStep: "email",
          completed: false,
        }
      }
      state.data.email = userInput.trim()
      return {
        message: t.askPhone,
        nextStep: "phone",
        completed: false,
      }

    case "phone":
      if (userInput.trim().toLowerCase() !== "skip" && userInput.trim() !== "") {
        state.data.phone = userInput.trim()
      }
      return {
        message: t.askService,
        nextStep: "service",
        completed: false,
      }

    case "service":
      const serviceMap: Record<string, string> = {
        "1": "AI Services",
        "2": "Web Development",
        "3": "AI Marketing",
        "4": state.language === "it" ? "Formazione AI" : "AI Training",
      }
      state.data.service = serviceMap[userInput.trim()] || userInput.trim()
      return {
        message: t.askDateTime,
        nextStep: "datetime",
        completed: false,
      }

    case "datetime":
      state.data.preferredDate = userInput.trim()
      const confirmationMessage = t.confirmation
        .replace("{name}", state.data.name || "")
        .replace("{email}", state.data.email || "")
        .replace("{phone}", state.data.phone || "N/A")
        .replace("{service}", state.data.service || "")
        .replace("{datetime}", state.data.preferredDate || "")

      return {
        message: confirmationMessage,
        nextStep: "confirmation",
        completed: false,
      }

    case "confirmation":
      if (
        userInput.toLowerCase().includes("yes") ||
        userInput.toLowerCase().includes("sì") ||
        userInput.toLowerCase().includes("si")
      ) {
        return {
          message: t.success,
          nextStep: "initial",
          completed: true,
        }
      }
      return {
        message: t.askName,
        nextStep: "name",
        completed: false,
      }

    default:
      return {
        message: t.askName,
        nextStep: "name",
        completed: false,
      }
  }
}
