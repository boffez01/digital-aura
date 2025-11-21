import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termini e Condizioni - Praxis Futura",
  description:
    "Leggi i termini e condizioni d'uso dei servizi di Praxis Futura. Normative, policy e regolamenti per l'utilizzo dei nostri servizi AI e web.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
