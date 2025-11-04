"use client"

import { useState } from "react"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageSquare, Zap, Globe, Shield, TrendingUp, Users } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import BookingChatbot from "../components/demo-chatbots/booking-chatbot"
import EcommerceChatbot from "../components/demo-chatbots/ecommerce-chatbot"
import SupportChatbot from "../components/demo-chatbots/support-chatbot"
import FaqChatbot from "../components/demo-chatbots/faq-chatbot"
import BusinessChatbot from "../components/demo-chatbots/business-chatbot"

export default function ChatbotPage() {
  const { language } = useLanguage()
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const translations = {
    it: {
      hero: {
        title: "Chatbot AI Intelligenti",
        subtitle: "Automatizza il supporto clienti e migliora l'engagement con chatbot AI personalizzati",
        cta: "Richiedi Demo",
      },
      features: {
        title: "Perché Scegliere i Nostri Chatbot",
        items: [
          {
            icon: Zap,
            title: "Risposte Istantanee",
            description: "Supporto clienti 24/7 con risposte immediate e accurate",
          },
          {
            icon: Globe,
            title: "Multilingua",
            description: "Supporto per oltre 50 lingue per raggiungere clienti globali",
          },
          {
            icon: Shield,
            title: "Sicuro e Affidabile",
            description: "Protezione dati e conformità GDPR garantite",
          },
          {
            icon: TrendingUp,
            title: "Migliora le Conversioni",
            description: "Aumenta le vendite con assistenza personalizzata",
          },
          {
            icon: Users,
            title: "Integrazione CRM",
            description: "Sincronizzazione automatica con i tuoi sistemi",
          },
          {
            icon: MessageSquare,
            title: "Conversazioni Naturali",
            description: "AI avanzata per dialoghi fluidi e contestuali",
          },
        ],
      },
      demos: {
        title: "Prova i Nostri Chatbot Demo",
        subtitle: "Interagisci con esempi reali dei nostri chatbot AI",
        types: [
          { id: "booking", name: "Prenotazioni", description: "Gestione appuntamenti automatica" },
          { id: "ecommerce", name: "E-commerce", description: "Assistente vendite intelligente" },
          { id: "support", name: "Supporto", description: "Help desk automatizzato" },
          { id: "faq", name: "FAQ", description: "Risposte immediate alle domande" },
          { id: "business", name: "Business", description: "Consulente aziendale virtuale" },
        ],
        tryIt: "Prova Demo",
        back: "Indietro",
      },
    },
    en: {
      hero: {
        title: "Intelligent AI Chatbots",
        subtitle: "Automate customer support and improve engagement with custom AI chatbots",
        cta: "Request Demo",
      },
      features: {
        title: "Why Choose Our Chatbots",
        items: [
          {
            icon: Zap,
            title: "Instant Responses",
            description: "24/7 customer support with immediate and accurate answers",
          },
          {
            icon: Globe,
            title: "Multilingual",
            description: "Support for over 50 languages to reach global customers",
          },
          {
            icon: Shield,
            title: "Secure and Reliable",
            description: "Data protection and GDPR compliance guaranteed",
          },
          {
            icon: TrendingUp,
            title: "Boost Conversions",
            description: "Increase sales with personalized assistance",
          },
          {
            icon: Users,
            title: "CRM Integration",
            description: "Automatic synchronization with your systems",
          },
          {
            icon: MessageSquare,
            title: "Natural Conversations",
            description: "Advanced AI for fluid and contextual dialogues",
          },
        ],
      },
      demos: {
        title: "Try Our Demo Chatbots",
        subtitle: "Interact with real examples of our AI chatbots",
        types: [
          { id: "booking", name: "Bookings", description: "Automatic appointment management" },
          { id: "ecommerce", name: "E-commerce", description: "Intelligent sales assistant" },
          { id: "support", name: "Support", description: "Automated help desk" },
          { id: "faq", name: "FAQ", description: "Instant answers to questions" },
          { id: "business", name: "Business", description: "Virtual business consultant" },
        ],
        tryIt: "Try Demo",
        back: "Back",
      },
    },
  }

  const t = translations[language]

  const renderDemo = () => {
    switch (activeDemo) {
      case "booking":
        return <BookingChatbot onBack={() => setActiveDemo(null)} />
      case "ecommerce":
        return <EcommerceChatbot onBack={() => setActiveDemo(null)} />
      case "support":
        return <SupportChatbot onBack={() => setActiveDemo(null)} />
      case "faq":
        return <FaqChatbot onBack={() => setActiveDemo(null)} />
      case "business":
        return <BusinessChatbot onBack={() => setActiveDemo(null)} />
      default:
        return null
    }
  }

  if (activeDemo) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="pt-20">{renderDemo()}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            {t.hero.title}
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">{t.hero.subtitle}</p>
          <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-6 text-lg">
            {t.hero.cta}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{t.features.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, index) => (
              <Card key={index} className="bg-slate-800 p-6">
                <feature.icon className="h-12 w-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demos Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">{t.demos.title}</h2>
          <p className="text-xl text-slate-300 text-center mb-12">{t.demos.subtitle}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.demos.types.map((demo) => (
              <Card key={demo.id} className="bg-slate-800 p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{demo.name}</h3>
                <p className="text-slate-300 mb-4">{demo.description}</p>
                <Button
                  onClick={() => setActiveDemo(demo.id)}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  {t.demos.tryIt}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
