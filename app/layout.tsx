import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"
import ChatbotWidget from "./components/chatbot-widget"
import CookieConsentBanner from "./components/cookie-consent-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Praxis Futura - Soluzioni AI & Sviluppo Web",
  description:
    "Trasforma il tuo business con soluzioni AI personalizzate, chatbot intelligenti e sviluppo web professionale. Consulenza specializzata e formazione.",
  keywords: [
    "AI",
    "Intelligenza Artificiale",
    "Chatbot",
    "Sviluppo Web",
    "Automazione",
    "Marketing AI",
    "Consulenza Digitale",
    "Formazione AI",
  ],
  authors: [{ name: "Praxis Futura" }],
  openGraph: {
    title: "Praxis Futura - Soluzioni AI & Sviluppo Web",
    description: "Trasforma il tuo business con soluzioni AI personalizzate",
    type: "website",
    locale: "it_IT",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <ChatbotWidget />
          <CookieConsentBanner />
        </LanguageProvider>
      </body>
    </html>
  )
}
