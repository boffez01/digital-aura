"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Search,
  Zap,
  Shield,
  BarChart3,
  Code,
  Palette,
  Rocket,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../../contexts/language-context"

export default function WebDevelopmentPage() {
  const { t, language } = useLanguage()

  const benefits = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: language === "it" ? "Design Responsive" : "Responsive Design",
      description:
        language === "it"
          ? "Siti web che si adattano perfettamente a tutti i dispositivi"
          : "Websites that adapt perfectly to all devices",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: language === "it" ? "SEO Ottimizzato" : "SEO Optimized",
      description:
        language === "it"
          ? "Massima visibilità sui motori di ricerca per più traffico organico"
          : "Maximum visibility on search engines for more organic traffic",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: language === "it" ? "Performance Elevate" : "High Performance",
      description:
        language === "it"
          ? "Caricamento ultra-veloce per una migliore esperienza utente"
          : "Ultra-fast loading for better user experience",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: language === "it" ? "Sicurezza Avanzata" : "Advanced Security",
      description:
        language === "it"
          ? "Protezione completa contro minacce e vulnerabilità"
          : "Complete protection against threats and vulnerabilities",
      color: "from-orange-500 to-red-500",
    },
  ]

  const services = [
    {
      title: language === "it" ? "Siti Web Aziendali" : "Corporate Websites",
      description:
        language === "it"
          ? "Presenza online professionale per la tua azienda"
          : "Professional online presence for your business",
      features: [
        language === "it" ? "Design personalizzato" : "Custom design",
        language === "it" ? "CMS integrato" : "Integrated CMS",
        language === "it" ? "Analytics avanzati" : "Advanced analytics",
        language === "it" ? "Supporto multilingue" : "Multilingual support",
      ],
      icon: <Globe className="w-8 h-8" />,
    },
    {
      title: "E-commerce",
      description:
        language === "it"
          ? "Piattaforme di vendita online complete e scalabili"
          : "Complete and scalable online sales platforms",
      features: [
        language === "it" ? "Gestione prodotti" : "Product management",
        language === "it" ? "Pagamenti sicuri" : "Secure payments",
        language === "it" ? "Inventario automatico" : "Automatic inventory",
        language === "it" ? "Marketing tools" : "Marketing tools",
      ],
      icon: <BarChart3 className="w-8 h-8" />,
    },
    {
      title: "Web App",
      description:
        language === "it"
          ? "Applicazioni web interattive e performanti"
          : "Interactive and high-performance web applications",
      features: [
        language === "it" ? "UI/UX avanzata" : "Advanced UI/UX",
        language === "it" ? "Real-time updates" : "Real-time updates",
        language === "it" ? "API integration" : "API integration",
        language === "it" ? "Cloud deployment" : "Cloud deployment",
      ],
      icon: <Code className="w-8 h-8" />,
    },
    {
      title: "Landing Pages",
      description:
        language === "it"
          ? "Pagine di conversione ottimizzate per il marketing"
          : "Conversion pages optimized for marketing",
      features: [
        "A/B testing",
        "Lead generation",
        language === "it" ? "Analytics integrati" : "Integrated analytics",
        "Mobile-first",
      ],
      icon: <Rocket className="w-8 h-8" />,
    },
  ]

  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Node.js", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Vercel", category: "Deployment" },
  ]

  const portfolio = [
    {
      title: "TechStart Corporate",
      description:
        language === "it" ? "Sito web aziendale con CMS personalizzato" : "Corporate website with custom CMS",
      image: "/modern-corporate-website.png",
      results: [
        language === "it" ? "300% aumento traffico" : "300% traffic increase",
        language === "it" ? "50% più lead qualificati" : "50% more qualified leads",
        language === "it" ? "Tempo caricamento < 2s" : "Loading time < 2s",
      ],
      tech: ["Next.js", "Strapi", "AWS"],
    },
    {
      title: "Fashion E-commerce",
      description:
        language === "it" ? "Piattaforma e-commerce con 10k+ prodotti" : "E-commerce platform with 10k+ products",
      image: "/modern-ecommerce-dashboard.png",
      results: [
        language === "it" ? "150% aumento vendite" : "150% sales increase",
        language === "it" ? "40% riduzione abbandoni" : "40% cart abandonment reduction",
        "Mobile-first design",
      ],
      tech: ["React", "Shopify", "Stripe"],
    },
    {
      title: "SaaS Dashboard",
      description:
        language === "it" ? "Applicazione web per gestione progetti" : "Web application for project management",
      image: "/placeholder.svg?height=300&width=400&text=SaaS+Dashboard",
      results: [
        language === "it" ? "Real-time collaboration" : "Real-time collaboration",
        "99.9% uptime",
        language === "it" ? "Scalabilità enterprise" : "Enterprise scalability",
      ],
      tech: ["Vue.js", "Firebase", "Docker"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-green-600/20 backdrop-blur-lg border-b border-green-300/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
              >
                Digital Aura
              </motion.div>
            </Link>
            <div className="flex space-x-6">
              <Link href="/" className="text-white/80 hover:text-green-400 transition-colors">
                {t("service.nav.home")}
              </Link>
              <Link href="/services/ai-automation" className="text-white/80 hover:text-green-400 transition-colors">
                AI Automation
              </Link>
              <Link href="/services/chatbot" className="text-white/80 hover:text-green-400 transition-colors">
                Chatbot
              </Link>
              <Link href="/services/ai-marketing" className="text-white/80 hover:text-green-400 transition-colors">
                AI Marketing
              </Link>
              <Link href="/appointments" className="text-white/80 hover:text-green-400 transition-colors">
                {t("service.nav.appointments")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
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
              className="inline-block p-4 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 mb-6"
            >
              <Globe className="w-16 h-16 text-green-400" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
              Web & App Development
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              {language === "it"
                ? "Creiamo esperienze digitali straordinarie. Siti web moderni, applicazioni performanti e soluzioni su misura per far crescere il tuo business online."
                : "We create extraordinary digital experiences. Modern websites, high-performance applications and tailor-made solutions to grow your online business."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3"
                >
                  {language === "it" ? "Inizia il Tuo Progetto" : "Start Your Project"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/chatbot">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
                >
                  {t("service.cta.consultation")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "I Nostri Servizi" : "Our Services"}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {language === "it"
                ? "Soluzioni complete per ogni esigenza digitale"
                : "Complete solutions for every digital need"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-lg h-full">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 mr-4">
                        <div className="text-green-400">{service.icon}</div>
                      </div>
                      <CardTitle className="text-2xl text-white">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-white/70 text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-white/80">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Perché Scegliere Digital Aura" : "Why Choose Digital Aura"}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {language === "it"
                ? "I vantaggi che distinguono i nostri progetti web"
                : "The advantages that distinguish our web projects"}
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
                <Card className="bg-white/5 border-white/10 backdrop-blur-lg h-full text-center">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex p-4 rounded-full bg-gradient-to-r ${benefit.color} mb-4 mx-auto`}
                    >
                      <div className="text-white">{benefit.icon}</div>
                    </motion.div>
                    <CardTitle className="text-xl text-white">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Tecnologie All'Avanguardia" : "Cutting-Edge Technologies"}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {language === "it"
                ? "Utilizziamo le tecnologie più moderne per garantire performance e scalabilità"
                : "We use the most modern technologies to ensure performance and scalability"}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg text-center"
              >
                <h3 className="text-white font-semibold mb-1">{tech.name}</h3>
                <Badge variant="outline" className="border-green-400/30 text-green-300 text-xs">
                  {tech.category}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Progetti di Successo" : "Success Projects"}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {language === "it"
                ? "Alcuni esempi dei nostri lavori più significativi"
                : "Some examples of our most significant works"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-lg overflow-hidden h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                    <CardDescription className="text-white/70">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-semibold mb-2">
                          {language === "it" ? "Risultati:" : "Results:"}
                        </h4>
                        <ul className="space-y-1">
                          {project.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="text-white/80 text-sm flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">
                          {language === "it" ? "Tecnologie:" : "Technologies:"}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="border-green-400/30 text-green-300 text-xs"
                            >
                              {tech}
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
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Il Nostro Processo" : "Our Process"}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {language === "it"
                ? "Un approccio strutturato per garantire il successo del tuo progetto"
                : "A structured approach to ensure the success of your project"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: language === "it" ? "Analisi" : "Analysis",
                description:
                  language === "it"
                    ? "Comprendiamo le tue esigenze e obiettivi"
                    : "We understand your needs and objectives",
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Design",
                description:
                  language === "it"
                    ? "Creiamo mockup e prototipi interattivi"
                    : "We create mockups and interactive prototypes",
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: language === "it" ? "Sviluppo" : "Development",
                description:
                  language === "it"
                    ? "Realizziamo il progetto con tecnologie moderne"
                    : "We realize the project with modern technologies",
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Launch",
                description: language === "it" ? "Deploy e supporto post-lancio" : "Deploy and post-launch support",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex p-4 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 mb-4"
                >
                  <div className="text-green-400">{step.icon}</div>
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/50 to-emerald-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it"
                ? "Pronto a Trasformare la Tua Presenza Online?"
                : "Ready to Transform Your Online Presence?"}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {language === "it"
                ? "Inizia oggi stesso il tuo progetto web. Consulenza gratuita e preventivo personalizzato."
                : "Start your web project today. Free consultation and personalized quote."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-green-900 hover:bg-white/90 px-8 py-3 font-semibold">
                    {language === "it" ? "Inizia il Tuo Progetto" : "Start Your Project"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/chatbot">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-3 bg-transparent"
                  >
                    {t("service.cta.consultation")}
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
