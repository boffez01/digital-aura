import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digital Aura - AI Solutions for Business Transformation",
  description:
    "Transform your business with cutting-edge AI solutions. Chatbots, automation, web development, and AI marketing services.",
  keywords:
    "AI, artificial intelligence, chatbots, automation, web development, digital marketing, business transformation",
  authors: [{ name: "Digital Aura Team" }],
  openGraph: {
    title: "Digital Aura - AI Solutions for Business",
    description: "Transform your business with cutting-edge AI solutions",
    type: "website",
    locale: "en_US",
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
