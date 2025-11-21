import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chatbot Intelligenti AI - Praxis Futura",
  description:
    "Implementa chatbot AI avanzati per automatizzare l'assistenza clienti 24/7. Riduci i costi operativi e migliora la soddisfazione dei clienti con l'intelligenza artificiale.",
  keywords: [
    "chatbot AI",
    "assistenza clienti automatica",
    "chatbot intelligenti",
    "customer service automation",
    "AI conversazionale",
  ],
  openGraph: {
    title: "Chatbot Intelligenti AI - Praxis Futura",
    description: "Implementa chatbot AI avanzati per automatizzare l'assistenza clienti 24/7.",
    type: "website",
  },
}

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
