"use client"

import { motion } from "framer-motion"
import { Search, PenTool, Bot, Rocket } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

const processSteps = {
  it: [
    {
      icon: Search,
      title: "1. Analisi & Strategia",
      description:
        "Analizziamo il tuo business e definiamo una strategia AI personalizzata per massimizzare i risultati.",
    },
    {
      icon: PenTool,
      title: "2. Design & Prototipazione",
      description: "Creiamo wireframe e prototipi interattivi per visualizzare la soluzione prima dello sviluppo.",
    },
    {
      icon: Bot,
      title: "3. Sviluppo & Integrazione",
      description: "Sviluppiamo la soluzione AI e la integriamo perfettamente nei tuoi sistemi esistenti.",
    },
    {
      icon: Rocket,
      title: "4. Lancio & Ottimizzazione",
      description: "Eseguiamo il deploy, monitoriamo le performance e ottimizziamo continuamente i risultati.",
    },
  ],
  en: [
    {
      icon: Search,
      title: "1. Analysis & Strategy",
      description: "We analyze your business and define a personalized AI strategy to maximize results.",
    },
    {
      icon: PenTool,
      title: "2. Design & Prototyping",
      description: "We create wireframes and interactive prototypes to visualize the solution before development.",
    },
    {
      icon: Bot,
      title: "3. Development & Integration",
      description: "We develop the AI solution and integrate it seamlessly into your existing systems.",
    },
    {
      icon: Rocket,
      title: "4. Launch & Optimization",
      description: "We deploy, monitor performance, and continuously optimize results.",
    },
  ],
}

export default function ProcessSection() {
  const { language } = useLanguage()
  const steps = processSteps[language]

  return (
    <section className="py-24 bg-slate-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            {language === "it" ? "Il Nostro Processo" : "Our Process"}
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {language === "it"
              ? "Un approccio strutturato per trasformare le tue idee in soluzioni AI innovative"
              : "A structured approach to transform your ideas into innovative AI solutions"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 group h-full">
                <div className="inline-flex p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
              </div>

              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent transform -translate-y-1/2 z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
