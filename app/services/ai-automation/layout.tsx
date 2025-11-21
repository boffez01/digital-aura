import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Automazione AI per il Business - Praxis Futura",
  description:
    "Automatizza i processi aziendali con l'intelligenza artificiale. Riduci tempi e costi operativi fino al 70% con soluzioni AI personalizzate.",
  keywords: [
    "automazione AI",
    "intelligenza artificiale business",
    "automazione processi",
    "AI workflow",
    "machine learning aziendale",
  ],
  openGraph: {
    title: "Automazione AI per il Business - Praxis Futura",
    description: "Automatizza i processi aziendali con l'intelligenza artificiale.",
    type: "website",
  },
}

export default function AIAutomationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
