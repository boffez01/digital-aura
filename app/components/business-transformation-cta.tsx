"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

export default function BusinessTransformationCTA() {
  const { language } = useLanguage()

  const content = {
    it: {
      title: "Non hai trovato la risposta che cercavi?",
      subtitle: "Pronto a trasformare il tuo business?",
      description:
        "Scopri come l'intelligenza artificiale può rivoluzionare la tua azienda. Prenota una consulenza gratuita e personalizzata con i nostri esperti.",
      features: ["Analisi gratuita del tuo business", "Strategia AI personalizzata", "ROI garantito entro 6 mesi"],
      cta: "Prenota Consulenza Gratuita",
      contact: "Contattaci Ora",
    },
    en: {
      title: "Didn't find the answer you were looking for?",
      subtitle: "Ready to transform your business?",
      description:
        "Discover how artificial intelligence can revolutionize your company. Book a free, personalized consultation with our experts.",
      features: ["Free business analysis", "Personalized AI strategy", "ROI guaranteed within 6 months"],
      cta: "Book Free Consultation",
      contact: "Contact Us Now",
    },
  }

  const currentContent = content[language]

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-slate-300 mb-4">{currentContent.title}</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
              {currentContent.subtitle}
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">{currentContent.description}</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {currentContent.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-200">
                    {index === 0 && <Target className="w-6 h-6 text-cyan-400" />}
                    {index === 1 && <Sparkles className="w-6 h-6 text-cyan-400" />}
                    {index === 2 && <Zap className="w-6 h-6 text-cyan-400" />}
                  </div>
                </div>
                <p className="text-slate-300 font-medium group-hover:text-cyan-200 transition-colors duration-200">
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center space-x-2"
            >
              <span>{currentContent.cta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800/80 text-slate-200 font-semibold rounded-xl border border-slate-600/50 hover:border-cyan-400/50 hover:bg-slate-700/80 transition-all duration-300"
            >
              {currentContent.contact}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
