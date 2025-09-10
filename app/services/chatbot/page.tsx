"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import ServiceNavbar from "../../components/service-navbar"
import ROICalculator from "../../components/roi-calculator"
import BookingChatbot from "../../components/demo-chatbots/booking-chatbot"
import EcommerceChatbot from "../../components/demo-chatbots/ecommerce-chatbot"
import BusinessChatbot from "../../components/demo-chatbots/business-chatbot"
import SupportChatbot from "../../components/demo-chatbots/support-chatbot"
import FAQChatbot from "../../components/demo-chatbots/faq-chatbot"
import { useLanguage } from "../../contexts/language-context"
import {
  MessageSquare,
  Bot,
  Zap,
  TrendingUp,
  Shield,
  Clock,
  Globe,
  CheckCircle,
  Smartphone,
  Monitor,
  Headphones,
  ShoppingCart,
  Calendar,
  HelpCircle,
  Star,
  Sparkles,
  Brain,
  Rocket,
  Target,
  Award,
  Layers,
  Cpu,
  Database,
  Lock,
  BarChart3,
  Settings,
  Calculator,
  Lightbulb,
} from "lucide-react"

export default function ChatbotPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [activeDemo, setActiveDemo] = useState("booking")

  const heroStats = [
    {
      number: "500+",
      label: language === "it" ? "Chatbot Attivi" : "Active Chatbots",
      icon: <Bot className="h-6 w-6" />,
    },
    {
      number: "99.9%",
      label: language === "it" ? "Uptime Garantito" : "Guaranteed Uptime",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      number: "24/7",
      label: language === "it" ? "Supporto Continuo" : "Continuous Support",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      number: "50+",
      label: language === "it" ? "Lingue Supportate" : "Supported Languages",
      icon: <Globe className="h-6 w-6" />,
    },
  ]

  const benefits = [
    {
      metric: "85%",
      label: language === "it" ? "Riduzione Ticket" : "Ticket Reduction",
      description:
        language === "it"
          ? "Meno richieste manuali grazie all'automazione intelligente"
          : "Fewer manual requests thanks to intelligent automation",
      icon: <TrendingUp className="h-8 w-8" />,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      metric: "3x",
      label: language === "it" ? "Aumento Conversioni" : "Conversion Boost",
      description:
        language === "it"
          ? "Più lead qualificati attraverso conversazioni guidate"
          : "More qualified leads through guided conversations",
      icon: <Target className="h-8 w-8" />,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      metric: "60%",
      label: language === "it" ? "Risparmio Costi" : "Cost Savings",
      description:
        language === "it"
          ? "Riduzione significativa dei costi operativi"
          : "Significant reduction in operational costs",
      icon: <Award className="h-8 w-8" />,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      metric: "24/7",
      label: language === "it" ? "Disponibilità" : "Availability",
      description: language === "it" ? "Assistenza sempre attiva per i clienti" : "Always active customer support",
      icon: <Rocket className="h-8 w-8" />,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
    },
  ]

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: language === "it" ? "AI Conversazionale Avanzata" : "Advanced Conversational AI",
      description:
        language === "it"
          ? "Comprensione del linguaggio naturale con risposte intelligenti e contestuali"
          : "Natural language understanding with intelligent and contextual responses",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: language === "it" ? "Integrazione Rapida" : "Rapid Integration",
      description:
        language === "it"
          ? "Setup in 24 ore con integrazione completa nei tuoi sistemi esistenti"
          : "24-hour setup with complete integration into your existing systems",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: language === "it" ? "Supporto Multicanale" : "Multichannel Support",
      description:
        language === "it"
          ? "Funziona su sito web, WhatsApp, Telegram, Facebook Messenger e app mobile"
          : "Works on website, WhatsApp, Telegram, Facebook Messenger and mobile apps",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: language === "it" ? "Analytics Avanzate" : "Advanced Analytics",
      description:
        language === "it"
          ? "Dashboard completa con metriche di performance e insights sui clienti"
          : "Complete dashboard with performance metrics and customer insights",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: language === "it" ? "Sicurezza Enterprise" : "Enterprise Security",
      description:
        language === "it"
          ? "Crittografia end-to-end e conformità GDPR per la massima sicurezza"
          : "End-to-end encryption and GDPR compliance for maximum security",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: language === "it" ? "Performance Ottimizzata" : "Optimized Performance",
      description:
        language === "it"
          ? "Tempi di risposta ultra-rapidi e scalabilità automatica"
          : "Ultra-fast response times and automatic scalability",
      gradient: "from-indigo-500 to-blue-500",
    },
  ]

  const chatbotTypes = [
    {
      id: "booking",
      name: "Booking Assistant",
      icon: <Calendar className="h-6 w-6" />,
      description: language === "it" ? "Gestione prenotazioni e appuntamenti" : "Booking and appointment management",
      color: "from-green-500 to-emerald-600",
      badge: "Popular",
      features: [
        language === "it" ? "Controllo disponibilità" : "Availability check",
        language === "it" ? "Conferma automatica" : "Auto confirmation",
        language === "it" ? "Promemoria SMS" : "SMS reminders",
      ],
    },
    {
      id: "ecommerce",
      name: "E-commerce Bot",
      icon: <ShoppingCart className="h-6 w-6" />,
      description: language === "it" ? "Assistente vendite e prodotti" : "Sales and product assistant",
      color: "from-blue-500 to-indigo-600",
      badge: "Sales",
      features: [
        language === "it" ? "Catalogo prodotti" : "Product catalog",
        language === "it" ? "Carrello integrato" : "Integrated cart",
        language === "it" ? "Pagamenti sicuri" : "Secure payments",
      ],
    },
    {
      id: "business",
      name: "Business Assistant",
      icon: <Bot className="h-6 w-6" />,
      description: language === "it" ? "Consulenza e lead generation" : "Consulting and lead generation",
      color: "from-purple-500 to-pink-600",
      badge: "AI",
      features: [
        language === "it" ? "Qualificazione lead" : "Lead qualification",
        language === "it" ? "Analisi bisogni" : "Needs analysis",
        language === "it" ? "Preventivi automatici" : "Auto quotes",
      ],
    },
    {
      id: "support",
      name: "Customer Support",
      icon: <Headphones className="h-6 w-6" />,
      description: language === "it" ? "Supporto tecnico e assistenza" : "Technical support and assistance",
      color: "from-orange-500 to-red-600",
      badge: "24/7",
      features: [
        language === "it" ? "Risoluzione problemi" : "Problem solving",
        language === "it" ? "Escalation automatica" : "Auto escalation",
        language === "it" ? "Base conoscenza" : "Knowledge base",
      ],
    },
    {
      id: "faq",
      name: "FAQ Bot",
      icon: <HelpCircle className="h-6 w-6" />,
      description: language === "it" ? "Domande frequenti e informazioni" : "FAQ and information",
      color: "from-cyan-500 to-blue-600",
      badge: "Fast",
      features: [
        language === "it" ? "Ricerca intelligente" : "Smart search",
        language === "it" ? "Risposte istantanee" : "Instant answers",
        language === "it" ? "Apprendimento continuo" : "Continuous learning",
      ],
    },
  ]

  const integrationPlatforms = [
    {
      icon: <Monitor className="h-12 w-12" />,
      title: language === "it" ? "Sito Web" : "Website",
      description: language === "it" ? "Widget integrato nel tuo sito" : "Widget integrated into your site",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "WhatsApp",
      description: language === "it" ? "Integrazione WhatsApp Business" : "WhatsApp Business integration",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <MessageSquare className="h-12 w-12" />,
      title: "Telegram",
      description: language === "it" ? "Bot Telegram personalizzato" : "Custom Telegram bot",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Social Media",
      description: language === "it" ? "Facebook Messenger e altro" : "Facebook Messenger and more",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Database className="h-12 w-12" />,
      title: "CRM",
      description: language === "it" ? "Integrazione con sistemi CRM" : "Integration with CRM systems",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Settings className="h-12 w-12" />,
      title: "API",
      description: language === "it" ? "API personalizzate" : "Custom APIs",
      gradient: "from-violet-500 to-purple-500",
    },
  ]

  const howItWorksSteps = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: language === "it" ? "Analisi Requisiti" : "Requirements Analysis",
      description:
        language === "it"
          ? "Analizziamo le tue esigenze e definiamo gli obiettivi del chatbot"
          : "We analyze your needs and define the chatbot objectives",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: language === "it" ? "Sviluppo AI" : "AI Development",
      description:
        language === "it"
          ? "Creiamo e addestriamo il modello AI specifico per il tuo business"
          : "We create and train the AI model specific to your business",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: language === "it" ? "Integrazione" : "Integration",
      description:
        language === "it"
          ? "Integriamo il chatbot nei tuoi sistemi e canali di comunicazione"
          : "We integrate the chatbot into your systems and communication channels",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: language === "it" ? "Ottimizzazione" : "Optimization",
      description:
        language === "it"
          ? "Monitoriamo le performance e ottimizziamo continuamente"
          : "We monitor performance and continuously optimize",
      color: "from-orange-500 to-red-500",
    },
  ]

  const whatYouGetBenefits = [
    {
      icon: <Target className="h-8 w-8" />,
      title: language === "it" ? "Riduzione Costi Operativi" : "Operational Cost Reduction",
      description:
        language === "it"
          ? "Automatizza le attività ripetitive e riduci i costi del customer service"
          : "Automate repetitive tasks and reduce customer service costs",
      color: "text-green-600",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: language === "it" ? "Risposta Immediata" : "Immediate Response",
      description:
        language === "it"
          ? "Rispondi ai clienti 24/7 senza tempi di attesa"
          : "Respond to customers 24/7 without waiting times",
      color: "text-blue-600",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: language === "it" ? "Miglior Esperienza Cliente" : "Better Customer Experience",
      description:
        language === "it"
          ? "Offri un servizio personalizzato e sempre disponibile"
          : "Provide personalized and always available service",
      color: "text-purple-600",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: language === "it" ? "Insights Avanzati" : "Advanced Insights",
      description:
        language === "it"
          ? "Ottieni dati preziosi sui comportamenti e preferenze dei clienti"
          : "Get valuable data on customer behaviors and preferences",
      color: "text-orange-600",
    },
  ]

  const insightFactors = [
    {
      title: language === "it" ? "Complessità Processi" : "Process Complexity",
      description:
        language === "it"
          ? "Processi più complessi tipicamente generano maggiori benefici dall'automazione"
          : "More complex processes typically generate greater benefits from automation",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: language === "it" ? "Adozione Team" : "Team Adoption",
      description:
        language === "it"
          ? "Il tasso di adozione degli utenti impatta significativamente il successo"
          : "User adoption rate significantly impacts success",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: language === "it" ? "Qualità Dati" : "Data Quality",
      description:
        language === "it"
          ? "Dati puliti e strutturati abilitano implementazioni AI più efficaci"
          : "Clean and structured data enables more effective AI implementations",
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: language === "it" ? "Livello Integrazione" : "Integration Level",
      description:
        language === "it"
          ? "Integrazione più profonda dei sistemi fornisce maggiori guadagni"
          : "Deeper system integration provides greater gains",
      icon: <Layers className="h-6 w-6" />,
    },
  ]

  const renderChatbot = () => {
    switch (activeDemo) {
      case "booking":
        return <BookingChatbot />
      case "ecommerce":
        return <EcommerceChatbot />
      case "business":
        return <BusinessChatbot />
      case "support":
        return <SupportChatbot />
      case "faq":
        return <FAQChatbot />
      default:
        return <BookingChatbot />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ServiceNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-medium">
                <Bot className="h-4 w-4 mr-2" />
                {language === "it" ? "Tecnologia AI Avanzata" : "Advanced AI Technology"}
              </Badge>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
                <span className="text-gray-900">{language === "it" ? "Chatbot" : "Chatbot"}</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {language === "it" ? "Intelligenti" : "Intelligent"}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                {language === "it"
                  ? "Trasforma il tuo customer service con assistenti virtuali AI che comprendono, apprendono e risolvono. Disponibili 24/7 per un'esperienza cliente eccezionale."
                  : "Transform your customer service with AI virtual assistants that understand, learn and solve. Available 24/7 for an exceptional customer experience."}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button
                  size="lg"
                  onClick={() => router.push("/appointments")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <Calendar className="h-6 w-6 mr-3" />
                  {language === "it" ? "Prenota Appuntamento" : "Book Appointment"}
                </Button>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl text-blue-600">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section - PRIMA COSA VISIBILE */}
      <section className="py-20 px-6 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                <Calculator className="h-4 w-4 mr-2" />
                {language === "it" ? "Calcola il Tuo ROI" : "Calculate Your ROI"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === "it" ? "Calcolatore ROI Chatbot" : "Chatbot ROI Calculator"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === "it"
                  ? "Scopri quanto puoi risparmiare e guadagnare implementando un chatbot AI nella tua attività"
                  : "Discover how much you can save and earn by implementing an AI chatbot in your business"}
              </p>
            </motion.div>
          </div>

          <ROICalculator />
        </div>
      </section>

      {/* Come Funziona Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200">
                <Lightbulb className="h-4 w-4 mr-2" />
                {language === "it" ? "Processo Semplice" : "Simple Process"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === "it" ? "Come Funziona" : "How It Works"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === "it"
                  ? "Il nostro processo strutturato garantisce il successo del tuo progetto chatbot"
                  : "Our structured process ensures the success of your chatbot project"}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm group overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-12 translate-x-12" />

                    <div className="relative z-10 mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                        {index + 1}
                      </div>
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.color} text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cosa Ottieni Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                <Award className="h-4 w-4 mr-2" />
                {language === "it" ? "Benefici Concreti" : "Concrete Benefits"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === "it" ? "Cosa Ottieni" : "What You Get"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === "it"
                  ? "I vantaggi tangibili che otterrai implementando un chatbot AI nella tua attività"
                  : "The tangible benefits you'll get by implementing an AI chatbot in your business"}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {whatYouGetBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm group">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gray-100 ${benefit.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${benefit.bgGradient} overflow-hidden group`}
                >
                  <CardContent className="p-8 text-center relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16" />

                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${benefit.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {benefit.icon}
                    </div>

                    <div className="text-4xl font-bold text-gray-900 mb-3">{benefit.metric}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.label}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                <BarChart3 className="h-4 w-4 mr-2" />
                {language === "it" ? "Insights Avanzati" : "Advanced Insights"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === "it" ? "Fattori Chiave per il Successo" : "Key Success Factors"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === "it"
                  ? "Elementi che influenzano significativamente il ROI e il successo del tuo chatbot"
                  : "Elements that significantly influence the ROI and success of your chatbot"}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {insightFactors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl text-purple-600 flex-shrink-0">
                  {factor.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">{factor.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{factor.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                <Sparkles className="h-4 w-4 mr-2" />
                {language === "it" ? "Demo Interattiva" : "Interactive Demo"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === "it" ? "Prova i Nostri Chatbot" : "Try Our Chatbots"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === "it"
                  ? "Interagisci con diversi tipi di assistenti virtuali e scopri come possono trasformare la tua attività"
                  : "Interact with different types of virtual assistants and discover how they can transform your business"}
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chatbot Selector */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-xl">
                    <Bot className="h-6 w-6 mr-3 text-blue-600" />
                    {language === "it" ? "Scegli il Chatbot" : "Choose Chatbot"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {chatbotTypes.map((type) => (
                    <motion.div key={type.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant={activeDemo === type.id ? "default" : "outline"}
                        className={`w-full h-auto p-6 transition-all duration-300 ${
                          activeDemo === type.id
                            ? `bg-gradient-to-r ${type.color} text-white shadow-lg border-0`
                            : "bg-white/80 hover:bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveDemo(type.id)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${activeDemo === type.id ? "bg-white/20" : "bg-gray-100"}`}>
                              {type.icon}
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-base">{type.name}</div>
                              <div className="text-sm opacity-80">{type.description}</div>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className={`text-xs font-medium ${
                              activeDemo === type.id
                                ? "bg-white/20 text-white border-white/20"
                                : "bg-blue-100 text-blue-700 border-blue-200"
                            }`}
                          >
                            {type.badge}
                          </Badge>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Features Card */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    {language === "it" ? "Caratteristiche Principali" : "Key Features"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {chatbotTypes
                    .find((type) => type.id === activeDemo)
                    ?.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>

            {/* Chatbot Demo */}
            <div className="lg:col-span-2">
              <motion.div
                key={activeDemo}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border-0">
                  {renderChatbot()}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200">
                <Zap className="h-4 w-4 mr-2" />
                {language === "it" ? "Tecnologie Avanzate" : "Advanced Technologies"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === "it" ? "Funzionalità All'Avanguardia" : "Cutting-Edge Features"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === "it"
                  ? "I nostri chatbot sono dotati delle tecnologie AI più avanzate per offrire un'esperienza utente superiore"
                  : "Our chatbots are equipped with the most advanced AI technologies to deliver a superior user experience"}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm group overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-12 translate-x-12" />

                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                <Globe className="h-4 w-4 mr-2" />
                {language === "it" ? "Integrazioni Universali" : "Universal Integrations"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === "it" ? "Ovunque Tu Sia" : "Wherever You Are"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === "it"
                  ? "I nostri chatbot si integrano perfettamente con tutte le piattaforme e i sistemi che utilizzi"
                  : "Our chatbots integrate seamlessly with all the platforms and systems you use"}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrationPlatforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm group">
                  <div
                    className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${platform.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {platform.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{platform.title}</h3>
                  <p className="text-gray-600">{platform.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-6 py-2">
              <Rocket className="h-4 w-4 mr-2" />
              {language === "it" ? "Inizia Oggi" : "Start Today"}
            </Badge>

            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              {language === "it" ? "Pronto a Rivoluzionare il Tuo Business?" : "Ready to Revolutionize Your Business?"}
            </h2>

            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              {language === "it"
                ? "Inizia oggi stesso con un chatbot AI personalizzato. Consulenza gratuita, demo live e supporto completo inclusi."
                : "Start today with a personalized AI chatbot. Free consultation, live demo and complete support included."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/appointments")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-2xl"
              >
                <Calendar className="h-6 w-6 mr-3" />
                {language === "it" ? "Prenota Appuntamento" : "Book Appointment"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
