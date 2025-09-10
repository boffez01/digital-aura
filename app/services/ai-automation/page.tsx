"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ServiceNavbar from "../../components/service-navbar"
import { useLanguage } from "../../contexts/language-context"
import {
  Bot,
  ArrowRight,
  CheckCircle,
  Play,
  Workflow,
  Database,
  Mail,
  Zap,
  Clock,
  Users,
  Settings,
  BarChart3,
  Calendar,
  Target,
} from "lucide-react"

export default function AIAutomationPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("workflow")

  const texts = {
    en: {
      title: "AI Automation",
      subtitle: "Intelligent Process Automation",
      description:
        "Transform your business with AI automation solutions that eliminate manual processes, reduce errors, and increase operational efficiency by up to 75%. Our AI-driven automation tools can handle a wide range of tasks, from routine data entry to complex decision-making processes, ensuring that your business runs smoothly and efficiently.",
      heroTitle: "Intelligent",
      heroSubtitle: "Automation",
      ctaPrimary: "Discover Solutions",
      ctaSecondary: "Free Analysis",
      benefitsTitle: "Measurable Results",
      benefitsSubtitle: "Real impact on your business operations",
      automationTitle: "Automation Types",
      automationSubtitle: "Customized solutions for every area of your business",
      processTitle: "Our Process",
      processSubtitle: "From analysis to implementation in 4 simple steps",
      industriesTitle: "Industries We Serve",
      industriesSubtitle: "Specialized solutions for different sectors",
      implementationTitle: "Implementation Process",
      implementationSubtitle: "How we bring automation to life",
      successMetricsTitle: "Success Metrics",
      successMetricsSubtitle: "Key indicators of our automation success",
      ctaFinalTitle: "Ready to Automate Your Business?",
      ctaFinalSubtitle:
        "Start today with a personalized automation solution. Free consultation and custom demo included.",
      ctaFinalPrimary: "Book Free Consultation",
      ctaFinalSecondary: "Request Demo",
    },
    it: {
      title: "Automazione AI",
      subtitle: "Automazione Intelligente dei Processi",
      description:
        "Trasforma la tua azienda con soluzioni di automazione AI che eliminano i processi manuali, riducono gli errori e aumentano l'efficienza operativa fino al 75%. I nostre strumenti di automazione guidati da AI possono gestire un ampio spettro di compiti, dalla semplice inserimento di dati routine a processi decisionali complessi, garantendo che la tua azienda funzioni in modo fluido e efficiente.",
      heroTitle: "Automazione",
      heroSubtitle: "Intelligente",
      ctaPrimary: "Scopri le Soluzioni",
      ctaSecondary: "Analisi Gratuita",
      benefitsTitle: "Risultati Misurabili",
      benefitsSubtitle: "Impatto reale sulle tue operazioni aziendali",
      automationTitle: "Tipi di Automazione",
      automationSubtitle: "Soluzioni personalizzate per ogni area della tua azienda",
      processTitle: "Il Nostro Processo",
      processSubtitle: "Dall'analisi all'implementazione in 4 semplici passaggi",
      industriesTitle: "Settori che Serviamo",
      industriesSubtitle: "Soluzioni specializzate per diversi settori",
      implementationTitle: "Processo di Implementazione",
      implementationSubtitle: "Come portiamo l'automazione alla vita",
      successMetricsTitle: "Metriche di Successo",
      successMetricsSubtitle: "Indicatori chiave del nostro successo nell'automazione",
      ctaFinalTitle: "Pronto ad Automatizzare la Tua Azienda?",
      ctaFinalSubtitle:
        "Inizia oggi con una soluzione di automazione personalizzata. Consulenza gratuita e demo personalizzata incluse.",
      ctaFinalPrimary: "Prenota Consulenza Gratuita",
      ctaFinalSecondary: "Richiedi Demo",
    },
  }

  const t = texts[language]

  const benefits = [
    {
      metric: "75%",
      label: t.benefitsTitle,
      description: t.benefitsSubtitle,
    },
    {
      metric: "90%",
      label: language === "en" ? "Increased Accuracy" : "Precisione Aumentata",
      description:
        language === "en"
          ? "Elimination of human errors in automated processes"
          : "Eliminazione degli errori umani nei processi automatizzati",
    },
    {
      metric: "50%",
      label: language === "en" ? "Cost Savings" : "Risparmio Costi",
      description:
        language === "en"
          ? "Significant reduction in operational costs"
          : "Riduzione significativa dei costi operativi aziendali",
    },
    {
      metric: "24/7",
      label: language === "en" ? "Continuous Operation" : "Operatività Continua",
      description:
        language === "en" ? "Systems that work without interruptions" : "Sistemi che lavorano senza interruzioni",
    },
  ]

  const automationTypes = [
    {
      id: "workflow",
      title: t.automationTitle,
      icon: <Workflow className="h-6 w-6" />,
      description: t.automationSubtitle,
      features: [
        "Automatic document management",
        "Digital approvals",
        "Intelligent notifications",
        "Integration with existing systems",
      ],
    },
    {
      id: "data",
      title: language === "en" ? "Data Processing" : "Elaborazione Dati",
      icon: <Database className="h-6 w-6" />,
      description:
        language === "en" ? "Automatic data processing and analysis" : "Elaborazione e analisi automatica dei dati",
      features: ["Automated ETL", "Auto-generated reports", "Predictive analysis", "Real-time dashboards"],
    },
    {
      id: "communication",
      title: language === "en" ? "Communication Automation" : "Automazione Comunicazioni",
      icon: <Mail className="h-6 w-6" />,
      description:
        language === "en" ? "Automation of business communications" : "Automazione delle comunicazioni aziendali",
      features: [
        "Automatic email marketing",
        "Customer follow-up",
        "Personalized notifications",
        "Automatic lead management",
      ],
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: t.processTitle,
      description: t.processSubtitle,
      icon: <BarChart3 className="h-8 w-8" />,
      duration: language === "en" ? "1-2 weeks" : "1-2 settimane",
    },
    {
      step: "02",
      title: language === "en" ? "Strategy & Design" : "Strategia e Progettazione",
      description:
        language === "en"
          ? "We design a customized automation strategy for your specific needs"
          : "Progettiamo una strategia di automazione personalizzata per le tue esigenze specifiche",
      icon: <Settings className="h-8 w-8" />,
      duration: language === "en" ? "1 week" : "1 settimana",
    },
    {
      step: "03",
      title: language === "en" ? "Development & Testing" : "Sviluppo e Test",
      description:
        language === "en"
          ? "We develop and thoroughly test the automation solutions"
          : "Sviluppiamo e testiamo accuratamente le soluzioni di automazione",
      icon: <Zap className="h-8 w-8" />,
      duration: language === "en" ? "2-4 weeks" : "2-4 settimane",
    },
    {
      step: "04",
      title: language === "en" ? "Deployment & Training" : "Implementazione e Formazione",
      description:
        language === "en"
          ? "We deploy the solution and train your team for optimal use"
          : "Implementiamo la soluzione e formiamo il tuo team per un uso ottimale",
      icon: <Users className="h-8 w-8" />,
      duration: language === "en" ? "1 week" : "1 settimana",
    },
  ]

  const industries = [
    {
      name: language === "en" ? "Healthcare" : "Sanità",
      icon: "🏥",
      description:
        language === "en"
          ? "Patient management, appointment scheduling, medical records"
          : "Gestione pazienti, programmazione appuntamenti, cartelle cliniche",
      automations: ["Patient registration", "Appointment reminders", "Report generation"],
    },
    {
      name: language === "en" ? "Finance" : "Finanza",
      icon: "💰",
      description:
        language === "en"
          ? "Transaction processing, compliance reporting, risk analysis"
          : "Elaborazione transazioni, reporting compliance, analisi rischi",
      automations: ["Invoice processing", "Compliance checks", "Risk assessment"],
    },
    {
      name: language === "en" ? "Manufacturing" : "Manifatturiero",
      icon: "🏭",
      description:
        language === "en"
          ? "Production planning, quality control, inventory management"
          : "Pianificazione produzione, controllo qualità, gestione inventario",
      automations: ["Production scheduling", "Quality monitoring", "Inventory tracking"],
    },
    {
      name: language === "en" ? "Retail" : "Retail",
      icon: "🛍️",
      description:
        language === "en"
          ? "Customer service, inventory management, sales analysis"
          : "Servizio clienti, gestione inventario, analisi vendite",
      automations: ["Order processing", "Customer support", "Sales reporting"],
    },
  ]

  const implementationSteps = [
    {
      step: "01",
      title: language === "en" ? "Initial Consultation" : "Consulta Iniziale",
      description:
        language === "en"
          ? "We start by understanding your business needs and goals"
          : "Iniziamo capendo le esigenze e gli obiettivi della tua azienda",
      icon: <Users className="h-8 w-8" />,
      duration: language === "en" ? "1 hour" : "1 ora",
    },
    {
      step: "02",
      title: language === "en" ? "Process Mapping" : "Mappatura Processi",
      description:
        language === "en"
          ? "We map out your current processes to identify areas for automation"
          : "Mappiamo i tuoi processi attuali per identificare aree da automatizzare",
      icon: <Workflow className="h-8 w-8" />,
      duration: language === "en" ? "2-3 days" : "2-3 giorni",
    },
    {
      step: "03",
      title: language === "en" ? "Solution Design" : "Progettazione Soluzione",
      description:
        language === "en"
          ? "We design a tailored automation solution based on our findings"
          : "Progettiamo una soluzione di automazione personalizzata basata sui nostre risultati",
      icon: <Settings className="h-8 w-8" />,
      duration: language === "en" ? "1 week" : "1 settimana",
    },
    {
      step: "04",
      title: language === "en" ? "Development & Testing" : "Sviluppo e Test",
      description:
        language === "en"
          ? "We develop and thoroughly test the automation solutions"
          : "Sviluppiamo e testiamo accuratamente le soluzioni di automazione",
      icon: <Zap className="h-8 w-8" />,
      duration: language === "en" ? "2-4 weeks" : "2-4 settimane",
    },
    {
      step: "05",
      title: language === "en" ? "Deployment & Training" : "Implementazione e Formazione",
      description:
        language === "en"
          ? "We deploy the solution and train your team for optimal use"
          : "Implementiamo la soluzione e formiamo il tuo team per un uso ottimale",
      icon: <Users className="h-8 w-8" />,
      duration: language === "en" ? "1 week" : "1 settimana",
    },
  ]

  const successMetrics = [
    {
      metric: "95%",
      label: language === "en" ? "Process Efficiency" : "Efficienza Processi",
      description:
        language === "en" ? "Reduction in process time and errors" : "Riduzione del tempo di processo e degli errori",
    },
    {
      metric: "80%",
      label: language === "en" ? "Customer Satisfaction" : "Soddisfazione Clienti",
      description:
        language === "en"
          ? "Improvement in customer service and response times"
          : "Miglioramento del servizio clienti e dei tempi di risposta",
    },
    {
      metric: "70%",
      label: language === "en" ? "Cost Reduction" : "Riduzione Costi",
      description:
        language === "en"
          ? "Decrease in operational costs through automation"
          : "Riduzione dei costi operativi attraverso l'automazione",
    },
    {
      metric: "60%",
      label: language === "en" ? "Revenue Growth" : "Crescita Ricavi",
      description:
        language === "en"
          ? "Increase in sales and revenue due to optimized processes"
          : "Aumento delle vendite e dei ricavi grazie ai processi ottimizzati",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <ServiceNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
                <Bot className="h-4 w-4 mr-2" />
                {t.title}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-[1.1]">{t.heroTitle}</h1>
              <div className="mb-10">
                <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 leading-[1.3] inline-block pb-4">
                  {t.heroSubtitle}
                </span>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">{t.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  <Play className="h-5 w-5 mr-2" />
                  {t.ctaPrimary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 bg-transparent"
                >
                  {t.ctaSecondary}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full border-purple-100 hover:border-purple-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{benefit.metric}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.label}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Types */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.automationTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.automationSubtitle}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {automationTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id} className="flex items-center space-x-2">
                  {type.icon}
                  <span className="hidden sm:inline">{type.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {automationTypes.map((type) => (
              <TabsContent key={type.id} value={type.id}>
                <Card className="border-purple-100">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-3 bg-purple-100 rounded-lg text-purple-600">{type.icon}</div>
                          <h3 className="text-2xl font-bold text-gray-900">{type.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{type.description}</p>
                        <div className="space-y-3">
                          {type.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg">
                        <div className="text-center">
                          <div className="text-4xl mb-4">🤖</div>
                          <h4 className="font-semibold mb-2">
                            {language === "en" ? "Intelligent Automation" : "Automazione Intelligente"}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {language === "en"
                              ? "Our AI systems learn from your processes and continuously optimize them"
                              : "I nostri sistemi AI apprendono dai tuoi processi e li ottimizzano continuamente"}
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

      {/* Process Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
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
                <Card className="h-full border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                        {step.step}
                      </div>
                      <div className="text-purple-600 mb-3">{step.icon}</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                    <Badge variant="outline" className="text-xs text-purple-600 border-purple-200">
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

      {/* Industries Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.industriesTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.industriesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{industry.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.name}</h3>
                        <p className="text-gray-600 mb-4">{industry.description}</p>
                        <div className="space-y-2">
                          {industry.automations.map((automation, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                              <span className="text-sm text-gray-700">{automation}</span>
                            </div>
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

      {/* Implementation Process Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.implementationTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.implementationSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {implementationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                        {step.step}
                      </div>
                      <div className="text-purple-600 mb-3">{step.icon}</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                    <Badge variant="outline" className="text-xs text-purple-600 border-purple-200">
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

      {/* Success Metrics Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.successMetricsTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.successMetricsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="text-4xl font-bold text-purple-600">{metric.metric}</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{metric.label}</h3>
                    <p className="text-sm text-gray-600 mb-4">{metric.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.ctaFinalTitle}</h2>
            <p className="text-xl text-gray-600 mb-8">{t.ctaFinalSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                <Calendar className="h-5 w-5 mr-2" />
                {t.ctaFinalPrimary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 bg-transparent"
              >
                <Target className="h-5 w-5 mr-2" />
                {t.ctaFinalSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
