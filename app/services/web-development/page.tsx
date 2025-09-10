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
  Code,
  Monitor,
  CheckCircle,
  ArrowRight,
  Play,
  ShoppingCart,
  Globe,
  Zap,
  Search,
  Palette,
  Database,
  Cloud,
  Clock,
  Shield,
} from "lucide-react"

export default function WebDevelopmentPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("websites")

  const texts = {
    en: {
      title: "Web Development",
      subtitle: "Professional Web Solutions",
      description:
        "We create modern, responsive websites, e-commerce platforms, and web applications that convert visitors into customers. Our solutions combine cutting-edge technology with user-centered design to deliver exceptional digital experiences that drive business growth.",
      heroTitle: "Professional",
      heroSubtitle: "Web Development",
      ctaPrimary: "View Portfolio",
      ctaSecondary: "Free Consultation",
      benefitsTitle: "Performance Metrics",
      benefitsSubtitle: "Measurable results for your online presence",
      servicesTitle: "Our Web Development Services",
      servicesSubtitle: "Comprehensive digital solutions tailored to your business objectives",
      technologiesTitle: "Technologies We Master",
      technologiesSubtitle: "Modern technology stack for optimal performance and scalability",
      processTitle: "Our Development Process",
      processSubtitle: "Structured approach from concept to deployment and beyond",
      portfolioTitle: "Featured Projects",
      portfolioSubtitle: "Successful web solutions we've delivered for diverse industries",
      methodologyTitle: "Development Methodology",
      methodologySubtitle: "Agile practices ensuring quality and efficiency",
      qaTitle: "Quality Assurance",
      qaSubtitle: "Comprehensive testing for flawless user experiences",
      optimizationTitle: "Performance Optimization",
      optimizationSubtitle: "Speed and efficiency optimization strategies",
      securityTitle: "Security & Compliance",
      securitySubtitle: "Enterprise-grade security measures and compliance standards",
      maintenanceTitle: "Ongoing Support & Maintenance",
      maintenanceSubtitle: "Continuous support to keep your website performing at its best",
      ctaFinalTitle: "Ready to Transform Your Digital Presence?",
      ctaFinalSubtitle:
        "Partner with us to create a powerful web solution that drives results. Get a free consultation and detailed project proposal tailored to your specific needs.",
      ctaFinalPrimary: "Start Your Project",
      ctaFinalSecondary: "View Case Studies",
      conversionIncrease: "Conversion Increase",
      loadingTime: "Average Load Time",
      mobileResponsive: "Mobile Responsive",
      completeOptimization: "SEO Optimized",
      conversionIncreaseDescription: "Average conversion rate improvement across our projects",
      loadingTimeDescription: "Optimized performance for maximum user engagement",
      mobileResponsiveDescription: "Perfect experience across all devices and screen sizes",
      completeOptimizationDescription: "Search engine optimized for maximum visibility",
      businessWebsites: "Corporate Websites",
      businessWebsitesDescription:
        "Professional websites that establish credibility and drive business growth through strategic design and compelling content.",
      businessWebsitesFeatures: [
        "Custom responsive design tailored to your brand",
        "Advanced SEO optimization and analytics integration",
        "Content Management System (CMS) for easy updates",
        "Social media integration and marketing tools",
        "Multi-language support for global reach",
        "Performance optimization for fast loading times",
        "Security features and SSL certificates",
        "Contact forms and lead generation tools",
      ],
      ecommerce: "E-commerce Solutions",
      ecommerceDescription:
        "Complete online stores with advanced features for selling products and services, including inventory management and secure payment processing.",
      ecommerceFeatures: [
        "Advanced product catalog with filtering and search",
        "Secure payment gateway integration (Stripe, PayPal)",
        "Automated inventory and order management",
        "Customer account management and order tracking",
        "Analytics and sales reporting dashboard",
        "Mobile-optimized shopping experience",
        "Email marketing integration",
        "Multi-currency and tax calculation support",
      ],
      webApplications: "Web Applications",
      webApplicationsDescription:
        "Custom web applications built to solve specific business challenges with scalable architecture and modern user interfaces.",
      webApplicationsFeatures: [
        "Custom functionality designed for your workflow",
        "Scalable database architecture and API development",
        "User authentication and role-based access control",
        "Real-time data synchronization and updates",
        "Third-party service integrations",
        "Progressive Web App (PWA) capabilities",
        "Cloud deployment and auto-scaling",
        "Comprehensive admin dashboard and reporting",
      ],
      discoveryPlanning: "Discovery & Strategy",
      discoveryPlanningDescription:
        "Comprehensive analysis of your business needs, target audience, and competitive landscape to create a strategic development plan.",
      discoveryPlanningDuration: "1-2 weeks",
      designPrototyping: "Design & Prototyping",
      designPrototypingDescription:
        "Creating wireframes, user experience flows, and high-fidelity designs with interactive prototypes for stakeholder approval.",
      designPrototypingDuration: "2-3 weeks",
      developmentTesting: "Development & Testing",
      developmentTestingDescription:
        "Agile development with continuous integration, comprehensive testing, and regular progress reviews to ensure quality delivery.",
      developmentTestingDuration: "4-8 weeks",
      launchSupport: "Launch & Optimization",
      launchSupportDescription:
        "Deployment to production environment with performance monitoring, user training, and ongoing optimization based on real-world usage.",
      launchSupportDuration: "Ongoing",
      ecommerceFashionStore: "Fashion E-commerce Platform",
      saasDashboard: "SaaS Analytics Dashboard",
      corporateWebsite: "Corporate Technology Website",
      ecommerceFashionStoreDescription:
        "Modern fashion e-commerce platform with advanced product filtering, wishlist functionality, and integrated payment processing.",
      saasDashboardDescription:
        "Complex analytics dashboard for SaaS platform with real-time data visualization, user management, and comprehensive reporting tools.",
      corporateWebsiteDescription:
        "Professional corporate website with content management system, multi-language support, and lead generation optimization.",
    },
    it: {
      title: "Sviluppo Web",
      subtitle: "Soluzioni Web Professionali",
      description:
        "Creiamo siti web moderni e responsive, piattaforme e-commerce e applicazioni web che convertono visitatori in clienti. Le nostre soluzioni combinano tecnologie all'avanguardia con design centrato sull'utente per offrire esperienze digitali eccezionali che guidano la crescita aziendale.",
      heroTitle: "Sviluppo Web",
      heroSubtitle: "Professionale",
      ctaPrimary: "Vedi Portfolio",
      ctaSecondary: "Consulenza Gratuita",
      benefitsTitle: "Metriche delle Performance",
      benefitsSubtitle: "Risultati misurabili per la tua presenza online",
      servicesTitle: "I Nostri Servizi di Sviluppo Web",
      servicesSubtitle: "Soluzioni digitali complete su misura per i tuoi obiettivi aziendali",
      technologiesTitle: "Tecnologie che Padroneggiamo",
      technologiesSubtitle: "Stack tecnologico moderno per performance e scalabilità ottimali",
      processTitle: "Il Nostro Processo di Sviluppo",
      processSubtitle: "Approccio strutturato dal concept al deployment e oltre",
      portfolioTitle: "Progetti in Evidenza",
      portfolioSubtitle: "Soluzioni web di successo che abbiamo realizzato per diversi settori",
      methodologyTitle: "Metodologia di Sviluppo",
      methodologySubtitle: "Pratiche agili che garantiscono qualità ed efficienza",
      qaTitle: "Garanzia della Qualità",
      qaSubtitle: "Test completi per esperienze utente impeccabili",
      optimizationTitle: "Ottimizzazione delle Performance",
      optimizationSubtitle: "Strategie di ottimizzazione per velocità ed efficienza",
      securityTitle: "Sicurezza e Conformità",
      securitySubtitle: "Misure di sicurezza di livello enterprise e standard di conformità",
      maintenanceTitle: "Supporto e Manutenzione Continui",
      maintenanceSubtitle: "Supporto continuo per mantenere il tuo sito web sempre al massimo delle performance",
      ctaFinalTitle: "Pronto a Trasformare la Tua Presenza Digitale?",
      ctaFinalSubtitle:
        "Collabora con noi per creare una soluzione web potente che genera risultati. Ottieni una consulenza gratuita e una proposta di progetto dettagliata su misura per le tue esigenze specifiche.",
      ctaFinalPrimary: "Inizia il Tuo Progetto",
      ctaFinalSecondary: "Vedi Case Study",
      conversionIncrease: "Aumento Conversioni",
      loadingTime: "Tempo di Caricamento Medio",
      mobileResponsive: "Mobile Responsive",
      completeOptimization: "SEO Ottimizzato",
      conversionIncreaseDescription: "Miglioramento medio del tasso di conversione nei nostri progetti",
      loadingTimeDescription: "Performance ottimizzate per il massimo coinvolgimento degli utenti",
      mobileResponsiveDescription: "Esperienza perfetta su tutti i dispositivi e dimensioni dello schermo",
      completeOptimizationDescription: "Ottimizzato per i motori di ricerca per la massima visibilità",
      businessWebsites: "Siti Web Aziendali",
      businessWebsitesDescription:
        "Siti web professionali che stabiliscono credibilità e guidano la crescita aziendale attraverso design strategico e contenuti coinvolgenti.",
      businessWebsitesFeatures: [
        "Design responsive personalizzato per il tuo brand",
        "Ottimizzazione SEO avanzata e integrazione analytics",
        "Sistema di gestione contenuti (CMS) per aggiornamenti facili",
        "Integrazione social media e strumenti di marketing",
        "Supporto multilingua per portata globale",
        "Ottimizzazione performance per tempi di caricamento rapidi",
        "Funzionalità di sicurezza e certificati SSL",
        "Form di contatto e strumenti di generazione lead",
      ],
      ecommerce: "Soluzioni E-commerce",
      ecommerceDescription:
        "Negozi online completi con funzionalità avanzate per vendere prodotti e servizi, inclusa gestione inventario e elaborazione pagamenti sicura.",
      ecommerceFeatures: [
        "Catalogo prodotti avanzato con filtri e ricerca",
        "Integrazione gateway di pagamento sicuro (Stripe, PayPal)",
        "Gestione automatizzata inventario e ordini",
        "Gestione account clienti e tracciamento ordini",
        "Dashboard analytics e reporting vendite",
        "Esperienza shopping ottimizzata per mobile",
        "Integrazione email marketing",
        "Supporto multi-valuta e calcolo tasse",
      ],
      webApplications: "Applicazioni Web",
      webApplicationsDescription:
        "Applicazioni web personalizzate costruite per risolvere sfide aziendali specifiche con architettura scalabile e interfacce utente moderne.",
      webApplicationsFeatures: [
        "Funzionalità personalizzate progettate per il tuo workflow",
        "Architettura database scalabile e sviluppo API",
        "Autenticazione utenti e controllo accesso basato sui ruoli",
        "Sincronizzazione e aggiornamenti dati in tempo reale",
        "Integrazioni servizi di terze parti",
        "Capacità Progressive Web App (PWA)",
        "Deployment cloud e auto-scaling",
        "Dashboard admin completa e reporting",
      ],
      discoveryPlanning: "Scoperta e Strategia",
      discoveryPlanningDescription:
        "Analisi completa delle tue esigenze aziendali, pubblico target e panorama competitivo per creare un piano di sviluppo strategico.",
      discoveryPlanningDuration: "1-2 settimane",
      designPrototyping: "Design e Prototipazione",
      designPrototypingDescription:
        "Creazione di wireframe, flussi esperienza utente e design ad alta fedeltà con prototipi interattivi per l'approvazione degli stakeholder.",
      designPrototypingDuration: "2-3 settimane",
      developmentTesting: "Sviluppo e Test",
      developmentTestingDescription:
        "Sviluppo agile con integrazione continua, test completi e revisioni regolari del progresso per garantire consegna di qualità.",
      developmentTestingDuration: "4-8 settimane",
      launchSupport: "Lancio e Ottimizzazione",
      launchSupportDescription:
        "Deployment nell'ambiente di produzione con monitoraggio performance, formazione utenti e ottimizzazione continua basata sull'uso reale.",
      launchSupportDuration: "Continuo",
      ecommerceFashionStore: "Piattaforma E-commerce Moda",
      saasDashboard: "Dashboard Analytics SaaS",
      corporateWebsite: "Sito Web Corporate Tecnologico",
      ecommerceFashionStoreDescription:
        "Piattaforma e-commerce moda moderna con filtri prodotto avanzati, funzionalità wishlist e elaborazione pagamenti integrata.",
      saasDashboardDescription:
        "Dashboard analytics complessa per piattaforma SaaS con visualizzazione dati in tempo reale, gestione utenti e strumenti di reporting completi.",
      corporateWebsiteDescription:
        "Sito web corporate professionale con sistema di gestione contenuti, supporto multilingua e ottimizzazione generazione lead.",
    },
  }

  const t = texts[language]

  const benefits = [
    {
      metric: "150%",
      label: t.conversionIncrease,
      description: t.conversionIncreaseDescription,
    },
    {
      metric: "1.8s",
      label: t.loadingTime,
      description: t.loadingTimeDescription,
    },
    {
      metric: "100%",
      label: t.mobileResponsive,
      description: t.mobileResponsiveDescription,
    },
    {
      metric: "95+",
      label: t.completeOptimization,
      description: t.completeOptimizationDescription,
    },
  ]

  const serviceTypes = [
    {
      id: "websites",
      title: t.businessWebsites,
      icon: <Monitor className="h-6 w-6" />,
      description: t.businessWebsitesDescription,
      features: t.businessWebsitesFeatures,
    },
    {
      id: "ecommerce",
      title: t.ecommerce,
      icon: <ShoppingCart className="h-6 w-6" />,
      description: t.ecommerceDescription,
      features: t.ecommerceFeatures,
    },
    {
      id: "webapp",
      title: t.webApplications,
      icon: <Code className="h-6 w-6" />,
      description: t.webApplicationsDescription,
      features: t.webApplicationsFeatures,
    },
  ]

  const technologies = [
    {
      category: "Frontend",
      icon: <Palette className="h-6 w-6" />,
      techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
      description:
        language === "en"
          ? "Modern frontend frameworks for responsive user interfaces"
          : "Framework frontend moderni per interfacce utente responsive",
    },
    {
      category: "Backend",
      icon: <Database className="h-6 w-6" />,
      techs: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
      description:
        language === "en"
          ? "Robust backend technologies for scalable applications"
          : "Tecnologie backend robuste per applicazioni scalabili",
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud className="h-6 w-6" />,
      techs: ["Vercel", "AWS", "Docker", "GitHub Actions", "Cloudflare", "Kubernetes"],
      description:
        language === "en"
          ? "Cloud infrastructure and deployment automation"
          : "Infrastruttura cloud e automazione deployment",
    },
    {
      category: "Performance",
      icon: <Zap className="h-6 w-6" />,
      techs: ["CDN", "Image Optimization", "Caching", "Lazy Loading", "PWA", "WebP"],
      description:
        language === "en"
          ? "Optimization techniques for maximum performance"
          : "Tecniche di ottimizzazione per performance massime",
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: t.discoveryPlanning,
      description: t.discoveryPlanningDescription,
      icon: <Search className="h-8 w-8" />,
      duration: t.discoveryPlanningDuration,
      details:
        language === "en"
          ? [
              "Stakeholder interviews and requirements gathering",
              "Competitive analysis and market research",
              "Technical architecture planning",
              "Project timeline and milestone definition",
            ]
          : [
              "Interviste stakeholder e raccolta requisiti",
              "Analisi competitiva e ricerca di mercato",
              "Pianificazione architettura tecnica",
              "Definizione timeline progetto e milestone",
            ],
    },
    {
      step: "02",
      title: t.designPrototyping,
      description: t.designPrototypingDescription,
      icon: <Palette className="h-8 w-8" />,
      duration: t.designPrototypingDuration,
      details:
        language === "en"
          ? [
              "User experience (UX) research and personas",
              "Wireframing and information architecture",
              "Visual design and brand integration",
              "Interactive prototypes and user testing",
            ]
          : [
              "Ricerca esperienza utente (UX) e personas",
              "Wireframing e architettura informazioni",
              "Design visuale e integrazione brand",
              "Prototipi interattivi e test utente",
            ],
    },
    {
      step: "03",
      title: t.developmentTesting,
      description: t.developmentTestingDescription,
      icon: <Code className="h-8 w-8" />,
      duration: t.developmentTestingDuration,
      details:
        language === "en"
          ? [
              "Agile development with regular sprints",
              "Continuous integration and automated testing",
              "Code reviews and quality assurance",
              "Performance optimization and security testing",
            ]
          : [
              "Sviluppo agile con sprint regolari",
              "Integrazione continua e test automatizzati",
              "Code review e garanzia qualità",
              "Ottimizzazione performance e test sicurezza",
            ],
    },
    {
      step: "04",
      title: t.launchSupport,
      description: t.launchSupportDescription,
      icon: <Globe className="h-8 w-8" />,
      duration: t.launchSupportDuration,
      details:
        language === "en"
          ? [
              "Production deployment and monitoring setup",
              "User training and documentation",
              "Performance monitoring and analytics",
              "Ongoing maintenance and feature updates",
            ]
          : [
              "Deployment produzione e setup monitoraggio",
              "Formazione utenti e documentazione",
              "Monitoraggio performance e analytics",
              "Manutenzione continua e aggiornamenti feature",
            ],
    },
  ]

  const portfolioProjects = [
    {
      title: t.ecommerceFashionStore,
      category: t.ecommerce,
      description: t.ecommerceFashionStoreDescription,
      image: "/modern-ecommerce-fashion-website.png",
      metrics: {
        conversion: "+250%",
        speed: "1.2s",
        mobile: "98/100",
      },
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      features:
        language === "en"
          ? [
              "Advanced product filtering and search",
              "Wishlist and favorites functionality",
              "Secure payment processing",
              "Inventory management system",
            ]
          : [
              "Filtri prodotto avanzati e ricerca",
              "Funzionalità wishlist e preferiti",
              "Elaborazione pagamenti sicura",
              "Sistema gestione inventario",
            ],
    },
    {
      title: t.saasDashboard,
      category: t.webApplications,
      description: t.saasDashboardDescription,
      image: "/modern-saas-dashboard.png",
      metrics: {
        users: "10k+",
        uptime: "99.9%",
        performance: "95/100",
      },
      technologies: ["Vue.js", "Python", "MongoDB", "Redis"],
      features:
        language === "en"
          ? [
              "Real-time data visualization",
              "User management and permissions",
              "Comprehensive reporting tools",
              "API integration capabilities",
            ]
          : [
              "Visualizzazione dati in tempo reale",
              "Gestione utenti e permessi",
              "Strumenti reporting completi",
              "Capacità integrazione API",
            ],
    },
    {
      title: t.corporateWebsite,
      category: t.businessWebsites,
      description: t.corporateWebsiteDescription,
      image: "/modern-corporate-website-tech.jpg",
      metrics: {
        seo: "95/100",
        accessibility: "AA",
        leads: "+180%",
      },
      technologies: ["Next.js", "TypeScript", "Sanity CMS", "Vercel"],
      features:
        language === "en"
          ? [
              "Multi-language content management",
              "SEO optimization and analytics",
              "Lead generation forms",
              "Blog and news management",
            ]
          : [
              "Gestione contenuti multilingua",
              "Ottimizzazione SEO e analytics",
              "Form generazione lead",
              "Gestione blog e news",
            ],
    },
  ]

  const securityFeatures = [
    {
      title: language === "en" ? "SSL/TLS Encryption" : "Crittografia SSL/TLS",
      description:
        language === "en"
          ? "End-to-end encryption for all data transmission"
          : "Crittografia end-to-end per tutta la trasmissione dati",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: language === "en" ? "GDPR Compliance" : "Conformità GDPR",
      description:
        language === "en"
          ? "Full compliance with European data protection regulations"
          : "Piena conformità con le normative europee sulla protezione dei dati",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: language === "en" ? "Regular Security Audits" : "Audit di Sicurezza Regolari",
      description:
        language === "en"
          ? "Continuous monitoring and vulnerability assessments"
          : "Monitoraggio continuo e valutazioni vulnerabilità",
      icon: <Search className="h-6 w-6" />,
    },
    {
      title: language === "en" ? "Backup & Recovery" : "Backup e Recupero",
      description:
        language === "en"
          ? "Automated backups with disaster recovery procedures"
          : "Backup automatizzati con procedure di disaster recovery",
      icon: <Database className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <ServiceNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
                <Code className="h-4 w-4 mr-2" />
                {t.title}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                {t.heroTitle}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  {t.heroSubtitle}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  <Play className="h-5 w-5 mr-2" />
                  {t.ctaPrimary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-3 bg-transparent"
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
                <Card className="text-center h-full border-green-100 hover:border-green-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">{benefit.metric}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.label}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Types */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.servicesTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.servicesSubtitle}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {serviceTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id} className="flex items-center space-x-2">
                  {type.icon}
                  <span className="hidden sm:inline">{type.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceTypes.map((type) => (
              <TabsContent key={type.id} value={type.id}>
                <Card className="border-green-100">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-3 bg-green-100 rounded-lg text-green-600">{type.icon}</div>
                          <h3 className="text-2xl font-bold text-gray-900">{type.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{type.description}</p>
                        <div className="space-y-3">
                          {type.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg">
                        <div className="text-center">
                          <div className="text-4xl mb-4">💻</div>
                          <h4 className="font-semibold mb-2">
                            {language === "en" ? "Modern Technologies" : "Tecnologie Moderne"}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4">
                            {language === "en"
                              ? "We use cutting-edge technologies to ensure optimal performance, scalability, and maintainability for your web solution."
                              : "Utilizziamo tecnologie all'avanguardia per garantire performance ottimali, scalabilità e manutenibilità per la tua soluzione web."}
                          </p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            <Badge variant="outline" className="text-xs">
                              React
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Next.js
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              TypeScript
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Node.js
                            </Badge>
                          </div>
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

      {/* Technologies Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.technologiesTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.technologiesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-green-600 mb-4 flex justify-center">{tech.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-center">{tech.category}</h3>
                    <p className="text-sm text-gray-600 mb-4 text-center">{tech.description}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {tech.techs.map((techName, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-green-600 border-green-200">
                          {techName}
                        </Badge>
                      ))}
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
                <Card className="h-full border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                        {step.step}
                      </div>
                      <div className="text-green-600 mb-3 flex justify-center">{step.icon}</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-center">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 text-center">{step.description}</p>
                    <Badge
                      variant="outline"
                      className="text-xs text-green-600 border-green-200 mb-4 mx-auto block w-fit"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {step.duration}
                    </Badge>
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-xs text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.portfolioTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.portfolioSubtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600 text-white">{project.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-center mb-6">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-lg font-bold text-green-600">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        {language === "en" ? "Technologies" : "Tecnologie"}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs text-green-600 border-green-200">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        {language === "en" ? "Key Features" : "Caratteristiche Principali"}
                      </h4>
                      <div className="space-y-1">
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-xs text-gray-600">{feature}</span>
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

      {/* Security Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.securityTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.securitySubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-green-100 hover:border-green-200 transition-colors text-center">
                  <CardContent className="p-6">
                    <div className="text-green-600 mb-4 flex justify-center">{feature.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.ctaFinalTitle}</h2>
            <p className="text-xl text-gray-600 mb-8">{t.ctaFinalSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Monitor className="h-5 w-5 mr-2" />
                {t.ctaFinalPrimary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-3 bg-transparent"
              >
                <Globe className="h-5 w-5 mr-2" />
                {t.ctaFinalSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
