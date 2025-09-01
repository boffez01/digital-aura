"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Sparkles } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import { Button } from "@/components/ui/button"

const faqCategories = {
  en: {
    services: "Services & Solutions",
    pricing: "Pricing & Plans",
    technical: "Technical Support",
    business: "Business & Strategy",
  },
  it: {
    services: "Servizi & Soluzioni",
    pricing: "Prezzi & Piani",
    technical: "Supporto Tecnico",
    business: "Business & Strategia",
  },
}

const faqData = {
  en: {
    services: [
      {
        question: "What services does Digital Aura offer?",
        answer:
          "We specialize in 4 main areas: AI Automation for business processes, Smart Chatbots for customer service, modern Web Development, and AI-powered Marketing solutions. Each service is customized to your specific business needs.",
      },
      {
        question: "Can you integrate with our existing systems?",
        answer:
          "We specialize in seamless integration with existing CRM, ERP, e-commerce platforms, and databases. Our solutions are designed to enhance your current workflow without disruption.",
      },
      {
        question: "What makes Digital Aura different?",
        answer:
          "We focus on measurable ROI with custom-built solutions, not generic templates. Our clients typically see 200-400% ROI within the first year. We provide transparent reporting and continuous optimization.",
      },
    ],
    pricing: [
      {
        question: "How much do your services cost?",
        answer:
          "Our pricing varies based on project complexity and requirements. We offer flexible packages starting from competitive rates, with custom quotes for enterprise solutions. Contact us for a free consultation and personalized pricing.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes! We offer flexible payment options including monthly installments, milestone-based payments, and performance-based pricing models. We work with you to find a payment structure that fits your budget.",
      },
    ],
    technical: [
      {
        question: "How long does a typical project take?",
        answer:
          "Project timelines depend on scope and complexity. Simple chatbots can be ready in 2-3 weeks, while comprehensive AI automation systems may take 2-3 months. We provide detailed timelines during our initial consultation.",
      },
      {
        question: "Do you provide ongoing support?",
        answer:
          "Yes! We offer comprehensive post-launch support including maintenance, updates, performance monitoring, and optimization. Our support packages are tailored to ensure your solutions continue delivering value.",
      },
      {
        question: "Are the solutions easy to use?",
        answer:
          "Yes! We design all our solutions with user-friendly interfaces and intuitive workflows. Our team ensures everything is simple to use and manage, with comprehensive documentation provided.",
      },
    ],
    business: [
      {
        question: "Do you work with international clients?",
        answer:
          "Yes, we work with clients globally! While based in Milan, Italy, we serve businesses worldwide. We offer multilingual support and can adapt our solutions to different markets and regulations.",
      },
      {
        question: "What industries do you serve?",
        answer:
          "We work across various industries including e-commerce, healthcare, finance, manufacturing, education, and professional services. Our AI solutions are adaptable to any business sector.",
      },
    ],
  },
  it: {
    services: [
      {
        question: "Quali servizi offre Digital Aura?",
        answer:
          "Siamo specializzati in 4 aree principali: Automazione AI per processi aziendali, Chatbot Intelligenti per il servizio clienti, Sviluppo Web moderno e soluzioni di Marketing basate sull'AI. Ogni servizio è personalizzato per le tue esigenze specifiche.",
      },
      {
        question: "Potete integrarvi con i nostri sistemi esistenti?",
        answer:
          "Assolutamente! Siamo specializzati nell'integrazione perfetta con CRM, ERP, piattaforme e-commerce e database esistenti. Le nostre soluzioni sono progettate per migliorare il tuo flusso di lavoro attuale senza interruzioni.",
      },
      {
        question: "Cosa rende Digital Aura diversa?",
        answer:
          "Ci concentriamo su ROI misurabili con soluzioni personalizzate, non template generici. I nostri clienti vedono tipicamente un ROI del 200-400% nel primo anno. Forniamo report trasparenti e ottimizzazione continua.",
      },
    ],
    pricing: [
      {
        question: "Quanto costano i vostri servizi?",
        answer:
          "I nostri prezzi variano in base alla complessità e ai requisiti del progetto. Offriamo pacchetti flessibili a partire da tariffe competitive, con preventivi personalizzati per soluzioni enterprise. Contattaci per una consulenza gratuita.",
      },
      {
        question: "Offrite piani di pagamento?",
        answer:
          "Sì! Offriamo opzioni di pagamento flessibili inclusi rate mensili, pagamenti basati su milestone e modelli di pricing basati sulle performance. Lavoriamo con te per trovare una struttura di pagamento adatta al tuo budget.",
      },
    ],
    technical: [
      {
        question: "Quanto tempo richiede un progetto tipico?",
        answer:
          "I tempi dipendono dalla portata e complessità del progetto. I chatbot semplici possono essere pronti in 2-3 settimane, mentre i sistemi di automazione AI completi possono richiedere 2-3 mesi. Forniamo timeline dettagliate durante la consulenza iniziale.",
      },
      {
        question: "Fornite supporto continuo?",
        answer:
          "Sì! Offriamo supporto post-lancio completo inclusi manutenzione, aggiornamenti, monitoraggio delle performance e ottimizzazione. I nostri pacchetti di supporto sono personalizzati per garantire che le tue soluzioni continuino a fornire valore.",
      },
      {
        question: "Le soluzioni sono facili da usare?",
        answer:
          "Sì! Progettiamo tutte le nostre soluzioni con interfacce user-friendly e flussi di lavoro intuitivi. Il nostro team assicura che tutto sia semplice da usare e gestire, con documentazione completa fornita.",
      },
    ],
    business: [
      {
        question: "Lavorate con clienti internazionali?",
        answer:
          "Sì, lavoriamo con clienti in tutto il mondo! Pur avendo sede a Milano, Italia, serviamo aziende globalmente. Offriamo supporto multilingue e possiamo adattare le nostre soluzioni a diversi mercati e normative.",
      },
      {
        question: "In quali settori operate?",
        answer:
          "Lavoriamo in vari settori inclusi e-commerce, sanità, finanza, manifatturiero, istruzione e servizi professionali. Le nostre soluzioni AI sono adattabili a qualsiasi settore aziendale.",
      },
    ],
  },
}

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("services")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { language } = useLanguage()

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const currentCategories = faqCategories[language]
  const currentFAQs = faqData[language][selectedCategory as keyof (typeof faqData)[typeof language]]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {language === "it" ? "Domande Frequenti" : "Frequently Asked Questions"}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "it"
              ? "Trova le risposte alle domande più comuni sui nostri servizi AI e come possono trasformare il tuo business."
              : "Find answers to the most common questions about our AI services and how they can transform your business."}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {Object.entries(currentCategories).map(([key, label]) => (
            <Button
              key={key}
              onClick={() => {
                setSelectedCategory(key)
                setOpenIndex(null)
              }}
              variant={selectedCategory === key ? "default" : "outline"}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === key
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg border-2 border-orange-500"
                  : "border-2 border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-500"
              }`}
            >
              {label}
            </Button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {currentFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-orange-300">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-orange-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-6 h-6 text-orange-600" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-6 pt-2">
                            <div className="h-px bg-gradient-to-r from-orange-200 to-red-200 mb-4"></div>
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            {language === "it" ? "Non trovi la risposta che cerchi?" : "Can't find the answer you're looking for?"}
          </p>
          <motion.a
            href="/appointments"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-orange-500"
          >
            {language === "it" ? "Prenota Consulenza Gratuita" : "Book Free Consultation"}
            <Sparkles className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
