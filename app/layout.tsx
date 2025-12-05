import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"
import CookieConsentBanner from "./components/cookie-consent-banner"
import ChatbotWidget from "./components/chatbot-widget"
import RecaptchaProvider from "./components/recaptcha-provider"
import { OrganizationStructuredData, WebSiteStructuredData } from "./components/structured-data"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Praxis Futura | Automazione AI & Sviluppo Web per PMI",
  description:
    "Agenzia di Automazione AI e Chatbot Intelligenti. Recupera 15+ ore a settimana e aumenta i profitti automatizzando i processi aziendali.",
  keywords: [
    "Agenzia AI Italia",
    "Chatbot Intelligenza Artificiale",
    "Automazione Processi Aziendali",
    "Sviluppo Web Next.js",
    "Voice AI Receptionist",
    "Zoho Partner Italia",
    "Lead Generation Automatizzata",
  ],
  authors: [{ name: "Praxis Futura" }],
  openGraph: {
    title: "Praxis Futura | Il Tuo Business col Pilota Automatico",
    description: "Smetti di perdere tempo in task manuali. Scopri come l'AI può scalare la tua azienda.",
    type: "website",
    locale: "it_IT",
    url: "https://praxisfutura.com",
    siteName: "Praxis Futura",
    images: [
      {
        url: "/og-image.jpg", // Assicurati di avere un'immagine carina in public/
        width: 1200,
        height: 630,
        alt: "Praxis Futura AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Praxis Futura | Automazione AI",
    description: "Recupera tempo e profitti con l'Intelligenza Artificiale.",
  },
  metadataBase: new URL("https://praxisfutura.com"), // CAMBIA SE HAI UN DOMINIO DIVERSO
  robots: {
    index: true,
    follow: true,
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <meta name="theme-color" content="#0f172a" />
        <link rel="manifest" href="/site.webmanifest" />

        <OrganizationStructuredData />
        <WebSiteStructuredData />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <RecaptchaProvider>
            {children}
            <CookieConsentBanner />
            <ChatbotWidget />
            <Analytics />
          </RecaptchaProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
