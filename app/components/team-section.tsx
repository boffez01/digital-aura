"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Github, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Marco Rossi",
    role: "CEO & AI Strategist",
    bio: "Esperto in intelligenza artificiale con 10+ anni di esperienza in automazione aziendale.",
    image: "/placeholder.svg?height=300&width=300&text=Marco+Rossi",
    skills: ["AI Strategy", "Machine Learning", "Business Development"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "marco@digitalaura.com",
    },
  },
  {
    name: "Laura Bianchi",
    role: "CTO & Lead Developer",
    bio: "Full-stack developer specializzata in React, Node.js e architetture cloud scalabili.",
    image: "/placeholder.svg?height=300&width=300&text=Laura+Bianchi",
    skills: ["React", "Node.js", "Cloud Architecture"],
    social: {
      linkedin: "#",
      github: "#",
      email: "laura@digitalaura.com",
    },
  },
  {
    name: "Giuseppe Verdi",
    role: "AI Engineer",
    bio: "Specialista in NLP e machine learning, con focus su chatbot e automazione intelligente.",
    image: "/placeholder.svg?height=300&width=300&text=Giuseppe+Verdi",
    skills: ["NLP", "TensorFlow", "Python"],
    social: {
      linkedin: "#",
      github: "#",
      email: "giuseppe@digitalaura.com",
    },
  },
  {
    name: "Sofia Romano",
    role: "UX/UI Designer",
    bio: "Designer creativa con passione per esperienze utente intuitive e design systems moderni.",
    image: "/placeholder.svg?height=300&width=300&text=Sofia+Romano",
    skills: ["UI/UX Design", "Figma", "Design Systems"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sofia@digitalaura.com",
    },
  },
]

export default function TeamSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Il Nostro Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un team di esperti appassionati di tecnologia e innovazione, pronti a trasformare le tue idee in realtà
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />

                  {/* Social Links Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-4"
                  >
                    <div className="flex space-x-3">
                      {member.social.linkedin && (
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          href={member.social.linkedin}
                          className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                        >
                          <Linkedin className="w-4 h-4 text-white" />
                        </motion.a>
                      )}
                      {member.social.twitter && (
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          href={member.social.twitter}
                          className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                        >
                          <Twitter className="w-4 h-4 text-white" />
                        </motion.a>
                      )}
                      {member.social.github && (
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          href={member.social.github}
                          className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                        >
                          <Github className="w-4 h-4 text-white" />
                        </motion.a>
                      )}
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={`mailto:${member.social.email}`}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                      >
                        <Mail className="w-4 h-4 text-white" />
                      </motion.a>
                    </div>
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-cyan-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="outline"
                          className="border-gray-300 text-gray-600 hover:border-cyan-500 hover:text-cyan-600 transition-colors"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8">I Nostri Valori</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovazione",
                description: "Utilizziamo sempre le tecnologie più avanzate per creare soluzioni all'avanguardia",
                icon: "🚀",
              },
              {
                title: "Qualità",
                description:
                  "Ogni progetto è realizzato con la massima attenzione ai dettagli e agli standard più elevati",
                icon: "⭐",
              },
              {
                title: "Partnership",
                description: "Lavoriamo insieme ai nostri clienti come partner strategici per il loro successo",
                icon: "🤝",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Named export
export { TeamSection }
