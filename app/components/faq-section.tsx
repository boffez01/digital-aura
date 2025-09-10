"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Plus, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "../contexts/language-context"

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState("general")
  const { language } = useLanguage()

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  const categories = [
    {
      id: "general",
      name: language === "it" ? "Generale" : "General",
      color: "border-orange-500 bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      id: "ai-automation",
      name: language === "it" ? "AI Automation" : "AI Automation",
      color: "border-purple-500 bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      id: "chatbot",
      name: language === "it" ? "Chatbot" : "Chatbot",
      color: "border-blue-500 bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: "web-dev",
      name: language === "it" ? "Web Development" : "Web Development",
      color: "border-green-500 bg-green-50",
      textColor: "text-green-600",
    },
    {
      id: "marketing",
      name: language === "it" ? "Marketing" : "Marketing",
      color: "border-red-500 bg-red-50",
      textColor: "text-red-600",
    },
    {
      id: "pricing",
      name: language === "it" ? "Prezzi & Pagamenti" : "Pricing & Payments",
      color: "border-yellow-500 bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      id: "technical",
      name: language === "it" ? "Tecnico" : "Technical",
      color: "border-indigo-500 bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      id: "support",
      name: language === "it" ? "Supporto" : "Support",
      color: "border-pink-500 bg-pink-50",
      textColor: "text-pink-600",
    },
  ]

  const faqData = {
    general: [
      {
        question: language === "it" ? "Che cos'è Digital Aura?" : "What is Digital Aura?",
        answer:
          language === "it"
            ? "Digital Aura è una startup innovativa specializzata in soluzioni AI per il business. Offriamo servizi di automazione AI, chatbot intelligenti, sviluppo web e marketing digitale per trasformare le aziende attraverso la tecnologia."
            : "Digital Aura is an innovative startup specialized in AI solutions for business. We offer AI automation services, intelligent chatbots, web development and digital marketing to transform companies through technology.",
      },
      {
        question:
          language === "it" ? "Quanto tempo richiede un progetto tipico?" : "How long does a typical project take?",
        answer:
          language === "it"
            ? "I tempi variano in base alla complessità: chatbot semplici 2-4 settimane, automazioni AI 1-3 mesi, siti web 4-8 settimane. Forniamo sempre una timeline dettagliata durante la consulenza iniziale."
            : "Timelines vary based on complexity: simple chatbots 2-4 weeks, AI automations 1-3 months, websites 4-8 weeks. We always provide a detailed timeline during the initial consultation.",
      },
      {
        question: language === "it" ? "Offrite supporto post-lancio?" : "Do you offer post-launch support?",
        answer:
          language === "it"
            ? "Sì, offriamo supporto 24/7 per tutti i nostri progetti. Include manutenzione, aggiornamenti, monitoraggio delle performance e assistenza tecnica continua per garantire il successo a lungo termine."
            : "Yes, we offer 24/7 support for all our projects. This includes maintenance, updates, performance monitoring and continuous technical assistance to ensure long-term success.",
      },
      {
        question:
          language === "it"
            ? "Lavorate con aziende di tutte le dimensioni?"
            : "Do you work with companies of all sizes?",
        answer:
          language === "it"
            ? "Assolutamente! Lavoriamo con startup, PMI e grandi aziende. Adattiamo le nostre soluzioni alle esigenze e al budget specifico di ogni cliente, garantendo sempre il massimo ROI."
            : "We work with startups, SMEs and large companies. We adapt our solutions to the specific needs and budget of each client, always ensuring maximum ROI.",
      },
      {
        question: language === "it" ? "Dove siete localizzati?" : "Where are you located?",
        answer:
          language === "it"
            ? "La nostra sede principale è a Brescia, Italia, ma lavoriamo con clienti in tutta Europa e oltre. Offriamo servizi completamente remoti e consulenze online."
            : "Our main office is in Brescia, Italy, but we work with clients throughout Europe and beyond. We offer completely remote services and online consultations.",
      },
      {
        question:
          language === "it" ? "Quali settori servite principalmente?" : "What industries do you primarily serve?",
        answer:
          language === "it"
            ? "Serviamo diversi settori: e-commerce, servizi professionali, sanità, fintech, manifatturiero, hospitality e startup. La nostra esperienza AI si adatta a qualsiasi industria."
            : "We serve various sectors: e-commerce, professional services, healthcare, fintech, manufacturing, hospitality and startups. Our AI expertise adapts to any industry.",
      },
      {
        question: language === "it" ? "Come iniziare un progetto con voi?" : "How to start a project with you?",
        answer:
          language === "it"
            ? "Semplice! Prenota una consulenza gratuita di 30 minuti. Analizzeremo le tue esigenze, proporremo soluzioni personalizzate e creeremo un piano d'azione dettagliato."
            : "Simple! Book a free 30-minute consultation. We'll analyze your needs, propose customized solutions and create a detailed action plan.",
      },
    ],
    "ai-automation": [
      {
        question:
          language === "it" ? "Quali processi possono essere automatizzati?" : "What processes can be automated?",
        answer:
          language === "it"
            ? "Possiamo automatizzare gestione documenti, customer service, analisi dati, reportistica, workflow approvazioni, gestione inventario, lead qualification, fatturazione, scheduling e molto altro. Analizziamo i vostri processi per identificare le migliori opportunità."
            : "We can automate document management, customer service, data analysis, reporting, approval workflows, inventory management, lead qualification, billing, scheduling and much more. We analyze your processes to identify the best opportunities.",
      },
      {
        question:
          language === "it"
            ? "Quanto posso risparmiare con l'automazione AI?"
            : "How much can I save with AI automation?",
        answer:
          language === "it"
            ? "I nostri clienti vedono tipicamente riduzioni dei costi del 40-70% e aumenti di produttività del 200-300%. Il ROI medio è di 5x entro il primo anno, con tempi di payback di 3-6 mesi."
            : "Our clients typically see cost reductions of 40-70% and productivity increases of 200-300%. The average ROI is 5x within the first year, with payback times of 3-6 months.",
      },
      {
        question: language === "it" ? "L'AI sostituirà i miei dipendenti?" : "Will AI replace my employees?",
        answer:
          language === "it"
            ? "No, l'AI potenzia i vostri dipendenti eliminando compiti ripetitivi e permettendo loro di concentrarsi su attività strategiche e creative. Aumenta la soddisfazione lavorativa e la produttività del team."
            : "No, AI empowers your employees by eliminating repetitive tasks and allowing them to focus on strategic and creative activities. It increases job satisfaction and team productivity.",
      },
      {
        question: language === "it" ? "Come garantite la sicurezza dei dati?" : "How do you ensure data security?",
        answer:
          language === "it"
            ? "Utilizziamo crittografia end-to-end, conformità GDPR, server sicuri in EU, backup automatici e audit regolari. I vostri dati sono sempre protetti e sotto il vostro controllo completo."
            : "We use end-to-end encryption, GDPR compliance, secure EU servers, automatic backups and regular audits. Your data is always protected and under your complete control.",
      },
      {
        question: language === "it" ? "Quali tecnologie AI utilizzate?" : "What AI technologies do you use?",
        answer:
          language === "it"
            ? "Utilizziamo le tecnologie più avanzate: GPT-4, Claude, machine learning personalizzato, computer vision, NLP, RPA e algoritmi proprietari. Scegliamo sempre la tecnologia migliore per ogni caso d'uso."
            : "We use the most advanced technologies: GPT-4, Claude, custom machine learning, computer vision, NLP, RPA and proprietary algorithms. We always choose the best technology for each use case.",
      },
      {
        question:
          language === "it"
            ? "Posso integrare l'AI con i miei sistemi esistenti?"
            : "Can I integrate AI with my existing systems?",
        answer:
          language === "it"
            ? "Assolutamente! Integriamo con qualsiasi sistema: CRM, ERP, database, API, software legacy. Creiamo connessioni seamless senza interrompere le operazioni esistenti."
            : "We integrate with any system: CRM, ERP, databases, APIs, legacy software. We create seamless connections without disrupting existing operations.",
      },
      {
        question:
          language === "it" ? "Quanto tempo serve per vedere i primi risultati?" : "How long to see first results?",
        answer:
          language === "it"
            ? "I primi risultati sono visibili già dopo 2-4 settimane dall'implementazione. Risultati significativi e ROI completo si vedono tipicamente entro 2-3 mesi."
            : "First results are visible after 2-4 weeks from implementation. Significant results and complete ROI are typically seen within 2-3 months.",
      },
      {
        question: language === "it" ? "Offrite formazione per il team?" : "Do you offer team training?",
        answer:
          language === "it"
            ? "Sì, includiamo sempre formazione completa per il vostro team. Sessioni pratiche, documentazione dettagliata e supporto continuo per garantire l'adozione ottimale."
            : "Yes, we always include complete training for your team. Practical sessions, detailed documentation and continuous support to ensure optimal adoption.",
      },
    ],
    chatbot: [
      {
        question: language === "it" ? "Che tipo di chatbot create?" : "What type of chatbots do you create?",
        answer:
          language === "it"
            ? "Creiamo chatbot AI avanzati per customer service, lead generation, e-commerce, prenotazioni, FAQ, supporto tecnico, vendite, onboarding clienti e assistenza interna. Ogni chatbot è personalizzato per il vostro business e integrato con i vostri sistemi."
            : "We create advanced AI chatbots for customer service, lead generation, e-commerce, bookings, FAQ, technical support, sales, customer onboarding and internal assistance. Each chatbot is customized for your business and integrated with your systems.",
      },
      {
        question:
          language === "it" ? "Il chatbot può parlare più lingue?" : "Can the chatbot speak multiple languages?",
        answer:
          language === "it"
            ? "Sì, i nostri chatbot supportano oltre 50 lingue con traduzione automatica in tempo reale. Possono rilevare automaticamente la lingua dell'utente e rispondere nella lingua preferita, mantenendo il contesto della conversazione."
            : "Yes, our chatbots support over 50 languages with real-time automatic translation. They can automatically detect the user's language and respond in the preferred language, maintaining conversation context.",
      },
      {
        question:
          language === "it"
            ? "Come si integra con i nostri sistemi esistenti?"
            : "How does it integrate with our existing systems?",
        answer:
          language === "it"
            ? "Integriamo con CRM, ERP, e-commerce, database, email marketing, calendari, sistemi di ticketing e qualsiasi API. Il chatbot accede ai dati in tempo reale per fornire risposte accurate e aggiornate."
            : "We integrate with CRM, ERP, e-commerce, databases, email marketing, calendars, ticketing systems and any API. The chatbot accesses data in real-time to provide accurate and up-to-date responses.",
      },
      {
        question: language === "it" ? "Quanto è accurato il chatbot?" : "How accurate is the chatbot?",
        answer:
          language === "it"
            ? "I nostri chatbot raggiungono il 95-98% di accuratezza grazie all'AI avanzata e al training continuo. Monitoriamo costantemente le performance e ottimizziamo le risposte basandoci sui feedback reali."
            : "Our chatbots achieve 95-98% accuracy thanks to advanced AI and continuous training. We constantly monitor performance and optimize responses based on real feedback.",
      },
      {
        question:
          language === "it"
            ? "Il chatbot può gestire conversazioni complesse?"
            : "Can the chatbot handle complex conversations?",
        answer:
          language === "it"
            ? "Sì, utilizziamo AI conversazionale avanzata che comprende contesto, intent e sentiment. Può gestire conversazioni multi-turn, ricordare informazioni precedenti e escalare a operatori umani quando necessario."
            : "Yes, we use advanced conversational AI that understands context, intent and sentiment. It can handle multi-turn conversations, remember previous information and escalate to human operators when necessary.",
      },
      {
        question: language === "it" ? "Su quali piattaforme funziona?" : "What platforms does it work on?",
        answer:
          language === "it"
            ? "I nostri chatbot funzionano su siti web, WhatsApp, Telegram, Facebook Messenger, Instagram, app mobile, Slack e qualsiasi piattaforma con API. Un'unica soluzione per tutti i canali."
            : "Our chatbots work on websites, WhatsApp, Telegram, Facebook Messenger, Instagram, mobile apps, Slack and any platform with API. One solution for all channels.",
      },
      {
        question:
          language === "it"
            ? "Posso personalizzare la personalità del chatbot?"
            : "Can I customize the chatbot's personality?",
        answer:
          language === "it"
            ? "Assolutamente! Definiamo insieme tono di voce, personalità, stile comunicativo e brand voice. Il chatbot riflette perfettamente la vostra identità aziendale e i valori del brand."
            : "We define together tone of voice, personality, communication style and brand voice. The chatbot perfectly reflects your corporate identity and brand values.",
      },
      {
        question: language === "it" ? "Come gestite la privacy degli utenti?" : "How do you handle user privacy?",
        answer:
          language === "it"
            ? "Rispettiamo rigorosamente GDPR e normative privacy. I dati sono crittografati, anonimizzati quando possibile e conservati secondo le vostre policy. Gli utenti hanno sempre controllo sui loro dati."
            : "We strictly respect GDPR and privacy regulations. Data is encrypted, anonymized when possible and stored according to your policies. Users always have control over their data.",
      },
    ],
    "web-dev": [
      {
        question:
          language === "it"
            ? "Che tecnologie utilizzate per lo sviluppo web?"
            : "What technologies do you use for web development?",
        answer:
          language === "it"
            ? "Utilizziamo React, Next.js, TypeScript, Node.js, Python, cloud AWS/Vercel, database moderni (PostgreSQL, MongoDB), headless CMS e le migliori pratiche SEO. Creiamo siti veloci, sicuri e scalabili con design responsive."
            : "We use React, Next.js, TypeScript, Node.js, Python, AWS/Vercel cloud, modern databases (PostgreSQL, MongoDB), headless CMS and SEO best practices. We create fast, secure and scalable sites with responsive design.",
      },
      {
        question:
          language === "it"
            ? "Il sito sarà ottimizzato per i motori di ricerca?"
            : "Will the site be optimized for search engines?",
        answer:
          language === "it"
            ? "Assolutamente! Implementiamo SEO tecnico avanzato, ottimizzazione velocità, meta tag, schema markup, sitemap XML, Core Web Vitals e tutte le best practice per garantire visibilità massima sui motori di ricerca."
            : "We implement advanced technical SEO, speed optimization, meta tags, schema markup, XML sitemaps, Core Web Vitals and all best practices to ensure maximum visibility on search engines.",
      },
      {
        question:
          language === "it" ? "Posso gestire il contenuto del sito da solo?" : "Can I manage the site content myself?",
        answer:
          language === "it"
            ? "Sì, creiamo CMS intuitivi e user-friendly che permettono di modificare testi, immagini, prodotti e pagine senza competenze tecniche. Forniamo anche training completo e documentazione dettagliata per il vostro team."
            : "Yes, we create intuitive and user-friendly CMS that allow you to modify texts, images, products and pages without technical skills. We also provide complete training and detailed documentation for your team.",
      },
      {
        question: language === "it" ? "Il sito sarà mobile-friendly?" : "Will the site be mobile-friendly?",
        answer:
          language === "it"
            ? "Tutti i nostri siti sono completamente responsive e ottimizzati per mobile-first. Testiamo su tutti i dispositivi e browser per garantire un'esperienza perfetta su smartphone, tablet e desktop."
            : "All our sites are completely responsive and optimized for mobile-first. We test on all devices and browsers to ensure a perfect experience on smartphones, tablets and desktops.",
      },
      {
        question: language === "it" ? "Quanto sarà veloce il mio sito?" : "How fast will my site be?",
        answer:
          language === "it"
            ? "I nostri siti raggiungono punteggi Google PageSpeed di 90-100. Utilizziamo CDN globali, ottimizzazione immagini, lazy loading, caching avanzato e tecnologie moderne per garantire velocità massima."
            : "Our sites achieve Google PageSpeed scores of 90-100. We use global CDNs, image optimization, lazy loading, advanced caching and modern technologies to ensure maximum speed.",
      },
      {
        question: language === "it" ? "Includete e-commerce nel sito?" : "Do you include e-commerce in the site?",
        answer:
          language === "it"
            ? "Sì, creiamo soluzioni e-commerce complete con carrello, pagamenti sicuri, gestione inventario, analytics, integrazione spedizioni e funzionalità avanzate come raccomandazioni AI."
            : "Yes, we create complete e-commerce solutions with cart, secure payments, inventory management, analytics, shipping integration and advanced features like AI recommendations.",
      },
      {
        question: language === "it" ? "Il sito sarà sicuro?" : "Will the site be secure?",
        answer:
          language === "it"
            ? "Sicurezza massima garantita: certificati SSL, protezione DDoS, backup automatici, aggiornamenti sicurezza, autenticazione a due fattori e monitoraggio continuo per proteggere il vostro business."
            : "Maximum security guaranteed: SSL certificates, DDoS protection, automatic backups, security updates, two-factor authentication and continuous monitoring to protect your business.",
      },
      {
        question: language === "it" ? "Fornite hosting e manutenzione?" : "Do you provide hosting and maintenance?",
        answer:
          language === "it"
            ? "Sì, offriamo hosting cloud premium, manutenzione continua, aggiornamenti automatici, backup giornalieri, monitoraggio 24/7 e supporto tecnico completo per garantire sempre performance ottimali."
            : "Yes, we offer premium cloud hosting, continuous maintenance, automatic updates, daily backups, 24/7 monitoring and complete technical support to always ensure optimal performance.",
      },
    ],
    marketing: [
      {
        question: language === "it" ? "Come l'AI può migliorare il mio marketing?" : "How can AI improve my marketing?",
        answer:
          language === "it"
            ? "L'AI ottimizza targeting pubblicitario, personalizza contenuti, analizza comportamenti utenti, automatizza email marketing, predice trend, ottimizza budget e migliora ROI campagne. Risultati: +300% engagement, +150% conversioni, -40% costi acquisizione."
            : "AI optimizes advertising targeting, personalizes content, analyzes user behavior, automates email marketing, predicts trends, optimizes budgets and improves campaign ROI. Results: +300% engagement, +150% conversions, -40% acquisition costs.",
      },
      {
        question: language === "it" ? "Gestite anche i social media?" : "Do you also manage social media?",
        answer:
          language === "it"
            ? "Sì, offriamo gestione completa social media con AI: creazione contenuti automatica, scheduling ottimizzato, analisi sentiment, growth organico, community management e advertising mirato su tutte le piattaforme principali."
            : "Yes, we offer complete social media management with AI: automatic content creation, optimized scheduling, sentiment analysis, organic growth, community management and targeted advertising on all major platforms.",
      },
      {
        question:
          language === "it" ? "Quanto tempo per vedere risultati nel marketing?" : "How long to see marketing results?",
        answer:
          language === "it"
            ? "Primi risultati in 2-4 settimane, risultati significativi in 2-3 mesi. Il marketing AI accelera i tempi tradizionali grazie all'ottimizzazione continua e al targeting preciso basato sui dati."
            : "First results in 2-4 weeks, significant results in 2-3 months. AI marketing accelerates traditional timelines thanks to continuous optimization and precise data-based targeting.",
      },
      {
        question:
          language === "it"
            ? "Fornite report e analytics dettagliati?"
            : "Do you provide detailed reports and analytics?",
        answer:
          language === "it"
            ? "Sì, dashboard in tempo reale con KPI personalizzati, report automatici settimanali/mensili, analisi ROI dettagliate, insights predittivi e raccomandazioni AI per ottimizzare continuamente le performance."
            : "Yes, real-time dashboards with custom KPIs, automatic weekly/monthly reports, detailed ROI analysis, predictive insights and AI recommendations to continuously optimize performance.",
      },
      {
        question:
          language === "it" ? "Lavorate con influencer e creator?" : "Do you work with influencers and creators?",
        answer:
          language === "it"
            ? "Sì, abbiamo esperienza specifica con influencer e creator. Offriamo strategie di crescita organica, monetizzazione, brand partnerships, content optimization e personal branding per massimizzare la reach e i ricavi."
            : "Yes, we have specific experience with influencers and creators. We offer organic growth strategies, monetization, brand partnerships, content optimization and personal branding to maximize reach and revenue.",
      },
      {
        question:
          language === "it"
            ? "Gestite campagne pubblicitarie a pagamento?"
            : "Do you manage paid advertising campaigns?",
        answer:
          language === "it"
            ? "Assolutamente! Gestiamo campagne su Google Ads, Facebook/Instagram Ads, LinkedIn, TikTok e altre piattaforme. Utilizziamo AI per ottimizzazione automatica, targeting avanzato e massimizzazione ROI."
            : "We manage campaigns on Google Ads, Facebook/Instagram Ads, LinkedIn, TikTok and other platforms. We use AI for automatic optimization, advanced targeting and ROI maximization.",
      },
      {
        question:
          language === "it"
            ? "Aiutate con email marketing e automation?"
            : "Do you help with email marketing and automation?",
        answer:
          language === "it"
            ? "Sì, creiamo sistemi di email marketing avanzati con automazione AI: segmentazione intelligente, personalizzazione contenuti, A/B testing automatico, nurturing sequences e analytics dettagliati per massimizzare conversioni."
            : "Yes, we create advanced email marketing systems with AI automation: intelligent segmentation, content personalization, automatic A/B testing, nurturing sequences and detailed analytics to maximize conversions.",
      },
      {
        question:
          language === "it"
            ? "Offrite consulenza strategica di marketing?"
            : "Do you offer strategic marketing consulting?",
        answer:
          language === "it"
            ? "Certamente! Forniamo consulenza strategica completa: analisi mercato, positioning, customer journey mapping, strategia omnichannel, competitive analysis e roadmap di crescita personalizzate per il vostro business."
            : "We provide complete strategic consulting: market analysis, positioning, customer journey mapping, omnichannel strategy, competitive analysis and personalized growth roadmaps for your business.",
      },
    ],
    pricing: [
      {
        question: language === "it" ? "Quanto costano i vostri servizi?" : "How much do your services cost?",
        answer:
          language === "it"
            ? "I prezzi variano in base alla complessità: chatbot da €2.000-15.000, automazioni da €5.000-50.000, siti web da €3.000-25.000, marketing da €1.500-8.000/mese. Offriamo sempre preventivi personalizzati e piani di pagamento flessibili."
            : "Prices vary based on complexity: chatbots from €2,000-15,000, automations from €5,000-50,000, websites from €3,000-25,000, marketing from €1,500-8,000/month. We always offer personalized quotes and flexible payment plans.",
      },
      {
        question: language === "it" ? "Offrite piani di pagamento rateali?" : "Do you offer installment payment plans?",
        answer:
          language === "it"
            ? "Sì, offriamo pagamenti rateali personalizzati, leasing tecnologico, modelli pay-per-performance e finanziamenti agevolati. Lavoriamo con voi per trovare la soluzione finanziaria più adatta al vostro budget e cash flow."
            : "Yes, we offer personalized installment payments, technology leasing, pay-per-performance models and subsidized financing. We work with you to find the financial solution best suited to your budget and cash flow.",
      },
      {
        question: language === "it" ? "C'è una garanzia sui risultati?" : "Is there a guarantee on results?",
        answer:
          language === "it"
            ? "Sì, offriamo garanzia soddisfatti o rimborsati entro 30 giorni e garanzie specifiche sui KPI concordati. Se non raggiungiamo gli obiettivi prefissati, lavoriamo gratuitamente fino al successo o rimborsiamo."
            : "Yes, we offer a satisfied or money-back guarantee within 30 days and specific guarantees on agreed KPIs. If we don't reach the set objectives, we work for free until success or refund.",
      },
      {
        question: language === "it" ? "Ci sono costi nascosti o ricorrenti?" : "Are there hidden or recurring costs?",
        answer:
          language === "it"
            ? "No costi nascosti! Tutti i prezzi sono trasparenti e concordati in anticipo. I costi ricorrenti (hosting, manutenzione, licenze) sono sempre specificati chiaramente nel contratto con prezzi fissi per 12 mesi."
            : "No hidden costs! All prices are transparent and agreed in advance. Recurring costs (hosting, maintenance, licenses) are always clearly specified in the contract with fixed prices for 12 months.",
      },
      {
        question:
          language === "it"
            ? "Offrite sconti per startup o no-profit?"
            : "Do you offer discounts for startups or non-profits?",
        answer:
          language === "it"
            ? "Sì! Offriamo sconti fino al 50% per startup early-stage, organizzazioni no-profit e progetti con impatto sociale. Crediamo nell'innovazione e vogliamo supportare chi fa la differenza."
            : "Yes! We offer discounts up to 50% for early-stage startups, non-profit organizations and projects with social impact. We believe in innovation and want to support those who make a difference.",
      },
      {
        question:
          language === "it" ? "Posso pagare in base ai risultati ottenuti?" : "Can I pay based on results achieved?",
        answer:
          language === "it"
            ? "Sì, per alcuni servizi offriamo modelli pay-per-performance: pagate solo quando raggiungiamo obiettivi specifici come aumento vendite, lead generati o risparmi ottenuti. Condividiamo il rischio e il successo."
            : "Yes, for some services we offer pay-per-performance models: you pay only when we achieve specific objectives like increased sales, generated leads or savings obtained. We share risk and success.",
      },
      {
        question: language === "it" ? "Includete formazione nel prezzo?" : "Do you include training in the price?",
        answer:
          language === "it"
            ? "Sì, tutti i nostri progetti includono formazione completa del team, documentazione dettagliata, video tutorial e 3 mesi di supporto post-lancio senza costi aggiuntivi."
            : "Yes, all our projects include complete team training, detailed documentation, video tutorials and 3 months of post-launch support at no additional cost.",
      },
      {
        question: language === "it" ? "Accettate pagamenti internazionali?" : "Do you accept international payments?",
        answer:
          language === "it"
            ? "Sì, accettiamo pagamenti in EUR, USD, GBP tramite bonifico SEPA, carte di credito, PayPal e crypto. Fatturazione conforme alle normative internazionali e supporto multi-valuta."
            : "Yes, we accept payments in EUR, USD, GBP via SEPA transfer, credit cards, PayPal and crypto. Billing compliant with international regulations and multi-currency support.",
      },
    ],
    technical: [
      {
        question:
          language === "it" ? "Che livello di sicurezza garantite?" : "What level of security do you guarantee?",
        answer:
          language === "it"
            ? "Sicurezza enterprise-grade: crittografia AES-256, conformità GDPR/ISO27001, penetration testing regolari, backup crittografati, accesso zero-trust, monitoraggio 24/7 e incident response team dedicato."
            : "Enterprise-grade security: AES-256 encryption, GDPR/ISO27001 compliance, regular penetration testing, encrypted backups, zero-trust access, 24/7 monitoring and dedicated incident response team.",
      },
      {
        question: language === "it" ? "I vostri sistemi sono scalabili?" : "Are your systems scalable?",
        answer:
          language === "it"
            ? "Assolutamente! Utilizziamo architetture cloud-native, microservizi, auto-scaling e CDN globali. I nostri sistemi gestiscono da 100 a 10 milioni di utenti senza problemi di performance."
            : "We use cloud-native architectures, microservices, auto-scaling and global CDNs. Our systems handle from 100 to 10 million users without performance issues.",
      },
      {
        question: language === "it" ? "Che uptime garantite?" : "What uptime do you guarantee?",
        answer:
          language === "it"
            ? "Garantiamo 99.9% di uptime con SLA contrattuale. Utilizziamo infrastrutture ridondanti, failover automatico, monitoraggio proattivo e team di supporto 24/7 per minimizzare qualsiasi downtime."
            : "We guarantee 99.9% uptime with contractual SLA. We use redundant infrastructures, automatic failover, proactive monitoring and 24/7 support team to minimize any downtime.",
      },
      {
        question: language === "it" ? "Come gestite i backup dei dati?" : "How do you handle data backups?",
        answer:
          language === "it"
            ? "Backup automatici ogni 6 ore, retention di 30 giorni, storage geograficamente distribuito, crittografia end-to-end, test di recovery mensili e possibilità di restore point-in-time."
            : "Automatic backups every 6 hours, 30-day retention, geographically distributed storage, end-to-end encryption, monthly recovery tests and point-in-time restore capability.",
      },
      {
        question: language === "it" ? "Utilizzate API standard?" : "Do you use standard APIs?",
        answer:
          language === "it"
            ? "Sì, utilizziamo API RESTful e GraphQL standard, documentazione OpenAPI, webhook, rate limiting, autenticazione OAuth2/JWT e versioning per garantire integrazione facile e futura compatibilità."
            : "Yes, we use standard RESTful and GraphQL APIs, OpenAPI documentation, webhooks, rate limiting, OAuth2/JWT authentication and versioning to ensure easy integration and future compatibility.",
      },
      {
        question: language === "it" ? "Supportate integrazioni custom?" : "Do you support custom integrations?",
        answer:
          language === "it"
            ? "Certamente! Creiamo integrazioni personalizzate con qualsiasi sistema: ERP legacy, database proprietari, API custom, protocolli specifici e sistemi on-premise. Nessun limite tecnico."
            : "We create custom integrations with any system: legacy ERP, proprietary databases, custom APIs, specific protocols and on-premise systems. No technical limits.",
      },
      {
        question: language === "it" ? "Fornite documentazione tecnica?" : "Do you provide technical documentation?",
        answer:
          language === "it"
            ? "Sì, forniamo documentazione completa: architettura sistema, API reference, guide deployment, troubleshooting, best practices e video tutorial per sviluppatori e amministratori di sistema."
            : "Yes, we provide complete documentation: system architecture, API reference, deployment guides, troubleshooting, best practices and video tutorials for developers and system administrators.",
      },
      {
        question:
          language === "it" ? "Offrite ambienti di test e staging?" : "Do you offer test and staging environments?",
        answer:
          language === "it"
            ? "Sì, includiamo sempre ambienti separati per sviluppo, testing e staging. CI/CD automatizzato, branch protection, code review e deployment controllato per garantire qualità e stabilità."
            : "Yes, we always include separate environments for development, testing and staging. Automated CI/CD, branch protection, code review and controlled deployment to ensure quality and stability.",
      },
    ],
    support: [
      {
        question: language === "it" ? "Che tipo di supporto offrite?" : "What type of support do you offer?",
        answer:
          language === "it"
            ? "Supporto completo 24/7: chat live, email, telefono, screen sharing, accesso remoto, knowledge base, video tutorial e team di esperti dedicato per ogni progetto."
            : "Complete 24/7 support: live chat, email, phone, screen sharing, remote access, knowledge base, video tutorials and dedicated expert team for each project.",
      },
      {
        question: language === "it" ? "Quanto velocemente rispondete?" : "How quickly do you respond?",
        answer:
          language === "it"
            ? "Tempi di risposta garantiti: emergenze critiche entro 15 minuti, problemi urgenti entro 2 ore, richieste standard entro 4 ore lavorative. SLA contrattuale con penali per ritardi."
            : "Guaranteed response times: critical emergencies within 15 minutes, urgent issues within 2 hours, standard requests within 4 business hours. Contractual SLA with penalties for delays.",
      },
      {
        question: language === "it" ? "Il supporto è incluso nel prezzo?" : "Is support included in the price?",
        answer:
          language === "it"
            ? "Sì, i primi 3 mesi di supporto completo sono sempre inclusi. Dopo offriamo piani di supporto flessibili da €200-2000/mese in base alle esigenze e al livello di servizio richiesto."
            : "Yes, the first 3 months of complete support are always included. After that we offer flexible support plans from €200-2000/month based on needs and required service level.",
      },
      {
        question: language === "it" ? "Avete un team di supporto italiano?" : "Do you have an Italian support team?",
        answer:
          language === "it"
            ? "Sì, il nostro team di supporto parla perfettamente italiano e inglese. Comprendiamo le esigenze locali, normative italiane ed europee e forniamo assistenza nella vostra lingua madre."
            : "Yes, our support team speaks perfect Italian and English. We understand local needs, Italian and European regulations and provide assistance in your native language.",
      },
      {
        question: language === "it" ? "Offrite formazione continua?" : "Do you offer continuous training?",
        answer:
          language === "it"
            ? "Sì, organizziamo webinar mensili, workshop pratici, sessioni Q&A, aggiornamenti su nuove funzionalità e certificazioni per mantenere il vostro team sempre aggiornato sulle ultime tecnologie."
            : "Yes, we organize monthly webinars, practical workshops, Q&A sessions, updates on new features and certifications to keep your team always updated on the latest technologies.",
      },
      {
        question: language === "it" ? "Come gestite le richieste di modifica?" : "How do you handle change requests?",
        answer:
          language === "it"
            ? "Processo strutturato: analisi impatto, stima tempi/costi, approvazione cliente, implementazione controllata e testing. Modifiche minori spesso incluse, maggiori con preventivo trasparente."
            : "Structured process: impact analysis, time/cost estimation, client approval, controlled implementation and testing. Minor changes often included, major ones with transparent quote.",
      },
      {
        question: language === "it" ? "Monitorate proattivamente i sistemi?" : "Do you proactively monitor systems?",
        answer:
          language === "it"
            ? "Sì, monitoraggio 24/7 con alerting automatico: performance, uptime, sicurezza, errori, utilizzo risorse. Interveniamo prima che i problemi impattino gli utenti finali."
            : "Yes, 24/7 monitoring with automatic alerting: performance, uptime, security, errors, resource usage. We intervene before problems impact end users.",
      },
      {
        question: language === "it" ? "Fornite report di supporto?" : "Do you provide support reports?",
        answer:
          language === "it"
            ? "Sì, report mensili dettagliati: ticket risolti, tempi di risposta, problemi ricorrenti, raccomandazioni miglioramento, statistiche performance e roadmap ottimizzazioni future."
            : "Yes, detailed monthly reports: resolved tickets, response times, recurring issues, improvement recommendations, performance statistics and future optimization roadmap.",
      },
    ],
  }

  const currentFAQs = faqData[activeCategory as keyof typeof faqData] || []
  const currentCategory = categories.find((cat) => cat.id === activeCategory)

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {language === "it" ? "Domande Frequenti" : "Frequently Asked Questions"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === "it"
              ? "Trova risposte alle domande più comuni sui nostri servizi AI e soluzioni digitali"
              : "Find answers to the most common questions about our AI services and digital solutions"}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(category.id)
                setOpenItems([])
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 ${
                activeCategory === category.id
                  ? `${category.color} ${category.textColor} shadow-lg`
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* FAQ Items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {currentFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={`overflow-hidden border-2 ${currentCategory?.color} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <motion.button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <h3 className={`text-lg font-semibold ${currentCategory?.textColor} pr-4`}>{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 ${currentCategory?.textColor}`}
                  >
                    {openItems.includes(index) ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <CardContent className="px-6 pb-6 pt-0">
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-gray-700 leading-relaxed"
                        >
                          {faq.answer}
                        </motion.p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {language === "it"
                ? "Non hai trovato la risposta che cercavi?"
                : "Didn't find the answer you were looking for?"}
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              {language === "it"
                ? "Il nostro team di esperti è sempre disponibile per rispondere alle tue domande specifiche e fornirti una consulenza personalizzata."
                : "Our team of experts is always available to answer your specific questions and provide you with personalized consultation."}
            </p>
            <motion.a
              href="/appointments"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              {language === "it" ? "Prenota Consulenza Gratuita" : "Book Free Consultation"}
              <ChevronDown className="ml-2 w-5 h-5 rotate-[-90deg]" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
