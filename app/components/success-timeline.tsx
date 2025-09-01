"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, TrendingUp, Users, Zap, Globe } from "lucide-react"

const milestones = [
  {
    year: "2020",
    title: "Fondazione Digital Aura",
    description: "Nasce Digital Aura con la missione di democratizzare l'AI per le PMI italiane",
    icon: <Zap className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    achievements: ["Team di 4 persone", "Prime consulenze AI", "Sede a Milano"],
  },
  {
    year: "2021",
    title: "Primi Successi",
    description: "Completiamo i primi 25 progetti di automazione con risultati eccezionali",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    achievements: ["25 progetti completati", "ROI medio 250%", "Espansione team"],
  },
  {
    year: "2022",
    title: "Crescita Esponenziale",
    description: "Raggiungiamo 100+ clienti e lanciamo la nostra piattaforma chatbot proprietaria",
    icon: <Users className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    achievements: ["100+ clienti attivi", "Piattaforma chatbot", "Certificazioni AI"],
  },
  {
    year: "2023",
    title: "Riconoscimenti",
    description: "Vincitori del premio 'Best AI Innovation' e partnership con Microsoft Azure",
    icon: <Award className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    achievements: ["Premio Best AI Innovation", "Partnership Microsoft", "Team di 15 persone"],
  },
  {
    year: "2024",
    title: "Espansione Europea",
    description: "Apertura uffici in Germania e Francia, 500+ progetti completati",
    icon: <Globe className="w-6 h-6" />,
    color: "from-cyan-500 to-purple-500",
    achievements: ["Espansione EU", "500+ progetti", "AI Enterprise Solutions"],
  },
]

export default function SuccessTimelineSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mb-6">
            <Calendar className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">La Nostra Storia di Successo</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Dal 2020 ad oggi: un percorso di crescita, innovazione e risultati straordinari
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Card className="bg-white/10 border-white/20 backdrop-blur-lg hover:bg-white/15 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className={`flex items-center mb-4 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                          <Badge
                            variant="outline"
                            className="border-cyan-400/50 text-cyan-300 bg-cyan-500/20 text-lg px-3 py-1"
                          >
                            {milestone.year}
                          </Badge>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">{milestone.title}</h3>

                        <p className="text-white/80 mb-4 leading-relaxed">{milestone.description}</p>

                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                          {milestone.achievements.map((achievement, achievementIndex) => (
                            <motion.div
                              key={achievementIndex}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.2 + achievementIndex * 0.1 + 0.5 }}
                              viewport={{ once: true }}
                            >
                              <Badge variant="outline" className="border-white/30 text-white/90 bg-white/10 text-sm">
                                {achievement}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center shadow-lg border-4 border-white/20`}
                  >
                    <div className="text-white">{milestone.icon}</div>
                  </motion.div>
                </div>

                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Card className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/30 backdrop-blur-lg">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-white mb-4">Il Futuro è Adesso</h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Continuiamo a innovare e crescere, con l'obiettivo di rendere l'AI accessibile a tutte le aziende
                europee entro il 2025.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">2025</div>
                  <div className="text-white/80">1000+ Clienti</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">2026</div>
                  <div className="text-white/80">AI Platform Launch</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">2027</div>
                  <div className="text-white/80">IPO Preparation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
