import { type NextRequest, NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

// Comprehensive FAQ database
const faqDatabase = {
  it: {
    // Pricing and Costs
    "quanto costa":
      "I nostri prezzi dipendono dalla complessità del progetto e dalle tue esigenze specifiche. 💰 Offriamo soluzioni personalizzate per ogni budget. Ti consiglio di prenotare una consulenza gratuita per discutere il tuo progetto e ricevere una valutazione dettagliata. Vuoi che ti aiuti a prenotare? 📅",
    prezzi:
      "I prezzi variano in base al tipo di servizio e alla complessità del progetto. 💼 Per darti un'idea generale: i chatbot partono da €2.000, i siti web da €3.000, mentre i progetti di automazione AI sono personalizzati. Prenota una consulenza gratuita per una valutazione precisa! 🎯",
    costo:
      "Il costo dipende dalla complessità del progetto. 📋 Offriamo consulenze gratuite per valutare le tue esigenze e fornirti una stima accurata. Ogni progetto include sviluppo, formazione e supporto. Vuoi prenotare una consulenza? 💡",

    // Services and Capabilities
    servizi:
      "Offriamo 4 servizi principali: 🎯\n\n1. **AI Automation** - Automazione processi aziendali\n2. **Chatbot Intelligenti** - Assistenti AI personalizzati\n3. **Web Development** - Siti moderni e applicazioni\n4. **AI Marketing** - Campagne automatizzate\n\nSu quale servizio vorresti saperne di più? 🤔",

    "sviluppo web":
      "🌐 **Web Development - Siti Moderni e Performanti**\n\nCreiamo siti web professionali con:\n\n✅ Design responsive e moderno\n✅ Ottimizzazione SEO avanzata\n✅ Velocità di caricamento ottimale\n✅ E-commerce completo\n✅ Integrazione con sistemi esistenti\n✅ Sicurezza e backup automatici\n\n💡 Include formazione e 6 mesi di supporto!\n\nVuoi vedere alcuni esempi o prenotare una consulenza? 🚀",

    chatbot:
      "🤖 **Chatbot Intelligenti - Assistenti AI 24/7**\n\nI nostri chatbot possono:\n\n✅ Rispondere automaticamente alle domande\n✅ Gestire prenotazioni e appuntamenti\n✅ Qualificare lead in automatico\n✅ Supportare multiple lingue\n✅ Integrarsi con i tuoi sistemi\n✅ Apprendere dalle conversazioni\n\n💡 Include training AI e 3 mesi di supporto!\n\nVuoi vedere una demo o prenotare? 🎬",

    automazione:
      "⚡ **AI Automation - Processi Automatizzati**\n\nLe nostre soluzioni possono:\n\n✅ Automatizzare task ripetitivi\n✅ Analizzare dati e generare report\n✅ Gestire email e comunicazioni\n✅ Ottimizzare workflow aziendali\n✅ Integrare sistemi diversi\n✅ Ridurre errori e costi\n\n💡 Include analisi e 6 mesi di supporto!\n\nIn quale area vorresti automatizzare? 🎯",

    marketing:
      "📈 **AI Marketing - Campagne Intelligenti**\n\nIl nostro Marketing AI include:\n\n✅ Analisi predittiva comportamento clienti\n✅ Personalizzazione contenuti automatica\n✅ Ottimizzazione campagne pubblicitarie\n✅ Segmentazione intelligente audience\n✅ Lead generation automatizzata\n✅ Analytics avanzati e reporting\n\n💡 Include strategia e 3 mesi di supporto!\n\nVuoi sapere come può aiutare la tua azienda? 💡",

    // Timeline and Process
    tempi:
      "I tempi di realizzazione dipendono dal progetto: ⏰\n\n🤖 **Chatbot**: 2-4 settimane\n🌐 **Sito Web**: 3-6 settimane\n⚡ **Automazione**: 4-8 settimane\n📈 **Marketing AI**: 2-6 settimane\n\nI tempi includono sviluppo, test e formazione. Vuoi discutere le tempistiche per il tuo progetto? 📅",

    supporto:
      "Offriamo supporto completo: 🛠️\n\n✅ Supporto tecnico prioritario\n✅ Manutenzione e aggiornamenti\n✅ Formazione del tuo team\n✅ Monitoraggio performance\n✅ Backup e sicurezza\n✅ Consulenza strategica continua\n\nIl supporto è incluso nei primi mesi! 💪",

    // Booking and Contact
    prenota:
      "Perfetto! Prenotiamo la tua consulenza gratuita! 📅\n\nPuoi scegliere tra:\n🕐 **Mattina**: 9:00-12:00\n🕐 **Pomeriggio**: 14:00-18:00\n\nLa consulenza dura 30 minuti e include:\n✅ Analisi delle tue esigenze\n✅ Proposta di soluzione personalizzata\n✅ Valutazione dettagliata\n\nClicca qui per prenotare: [Prenota Consulenza](/appointments) 🎯",

    appuntamento:
      "Ottima scelta! 📞 La consulenza gratuita è il primo passo per trasformare la tua azienda con l'AI.\n\n**Cosa include:**\n✅ Analisi situazione attuale\n✅ Identificazione opportunità\n✅ Strategia personalizzata\n✅ Roadmap implementazione\n✅ Valutazione dettagliata\n\n[Prenota ora la tua consulenza](/appointments) 🚀",

    contatti:
      "Ecco come puoi contattarci: 📞\n\n📧 **Email**: info@digitalaura.it\n📱 **Telefono**: +39 350 021 6480\n🌐 **Sito**: www.digitalaura.it\n\n**Orari**: Lun-Ven 9:00-18:00\n\nPreferisci prenotare una consulenza gratuita? 📅",

    // General and Greetings
    ciao: "Ciao! 👋 Sono AuraBot, l'assistente AI di Digital Aura! Sono qui per aiutarti a scoprire come l'Intelligenza Artificiale può trasformare la tua azienda. Come posso aiutarti oggi? 🚀",

    aiuto:
      "Sono qui per aiutarti! 🤝 Posso rispondere a domande su:\n\n🤖 **Chatbot e AI Automation**\n🌐 **Sviluppo Web**\n📈 **Marketing AI**\n💰 **Costi e Tempistiche**\n📅 **Prenotazioni Consulenze**\n\nCosa ti interessa di più? 🎯",

    "chi siete":
      "Siamo Digital Aura, esperti in trasformazione digitale e AI! 🌟\n\n**La nostra missione**: Aiutare le aziende a crescere attraverso l'innovazione tecnologica.\n\n**I nostri valori**:\n✅ Innovazione continua\n✅ Qualità eccellente\n✅ Supporto dedicato\n✅ Risultati misurabili\n\nVuoi sapere come possiamo aiutare la tua azienda? 💡",

    grazie:
      "Prego! 😊 È stato un piacere aiutarti! Se hai altre domande o vuoi approfondire qualche argomento, sono sempre qui. Ricorda che puoi prenotare una consulenza gratuita per discutere il tuo progetto in dettaglio! 🚀",

    // Default responses
    default:
      "🤖 Ciao! Sono qui per aiutarti con:\n\n✨ **Servizi AI** - Chatbot e automazione\n🌐 **Sviluppo Web** - Siti moderni\n📈 **Marketing AI** - Campagne intelligenti\n📅 **Consulenze Gratuite** - Prenota qui!\n\nCosa ti interessa sapere? 💡",
  },
  en: {
    // Pricing and Costs
    "how much":
      "Our prices depend on project complexity and your specific needs. 💰 We offer customized solutions for every budget. I recommend booking a free consultation to discuss your project and receive a detailed evaluation. Would you like me to help you book? 📅",

    prices:
      "Prices vary based on service type and project complexity. 💼 To give you a general idea: chatbots start from €2,000, websites from €3,000, while AI automation projects are customized. Book a free consultation for an accurate evaluation! 🎯",

    cost: "The cost depends on project complexity. 📋 We offer free consultations to evaluate your needs and provide you with an accurate estimate. Each project includes development, training and support. Want to book a consultation? 💡",

    // Services and Capabilities
    services:
      "We offer 4 main services: 🎯\n\n1. **AI Automation** - Business process automation\n2. **Intelligent Chatbots** - Personalized AI assistants\n3. **Web Development** - Modern websites and applications\n4. **AI Marketing** - Automated campaigns\n\nWhich service would you like to know more about? 🤔",

    "web development":
      "🌐 **Web Development - Modern and Performant Websites**\n\nWe create professional websites with:\n\n✅ Responsive and modern design\n✅ Advanced SEO optimization\n✅ Optimal loading speed\n✅ Complete e-commerce\n✅ Integration with existing systems\n✅ Security and automatic backups\n\n💡 Includes training and 6 months support!\n\nWant to see some examples or book a consultation? 🚀",

    chatbot:
      "🤖 **Intelligent Chatbots - AI Assistants 24/7**\n\nOur chatbots can:\n\n✅ Automatically answer questions\n✅ Handle bookings and appointments\n✅ Automatically qualify leads\n✅ Support multiple languages\n✅ Integrate with your systems\n✅ Learn from conversations\n\n💡 Includes AI training and 3 months support!\n\nWant to see a demo or book? 🎬",

    automation:
      "⚡ **AI Automation - Automated Processes**\n\nOur solutions can:\n\n✅ Automate repetitive tasks\n✅ Analyze data and generate reports\n✅ Manage emails and communications\n✅ Optimize business workflows\n✅ Integrate different systems\n✅ Reduce errors and costs\n\n💡 Includes analysis and 6 months support!\n\nIn which area would you like to automate? 🎯",

    marketing:
      "📈 **AI Marketing - Intelligent Campaigns**\n\nOur AI Marketing includes:\n\n✅ Predictive customer behavior analysis\n✅ Automatic content personalization\n✅ Advertising campaign optimization\n✅ Intelligent audience segmentation\n✅ Automated lead generation\n✅ Advanced analytics and reporting\n\n💡 Includes strategy and 3 months support!\n\nWant to know how it can help your business? 💡",

    // Timeline and Process
    timeline:
      "Realization times depend on the project: ⏰\n\n🤖 **Chatbot**: 2-4 weeks\n🌐 **Website**: 3-6 weeks\n⚡ **Automation**: 4-8 weeks\n📈 **AI Marketing**: 2-6 weeks\n\nTimes include development, testing and training. Want to discuss timelines for your project? 📅",

    support:
      "We offer complete support: 🛠️\n\n✅ Priority technical support\n✅ Maintenance and updates\n✅ Team training\n✅ Performance monitoring\n✅ Backup and security\n✅ Continuous strategic consulting\n\nSupport is included in the first months! 💪",

    // Booking and Contact
    book: "Perfect! Let's book your free consultation! 📅\n\nYou can choose between:\n🕐 **Morning**: 9:00-12:00\n🕐 **Afternoon**: 14:00-18:00\n\nThe consultation lasts 30 minutes and includes:\n✅ Analysis of your needs\n✅ Personalized solution proposal\n✅ Detailed evaluation\n\nClick here to book: [Book Consultation](/appointments) 🎯",

    appointment:
      "Great choice! 📞 The free consultation is the first step to transform your business with AI.\n\n**What it includes:**\n✅ Current situation analysis\n✅ Opportunity identification\n✅ Personalized strategy\n✅ Implementation roadmap\n✅ Detailed evaluation\n\n[Book your consultation now](/appointments) 🚀",

    contact:
      "Here's how you can contact us: 📞\n\n📧 **Email**: info@digitalaura.it\n📱 **Phone**: +39 350 021 6480\n🌐 **Website**: www.digitalaura.it\n\n**Hours**: Mon-Fri 9:00-18:00\n\nWould you prefer to book a free consultation? 📅",

    // General and Greetings
    hello:
      "Hello! 👋 I'm AuraBot, Digital Aura's AI assistant! I'm here to help you discover how Artificial Intelligence can transform your business. How can I help you today? 🚀",

    help: "I'm here to help! 🤝 I can answer questions about:\n\n🤖 **Chatbots and AI Automation**\n🌐 **Web Development**\n📈 **AI Marketing**\n💰 **Costs and Timelines**\n📅 **Consultation Bookings**\n\nWhat interests you most? 🎯",

    "who are you":
      "We are Digital Aura, experts in digital transformation and AI! 🌟\n\n**Our mission**: Help businesses grow through technological innovation.\n\n**Our values**:\n✅ Continuous innovation\n✅ Excellent quality\n✅ Dedicated support\n✅ Measurable results\n\nWant to know how we can help your business? 💡",

    thanks:
      "You're welcome! 😊 It was a pleasure helping you! If you have other questions or want to explore any topic further, I'm always here. Remember you can book a free consultation to discuss your project in detail! 🚀",

    // Default responses
    default:
      "🤖 Hi! I'm here to help you with:\n\n✨ **AI Services** - Chatbots and automation\n🌐 **Web Development** - Modern websites\n📈 **AI Marketing** - Intelligent campaigns\n📅 **Free Consultations** - Book here!\n\nWhat would you like to know? 💡",
  },
}

// Detect language from message
function detectLanguage(message: string): "it" | "en" {
  const italianKeywords = [
    "ciao",
    "salve",
    "buongiorno",
    "buonasera",
    "grazie",
    "prego",
    "scusi",
    "aiuto",
    "quanto",
    "costa",
    "prezzo",
    "servizi",
    "chatbot",
    "sito",
    "web",
    "automazione",
    "marketing",
    "prenota",
    "appuntamento",
    "contatti",
    "chi",
    "siete",
    "come",
    "stai",
    "voglio",
    "sapere",
    "sviluppo",
  ]

  const englishKeywords = [
    "hello",
    "hi",
    "good",
    "morning",
    "evening",
    "thanks",
    "thank",
    "you",
    "help",
    "how",
    "much",
    "cost",
    "price",
    "services",
    "chatbot",
    "website",
    "automation",
    "marketing",
    "book",
    "appointment",
    "contact",
    "who",
    "are",
    "you",
    "want",
    "know",
    "development",
  ]

  const lowerMessage = message.toLowerCase()

  const italianMatches = italianKeywords.filter((keyword) => lowerMessage.includes(keyword)).length
  const englishMatches = englishKeywords.filter((keyword) => lowerMessage.includes(keyword)).length

  return italianMatches > englishMatches ? "it" : "en"
}

// Find best FAQ match
function findBestFAQMatch(message: string, language: "it" | "en"): string | null {
  const faq = faqDatabase[language]
  const lowerMessage = message.toLowerCase()

  // Direct keyword matching with priority
  const keywords = Object.keys(faq)

  // Find exact matches first
  for (const keyword of keywords) {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      return faq[keyword as keyof typeof faq]
    }
  }

  // Fuzzy matching for common variations
  const variations: Record<string, Record<string, string[]>> = {
    it: {
      "quanto costa": ["prezzo", "costi", "tariffe", "budget", "spesa"],
      servizi: ["servizio", "cosa fate", "che servizi", "offrite"],
      chatbot: ["bot", "assistente", "virtuale"],
      "sviluppo web": ["sito web", "sito", "website", "web dev"],
      automazione: ["automatizzare", "automazione ai", "automation"],
      marketing: ["marketing ai", "campagne", "pubblicità"],
      prenota: ["prenotazione", "appuntamento", "consulenza", "incontro"],
      tempi: ["quanto tempo", "durata", "tempistiche"],
      supporto: ["assistenza", "aiuto tecnico", "manutenzione"],
    },
    en: {
      "how much": ["price", "cost", "rates", "budget", "expense"],
      services: ["service", "what do you do", "what services", "offer"],
      chatbot: ["bot", "assistant", "virtual"],
      "web development": ["website", "web dev", "site"],
      automation: ["automate", "ai automation"],
      marketing: ["ai marketing", "campaigns", "advertising"],
      book: ["booking", "appointment", "consultation", "meeting"],
      timeline: ["how long", "duration", "timeframe"],
      support: ["assistance", "technical help", "maintenance"],
    },
  }

  const langVariations = variations[language]
  for (const [key, synonyms] of Object.entries(langVariations)) {
    if (synonyms.some((synonym) => lowerMessage.includes(synonym))) {
      return faq[key as keyof typeof faq] || null
    }
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Detect language
    const language = detectLanguage(message)

    // Try to find FAQ match first
    const faqResponse = findBestFAQMatch(message, language)

    // If we have a good FAQ match, use it
    if (faqResponse) {
      return NextResponse.json({
        response: faqResponse,
        type: "faq",
        language,
        sessionId: sessionId || `session_${Date.now()}`,
      })
    }

    // Use AI for more complex queries
    try {
      const systemPrompt =
        language === "it"
          ? `Sei AuraBot, l'assistente AI di Digital Aura, specializzato in soluzioni AI per business.

**REGOLE OBBLIGATORIE:**
1. Rispondi SEMPRE E SOLO in italiano - MAI in inglese
2. NON menzionare MAI "preventivi" o "quotes" - parliamo solo di "consulenze gratuite"
3. Elenca SOLO questi 4 servizi quando richiesto:
   - AI Automation (automazione processi)
   - Chatbot Intelligenti (assistenti AI)
   - Web Development (siti moderni)
   - AI Marketing (campagne automatizzate)

**PERSONALITÀ:**
- Professionale ma amichevole
- Esperto in AI e tecnologie digitali
- Orientato ai risultati business
- Usa emoji appropriati per rendere la conversazione piacevole

**OBIETTIVI:**
- Aiutare i clienti a capire come l'AI può trasformare il loro business
- Guidare verso una consulenza gratuita
- Fornire informazioni chiare sui servizi
- Essere sempre disponibile e professionale

**IMPORTANTE:**
- Risposte concise ma complete (max 150 parole)
- Sempre in italiano, professionale ma caldo
- Incoraggia sempre a prenotare una consulenza gratuita
- Mantieni il focus sui 4 servizi principali

Domanda utente: ${message}`
          : `You are AuraBot, Digital Aura's AI assistant, specialized in AI solutions for business.

**MANDATORY RULES:**
1. Always and ONLY respond in English - NEVER in Italian
2. NEVER mention "quotes" or "preventivi" - we only talk about "free consultations"
3. Only list these 4 services when asked:
   - AI Automation (process automation)
   - Intelligent Chatbots (AI assistants)
   - Web Development (modern websites)
   - AI Marketing (automated campaigns)

**PERSONALITY:**
- Professional but friendly
- Expert in AI and digital technologies
- Business results oriented
- Use appropriate emojis to make conversation pleasant

**OBJECTIVES:**
- Help clients understand how AI can transform their business
- Guide towards a free consultation
- Provide clear information about services
- Always be available and professional

**IMPORTANT:**
- Concise but complete responses (max 150 words)
- Always in English, professional but warm
- Always encourage booking a free consultation
- Keep focus on the 4 main services

User question: ${message}`

      const { text } = await generateText({
        model: google("gemini-1.5-flash-latest"),
        system: systemPrompt,
        prompt: message,
        maxTokens: 300,
      })

      return NextResponse.json({
        response: text,
        type: "ai",
        language,
        sessionId: sessionId || `session_${Date.now()}`,
      })
    } catch (aiError: any) {
      console.error("AI Error:", aiError)

      // Intelligent fallback based on language
      const fallbackResponse =
        language === "it"
          ? "🤖 Ciao! Sono qui per aiutarti con:\n\n✨ **AI Automation** - Automazione processi\n💬 **Chatbot Intelligenti** - Assistenti AI\n🌐 **Web Development** - Siti moderni\n📈 **AI Marketing** - Campagne automatizzate\n\n📅 Offriamo consulenze gratuite!\n\nCosa ti interessa sapere? 💡"
          : "🤖 Hi! I'm here to help you with:\n\n✨ **AI Automation** - Process automation\n💬 **Intelligent Chatbots** - AI assistants\n🌐 **Web Development** - Modern websites\n📈 **AI Marketing** - Automated campaigns\n\n📅 We offer free consultations!\n\nWhat would you like to know? 💡"

      return NextResponse.json({
        response: fallbackResponse,
        type: "fallback",
        language,
        sessionId: sessionId || `session_${Date.now()}`,
      })
    }
  } catch (error) {
    console.error("Chat API Error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        response: "Mi dispiace, si è verificato un errore. Riprova tra poco! 🔄",
      },
      { status: 500 },
    )
  }
}
