import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digital Aura | Soluzioni AI per il Business del Futuro",
  description:
    "Trasformiamo aziende con chatbot intelligenti, automazione avanzata e sviluppo web. Scopri come l'AI può accelerare la tua crescita.",
  keywords:
    "AI, artificial intelligence, chatbots, automation, web development, digital marketing, business transformation",
  authors: [{ name: "Digital Aura Team" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  openGraph: {
    title: "Digital Aura | Soluzioni AI per il Business del Futuro",
    description: "Trasformiamo aziende con chatbot intelligenti, automazione avanzata e sviluppo web.",
    url: "https://digitalaura.it",
    siteName: "Digital Aura",
    images: [
      {
        url: "https://digitalaura.it/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "it_IT",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
