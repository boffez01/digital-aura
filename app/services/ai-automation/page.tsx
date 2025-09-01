"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  Brain,
  Cog,
  Database,
  Shield,
  Star,
  Award,
  Target,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "../../contexts/language-context"

export default function AIAutomationPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { t, language } = useLanguage()

  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: language === "it" ? "Risparmio di Tempo" : "Time Savings",
      description:
        language === "it"
          ? "Automatizza processi ripetitivi e libera il tuo team per attività strategiche ad alto valore"
          : "Automate repetitive processes and free your team for high-value strategic activities",
      color: "text-blue-600",
      stats: language === "it" ? "Fino a 80% di tempo risparmiato" : "Up to 80% time saved",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: language === "it" ? "Riduzione Costi" : "Cost Reduction",
      description:
        language === "it"
          ? "Diminuisci i costi operativi fino al 60% con l'automazione intelligente dei processi"
          : "Reduce operational costs by up to 60% with intelligent process automation",
      color: "text-green-600",
      stats: language === "it" ? "ROI medio del 320%" : "Average ROI of 320%",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: language === "it" ? "Aumento Produttività" : "Productivity Increase",
      description:
        language === "it"
          ? "Incrementa l'efficienza del 300% con processi ottimizzati dall'intelligenza artificiale"
          : "Increase efficiency by 300% with AI-optimized processes",
      color: "text-purple-600",
      stats: language === "it" ? "300% aumento produttività" : "300% productivity increase",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: language === "it" ? "Analisi Avanzate" : "Advanced Analytics",
      description:
        language === "it"
          ? "Ottieni insights preziosi dai tuoi dati con algoritmi di machine learning predittivi"
          : "Get valuable insights from your data with predictive machine learning algorithms",
      color: "text-orange-600",
      stats: language === "it" ? "95% accuratezza predizioni" : "95% prediction accuracy",
    },
  ]

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: language === "it" ? "Machine Learning Avanzato" : "Advanced Machine Learning",
      description:
        language === "it"
          ? "Algoritmi che imparano e migliorano continuamente le performance"
          : "Algorithms that learn and continuously improve performance",
    },
    {
      icon: <Cog className="w-6 h-6" />,
      title: language === "it" ? "Automazione Processi" : "Process Automation",
      description:
        language === "it"
          ? "Workflow automatizzati per eliminare attività manuali ripetitive"
          : "Automated workflows to eliminate repetitive manual activities",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: language === "it" ? "Integrazione Dati" : "Data Integration",
      description:
        language === "it"
          ? "Connessione seamless con tutti i tuoi sistemi esistenti"
          : "Seamless connection with all your existing systems",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: language === "it" ? "Sicurezza Enterprise" : "Enterprise Security",
      description:
        language === "it"
          ? "Protezione avanzata dei dati con crittografia end-to-end"
          : "Advanced data protection with end-to-end encryption",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: language === "it" ? "Analytics in Tempo Reale" : "Real-time Analytics",
      description:
        language === "it"
          ? "Dashboard interattive per monitorare performance e KPI"
          : "Interactive dashboards to monitor performance and KPIs",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: language === "it" ? "Ottimizzazione Continua" : "Continuous Optimization",
      description:
        language === "it"
          ? "Miglioramento automatico basato sui risultati ottenuti"
          : "Automatic improvement based on achieved results",
    },
  ]

  const useCases = [
    {
      title: "E-commerce & Retail",
      description:
        language === "it"
          ? "Gestione automatica dell'inventario, raccomandazioni personalizzate e ottimizzazione dei prezzi dinamica"
          : "Automatic inventory management, personalized recommendations and dynamic price optimization",
      example:
        language === "it"
          ? "Un negozio online ha aumentato le vendite del 45% automatizzando le raccomandazioni prodotto e la gestione stock"
          : "An online store increased sales by 45% by automating product recommendations and stock management",
      icon: <BarChart3 className="w-8 h-8" />,
      results: [
        language === "it" ? "45% aumento vendite" : "45% sales increase",
        language === "it" ? "30% riduzione stock-out" : "30% stock-out reduction",
        language === "it" ? "25% miglioramento margini" : "25% margin improvement",
      ],
      technologies: ["TensorFlow", "Python", "AWS", "MongoDB"],
    },
    {
      title: language === "it" ? "Risorse Umane" : "Human Resources",
      description:
        language === "it"
          ? "Screening automatico dei CV, programmazione colloqui, analisi delle performance e gestione talenti"
          : "Automatic CV screening, interview scheduling, performance analysis and talent management",
      example:
        language === "it"
          ? "Un'azienda Fortune 500 ha ridotto del 70% il tempo di selezione del personale mantenendo alta qualità"
          : "A Fortune 500 company reduced personnel selection time by 70% while maintaining high quality",
      icon: <Users className="w-8 h-8" />,
      results: [
        language === "it" ? "70% riduzione tempi" : "70% time reduction",
        language === "it" ? "90% accuratezza screening" : "90% screening accuracy",
        language === "it" ? "50% miglioramento retention" : "50% retention improvement",
      ],
      technologies: ["NLP", "Machine Learning", "API Integration", "Cloud"],
    },
    {
      title: "Finanza & Banking",
      description:
        language === "it"
          ? "Analisi del rischio in tempo reale, rilevamento frodi automatico e automazione della contabilità"
          : "Real-time risk analysis, automatic fraud detection and accounting automation",
      example:
        language === "it"
          ? "Una banca ha prevenuto il 95% delle transazioni fraudolente con il nostro sistema AI anti-frode"
          : "A bank prevented 95% of fraudulent transactions with our AI anti-fraud system",
      icon: <Shield className="w-8 h-8" />,
      results: [
        language === "it" ? "95% prevenzione frodi" : "95% fraud prevention",
        language === "it" ? "60% riduzione falsi positivi" : "60% false positive reduction",
        language === "it" ? "80% automazione processi" : "80% process automation",
      ],
      technologies: ["Deep Learning", "Real-time Analytics", "Blockchain", "Security"],
    },
    {
      title: language === "it" ? "Manifatturiero & Industria" : "Manufacturing & Industry",
      description:
        language === "it"
          ? "Manutenzione predittiva, controllo qualità automatico e ottimizzazione della produzione"
          : "Predictive maintenance, automatic quality control and production optimization",
      example:
        language === "it"
          ? "Un'industria manifatturiera ha ridotto i tempi di fermo macchina del 80% con manutenzione predittiva"
          : "A manufacturing industry reduced machine downtime by 80% with predictive maintenance",
      icon: <Cog className="w-8 h-8" />,
      results: [
        language === "it" ? "80% riduzione downtime" : "80% downtime reduction",
        language === "it" ? "40% risparmio manutenzione" : "40% maintenance savings",
        language === "it" ? "25% aumento efficienza" : "25% efficiency increase",
      ],
      technologies: ["IoT", "Predictive Analytics", "Computer Vision", "Edge Computing"],
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: language === "it" ? "Analisi & Audit" : "Analysis & Audit",
      description:
        language === "it"
          ? "Analizziamo i tuoi processi attuali e identifichiamo le opportunità di automazione"
          : "We analyze your current processes and identify automation opportunities",
      duration: language === "it" ? "1-2 settimane" : "1-2 weeks",
    },
    {
      step: "02",
      title: language === "it" ? "Strategia & Design" : "Strategy & Design",
      description:
        language === "it"
          ? "Progettiamo la soluzione AI personalizzata per le tue esigenze specifiche"
          : "We design the personalized AI solution for your specific needs",
      duration: language === "it" ? "2-3 settimane" : "2-3 weeks",
    },
    {
      step: "03",
      title: language === "it" ? "Sviluppo & Testing" : "Development & Testing",
      description:
        language === "it"
          ? "Sviluppiamo e testiamo la soluzione con i tuoi dati reali"
          : "We develop and test the solution with your real data",
      duration: language === "it" ? "4-8 settimane" : "4-8 weeks",
    },
    {
      step: "04",
      title: language === "it" ? "Deploy & Training" : "Deploy & Training",
      description:
        language === "it"
          ? "Implementiamo la soluzione e formiamo il tuo team"
          : "We implement the solution and train your team",
      duration: language === "it" ? "1-2 settimane" : "1-2 weeks",
    },
    {
      step: "05",
      title: language === "it" ? "Monitoraggio & Ottimizzazione" : "Monitoring & Optimization",
      description:
        language === "it"
          ? "Monitoriamo le performance e ottimizziamo continuamente"
          : "We monitor performance and continuously optimize",
      duration: "Ongoing",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-600/20 backdrop-blur-lg border-b border-purple-300/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-primary">
                Digital Aura
              </motion.div>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                {t("service.nav.home")}
              </Link>
              <Link href="/services/chatbot" className="text-foreground hover:text-primary transition-colors">
                Chatbot
              </Link>
              <Link href="/services/web-development" className="text-foreground hover:text-primary transition-colors">
                Web Development
              </Link>
              <Link href="/services/ai-marketing" className="text-foreground hover:text-primary transition-colors">
                AI Marketing
              </Link>
              <Link href="/appointments" className="text-foreground hover:text-primary transition-colors">
                {t("service.nav.appointments")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block p-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-8 shadow-xl"
            >
              <Zap className="w-16 h-16 text-white" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-high-contrast">AI Automation</h1>

            <p className="text-xl md:text-2xl text-medium-contrast mb-8 max-w-4xl mx-auto leading-relaxed">
              {language === "it"
                ? "Trasforma la tua azienda con soluzioni di automazione AI all'avanguardia. Riduci i costi, aumenta l'efficienza e libera il potenziale del tuo team con tecnologie intelligenti."
                : "Transform your business with cutting-edge AI automation solutions. Reduce costs, increase efficiency and unlock your team's potential with intelligent technologies."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/appointments">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg px-8 py-4">
                  {language === "it" ? "Richiedi Consulenza Gratuita" : "Request Free Consultation"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/chatbot">
                <Button size="lg" className="btn-secondary text-lg px-8 py-4">
                  {language === "it" ? "Parla con il nostro AI" : "Talk to our AI"}
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "60%", label: language === "it" ? "Riduzione Costi" : "Cost Reduction" },
                { value: "300%", label: language === "it" ? "Aumento Produttività" : "Productivity Increase" },
                { value: "80%", label: language === "it" ? "Tempo Risparmiato" : "Time Saved" },
                { value: "320%", label: language === "it" ? "ROI Medio" : "Average ROI" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 1, duration: 0.5 }}
                  className="card-modern p-4 text-center"
                >
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-medium-contrast">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scopri l'AI in Azione Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-high-contrast mb-6">
              {language === "it" ? "Come Funziona la Nostra AI" : "How Our AI Works"}
            </h2>
            <p className="text-xl text-medium-contrast max-w-3xl mx-auto leading-relaxed">
              {language === "it"
                ? "Scopri come i nostri algoritmi AI trasformano processi complessi in soluzioni automatizzate intelligenti"
                : "Discover how our AI algorithms transform complex processes into intelligent automated solutions"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12" />,
                title: language === "it" ? "Analisi Intelligente" : "Intelligent Analysis",
                description:
                  language === "it"
                    ? "La nostra AI analizza i tuoi dati storici, identifica pattern nascosti e comprende i processi aziendali esistenti per ottimizzarli automaticamente."
                    : "Our AI analyzes your historical data, identifies hidden patterns and understands existing business processes to optimize them automatically.",
                features: [
                  language === "it" ? "Pattern Recognition avanzato" : "Advanced Pattern Recognition",
                  language === "it" ? "Analisi predittiva" : "Predictive Analysis",
                  language === "it" ? "Machine Learning continuo" : "Continuous Machine Learning",
                ],
              },
              {
                icon: <Cog className="w-12 h-12" />,
                title: language === "it" ? "Automazione Intelligente" : "Intelligent Automation",
                description:
                  language === "it"
                    ? "Implementiamo workflow automatizzati che si adattano dinamicamente alle condizioni operative, riducendo errori e aumentando l'efficienza."
                    : "We implement automated workflows that adapt dynamically to operating conditions, reducing errors and increasing efficiency.",
                features: [
                  language === "it" ? "Workflow adattivi" : "Adaptive Workflows",
                  language === "it" ? "Riduzione errori 90%" : "90% Error Reduction",
                  language === "it" ? "Ottimizzazione continua" : "Continuous Optimization",
                ],
              },
              {
                icon: <BarChart3 className="w-12 h-12" />,
                title: language === "it" ? "Monitoraggio Avanzato" : "Advanced Monitoring",
                description:
                  language === "it"
                    ? "Sistema di monitoraggio 24/7 con dashboard in tempo reale, alert automatici e report dettagliati per massimizzare il ROI."
                    : "24/7 monitoring system with real-time dashboards, automatic alerts and detailed reports to maximize ROI.",
                features: [
                  language === "it" ? "Dashboard real-time" : "Real-time Dashboard",
                  language === "it" ? "Alert automatici" : "Automatic Alerts",
                  language === "it" ? "Report personalizzati" : "Custom Reports",
                ],
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="card-modern h-full text-center p-8">
                  <div className="text-purple-600 mb-6 flex justify-center">{step.icon}</div>
                  <h3 className="text-xl font-bold text-high-contrast mb-4">{step.title}</h3>
                  <p className="text-medium-contrast mb-6 leading-relaxed">{step.description}</p>
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center text-sm text-low-contrast">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-high-contrast mb-4">
                {language === "it" ? "Risultati Garantiti" : "Guaranteed Results"}
              </h3>
              <p className="text-medium-contrast mb-6">
                {language === "it"
                  ? "Il nostro approccio basato sui dati garantisce risultati misurabili fin dal primo mese di implementazione"
                  : "Our data-driven approach guarantees measurable results from the first month of implementation"}
              </p>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { value: "60%", label: language === "it" ? "Riduzione Costi" : "Cost Reduction" },
                  { value: "300%", label: language === "it" ? "Aumento Produttività" : "Productivity Increase" },
                  { value: "90%", label: language === "it" ? "Riduzione Errori" : "Error Reduction" },
                  { value: "24/7", label: language === "it" ? "Operatività Continua" : "Continuous Operation" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{stat.value}</div>
                    <div className="text-sm text-medium-contrast">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-high-contrast mb-6">
              {language === "it" ? "Perché Scegliere l'AI Automation" : "Why Choose AI Automation"}
            </h2>
            <p className="text-xl text-medium-contrast max-w-3xl mx-auto leading-relaxed">
              {language === "it"
                ? "I vantaggi concreti e misurabili che la nostra automazione AI porta alla tua azienda"
                : "The concrete and measurable benefits that our AI automation brings to your business"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="card-modern h-full text-center p-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 mb-6 ${benefit.color}`}
                  >
                    {benefit.icon}
                  </motion.div>
                  <CardTitle className="text-xl text-high-contrast mb-3">{benefit.title}</CardTitle>
                  <CardDescription className="text-medium-contrast mb-4 leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">{benefit.stats}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-high-contrast mb-6">
              {language === "it" ? "Tecnologie All'Avanguardia" : "Cutting-Edge Technologies"}
            </h2>
            <p className="text-xl text-medium-contrast max-w-3xl mx-auto leading-relaxed">
              {language === "it"
                ? "Utilizziamo le tecnologie AI più avanzate per garantire performance eccellenti e scalabilità enterprise"
                : "We use the most advanced AI technologies to ensure excellent performance and enterprise scalability"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="card-modern p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-high-contrast mb-2">{feature.title}</h3>
                      <p className="text-medium-contrast text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-high-contrast mb-6">
              {language === "it" ? "Casi d'Uso Reali" : "Real Use Cases"}
            </h2>
            <p className="text-xl text-medium-contrast max-w-3xl mx-auto leading-relaxed">
              {language === "it"
                ? "Scopri come l'AI Automation sta trasformando diversi settori con risultati concreti e misurabili"
                : "Discover how AI Automation is transforming different sectors with concrete and measurable results"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="card-modern h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                        {useCase.icon}
                      </div>
                      <CardTitle className="text-2xl text-high-contrast">{useCase.title}</CardTitle>
                    </div>
                    <CardDescription className="text-medium-contrast text-base leading-relaxed">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-4 rounded-lg border border-blue-500/10 mb-6">
                      <p className="text-medium-contrast italic">
                        <strong className="text-high-contrast">
                          {language === "it" ? "Caso di Successo:" : "Success Case:"}
                        </strong>{" "}
                        {useCase.example}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-high-contrast mb-3">
                        {language === "it" ? "Risultati Ottenuti:" : "Results Achieved:"}
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {useCase.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                            <span className="text-medium-contrast">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-high-contrast mb-3">
                        {language === "it" ? "Tecnologie:" : "Technologies:"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="border-blue-300 text-blue-700 text-xs">
                            {tech}
                          </Badge>
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

      {/* Process Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-high-contrast mb-6">
              {language === "it" ? "Il Nostro Processo" : "Our Process"}
            </h2>
            <p className="text-xl text-medium-contrast max-w-3xl mx-auto leading-relaxed">
              {language === "it"
                ? "Un approccio strutturato e collaudato per garantire il successo del tuo progetto di automazione AI"
                : "A structured and proven approach to ensure the success of your AI automation project"}
            </p>
          </motion.div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-8`}
              >
                <div className="flex-1">
                  <Card className="card-modern p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-high-contrast mb-2">{step.title}</h3>
                        <p className="text-medium-contrast mb-3 leading-relaxed">{step.description}</p>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">{step.duration}</Badge>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "it" ? "Pronto a Trasformare la Tua Azienda?" : "Ready to Transform Your Business?"}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {language === "it"
                ? "Inizia oggi stesso il tuo percorso verso l'automazione intelligente. Consulenza gratuita e analisi personalizzata dei tuoi processi incluse."
                : "Start your journey towards intelligent automation today. Free consultation and personalized analysis of your processes included."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/appointments">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 font-semibold text-lg">
                    {language === "it" ? "Prenota Consulenza Gratuita" : "Book Free Consultation"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/chatbot">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent text-lg"
                  >
                    {language === "it" ? "Chatta con il nostro AI" : "Chat with our AI"}
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Final Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                {
                  icon: <Award className="w-6 h-6" />,
                  value: "100+",
                  label: language === "it" ? "Progetti Completati" : "Completed Projects",
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  value: "98%",
                  label: language === "it" ? "Clienti Soddisfatti" : "Satisfied Clients",
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  value: "320%",
                  label: language === "it" ? "ROI Medio" : "Average ROI",
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  value: language === "it" ? "6 mesi" : "6 months",
                  label: language === "it" ? "Payback Medio" : "Average Payback",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
