"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Monitor,
  Zap,
  CheckCircle,
  Play,
  Sparkles,
  Palette,
  Search,
  Shield,
  ShoppingCart,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../../contexts/language-context"
import Navbar from "../../components/navbar"
import ServiceNavbar from "../../components/service-navbar"
import ChatbotWidget from "../../components/chatbot-widget"

export default function WebDevelopmentPage() {
  const { language } = useLanguage()

  const benefits = [
    {
      metric: "150%",
      label: language === "it" ? "Aumento Conversioni" : "Conversion Increase",
      description:
        language === "it"
          ? "Miglioramento medio del tasso di conversione nei nostri progetti"
          : "Average conversion rate improvement across our projects",
    },
    {
      metric: "1.8s",
      label: language === "it" ? "Tempo di Caricamento Medio" : "Average Load Time",
      description:
        language === "it"
          ? "Performance ottimizzate per il massimo coinvolgimento degli utenti"
          : "Optimized performance for maximum user engagement",
    },
    {
      metric: "100%",
      label: language === "it" ? "Mobile Responsive" : "Mobile Responsive",
      description:
        language === "it"
          ? "Esperienza perfetta su tutti i dispositivi e dimensioni dello schermo"
          : "Perfect experience across all devices and screen sizes",
    },
    {
      metric: "95+",
      label: language === "it" ? "SEO Ottimizzato" : "SEO Optimized",
      description:
        language === "it"
          ? "Ottimizzato per i motori di ricerca per la massima visibilità"
          : "Search engine optimized for maximum visibility",
    },
  ]

  const features = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: language === "it" ? "Design Responsive" : "Responsive Design",
      description:
        language === "it"
          ? "Siti web che si adattano perfettamente a ogni dispositivo e dimensione schermo"
          : "Websites that adapt perfectly to every device and screen size",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: language === "it" ? "Performance Ottimizzate" : "Optimized Performance",
      description:
        language === "it"
          ? "Velocità di caricamento ultra-rapide per una migliore esperienza utente"
          : "Ultra-fast loading speeds for better user experience",
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: language === "it" ? "SEO Avanzato" : "Advanced SEO",
      description:
        language === "it"
          ? "Ottimizzazione completa per i motori di ricerca e visibilità online"
          : "Complete optimization for search engines and online visibility",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: language === "it" ? "UI/UX Moderno" : "Modern UI/UX",
      description:
        language === "it"
          ? "Design accattivanti e interfacce intuitive per coinvolgere gli utenti"
          : "Captivating designs and intuitive interfaces to engage users",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: language === "it" ? "Sicurezza Enterprise" : "Enterprise Security",
      description:
        language === "it"
          ? "Protezione avanzata contro minacce e vulnerabilità web"
          : "Advanced protection against web threats and vulnerabilities",
      color: "text-red-400",
      bgColor: "bg-red-900/20",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: language === "it" ? "Codice Pulito" : "Clean Code",
      description:
        language === "it"
          ? "Sviluppo con best practices e standard industriali per manutenibilità"
          : "Development with best practices and industry standards for maintainability",
      color: "text-cyan-400",
      bgColor: "bg-cyan-900/20",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <ServiceNavbar currentService="web-development" />

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                <Code className="h-4 w-4 mr-2" />
                {language === "it" ? "Sviluppo Web" : "Web Development"}
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {language === "it" ? (
                  <>
                    Siti Web{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                      Moderni
                    </span>
                  </>
                ) : (
                  <>
                    Modern{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                      Websites
                    </span>
                  </>
                )}
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {language === "it"
                  ? "Creiamo esperienze web straordinarie che convertono visitatori in clienti, con design moderni e tecnologie all'avanguardia."
                  : "We create extraordinary web experiences that convert visitors into customers, with modern designs and cutting-edge technologies."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/appointments">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                  >
                    <Sparkles className="h-6 w-6 mr-3" />
                    {language === "it" ? "Richiedi Preventivo" : "Request Quote"}
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg font-semibold bg-slate-800/50"
                >
                  <Play className="h-6 w-6 mr-3" />
                  {language === "it" ? "Vedi Portfolio" : "View Portfolio"}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                {[
                  { value: "300%", label: language === "it" ? "Aumento Traffico" : "Traffic Increase" },
                  { value: "95%", label: language === "it" ? "PageSpeed Score" : "PageSpeed Score" },
                  { value: "150%", label: language === "it" ? "Più Conversioni" : "More Conversions" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEZIONE SERVIZI WEB DEVELOPMENT - 3 COLONNE COME NELL'IMMAGINE */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "it" ? "I Nostri Servizi di Sviluppo Web" : "Our Web Development Services"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "Soluzioni digitali complete su misura per i tuoi obiettivi aziendali"
                : "Complete digital solutions tailored to your business objectives"}
            </p>
          </div>

          {/* 3 COLONNE COME NELL'IMMAGINE */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* SITI WEB AZIENDALI - SINISTRA */}
            <Card className="bg-slate-800/80 border-slate-700/50 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Monitor className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {language === "it" ? "Siti Web Aziendali" : "Corporate Websites"}
                  </h3>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {language === "it"
                    ? "Siti web professionali che stabiliscono credibilità e guidano la crescita aziendale attraverso design strategico e contenuti coinvolgenti."
                    : "Professional websites that establish credibility and drive business growth through strategic design and compelling content."}
                </p>
                <div className="space-y-3">
                  {[
                    language === "it"
                      ? "Design responsive personalizzato per il tuo brand"
                      : "Custom responsive design tailored to your brand",
                    language === "it"
                      ? "Ottimizzazione SEO avanzata e integrazione analytics"
                      : "Advanced SEO optimization and analytics integration",
                    language === "it"
                      ? "Sistema di gestione contenuti (CMS) per aggiornamenti facili"
                      : "Content Management System (CMS) for easy updates",
                    language === "it"
                      ? "Integrazione social media e strumenti di marketing"
                      : "Social media integration and marketing tools",
                    language === "it"
                      ? "Supporto multilingua per portata globale"
                      : "Multi-language support for global reach",
                    language === "it"
                      ? "Ottimizzazione performance per tempi di caricamento rapidi"
                      : "Performance optimization for fast loading times",
                    language === "it"
                      ? "Funzionalità di sicurezza e certificati SSL"
                      : "Security features and SSL certificates",
                    language === "it"
                      ? "Form di contatto e strumenti di generazione lead"
                      : "Contact forms and lead generation tools",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SOLUZIONI E-COMMERCE - CENTRO */}
            <Card className="bg-slate-800/80 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <ShoppingCart className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {language === "it" ? "Soluzioni E-commerce" : "E-commerce Solutions"}
                  </h3>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {language === "it"
                    ? "Negozi online completi con funzionalità avanzate per vendere prodotti e servizi, inclusa gestione inventario e elaborazione pagamenti sicura."
                    : "Complete online stores with advanced features for selling products and services, including inventory management and secure payment processing."}
                </p>
                <div className="space-y-3">
                  {[
                    language === "it"
                      ? "Catalogo prodotti avanzato con filtri e ricerca"
                      : "Advanced product catalog with filtering and search",
                    language === "it"
                      ? "Integrazione gateway di pagamento sicuro (Stripe, PayPal)"
                      : "Secure payment gateway integration (Stripe, PayPal)",
                    language === "it"
                      ? "Gestione automatizzata inventario e ordini"
                      : "Automated inventory and order management",
                    language === "it"
                      ? "Gestione account clienti e tracciamento ordini"
                      : "Customer account management and order tracking",
                    language === "it"
                      ? "Dashboard analytics e reporting vendite"
                      : "Analytics and sales reporting dashboard",
                    language === "it"
                      ? "Esperienza shopping ottimizzata per mobile"
                      : "Mobile-optimized shopping experience",
                    language === "it" ? "Integrazione email marketing" : "Email marketing integration",
                    language === "it"
                      ? "Supporto multi-valuta e calcolo tasse"
                      : "Multi-currency and tax calculation support",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* APPLICAZIONI WEB - DESTRA */}
            <Card className="bg-slate-800/80 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Code className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {language === "it" ? "Applicazioni Web" : "Web Applications"}
                  </h3>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {language === "it"
                    ? "Applicazioni web personalizzate costruite per risolvere sfide aziendali specifiche con architettura scalabile e interfacce utente moderne."
                    : "Custom web applications built to solve specific business challenges with scalable architecture and modern user interfaces."}
                </p>
                <div className="space-y-3">
                  {[
                    language === "it"
                      ? "Funzionalità personalizzate progettate per il tuo workflow"
                      : "Custom functionality designed for your workflow",
                    language === "it"
                      ? "Architettura database scalabile e sviluppo API"
                      : "Scalable database architecture and API development",
                    language === "it"
                      ? "Autenticazione utenti e controllo accesso basato sui ruoli"
                      : "User authentication and role-based access control",
                    language === "it"
                      ? "Sincronizzazione e aggiornamenti dati in tempo reale"
                      : "Real-time data synchronization and updates",
                    language === "it" ? "Integrazioni servizi di terze parti" : "Third-party service integrations",
                    language === "it" ? "Capacità Progressive Web App (PWA)" : "Progressive Web App (PWA) capabilities",
                    language === "it" ? "Deployment cloud e auto-scaling" : "Cloud deployment and auto-scaling",
                    language === "it"
                      ? "Dashboard admin completa e reporting"
                      : "Comprehensive admin dashboard and reporting",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-800/80 text-cyan-400 border-cyan-500/30">
              <Monitor className="h-4 w-4 mr-2" />
              {language === "it" ? "Tecnologie Moderne" : "Modern Technologies"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Sviluppo All'Avanguardia" : "Cutting-Edge Development"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "Utilizziamo le tecnologie web più avanzate per creare siti performanti, sicuri e scalabili"
                : "We use the most advanced web technologies to create performant, secure and scalable websites"}
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
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === "it" ? "Risultati Misurabili" : "Measurable Results"}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {language === "it"
                ? "I nostri progetti web generano risultati concreti e misurabili per il tuo business"
                : "Our web projects generate concrete and measurable results for your business"}
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
                    <div className="text-3xl font-bold text-green-400 mb-2">{benefit.metric}</div>
                    <h3 className="font-semibold text-white mb-2">{benefit.label}</h3>
                    <p className="text-sm text-slate-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">
              {language === "it"
                ? "Pronto a Trasformare la Tua Presenza Digitale?"
                : "Ready to Transform Your Digital Presence?"}
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              {language === "it"
                ? "Collabora con noi per creare una soluzione web potente che genera risultati. Ottieni una consulenza gratuita e una proposta di progetto dettagliata."
                : "Partner with us to create a powerful web solution that drives results. Get a free consultation and detailed project proposal."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  <Monitor className="h-5 w-5 mr-2" />
                  {language === "it" ? "Inizia il Tuo Progetto" : "Start Your Project"}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 bg-slate-800/50 backdrop-blur-sm"
              >
                <Globe className="h-5 w-5 mr-2" />
                {language === "it" ? "Vedi Case Study" : "View Case Studies"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  )
}
