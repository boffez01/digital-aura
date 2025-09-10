"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ServiceNavbar from "../../components/service-navbar"
import { useLanguage } from "../../contexts/language-context"
import {
  Brain,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Target,
  Users,
  BarChart3,
  MessageSquare,
  Zap,
  Clock,
  Settings,
} from "lucide-react"

export default function AIMarketingPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("automation")

  const texts = {
    en: {
      title: "AI Marketing",
      subtitle: "Future Marketing Intelligence",
      description:
        "Revolutionize your marketing strategy with artificial intelligence. Predictive analytics, advanced personalization, and intelligent automation for extraordinary results and guaranteed ROI.",
      heroTitle: "AI Marketing",
      heroSubtitle: "of the Future",
      ctaPrimary: "Start Now",
      ctaSecondary: "See Live Demo",
      benefitsTitle: "Marketing Results",
      benefitsSubtitle: "Measurable impact on your marketing performance",
      strategiesTitle: "AI Marketing Strategies",
      strategiesSubtitle: "Advanced solutions for every marketing channel",
      toolsTitle: "AI Marketing Tools",
      toolsSubtitle: "Cutting-edge technology for marketing success",
      processTitle: "Our Marketing Process",
      processSubtitle: "From strategy to execution in data-driven phases",
      caseStudiesTitle: "Success Stories",
      caseStudiesSubtitle: "Real results achieved for our clients",
      ctaFinalTitle: "Ready to Transform Your Marketing?",
      ctaFinalSubtitle:
        "Start today with AI-powered marketing that delivers results. Free strategy session and custom analysis included.",
      ctaFinalPrimary: "Get Free Strategy Session",
      ctaFinalSecondary: "Request Custom Analysis",
    },
    it: {
      title: "Marketing AI",
      subtitle: "Intelligenza Marketing del Futuro",
      description:
        "Rivoluziona la tua strategia di marketing con l'intelligenza artificiale. Analisi predittive, personalizzazione avanzata e automazione intelligente per risultati straordinari e ROI garantito.",
      heroTitle: "Marketing AI",
      heroSubtitle: "del Futuro",
      ctaPrimary: "Inizia Ora",
      ctaSecondary: "Vedi Demo Live",
      benefitsTitle: "Risultati Marketing",
      benefitsSubtitle: "Impatto misurabile sulle tue performance di marketing",
      strategiesTitle: "Strategie Marketing AI",
      strategiesSubtitle: "Soluzioni avanzate per ogni canale di marketing",
      toolsTitle: "Strumenti Marketing AI",
      toolsSubtitle: "Tecnologia all'avanguardia per il successo del marketing",
      processTitle: "Il Nostro Processo Marketing",
      processSubtitle: "Dalla strategia all'esecuzione in fasi data-driven",
      caseStudiesTitle: "Storie di Successo",
      caseStudiesSubtitle: "Risultati reali ottenuti per i nostre clienti",
      ctaFinalTitle: "Pronto a Trasformare il Tuo Marketing?",
      ctaFinalSubtitle:
        "Inizia oggi con marketing potenziato dall'AI che genera risultati. Sessione strategica gratuita e analisi personalizzata incluse.",
      ctaFinalPrimary: "Sessione Strategica Gratuita",
      ctaFinalSecondary: "Richiedi Analisi Personalizzata",
    },
  }

  const t = texts[language]

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

  const marketingStrategies = [
    {
      id: "automation",
      title: language === "en" ? "Marketing Automation" : "Automazione Marketing",
      icon: <Zap className="h-6 w-6" />,
      description:
        language === "en"
          ? "Intelligent automation of marketing campaigns and customer journeys"
          : "Automazione intelligente di campagne marketing e customer journey",
      features:
        language === "en"
          ? [
              "Automated email sequences",
              "Lead nurturing workflows",
              "Behavioral triggers",
              "Multi-channel orchestration",
            ]
          : [
              "Sequenze email automatiche",
              "Workflow nurturing lead",
              "Trigger comportamentali",
              "Orchestrazione multi-canale",
            ],
    },
    {
      id: "personalization",
      title: language === "en" ? "AI Personalization" : "Personalizzazione AI",
      icon: <Target className="h-6 w-6" />,
      description:
        language === "en"
          ? "Hyper-personalized content and offers based on user behavior"
          : "Contenuti e offerte iper-personalizzati basati sul comportamento utente",
      features:
        language === "en"
          ? [
              "Dynamic content optimization",
              "Personalized product recommendations",
              "Behavioral segmentation",
              "Real-time personalization",
            ]
          : [
              "Ottimizzazione contenuti dinamici",
              "Raccomandazioni prodotti personalizzate",
              "Segmentazione comportamentale",
              "Personalizzazione in tempo reale",
            ],
    },
    {
      id: "analytics",
      title: language === "en" ? "Predictive Analytics" : "Analytics Predittive",
      icon: <BarChart3 className="h-6 w-6" />,
      description:
        language === "en"
          ? "Advanced analytics to predict trends and optimize campaigns"
          : "Analytics avanzate per predire trend e ottimizzare campagne",
      features:
        language === "en"
          ? [
              "Customer lifetime value prediction",
              "Churn prediction models",
              "Campaign performance forecasting",
              "Market trend analysis",
            ]
          : [
              "Predizione customer lifetime value",
              "Modelli predizione churn",
              "Forecasting performance campagne",
              "Analisi trend mercato",
            ],
    },
    {
      id: "advancedAnalytics",
      title: language === "en" ? "Advanced Analytics" : "Analisi Avanzate",
      icon: <BarChart3 className="h-6 w-6" />,
      description:
        language === "en"
          ? "Deep insights and predictive analytics for data-driven decision-making"
          : "Profondi insights e analytics predittive per decisioni basate sui dati",
      features:
        language === "en"
          ? ["Behavioral analytics", "Customer segmentation", "Predictive modeling", "Real-time data analysis"]
          : [
              "Analisi comportamentale",
              "Segmentazione clienti",
              "Modellazione predittiva",
              "Analisi dati in tempo reale",
            ],
    },
    {
      id: "campaignOptimization",
      title: language === "en" ? "Campaign Optimization" : "Ottimizzazione Campagne",
      icon: <TrendingUp className="h-6 w-6" />,
      description:
        language === "en"
          ? "Real-time optimization of marketing campaigns using machine learning"
          : "Ottimizzazione in tempo reale delle campagne marketing usando machine learning",
      features:
        language === "en"
          ? ["Bid optimization", "Budget allocation", "Creative testing", "Performance monitoring"]
          : ["Ottimizzazione bid", "Allocazione budget", "Test creatività", "Monitoraggio performance"],
    },
    {
      id: "marketIntelligence",
      title: language === "en" ? "Market Intelligence" : "Intelligenza del Mercato",
      icon: <Brain className="h-6 w-6" />,
      description:
        language === "en"
          ? "AI-driven insights into market trends and customer behavior"
          : "Insights basati su AI sui trend del mercato e sul comportamento dei clienti",
      features:
        language === "en"
          ? [
              "Competitor analysis",
              "Market trend forecasting",
              "Customer sentiment analysis",
              "Personalized recommendations",
            ]
          : [
              "Analisi concorrenti",
              "Forecasting trend mercato",
              "Analisi sentimenti clienti",
              "Raccomandazioni personalizzate",
            ],
    },
  ]

  const aiTools = [
    {
      name: language === "en" ? "Content Generator" : "Generatore Contenuti",
      icon: <MessageSquare className="h-8 w-8" />,
      description:
        language === "en"
          ? "AI-powered content creation for all marketing channels"
          : "Creazione contenuti potenziata dall'AI per tutti i canali marketing",
      capabilities:
        language === "en"
          ? ["Blog posts", "Social media", "Email copy", "Ad creatives"]
          : ["Post blog", "Social media", "Copy email", "Creatività ads"],
    },
    {
      name: language === "en" ? "Audience Analyzer" : "Analizzatore Audience",
      icon: <Users className="h-8 w-8" />,
      description:
        language === "en"
          ? "Deep audience insights and segmentation with AI"
          : "Insights profondi audience e segmentazione con AI",
      capabilities:
        language === "en"
          ? ["Behavioral analysis", "Demographic insights", "Interest mapping", "Lookalike audiences"]
          : ["Analisi comportamentale", "Insights demografici", "Mappatura interessi", "Audience lookalike"],
    },
    {
      name: language === "en" ? "Campaign Optimizer" : "Ottimizzatore Campagne",
      icon: <TrendingUp className="h-8 w-8" />,
      description:
        language === "en"
          ? "Real-time campaign optimization with machine learning"
          : "Ottimizzazione campagne in tempo reale con machine learning",
      capabilities:
        language === "en"
          ? ["Bid optimization", "Budget allocation", "Creative testing", "Performance monitoring"]
          : ["Ottimizzazione bid", "Allocazione budget", "Test creatività", "Monitoraggio performance"],
    },
    {
      name: language === "en" ? "Conversion Predictor" : "Predittore Conversioni",
      icon: <Target className="h-8 w-8" />,
      description:
        language === "en"
          ? "Predict and optimize conversion rates with AI models"
          : "Predici e ottimizza tassi conversione con modelli AI",
      capabilities:
        language === "en"
          ? ["Lead scoring", "Conversion probability", "Optimal timing", "Channel attribution"]
          : ["Lead scoring", "Probabilità conversione", "Timing ottimale", "Attribuzione canali"],
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: language === "en" ? "Data Analysis & Audit" : "Analisi Dati e Audit",
      description:
        language === "en"
          ? "We analyze your current marketing data and identify optimization opportunities"
          : "Analizziamo i tuoi dati marketing attuali e identifichiamo opportunità di ottimizzazione",
      icon: <BarChart3 className="h-8 w-8" />,
      duration: language === "en" ? "1 week" : "1 settimana",
    },
    {
      step: "02",
      title: language === "en" ? "AI Strategy Development" : "Sviluppo Strategia AI",
      description:
        language === "en"
          ? "We create a customized AI marketing strategy based on your goals"
          : "Creiamo una strategia marketing AI personalizzata basata sui tuoi obiettivi",
      icon: <Brain className="h-8 w-8" />,
      duration: language === "en" ? "1 week" : "1 settimana",
    },
    {
      step: "03",
      title: language === "en" ? "Implementation & Setup" : "Implementazione e Setup",
      description:
        language === "en"
          ? "We implement AI tools and set up automated marketing workflows"
          : "Implementiamo strumenti AI e configuriamo workflow marketing automatizzati",
      icon: <Settings className="h-8 w-8" />,
      duration: language === "en" ? "2 weeks" : "2 settimane",
    },
    {
      step: "04",
      title: language === "en" ? "Optimization & Scaling" : "Ottimizzazione e Scaling",
      description:
        language === "en"
          ? "We continuously optimize campaigns and scale successful strategies"
          : "Ottimizziamo continuamente le campagne e scaliamo le strategie di successo",
      icon: <TrendingUp className="h-8 w-8" />,
      duration: language === "en" ? "Ongoing" : "Continuo",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <ServiceNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors px-4 py-2">
                🚀 {language === "en" ? "Marketing Innovation" : "Innovazione nel Marketing"}
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                  {t.heroTitle}
                </span>
                <br />
                <span className="text-gray-900">{t.heroSubtitle}</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">{t.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg"
                >
                  {t.ctaPrimary} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-300 hover:border-orange-500 px-8 py-4 text-lg bg-transparent"
                >
                  {t.ctaSecondary}
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{language === "en" ? "Setup in 24h" : "Setup in 24h"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{language === "en" ? "ROI guaranteed +150%" : "ROI garantito +150%"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{language === "en" ? "24/7 Support" : "Supporto 24/7"}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                  <div className="text-center relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="w-4 h-16 bg-orange-500 rounded-sm animate-pulse"></div>
                        <div
                          className="w-4 h-20 bg-orange-600 rounded-sm animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-4 h-24 bg-orange-700 rounded-sm animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">AI Marketing Platform</h3>
                    <p className="text-gray-600 text-lg">
                      {language === "en"
                        ? "Artificial intelligence for marketing"
                        : "Intelligenza artificiale per il marketing"}
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-bold text-2xl text-gray-900">+180%</p>
                      <p className="text-sm text-gray-600">
                        {language === "en" ? "Average performance" : "Performance media"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 bg-orange-500 text-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Brain className="h-6 w-6" />
                    <span className="font-semibold">AI Powered</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full border-orange-100 hover:border-orange-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{benefit.metric}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.label}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Strategies */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.strategiesTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.strategiesSubtitle}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {marketingStrategies.map((strategy) => (
                <TabsTrigger key={strategy.id} value={strategy.id} className="flex items-center space-x-2">
                  {strategy.icon}
                  <span className="hidden sm:inline">{strategy.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {marketingStrategies.map((strategy) => (
              <TabsContent key={strategy.id} value={strategy.id}>
                <Card className="border-orange-100">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-3 bg-orange-100 rounded-lg text-orange-600">{strategy.icon}</div>
                          <h3 className="text-2xl font-bold text-gray-900">{strategy.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{strategy.description}</p>
                        <div className="space-y-3">
                          {strategy.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-lg">
                        <div className="text-center">
                          <div className="text-4xl mb-4">🎯</div>
                          <h4 className="font-semibold mb-2">
                            {language === "en" ? "Smart Marketing" : "Marketing Intelligente"}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {language === "en"
                              ? "Our AI algorithms continuously learn and optimize your marketing campaigns"
                              : "I nostri algoritmi AI apprendono continuamente e ottimizzano le tue campagne marketing"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.toolsTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.toolsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aiTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-orange-100 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-orange-100 rounded-lg text-orange-600">{tool.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.name}</h3>
                        <p className="text-gray-600 mb-4">{tool.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {tool.capabilities.map((capability, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs text-orange-600 border-orange-200">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.processTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.processSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-orange-100 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                        {step.step}
                      </div>
                      <div className="text-orange-600 mb-3">{step.icon}</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                    <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                      <Clock className="h-3 w-3 mr-1" />
                      {step.duration}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.caseStudiesTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.caseStudiesSubtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-orange-100 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{study.client}</CardTitle>
                      <Badge className="bg-orange-100 text-orange-700">{study.industry}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{language === "en" ? "Challenge" : "Sfida"}</h4>
                      <p className="text-sm text-gray-600">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{language === "en" ? "Solution" : "Soluzione"}</h4>
                      <p className="text-sm text-gray-600">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{language === "en" ? "Results" : "Risultati"}</h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {Object.entries(study.results).map(([key, value]) => (
                          <div key={key} className="bg-white p-2 rounded border">
                            <div className="text-lg font-bold text-orange-600">{value}</div>
                            <div className="text-xs text-gray-500 capitalize">{key}</div>
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.ctaFinalTitle}</h2>
            <p className="text-xl text-gray-600 mb-8">{t.ctaFinalSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                <Brain className="h-5 w-5 mr-2" />
                {t.ctaFinalPrimary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-200 text-orange-700 hover:bg-orange-50 px-8 py-3 bg-transparent"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                {t.ctaFinalSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
