export interface SupportTicket {
  id: string
  name: string
  email: string
  category: string
  description: string
  priority: "low" | "medium" | "high"
  status: "open" | "in-progress" | "resolved"
  createdAt: Date
}

export type SupportStep = "initial" | "name" | "email" | "category" | "description" | "confirmation"

export interface SupportState {
  step: SupportStep
  data: Partial<SupportTicket>
  language: "it" | "en"
}

const translations = {
  it: {
    askName: "Mi dispiace per il problema. Come ti chiami?",
    askEmail: "Grazie {name}. Qual è il tuo indirizzo email?",
    askCategory:
      "Che tipo di problema stai riscontrando?\n\n1. 🔧 Problema Tecnico\n2. 💳 Fatturazione\n3. 📦 Servizio/Prodotto\n4. ❓ Altro",
    askDescription: "Descrivi il problema in dettaglio. Più informazioni fornisci, meglio possiamo aiutarti.",
    confirmation:
      "Grazie per le informazioni. Ecco il riepilogo del ticket:\n\n👤 Nome: {name}\n📧 Email: {email}\n🏷️ Categoria: {category}\n📝 Descrizione: {description}\n\nIl nostro team ti contatterà entro 24 ore.",
    success: "✅ Ticket #{ticketId} creato con successo! Riceverai aggiornamenti via email.",
  },
  en: {
    askName: "Sorry about the issue. What's your name?",
    askEmail: "Thanks {name}. What's your email address?",
    askCategory:
      "What type of issue are you experiencing?\n\n1. 🔧 Technical Issue\n2. 💳 Billing\n3. 📦 Service/Product\n4. ❓ Other",
    askDescription: "Describe the issue in detail. The more information you provide, the better we can help.",
    confirmation:
      "Thanks for the information. Here's your ticket summary:\n\n👤 Name: {name}\n📧 Email: {email}\n🏷️ Category: {category}\n📝 Description: {description}\n\nOur team will contact you within 24 hours.",
    success: "✅ Ticket #{ticketId} created successfully! You'll receive updates via email.",
  },
}

export function initializeSupportFlow(language: "it" | "en" = "it"): SupportState {
  return {
    step: "initial",
    data: {},
    language,
  }
}

export function processSupportStep(
  state: SupportState,
  userInput: string,
): { message: string; nextStep: SupportStep; completed: boolean } {
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
      state.data.email = userInput.trim()
      return {
        message: t.askCategory,
        nextStep: "category",
        completed: false,
      }

    case "category":
      const categoryMap: Record<string, string> = {
        "1": state.language === "it" ? "Problema Tecnico" : "Technical Issue",
        "2": state.language === "it" ? "Fatturazione" : "Billing",
        "3": state.language === "it" ? "Servizio/Prodotto" : "Service/Product",
        "4": state.language === "it" ? "Altro" : "Other",
      }
      state.data.category = categoryMap[userInput.trim()] || userInput.trim()
      return {
        message: t.askDescription,
        nextStep: "description",
        completed: false,
      }

    case "description":
      state.data.description = userInput.trim()
      state.data.id = `TICKET-${Date.now()}`
      state.data.status = "open"
      state.data.priority = "medium"
      state.data.createdAt = new Date()

      const confirmationMessage = t.confirmation
        .replace("{name}", state.data.name || "")
        .replace("{email}", state.data.email || "")
        .replace("{category}", state.data.category || "")
        .replace("{description}", state.data.description || "")

      return {
        message: confirmationMessage,
        nextStep: "confirmation",
        completed: false,
      }

    case "confirmation":
      const successMessage = t.success.replace("{ticketId}", state.data.id || "")
      return {
        message: successMessage,
        nextStep: "initial",
        completed: true,
      }

    default:
      return {
        message: t.askName,
        nextStep: "name",
        completed: false,
      }
  }
}
