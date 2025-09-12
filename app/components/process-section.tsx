"use client"

import { motion } from "framer-motion"
import { ScanSearch, PencilRuler, Bot, Rocket } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

export default function ProcessSection() {
  const { language } = useLanguage()

  const processSteps = [
    {
      icon: ScanSearch,
      title: language === "it" ? "1. Analisi & Strategia" : "1. Analysis & Strategy",
      description:
        language === "it"
          ? "Iniziamo con un'analisi approfondita del tuo business per definire gli obiettivi e una strategia AI su misura."
          : "We start with an in-depth analysis of your business to define objectives and a tailored AI strategy.",
    },
    {
      icon: PencilRuler,
      title: language === "it" ? "2. Design & Prototipazione" : "2. Design & Prototyping",
      description:
        language === "it"
          ? "Creiamo un prototipo interattivo della soluzione, definendo l'architettura e l'esperienza utente."
          : "We create an interactive prototype of the solution, defining the architecture and user experience.",
    },
    {
      icon: Bot,
      title: language === "it" ? "3. Sviluppo & Integrazione" : "3. Development & Integration",
      description:
        language === "it"
          ? "Il nostro team sviluppa la soluzione AI, integrandola perfettamente con i tuoi sistemi esistenti."
          : "Our team develops the AI solution, integrating it seamlessly with your existing systems.",
    },
    {
      icon: Rocket,
      title: language === "it" ? "4. Lancio & Ottimizzazione" : "4. Launch & Optimization",
      description:
        language === "it"
          ? "Eseguiamo il deploy e monitoriamo le performance, ottimizzando costantemente per massimizzare il ROI."
          : "We deploy and monitor performance, constantly optimizing to maximize ROI.",
    },
  ]

  return (
    <section className="py-24 bg-slate-800/30">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "it" ? "Il Nostro Processo Vincente" : "Our Winning Process"}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {language === "it"
              ? "Un approccio strutturato e trasparente per garantire il successo del tuo progetto AI"
              : "A structured and transparent approach to ensure the success of your AI project"}
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Linea di connessione (solo su desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-cyan-500 to-blue-500 hidden lg:block opacity-30" />

          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center relative bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="inline-flex p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full mb-6 ring-8 ring-slate-800/50 shadow-lg">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
