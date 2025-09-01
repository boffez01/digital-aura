"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  MessageCircle,
  Building2,
  ArrowLeft,
  Zap,
  CheckCircle,
  Users,
  TrendingUp,
  Clock,
  Shield,
} from "lucide-react"
import Link from "next/link"
import EcommerceChatbot from "../../components/demo-chatbots/ecommerce-chatbot"
import BusinessChatbot from "../../components/demo-chatbots/business-chatbot"
import SupportChatbot from "../../components/demo-chatbots/support-chatbot"
import { useLanguage } from "../../contexts/language-context"

export default function ChatbotDemoPage() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)
  const { language } = useLanguage()

  const demos = [
    {
      id: "ecommerce",
      title: language === "it" ? "E-commerce Assistant" : "E-commerce Assistant",
      description:
        language === "it"
          ? "Chatbot intelligente per vendite online con catalogo prodotti, gestione carrello e raccomandazioni personalizzate"
          : "Intelligent chatbot for online sales with product catalog, cart management and personalized recommendations",
      icon: <ShoppingCart className="w-8 h-8" />,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      features: [
        language === "it" ? "Catalogo prodotti integrato" : "Integrated product catalog",
        language === "it" ? "Gestione carrello in tempo reale" : "Real-time cart management",
        language === "it" ? "Raccomandazioni AI" : "AI recommendations",
        language === "it" ? "Sistema di pagamento" : "Payment system",
        language === "it" ? "Tracking ordini" : "Order tracking",
      ],
      stats: language === "it" ? "Aumenta le vendite del 40%" : "Increases sales by 40%",
      component: EcommerceChatbot,
    },
    {
      id: "business",
      title: language === "it" ? "Business Services Bot" : "Business Services Bot",
      description:
        language === "it"
          ? "Assistente per aziende di servizi con prenotazioni, preventivi e gestione clienti integrata"
          : "Assistant for service companies with bookings, quotes and integrated customer management",
      icon: <Building2 className="w-8 h-8" />,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
      features: [
        language === "it" ? "Prenotazione servizi" : "Service booking",
        language === "it" ? "Preventivi automatici" : "Automatic quotes",
        language === "it" ? "Gestione appuntamenti" : "Appointment management",
        language === "it" ? "CRM integrato" : "Integrated CRM",
        language === "it" ? "Follow-up automatico" : "Automatic follow-up",
      ],
      stats: language === "it" ? "70% riduzione tempo gestione" : "70% management time reduction",
      component: BusinessChatbot,
    },
    {
      id: "support",
      title: language === "it" ? "Customer Support Bot" : "Customer Support Bot",
      description:
        language === "it"
          ? "Assistente per supporto clienti con knowledge base intelligente e escalation automatica agli operatori"
          : "Customer support assistant with intelligent knowledge base and automatic escalation to operators",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      features: [
        language === "it" ? "Knowledge base intelligente" : "Intelligent knowledge base",
        language === "it" ? "Risoluzione problemi guidata" : "Guided problem solving",
        language === "it" ? "Escalation automatica" : "Automatic escalation",
        language === "it" ? "Sistema di rating" : "Rating system",
        language === "it" ? "Analytics avanzate" : "Advanced analytics",
      ],
      stats: language === "it" ? "95% problemi risolti automaticamente" : "95% problems solved automatically",
      component: SupportChatbot,
    },
  ]

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: language === "it" ? "24/7 Disponibilità" : "24/7 Availability",
      description:
        language === "it"
          ? "I tuoi clienti ricevono assistenza immediata in qualsiasi momento"
          : "Your customers receive immediate assistance at any time",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: language === "it" ? "Aumento Conversioni" : "Increased Conversions",
      description:
        language === "it"
          ? "Guida i clienti attraverso il processo di acquisto aumentando le vendite"
          : "Guide customers through the purchase process increasing sales",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === "it" ? "Riduzione Costi" : "Cost Reduction",
      description:
        language === "it"
          ? "Automatizza il supporto clienti riducendo i costi operativi del 60%"
          : "Automate customer support reducing operational costs by 60%",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: language === "it" ? "Scalabilità" : "Scalability",
      description:
        language === "it"
          ? "Gestisce migliaia di conversazioni simultanee senza perdere qualità"
          : "Handles thousands of simultaneous conversations without losing quality",
    },
  ]

  if (selectedDemo) {
    const demo = demos.find((d) => d.id === selectedDemo)
    const DemoComponent = demo?.component

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => setSelectedDemo(null)} className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>{language === "it" ? "Torna alle Demo" : "Back to Demos"}</span>
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-xl font-semibold text-gray-900">{demo?.title}</h1>
              </div>
              <Link href="/appointments">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  {language === "it" ? "Richiedi Demo Personalizzata" : "Request Custom Demo"}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Demo Info */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg ${demo?.color} mb-4`}>
                    <div className={demo?.iconColor}>{demo?.icon}</div>
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{demo?.title}</CardTitle>
                  <CardDescription className="text-gray-600">{demo?.description}</CardDescription>
                  <Badge className={`${demo?.iconColor} bg-white border-0 font-semibold mt-2`}>{demo?.stats}</Badge>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === "it" ? "Funzionalità Principali:" : "Key Features:"}
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {demo?.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700 text-sm">
                        <CheckCircle className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${demo?.iconColor}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full text-white ${demo?.buttonColor}`}>
                    {language === "it" ? "Implementa Questa Soluzione" : "Implement This Solution"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Chatbot Demo */}
            <div className="lg:col-span-2">{DemoComponent && <DemoComponent />}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">Digital Aura</span>
            </Link>
            <Link href="/appointments">
              <Button className="bg-black hover:bg-gray-800 text-white">
                {language === "it" ? "Richiedi Demo Personalizzata" : "Request Custom Demo"}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block p-6 rounded-full bg-gray-600 mb-8">
              <MessageCircle className="w-16 h-16 text-white" />
            </div>

            <Badge className="mb-6 bg-purple-100 text-purple-600 border-purple-200 text-lg px-6 py-3">
              ⭐ {language === "it" ? "Demo Chatbot Intelligenti" : "Smart Chatbot Demos"}
            </Badge>

            <h1 className="text-6xl md:text-7xl font-bold text-black mb-6">
              {language === "it" ? "Smart Chatbots" : "Smart Chatbots"}
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              {language === "it"
                ? "Scopri come i nostri chatbot intelligenti possono trasformare il tuo business. Prova 3 diverse demo interattive e vedi la differenza che l'AI può fare."
                : "Discover how our intelligent chatbots can transform your business. Try 3 different interactive demos and see the difference AI can make."}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
              {[
                {
                  icon: <Users className="w-8 h-8" />,
                  value: "95%",
                  label: language === "it" ? "Soddisfazione Clienti" : "Customer Satisfaction",
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  value: "40%",
                  label: language === "it" ? "Aumento Vendite" : "Sales Increase",
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  value: "24/7",
                  label: language === "it" ? "Disponibilità" : "Availability",
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  value: "60%",
                  label: language === "it" ? "Riduzione Costi" : "Cost Reduction",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="text-purple-600 flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Selection */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              {language === "it" ? "Scegli la Tua Demo" : "Choose Your Demo"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "it"
                ? "Ogni chatbot è personalizzato per settori specifici. Clicca su una demo per vedere come funziona."
                : "Each chatbot is customized for specific sectors. Click on a demo to see how it works."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {demos.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedDemo(demo.id)}
                className="cursor-pointer"
              >
                <Card className={`${demo.color} border-2 hover:shadow-xl transition-all duration-300 h-full`}>
                  <CardHeader className="text-center">
                    <div className={`inline-flex p-4 rounded-lg bg-white shadow-sm mb-4 mx-auto ${demo.iconColor}`}>
                      {demo.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-3">{demo.title}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed mb-4">{demo.description}</CardDescription>
                    <Badge className={`${demo.iconColor} bg-white/80 border-0 font-semibold`}>{demo.stats}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                        {language === "it" ? "Funzionalità:" : "Features:"}
                      </h4>
                      <ul className="space-y-2">
                        {demo.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-gray-700 text-sm">
                            <CheckCircle className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${demo.iconColor}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className={`w-full text-white font-semibold ${demo.buttonColor}`}>
                      {language === "it" ? "Prova Demo Interattiva →" : "Try Interactive Demo →"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              {language === "it" ? "Perché Scegliere i Nostri Chatbot" : "Why Choose Our Chatbots"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "it"
                ? "I nostri chatbot intelligenti offrono vantaggi concreti e misurabili per il tuo business."
                : "Our intelligent chatbots offer concrete and measurable benefits for your business."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
              >
                <div className="inline-flex p-3 rounded-lg bg-purple-100 text-purple-600 mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-black mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "it" ? "Pronto a Trasformare il Tuo Business?" : "Ready to Transform Your Business?"}
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {language === "it"
              ? "Richiedi una demo personalizzata e scopri come i nostri chatbot possono aumentare le tue vendite e migliorare l'esperienza dei tuoi clienti."
              : "Request a personalized demo and discover how our chatbots can increase your sales and improve your customers' experience."}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/appointments">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4">
                {language === "it" ? "Richiedi Demo Gratuita" : "Request Free Demo"}
              </Button>
            </Link>
            <Link href="/#contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 bg-transparent"
              >
                {language === "it" ? "Contattaci Ora" : "Contact Us Now"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
