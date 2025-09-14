"use client"
import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { ScanSearch, PencilRuler, Bot, Rocket } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "../contexts/language-context"

export default function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
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
    <section className="py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "it" ? "Il Nostro Processo Vincente" : "Our Winning Process"}
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {language === "it"
              ? "Un approccio strutturato e trasparente per garantire il successo del tuo progetto AI"
              : "A structured and transparent approach to ensure the success of your AI project"}
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Linea di connessione (solo su desktop) */}
          <div
            className="absolute top-1/2 left-0 w-full h-px bg-slate-600 hidden md:block"
            style={{ transform: "translateY(-50%)" }}
          />

          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center relative"
            >
              <Card className="bg-slate-800/50 border-slate-700 p-6 h-full hover:border-cyan-500 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="inline-flex p-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full mb-4 mx-auto ring-8 ring-slate-900">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white mb-2">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Named export
export { ProcessSection }
