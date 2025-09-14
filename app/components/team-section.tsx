"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Github, Twitter, Users, Award, Target } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import Image from "next/image"

export default function TeamSection() {
  const { language } = useLanguage()

  const teamMembers = [
    {
      name: "Alessandro Conti",
      role: language === "it" ? "CEO & AI Strategist" : "CEO & AI Strategist",
      bio:
        language === "it"
          ? "10+ anni in AI e Machine Learning. Ex-Google, specializzato in soluzioni enterprise."
          : "10+ years in AI and Machine Learning. Ex-Google, specialized in enterprise solutions.",
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
      role: language === "it" ? "CTO & Lead Developer" : "CTO & Lead Developer",
      bio:
        language === "it"
          ? "Esperta in sviluppo full-stack e architetture AI scalabili. Ex-Microsoft."
          : "Expert in full-stack development and scalable AI architectures. Ex-Microsoft.",
      image: "/professional-businesswoman.png",
      skills: ["Full-Stack Development", "AI Architecture", "DevOps"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
    {
      name: "Marco Ferretti",
      role: language === "it" ? "Head of Data Science" : "Head of Data Science",
      bio:
        language === "it"
          ? "PhD in Computer Science, specializzato in NLP e computer vision per applicazioni business."
          : "PhD in Computer Science, specialized in NLP and computer vision for business applications.",
      image: "/professional-manager.png",
      skills: ["Data Science", "NLP", "Computer Vision"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
  ]

  const stats = [
    {
      icon: Users,
      number: "50+",
      label: language === "it" ? "Progetti Completati" : "Projects Completed",
    },
    {
      icon: Award,
      number: "98%",
      label: language === "it" ? "Soddisfazione Cliente" : "Client Satisfaction",
    },
    {
      icon: Target,
      number: "300%",
      label: language === "it" ? "ROI Medio" : "Average ROI",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "it" ? "Il Nostro Team di Esperti" : "Our Expert Team"}
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {language === "it"
              ? "Un team di professionisti con esperienza nelle migliori aziende tech al mondo"
              : "A team of professionals with experience at the world's best tech companies"}
          </p>
        </motion.div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-slate-700 text-center p-6">
                <CardContent className="pt-6">
                  <stat.icon className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-slate-700 overflow-hidden group hover:border-cyan-500 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-cyan-400 font-medium mb-3">{member.role}</p>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{member.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="bg-slate-700 text-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a href={member.social.linkedin} className="text-slate-400 hover:text-cyan-400 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.social.github} className="text-slate-400 hover:text-cyan-400 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={member.social.twitter} className="text-slate-400 hover:text-cyan-400 transition-colors">
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
