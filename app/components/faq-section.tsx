"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

const faqData = {
  it: [
    {
      question: "Quanto tempo richiede lo sviluppo di un chatbot personalizzato?",
      answer:
        "Lo sviluppo di un chatbot personalizzato richiede generalmente 2-4 settimane, a seconda della complessità delle funzionalità richieste e delle integrazioni necessarie con i vostri sistemi esistenti.",
    },
    {
      question: "I vostri chatbot supportano più lingue?",
      answer:
        "Sì, i nostri chatbot supportano oltre 50 lingue diverse e possono rilevare automaticamente la lingua dell'utente per fornire risposte nella lingua appropriata.",
    },
    {
      question: "Come si integrano i chatbot con i sistemi esistenti?",
      answer:
        "I nostri chatbot si integrano facilmente con CRM, database, sistemi di pagamento e altre piattaforme attraverso API sicure e protocolli standard dell'industria.",
    },
    {
      question: "Offrite supporto e manutenzione continua?",
      answer:
        "Sì, offriamo pacchetti di supporto 24/7 che includono monitoraggio, aggiornamenti, ottimizzazioni delle performance e assistenza tecnica dedicata.",
    },
    {
      question: "Qual è il ROI tipico di un chatbot aziendale?",
      answer:
        "I nostri clienti vedono tipicamente un ROI del 300-500% nel primo anno, con riduzioni dei costi del servizio clienti fino al 60% e aumento delle conversioni del 25-40%.",
    },
  ],
  en: [
    {
      question: "How long does it take to develop a custom chatbot?",
      answer:
        "Custom chatbot development typically takes 2-4 weeks, depending on the complexity of required features and necessary integrations with your existing systems.",
    },
    {
      question: "Do your chatbots support multiple languages?",
      answer:
        "Yes, our chatbots support over 50 different languages and can automatically detect the user's language to provide responses in the appropriate language.",
    },
    {
      question: "How do chatbots integrate with existing systems?",
      answer:
        "Our chatbots integrate seamlessly with CRMs, databases, payment systems, and other platforms through secure APIs and industry-standard protocols.",
    },
    {
      question: "Do you offer ongoing support and maintenance?",
      answer:
        "Yes, we offer 24/7 support packages that include monitoring, updates, performance optimizations, and dedicated technical assistance.",
    },
    {
      question: "What's the typical ROI of a business chatbot?",
      answer:
        "Our clients typically see a 300-500% ROI in the first year, with customer service cost reductions up to 60% and conversion increases of 25-40%.",
    },
  ],
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { language } = useLanguage()
  const faqs = faqData[language]

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
            {language === "it" ? "Domande Frequenti" : "Frequently Asked Questions"}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {language === "it"
              ? "Trova le risposte alle domande più comuni sui nostri servizi di intelligenza artificiale"
              : "Find answers to the most common questions about our artificial intelligence services"}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-200">
                    <HelpCircle className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-green-300 group-hover:to-blue-300 transition-all duration-200">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200"
                >
                  <ChevronDown className="w-5 h-5" />
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
                    <div className="px-6 pb-6 pl-16">
                      <p className="text-slate-300 leading-relaxed text-base">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Named export
export { FAQSection }
