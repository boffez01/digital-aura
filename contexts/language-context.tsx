"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "it" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  it: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Servizi",
    "nav.about": "Chi Siamo",
    "nav.portfolio": "Portfolio",
    "nav.blog": "Blog",
    "nav.contact": "Contatti",
    "nav.freeConsultation": "Consulenza Gratuita",

    // Hero Section
    "hero.title": "Trasforma il Tuo Business con l'AI",
    "hero.subtitle":
      "Soluzioni digitali innovative per automatizzare processi, aumentare vendite e migliorare l'esperienza cliente",
    "hero.cta": "Inizia Ora",
    "hero.learnMore": "Scopri di Più",
    "hero.banner": "Innovazione Digitale Potenziata dall'AI",

    // Services
    "services.title": "I Nostri Servizi",
    "services.subtitle": "Soluzioni complete per la trasformazione digitale della tua azienda",
    "services.webDev": "Sviluppo Web",
    "services.webDevDesc": "Siti web moderni e performanti",
    "services.aiAutomation": "Automazione AI",
    "services.aiAutomationDesc": "Processi automatizzati intelligenti",
    "services.chatbot": "Chatbot AI",
    "services.chatbotDesc": "Assistenti virtuali personalizzati",
    "services.aiMarketing": "Marketing AI",
    "services.aiMarketingDesc": "Strategie di marketing potenziate dall'AI",

    // About
    "about.title": "Chi Siamo",
    "about.subtitle": "Esperti in trasformazione digitale e intelligenza artificiale",

    // Portfolio
    "portfolio.title": "I Nostri Progetti",
    "portfolio.subtitle": "Scopri come abbiamo trasformato le aziende dei nostri clienti",

    // Contact
    "contact.title": "Contattaci",
    "contact.subtitle": "Inizia la tua trasformazione digitale oggi stesso",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.message": "Messaggio",
    "contact.send": "Invia Messaggio",

    // Footer
    "footer.description": "Trasformiamo le aziende attraverso l'innovazione digitale e l'intelligenza artificiale.",
    "footer.quickLinks": "Link Rapidi",
    "footer.services": "Servizi",
    "footer.contact": "Contatti",
    "footer.rights": "Tutti i diritti riservati.",

    // Chatbot
    "chatbot.greeting": "Ciao! Come posso aiutarti oggi?",
    "chatbot.services": "Servizi",
    "chatbot.support": "Supporto",
    "chatbot.booking": "Prenota",
    "chatbot.info": "Info",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.portfolio": "Portfolio",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.freeConsultation": "Free Consultation",

    // Hero Section
    "hero.title": "Transform Your Business with AI",
    "hero.subtitle":
      "Innovative digital solutions to automate processes, increase sales and improve customer experience",
    "hero.cta": "Get Started",
    "hero.learnMore": "Learn More",
    "hero.banner": "AI-Powered Digital Innovation",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Complete solutions for your company's digital transformation",
    "services.webDev": "Web Development",
    "services.webDevDesc": "Modern and high-performance websites",
    "services.aiAutomation": "AI Automation",
    "services.aiAutomationDesc": "Intelligent automated processes",
    "services.chatbot": "AI Chatbot",
    "services.chatbotDesc": "Personalized virtual assistants",
    "services.aiMarketing": "AI Marketing",
    "services.aiMarketingDesc": "AI-powered marketing strategies",

    // About
    "about.title": "About Us",
    "about.subtitle": "Experts in digital transformation and artificial intelligence",

    // Portfolio
    "portfolio.title": "Our Projects",
    "portfolio.subtitle": "Discover how we've transformed our clients' businesses",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Start your digital transformation today",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",

    // Footer
    "footer.description": "We transform businesses through digital innovation and artificial intelligence.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",

    // Chatbot
    "chatbot.greeting": "Hello! How can I help you today?",
    "chatbot.services": "Services",
    "chatbot.support": "Support",
    "chatbot.booking": "Book",
    "chatbot.info": "Info",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("it")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "it" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)

    // Dispatch custom event for components that need to listen
    window.dispatchEvent(new CustomEvent("languageChange", { detail: lang }))

    // Also dispatch storage event for cross-tab communication
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "language",
        newValue: lang,
        oldValue: language,
      }),
    )
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
