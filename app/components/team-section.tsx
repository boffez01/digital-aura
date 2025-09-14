"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Github, Twitter } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

const teamMembers = {
  it: [
    {
      name: "Alessandro Conti",
      role: "CEO & AI Strategist",
      bio: "Esperto in intelligenza artificiale con oltre 10 anni di esperienza nello sviluppo di soluzioni innovative per il business.",
      image: "/professional-businessman.png",
      skills: ["AI Strategy", "Machine Learning", "Business Development"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
    {
      name: "Sofia Martinelli",
      role: "Lead Developer",
      bio: "Sviluppatrice full-stack specializzata in React, Node.js e tecnologie AI. Appassionata di codice pulito e architetture scalabili.",
      image: "/professional-businesswoman.png",
      skills: ["React", "Node.js", "Python", "AI Integration"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
    {
      name: "Marco Ferretti",
      role: "UX/UI Designer",
      bio: "Designer con focus sull'esperienza utente per applicazioni AI. Crea interfacce intuitive che rendono la tecnologia accessibile a tutti.",
      image: "/professional-manager.png",
      skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
  ],
  en: [
    {
      name: "Alessandro Conti",
      role: "CEO & AI Strategist",
      bio: "AI expert with over 10 years of experience developing innovative business solutions.",
      image: "/professional-businessman.png",
      skills: ["AI Strategy", "Machine Learning", "Business Development"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
    {
      name: "Sofia Martinelli",
      role: "Lead Developer",
      bio: "Full-stack developer specialized in React, Node.js and AI technologies. Passionate about clean code and scalable architectures.",
      image: "/professional-businesswoman.png",
      skills: ["React", "Node.js", "Python", "AI Integration"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
    {
      name: "Marco Ferretti",
      role: "UX/UI Designer",
      bio: "Designer focused on user experience for AI applications. Creates intuitive interfaces that make technology accessible to everyone.",
      image: "/professional-manager.png",
      skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
  ],
}

const teamStats = {
  it: [
    { number: "50+", label: "Progetti Completati" },
    { number: "3", label: "Anni di Esperienza" },
    { number: "100%", label: "Clienti Soddisfatti" },
    { number: "24/7", label: "Supporto Disponibile" },
  ],
  en: [
    { number: "50+", label: "Completed Projects" },
    { number: "3", label: "Years of Experience" },
    { number: "100%", label: "Satisfied Clients" },
    { number: "24/7", label: "Support Available" },
  ],
}

export default function TeamSection() {
  const { language } = useLanguage()
  const members = teamMembers[language]
  const stats = teamStats[language]

  return (
    <section className="py-24 bg-gradient-to-br from-card/30 to-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{language === "it" ? "Il Nostro Team" : "Our Team"}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "it"
              ? "Un team di esperti appassionati di tecnologia e innovazione, pronti a trasformare le tue idee in realtà"
              : "A team of experts passionate about technology and innovation, ready to transform your ideas into reality"}
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-1">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.social.linkedin}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.github}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
