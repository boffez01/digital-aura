import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Marketing e Ottimizzazione - Praxis Futura",
  description:
    "Potenzia le tue campagne marketing con l'intelligenza artificiale. Analisi predittive, targeting intelligente e ROI migliorato.",
  keywords: [
    "AI marketing",
    "marketing automation",
    "intelligenza artificiale marketing",
    "digital marketing AI",
    "campagne ottimizzate",
  ],
  openGraph: {
    title: "AI Marketing e Ottimizzazione - Praxis Futura",
    description: "Potenzia le tue campagne marketing con l'intelligenza artificiale.",
    type: "website",
  },
}

export default function AIMarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
