import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"
import CookieConsentBanner from "./components/cookie-consent-banner"
import ChatbotWidget from "./components/chatbot-widget"
import RecaptchaProvider from "./components/recaptcha-provider"
import { OrganizationStructuredData, WebSiteStructuredData } from "./components/structured-data"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

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
    url: "https://praxisfutura.com",
    siteName: "Praxis Futura",
  },
  twitter: {
    card: "summary_large_image",
    title: "Praxis Futura - Soluzioni AI & Sviluppo Web",
    description: "Trasforma il tuo business con soluzioni AI personalizzate",
  },
  metadataBase: new URL("https://praxisfutura.com"),
  alternates: {
    canonical: "/",
    languages: {
      "it-IT": "/",
      "en-US": "/",
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
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
        <link rel="preconnect" href="https://crm.zoho.com" />
        <link rel="preconnect" href="https://bookings.zoho.com" />

        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        <meta name="theme-color" content="#1e293b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

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
          </RecaptchaProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
