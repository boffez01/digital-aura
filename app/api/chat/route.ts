import { type NextRequest, NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

// Comprehensive FAQ database
const faqDatabase = {
  it: {
    // Pricing and Costs
    "quanto costa":
      "I nostri prezzi dipendono dalla complessità del progetto e dalle tue esigenze specifiche. 💰 Offriamo soluzioni personalizzate per ogni budget. Ti consiglio di prenotare una consulenza gratuita per discutere il tuo progetto e ricevere un preventivo dettagliato. Vuoi che ti aiuti a prenotare? 📅",
    prezzi:
      "I prezzi variano in base al tipo di servizio e alla complessità del progetto. 💼 Per darti un'idea generale: i chatbot partono da €2.000, i siti web da €3.000, mentre i progetti di automazione AI sono personalizzati. Prenota una consulenza gratuita per un preventivo preciso! 🎯",
    preventivo:
      "Sarò felice di aiutarti con un preventivo! 📋 Per fornirti una stima accurata, ho bisogno di capire meglio le tue esigenze. Prenota una consulenza gratuita di 30 minuti dove potremo discutere il tuo progetto in dettaglio. Vuoi che ti aiuti a prenotare? 📞",
    "costo chatbot":
      "Il costo di un chatbot dipende dalle funzionalità richieste. 🤖 Un chatbot base parte da €2.000, mentre soluzioni più avanzate con AI e integrazioni complesse possono arrivare fino a €10.000+. Include sviluppo, training, integrazione e 3 mesi di supporto. Vuoi saperne di più? 💡",
    "costo sito web":
      "I nostri siti web partono da €3.000 per soluzioni standard fino a €15.000+ per progetti complessi con e-commerce e funzionalità avanzate. 🌐 Include design responsive, SEO, sicurezza e 6 mesi di manutenzione. Prenota una consulenza per un preventivo personalizzato! 🚀",

    // Services and Capabilities
    servizi:
      "Offriamo 4 servizi principali: 🎯\n\n1. **Sviluppo Web** - Siti moderni e performanti\n2. **Chatbot AI** - Assistenti virtuali intelligenti\n3. **Automazione AI** - Processi automatizzati\n4. **Marketing AI** - Strategie potenziate dall'AI\n\nSu quale servizio vorresti saperne di più? 🤔",
    chatbot:
      "I nostri chatbot AI sono assistenti virtuali intelligenti che possono: 🤖\n\n✅ Rispondere alle domande dei clienti 24/7\n✅ Gestire prenotazioni e appuntamenti\n✅ Qualificare i lead automaticamente\n✅ Integrarsi con i tuoi sistemi esistenti\n✅ Supportare multiple lingue\n\nVuoi vedere una demo? 🎬",
    "sito web":
      "Creiamo siti web moderni e performanti con: 🌐\n\n✅ Design responsive e professionale\n✅ Ottimizzazione SEO avanzata\n✅ Velocità di caricamento ottimale\n✅ Sicurezza e backup automatici\n✅ Integrazione con sistemi di analytics\n✅ Supporto e manutenzione continua\n\nVuoi vedere alcuni esempi? 👀",
    automazione:
      "Le nostre soluzioni di automazione AI possono: ⚡\n\n✅ Automatizzare processi ripetitivi\n✅ Analizzare dati e generare report\n✅ Gestire email e comunicazioni\n✅ Ottimizzare workflow aziendali\n✅ Integrare sistemi diversi\n✅ Ridurre errori umani\n\nIn quale area vorresti automatizzare? 🎯",
    marketing:
      "Il nostro Marketing AI include: 📈\n\n✅ Analisi predittiva del comportamento clienti\n✅ Personalizzazione contenuti automatica\n✅ Ottimizzazione campagne pubblicitarie\n✅ Segmentazione intelligente audience\n✅ Chatbot per lead generation\n✅ Analytics avanzati e reporting\n\nVuoi sapere come può aiutare la tua azienda? 💡",

    // Timeline and Process
    tempi:
      "I tempi di realizzazione dipendono dal progetto: ⏰\n\n🤖 **Chatbot**: 2-4 settimane\n🌐 **Sito Web**: 3-6 settimane\n⚡ **Automazione**: 4-8 settimane\n📈 **Marketing AI**: 2-6 settimane\n\nI tempi includono sviluppo, test e formazione. Vuoi discutere le tempistiche per il tuo progetto? 📅",
    processo:
      "Il nostro processo è strutturato in 5 fasi: 📋\n\n1. **Consulenza** - Analisi esigenze (gratuita)\n2. **Progettazione** - Strategia e wireframe\n3. **Sviluppo** - Implementazione soluzione\n4. **Test** - Verifica e ottimizzazione\n5. **Lancio** - Deploy e formazione\n\nRicevi aggiornamenti costanti durante tutto il processo! 📞",
    supporto:
      "Offriamo supporto completo: 🛠️\n\n✅ Supporto tecnico prioritario\n✅ Manutenzione e aggiornamenti\n✅ Formazione del tuo team\n✅ Monitoraggio performance\n✅ Backup e sicurezza\n✅ Consulenza strategica continua\n\nIl supporto è incluso nei primi mesi, poi disponibile con piani dedicati. 💪",

    // Technical and Security
    sicurezza:
      "La sicurezza è la nostra priorità: 🔒\n\n✅ Crittografia end-to-end\n✅ Conformità GDPR completa\n✅ Backup automatici giornalieri\n✅ Monitoraggio 24/7\n✅ Certificati SSL/TLS\n✅ Autenticazione multi-fattore\n✅ Audit di sicurezza regolari\n\nI tuoi dati sono sempre protetti! 🛡️",
    gdpr: "Siamo completamente conformi al GDPR: 📋\n\n✅ Privacy by design\n✅ Consenso esplicito utenti\n✅ Diritto all'oblio\n✅ Portabilità dei dati\n✅ Data Protection Officer\n✅ Audit regolari\n✅ Documentazione completa\n\nLa privacy dei tuoi clienti è garantita! 🔐",
    integrazione:
      "Ci integriamo con tutti i principali sistemi: 🔗\n\n✅ CRM (Salesforce, HubSpot, Pipedrive)\n✅ E-commerce (Shopify, WooCommerce, Magento)\n✅ Email Marketing (Mailchimp, SendGrid)\n✅ Analytics (Google Analytics, Mixpanel)\n✅ Pagamenti (Stripe, PayPal)\n✅ Social Media (Facebook, Instagram, LinkedIn)\n\nQuale sistema usi attualmente? 🤔",

    // Industries and Use Cases
    settori:
      "Lavoriamo con diversi settori: 🏢\n\n🏥 **Sanità** - Prenotazioni e assistenza pazienti\n🏪 **Retail** - E-commerce e customer service\n🏦 **Finanza** - Consulenza e supporto clienti\n🏨 **Hospitality** - Prenotazioni e concierge\n🎓 **Educazione** - Supporto studenti e corsi\n🏭 **Manifattura** - Automazione processi\n\nIn quale settore operi? 🎯",
    ecommerce:
      "Per l'e-commerce offriamo: 🛒\n\n✅ Chatbot per assistenza clienti\n✅ Raccomandazioni prodotti AI\n✅ Automazione email marketing\n✅ Analisi comportamento utenti\n✅ Ottimizzazione conversioni\n✅ Gestione inventario intelligente\n✅ Supporto multicanale\n\nVuoi aumentare le tue vendite online? 📈",
    ristorante:
      "Per ristoranti e locali creiamo: 🍕\n\n✅ Chatbot per prenotazioni automatiche\n✅ Menu digitali interattivi\n✅ Sistema ordinazioni online\n✅ Gestione delivery e takeaway\n✅ Programmi fedeltà digitali\n✅ Recensioni e feedback automatici\n\nVuoi digitalizzare il tuo locale? 🚀",

    // Booking and Contact
    prenota:
      "Perfetto! Prenotiamo la tua consulenza gratuita! 📅\n\nPuoi scegliere tra:\n🕐 **Mattina**: 9:00-12:00\n🕐 **Pomeriggio**: 14:00-18:00\n\nLa consulenza dura 30 minuti e include:\n✅ Analisi delle tue esigenze\n✅ Proposta di soluzione personalizzata\n✅ Preventivo dettagliato\n\nClicca qui per prenotare: [Prenota Consulenza](/appointments) 🎯",
    appuntamento:
      "Ottima scelta! 📞 La consulenza gratuita è il primo passo per trasformare la tua azienda con l'AI.\n\n**Cosa include:**\n✅ Analisi situazione attuale\n✅ Identificazione opportunità\n✅ Strategia personalizzata\n✅ Roadmap implementazione\n✅ Preventivo dettagliato\n\n[Prenota ora la tua consulenza](/appointments) 🚀",
    contatti:
      "Ecco come puoi contattarci: 📞\n\n📧 **Email**: info@digitalaura.it\n📱 **Telefono**: +39 123 456 7890\n🌐 **Sito**: www.digitalaura.it\n📍 **Indirizzo**: Via Roma 123, Milano\n\n**Orari**: Lun-Ven 9:00-18:00\n\nPreferisci prenotare una consulenza gratuita? 📅",

    // General and Greetings
    ciao: "Ciao! 👋 Sono AuraBot, l'assistente AI di Digital Aura! Sono qui per aiutarti a scoprire come l'Intelligenza Artificiale può trasformare la tua azienda. Come posso aiutarti oggi? 🚀",
    aiuto:
      "Sono qui per aiutarti! 🤝 Posso rispondere a domande su:\n\n🤖 **Chatbot e AI**\n🌐 **Sviluppo Web**\n⚡ **Automazione**\n📈 **Marketing AI**\n💰 **Prezzi e Preventivi**\n📅 **Prenotazioni**\n\nCosa ti interessa di più? 🎯",
    "chi siete":
      "Siamo Digital Aura, esperti in trasformazione digitale e AI! 🌟\n\n**La nostra missione**: Aiutare le aziende a crescere attraverso l'innovazione tecnologica.\n\n**I nostri valori**:\n✅ Innovazione continua\n✅ Qualità eccellente\n✅ Supporto dedicato\n✅ Risultati misurabili\n\nVuoi sapere come possiamo aiutare la tua azienda? 💡",
    grazie:
      "Prego! 😊 È stato un piacere aiutarti! Se hai altre domande o vuoi approfondire qualche argomento, sono sempre qui. Ricorda che puoi prenotare una consulenza gratuita per discutere il tuo progetto in dettaglio! 🚀",

    // Default responses
    default:
      "Interessante domanda! 🤔 Sono specializzato in soluzioni AI per business. Posso aiutarti con:\n\n🤖 Chatbot intelligenti\n🌐 Sviluppo web\n⚡ Automazione processi\n📈 Marketing AI\n💰 Preventivi\n📅 Prenotazioni\n\nSu cosa vorresti saperne di più? 💡",
  },
  en: {
    // Pricing and Costs
    "how much":
      "Our prices depend on project complexity and your specific needs. 💰 We offer customized solutions for every budget. I recommend booking a free consultation to discuss your project and receive a detailed quote. Would you like me to help you book? 📅",
    prices:
      "Prices vary based on service type and project complexity. 💼 To give you a general idea: chatbots start from €2,000, websites from €3,000, while AI automation projects are customized. Book a free consultation for an accurate quote! 🎯",
    quote:
      "I'd be happy to help you with a quote! 📋 To provide you with an accurate estimate, I need to better understand your needs. Book a free 30-minute consultation where we can discuss your project in detail. Would you like me to help you book? 📞",
    "chatbot cost":
      "Chatbot cost depends on required features. 🤖 A basic chatbot starts from €2,000, while more advanced solutions with AI and complex integrations can reach €10,000+. Includes development, training, integration and 3 months support. Want to know more? 💡",
    "website cost":
      "Our websites start from €3,000 for standard solutions up to €15,000+ for complex projects with e-commerce and advanced features. 🌐 Includes responsive design, SEO, security and 6 months maintenance. Book a consultation for a personalized quote! 🚀",

    // Services and Capabilities
    services:
      "We offer 4 main services: 🎯\n\n1. **Web Development** - Modern and performant websites\n2. **AI Chatbot** - Intelligent virtual assistants\n3. **AI Automation** - Automated processes\n4. **AI Marketing** - AI-powered strategies\n\nWhich service would you like to know more about? 🤔",
    chatbot:
      "Our AI chatbots are intelligent virtual assistants that can: 🤖\n\n✅ Answer customer questions 24/7\n✅ Handle bookings and appointments\n✅ Automatically qualify leads\n✅ Integrate with your existing systems\n✅ Support multiple languages\n\nWould you like to see a demo? 🎬",
    website:
      "We create modern and performant websites with: 🌐\n\n✅ Responsive and professional design\n✅ Advanced SEO optimization\n✅ Optimal loading speed\n✅ Security and automatic backups\n✅ Analytics system integration\n✅ Continuous support and maintenance\n\nWould you like to see some examples? 👀",
    automation:
      "Our AI automation solutions can: ⚡\n\n✅ Automate repetitive processes\n✅ Analyze data and generate reports\n✅ Manage emails and communications\n✅ Optimize business workflows\n✅ Integrate different systems\n✅ Reduce human errors\n\nIn which area would you like to automate? 🎯",
    marketing:
      "Our AI Marketing includes: 📈\n\n✅ Predictive customer behavior analysis\n✅ Automatic content personalization\n✅ Advertising campaign optimization\n✅ Intelligent audience segmentation\n✅ Chatbots for lead generation\n✅ Advanced analytics and reporting\n\nWant to know how it can help your business? 💡",

    // Timeline and Process
    timeline:
      "Realization times depend on the project: ⏰\n\n🤖 **Chatbot**: 2-4 weeks\n🌐 **Website**: 3-6 weeks\n⚡ **Automation**: 4-8 weeks\n📈 **AI Marketing**: 2-6 weeks\n\nTimes include development, testing and training. Want to discuss timelines for your project? 📅",
    process:
      "Our process is structured in 5 phases: 📋\n\n1. **Consultation** - Needs analysis (free)\n2. **Design** - Strategy and wireframes\n3. **Development** - Solution implementation\n4. **Testing** - Verification and optimization\n5. **Launch** - Deploy and training\n\nYou receive constant updates throughout the process! 📞",
    support:
      "We offer complete support: 🛠️\n\n✅ Priority technical support\n✅ Maintenance and updates\n✅ Team training\n✅ Performance monitoring\n✅ Backup and security\n✅ Continuous strategic consulting\n\nSupport is included in the first months, then available with dedicated plans. 💪",

    // Technical and Security
    security:
      "Security is our priority: 🔒\n\n✅ End-to-end encryption\n✅ Complete GDPR compliance\n✅ Daily automatic backups\n✅ 24/7 monitoring\n✅ SSL/TLS certificates\n✅ Multi-factor authentication\n✅ Regular security audits\n\nYour data is always protected! 🛡️",
    gdpr: "We are fully GDPR compliant: 📋\n\n✅ Privacy by design\n✅ Explicit user consent\n✅ Right to be forgotten\n✅ Data portability\n✅ Data Protection Officer\n✅ Regular audits\n✅ Complete documentation\n\nYour customers' privacy is guaranteed! 🔐",
    integration:
      "We integrate with all major systems: 🔗\n\n✅ CRM (Salesforce, HubSpot, Pipedrive)\n✅ E-commerce (Shopify, WooCommerce, Magento)\n✅ Email Marketing (Mailchimp, SendGrid)\n✅ Analytics (Google Analytics, Mixpanel)\n✅ Payments (Stripe, PayPal)\n✅ Social Media (Facebook, Instagram, LinkedIn)\n\nWhich system do you currently use? 🤔",

    // Industries and Use Cases
    industries:
      "We work with various industries: 🏢\n\n🏥 **Healthcare** - Appointments and patient assistance\n🏪 **Retail** - E-commerce and customer service\n🏦 **Finance** - Consulting and customer support\n🏨 **Hospitality** - Bookings and concierge\n🎓 **Education** - Student support and courses\n🏭 **Manufacturing** - Process automation\n\nWhich industry do you operate in? 🎯",
    ecommerce:
      "For e-commerce we offer: 🛒\n\n✅ Customer assistance chatbots\n✅ AI product recommendations\n✅ Email marketing automation\n✅ User behavior analysis\n✅ Conversion optimization\n✅ Intelligent inventory management\n✅ Multichannel support\n\nWant to increase your online sales? 📈",
    restaurant:
      "For restaurants and venues we create: 🍕\n\n✅ Automatic booking chatbots\n✅ Interactive digital menus\n✅ Online ordering system\n✅ Delivery and takeaway management\n✅ Digital loyalty programs\n✅ Automatic reviews and feedback\n\nWant to digitize your venue? 🚀",

    // Booking and Contact
    book: "Perfect! Let's book your free consultation! 📅\n\nYou can choose between:\n🕐 **Morning**: 9:00-12:00\n🕐 **Afternoon**: 14:00-18:00\n\nThe consultation lasts 30 minutes and includes:\n✅ Analysis of your needs\n✅ Personalized solution proposal\n✅ Detailed quote\n\nClick here to book: [Book Consultation](/appointments) 🎯",
    appointment:
      "Great choice! 📞 The free consultation is the first step to transform your business with AI.\n\n**What it includes:**\n✅ Current situation analysis\n✅ Opportunity identification\n✅ Personalized strategy\n✅ Implementation roadmap\n✅ Detailed quote\n\n[Book your consultation now](/appointments) 🚀",
    contact:
      "Here's how you can contact us: 📞\n\n📧 **Email**: info@digitalaura.it\n📱 **Phone**: +39 123 456 7890\n🌐 **Website**: www.digitalaura.it\n📍 **Address**: Via Roma 123, Milan\n\n**Hours**: Mon-Fri 9:00-18:00\n\nWould you prefer to book a free consultation? 📅",

    // General and Greetings
    hello:
      "Hello! 👋 I'm AuraBot, Digital Aura's AI assistant! I'm here to help you discover how Artificial Intelligence can transform your business. How can I help you today? 🚀",
    help: "I'm here to help! 🤝 I can answer questions about:\n\n🤖 **Chatbots and AI**\n🌐 **Web Development**\n⚡ **Automation**\n📈 **AI Marketing**\n💰 **Prices and Quotes**\n📅 **Bookings**\n\nWhat interests you most? 🎯",
    "who are you":
      "We are Digital Aura, experts in digital transformation and AI! 🌟\n\n**Our mission**: Help businesses grow through technological innovation.\n\n**Our values**:\n✅ Continuous innovation\n✅ Excellent quality\n✅ Dedicated support\n✅ Measurable results\n\nWant to know how we can help your business? 💡",
    thanks:
      "You're welcome! 😊 It was a pleasure helping you! If you have other questions or want to explore any topic further, I'm always here. Remember you can book a free consultation to discuss your project in detail! 🚀",

    // Default responses
    default:
      "Interesting question! 🤔 I specialize in AI solutions for business. I can help you with:\n\n🤖 Intelligent chatbots\n🌐 Web development\n⚡ Process automation\n📈 AI marketing\n💰 Quotes\n📅 Bookings\n\nWhat would you like to know more about? 💡",
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
  ]

  const lowerMessage = message.toLowerCase()

  const italianMatches = italianKeywords.filter((keyword) => lowerMessage.includes(keyword)).length
  const englishMatches = englishKeywords.filter((keyword) => lowerMessage.includes(keyword)).length

  return italianMatches > englishMatches ? "it" : "en"
}

// Find best FAQ match
function findBestFAQMatch(message: string, language: "it" | "en"): string {
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
  const variations: Record<string, string[]> = {
    it: {
      "quanto costa": ["prezzo", "costi", "tariffe", "budget", "spesa"],
      servizi: ["cosa fate", "che servizi", "offrite"],
      chatbot: ["bot", "assistente", "virtuale"],
      prenota: ["appuntamento", "consulenza", "incontro"],
      tempi: ["quanto tempo", "durata", "tempistiche"],
      supporto: ["assistenza", "aiuto tecnico", "manutenzione"],
    },
    en: {
      "how much": ["price", "cost", "rates", "budget", "expense"],
      services: ["what do you do", "what services", "offer"],
      chatbot: ["bot", "assistant", "virtual"],
      book: ["appointment", "consultation", "meeting"],
      timeline: ["how long", "duration", "timeframe"],
      support: ["assistance", "technical help", "maintenance"],
    },
  }

  const langVariations = variations[language]
  for (const [key, synonyms] of Object.entries(langVariations)) {
    if (synonyms.some((synonym) => lowerMessage.includes(synonym))) {
      return faq[key as keyof typeof faq]
    }
  }

  return faq.default
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
    if (faqResponse !== faqDatabase[language].default) {
      return NextResponse.json({
        response: faqResponse,
        type: "faq",
        language,
        sessionId: sessionId || `session_${Date.now()}`,
      })
    }

    // Try AI for more complex queries
    try {
      const systemPrompt =
        language === "it"
          ? `Sei AuraBot, l'assistente AI di Digital Aura, un'azienda specializzata in soluzioni AI per business.

PERSONALITÀ:
- Professionale ma amichevole
- Esperto in tecnologie AI e digitali
- Orientato ai risultati business
- Usa emoji appropriati
- Risposte concise ma complete

SERVIZI PRINCIPALI:
- Chatbot AI intelligenti
- Sviluppo web moderno
- Automazione processi AI
- Marketing AI avanzato

OBIETTIVI:
- Aiutare i clienti a capire come l'AI può trasformare il loro business
- Guidare verso una consulenza gratuita
- Fornire informazioni utili sui servizi
- Essere sempre disponibile e professionale

IMPORTANTE:
- Non fornire prezzi specifici, dire che dipendono dal progetto
- Incoraggiare sempre a prenotare una consulenza gratuita
- Essere entusiasta delle possibilità dell'AI
- Mantenere un tono professionale ma caldo`
          : `You are AuraBot, Digital Aura's AI assistant, a company specialized in AI solutions for business.

PERSONALITY:
- Professional but friendly
- Expert in AI and digital technologies
- Business results oriented
- Use appropriate emojis
- Concise but complete responses

MAIN SERVICES:
- Intelligent AI chatbots
- Modern web development
- AI process automation
- Advanced AI marketing

OBJECTIVES:
- Help clients understand how AI can transform their business
- Guide towards a free consultation
- Provide useful information about services
- Always be available and professional

IMPORTANT:
- Don't provide specific prices, say they depend on the project
- Always encourage booking a free consultation
- Be enthusiastic about AI possibilities
- Maintain a professional but warm tone`

      const { text } = await generateText({
        model: google("gemini-1.5-flash"),
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
    } catch (aiError) {
      console.error("AI Error:", aiError)

      // Fallback to FAQ default response
      return NextResponse.json({
        response: faqResponse,
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
