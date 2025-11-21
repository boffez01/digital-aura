import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Praxis Futura",
  description:
    "Informativa sulla privacy e trattamento dei dati personali. Scopri come Praxis Futura protegge le tue informazioni secondo il GDPR.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
