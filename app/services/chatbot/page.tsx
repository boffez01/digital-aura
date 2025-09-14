"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  MessageSquare,
  Zap,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  Sparkles,
  Brain,
  Target,
  BarChart3,
  Calendar,
  ShoppingCart,
  Headphones,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../../contexts/language-context"
import Navbar from "../../components/navbar"
import ServiceNavbar from "../../components/service-navbar"
import ChatbotWidget from "../../components/chatbot-widget"
import BookingChatbot from "../../components/demo-chatbots/booking-chatbot"
import EcommerceChatbot from "../../components/demo-chatbots/ecommerce-chatbot"
import BusinessChatbot from "../../components/demo-chatbots/business-chatbot"
import SupportChatbot from "../../components/demo-chatbots/support-chatbot"
import FAQChatbot from "../../components/demo-chatbots/faq-chatbot"

export default function ChatbotPage() {
  const { language } = useLanguage()
  const [activeDemo, setActiveDemo] = useState("booking")

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: language === "it" ? "Conversazioni Naturali" : "Natural Conversations",
      description:
        language === "it"
          ? "Comprensione avanzata del linguaggio naturale per conversazioni fluide e contestuali"
          : "Advanced natural language understanding for fluid and contextual conversations",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: language === "it" ? "Disponibilità 24/7" : "24/7 Availability",
      description:
        language === "it"
          ? "Assistenza continua per i tuoi clienti, senza interruzioni e in qualsiasi momento"
          : "Continuous assistance for your customers, without interruptions and at any time",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: language === "it" ? "Gestione Multi-utente" : "Multi-user Management",
      description:
        language === "it"
          ? "Gestione simultanea di migliaia di conversazioni con personalizzazione per ogni utente"
          : "Simultaneous management of thousands of conversations with personalization for each user",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: language === "it" ? "Apprendimento Continuo" : "Continuous Learning",
      description:
        language === "it"
          ? "Il chatbot migliora costantemente attraverso machine learning e feedback degli utenti"
          : "The chatbot constantly improves through machine learning and user feedback",
      color: "text-cyan-400",
      bgColor: "bg-cyan-900/20",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: language === "it" ? "Lead Generation" : "Lead Generation",
      description:
        language === "it"
          ? "Qualifica automaticamente i lead e raccoglie informazioni preziose sui potenziali clienti"
          : "Automatically qualifies leads and collects valuable information about potential customers",
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: language === "it" ? "Analytics Avanzati" : "Advanced Analytics",
      description:
        language === "it"
          ? "Dashboard completa con metriche dettagliate su performance e soddisfazione clienti"
          : "Complete dashboard with detailed metrics on performance and customer satisfaction",
      color: "text-pink-400",
      bgColor: "bg-pink-900/20",
    },
  ]

  const benefits = [
    {
      title: language === "it" ? "Riduzione Costi Operativi" : "Operational Cost Reduction",
      description:
        language === "it"
          ? "Fino al 70% di riduzione nei costi del customer service"
          : "Up to 70% reduction in customer service costs",
      percentage: "70%",
      color: "text-green-400",
    },
    {
      title: language === "it" ? "Aumento Soddisfazione Cliente" : "Increased Customer Satisfaction",
      description:
        language === "it"
          ? "95% di soddisfazione media dei clienti che interagiscono con il chatbot"
          : "95% average satisfaction of customers who interact with the chatbot",
      percentage: "95%",
      color: "text-blue-400",
    },
    {
      title: language === "it" ? "Tempo di Risposta" : "Response Time",
      description:
        language === "it"
          ? "Risposte istantanee invece di minuti o ore di attesa"
          : "Instant responses instead of minutes or hours of waiting",
      percentage: "<1s",
      color: "text-purple-400",
    },
    {
      title: language === "it" ? "Conversioni Lead" : "Lead Conversions",
      description:
        language === "it"
          ? "Aumento del 40% nelle conversioni grazie alla qualificazione automatica"
          : "40% increase in conversions thanks to automatic qualification",
      percentage: "+40%",
      color: "text-cyan-400",
    },
  ]

  const chatbotTypes = [
    {
      id: "booking",
      name: "Booking Assistant",
      icon: <Calendar className="h-6 w-6" />,
      description: language === "it" ? "Gestione prenotazioni e appuntamenti" : "Booking and appointment management",
      color: "from-green-500 to-emerald-600",
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
      features: [
        language === "it" ? "Ricerca intelligente" : "Smart search",
        language === "it" ? "Risposte istantanee" : "Instant answers",
        language === "it" ? "Apprendimento continuo" : "Continuous learning",
      ],
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <ServiceNavbar currentService="chatbot" />

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                <Bot className="h-4 w-4 mr-2" />
                {language === "it" ? "Chatbot Intelligenti" : "Intelligent Chatbots"}
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {language === "it" ? (
                  <>
                    Assistenti Virtuali{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      Intelligenti
                    </span>
                  </>
                ) : (
                  <>
                    Intelligent{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      Virtual
                    </span>{" "}
                    Assistants
                  </>
                )}
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {language === "it"
                  ? "Trasforma il tuo customer service con chatbot AI avanzati che comprendono, apprendono e migliorano continuamente l'esperienza dei tuoi clienti."
                  : "Transform your customer service with advanced AI chatbots that understand, learn and continuously improve your customers' experience."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/appointments">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                  >
                    <Sparkles className="h-6 w-6 mr-3" />
                    {language === "it" ? "Richiedi Demo Gratuita" : "Request Free Demo"}
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg font-semibold bg-slate-800/50"
                >
                  <Play className="h-6 w-6 mr-3" />
                  {language === "it" ? "Guarda Video" : "Watch Video"}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                {[
                  { value: "95%", label: language === "it" ? "Soddisfazione" : "Satisfaction" },
                  { value: "24/7", label: language === "it" ? "Disponibilità" : "Availability" },
                  { value: "<1s", label: language === "it" ? "Risposta" : "Response" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-slate-800/80 backdrop-blur-sm text-purple-400 border-purple-500/30">
                <Sparkles className="h-4 w-4 mr-2" />
                {language === "it" ? "Demo Interattiva" : "Interactive Demo"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {language === "it" ? "Prova i Nostri Chatbot" : "Try Our Chatbots"}
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                {language === "it"
                  ? "Interagisci con diversi tipi di assistenti virtuali e scopri come possono trasformare la tua attività"
                  : "Interact with different types of virtual assistants and discover how they can transform your business"}
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chatbot Selector */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Bot className="h-6 w-6 mr-3 text-blue-400" />
                    {language === "it" ? "Scegli il Chatbot" : "Choose Chatbot"}
                  </h3>
                  <div className="space-y-3">
                    {chatbotTypes.map((type) => (
                      <motion.div key={type.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant={activeDemo === type.id ? "default" : "outline"}
                          className={`w-full h-auto p-4 transition-all duration-300 ${
                            activeDemo === type.id
                              ? `bg-gradient-to-r ${type.color} text-white shadow-lg border-0`
                              : "bg-slate-700/50 hover:bg-slate-600/50 border-slate-600 text-slate-300"
                          }`}
                          onClick={() => setActiveDemo(type.id)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  activeDemo === type.id ? "bg-white/20" : "bg-slate-600/50"
                                }`}
                              >
                                {type.icon}
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-sm">{type.name}</div>
                                <div className="text-xs opacity-80">{type.description}</div>
                              </div>
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features Card */}
              <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    {language === "it" ? "Caratteristiche Principali" : "Key Features"}
                  </h4>
                  <div className="space-y-3">
                    {chatbotTypes
                      .find((type) => type.id === activeDemo)
                      ?.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                      ))}
                  </div>
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
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border-slate-700/50">
                  {renderChatbot()}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-800/80 text-cyan-400 border-cyan-500/30">
              <Zap className="h-4 w-4 mr-2" />
              {language === "it" ? "Funzionalità Avanzate" : "Advanced Features"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Tecnologia All'Avanguardia" : "Cutting-Edge Technology"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "I nostri chatbot utilizzano le più avanzate tecnologie di intelligenza artificiale per offrire esperienze conversazionali naturali e coinvolgenti"
                : "Our chatbots use the most advanced artificial intelligence technologies to deliver natural and engaging conversational experiences"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div
                      className={`inline-flex p-4 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className={feature.color}>{feature.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-800/80 text-green-400 border-green-500/30">
              <TrendingUp className="h-4 w-4 mr-2" />
              {language === "it" ? "Risultati Misurabili" : "Measurable Results"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Benefici Concreti per il Tuo Business" : "Concrete Benefits for Your Business"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "I nostri chatbot non sono solo tecnologia avanzata, ma strumenti che generano risultati tangibili e misurabili per la tua azienda"
                : "Our chatbots are not just advanced technology, but tools that generate tangible and measurable results for your business"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <Card className="h-full bg-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-8">
                    <div
                      className={`text-4xl font-bold ${benefit.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {benefit.percentage}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it"
                ? "Pronto a Rivoluzionare il Tuo Customer Service?"
                : "Ready to Revolutionize Your Customer Service?"}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {language === "it"
                ? "Inizia oggi stesso con una demo gratuita e scopri come i nostri chatbot possono trasformare la tua azienda"
                : "Start today with a free demo and discover how our chatbots can transform your business"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold shadow-lg"
                >
                  <Sparkles className="h-6 w-6 mr-3" />
                  {language === "it" ? "Richiedi Demo Gratuita" : "Request Free Demo"}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
              >
                <MessageSquare className="h-6 w-6 mr-3" />
                {language === "it" ? "Parla con un Esperto" : "Talk to an Expert"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  )
}
