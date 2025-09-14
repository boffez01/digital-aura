"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowRight,
  Bot,
  Globe,
  BarChart3,
  Zap,
  Star,
  Calendar,
  CheckCircle,
  Users,
  TrendingUp,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import Navbar from "./components/navbar"
import HeroBackground from "./components/hero-background"
import ProcessSection from "./components/process-section"
import TestimonialsCarousel from "./components/testimonials-carousel"
import TeamSection from "./components/team-section"
import FAQSection from "./components/faq-section"
import ROICalculator from "./components/roi-calculator"
import ChatbotWidget from "./components/chatbot-widget"
import ProjectModal from "./components/project-modal"
import { useLanguage } from "./contexts/language-context"

export default function HomePage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: language === "it" ? "Messaggio inviato!" : "Message sent!",
          description:
            language === "it"
              ? "Ti contatteremo presto per discutere del tuo progetto."
              : "We'll contact you soon to discuss your project.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: language === "it" ? "Errore" : "Error",
        description:
          language === "it"
            ? "Si è verificato un errore. Riprova più tardi."
            : "An error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    {
      icon: Bot,
      title: language === "it" ? "AI Automation" : "AI Automation",
      description:
        language === "it"
          ? "Automatizza i processi aziendali con intelligenza artificiale avanzata per aumentare l'efficienza e ridurre i costi operativi."
          : "Automate business processes with advanced artificial intelligence to increase efficiency and reduce operational costs.",
      features: [
        language === "it" ? "Chatbot intelligenti" : "Intelligent chatbots",
        language === "it" ? "Automazione workflow" : "Workflow automation",
        language === "it" ? "Analisi predittiva" : "Predictive analytics",
      ],
      color: "from-purple-500 to-indigo-600",
      href: "/services/ai-automation",
    },
    {
      icon: Globe,
      title: language === "it" ? "Sviluppo Web" : "Web Development",
      description:
        language === "it"
          ? "Siti web moderni, responsive e ottimizzati per le performance, progettati per convertire visitatori in clienti."
          : "Modern, responsive and performance-optimized websites designed to convert visitors into customers.",
      features: [
        language === "it" ? "Design responsive" : "Responsive design",
        language === "it" ? "E-commerce avanzato" : "Advanced e-commerce",
        language === "it" ? "SEO ottimizzato" : "SEO optimized",
      ],
      color: "from-green-500 to-emerald-600",
      href: "/services/web-development",
    },
    {
      icon: BarChart3,
      title: language === "it" ? "AI Marketing" : "AI Marketing",
      description:
        language === "it"
          ? "Strategie di marketing potenziate dall'AI per targeting preciso, personalizzazione e ROI massimizzato."
          : "AI-powered marketing strategies for precise targeting, personalization and maximized ROI.",
      features: [
        language === "it" ? "Targeting intelligente" : "Smart targeting",
        language === "it" ? "Personalizzazione" : "Personalization",
        language === "it" ? "Analytics avanzati" : "Advanced analytics",
      ],
      color: "from-orange-500 to-red-600",
      href: "/services/ai-marketing",
    },
    {
      icon: Zap,
      title: language === "it" ? "Chatbot Avanzati" : "Advanced Chatbots",
      description:
        language === "it"
          ? "Assistenti virtuali intelligenti che migliorano il customer service e automatizzano le interazioni clienti 24/7."
          : "Intelligent virtual assistants that improve customer service and automate customer interactions 24/7.",
      features: [
        language === "it" ? "Supporto 24/7" : "24/7 support",
        language === "it" ? "Multilingua" : "Multilingual",
        language === "it" ? "Integrazione CRM" : "CRM integration",
      ],
      color: "from-cyan-500 to-blue-600",
      href: "/services/chatbot",
    },
  ]

  const projects = [
    {
      id: "ai-automation-project",
      title: "Sistema AI per E-commerce",
      titleEn: "AI System for E-commerce",
      category: "AI Automation",
      categoryEn: "AI Automation",
      description: "Automazione completa del customer service con chatbot AI",
      descriptionEn: "Complete customer service automation with AI chatbot",
      image: "/ai-automation-project.png",
      technologies: ["Python", "TensorFlow", "React", "Node.js"],
      results: [
        { metric: "Riduzione costi", value: "60%", metricEn: "Cost reduction" },
        { metric: "Tempo risposta", value: "< 2s", metricEn: "Response time" },
        { metric: "Soddisfazione", value: "95%", metricEn: "Satisfaction" },
      ],
      problem:
        "L'azienda aveva difficoltà a gestire l'alto volume di richieste clienti, con tempi di risposta lunghi e costi operativi elevati.",
      problemEn:
        "The company struggled to handle high volume of customer requests, with long response times and high operational costs.",
      solution:
        "Abbiamo implementato un sistema AI completo con chatbot intelligente, automazione dei processi e analytics avanzati.",
      solutionEn:
        "We implemented a complete AI system with intelligent chatbot, process automation and advanced analytics.",
      roi: "400%",
      roiEn: "400%",
      duration: "3 mesi",
      durationEn: "3 months",
    },
    {
      id: "chatbot-project",
      title: "Chatbot Multilingua",
      titleEn: "Multilingual Chatbot",
      category: "Chatbot",
      categoryEn: "Chatbot",
      description: "Assistente virtuale per supporto clienti internazionale",
      descriptionEn: "Virtual assistant for international customer support",
      image: "/chatbot-project.png",
      technologies: ["NLP", "React", "Node.js", "MongoDB"],
      results: [
        { metric: "Lingue supportate", value: "12", metricEn: "Languages supported" },
        { metric: "Risoluzione automatica", value: "85%", metricEn: "Auto resolution" },
        { metric: "Risparmio annuale", value: "€150K", metricEn: "Annual savings" },
      ],
      problem: "Necessità di supporto clienti multilingua 24/7 senza aumentare significativamente i costi operativi.",
      problemEn: "Need for 24/7 multilingual customer support without significantly increasing operational costs.",
      solution:
        "Chatbot AI avanzato con capacità multilingua, integrazione CRM e escalation intelligente agli operatori umani.",
      solutionEn:
        "Advanced AI chatbot with multilingual capabilities, CRM integration and intelligent escalation to human operators.",
      roi: "320%",
      roiEn: "320%",
      duration: "2 mesi",
      durationEn: "2 months",
    },
    {
      id: "web-development-project",
      title: "Piattaforma E-commerce",
      titleEn: "E-commerce Platform",
      category: "Web Development",
      categoryEn: "Web Development",
      description: "Sito e-commerce moderno con AI integrata",
      descriptionEn: "Modern e-commerce site with integrated AI",
      image: "/web-development-project.png",
      technologies: ["Next.js", "Stripe", "AI Recommendations", "Analytics"],
      results: [
        { metric: "Conversioni", value: "+180%", metricEn: "Conversions" },
        { metric: "Velocità sito", value: "98/100", metricEn: "Site speed" },
        { metric: "Revenue", value: "+250%", metricEn: "Revenue" },
      ],
      problem: "Sito e-commerce obsoleto con basse conversioni e esperienza utente scadente.",
      problemEn: "Outdated e-commerce site with low conversions and poor user experience.",
      solution: "Nuova piattaforma moderna con raccomandazioni AI, checkout ottimizzato e analytics avanzati.",
      solutionEn: "New modern platform with AI recommendations, optimized checkout and advanced analytics.",
      roi: "280%",
      roiEn: "280%",
      duration: "4 mesi",
      durationEn: "4 months",
    },
  ]

  const stats = [
    {
      number: "150+",
      label: language === "it" ? "Progetti Completati" : "Projects Completed",
      icon: CheckCircle,
    },
    {
      number: "98%",
      label: language === "it" ? "Soddisfazione Clienti" : "Client Satisfaction",
      icon: Star,
    },
    {
      number: "24/7",
      label: language === "it" ? "Supporto Disponibile" : "Support Available",
      icon: Users,
    },
    {
      number: "350%",
      label: language === "it" ? "ROI Medio" : "Average ROI",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <HeroBackground />

        <div className="relative z-10 container mx-auto text-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-sm font-medium">
              ✨ {language === "it" ? "Innovazione AI per il Tuo Business" : "AI Innovation for Your Business"}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {language === "it" ? "Trasforma" : "Transform"}
              </span>
              <br />
              <span className="text-white">{language === "it" ? "il Tuo Business" : "Your Business"}</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {language === "it" ? "con l'AI" : "with AI"}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {language === "it"
                ? "Soluzioni di intelligenza artificiale su misura per automatizzare i processi, migliorare l'efficienza e accelerare la crescita del tuo business."
                : "Custom artificial intelligence solutions to automate processes, improve efficiency and accelerate your business growth."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/appointments">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    {language === "it" ? "Consulenza Gratuita" : "Free Consultation"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById("services")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                className="flex items-center text-slate-300 hover:text-white transition-colors font-medium text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {language === "it" ? "Scopri i Servizi" : "Discover Services"}
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full mb-3">
                  <stat.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "it" ? "I Nostri Servizi" : "Our Services"}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {language === "it"
                ? "Soluzioni complete di intelligenza artificiale per trasformare il tuo business"
                : "Complete artificial intelligence solutions to transform your business"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Link href={service.href}>
                  <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-cyan-500 transition-all duration-300 cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div
                        className={`inline-flex p-4 bg-gradient-to-r ${service.color} text-white rounded-2xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-base leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-slate-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">
                        {language === "it" ? "Scopri di più" : "Learn more"}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* Projects Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "it" ? "Progetti di Successo" : "Success Stories"}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {language === "it"
                ? "Scopri come abbiamo trasformato il business dei nostri clienti con soluzioni AI innovative"
                : "Discover how we've transformed our clients' businesses with innovative AI solutions"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-cyan-500 transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={language === "en" ? project.titleEn : project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0">
                      {language === "en" ? project.categoryEn : project.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {language === "en" ? project.titleEn : project.title}
                    </h3>
                    <p className="text-slate-400 mb-4 text-sm">
                      {language === "en" ? project.descriptionEn : project.description}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {project.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="text-center">
                          <div className="text-lg font-bold text-cyan-400">{result.value}</div>
                          <div className="text-xs text-slate-500">
                            {language === "en" ? result.metricEn : result.metric}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-cyan-400 font-medium text-sm group-hover:text-cyan-300 transition-colors">
                      {language === "it" ? "Vedi dettagli" : "View details"}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "it" ? "Calcola il Tuo ROI" : "Calculate Your ROI"}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {language === "it"
                ? "Scopri quanto potresti risparmiare e guadagnare implementando soluzioni AI nel tuo business"
                : "Discover how much you could save and earn by implementing AI solutions in your business"}
            </p>
          </motion.div>

          <ROICalculator />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "it" ? "Cosa Dicono i Clienti" : "What Clients Say"}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {language === "it"
                ? "Le testimonianze dei nostri clienti parlano della qualità e dell'efficacia delle nostre soluzioni"
                : "Our clients' testimonials speak to the quality and effectiveness of our solutions"}
            </p>
          </motion.div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "it" ? "Iniziamo Insieme" : "Let's Start Together"}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {language === "it"
                ? "Pronto a trasformare il tuo business con l'intelligenza artificiale? Contattaci per una consulenza gratuita."
                : "Ready to transform your business with artificial intelligence? Contact us for a free consultation."}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">
                    {language === "it" ? "Invia un Messaggio" : "Send a Message"}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {language === "it"
                      ? "Compila il form e ti contatteremo entro 24 ore"
                      : "Fill out the form and we'll contact you within 24 hours"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {language === "it" ? "Nome *" : "Name *"}
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500"
                          placeholder={language === "it" ? "Il tuo nome" : "Your name"}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {language === "it" ? "Email *" : "Email *"}
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500"
                          placeholder={language === "it" ? "La tua email" : "Your email"}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {language === "it" ? "Telefono" : "Phone"}
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500"
                          placeholder={language === "it" ? "Il tuo telefono" : "Your phone"}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {language === "it" ? "Azienda" : "Company"}
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500"
                          placeholder={language === "it" ? "La tua azienda" : "Your company"}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {language === "it" ? "Messaggio *" : "Message *"}
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500"
                        placeholder={
                          language === "it"
                            ? "Descrivi il tuo progetto o le tue esigenze..."
                            : "Describe your project or needs..."
                        }
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {language === "it" ? "Invio in corso..." : "Sending..."}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {language === "it" ? "Invia Messaggio" : "Send Message"}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {language === "it" ? "Informazioni di Contatto" : "Contact Information"}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mr-4">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Email</div>
                      <div className="text-slate-400">info@digitalaura.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-4">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{language === "it" ? "Telefono" : "Phone"}</div>
                      <div className="text-slate-400">+39 123 456 7890</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-4">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{language === "it" ? "Indirizzo" : "Address"}</div>
                      <div className="text-slate-400">Milano, Italia</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h4 className="text-xl font-bold text-white mb-4">
                  {language === "it" ? "Perché Scegliere Digital Aura?" : "Why Choose Digital Aura?"}
                </h4>
                <ul className="space-y-3">
                  {[
                    language === "it" ? "Consulenza gratuita iniziale" : "Free initial consultation",
                    language === "it" ? "Soluzioni personalizzate" : "Customized solutions",
                    language === "it" ? "Supporto 24/7" : "24/7 support",
                    language === "it" ? "ROI garantito" : "Guaranteed ROI",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <Link href="/appointments">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    {language === "it" ? "Prenota Consulenza" : "Book Consultation"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">⚡</span>
                </div>
                <span className="text-2xl font-bold text-white">Digital Aura</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                {language === "it"
                  ? "Trasformiamo il tuo business con soluzioni di intelligenza artificiale innovative e su misura."
                  : "We transform your business with innovative and customized artificial intelligence solutions."}
              </p>
              <div className="flex space-x-4">
                {["LinkedIn", "Twitter", "GitHub"].map((social) => (
                  <a key={social} href="#" className="text-slate-400 hover:text-white transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{language === "it" ? "Servizi" : "Services"}</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.title}>
                    <Link href={service.href} className="text-slate-400 hover:text-white transition-colors">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{language === "it" ? "Azienda" : "Company"}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    {language === "it" ? "Chi Siamo" : "About Us"}
                  </a>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <a href="#contact" className="text-slate-400 hover:text-white transition-colors">
                    {language === "it" ? "Contatti" : "Contact"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Digital Aura. {language === "it" ? "Tutti i diritti riservati." : "All rights reserved."}</p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  )
}
