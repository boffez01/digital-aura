import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy - Praxis Futura",
  description:
    "Informazioni sull'utilizzo dei cookie sul sito Praxis Futura. Gestisci le tue preferenze e scopri come utilizziamo i cookie.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
