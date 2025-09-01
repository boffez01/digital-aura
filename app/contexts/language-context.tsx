"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "it"

interface Translations {
  [key: string]: any
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      appointments: "Appointments",
      contact: "Contact",
      bookConsultation: "Free Consultation",
      adminPanel: "Admin Panel",
    },
    hero: {
      badge: "⭐ Advanced Digital Innovation",
      title: "Digital Aura",
      subtitle:
        "We transform your ideas into innovative digital solutions with AI Automation, Intelligent Chatbots, Web Development and AI Marketing",
      discoverServices: "Discover Services",
      freeConsultation: "Free Consultation",
    },
    services: {
      title: "Our Services",
      subtitle: "Innovative digital solutions to transform your business with cutting-edge AI technology",
    },
    projects: {
      title: "Success Projects",
      subtitle:
        "Some of our most significant and innovative works that have transformed our clients' businesses. Click to see complete details, results achieved and ROI.",
      viewCaseStudy: "View Complete Case Study",
    },
    story: {
      title: "Our Story",
      description:
        "We are a team of digital innovation experts passionate about transforming businesses through advanced AI technologies. Our mission is to make artificial intelligence accessible and useful for companies of all sizes.",
      vision: {
        title: "Our Vision",
        description:
          "To become the leading reference point for AI innovation in Italy, helping companies discover and implement the potential of artificial intelligence to improve their processes, increase efficiency and create new growth opportunities.",
      },
      commitment: {
        title: "Our Commitment",
        description:
          "We are committed to providing customized solutions, excellent customer service and continuous support. Every project is an opportunity to create lasting value and build relationships based on trust and mutual success.",
      },
    },
    values: {
      innovation: {
        title: "Innovation",
        description: "We constantly explore new technologies to offer cutting-edge solutions",
      },
      precision: {
        title: "Precision",
        description: "Every detail matters. We work with precision to ensure perfect results",
      },
      collaboration: {
        title: "Collaboration",
        description: "We work closely with our clients to understand and exceed their expectations",
      },
      growth: {
        title: "Growth",
        description: "We help companies grow and evolve in the digital market",
      },
    },
    contact: {
      title: "Contact Us",
      subtitle:
        "Ready to transform your business? Contact us for a free consultation and discover how we can help you achieve your goals.",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        company: "Company",
        service: "Select Service",
        message: "Message",
        submit: "Send Request",
        success: "Message sent successfully!",
        services: {
          ai: "AI Automation",
          chatbot: "Smart Chatbots",
          web: "Web Development",
          marketing: "AI Marketing",
          consulting: "Consulting",
        },
      },
    },
    blog: {
      title: "Digital Innovation Blog",
      subtitle:
        "Discover the latest trends in AI, automation and digital technologies. Practical guides, case studies and expert insights to transform your business.",
      categories: {
        all: "All Articles",
        ai: "Artificial Intelligence",
        automation: "Automation",
        chatbot: "Chatbots",
        web: "Web Development",
      },
      readMore: "Read More",
      newsletter: {
        title: "Stay Updated",
        subtitle: "Receive the latest articles and insights directly in your inbox",
        email: "Your email address",
        subscribe: "Subscribe",
        success: "Successfully subscribed!",
      },
    },
    footer: {
      description:
        "We transform your ideas into innovative digital solutions with AI, chatbots, web development and digital marketing.",
      quickLinks: "Quick Links",
      services: {
        title: "Our Services",
        ai: "AI Automation",
        chatbot: "Smart Chatbots",
        web: "Web Development",
        marketing: "AI Marketing",
      },
      rights: "© 2024 Digital Aura. All rights reserved.",
      startup: "🚀 Innovative Italian startup specialized in AI and digital solutions",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
    },
  },
  it: {
    nav: {
      home: "Home",
      services: "Servizi",
      portfolio: "Portfolio",
      blog: "Blog",
      appointments: "Appuntamenti",
      contact: "Contatti",
      bookConsultation: "Consulenza Gratuita",
      adminPanel: "Pannello Admin",
    },
    hero: {
      badge: "⭐ Innovazione Digitale Avanzata",
      title: "Digital Aura",
      subtitle:
        "Trasformiamo le tue idee in soluzioni digitali innovative con Automazione AI, Chatbot Intelligenti, Sviluppo Web e Marketing AI",
      discoverServices: "Scopri i Servizi",
      freeConsultation: "Consulenza Gratuita",
    },
    services: {
      title: "I Nostri Servizi",
      subtitle: "Soluzioni digitali innovative per trasformare il tuo business con tecnologie AI all'avanguardia",
    },
    projects: {
      title: "Progetti di Successo",
      subtitle:
        "Alcuni dei nostri lavori più significativi e innovativi che hanno trasformato il business dei nostri clienti. Clicca per vedere i dettagli completi, risultati ottenuti e ROI.",
      viewCaseStudy: "Vedi Case Study Completo",
    },
    story: {
      title: "La Nostra Storia",
      description:
        "Siamo un team di esperti di innovazione digitale appassionati nel trasformare le aziende attraverso tecnologie AI avanzate. La nostra missione è rendere l'intelligenza artificiale accessibile e utile per aziende di tutte le dimensioni.",
      vision: {
        title: "La Nostra Visione",
        description:
          "Diventare il punto di riferimento leader per l'innovazione AI in Italia, aiutando le aziende a scoprire e implementare il potenziale dell'intelligenza artificiale per migliorare i loro processi, aumentare l'efficienza e creare nuove opportunità di crescita.",
      },
      commitment: {
        title: "Il Nostro Impegno",
        description:
          "Ci impegniamo a fornire soluzioni personalizzate, un servizio clienti eccellente e supporto continuo. Ogni progetto è un'opportunità per creare valore duraturo e costruire relazioni basate sulla fiducia e sul successo reciproco.",
      },
    },
    values: {
      innovation: {
        title: "Innovazione",
        description: "Esploriamo costantemente nuove tecnologie per offrire soluzioni all'avanguardia",
      },
      precision: {
        title: "Precisione",
        description: "Ogni dettaglio conta. Lavoriamo con precisione per garantire risultati perfetti",
      },
      collaboration: {
        title: "Collaborazione",
        description: "Lavoriamo a stretto contatto con i nostri clienti per comprendere e superare le loro aspettative",
      },
      growth: {
        title: "Crescita",
        description: "Aiutiamo le aziende a crescere ed evolversi nel mercato digitale",
      },
    },
    contact: {
      title: "Contattaci",
      subtitle:
        "Pronto a trasformare il tuo business? Contattaci per una consulenza gratuita e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi.",
      form: {
        name: "Nome Completo",
        email: "Indirizzo Email",
        phone: "Numero di Telefono",
        company: "Azienda",
        service: "Seleziona Servizio",
        message: "Messaggio",
        submit: "Invia Richiesta",
        success: "Messaggio inviato con successo!",
        services: {
          ai: "Automazione AI",
          chatbot: "Chatbot Intelligenti",
          web: "Sviluppo Web",
          marketing: "Marketing AI",
          consulting: "Consulenza",
        },
      },
    },
    blog: {
      title: "Blog Innovazione Digitale",
      subtitle:
        "Scopri le ultime tendenze in AI, automazione e tecnologie digitali. Guide pratiche, case study e insights di esperti per trasformare il tuo business.",
      categories: {
        all: "Tutti gli Articoli",
        ai: "Intelligenza Artificiale",
        automation: "Automazione",
        chatbot: "Chatbot",
        web: "Sviluppo Web",
      },
      readMore: "Leggi di Più",
      newsletter: {
        title: "Rimani Aggiornato",
        subtitle: "Ricevi gli ultimi articoli e insights direttamente nella tua casella di posta",
        email: "Il tuo indirizzo email",
        subscribe: "Iscriviti",
        success: "Iscrizione completata con successo!",
      },
    },
    footer: {
      description:
        "Trasformiamo le tue idee in soluzioni digitali innovative con AI, chatbot, sviluppo web e marketing digitale.",
      quickLinks: "Link Rapidi",
      services: {
        title: "I Nostri Servizi",
        ai: "Automazione AI",
        chatbot: "Chatbot Intelligenti",
        web: "Sviluppo Web",
        marketing: "Marketing AI",
      },
      rights: "© 2024 Digital Aura. Tutti i diritti riservati.",
      startup: "🚀 Startup italiana innovativa specializzata in AI e soluzioni digitali",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Termini di Servizio",
      cookiePolicy: "Cookie Policy",
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("it")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "it")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = translations["en"]
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return the key itself if not found
          }
        }
        break
      }
    }

    return typeof value === "string" ? value : key
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
