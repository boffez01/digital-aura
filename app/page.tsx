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
  Zap,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
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
  Monitor,
  Cpu,
  BarChart3,
  MessageSquare,
  Eye,
  Sparkles,
  Play,
  Globe,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ProjectModal from "./components/project-modal"
import ChatbotWidget from "./components/chatbot-widget"
import FAQSection from "./components/faq-section"
import ROICalculatorSection from "./components/roi-calculator"
import ProcessSection from "./components/process-section"
import { useLanguage } from "./contexts/language-context"
import Navbar from "./components/navbar"

export default function DigitalAuraPortfolio() {
  const [currentSection, setCurrentSection] = useState("home")
  const [selectedProject, setSelectedProject] = useState<any>(null)
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

  // SERVIZI COME NELL'IMMAGINE - 4 COLONNE CON ICONE
  const services = [
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: language === "it" ? "Chatbot Intelligenti" : "Intelligent Chatbots",
      description:
        language === "it"
          ? "Chatbot AI avanzati che comprendono il linguaggio naturale e forniscono risposte personalizzate 24/7"
          : "Advanced AI chatbots that understand natural language and provide personalized responses 24/7",
      href: "/services/chatbot",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: language === "it" ? "Automazione AI" : "AI Automation",
      description:
        language === "it"
          ? "Soluzioni di automazione intelligente per ottimizzare i processi aziendali e aumentare l'efficienza"
          : "Intelligent automation solutions to optimize business processes and increase efficiency",
      href: "/services/ai-automation",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: language === "it" ? "Sviluppo Web" : "Web Development",
      description:
        language === "it"
          ? "Siti web moderni, responsive e ottimizzati per le performance con tecnologie all'avanguardia"
          : "Modern, responsive and optimized websites with cutting-edge technology",
      href: "/services/web-development",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: language === "it" ? "Marketing AI" : "AI Marketing",
      description:
        language === "it"
          ? "Strategie di marketing potenziate dall'AI per targeting preciso e campagne ad alto ROI"
          : "AI-powered marketing strategies for precise targeting and high ROI campaigns",
      href: "/services/ai-marketing",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    },
  ]

  const projects = [
    {
      id: 1,
      title: language === "it" ? "E-commerce AI Assistant" : "E-commerce AI Assistant",
      category: language === "it" ? "AI Automation" : "AI Automation",
      description:
        language === "it"
          ? "Sistema di raccomandazioni AI avanzato che ha aumentato le vendite del 40% per un e-commerce fashion con oltre 10.000 prodotti, migliorando significativamente l'esperienza utente"
          : "Advanced AI recommendation system that increased sales by 40% for a fashion e-commerce with over 10,000 products, significantly improving user experience",
      tags:
        language === "it"
          ? ["AI", "Machine Learning", "E-commerce", "Raccomandazioni", "Analytics"]
          : ["AI", "Machine Learning", "E-commerce", "Recommendations", "Analytics"],
      timeline: language === "it" ? "3 mesi" : "3 months",
      roi: "320%",
      image: "/ecommerce-project.png",
      problem:
        language === "it"
          ? "L'e-commerce aveva difficoltà a personalizzare l'esperienza utente e le vendite erano stagnanti nonostante il traffico elevato. I clienti abbandonavano spesso il carrello senza completare l'acquisto."
          : "The e-commerce had difficulty personalizing the user experience and sales were stagnant despite high traffic. Customers often abandoned their cart without completing the purchase.",
      solution:
        language === "it"
          ? "Abbiamo implementato un sistema di raccomandazioni AI avanzato che analizza il comportamento degli utenti in tempo reale, suggerendo prodotti personalizzati e ottimizzando il customer journey."
          : "We implemented an advanced AI recommendation system that analyzes user behavior in real time, suggesting personalized products and optimizing the customer journey.",
      results:
        language === "it"
          ? [
              "40% aumento vendite",
              "60% miglior engagement",
              "25% carrelli abbandonati in meno",
              "35% aumento valore medio ordine",
            ]
          : [
              "40% sales increase",
              "60% better engagement",
              "25% fewer abandoned carts",
              "35% increase in average order value",
            ],
      technologies: ["TensorFlow", "Python", "React", "Node.js", "MongoDB", "AWS"],
    },
    {
      id: 2,
      title: language === "it" ? "Customer Support Bot" : "Customer Support Bot",
      category: language === "it" ? "Chatbot" : "Chatbot",
      description:
        language === "it"
          ? "Chatbot multilingue intelligente che gestisce oltre 1000 query giornaliere con 95% di soddisfazione per una multinazionale, riducendo drasticamente i tempi di risposta"
          : "Intelligent multilingual chatbot that handles over 1000 daily queries with 95% satisfaction for a multinational company, drastically reducing response times",
      tags:
        language === "it"
          ? ["NLP", "Customer Service", "Automation", "Multilingue", "Analytics"]
          : ["NLP", "Customer Service", "Automation", "Multilingual", "Analytics"],
      timeline: language === "it" ? "2 mesi" : "2 months",
      roi: "280%",
      image: "/chatbot-project.png",
      problem:
        language === "it"
          ? "Il supporto clienti era sovraccarico con tempi di risposta lunghi e costi operativi elevati. I clienti erano frustrati dalle attese e la soddisfazione era in calo."
          : "Customer support was overloaded with long response times and high operational costs. Customers were frustrated with waiting times and satisfaction was declining.",
      solution:
        language === "it"
          ? "Sviluppato un chatbot intelligente con NLP avanzato per gestire automaticamente le richieste più comuni, con escalation seamless agli operatori umani per casi complessi."
          : "Developed an intelligent chatbot with advanced NLP to automatically handle the most common requests, with seamless escalation to human operators for complex cases.",
      results:
        language === "it"
          ? [
              "95% soddisfazione clienti",
              "70% riduzione tempi risposta",
              "50% riduzione costi supporto",
              "24/7 disponibilità",
            ]
          : [
              "95% customer satisfaction",
              "70% response time reduction",
              "50% support cost reduction",
              "24/7 availability",
            ],
      technologies: ["OpenAI GPT", "Node.js", "React", "WebSocket", "MongoDB", "Docker"],
    },
    {
      id: 3,
      title: language === "it" ? "Corporate Website Redesign" : "Corporate Website Redesign",
      category: language === "it" ? "Web Development" : "Web Development",
      description:
        language === "it"
          ? "Sito web aziendale moderno con CMS personalizzato che ha triplicato il traffico organico per una startup B2B, migliorando drasticamente la generazione di lead"
          : "Modern corporate website with custom CMS that tripled organic traffic for a B2B startup, drastically improving lead generation",
      tags:
        language === "it"
          ? ["React", "Next.js", "CMS", "SEO", "Performance", "Analytics"]
          : ["React", "Next.js", "CMS", "SEO", "Performance", "Analytics"],
      timeline: language === "it" ? "6 settimane" : "6 weeks",
      roi: "250%",
      image: "/web-development-project.png",
      problem:
        language === "it"
          ? "Il sito esistente era obsoleto, lento e non generava lead qualificati per l'azienda. La presenza online non rifletteva la qualità dei servizi offerti."
          : "The existing site was outdated, slow and did not generate qualified leads for the company. The online presence did not reflect the quality of services offered.",
      solution:
        language === "it"
          ? "Creato un sito moderno, veloce e ottimizzato SEO con funzionalità avanzate di lead generation, analytics integrate e CMS user-friendly per gestione autonoma."
          : "Created a modern, fast and SEO-optimized site with advanced lead generation features, integrated analytics and user-friendly CMS for autonomous management.",
      results:
        language === "it"
          ? [
              "300% aumento traffico",
              "150% più lead qualificati",
              "80% miglior velocità caricamento",
              "95% punteggio PageSpeed",
            ]
          : ["300% traffic increase", "150% more qualified leads", "80% better loading speed", "95% PageSpeed score"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi CMS", "Vercel", "Google Analytics"],
    },
    {
      id: 4,
      title: language === "it" ? "AI Marketing Campaign" : "AI Marketing Campaign",
      category: language === "it" ? "AI Marketing" : "AI Marketing",
      description:
        language === "it"
          ? "Campagna di marketing AI-driven per un influencer che ha aumentato i follower del 500% e i ricavi del 300% in 6 mesi attraverso strategie personalizzate"
          : "AI-driven marketing campaign for an influencer that increased followers by 500% and revenue by 300% in 6 months through personalized strategies",
      tags:
        language === "it"
          ? ["AI Marketing", "Social Media", "Influencer", "Growth", "Analytics"]
          : ["AI Marketing", "Social Media", "Influencer", "Growth", "Analytics"],
      timeline: language === "it" ? "6 mesi" : "6 months",
      roi: "400%",
      image: "/ai-marketing-project.png",
      problem:
        language === "it"
          ? "L'influencer aveva raggiunto un plateau nella crescita e faticava a monetizzare efficacemente la propria audience, con engagement in calo."
          : "The influencer had reached a growth plateau and struggled to effectively monetize their audience, with declining engagement.",
      solution:
        language === "it"
          ? "Implementata una strategia AI-driven con content optimization, timing perfetto per i post, targeting avanzato e partnership strategiche per massimizzare reach e engagement."
          : "Implemented an AI-driven strategy with content optimization, perfect timing for posts, advanced targeting and strategic partnerships to maximize reach and engagement.",
      results:
        language === "it"
          ? ["500% crescita follower", "300% aumento ricavi", "250% miglior engagement", "15 brand partnership"]
          : ["500% follower growth", "300% revenue increase", "250% better engagement", "15 brand partnerships"],
      technologies: ["Python", "TensorFlow", "Social Media APIs", "Analytics Tools", "Automation Scripts"],
    },
    {
      id: 5,
      title: language === "it" ? "Manufacturing Process Automation" : "Manufacturing Process Automation",
      category: language === "it" ? "AI Automation" : "AI Automation",
      description:
        language === "it"
          ? "Sistema di automazione completo per azienda manifatturiera che ha ridotto i costi del 45% e aumentato la produttività del 200% attraverso AI predittiva"
          : "Complete automation system for manufacturing company that reduced costs by 45% and increased productivity by 200% through predictive AI",
      tags:
        language === "it"
          ? ["IoT", "Predictive AI", "Manufacturing", "Automation", "Quality Control"]
          : ["IoT", "Predictive AI", "Manufacturing", "Automation", "Quality Control"],
      timeline: language === "it" ? "4 mesi" : "4 months",
      roi: "380%",
      image: "/ai-automation-project.png",
      problem:
        language === "it"
          ? "L'azienda manifatturiera aveva processi manuali inefficienti, sprechi elevati e difficoltà nel prevedere guasti alle macchine, causando fermi produzione costosi."
          : "The manufacturing company had inefficient manual processes, high waste and difficulty predicting machine failures, causing costly production downtime.",
      solution:
        language === "it"
          ? "Sviluppato un sistema IoT integrato con AI predittiva per monitoraggio in tempo reale, manutenzione preventiva e ottimizzazione automatica dei processi produttivi."
          : "Developed an integrated IoT system with predictive AI for real-time monitoring, preventive maintenance and automatic optimization of production processes.",
      results:
        language === "it"
          ? ["45% riduzione costi", "200% aumento produttività", "80% meno fermi macchina", "60% riduzione sprechi"]
          : ["45% cost reduction", "200% productivity increase", "80% less machine downtime", "60% waste reduction"],
      technologies: ["Python", "TensorFlow", "IoT Sensors", "MQTT", "InfluxDB", "Grafana"],
    },
    {
      id: 6,
      title: language === "it" ? "Healthcare Chatbot System" : "Healthcare Chatbot System",
      category: language === "it" ? "Chatbot" : "Chatbot",
      description:
        language === "it"
          ? "Sistema di chatbot medico per clinica privata che ha migliorato l'efficienza del 60% nella gestione appuntamenti e triage pazienti"
          : "Medical chatbot system for private clinic that improved efficiency by 60% in appointment management and patient triage",
      tags:
        language === "it"
          ? ["Healthcare", "Medical AI", "Appointment", "Triage", "GDPR Compliant"]
          : ["Healthcare", "Medical AI", "Appointment", "Triage", "GDPR Compliant"],
      timeline: language === "it" ? "3 mesi" : "3 months",
      roi: "290%",
      image: "/healthcare-project.png",
      problem:
        language === "it"
          ? "La clinica aveva difficoltà nella gestione degli appuntamenti e nel triage iniziale dei pazienti, con lunghe attese telefoniche e inefficienze operative."
          : "The clinic had difficulties in appointment management and initial patient triage, with long phone waits and operational inefficiencies.",
      solution:
        language === "it"
          ? "Creato un chatbot medico specializzato per gestione appuntamenti, triage sintomi, informazioni mediche di base e integrazione con sistema gestionale clinica."
          : "Created a specialized medical chatbot for appointment management, symptom triage, basic medical information and integration with clinic management system.",
      results:
        language === "it"
          ? ["60% efficienza gestione", "40% riduzione chiamate", "90% soddisfazione pazienti", "24/7 disponibilità"]
          : ["60% management efficiency", "40% call reduction", "90% patient satisfaction", "24/7 availability"],
      technologies: ["OpenAI GPT", "Medical APIs", "FHIR", "Node.js", "React", "PostgreSQL"],
    },
  ]

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: language === "it" ? "Innovazione Continua" : "Continuous Innovation",
      description:
        language === "it"
          ? "Sempre all'avanguardia con le ultime tecnologie AI"
          : "Always at the forefront with the latest AI technologies",
      color: "text-cyan-400",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: language === "it" ? "Risultati Misurabili" : "Measurable Results",
      description:
        language === "it" ? "Focus su ROI concreto e KPI verificabili" : "Focus on concrete ROI and verifiable KPIs",
      color: "text-cyan-400",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: language === "it" ? "Partnership Durature" : "Lasting Partnerships",
      description:
        language === "it" ? "Relazioni a lungo termine basate sulla fiducia" : "Long-term relationships based on trust",
      color: "text-cyan-400",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: language === "it" ? "Crescita Accelerata" : "Accelerated Growth",
      description:
        language === "it" ? "Soluzioni che scalano con il tuo business" : "Solutions that scale with your business",
      color: "text-cyan-400",
    },
  ]

  const scrollToSection = (section: string) => {
    setCurrentSection(section)
    const element = document.getElementById(section)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("🚀 Submitting contact form:", formData)

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          company: formData.company.trim() || null,
          service_type: formData.service || null,
          message: formData.message.trim(),
        }),
      })

      console.log("📡 Response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("✅ Contact form submitted successfully:", result)
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" })

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        const errorData = await response.json()
        console.error("❌ Contact form error:", errorData)
        throw new Error(errorData.error || "Network error")
      }
    } catch (error) {
      console.error("❌ Contact form submission error:", error)
      alert(
        language === "it" ? "Errore nell'invio del messaggio. Riprova." : "Error sending message. Please try again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="bg-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section - DIMENSIONE CORRETTA COME NELL'IMMAGINE */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Badge */}
            <Badge className="mb-6 bg-white/10 text-white border-white/20 px-6 py-3 rounded-full backdrop-blur-sm shadow-lg font-semibold text-base">
              <Sparkles className="w-4 h-4 mr-2" />
              {language === "it" ? "Innovazione Digitale AI-Powered" : "AI-Powered Digital Innovation"}
            </Badge>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
              {language === "it" ? (
                <>
                  Trasforma il Tuo
                  <br />
                  Business con{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                    l'Intelligenza Artificiale
                  </span>
                </>
              ) : (
                <>
                  Transform Your
                  <br />
                  Business with{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Artificial Intelligence
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
              {language === "it"
                ? "Chatbot intelligenti, automazione avanzata e soluzioni web innovative per portare la tua azienda nel futuro digitale. Unisciti a oltre 500 aziende che hanno già trasformato il loro business."
                : "Intelligent chatbots, advanced automation and innovative web solutions to bring your company into the digital future. Join over 500 companies that have already transformed their business."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/appointments">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-300"
                  >
                    <Sparkles className="mr-2 w-5 h-5" />
                    {language === "it" ? "Richiedi Consulenza Gratuita" : "Request Free Consultation"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full bg-transparent backdrop-blur-sm"
                  onClick={() => scrollToSection("services")}
                >
                  <Play className="mr-2 w-5 h-5" />
                  {language === "it" ? "Guarda Demo" : "Watch Demo"}
                </Button>
              </motion.div>
            </div>

            {/* Stats Mini */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { value: "500+", label: language === "it" ? "Clienti Soddisfatti" : "Happy Clients" },
                { value: "95%", label: language === "it" ? "Tasso Successo" : "Success Rate" },
                { value: "24/7", label: language === "it" ? "Supporto" : "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - COME NELL'IMMAGINE */}
      <ServicesSection services={services} />

      {/* Process Section */}
      <ProcessSection />

      {/* Projects Section */}
      <ProjectsSection projects={projects} onProjectClick={setSelectedProject} />

      {/* Our Story Section */}
      <OurStorySection values={values} />

      {/* ROI Calculator */}
      <ROICalculatorSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section - UNICO FORM */}
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

// Services Section - COME NELL'IMMAGINE CON 4 COLONNE E ICONE
function ServicesSection({ services }: { services: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLanguage()

  return (
    <section id="services" className="py-20 px-4 bg-slate-800/30">
      <div className="container mx-auto max-w-7xl" ref={ref}>
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
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            {language === "it" ? "I Nostri Servizi" : "Our Services"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {language === "it"
              ? "Soluzioni digitali complete su misura per i tuoi obiettivi aziendali"
              : "Complete digital solutions tailored to your business objectives"}
          </motion.p>
        </motion.div>

        {/* LAYOUT COME NELL'IMMAGINE - 4 COLONNE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
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
              className="h-full"
            >
              <Link href={service.href}>
                <Card className="bg-slate-800/80 border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:border-cyan-500/50 cursor-pointer group">
                  <CardContent className="p-8 text-center flex-1 flex flex-col">
                    {/* ICONA GRANDE COME NELL'IMMAGINE */}
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.6 },
                      }}
                      className={`inline-flex p-6 rounded-3xl ${service.iconBg} shadow-lg mb-6 mx-auto text-white`}
                    >
                      {service.icon}
                    </motion.div>

                    {/* TITOLO */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>

                    {/* DESCRIZIONE */}
                    <p className="text-slate-300 text-base leading-relaxed mb-6 flex-1">{service.description}</p>

                    {/* LINK - FRECCIA PIÙ VISIBILE */}
                    <div className="flex items-center justify-center text-cyan-400 font-semibold group-hover:text-white transition-colors">
                      <span className="mr-2">{language === "it" ? "Scopri di più" : "Learn more"}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 text-cyan-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects Section - SENZA INVESTIMENTI
function ProjectsSection({ projects, onProjectClick }: { projects: any[]; onProjectClick: (project: any) => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLanguage()

  return (
    <section id="projects" className="py-20 px-4">
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
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            {language === "it" ? "I Nostri Progetti" : "Our Projects"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {language === "it"
              ? "Scopri come abbiamo trasformato il business dei nostri clienti con soluzioni AI innovative e risultati misurabili"
              : "Discover how we transformed our clients' business with innovative AI solutions and measurable results"}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="cursor-pointer h-full"
            >
              <Card className="overflow-hidden group h-full shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-slate-800/50 border-slate-700 hover:border-cyan-500">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video overflow-hidden relative bg-gradient-to-br from-slate-700 to-slate-800"
                >
                  {project.image ? (
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      quality={80}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-6xl opacity-20 text-slate-500">
                        {project.category === "AI Automation" && <Cpu />}
                        {project.category === "Chatbot" && <MessageSquare />}
                        {project.category === "Web Development" && <Monitor />}
                        {project.category === "AI Marketing" && <BarChart3 />}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-4 shadow-lg border-2 border-white">
                      <Eye className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-slate-900 border-0 shadow-sm text-sm">ROI: {project.roi}</Badge>
                  </div>
                </motion.div>
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                    >
                      <Badge
                        className={`text-sm ${
                          project.category === "AI Automation"
                            ? "bg-purple-900/50 text-purple-300 border-purple-700"
                            : project.category === "Chatbot"
                              ? "bg-blue-900/50 text-blue-300 border-blue-700"
                              : project.category === "Web Development"
                                ? "bg-green-900/50 text-green-300 border-green-700"
                                : "bg-orange-900/50 text-orange-300 border-orange-700"
                        }`}
                      >
                        {project.category}
                      </Badge>
                    </motion.div>
                    <div className="text-sm text-slate-500">{project.timeline}</div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400 leading-relaxed text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
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
                        <Badge variant="outline" className="border-slate-600 text-slate-300 text-sm bg-slate-700/50">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="border-slate-600 text-slate-300 text-sm bg-slate-700/50">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center text-slate-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {project.timeline}
                    </div>
                    <div className="flex items-center text-slate-500">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {project.roi} ROI
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white group-hover:shadow-lg transition-all mt-auto text-base">
                    {language === "it" ? "Visualizza Case Study" : "View Case Study"}
                    <ArrowRight className="ml-2 w-4 h-4 text-cyan-300" />
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

// Our Story Section
function OurStorySection({ values }: { values: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLanguage()

  return (
    <section className="py-20 px-4">
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
            className="text-3xl md:text-4xl font-bold text-white mb-8"
          >
            {language === "it" ? "La Nostra Storia" : "Our Story"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            {language === "it"
              ? "Siamo un team di esperti appassionati di tecnologia e innovazione, dedicati a trasformare le aziende attraverso soluzioni AI all'avanguardia. La nostra missione è democratizzare l'accesso all'intelligenza artificiale, rendendo queste potenti tecnologie accessibili a business di ogni dimensione."
              : "We are a team of experts passionate about technology and innovation, dedicated to transforming businesses through cutting-edge AI solutions. Our mission is to democratize access to artificial intelligence, making these powerful technologies accessible to businesses of all sizes."}
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
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-full"></div>
            <div className="pl-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                {language === "it" ? "La Nostra Visione" : "Our Vision"}
              </h3>
              <p className="text-slate-400 leading-relaxed text-base">
                {language === "it"
                  ? "Crediamo in un futuro dove l'intelligenza artificiale non sostituisce l'uomo, ma lo potenzia, creando opportunità di crescita e innovazione senza precedenti. Vogliamo essere il ponte tra la tecnologia avanzata e il successo aziendale."
                  : "We believe in a future where artificial intelligence does not replace humans, but empowers them, creating unprecedented opportunities for growth and innovation. We want to be the bridge between advanced technology and business success."}
              </p>
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
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                {language === "it" ? "Il Nostro Impegno" : "Our Commitment"}
              </h3>
              <p className="text-slate-400 leading-relaxed text-base">
                {language === "it"
                  ? "Ogni progetto è un'opportunità per creare valore reale. Lavoriamo fianco a fianco con i nostri clienti per garantire risultati concreti e misurabili, con un approccio trasparente e orientato al ROI."
                  : "Every project is an opportunity to create real value. We work side by side with our clients to ensure concrete and measurable results, with a transparent and ROI-oriented approach."}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 1.0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="h-full"
            >
              <Card className="h-full text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-slate-800/50 border-slate-700 hover:border-cyan-500">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-full bg-slate-700 mb-6 ${value.color}`}
                >
                  {value.icon}
                </motion.div>
                <CardTitle className="text-xl text-white mb-3">{value.title}</CardTitle>
                <CardDescription className="text-slate-400 leading-relaxed text-base">
                  {value.description}
                </CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section - UNICO FORM FUNZIONANTE
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
      icon: <Mail className="w-5 h-5 text-white" />,
      title: "Email",
      info: "info@digitalaura.it",
      description: language === "it" ? "Rispondiamo entro 2 ore" : "We respond within 2 hours",
      color: "bg-gradient-to-r from-cyan-600 to-blue-600",
    },
    {
      icon: <Phone className="w-5 h-5 text-white" />,
      title: language === "it" ? "Telefono" : "Phone",
      info: "+393500216480",
      description: language === "it" ? "Lun-Ven 9:00-18:00" : "Mon-Fri 9:00-18:00",
      color: "bg-gradient-to-r from-cyan-600 to-blue-600",
    },
    {
      icon: <MapPin className="w-5 h-5 text-white" />,
      title: language === "it" ? "Sede" : "Office",
      info: "Brescia, Italia",
      description: "Via dei Mille 5",
      color: "bg-gradient-to-r from-cyan-600 to-blue-600",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4">
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
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            {language === "it" ? "Contattaci" : "Contact Us"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {language === "it"
              ? "Pronto a trasformare il tuo business? Contattaci per una consulenza gratuita e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi."
              : "Ready to transform your business? Contact us for a free consultation and discover how we can help you achieve your goals."}
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
                className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg p-6 flex items-center space-x-4 hover:border-cyan-500 transition-all duration-300"
              >
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                  className={`p-3 rounded-full ${contact.color} shadow-lg`}
                >
                  {contact.icon}
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{contact.title}</h3>
                  <p className="text-slate-300 font-medium text-base">{contact.info}</p>
                  <p className="text-slate-500 text-sm">{contact.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-lg p-6 text-white"
            >
              <div className="flex items-center space-x-4">
                <Shield className="w-6 h-6" />
                <div>
                  <h3 className="text-lg font-semibold">
                    {language === "it" ? "Garanzia di Qualità" : "Quality Guarantee"}
                  </h3>
                  <p className="text-cyan-100 text-sm">
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
            <Card className="shadow-lg border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  {language === "it" ? "Richiedi un Preventivo Gratuito" : "Request a Free Quote"}
                </CardTitle>
                <CardDescription className="text-slate-400 text-base">
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
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {language === "it" ? "Messaggio Inviato!" : "Message Sent!"}
                    </h3>
                    <p className="text-slate-400 text-base">
                      {language === "it" ? "Ti contatteremo entro 24 ore!" : "We'll contact you within 24 hours!"}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-300 mb-2 font-medium text-base">
                          {language === "it" ? "Nome *" : "Name *"}
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => onInputChange("name", e.target.value)}
                          className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
                          placeholder="Mario Rossi"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2 font-medium text-base">
                          {language === "it" ? "Email *" : "Email *"}
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => onInputChange("email", e.target.value)}
                          className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
                          placeholder="mario@esempio.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-300 mb-2 font-medium text-base">
                          {language === "it" ? "Telefono" : "Phone"}
                        </label>
                        <Input
                          type="tel"
                          pattern="[0-9\s\+]*"
                          title="Per favore, inserisci un numero di telefono valido."
                          value={formData.phone}
                          onChange={(e) => onInputChange("phone", e.target.value)}
                          className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
                          placeholder="+39 123 456 7890"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2 font-medium text-base">
                          {language === "it" ? "Azienda" : "Company"}
                        </label>
                        <Input
                          value={formData.company}
                          onChange={(e) => onInputChange("company", e.target.value)}
                          className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
                          placeholder={language === "it" ? "La Tua Azienda" : "Your Company"}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2 font-medium text-base">
                        {language === "it" ? "Servizio di Interesse" : "Service of Interest"}
                      </label>
                      <Select value={formData.service} onValueChange={(value) => onInputChange("service", value)}>
                        <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500">
                          <SelectValue placeholder={language === "it" ? "Seleziona un servizio" : "Select a service"} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border border-slate-600 shadow-lg">
                          <SelectItem value="ai">{language === "it" ? "AI Automation" : "AI Automation"}</SelectItem>
                          <SelectItem value="chatbot">
                            {language === "it" ? "Smart Chatbots" : "Smart Chatbots"}
                          </SelectItem>
                          <SelectItem value="web">
                            {language === "it" ? "Web Development" : "Web Development"}
                          </SelectItem>
                          <SelectItem value="marketing">
                            {language === "it" ? "AI Marketing" : "AI Marketing"}
                          </SelectItem>
                          <SelectItem value="consulting">{language === "it" ? "Consulenza" : "Consulting"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2 font-medium text-base">
                        {language === "it" ? "Messaggio *" : "Message *"}
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => onInputChange("message", e.target.value)}
                        className="bg-slate-800/50 border-slate-600 text-white min-h-[120px] focus:border-cyan-500 focus:ring-cyan-500"
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
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {language === "it" ? "Invio in corso..." : "Sending..."}
                        </>
                      ) : (
                        <>
                          {language === "it" ? "Invia Richiesta" : "Send Request"}
                          <ArrowRight className="ml-2 w-4 h-4 text-cyan-300" />
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
    <footer className="bg-slate-900 border-t border-slate-700 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Digital Aura</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed text-base">
              {language === "it"
                ? "Trasformiamo le aziende attraverso soluzioni AI innovative e tecnologie all'avanguardia. La tua crescita digitale inizia qui."
                : "We transform businesses through innovative AI solutions and cutting-edge technologies. Your digital growth starts here."}
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-slate-400">
                <Mail className="w-4 h-4 mr-3" />
                <a href="mailto:info@digitalaura.it" className="hover:text-white transition-colors text-base">
                  info@digitalaura.it
                </a>
              </div>
              <div className="flex items-center text-slate-400">
                <Phone className="w-4 h-4 mr-3" />
                <a href="tel:+393500216480" className="hover:text-white transition-colors text-base">
                  +393500216480
                </a>
              </div>
              <div className="flex items-center text-slate-400">
                <MapPin className="w-4 h-4 mr-3" />
                <span className="text-base">Brescia, Italia - Via dei Mille 5</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">{language === "it" ? "Link Rapidi" : "Quick Links"}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors text-base">
                  {language === "it" ? "Home" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-400 hover:text-white transition-colors text-base">
                  {language === "it" ? "Servizi" : "Services"}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition-colors text-base">
                  {language === "it" ? "Blog" : "Blog"}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-slate-400 hover:text-white transition-colors text-base">
                  {language === "it" ? "Contatti" : "Contact"}
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-slate-400 hover:text-white transition-colors text-base">
                  {language === "it" ? "Appuntamenti" : "Appointments"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">{language === "it" ? "I Nostri Servizi" : "Our Services"}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/ai-automation"
                  className="text-slate-400 hover:text-white transition-colors text-base"
                >
                  {language === "it" ? "AI Automation" : "AI Automation"}
                </Link>
              </li>
              <li>
                <Link href="/services/chatbot" className="text-slate-400 hover:text-white transition-colors text-base">
                  {language === "it" ? "Smart Chatbots" : "Smart Chatbots"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/web-development"
                  className="text-slate-400 hover:text-white transition-colors text-base"
                >
                  {language === "it" ? "Web Development" : "Web Development"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-marketing"
                  className="text-slate-400 hover:text-white transition-colors text-base"
                >
                  {language === "it" ? "AI Marketing" : "AI Marketing"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="text-slate-500 mb-4 md:mb-0 text-base">
              {language === "it"
                ? "© 2024 Digital Aura. Tutti i diritti riservati."
                : "© 2024 Digital Aura. All rights reserved."}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-base">
                {language === "it" ? "Privacy Policy" : "Privacy Policy"}
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-base">
                {language === "it" ? "Termini di Servizio" : "Terms of Service"}
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-base">
                {language === "it" ? "Cookie Policy" : "Cookie Policy"}
              </a>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <p className="text-slate-600 text-sm text-center">
            {language === "it"
              ? "Startup innovativa specializzata in soluzioni AI per il business • GDPR Compliant • ISO 27001 Certified"
              : "Innovative startup specialized in AI solutions for business • GDPR Compliant • ISO 27001 Certified"}
          </p>
        </div>
      </div>
    </footer>
  )
}
