"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Target, Sparkles, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../contexts/language-context"

// ASSICURATI CHE SIA export default
export default function BusinessTransformationCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { language } = useLanguage()

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: language === "it" ? "Analisi gratuita del tuo business" : "Free business analysis",
      description:
        language === "it" ? "Valutiamo il potenziale AI della tua azienda" : "We evaluate your company's AI potential",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: language === "it" ? "Strategia AI personalizzata" : "Personalized AI strategy",
      description: language === "it" ? "Piano su misura per i tuoi obiettivi" : "Tailored plan for your goals",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: language === "it" ? "ROI garantito entro 6 mesi" : "ROI guaranteed within 6 months",
      description: language === "it" ? "Risultati misurabili e concreti" : "Measurable and concrete results",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(6,182,212,0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.3),transparent_70%)]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Question */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-300 mb-6"
          >
            {language === "it"
              ? "Non hai trovato la risposta che cercavi?"
              : "Haven't found the answer you were looking for?"}
          </motion.p>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {language === "it" ? "Pronto a trasformare il tuo business?" : "Ready to transform your business?"}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            {language === "it"
              ? "Scopri come l'intelligenza artificiale può rivoluzionare la tua azienda. Prenota una consulenza gratuita e personalizzata con i nostri esperti."
              : "Discover how artificial intelligence can revolutionize your business. Book a free and personalized consultation with our experts."}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:border-cyan-500/50 p-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg mb-6 text-white"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/appointments">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-10 py-4 rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-300"
              >
                {language === "it" ? "Prenota Consulenza Gratuita" : "Book Free Consultation"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:border-cyan-500 text-lg px-10 py-4 rounded-full bg-transparent backdrop-blur-sm transition-all duration-300"
              onClick={() => {
                const element = document.getElementById("contact")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {language === "it" ? "Contattaci Ora" : "Contact Us Now"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
