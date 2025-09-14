"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Cpu,
  BarChart3,
  Play,
  Sparkles,
  Brain,
  Shield,
  Cog,
  Database,
  Workflow,
  CheckCircle,
  Clock,
  Settings,
  Users,
  Target,
  Lightbulb,
  Factory,
  Building,
  ShoppingBag,
  Stethoscope,
  GraduationCap,
  Banknote,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../../contexts/language-context"
import Navbar from "../../components/navbar"
import ServiceNavbar from "../../components/service-navbar"
import ChatbotWidget from "../../components/chatbot-widget"
import { useState } from "react"

export default function AIAutomationPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("workflow")

  const features = [
    {
      icon: <Workflow className="h-8 w-8" />,
      title: language === "it" ? "Automazione Processi" : "Process Automation",
      description:
        language === "it"
          ? "Automatizza flussi di lavoro complessi con intelligenza artificiale avanzata"
          : "Automate complex workflows with advanced artificial intelligence",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: language === "it" ? "Machine Learning" : "Machine Learning",
      description:
        language === "it"
          ? "Algoritmi che apprendono e migliorano automaticamente le performance"
          : "Algorithms that learn and automatically improve performance",
      color: "text-cyan-400",
      bgColor: "bg-cyan-900/20",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: language === "it" ? "Analisi Predittiva" : "Predictive Analytics",
      description:
        language === "it"
          ? "Prevedi tendenze e comportamenti per decisioni strategiche informate"
          : "Predict trends and behaviors for informed strategic decisions",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: language === "it" ? "Integrazione Sistemi" : "System Integration",
      description:
        language === "it"
          ? "Connetti tutti i tuoi sistemi esistenti in un ecosistema unificato"
          : "Connect all your existing systems into a unified ecosystem",
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: language === "it" ? "Sicurezza Avanzata" : "Advanced Security",
      description:
        language === "it"
          ? "Protezione enterprise-grade con crittografia e monitoraggio continuo"
          : "Enterprise-grade protection with encryption and continuous monitoring",
      color: "text-red-400",
      bgColor: "bg-red-900/20",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: language === "it" ? "Dashboard Analytics" : "Analytics Dashboard",
      description:
        language === "it"
          ? "Visualizza metriche in tempo reale e KPI personalizzati"
          : "View real-time metrics and custom KPIs",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
  ]

  // CONTENUTO ESTESO PER AI AUTOMATION
  const automationTypes = [
    {
      id: "workflow",
      title: language === "it" ? "Automazione Workflow" : "Workflow Automation",
      icon: <Workflow className="h-6 w-6" />,
      description:
        language === "it"
          ? "Automatizza processi aziendali complessi con intelligenza artificiale"
          : "Automate complex business processes with artificial intelligence",
      features:
        language === "it"
          ? [
              "Gestione documentale automatica",
              "Approvazioni digitali intelligenti",
              "Notifiche e alert personalizzati",
              "Integrazione con sistemi esistenti",
              "Monitoraggio performance in tempo reale",
              "Escalation automatica dei processi",
            ]
          : [
              "Automatic document management",
              "Intelligent digital approvals",
              "Personalized notifications and alerts",
              "Integration with existing systems",
              "Real-time performance monitoring",
              "Automatic process escalation",
            ],
    },
    {
      id: "data",
      title: language === "it" ? "Elaborazione Dati AI" : "AI Data Processing",
      icon: <Database className="h-6 w-6" />,
      description:
        language === "it"
          ? "Analisi e elaborazione automatica di grandi volumi di dati"
          : "Automatic analysis and processing of large data volumes",
      features:
        language === "it"
          ? [
              "ETL automatizzato con AI",
              "Report generati automaticamente",
              "Analisi predittiva avanzata",
              "Dashboard in tempo reale",
              "Pulizia e validazione dati",
              "Integrazione multi-sorgente",
            ]
          : [
              "AI-powered automated ETL",
              "Auto-generated reports",
              "Advanced predictive analysis",
              "Real-time dashboards",
              "Data cleaning and validation",
              "Multi-source integration",
            ],
    },
    {
      id: "communication",
      title: language === "it" ? "Automazione Comunicazioni" : "Communication Automation",
      icon: <Settings className="h-6 w-6" />,
      description:
        language === "it"
          ? "Gestione automatica delle comunicazioni aziendali"
          : "Automatic management of business communications",
      features:
        language === "it"
          ? [
              "Email marketing automatizzato",
              "Follow-up clienti intelligente",
              "Notifiche personalizzate",
              "Gestione lead automatica",
              "Segmentazione audience AI",
              "A/B testing automatico",
            ]
          : [
              "Automated email marketing",
              "Intelligent customer follow-up",
              "Personalized notifications",
              "Automatic lead management",
              "AI audience segmentation",
              "Automatic A/B testing",
            ],
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: language === "it" ? "Analisi e Audit" : "Analysis & Audit",
      description:
        language === "it"
          ? "Analizziamo i tuoi processi attuali e identifichiamo opportunità di automazione"
          : "We analyze your current processes and identify automation opportunities",
      icon: <BarChart3 className="h-8 w-8" />,
      duration: language === "it" ? "1-2 settimane" : "1-2 weeks",
    },
    {
      step: "02",
      title: language === "it" ? "Strategia e Design" : "Strategy & Design",
      description:
        language === "it"
          ? "Progettiamo una strategia di automazione personalizzata per le tue esigenze"
          : "We design a customized automation strategy for your needs",
      icon: <Lightbulb className="h-8 w-8" />,
      duration: language === "it" ? "1 settimana" : "1 week",
    },
    {
      step: "03",
      title: language === "it" ? "Sviluppo e Test" : "Development & Testing",
      description:
        language === "it"
          ? "Sviluppiamo e testiamo accuratamente le soluzioni di automazione"
          : "We develop and thoroughly test the automation solutions",
      icon: <Cog className="h-8 w-8" />,
      duration: language === "it" ? "2-4 settimane" : "2-4 weeks",
    },
    {
      step: "04",
      title: language === "it" ? "Implementazione e Formazione" : "Implementation & Training",
      description:
        language === "it"
          ? "Implementiamo la soluzione e formiamo il tuo team per un uso ottimale"
          : "We implement the solution and train your team for optimal use",
      icon: <Users className="h-8 w-8" />,
      duration: language === "it" ? "1 settimana" : "1 week",
    },
  ]

  const industries = [
    {
      name: language === "it" ? "Manifatturiero" : "Manufacturing",
      icon: <Factory className="h-12 w-12" />,
      description:
        language === "it"
          ? "Automazione produzione, controllo qualità, gestione inventario"
          : "Production automation, quality control, inventory management",
      automations: [
        language === "it" ? "Pianificazione produzione" : "Production planning",
        language === "it" ? "Controllo qualità automatico" : "Automatic quality control",
        language === "it" ? "Gestione supply chain" : "Supply chain management",
      ],
      benefits: "45% riduzione costi, 200% aumento produttività",
    },
    {
      name: language === "it" ? "Servizi Finanziari" : "Financial Services",
      icon: <Banknote className="h-12 w-12" />,
      description:
        language === "it"
          ? "Elaborazione transazioni, compliance, analisi rischi"
          : "Transaction processing, compliance, risk analysis",
      automations: [
        language === "it" ? "Elaborazione fatture" : "Invoice processing",
        language === "it" ? "Controlli compliance" : "Compliance checks",
        language === "it" ? "Valutazione rischi" : "Risk assessment",
      ],
      benefits: "60% riduzione errori, 80% velocità processi",
    },
    {
      name: language === "it" ? "Sanità" : "Healthcare",
      icon: <Stethoscope className="h-12 w-12" />,
      description:
        language === "it"
          ? "Gestione pazienti, programmazione, cartelle cliniche"
          : "Patient management, scheduling, medical records",
      automations: [
        language === "it" ? "Registrazione pazienti" : "Patient registration",
        language === "it" ? "Promemoria appuntamenti" : "Appointment reminders",
        language === "it" ? "Generazione report" : "Report generation",
      ],
      benefits: "70% efficienza gestionale, 90% soddisfazione",
    },
    {
      name: language === "it" ? "E-commerce" : "E-commerce",
      icon: <ShoppingBag className="h-12 w-12" />,
      description:
        language === "it"
          ? "Gestione ordini, customer service, marketing"
          : "Order management, customer service, marketing",
      automations: [
        language === "it" ? "Elaborazione ordini" : "Order processing",
        language === "it" ? "Supporto clienti" : "Customer support",
        language === "it" ? "Campagne marketing" : "Marketing campaigns",
      ],
      benefits: "300% aumento conversioni, 50% riduzione costi",
    },
    {
      name: language === "it" ? "Educazione" : "Education",
      icon: <GraduationCap className="h-12 w-12" />,
      description:
        language === "it"
          ? "Gestione studenti, valutazioni, amministrazione"
          : "Student management, assessments, administration",
      automations: [
        language === "it" ? "Iscrizioni automatiche" : "Automatic enrollments",
        language === "it" ? "Valutazioni AI" : "AI assessments",
        language === "it" ? "Comunicazioni genitori" : "Parent communications",
      ],
      benefits: "85% efficienza amministrativa, 95% accuratezza",
    },
    {
      name: language === "it" ? "Immobiliare" : "Real Estate",
      icon: <Building className="h-12 w-12" />,
      description:
        language === "it"
          ? "Gestione proprietà, valutazioni, lead management"
          : "Property management, valuations, lead management",
      automations: [
        language === "it" ? "Valutazioni automatiche" : "Automatic valuations",
        language === "it" ? "Gestione lead" : "Lead management",
        language === "it" ? "Contratti digitali" : "Digital contracts",
      ],
      benefits: "120% aumento lead, 65% riduzione tempi",
    },
  ]

  const benefits = [
    {
      metric: "75%",
      label: language === "it" ? "Riduzione Costi" : "Cost Reduction",
      description:
        language === "it"
          ? "Riduzione media dei costi operativi attraverso l'automazione"
          : "Average reduction in operational costs through automation",
    },
    {
      metric: "200%",
      label: language === "it" ? "Aumento Produttività" : "Productivity Increase",
      description:
        language === "it"
          ? "Incremento della produttività del team e dei processi"
          : "Increase in team and process productivity",
    },
    {
      metric: "90%",
      label: language === "it" ? "Riduzione Errori" : "Error Reduction",
      description:
        language === "it"
          ? "Eliminazione degli errori umani nei processi automatizzati"
          : "Elimination of human errors in automated processes",
    },
    {
      metric: "24/7",
      label: language === "it" ? "Operatività" : "Operations",
      description:
        language === "it"
          ? "Sistemi che lavorano continuamente senza interruzioni"
          : "Systems that work continuously without interruptions",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <ServiceNavbar currentService="ai-automation" />

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                {language === "it" ? "AI Automation" : "AI Automation"}
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {language === "it" ? (
                  <>
                    Automazione{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      Intelligente
                    </span>
                  </>
                ) : (
                  <>
                    Intelligent{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      Automation
                    </span>
                  </>
                )}
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {language === "it"
                  ? "Rivoluziona i tuoi processi aziendali con soluzioni di automazione AI che aumentano l'efficienza, riducono i costi e accelerano la crescita."
                  : "Revolutionize your business processes with AI automation solutions that increase efficiency, reduce costs and accelerate growth."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/appointments">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                  >
                    <Sparkles className="h-6 w-6 mr-3" />
                    {language === "it" ? "Richiedi Consulenza" : "Request Consultation"}
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg font-semibold bg-slate-800/50"
                >
                  <Play className="h-6 w-6 mr-3" />
                  {language === "it" ? "Guarda Demo" : "Watch Demo"}
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-8 max-w-3xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{benefit.metric}</div>
                    <div className="text-slate-400 text-sm">{benefit.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Automation Types */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "it" ? "Tipi di Automazione" : "Automation Types"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "Soluzioni personalizzate per ogni area della tua azienda"
                : "Customized solutions for every area of your business"}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-800/50">
              {automationTypes.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className="flex items-center space-x-2 text-slate-300 data-[state=active]:text-white"
                >
                  {type.icon}
                  <span className="hidden sm:inline">{type.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {automationTypes.map((type) => (
              <TabsContent key={type.id} value={type.id}>
                <Card className="border-slate-700/50 bg-slate-800/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-3 bg-slate-700/50 rounded-lg text-purple-400">{type.icon}</div>
                          <h3 className="text-2xl font-bold text-white">{type.title}</h3>
                        </div>
                        <p className="text-slate-300 mb-6">{type.description}</p>
                        <div className="space-y-3">
                          {type.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span className="text-slate-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-700/30 p-8 rounded-lg">
                        <div className="text-center">
                          <div className="text-4xl mb-4">🤖</div>
                          <h4 className="font-semibold mb-2 text-white">
                            {language === "it" ? "Automazione Intelligente" : "Intelligent Automation"}
                          </h4>
                          <p className="text-sm text-slate-300">
                            {language === "it"
                              ? "I nostri sistemi AI apprendono dai tuoi processi e li ottimizzano continuamente"
                              : "Our AI systems learn from your processes and continuously optimize them"}
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

      {/* Industries Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "it" ? "Settori che Serviamo" : "Industries We Serve"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "Soluzioni specializzate per diversi settori industriali"
                : "Specialized solutions for different industrial sectors"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-slate-700/50 bg-slate-800/80 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="text-purple-400 mb-4 flex justify-center">{industry.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{industry.name}</h3>
                    <p className="text-slate-300 mb-4">{industry.description}</p>
                    <div className="space-y-2 mb-4">
                      {industry.automations.map((automation, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-sm text-slate-300">{automation}</span>
                        </div>
                      ))}
                    </div>
                    <Badge className="bg-purple-900/50 text-purple-300 border-purple-700 text-xs">
                      {industry.benefits}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "it" ? "Il Nostro Processo" : "Our Process"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "Dall'analisi all'implementazione in 4 semplici passaggi"
                : "From analysis to implementation in 4 simple steps"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-slate-700/50 bg-slate-800/80 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                        {step.step}
                      </div>
                      <div className="text-purple-400 mb-3">{step.icon}</div>
                    </div>
                    <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-300 mb-3">{step.description}</p>
                    <Badge variant="outline" className="text-xs text-purple-400 border-purple-500/30">
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

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-800/80 text-cyan-400 border-cyan-500/30">
              <Cpu className="h-4 w-4 mr-2" />
              {language === "it" ? "Tecnologie Avanzate" : "Advanced Technologies"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Soluzioni AI Complete" : "Complete AI Solutions"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "Trasforma ogni aspetto del tuo business con tecnologie di automazione all'avanguardia"
                : "Transform every aspect of your business with cutting-edge automation technologies"}
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">
              {language === "it" ? "Pronto ad Automatizzare la Tua Azienda?" : "Ready to Automate Your Business?"}
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              {language === "it"
                ? "Inizia oggi con una soluzione di automazione personalizzata. Consulenza gratuita e demo personalizzata incluse."
                : "Start today with a personalized automation solution. Free consultation and custom demo included."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  <Target className="h-5 w-5 mr-2" />
                  {language === "it" ? "Prenota Consulenza Gratuita" : "Book Free Consultation"}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 bg-slate-800/50 backdrop-blur-sm"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                {language === "it" ? "Richiedi Demo" : "Request Demo"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  )
}
