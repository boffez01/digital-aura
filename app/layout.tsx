import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"
import CookieConsentBanner from "./components/cookie-consent-banner"
import NewsletterPopup from "./components/newsletter-popup"

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
        </LanguageProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`,
          }}
        />
        <script
          id="zsiqscript"
          src="https://salesiq.zohopublic.eu/widget?wc=siqdde7e27b6297c8071c63580587a0153d5d21c646745d614929025d855cf5753d"
          defer
        />
      </body>
    </html>
  )
}
