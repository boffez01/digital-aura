"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Lightbulb,
  Target,
  Handshake,
  Rocket,
  Twitter,
  Instagram,
  Cpu,
  BarChart3,
  MessageSquare,
  Sparkles,
  Globe,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ProjectModal from "./components/project-modal"
import FAQSection from "./components/faq-section"
import ROICalculatorSection from "./components/roi-calculator"
import ProcessSection from "./components/process-section"
import { useLanguage } from "./contexts/language-context"
import Navbar from "./components/navbar"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

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

  // SERVIZI
  const services = [
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: language === "it" ? "Chatbot & Voice AI" : "Chatbot & Voice AI",
      description:
        language === "it"
          ? "Il tuo miglior venditore, disponibile h24. Risponde al telefono e in chat, qualifica i clienti e fissa appuntamenti sul tuo calendario."
          : "Your best salesperson, available 24/7. Answers phone and chat, qualifies leads, and books appointments on your calendar.",
      href: "/services/chatbot",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: language === "it" ? "Automazione Totale" : "Full Automation",
      description:
        language === "it"
          ? "Colleghiamo i tuoi software (CRM, Email, Fatture). Elimina il copia-incolla e gli errori umani per sempre."
          : "We connect your software (CRM, Email, Invoices). Eliminate copy-pasting and human errors forever.",
      href: "/services/ai-automation",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: language === "it" ? "Siti Web Performanti" : "High-Performance Web",
      description:
        language === "it"
          ? "Non semplici vetrine, ma macchine da guerra per generare contatti. Veloci, ottimizzati SEO e progettati per convertire."
          : "Not just showcases, but lead generation machines. Fast, SEO optimized, and designed to convert.",
      href: "/services/web-development",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: language === "it" ? "Marketing Automatico" : "Automated Marketing",
      description:
        language === "it"
          ? "Insegui i clienti in automatico. Email, SMS e messaggi per recuperare chi non ha comprato subito."
          : "Chase customers automatically. Email, SMS, and messages to recover those who didn't buy immediately.",
      href: "/services/ai-marketing",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    },
  ]

  // PROGETTI AGGIORNATI: VERITÀ > FINZIONE
  // Qui descriviamo SCENARI D'USO (Use Cases) invece di fingere di avere clienti passati.
  const projects = [
    {
      id: 1,
      title: "AI Voice Receptionist",
      category: "AI Automation",
      description:
        language === "it" ? "Il telefono non suona più a vuoto. Mai più." : "The phone never rings out. Ever again.",
      tags: ["Vapi.ai", "Voice AI", "Booking"],
      timeline: language === "it" ? "Setup: 3 Giorni" : "Setup: 3 Days",
      roi: "100% Risposte",
      image: "/chatbot-project.png",
      problem:
        language === "it"
          ? "SCENARIO: Sei in cantiere o in riunione. Il telefono squilla. Non rispondi. Il cliente chiama il concorrente."
          : "SCENARIO: You are on site or in a meeting. The phone rings. You don't answer. The client calls the competitor.",
      solution:
        language === "it"
          ? "SOLUZIONE: Un'AI vocale risponde al primo squillo, capisce la richiesta e fissa l'appuntamento direttamente sul tuo Google Calendar."
          : "SOLUTION: A voice AI answers on the first ring, understands the request, and books the appointment directly on your Google Calendar.",
      results:
        language === "it"
          ? ["Zero clienti persi", "Niente segreteria", "Agenda piena"]
          : ["Zero lost clients", "No voicemail", "Full agenda"],
      technologies: ["Vapi", "OpenAI", "Google Calendar"],
    },
    {
      id: 2,
      title: "E-commerce Support Bot",
      category: "Chatbot",
      description:
        language === "it" ? "Il commesso virtuale che non dorme mai." : "The virtual shop assistant that never sleeps.",
      tags: ["OpenAI", "Sales", "Support"],
      timeline: language === "it" ? "Setup: 2 Settimane" : "Setup: 2 Weeks",
      roi: "+20% Vendite",
      image: "/ecommerce-project.png",
      problem:
        language === "it"
          ? "SCENARIO: I clienti hanno dubbi su spedizioni o taglie alle 23:00. Nessuno risponde. Abbandonano il carrello."
          : "SCENARIO: Customers have doubts about shipping or sizes at 11 PM. No one answers. They abandon the cart.",
      solution:
        language === "it"
          ? "SOLUZIONE: Un Chatbot addestrato sui tuoi prodotti che risponde in 2 secondi, consiglia articoli e chiude la vendita."
          : "SOLUTION: A Chatbot trained on your products that answers in 2 seconds, recommends items, and closes the sale.",
      results:
        language === "it"
          ? ["Vendite notturne", "Meno ticket supporto", "Clienti felici"]
          : ["Night sales", "Fewer support tickets", "Happy customers"],
      technologies: ["OpenAI GPT-4", "Shopify", "Node.js"],
    },
    {
      id: 3,
      title: "Sito Web Lead-Gen",
      category: "Web Development",
      description:
        language === "it"
          ? "Una macchina per generare contatti, non un biglietto da visita."
          : "A lead generation machine, not a business card.",
      tags: ["Next.js", "Conversion", "Speed"],
      timeline: "4 Settimane",
      roi: "Velocità",
      image: "/web-development-project.png",
      problem:
        language === "it"
          ? "SCENARIO: Hai un sito vecchio, lento, che non si vede bene sul cellulare. I clienti entrano ed escono subito."
          : "SCENARIO: You have an old, slow site that doesn't look good on mobile. Customers enter and leave immediately.",
      solution:
        language === "it"
          ? "SOLUZIONE: Rifacciamo tutto con tecnologia Next.js. Velocità istantanea, design che ispira fiducia e percorsi chiari per farti contattare."
          : "SOLUTION: We rebuild everything with Next.js technology. Instant speed, design that inspires trust, and clear paths to get contacted.",
      results:
        language === "it"
          ? ["Caricamento < 1s", "Design Premium", "Più contatti"]
          : ["Load < 1s", "Premium Design", "More leads"],
      technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    },
    {
      id: 4,
      title: language === "it" ? "AI Content Strategy" : "AI Content Strategy",
      category: language === "it" ? "AI Marketing" : "AI Marketing",
      description:
        language === "it"
          ? "Sistema per generare e programmare contenuti social di qualità in scala."
          : "System to generate and schedule quality social content at scale.",
      tags: ["Content AI", "Social Media", "Growth"],
      timeline: language === "it" ? "Setup: 1 Settimana" : "Setup: 1 Week",
      roi: "Visibilità",
      image: "/ai-marketing-project.png",
      problem:
        language === "it"
          ? "SCENARIO TIPICO: L'azienda sa di dover pubblicare sui social ma non ha tempo o idee, risultando in una pagina morta."
          : "TYPICAL SCENARIO: The company knows it needs to post on social media but lacks time or ideas, resulting in a dead page.",
      solution:
        language === "it"
          ? "SOLUZIONE: Workflow AI che prende i tuoi argomenti chiave e genera post, immagini e copy ottimizzati, pronti per la revisione e pubblicazione."
          : "SOLUTION: AI workflow that takes your key topics and generates optimized posts, images, and copy, ready for review and publishing.",
      results:
        language === "it"
          ? ["Presenza social costante", "Piano editoriale automatico", "Brand awareness", "Zero tempo perso"]
          : ["Constant social presence", "Automatic editorial plan", "Brand awareness", "Zero wasted time"],
      technologies: ["ChatGPT", "Midjourney", "Buffer/Hootsuite"],
    },
  ]

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: language === "it" ? "Ingegneri, non Artisti" : "Engineers, not Artists",
      description:
        language === "it"
          ? "Non facciamo 'cose belle'. Facciamo cose che funzionano e portano fatturato."
          : "We don't make 'pretty things'. We make things that work and bring revenue.",
      color: "text-cyan-400",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: language === "it" ? "Ossessionati dal ROI" : "Obsessed with ROI",
      description:
        language === "it"
          ? "Se spendi 1€ con noi, devi riprenderne almeno 3. Altrimenti abbiamo fallito."
          : "If you spend €1 with us, you must get at least 3 back. Otherwise, we failed.",
      color: "text-cyan-400",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: language === "it" ? "Parliamo la tua Lingua" : "We Speak Your Language",
      description:
        language === "it"
          ? "Niente termini tecnici incomprensibili. Ti spieghiamo tutto in modo semplice e chiaro."
          : "No incomprehensible technical terms. We explain everything simply and clearly.",
      color: "text-cyan-400",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: language === "it" ? "Velocità Startup" : "Startup Speed",
      description:
        language === "it"
          ? "Le grandi agenzie ci mettono mesi. Noi ci mettiamo giorni. Il business non aspetta."
          : "Big agencies take months. We take days. Business doesn't wait.",
      color: "text-cyan-400",
    },
  ]

  const scrollToSection = (section: string) => {
    setCurrentSection(section)
    const element = document.getElementById(section)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!executeRecaptcha) {
        console.error("❌ Recaptcha not available")
        alert("Sistema di sicurezza non disponibile. Riprova.")
        setIsSubmitting(false)
        return
      }

      const token = await executeRecaptcha("contact_form")

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
          recaptchaToken: token,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" })

        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        const errorData = await response.json()
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
      <Navbar />

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
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
            <Badge className="mb-6 bg-white/10 text-white px-6 py-3 rounded-full backdrop-blur-sm shadow-lg font-semibold text-base">
              <Sparkles className="w-4 h-4 mr-2" />
              {language === "it" ? "Automazione AI per il Business" : "AI Business Automation"}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
              {language === "it" ? (
                <>
                  Smetti di Perdere Tempo.
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Automatizza il Tuo Business.
                  </span>
                </>
              ) : (
                <>
                  Stop Wasting Time.
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Automate Your Business.
                  </span>
                </>
              )}
            </h1>

            <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
              {language === "it"
                ? "Recupera 15+ ore a settimana. Elimina il data-entry manuale, le chiamate perse e i processi lenti. Costruiamo sistemi che lavorano al posto tuo, h24."
                : "Recover 15+ hours a week. Eliminate manual data entry, missed calls, and slow processes. We build systems that work for you, 24/7."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/appointments">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-300"
                  >
                    <Sparkles className="mr-2 w-5 h-5" />
                    {language === "it" ? "Analisi Gratuita" : "Free Analysis"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#projects">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 hover:bg-white/10 text-white text-lg px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300 bg-transparent"
                  >
                    {language === "it" ? "Vedi Soluzioni" : "See Solutions"}
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { value: "24/7", label: language === "it" ? "Operatività" : "Operations" },
                { value: "100%", label: language === "it" ? "Dedizione" : "Dedication" },
                { value: "Fast", label: language === "it" ? "Implementazione" : "Implementation" },
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

      <ServicesSection services={services} />
      <ProcessSection />
      <ProjectsSection projects={projects} onProjectClick={setSelectedProject} />
      <OurStorySection values={values} />
      <ROICalculatorSection />
      <FAQSection />
      <BusinessTransformationCTA />
      <ContactSection
        formData={formData}
        isSubmitting={isSubmitting}
        submitSuccess={submitSuccess}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />

      <Footer />
    </div>
  )
}

function BusinessTransformationCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { language } = useLanguage()

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: language === "it" ? "Analisi gratuita del tuo business" : "Free business analysis",
      description:
        language === "it" ? "Valutiamo il potenziale AI della tua azienda" : "We evaluate your company's AI potential",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: language === "it" ? "Strategia AI personalizzata" : "Personalized AI strategy",
      description: language === "it" ? "Piano su misura per i tuoi obiettivi" : "Tailored plan for your goals",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: language === "it" ? "Risparmio immediato" : "Immediate savings",
      description:
        language === "it" ? "Identifichiamo dove perdi soldi oggi" : "We identify where you lose money today",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(6,182,212,0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.3),transparent_70%)]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-300 mb-6"
          >
            {language === "it" ? "Non lasciare soldi sul tavolo." : "Don't leave money on the table."}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {language === "it" ? "Pronto a digitalizzare la tua azienda?" : "Ready to digitize your business?"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            {language === "it"
              ? "La concorrenza si sta già muovendo. Prenota una consulenza gratuita e scopri come superarla."
              : "Competition is already moving. Book a free consultation and find out how to beat them."}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
              className="text-center"
            >
              <Card className="bg-slate-800/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:border-cyan-500/50 p-8">
                {/* CHANGE: Removed whileHover animation (scale, rotate) and gradient background from icon */}
                <div className="inline-flex p-4 rounded-full bg-slate-700 shadow-lg mb-6 text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/appointments">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-10 py-4 rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-300"
              >
                {language === "it" ? "Prenota Consulenza" : "Book Consultation"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="text-slate-300 hover:bg-slate-800/50 hover:border-cyan-500 text-lg px-10 py-4 rounded-full bg-transparent backdrop-blur-sm transition-all duration-300"
              onClick={() => {
                const element = document.getElementById("contact")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {language === "it" ? "Scrivici un Messaggio" : "Write a Message"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ServicesSection({ services }: { services: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { language } = useLanguage()

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
              ? "Soluzioni digitali su misura per i tuoi obiettivi aziendali"
              : "Digital solutions tailored to your business objectives"}
          </motion.p>
        </motion.div>

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
                <Card className="bg-slate-800/80 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:border-cyan-500/50 cursor-pointer group">
                  <CardContent className="p-8 text-center flex-1 flex flex-col">
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

                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-300 text-base leading-relaxed mb-6 flex-1">{service.description}</p>

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

function ProjectsSection({ projects, onProjectClick }: { projects: any[]; onProjectClick: (project: any) => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { language } = useLanguage()

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
            {language === "it" ? "Sistemi Pronti all'Uso" : "Ready-to-Use Systems"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {language === "it"
              ? "Non vendiamo esperimenti. Vendiamo soluzioni testate che risolvono problemi specifici."
              : "We don't sell experiments. We sell tested solutions that solve specific problems."}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.3 } }}
              onClick={() => onProjectClick(project)}
              className="cursor-pointer h-full"
            >
              <Card className="overflow-hidden group h-full shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-slate-800/50 hover:border-cyan-500">
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
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-6xl opacity-20 text-slate-500">
                        <Cpu />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-slate-900 border-0 shadow-sm text-sm">{project.roi}</Badge>
                  </div>
                </motion.div>
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-slate-700/50 text-cyan-400 border-cyan-500/30">{project.category}</Badge>
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
                  <Button className="w-full bg-slate-700 hover:bg-cyan-600 text-white mt-auto">
                    Scopri i Dettagli <ArrowRight className="ml-2 w-4 h-4" />
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

function OurStorySection({ values }: { values: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { language } = useLanguage()

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {language === "it" ? "Perché Praxis Futura?" : "Why Praxis Futura?"}
          </h2>
          <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed mb-12">
            {language === "it"
              ? "Siamo una nuova realtà, affamata e tecnologicamente avanzata. A differenza delle grandi agenzie lente e costose, noi offriamo velocità, attenzione personale e tecnologie che sono uscite il mese scorso, non 10 anni fa."
              : "We are a new reality, hungry and technologically advanced. Unlike big slow and expensive agencies, we offer speed, personal attention, and technologies that came out last month, not 10 years ago."}
          </p>
        </motion.div>

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
              <Card className="h-full text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-slate-800/50 hover:border-cyan-500">
                {/* CHANGE: Removed whileHover animation (scale, rotate) from icon */}
                <div className={`inline-flex p-4 rounded-full bg-slate-700 mb-6 ${value.color}`}>{value.icon}</div>
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
  const { language } = useLanguage()

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-white" />,
      title: "Email",
      info: "info@praxisfutura.com",
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {language === "it" ? "Contattaci" : "Contact Us"}
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {language === "it"
              ? "Non aspettare che i problemi si risolvano da soli. Scrivici e capiamo se possiamo aiutarti."
              : "Don't wait for problems to solve themselves. Write to us and let's see if we can help."}
          </p>
        </motion.div>

        <div className="space-y-12">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-slate-800/50 rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:border-cyan-500 transition-all duration-300"
              >
                <div className={`p-3 rounded-full ${contact.color} shadow-lg mb-4`}>{contact.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{contact.title}</h3>
                  <p className="text-slate-300 font-medium text-base mb-1">{contact.info}</p>
                  <p className="text-slate-500 text-sm">{contact.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="w-full">
            <Card className="shadow-lg bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  {language === "it" ? "Scrivici un Messaggio" : "Send a Message"}
                </CardTitle>
                <CardDescription className="text-slate-400 text-base">
                  {language === "it"
                    ? "Compila il modulo qui sotto. Ti risponderemo velocemente."
                    : "Fill out the form below. We'll respond quickly."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">
                        {language === "it" ? "Nome" : "Name"}
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 rounded-md bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        placeholder={language === "it" ? "Il tuo nome" : "Your name"}
                        value={formData.name}
                        onChange={(e) => onInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Email</label>
                      <input
                        type="email"
                        className="w-full p-3 rounded-md bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        placeholder={language === "it" ? "tu@azienda.it" : "you@company.com"}
                        value={formData.email}
                        onChange={(e) => onInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">
                        {language === "it" ? "Telefono" : "Phone"}
                      </label>
                      <input
                        type="tel"
                        className="w-full p-3 rounded-md bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        placeholder="+39..."
                        value={formData.phone}
                        onChange={(e) => onInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">
                        {language === "it" ? "Azienda" : "Company"}
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 rounded-md bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        placeholder={language === "it" ? "Nome azienda" : "Company name"}
                        value={formData.company}
                        onChange={(e) => onInputChange("company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      {language === "it" ? "Messaggio" : "Message"}
                    </label>
                    <textarea
                      className="w-full p-3 rounded-md bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all h-32"
                      placeholder={language === "it" ? "Come possiamo aiutarti?" : "How can we help you?"}
                      value={formData.message}
                      onChange={(e) => onInputChange("message", e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-6 text-lg font-semibold shadow-lg transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {language === "it" ? "Invio in corso..." : "Sending..."}
                      </span>
                    ) : submitSuccess ? (
                      <span className="flex items-center text-green-200">
                        <CheckCircle2 className="mr-2 h-5 w-5" />{" "}
                        {language === "it" ? "Messaggio Inviato!" : "Message Sent!"}
                      </span>
                    ) : language === "it" ? (
                      "Invia Messaggio"
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-cyan-900/20 to-green-900/20 border-t border-cyan-400/30 text-white py-12 px-4 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                Praxis Futura
              </span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed text-base">
              {language === "it"
                ? "Trasformiamo le aziende attraverso soluzioni AI innovative e tecnologie all'avanguardia. La tua crescita digitale inizia qui."
                : "We transform businesses through innovative AI solutions and cutting-edge technologies. Your digital growth starts here."}
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <Mail className="w-4 h-4 mr-3 text-cyan-400" />
                <a href="mailto:info@praxisfutura.com" className="hover:text-cyan-300 transition-colors text-base">
                  info@praxisfutura.com
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-4 h-4 mr-3 text-cyan-400" />
                <a href="tel:+393500216480" className="hover:text-cyan-300 transition-colors text-base">
                  +393500216480
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin className="w-4 h-4 mr-3 text-cyan-400" />
                <span className="text-base">Brescia, Italia - Via dei Mille 5</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
              {language === "it" ? "Link Rapidi" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-300 hover:text-cyan-300 transition-colors text-base">
                  {language === "it" ? "Home" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-300 hover:text-cyan-300 transition-colors text-base">
                  {language === "it" ? "Servizi" : "Services"}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-cyan-300 transition-colors text-base">
                  {language === "it" ? "Blog" : "Blog"}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-slate-300 hover:text-cyan-300 transition-colors text-base">
                  {language === "it" ? "Contatti" : "Contact"}
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-slate-300 hover:text-cyan-300 transition-colors text-base">
                  {language === "it" ? "Appuntamenti" : "Appointments"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
              {language === "it" ? "I Nostri Servizi" : "Our Services"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/ai-automation"
                  className="text-slate-300 hover:text-cyan-300 transition-colors text-base"
                >
                  {language === "it" ? "AI Automation" : "AI Automation"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/chatbot"
                  className="text-slate-300 hover:text-cyan-300 transition-colors text-base"
                >
                  {language === "it" ? "Smart Chatbots" : "Smart Chatbots"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/web-development"
                  className="text-slate-300 hover:text-cyan-300 transition-colors text-base"
                >
                  {language === "it" ? "Web Development" : "Web Development"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-marketing"
                  className="text-slate-300 hover:text-cyan-300 transition-colors text-base"
                >
                  {language === "it" ? "AI Marketing" : "AI Marketing"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-400/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="text-slate-400 mb-4 md:mb-0 text-base">
              {language === "it"
                ? "© 2025 Praxis Futura. Tutti i diritti riservati."
                : "© 2025 Praxis Futura. All rights reserved."}
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-slate-400 hover:text-cyan-300 transition-colors text-base">
                {language === "it" ? "Privacy Policy" : "Privacy Policy"}
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-cyan-300 transition-colors text-base">
                {language === "it" ? "Termini di Servizio" : "Terms of Service"}
              </Link>
              <Link href="/cookies" className="text-slate-400 hover:text-cyan-300 transition-colors text-base">
                {language === "it" ? "Cookie Policy" : "Cookie Policy"}
              </Link>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://www.tiktok.com/@praxisfutura?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/praxis_futura?igsh=cjd6cmFveDJxN3Vz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/PraxisFutura"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-300 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          <p className="text-slate-500 text-sm text-center">
            {language === "it"
              ? "Startup innovativa specializzata in soluzioni AI per il business • GDPR Compliant • ISO 27001 Certified"
              : "Innovative startup specialized in AI solutions for business • GDPR Compliant • ISO 27001 Certified"}
          </p>
        </div>
      </div>
    </footer>
  )
}
