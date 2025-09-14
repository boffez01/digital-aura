"use client"

import type React from "react"

import { useLanguage } from "@/contexts/language-context"
import { Navbar } from "@/components/navbar"
import { HeroBackground } from "@/components/hero-background"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { TeamSection } from "@/components/team-section"
import { FAQSection } from "@/components/faq-section"
import { ROICalculator } from "@/components/roi-calculator"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { ProjectModal } from "@/components/project-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  Zap,
  Globe,
  MessageSquare,
  Bot,
  BarChart3,
  Sparkles,
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  Target,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function HomePage() {
  const { t, language } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      console.log("📧 Submitting contact form:", contactForm)

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      })

      const result = await response.json()
      console.log("📧 Contact form response:", result)

      if (response.ok && result.success) {
        setSubmitStatus("success")
        setContactForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        })
        console.log("✅ Contact form submitted successfully")
      } else {
        console.error("❌ Contact form error:", result.error)
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("❌ Contact form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const projects = [
    {
      id: 1,
      title: language === "en" ? "E-commerce AI Platform" : "Piattaforma E-commerce AI",
      description:
        language === "en"
          ? "Complete e-commerce solution with AI-powered recommendations and automated customer service"
          : "Soluzione e-commerce completa con raccomandazioni AI e servizio clienti automatizzato",
      image: "/modern-ecommerce-dashboard.png",
      category: language === "en" ? "E-commerce" : "E-commerce",
      technologies: ["Next.js", "AI/ML", "Stripe", "PostgreSQL"],
      results: {
        conversion: "+45%",
        sales: "+78%",
        satisfaction: "96%",
      },
    },
    {
      id: 2,
      title: language === "en" ? "Intelligent Customer Support" : "Supporto Clienti Intelligente",
      description:
        language === "en"
          ? "AI chatbot system that handles 80% of customer inquiries automatically"
          : "Sistema chatbot AI che gestisce l'80% delle richieste clienti automaticamente",
      image: "/chatbot-interface-design.png",
      category: language === "en" ? "Chatbot" : "Chatbot",
      technologies: ["OpenAI", "React", "Node.js", "WebSocket"],
      results: {
        efficiency: "+65%",
        response: "< 2s",
        satisfaction: "94%",
      },
    },
    {
      id: 3,
      title: language === "en" ? "Corporate Website Redesign" : "Redesign Sito Corporate",
      description:
        language === "en"
          ? "Modern corporate website with advanced analytics and lead generation system"
          : "Sito corporate moderno con analytics avanzate e sistema di lead generation",
      image: "/modern-corporate-website.png",
      category: language === "en" ? "Web Development" : "Sviluppo Web",
      technologies: ["React", "TypeScript", "Tailwind", "Analytics"],
      results: {
        traffic: "+120%",
        leads: "+89%",
        speed: "98/100",
      },
    },
  ]

  const services = [
    {
      icon: Bot,
      title: language === "en" ? "AI Automation" : "Automazione AI",
      description:
        language === "en"
          ? "Automate repetitive tasks and optimize business processes with artificial intelligence"
          : "Automatizza compiti ripetitivi e ottimizza i processi aziendali con l'intelligenza artificiale",
      color: "from-purple-500 to-pink-500",
      href: "/services/ai-automation",
    },
    {
      icon: MessageSquare,
      title: language === "en" ? "Intelligent Chatbots" : "Chatbot Intelligenti",
      description:
        language === "en"
          ? "24/7 virtual assistants that understand context and provide personalized responses"
          : "Assistenti virtuali 24/7 che comprendono il contesto e forniscono risposte personalizzate",
      color: "from-blue-500 to-cyan-500",
      href: "/services/chatbot",
    },
    {
      icon: Globe,
      title: language === "en" ? "Web Development" : "Sviluppo Web",
      description:
        language === "en"
          ? "Modern, fast and SEO-optimized websites that convert visitors into customers"
          : "Siti web moderni, veloci e ottimizzati SEO che convertono i visitatori in clienti",
      color: "from-green-500 to-emerald-500",
      href: "/services/web-development",
    },
    {
      icon: BarChart3,
      title: language === "en" ? "AI Marketing" : "Marketing AI",
      description:
        language === "en"
          ? "Data-driven marketing campaigns that automatically optimize for maximum ROI"
          : "Campagne marketing basate sui dati che si ottimizzano automaticamente per il massimo ROI",
      color: "from-orange-500 to-red-500",
      href: "/services/ai-marketing",
    },
  ]

  const stats = [
    {
      icon: Users,
      number: "150+",
      label: language === "en" ? "Satisfied Clients" : "Clienti Soddisfatti",
    },
    {
      icon: TrendingUp,
      number: "300%",
      label: language === "en" ? "Average ROI Increase" : "Aumento ROI Medio",
    },
    {
      icon: Zap,
      number: "24/7",
      label: language === "en" ? "AI Support" : "Supporto AI",
    },
    {
      icon: Award,
      number: "98%",
      label: language === "en" ? "Success Rate" : "Tasso di Successo",
    },
  ]

  const benefits = [
    {
      icon: Target,
      title: language === "en" ? "Increased Efficiency" : "Efficienza Aumentata",
      description:
        language === "en"
          ? "Automate up to 80% of repetitive tasks"
          : "Automatizza fino all'80% dei compiti ripetitivi",
    },
    {
      icon: TrendingUp,
      title: language === "en" ? "Higher ROI" : "ROI Superiore",
      description:
        language === "en" ? "Average return on investment of 300%" : "Ritorno sull'investimento medio del 300%",
    },
    {
      icon: Clock,
      title: language === "en" ? "24/7 Availability" : "Disponibilità 24/7",
      description: language === "en" ? "AI systems that work around the clock" : "Sistemi AI che lavorano 24 ore su 24",
    },
    {
      icon: Lightbulb,
      title: language === "en" ? "Smart Insights" : "Insights Intelligenti",
      description:
        language === "en" ? "Data-driven decisions for your business" : "Decisioni basate sui dati per il tuo business",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge variant="outline" className="border-cyan-400 text-cyan-400 px-4 py-2 text-sm font-medium">
              {language === "en" ? "🚀 AI-Powered Business Solutions" : "🚀 Soluzioni Business Potenziate dall'AI"}
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {language === "en" ? "Transform Your Business" : "Trasforma il Tuo Business"}
              </span>
              <br />
              <span className="text-white">{language === "en" ? "with AI Innovation" : "con l'Innovazione AI"}</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "Discover how artificial intelligence can revolutionize your business. Book a free consultation and start your digital transformation journey."
                : "Scopri come l'intelligenza artificiale può rivoluzionare la tua azienda. Prenota una consulenza gratuita e inizia il tuo percorso di trasformazione digitale."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/appointments">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {language === "en" ? "Book Free Consultation" : "Prenota Consulenza Gratuita"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="#services">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
                >
                  {language === "en" ? "Explore Services" : "Esplora Servizi"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {language === "en" ? "Our Services" : "I Nostri Servizi"}
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "en"
                ? "Comprehensive AI solutions designed to transform your business operations and drive growth"
                : "Soluzioni AI complete progettate per trasformare le operazioni aziendali e guidare la crescita"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 h-full group cursor-pointer">
                    <CardContent className="p-6">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {language === "en" ? "Why Choose AI?" : "Perché Scegliere l'AI?"}
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "en"
                ? "Discover the concrete benefits that artificial intelligence can bring to your business"
                : "Scopri i vantaggi concreti che l'intelligenza artificiale può portare al tuo business"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-6">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
                <p className="text-slate-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {language === "en" ? "Success Stories" : "Storie di Successo"}
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "en"
                ? "Real projects that have transformed businesses through artificial intelligence"
                : "Progetti reali che hanno trasformato aziende attraverso l'intelligenza artificiale"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      {project.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs border-slate-600 text-slate-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {Object.entries(project.results).map(([key, value], resultIndex) => (
                        <div key={resultIndex}>
                          <div className="text-cyan-400 font-bold">{value}</div>
                          <div className="text-xs text-slate-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Process Section */}
      <ProcessSection />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {language === "en" ? "Get in Touch" : "Contattaci"}
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "en"
                ? "Ready to transform your business with AI? Contact us for a free consultation"
                : "Pronto a trasformare il tuo business con l'AI? Contattaci per una consulenza gratuita"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-white">
                  {language === "en" ? "Contact Information" : "Informazioni di Contatto"}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-300">Email</div>
                      <div className="text-white font-medium">info@digitalaura.it</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-300">{language === "en" ? "Phone" : "Telefono"}</div>
                      <div className="text-white font-medium">+39 123 456 7890</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-300">{language === "en" ? "Address" : "Indirizzo"}</div>
                      <div className="text-white font-medium">Milano, Italia</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-300">{language === "en" ? "Business Hours" : "Orari di Lavoro"}</div>
                      <div className="text-white font-medium">
                        {language === "en" ? "Mon-Fri 9:00-18:00" : "Lun-Ven 9:00-18:00"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {language === "en" ? "Name" : "Nome"} *
                        </label>
                        <Input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                          placeholder={language === "en" ? "Your name" : "Il tuo nome"}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                        <Input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                          placeholder={language === "en" ? "your@email.com" : "tua@email.com"}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {language === "en" ? "Phone" : "Telefono"}
                        </label>
                        <Input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                          placeholder="+39 123 456 7890"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {language === "en" ? "Company" : "Azienda"}
                        </label>
                        <Input
                          type="text"
                          value={contactForm.company}
                          onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                          placeholder={language === "en" ? "Your company" : "La tua azienda"}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {language === "en" ? "Service of Interest" : "Servizio di Interesse"}
                      </label>
                      <Select
                        value={contactForm.service}
                        onValueChange={(value) => setContactForm({ ...contactForm, service: value })}
                      >
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder={language === "en" ? "Select a service" : "Seleziona un servizio"} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="ai-automation">
                            {language === "en" ? "AI Automation" : "Automazione AI"}
                          </SelectItem>
                          <SelectItem value="chatbot">
                            {language === "en" ? "Intelligent Chatbots" : "Chatbot Intelligenti"}
                          </SelectItem>
                          <SelectItem value="web-development">
                            {language === "en" ? "Web Development" : "Sviluppo Web"}
                          </SelectItem>
                          <SelectItem value="ai-marketing">
                            {language === "en" ? "AI Marketing" : "Marketing AI"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {language === "en" ? "Message" : "Messaggio"} *
                      </label>
                      <Textarea
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500 min-h-[120px]"
                        placeholder={
                          language === "en"
                            ? "Tell us about your project and how we can help you..."
                            : "Raccontaci del tuo progetto e come possiamo aiutarti..."
                        }
                      />
                    </div>

                    {submitStatus === "success" && (
                      <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-green-400 font-medium">
                            {language === "en"
                              ? "Message sent successfully! We'll get back to you soon."
                              : "Messaggio inviato con successo! Ti ricontatteremo presto."}
                          </span>
                        </div>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <span className="text-red-400">
                          {language === "en"
                            ? "Error sending message. Please try again."
                            : "Errore nell'invio del messaggio. Riprova."}
                        </span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{language === "en" ? "Sending..." : "Invio in corso..."}</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="h-5 w-5" />
                          <span>{language === "en" ? "Send Request" : "Invia Richiesta"}</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Digital Aura</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                {language === "en"
                  ? "Transforming businesses through artificial intelligence and innovative digital solutions."
                  : "Trasformiamo le aziende attraverso l'intelligenza artificiale e soluzioni digitali innovative."}
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <span className="text-cyan-400 font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <span className="text-cyan-400 font-bold">in</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <span className="text-cyan-400 font-bold">@</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">{language === "en" ? "Services" : "Servizi"}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/ai-automation" className="text-slate-300 hover:text-cyan-400 transition-colors">
                    {language === "en" ? "AI Automation" : "Automazione AI"}
                  </Link>
                </li>
                <li>
                  <Link href="/services/chatbot" className="text-slate-300 hover:text-cyan-400 transition-colors">
                    {language === "en" ? "Chatbots" : "Chatbot"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/web-development"
                    className="text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {language === "en" ? "Web Development" : "Sviluppo Web"}
                  </Link>
                </li>
                <li>
                  <Link href="/services/ai-marketing" className="text-slate-300 hover:text-cyan-400 transition-colors">
                    {language === "en" ? "AI Marketing" : "Marketing AI"}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">{language === "en" ? "Company" : "Azienda"}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-slate-300 hover:text-cyan-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/appointments" className="text-slate-300 hover:text-cyan-400 transition-colors">
                    {language === "en" ? "Book Consultation" : "Prenota Consulenza"}
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-slate-300 hover:text-cyan-400 transition-colors">
                    {language === "en" ? "Contact" : "Contatti"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 Digital Aura. {language === "en" ? "All rights reserved." : "Tutti i diritti riservati."}
            </p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  )
}
