"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

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

    // Chatbot Service Page
    "chatbot.page.title": "Assistenti Virtuali Intelligenti",
    "chatbot.page.subtitle":
      "Trasforma il tuo customer service con chatbot AI che comprendono, apprendono e risolvono. Disponibili 24/7 per offrire un'esperienza cliente eccezionale.",
    "chatbot.page.tryDemo": "Prova Demo Interattiva",
    "chatbot.page.requestConsultation": "Richiedi Consulenza",
    "chatbot.page.demoTitle": "Prova i Nostri Chatbot",
    "chatbot.page.demoSubtitle":
      "Interagisci con diversi tipi di assistenti virtuali per vedere come possono trasformare la tua attività",
    "chatbot.page.chooseChatbot": "Scegli il Chatbot",
    "chatbot.page.features": "Caratteristiche",
    "chatbot.page.advancedFeatures": "Funzionalità Avanzate",
    "chatbot.page.advancedFeaturesSubtitle":
      "I nostri chatbot sono dotati di tecnologie all'avanguardia per offrire un'esperienza utente superiore",
    "chatbot.page.integrationCapabilities": "Capacità di Integrazione",
    "chatbot.page.integrationSubtitle":
      "I nostri chatbot possono essere integrati in vari sistemi e piattaforme per ampliare le tue capacità di comunicazione",
    "chatbot.page.securityCompliance": "Sicurezza e Conformità",
    "chatbot.page.securitySubtitle":
      "Assicurati che i tuoi chatbot rispettino le normative e offrano la massima sicurezza dei dati",
    "chatbot.page.readyToRevolutionize": "Pronto a Rivoluzionare il Tuo Customer Service?",
    "chatbot.page.readySubtitle":
      "Inizia oggi stesso con un chatbot personalizzato per la tua attività. Consulenza gratuita e demo personalizzata incluse.",
    "chatbot.page.bookFreeConsultation": "Prenota Consulenza Gratuita",
    "chatbot.page.chatWithBot": "Chatta con il Nostro Bot",

    // Chatbot Features
    "chatbot.feature.nlp": "Comprensione linguaggio naturale",
    "chatbot.feature.dbIntegration": "Integrazione database",
    "chatbot.feature.availabilityCheck": "Controllo disponibilità",
    "chatbot.feature.dataValidation": "Validazione dati",
    "chatbot.feature.autoSave": "Salvataggio automatico",
    "chatbot.feature.aiConversational": "AI Conversazionale Avanzata",
    "chatbot.feature.aiConversationalDesc":
      "Comprensione del linguaggio naturale con risposte intelligenti e contestuali",
    "chatbot.feature.rapidIntegration": "Integrazione Rapida",
    "chatbot.feature.rapidIntegrationDesc": "Setup in 24 ore con integrazione completa nei tuoi sistemi esistenti",
    "chatbot.feature.multichannel": "Supporto Multicanale",
    "chatbot.feature.multichannelDesc": "Funziona su sito web, WhatsApp, Telegram, Facebook Messenger e app mobile",
    "chatbot.feature.analytics": "Analytics Avanzate",
    "chatbot.feature.analyticsDesc": "Dashboard completa con metriche di performance e insights sui clienti",
    "chatbot.feature.security": "Sicurezza Enterprise",
    "chatbot.feature.securityDesc": "Crittografia end-to-end e conformità GDPR per la massima sicurezza",
    "chatbot.feature.availability": "Disponibilità 24/7",
    "chatbot.feature.availabilityDesc": "Assistenza clienti sempre attiva, anche fuori orario lavorativo",

    // Advanced Features
    "chatbot.advanced.aiPersonalization": "Personalizzazione AI",
    "chatbot.advanced.aiPersonalizationDesc": "Personalizza risposte e comportamenti del chatbot",
    "chatbot.advanced.apiIntegration": "Integrazione API",
    "chatbot.advanced.apiIntegrationDesc": "Integra chatbot con API di terze parti",
    "chatbot.advanced.multilingual": "Supporto Multilingue",
    "chatbot.advanced.multilingualDesc": "Supporta più lingue per una comunicazione globale",
    "chatbot.advanced.machineLearning": "Machine Learning",
    "chatbot.advanced.machineLearningDesc": "Utilizza algoritmi di machine learning per migliorare le risposte",
    "chatbot.advanced.advancedSecurity": "Sicurezza avanzata",
    "chatbot.advanced.advancedSecurityDesc": "Implementa misure di sicurezza avanzate per proteggere i dati",
    "chatbot.advanced.optimizedPerformance": "Performance ottimizzata",
    "chatbot.advanced.optimizedPerformanceDesc": "Garantisce tempi di risposta rapidi e affidabili",

    // Integration Platforms
    "chatbot.integration.website": "Sito Web",
    "chatbot.integration.websiteDesc": "Widget integrato nel tuo sito",
    "chatbot.integration.whatsapp": "WhatsApp",
    "chatbot.integration.whatsappDesc": "Integrazione WhatsApp Business",
    "chatbot.integration.telegram": "Telegram",
    "chatbot.integration.telegramDesc": "Bot Telegram personalizzato",
    "chatbot.integration.socialMedia": "Social Media",
    "chatbot.integration.socialMediaDesc": "Facebook Messenger e altro",
    "chatbot.integration.crm": "CRM",
    "chatbot.integration.crmDesc": "Integrazione con sistemi CRM per una gestione efficiente dei clienti",
    "chatbot.integration.erp": "ERP",
    "chatbot.integration.erpDesc": "Integrazione con sistemi ERP per una gestione ottimizzata delle operazioni",

    // Security Features
    "chatbot.security.endToEnd": "Crittografia End-to-End",
    "chatbot.security.endToEndDesc": "Proteggi tutte le comunicazioni con crittografia avanzata",
    "chatbot.security.gdpr": "Conformità GDPR",
    "chatbot.security.gdprDesc": "Garantisce la conformità alle normative sulla privacy",
    "chatbot.security.accessControl": "Access Control",
    "chatbot.security.accessControlDesc": "Controlla l'accesso ai chatbot per diverse ruoli aziendali",
    "chatbot.security.auditLog": "Audit Log",
    "chatbot.security.auditLogDesc": "Registra tutte le interazioni per un controllo completo",
    "chatbot.security.scalability": "Scalabilità",
    "chatbot.security.scalabilityDesc": "Scaliamo i tuoi chatbot in base alle tue esigenze aziendali",
    "chatbot.security.backup": "Backup e Restore",
    "chatbot.security.backupDesc": "Backup automatico dei dati e possibilità di ripristino",

    // Benefits
    "chatbot.benefit.supportReduction": "Riduzione Ticket Supporto",
    "chatbot.benefit.supportReductionDesc": "Meno richieste manuali grazie all'automazione intelligente",
    "chatbot.benefit.conversionIncrease": "Aumento Conversioni",
    "chatbot.benefit.conversionIncreaseDesc": "Più lead qualificati attraverso conversazioni guidate",
    "chatbot.benefit.costSaving": "Risparmio Costi",
    "chatbot.benefit.costSavingDesc": "Riduzione significativa dei costi operativi del customer service",
    "chatbot.benefit.continuousAvailability": "Disponibilità Continua",
    "chatbot.benefit.continuousAvailabilityDesc": "Assistenza sempre attiva per i tuoi clienti",
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

    // Chatbot Service Page
    "chatbot.page.title": "Intelligent Virtual Assistants",
    "chatbot.page.subtitle":
      "Transform your customer service with AI chatbots that understand, learn and solve. Available 24/7 to deliver an exceptional customer experience.",
    "chatbot.page.tryDemo": "Try Interactive Demo",
    "chatbot.page.requestConsultation": "Request Consultation",
    "chatbot.page.demoTitle": "Try Our Chatbots",
    "chatbot.page.demoSubtitle":
      "Interact with different types of virtual assistants to see how they can transform your business",
    "chatbot.page.chooseChatbot": "Choose Chatbot",
    "chatbot.page.features": "Features",
    "chatbot.page.advancedFeatures": "Advanced Features",
    "chatbot.page.advancedFeaturesSubtitle":
      "Our chatbots are equipped with cutting-edge technologies to deliver a superior user experience",
    "chatbot.page.integrationCapabilities": "Integration Capabilities",
    "chatbot.page.integrationSubtitle":
      "Our chatbots can be integrated into various systems and platforms to expand your communication capabilities",
    "chatbot.page.securityCompliance": "Security & Compliance",
    "chatbot.page.securitySubtitle": "Ensure your chatbots comply with regulations and provide maximum data security",
    "chatbot.page.readyToRevolutionize": "Ready to Revolutionize Your Customer Service?",
    "chatbot.page.readySubtitle":
      "Start today with a personalized chatbot for your business. Free consultation and personalized demo included.",
    "chatbot.page.bookFreeConsultation": "Book Free Consultation",
    "chatbot.page.chatWithBot": "Chat with Our Bot",

    // Chatbot Features
    "chatbot.feature.nlp": "Natural language understanding",
    "chatbot.feature.dbIntegration": "Database integration",
    "chatbot.feature.availabilityCheck": "Availability control",
    "chatbot.feature.dataValidation": "Data validation",
    "chatbot.feature.autoSave": "Automatic saving",
    "chatbot.feature.aiConversational": "Advanced Conversational AI",
    "chatbot.feature.aiConversationalDesc": "Natural language understanding with intelligent and contextual responses",
    "chatbot.feature.rapidIntegration": "Rapid Integration",
    "chatbot.feature.rapidIntegrationDesc": "24-hour setup with complete integration into your existing systems",
    "chatbot.feature.multichannel": "Multichannel Support",
    "chatbot.feature.multichannelDesc": "Works on website, WhatsApp, Telegram, Facebook Messenger and mobile apps",
    "chatbot.feature.analytics": "Advanced Analytics",
    "chatbot.feature.analyticsDesc": "Complete dashboard with performance metrics and customer insights",
    "chatbot.feature.security": "Enterprise Security",
    "chatbot.feature.securityDesc": "End-to-end encryption and GDPR compliance for maximum security",
    "chatbot.feature.availability": "24/7 Availability",
    "chatbot.feature.availabilityDesc": "Customer support always active, even outside business hours",

    // Advanced Features
    "chatbot.advanced.aiPersonalization": "AI Personalization",
    "chatbot.advanced.aiPersonalizationDesc": "Customize chatbot responses and behaviors",
    "chatbot.advanced.apiIntegration": "API Integration",
    "chatbot.advanced.apiIntegrationDesc": "Integrate chatbot with third-party APIs",
    "chatbot.advanced.multilingual": "Multilingual Support",
    "chatbot.advanced.multilingualDesc": "Supports multiple languages for global communication",
    "chatbot.advanced.machineLearning": "Machine Learning",
    "chatbot.advanced.machineLearningDesc": "Uses machine learning algorithms to improve responses",
    "chatbot.advanced.advancedSecurity": "Advanced Security",
    "chatbot.advanced.advancedSecurityDesc": "Implements advanced security measures to protect data",
    "chatbot.advanced.optimizedPerformance": "Optimized Performance",
    "chatbot.advanced.optimizedPerformanceDesc": "Ensures fast and reliable response times",

    // Integration Platforms
    "chatbot.integration.website": "Website",
    "chatbot.integration.websiteDesc": "Widget integrated into your site",
    "chatbot.integration.whatsapp": "WhatsApp",
    "chatbot.integration.whatsappDesc": "WhatsApp Business integration",
    "chatbot.integration.telegram": "Telegram",
    "chatbot.integration.telegramDesc": "Custom Telegram bot",
    "chatbot.integration.socialMedia": "Social Media",
    "chatbot.integration.socialMediaDesc": "Facebook Messenger and more",
    "chatbot.integration.crm": "CRM",
    "chatbot.integration.crmDesc": "Integration with CRM systems for efficient customer management",
    "chatbot.integration.erp": "ERP",
    "chatbot.integration.erpDesc": "Integration with ERP systems for optimized operations management",

    // Security Features
    "chatbot.security.endToEnd": "End-to-End Encryption",
    "chatbot.security.endToEndDesc": "Protect all communications with advanced encryption",
    "chatbot.security.gdpr": "GDPR Compliance",
    "chatbot.security.gdprDesc": "Ensures compliance with privacy regulations",
    "chatbot.security.accessControl": "Access Control",
    "chatbot.security.accessControlDesc": "Control chatbot access for different business roles",
    "chatbot.security.auditLog": "Audit Log",
    "chatbot.security.auditLogDesc": "Records all interactions for complete control",
    "chatbot.security.scalability": "Scalability",
    "chatbot.security.scalabilityDesc": "We scale your chatbots based on your business needs",
    "chatbot.security.backup": "Backup & Restore",
    "chatbot.security.backupDesc": "Automatic data backup and restore capability",

    // Benefits
    "chatbot.benefit.supportReduction": "Support Ticket Reduction",
    "chatbot.benefit.supportReductionDesc": "Fewer manual requests thanks to intelligent automation",
    "chatbot.benefit.conversionIncrease": "Conversion Increase",
    "chatbot.benefit.conversionIncreaseDesc": "More qualified leads through guided conversations",
    "chatbot.benefit.costSaving": "Cost Savings",
    "chatbot.benefit.costSavingDesc": "Significant reduction in customer service operational costs",
    "chatbot.benefit.continuousAvailability": "Continuous Availability",
    "chatbot.benefit.continuousAvailabilityDesc": "Always active support for your customers",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
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
