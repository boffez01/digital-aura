export interface BookingStep {
  id: string
  question: string
  type: "text" | "select" | "date" | "time"
  options?: string[]
  validation?: (value: string) => boolean
}

export const bookingFlowIT: BookingStep[] = [
  {
    id: "service",
    question: "Quale servizio ti interessa?",
    type: "select",
    options: [
      "AI Services - Automazione e chatbot",
      "Web Development - Siti web ed e-commerce",
      "AI Marketing - Campagne automatizzate",
      "Consulenza generale",
    ],
  },
  {
    id: "name",
    question: "Come ti chiami?",
    type: "text",
    validation: (value) => value.length >= 2,
  },
  {
    id: "email",
    question: "Qual è la tua email?",
    type: "text",
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  {
    id: "date",
    question: "Quando preferisci la consulenza?",
    type: "date",
  },
  {
    id: "time",
    question: "A che ora?",
    type: "select",
    options: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  },
  {
    id: "notes",
    question: "Hai qualche richiesta particolare? (opzionale)",
    type: "text",
  },
]

export const bookingFlowEN: BookingStep[] = [
  {
    id: "service",
    question: "Which service are you interested in?",
    type: "select",
    options: [
      "AI Services - Automation and chatbots",
      "Web Development - Websites and e-commerce",
      "AI Marketing - Automated campaigns",
      "General consultation",
    ],
  },
  {
    id: "name",
    question: "What is your name?",
    type: "text",
    validation: (value) => value.length >= 2,
  },
  {
    id: "email",
    question: "What is your email?",
    type: "text",
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  {
    id: "date",
    question: "When would you prefer the consultation?",
    type: "date",
  },
  {
    id: "time",
    question: "What time?",
    type: "select",
    options: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  },
  {
    id: "notes",
    question: "Any special requests? (optional)",
    type: "text",
  },
]

export function getBookingFlow(language: "it" | "en"): BookingStep[] {
  return language === "it" ? bookingFlowIT : bookingFlowEN
}
