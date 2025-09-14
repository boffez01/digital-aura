"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  BarChart3,
  Target,
  Brain,
  Play,
  Sparkles,
  MessageSquare,
  Search,
  Megaphone,
  Star,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../../contexts/language-context"
import Navbar from "../../components/navbar"
import ServiceNavbar from "../../components/service-navbar"
import ChatbotWidget from "../../components/chatbot-widget"

export default function AIMarketingPage() {
  const { language } = useLanguage()

  const benefits = [
    {
      metric: "500+",
      label: language === "en" ? "Optimized Campaigns" : "Campagne Ottimizzate",
      description:
        language === "en"
          ? "AI-powered campaigns with superior performance"
          : "Campagne potenziate dall'AI con performance superiori",
    },
    {
      metric: "€2.5M+",
      label: language === "en" ? "Managed Budget" : "Budget Gestito",
      description:
        language === "en"
          ? "Total advertising budget optimized with AI"
          : "Budget pubblicitario totale ottimizzato con AI",
    },
    {
      metric: "180%",
      label: language === "en" ? "Average ROI" : "ROI Medio",
      description:
        language === "en" ? "Return on investment with AI marketing" : "Ritorno sull'investimento con marketing AI",
    },
    {
      metric: "24h",
      label: language === "en" ? "Complete Setup" : "Setup Completo",
      description: language === "en" ? "From strategy to campaign launch" : "Dalla strategia al lancio campagne",
    },
  ]

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: language === "it" ? "Targeting Intelligente" : "Intelligent Targeting",
      description:
        language === "it"
          ? "Raggiungi il pubblico giusto al momento giusto con precisione millimetrica"
          : "Reach the right audience at the right time with millimeter precision",
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: language === "it" ? "Ottimizzazione AI" : "AI Optimization",
      description:
        language === "it"
          ? "Algoritmi che ottimizzano automaticamente le campagne per massimizzare il ROI"
          : "Algorithms that automatically optimize campaigns to maximize ROI",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: language === "it" ? "Analytics Predittivi" : "Predictive Analytics",
      description:
        language === "it"
          ? "Prevedi tendenze e comportamenti per strategie marketing vincenti"
          : "Predict trends and behaviors for winning marketing strategies",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: language === "it" ? "Content Automation" : "Content Automation",
      description:
        language === "it"
          ? "Genera contenuti personalizzati e coinvolgenti su larga scala"
          : "Generate personalized and engaging content at scale",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: language === "it" ? "SEO Intelligente" : "Intelligent SEO",
      description:
        language === "it"
          ? "Ottimizzazione automatica per motori di ricerca con AI avanzata"
          : "Automatic search engine optimization with advanced AI",
      color: "text-cyan-400",
      bgColor: "bg-cyan-900/20",
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: language === "it" ? "Social Media AI" : "Social Media AI",
      description:
        language === "it"
          ? "Gestione intelligente dei social media con engagement automatizzato"
          : "Intelligent social media management with automated engagement",
      color: "text-pink-400",
      bgColor: "bg-pink-900/20",
    },
  ]

  const caseStudies = [
    {
      client: language === "en" ? "E-commerce Fashion" : "E-commerce Moda",
      industry: language === "en" ? "Fashion Retail" : "Retail Moda",
      challenge:
        language === "en"
          ? "Low conversion rates and high customer acquisition costs"
          : "Bassi tassi conversione e alti costi acquisizione clienti",
      solution:
        language === "en"
          ? "AI-powered personalization and predictive analytics"
          : "Personalizzazione AI e analytics predittive",
      results: {
        conversion: "+340%",
        roas: "8.5x",
        cac: "-65%",
      },
    },
    {
      client: language === "en" ? "SaaS Platform" : "Piattaforma SaaS",
      industry: language === "en" ? "Software" : "Software",
      challenge:
        language === "en"
          ? "Difficulty in lead qualification and nurturing"
          : "Difficoltà nella qualificazione e nurturing lead",
      solution:
        language === "en"
          ? "AI lead scoring and automated nurturing workflows"
          : "AI lead scoring e workflow nurturing automatizzati",
      results: {
        leads: "+280%",
        qualified: "+450%",
        sales: "+190%",
      },
    },
    {
      client: language === "en" ? "Healthcare Clinic" : "Clinica Sanitaria",
      industry: language === "en" ? "Healthcare" : "Sanità",
      challenge:
        language === "en"
          ? "Patient acquisition and retention optimization"
          : "Ottimizzazione acquisizione e retention pazienti",
      solution:
        language === "en"
          ? "Predictive patient journey mapping and personalized campaigns"
          : "Mappatura predittiva patient journey e campagne personalizzate",
      results: {
        patients: "+220%",
        retention: "+85%",
        satisfaction: "95%",
      },
    },
  ]

  // MANTENIAMO LE TESTIMONIANZE PER AI MARKETING
  const testimonials = [
    {
      name: "Marco Rossi",
      role: language === "it" ? "CEO, TechStart" : "CEO, TechStart",
      content:
        language === "it"
          ? "Digital Aura ha trasformato completamente il nostro marketing. ROI aumentato del 300% in soli 4 mesi."
          : "Digital Aura completely transformed our marketing. ROI increased by 300% in just 4 months.",
      rating: 5,
      company: "TechStart",
    },
    {
      name: "Laura Bianchi",
      role: language === "it" ? "Marketing Director, Fashion Co" : "Marketing Director, Fashion Co",
      content:
        language === "it"
          ? "Le strategie AI hanno rivoluzionato le nostre campagne. Risultati incredibili e automazione perfetta."
          : "AI strategies revolutionized our campaigns. Incredible results and perfect automation.",
      rating: 5,
      company: "Fashion Co",
    },
    {
      name: "Giuseppe Verde",
      role: language === "it" ? "Founder, E-commerce Plus" : "Founder, E-commerce Plus",
      content:
        language === "it"
          ? "Crescita follower del 500% e ricavi triplicati. Il marketing AI funziona davvero."
          : "500% follower growth and tripled revenue. AI marketing really works.",
      rating: 5,
      company: "E-commerce Plus",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <ServiceNavbar currentService="ai-marketing" />

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                {language === "it" ? "AI Marketing" : "AI Marketing"}
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {language === "it" ? (
                  <>
                    Marketing{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                      Intelligente
                    </span>
                  </>
                ) : (
                  <>
                    Intelligent{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                      Marketing
                    </span>
                  </>
                )}
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {language === "it"
                  ? "Potenzia le tue strategie di marketing con intelligenza artificiale avanzata per risultati straordinari e ROI massimizzato."
                  : "Supercharge your marketing strategies with advanced artificial intelligence for extraordinary results and maximized ROI."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/appointments">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                  >
                    <Sparkles className="h-6 w-6 mr-3" />
                    {language === "it" ? "Inizia Ora" : "Start Now"}
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg font-semibold bg-slate-800/50"
                >
                  <Play className="h-6 w-6 mr-3" />
                  {language === "it" ? "Vedi Risultati" : "View Results"}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                {[
                  { value: "5x", label: language === "it" ? "ROI Medio" : "Average ROI" },
                  { value: "500%", label: language === "it" ? "Crescita Follower" : "Follower Growth" },
                  { value: "300%", label: language === "it" ? "Aumento Ricavi" : "Revenue Increase" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-800/80 text-cyan-400 border-cyan-500/30">
              <Brain className="h-4 w-4 mr-2" />
              {language === "it" ? "Strategie Avanzate" : "Advanced Strategies"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Marketing del Futuro" : "Marketing of the Future"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "Sfrutta il potere dell'intelligenza artificiale per campagne marketing che superano ogni aspettativa"
                : "Harness the power of artificial intelligence for marketing campaigns that exceed all expectations"}
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
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "it" ? "Risultati Straordinari" : "Extraordinary Results"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "I numeri parlano chiaro: il marketing AI genera risultati concreti e misurabili"
                : "The numbers speak for themselves: AI marketing generates concrete and measurable results"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full border-slate-700/50 bg-slate-800/80 backdrop-blur-sm hover:border-slate-600 transition-colors">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-orange-400 mb-2">{benefit.metric}</div>
                    <h3 className="font-semibold text-white mb-2">{benefit.label}</h3>
                    <p className="text-sm text-slate-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "it" ? "Storie di Successo" : "Success Stories"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "Risultati reali ottenuti per i nostri clienti attraverso strategie marketing AI"
                : "Real results achieved for our clients through AI marketing strategies"}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-slate-700/50 bg-slate-800/80 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-white">{study.client}</CardTitle>
                      <Badge className="bg-slate-700/50 text-orange-400">{study.industry}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white mb-1">{language === "en" ? "Challenge" : "Sfida"}</h4>
                      <p className="text-sm text-slate-300">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">{language === "en" ? "Solution" : "Soluzione"}</h4>
                      <p className="text-sm text-slate-300">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">{language === "en" ? "Results" : "Risultati"}</h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {Object.entries(study.results).map(([key, value]) => (
                          <div key={key} className="bg-slate-700/50 p-2 rounded border border-slate-600/50">
                            <div className="text-lg font-bold text-orange-400">{value}</div>
                            <div className="text-xs text-slate-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIANZE - MANTENUTE PER AI MARKETING */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-800/80 text-yellow-400 border-yellow-500/30">
              <Star className="h-4 w-4 mr-2" />
              {language === "it" ? "Testimonianze" : "Testimonials"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Cosa Dicono i Nostri Clienti" : "What Our Clients Say"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "Storie di successo reali da aziende che hanno trasformato il loro marketing con le nostre soluzioni AI"
                : "Real success stories from companies that have transformed their marketing with our AI solutions"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full bg-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                      <div className="text-sm text-orange-400">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">
              {language === "it" ? "Pronto a Trasformare il Tuo Marketing?" : "Ready to Transform Your Marketing?"}
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              {language === "it"
                ? "Inizia oggi con marketing potenziato dall'AI che genera risultati. Sessione strategica gratuita e analisi personalizzata incluse."
                : "Start today with AI-powered marketing that delivers results. Free strategy session and custom analysis included."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                  <Brain className="h-5 w-5 mr-2" />
                  {language === "it" ? "Sessione Strategica Gratuita" : "Free Strategy Session"}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 bg-slate-800/50 backdrop-blur-sm"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                {language === "it" ? "Richiedi Analisi Personalizzata" : "Request Custom Analysis"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  )
}
