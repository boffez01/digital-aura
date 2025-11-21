import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prenota Consulenza Gratuita - Praxis Futura",
  description:
    "Prenota una consulenza gratuita con i nostri esperti di AI e sviluppo web. Scopri come possiamo aiutare la tua azienda a crescere.",
  keywords: [
    "consulenza AI",
    "consulenza sviluppo web",
    "prenotazione consulenza",
    "meeting online",
    "consulenza gratuita",
  ],
  openGraph: {
    title: "Prenota Consulenza Gratuita - Praxis Futura",
    description: "Prenota una consulenza gratuita con i nostri esperti di AI e sviluppo web.",
    type: "website",
  },
}

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
