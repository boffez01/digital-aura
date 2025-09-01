"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bot,
  Zap,
  ArrowRight,
  Star,
  Users,
  Award,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Play,
  CheckCircle,
  Menu,
  X,
  TrendingUp,
  Clock,
  Shield,
  Lightbulb,
  Target,
  Handshake,
  Rocket,
  Linkedin,
  Twitter,
  Instagram,
  Code,
} from "lucide-react"
import Link from "next/link"
import ProjectModal from "./components/project-modal"
import ChatbotWidget from "./components/chatbot-widget"
import FAQSection from "./components/faq-section"
import ROICalculatorSection from "./components/roi-calculator"
import LanguageSelector from "./components/language-selector"
import { useLanguage } from "./contexts/language-context"

export default function DigitalAuraPortfolio() {
  const [currentSection, setCurrentSection] = useState("home")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const { t, language } = useLanguage()

  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: language === "it" ? "AI Automation" : "AI Automation",
      description:
        language === "it"
          ? "Automatizza i processi aziendali per aumentare l'efficienza."
          : "Automate business processes to increase efficiency.",
      features: ["Process Automation", "Data Analysis", "Workflow Optimization", "Cost Reduction"],
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      statsColor: "text-purple-600",
      href: "/services/ai-automation",
      stats: language === "it" ? "Fino al 60% di riduzione costi" : "Up to 60% cost reduction",
      benefits: [
        language === "it" ? "Automazione completa dei processi" : "Complete process automation",
        language === "it" ? "Analisi predittiva avanzata" : "Advanced predictive analysis",
        language === "it" ? "Integrazione con sistemi esistenti" : "Integration with existing systems",
      ],
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: language === "it" ? "Smart Chatbots" : "Smart Chatbots",
      description:
        language === "it"
          ? "Assistenti virtuali per migliorare l'esperienza cliente."
          : "Virtual assistants to improve customer experience.",
      features: ["24/7 Support", "Natural Language", "Multi-platform", "Lead Generation"],
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      statsColor: "text-blue-600",
      href: "/services/chatbot",
      stats: language === "it" ? "95% soddisfazione clienti" : "95% customer satisfaction",
      benefits: [
        language === "it" ? "Supporto clienti automatizzato" : "Automated customer support",
        language === "it" ? "Generazione lead qualificati" : "Qualified lead generation",
        language === "it" ? "Integrazione multicanale" : "Multi-channel integration",
      ],
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: language === "it" ? "Web & App Development" : "Web & App Development",
      description:
        language === "it"
          ? "Siti web ad alte prestazioni e applicazioni moderne."
          : "High-performance and modern websites and applications.",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"],
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
      statsColor: "text-green-600",
      href: "/services/web-development",
      stats: language === "it" ? "300% aumento traffico medio" : "300% average traffic increase",
      benefits: [
        language === "it" ? "Design responsive moderno" : "Modern responsive design",
        language === "it" ? "Performance ottimizzate" : "Optimized performance",
        language === "it" ? "SEO e conversioni migliorate" : "Improved SEO and conversions",
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: language === "it" ? "AI Marketing & Growth" : "AI Marketing & Growth",
      description:
        language === "it"
          ? "Marketing e crescita per influencer attraverso AI e SEO."
          : "Marketing and growth for influencers through AI and SEO.",
      features: ["Social Growth", "SEO Optimization", "Ad Campaigns", "Analytics"],
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
      statsColor: "text-orange-600",
      href: "/services/ai-marketing",
      stats: language === "it" ? "ROI medio 5x" : "5x average ROI",
      benefits: [
        language === "it" ? "Crescita follower organica" : "Organic follower growth",
        language === "it" ? "Campagne pubblicitarie AI" : "AI advertising campaigns",
        language === "it" ? "Analytics e insights avanzati" : "Advanced analytics and insights",
      ],
    },
  ]

  const projects = [
    {
      id: 1,
      title: language === "it" ? "E-commerce AI Assistant" : "E-commerce AI Assistant",
      category: language === "it" ? "AI Automation" : "AI Automation",
      description:
        language === "it"
          ? "Sistema di raccomandazioni AI che ha aumentato le vendite del 40% per un e-commerce fashion con oltre 10.000 prodotti"
          : "AI recommendation system that increased sales by 40% for a fashion e-commerce with over 10,000 products",
      image: "/modern-ecommerce-dashboard.png",
      tags:
        language === "it"
          ? ["AI", "Machine Learning", "E-commerce", "Raccomandazioni"]
          : ["AI", "Machine Learning", "E-commerce", "Recommendations"],
      timeline: language === "it" ? "3 mesi" : "3 months",
      investment: "€25.000",
      roi: "320%",
      problem:
        language === "it"
          ? "L'e-commerce aveva difficoltà a personalizzare l'esperienza utente e le vendite erano stagnanti nonostante il traffico elevato."
          : "The e-commerce had difficulty personalizing the user experience and sales were stagnant despite high traffic.",
      solution:
        language === "it"
          ? "Abbiamo implementato un sistema di raccomandazioni AI avanzato che analizza il comportamento degli utenti in tempo reale."
          : "We implemented an advanced AI recommendation system that analyzes user behavior in real time.",
      results:
        language === "it"
          ? ["40% aumento vendite", "60% miglior engagement", "25% carrelli abbandonati in meno"]
          : ["40% sales increase", "60% better engagement", "25% fewer abandoned carts"],
      technologies: ["TensorFlow", "Python", "React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: language === "it" ? "Customer Support Bot" : "Customer Support Bot",
      category: language === "it" ? "Chatbot" : "Chatbot",
      description:
        language === "it"
          ? "Chatbot multilingue che gestisce 1000+ query giornaliere con 95% di soddisfazione per una multinazionale"
          : "Multilingual chatbot that handles 1000+ daily queries with 95% satisfaction for a multinational company",
      image: "/chatbot-interface-design.png",
      tags:
        language === "it"
          ? ["NLP", "Customer Service", "Automation", "Multilingue"]
          : ["NLP", "Customer Service", "Automation", "Multilingual"],
      timeline: language === "it" ? "2 mesi" : "2 months",
      investment: "€18.000",
      roi: "280%",
      problem:
        language === "it"
          ? "Il supporto clienti era sovraccarico con tempi di risposta lunghi e costi operativi elevati."
          : "Customer support was overloaded with long response times and high operational costs.",
      solution:
        language === "it"
          ? "Sviluppato un chatbot intelligente con NLP avanzato per gestire automaticamente le richieste più comuni."
          : "Developed an intelligent chatbot with advanced NLP to automatically handle the most common requests.",
      results:
        language === "it"
          ? ["95% soddisfazione clienti", "70% riduzione tempi risposta", "50% riduzione costi supporto"]
          : ["95% customer satisfaction", "70% response time reduction", "50% support cost reduction"],
      technologies: ["OpenAI GPT", "Node.js", "React", "WebSocket", "MongoDB"],
    },
    {
      id: 3,
      title: language === "it" ? "Corporate Website Redesign" : "Corporate Website Redesign",
      category: language === "it" ? "Web Development" : "Web Development",
      description:
        language === "it"
          ? "Sito web aziendale moderno con CMS personalizzato che ha triplicato il traffico organico per una startup B2B"
          : "Modern corporate website with custom CMS that tripled organic traffic for a B2B startup",
      image: "/modern-corporate-website.png",
      tags:
        language === "it"
          ? ["React", "Next.js", "CMS", "SEO", "Performance"]
          : ["React", "Next.js", "CMS", "SEO", "Performance"],
      timeline: language === "it" ? "6 settimane" : "6 weeks",
      investment: "€15.000",
      roi: "250%",
      problem:
        language === "it"
          ? "Il sito esistente era obsoleto, lento e non generava lead qualificati per l'azienda."
          : "The existing site was outdated, slow and did not generate qualified leads for the company.",
      solution:
        language === "it"
          ? "Creato un sito moderno, veloce e ottimizzato SEO con funzionalità avanzate di lead generation."
          : "Created a modern, fast and SEO-optimized site with advanced lead generation features.",
      results:
        language === "it"
          ? ["300% aumento traffico", "150% più lead qualificati", "80% miglior velocità caricamento"]
          : ["300% traffic increase", "150% more qualified leads", "80% better loading speed"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi CMS", "Vercel"],
    },
  ]

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "100+",
      label: language === "it" ? "Clienti Soddisfatti" : "Satisfied Clients",
      color: "text-purple-600",
      description:
        language === "it"
          ? "Aziende che hanno trasformato il loro business"
          : "Companies that transformed their business",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "500+",
      label: language === "it" ? "Progetti Completati" : "Completed Projects",
      color: "text-blue-600",
      description:
        language === "it"
          ? "Soluzioni innovative implementate con successo"
          : "Innovative solutions successfully implemented",
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: "4.9",
      label: language === "it" ? "Rating Medio" : "Average Rating",
      color: "text-green-600",
      description: language === "it" ? "Valutazione media dei nostri clienti" : "Average rating from our clients",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "275%",
      label: language === "it" ? "ROI Medio" : "Average ROI",
      color: "text-orange-600",
      description: language === "it" ? "Ritorno medio sull'investimento" : "Average return on investment",
    },
  ]

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: t("values.innovation.title"),
      description: t("values.innovation.description"),
      color: "text-purple-600",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t("values.precision.title"),
      description: t("values.precision.description"),
      color: "text-purple-600",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: t("values.collaboration.title"),
      description: t("values.collaboration.description"),
      color: "text-purple-600",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: t("values.growth.title"),
      description: t("values.growth.description"),
      color: "text-purple-600",
    },
  ]

  const scrollToSection = (section: string) => {
    setCurrentSection(section)
    setMobileMenuOpen(false)
    const element = document.getElementById(section)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const navigationItems = [
    { key: "home", label: t("nav.home") },
    { key: "services", label: t("nav.services") },
    { key: "projects", label: t("nav.portfolio") },
    { key: "blog", label: t("nav.blog"), href: "/blog" },
    { key: "appointments", label: t("nav.appointments"), href: "/appointments" },
    { key: "contact", label: t("nav.contact") },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" })

    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold text-black"
              >
                Digital Aura
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.div key={item.key}>
                  {item.href ? (
                    <Link href={item.href}>
                      <motion.button
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-700 hover:text-black transition-colors font-medium"
                      >
                        {item.label}
                      </motion.button>
                    </Link>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.key)}
                      className="text-gray-700 hover:text-black transition-colors font-medium"
                    >
                      {item.label}
                    </motion.button>
                  )}
                </motion.div>
              ))}

              {/* Language Selector */}
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <span className="text-xs">🌐</span>
                </div>
                <LanguageSelector />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <span className="text-xs">🌐</span>
                </div>
                <LanguageSelector />
              </div>
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4"
            >
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.key}>
                    {item.href ? (
                      <Link href={item.href}>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-gray-700 hover:text-black transition-colors font-medium text-left w-full"
                        >
                          {item.label}
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.key)}
                        className="text-gray-700 hover:text-black transition-colors font-medium text-left w-full"
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 bg-white">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            {/* Hero Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.1,
                rotate: 360,
                transition: { duration: 0.6 },
              }}
              className="inline-block p-8 rounded-full bg-gray-600 mb-8 shadow-xl"
            >
              <Zap className="w-16 h-16 text-white" />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-600 border-purple-200 text-lg px-6 py-3 rounded-full">
                {t("hero.badge")}
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-7xl md:text-8xl font-bold mb-8 text-black"
            >
              {t("hero.title")}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-5xl mx-auto"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white text-lg px-8 py-4 rounded-lg"
                  onClick={() => scrollToSection("services")}
                >
                  {t("hero.discoverServices")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              <Link href="/appointments">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8 py-4 rounded-lg bg-transparent"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    {t("hero.freeConsultation")}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection services={services} />

      {/* Projects Section */}
      <ProjectsSection projects={projects} onProjectClick={setSelectedProject} />

      {/* Our Story Section */}
      <OurStorySection values={values} />

      {/* ROI Calculator */}
      <ROICalculatorSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection
        formData={formData}
        isSubmitting={isSubmitting}
        submitSuccess={submitSuccess}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      {/* Chatbot Widget */}
      <ChatbotWidget />

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Enhanced Services Section Component with New Design
function ServicesSection({ services }: { services: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLanguage()

  const serviceColors = {
    "AI Automation": {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
      border: "border-purple-200",
    },
    "Smart Chatbots": {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-200",
    },
    "Web & App Development": {
      bg: "bg-green-50",
      icon: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
      border: "border-green-200",
    },
    "AI Marketing & Growth": {
      bg: "bg-orange-50",
      icon: "text-orange-600",
      button: "bg-orange-600 hover:bg-orange-700",
      border: "border-orange-200",
    },
  }

  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">I Nostri Servizi</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Soluzioni digitali innovative per trasformare il tuo business con tecnologie AI all'avanguardia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const colors = serviceColors[service.title as keyof typeof serviceColors]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <Card
                  className={`${colors?.bg} border-2 ${colors?.border} shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col rounded-2xl overflow-hidden`}
                >
                  <CardHeader className="text-center pb-4 flex-shrink-0 p-6">
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.6 },
                      }}
                      className={`inline-flex p-4 rounded-xl bg-white shadow-sm mb-4 mx-auto ${colors?.icon}`}
                    >
                      {service.icon}
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-3">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </CardDescription>
                    <Badge className={`${colors?.icon} bg-white/80 border-0 font-semibold`}>{service.stats}</Badge>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1 flex flex-col p-6">
                    <div className="mb-6 flex-1">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Vantaggi Principali:</h4>
                      <ul className="space-y-2 mb-6">
                        {service.benefits.map((benefit: string, benefitIndex: number) => (
                          <motion.li
                            key={benefitIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + benefitIndex * 0.1 + 0.5,
                            }}
                            className="flex items-start text-gray-700 text-sm"
                          >
                            <CheckCircle className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${colors?.icon}`} />
                            {benefit}
                          </motion.li>
                        ))}
                      </ul>

                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Funzionalità:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature: string, featureIndex: number) => (
                          <Badge
                            key={featureIndex}
                            variant="outline"
                            className="border-gray-300 text-gray-600 text-xs bg-white/50"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link href={service.href}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className={`w-full text-white font-semibold ${colors?.button} rounded-xl py-3`}>
                            Scopri di più →
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Enhanced Projects Section Component
function ProjectsSection({ projects, onProjectClick }: { projects: any[]; onProjectClick: (project: any) => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLanguage()

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-high-contrast mb-6"
          >
            {t("projects.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-medium-contrast max-w-3xl mx-auto leading-relaxed"
          >
            {t("projects.subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.9,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      y: 50,
                      scale: 0.9,
                    }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              whileHover={{
                y: -15,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              onClick={() => onProjectClick(project)}
              className="cursor-pointer"
            >
              <Card className="card-modern overflow-hidden group h-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video overflow-hidden relative"
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-4 shadow-lg">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-primary border-0 shadow-sm">ROI: {project.roi}</Badge>
                  </div>
                </motion.div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                    >
                      <Badge
                        className={`${
                          project.category === "AI Automation"
                            ? "bg-purple-100 text-purple-700 border-purple-200"
                            : project.category === "Chatbot"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-green-100 text-green-700 border-green-200"
                        }`}
                      >
                        {project.category}
                      </Badge>
                    </motion.div>
                    <div className="text-xs text-low-contrast">{project.timeline}</div>
                  </div>
                  <CardTitle className="text-xl text-high-contrast group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-medium-contrast leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                      <motion.div
                        key={tagIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.2 + tagIndex * 0.1 + 0.7,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge variant="outline" className="border-border text-low-contrast text-xs">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="border-border text-low-contrast text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center text-low-contrast">
                      <Clock className="w-4 h-4 mr-1" />
                      {project.timeline}
                    </div>
                    <div className="flex items-center text-low-contrast">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {project.roi} ROI
                    </div>
                  </div>

                  <Button className="w-full btn-secondary group-hover:btn-primary transition-all">
                    {t("projects.viewCaseStudy")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Our Story Section Component
function OurStorySection({ values }: { values: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-high-contrast mb-8"
          >
            {t("story.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-medium-contrast max-w-4xl mx-auto leading-relaxed mb-12"
          >
            {t("story.description")}
          </motion.p>
        </motion.div>

        {/* Vision and Commitment */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-full"></div>
            <div className="pl-6">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">{t("story.vision.title")}</h3>
              <p className="text-medium-contrast leading-relaxed">{t("story.vision.description")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-full"></div>
            <div className="pl-6">
              <h3 className="text-2xl font-bold text-green-600 mb-4">{t("story.commitment.title")}</h3>
              <p className="text-medium-contrast leading-relaxed">{t("story.commitment.description")}</p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 1.0 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="card-modern h-full text-center p-6">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-full bg-purple-100 mb-6 ${value.color}`}
                >
                  {value.icon}
                </motion.div>
                <CardTitle className="text-xl text-high-contrast mb-3">{value.title}</CardTitle>
                <CardDescription className="text-medium-contrast leading-relaxed">{value.description}</CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced Contact Section Component
function ContactSection({
  formData,
  isSubmitting,
  submitSuccess,
  onSubmit,
  onInputChange,
}: {
  formData: any
  isSubmitting: boolean
  submitSuccess: boolean
  onSubmit: (e: React.FormEvent) => void
  onInputChange: (field: string, value: string) => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLanguage()

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: "Email",
      info: "info@digitalaura.it",
      description: language === "it" ? "Rispondiamo entro 2 ore" : "We respond within 2 hours",
      color: "bg-primary-gradient",
    },
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: language === "it" ? "Telefono" : "Phone",
      info: "+393500216480",
      description: language === "it" ? "Lun-Ven 9:00-18:00" : "Mon-Fri 9:00-18:00",
      color: "bg-primary-gradient",
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: language === "it" ? "Sede" : "Office",
      info: "Brescia, Italia",
      description: "Via dei Mille 5",
      color: "bg-primary-gradient",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-high-contrast mb-6"
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-medium-contrast max-w-3xl mx-auto leading-relaxed"
          >
            {t("contact.subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.2 + 0.5,
                }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="card-modern p-6 flex items-center space-x-4"
              >
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                  className={`p-4 rounded-full ${contact.color} shadow-lg`}
                >
                  {contact.icon}
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-high-contrast">{contact.title}</h3>
                  <p className="text-medium-contrast font-medium">{contact.info}</p>
                  <p className="text-low-contrast text-sm">{contact.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="card-modern p-6 bg-primary-gradient text-white"
            >
              <div className="flex items-center space-x-4">
                <Shield className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">
                    {language === "it" ? "Garanzia di Qualità" : "Quality Guarantee"}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {language === "it"
                      ? "Soddisfatti o rimborsati entro 30 giorni. La tua soddisfazione è la nostra priorità."
                      : "Satisfied or refunded within 30 days. Your satisfaction is our priority."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="text-high-contrast text-2xl">
                  {language === "it" ? "Richiedi un Preventivo Gratuito" : "Request a Free Quote"}
                </CardTitle>
                <CardDescription className="text-medium-contrast">
                  {language === "it"
                    ? "Compila il form e ti ricontatteremo entro 2 ore lavorative con una proposta personalizzata"
                    : "Fill out the form and we'll contact you within 2 business hours with a personalized proposal"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-high-contrast mb-2">{t("contact.form.success")}</h3>
                    <p className="text-medium-contrast">
                      {language === "it" ? "Ti contatteremo entro 24 ore!" : "We'll contact you within 24 hours!"}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-medium-contrast mb-2">{t("contact.form.name")}</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => onInputChange("name", e.target.value)}
                          className="bg-input border-border text-foreground"
                          placeholder="Mario Rossi"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-medium-contrast mb-2">{t("contact.form.email")}</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => onInputChange("email", e.target.value)}
                          className="bg-input border-border text-foreground"
                          placeholder="mario@esempio.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-medium-contrast mb-2">{t("contact.form.phone")}</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => onInputChange("phone", e.target.value)}
                          className="bg-input border-border text-foreground"
                          placeholder="+39 123 456 7890"
                        />
                      </div>
                      <div>
                        <label className="block text-medium-contrast mb-2">{t("contact.form.company")}</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => onInputChange("company", e.target.value)}
                          className="bg-input border-border text-foreground"
                          placeholder={language === "it" ? "La Tua Azienda" : "Your Company"}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-medium-contrast mb-2">{t("contact.form.service")}</label>
                      <Select value={formData.service} onValueChange={(value) => onInputChange("service", value)}>
                        <SelectTrigger className="bg-input border-border text-foreground">
                          <SelectValue placeholder={t("contact.form.service")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai">{t("contact.form.services.ai")}</SelectItem>
                          <SelectItem value="chatbot">{t("contact.form.services.chatbot")}</SelectItem>
                          <SelectItem value="web">{t("contact.form.services.web")}</SelectItem>
                          <SelectItem value="marketing">{t("contact.form.services.marketing")}</SelectItem>
                          <SelectItem value="consulting">{t("contact.form.services.consulting")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-medium-contrast mb-2">{t("contact.form.message")}</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => onInputChange("message", e.target.value)}
                        className="bg-input border-border text-foreground min-h-[120px]"
                        placeholder={
                          language === "it" ? "Raccontaci del tuo progetto..." : "Tell us about your project..."
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary-gradient hover:opacity-90"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {language === "it" ? "Invio in corso..." : "Sending..."}
                        </>
                      ) : (
                        <>
                          {t("contact.form.submit")}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="bg-slate-800 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Digital Aura</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">{t("footer.description")}</p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3" />
                <a href="mailto:info@digitalaura.it" className="hover:text-white transition-colors">
                  info@digitalaura.it
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3" />
                <a href="tel:+393500216480" className="hover:text-white transition-colors">
                  +393500216480
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3" />
                Brescia, Italia - Via dei Mille 5
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  {language === "it" ? "Home" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-white transition-colors">
                  {language === "it" ? "Servizi" : "Services"}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  {language === "it" ? "Blog" : "Blog"}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  {language === "it" ? "Contatti" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">{t("footer.services.title")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/ai-automation" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.services.ai")}
                </Link>
              </li>
              <li>
                <Link href="/services/chatbot" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.services.chatbot")}
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.services.web")}
                </Link>
              </li>
              <li>
                <Link href="/services/ai-marketing" className="text-gray-300 hover:text-white transition-colors">
                  {t("footer.services.marketing")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="text-gray-400 mb-4 md:mb-0">{t("footer.rights")}</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t("footer.privacyPolicy")}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t("footer.termsOfService")}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t("footer.cookiePolicy")}
              </a>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-sm text-center">{t("footer.startup")}</p>
        </div>
      </div>
    </footer>
  )
}
