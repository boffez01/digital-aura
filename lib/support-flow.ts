export interface SupportCategory {
  id: string
  title: string
  description: string
  responses: string[]
}

export const supportCategoriesIT: SupportCategory[] = [
  {
    id: "technical",
    title: "Supporto Tecnico",
    description: "Problemi tecnici con il sito o i servizi",
    responses: [
      "Capisco che stai riscontrando un problema tecnico. Puoi descrivermi meglio il problema?",
      "Per assisterti al meglio, ho bisogno di qualche dettaglio in più. Quando si è verificato il problema?",
      "Ti metto in contatto con il nostro team tecnico. Nel frattempo, hai provato a ricaricare la pagina?",
    ],
  },
  {
    id: "billing",
    title: "Fatturazione",
    description: "Domande su pagamenti e fatture",
    responses: [
      "Per questioni di fatturazione, posso aiutarti. Di cosa hai bisogno?",
      "Tutte le fatture vengono inviate via email. Hai controllato la tua casella di posta?",
      "Per modifiche alla fatturazione, contatta info@praxisfutura.com",
    ],
  },
  {
    id: "services",
    title: "Informazioni sui Servizi",
    description: "Domande sui nostri servizi",
    responses: [
      "Sarò felice di spiegarti i nostri servizi. Quale ti interessa?",
      "Offriamo AI Services, Web Development, AI Marketing e consulenze gratuite.",
      "Vuoi prenotare una consulenza gratuita per discutere delle tue esigenze?",
    ],
  },
  {
    id: "general",
    title: "Altro",
    description: "Altre domande",
    responses: [
      "Come posso aiutarti oggi?",
      "Sono qui per rispondere a qualsiasi domanda tu abbia.",
      "Per assistenza immediata, puoi anche contattarci a info@praxisfutura.com",
    ],
  },
]

export const supportCategoriesEN: SupportCategory[] = [
  {
    id: "technical",
    title: "Technical Support",
    description: "Technical issues with the site or services",
    responses: [
      "I understand you're experiencing a technical issue. Can you describe the problem in more detail?",
      "To assist you better, I need more details. When did the problem occur?",
      "I'll connect you with our technical team. In the meantime, have you tried reloading the page?",
    ],
  },
  {
    id: "billing",
    title: "Billing",
    description: "Questions about payments and invoices",
    responses: [
      "I can help with billing questions. What do you need?",
      "All invoices are sent via email. Have you checked your inbox?",
      "For billing changes, contact info@praxisfutura.com",
    ],
  },
  {
    id: "services",
    title: "Service Information",
    description: "Questions about our services",
    responses: [
      "I'd be happy to explain our services. Which one interests you?",
      "We offer AI Services, Web Development, AI Marketing, and free consultations.",
      "Would you like to book a free consultation to discuss your needs?",
    ],
  },
  {
    id: "general",
    title: "Other",
    description: "Other questions",
    responses: [
      "How can I help you today?",
      "I'm here to answer any questions you have.",
      "For immediate assistance, you can also contact us at info@praxisfutura.com",
    ],
  },
]

export function getSupportCategories(language: "it" | "en"): SupportCategory[] {
  return language === "it" ? supportCategoriesIT : supportCategoriesEN
}
