"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "it" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}
// Forzo nuovo deploy
const translations = {
  it: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Servizi",
    "nav.about": "Chi Siamo",
    "nav.blog": "Blog",
    "nav.contact": "Contatti",
    "nav.appointments": "Appuntamenti",

    // Hero Section
    "hero.title": "Trasforma il tuo Business con l'AI",
    "hero.subtitle":
      "Soluzioni innovative di Intelligenza Artificiale per automatizzare processi, migliorare l'efficienza e accelerare la crescita della tua azienda.",
    "hero.cta": "Inizia Ora",
    "hero.consultation": "Consulenza Gratuita",

    // Services
    "services.title": "I Nostri Servizi",
    "services.subtitle": "Soluzioni complete per la trasformazione digitale",
    "services.webdev": "Sviluppo Web",
    "services.chatbot": "Chatbot AI",
    "services.aimarketing": "AI Marketing",
    "services.automation": "Automazione AI",

    // About
    "about.title": "Chi Siamo",
    "about.subtitle": "Esperti in Intelligenza Artificiale e Trasformazione Digitale",

    // Contact
    "contact.title": "Contattaci",
    "contact.subtitle": "Inizia il tuo percorso di trasformazione digitale",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.message": "Messaggio",
    "contact.send": "Invia Messaggio",

    // Footer
    "footer.company": "Digital Aura",
    "footer.description": "Trasformiamo le aziende con soluzioni AI innovative",
    "footer.rights": "Tutti i diritti riservati",

    // Chatbot
    "chatbot.welcome": "Ciao! Sono AuraBot, l'assistente AI di Digital Aura.",
    "chatbot.help": "Come posso aiutarti oggi?",
    "chatbot.placeholder": "Scrivi un messaggio...",
    "chatbot.quickActions": "Azioni rapide:",
    "chatbot.services": "Servizi",
    "chatbot.faq": "FAQ",
    "chatbot.book": "Prenota",
    "chatbot.support": "Assistenza",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About Us",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.appointments": "Appointments",

    // Hero Section
    "hero.title": "Transform Your Business with AI",
    "hero.subtitle":
      "Innovative Artificial Intelligence solutions to automate processes, improve efficiency and accelerate your company's growth.",
    "hero.cta": "Get Started",
    "hero.consultation": "Free Consultation",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Complete solutions for digital transformation",
    "services.webdev": "Web Development",
    "services.chatbot": "AI Chatbot",
    "services.aimarketing": "AI Marketing",
    "services.automation": "AI Automation",

    // About
    "about.title": "About Us",
    "about.subtitle": "Experts in Artificial Intelligence and Digital Transformation",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Start your digital transformation journey",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",

    // Footer
    "footer.company": "Digital Aura",
    "footer.description": "We transform companies with innovative AI solutions",
    "footer.rights": "All rights reserved",

    // Chatbot
    "chatbot.welcome": "Hello! I'm AuraBot, Digital Aura's AI assistant.",
    "chatbot.help": "How can I help you today?",
    "chatbot.placeholder": "Type a message...",
    "chatbot.quickActions": "Quick actions:",
    "chatbot.services": "Services",
    "chatbot.faq": "FAQ",
    "chatbot.book": "Book",
    "chatbot.support": "Support",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("it")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "it" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
