import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"
import CookieConsentBanner from "./components/cookie-consent-banner"
import NewsletterPopup from "./components/newsletter-popup"
import ChatbotWidget from "./components/chatbot-widget"

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
          <CookieConsentBanner />
          <NewsletterPopup />
          <ChatbotWidget />
        </LanguageProvider>
        <Script id="zoho-salesiq-config" strategy="lazyOnload">
          {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>
        <Script
          id="zsiqscript"
          strategy="lazyOnload"
          src="https://salesiq.zohopublic.eu/widget?wc=siqdde7e27b6297c8071c63580587a0153d5d21c646745d614929025d855cf5753d"
        />
      </body>
    </html>
  )
}
