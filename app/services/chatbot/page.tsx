"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bot,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Clock,
  Globe,
  Users,
  Zap,
  Brain,
  Shield,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../../contexts/language-context"

export default function ChatbotPage() {
  const { t, language } = useLanguage()

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: language === "it" ? "Supporto 24/7" : "24/7 Support",
      description:
        language === "it"
          ? "I tuoi clienti ricevono assistenza immediata in qualsiasi momento"
          : "Your customers receive immediate assistance at any time",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === "it" ? "Riduzione Carico Lavoro" : "Workload Reduction",
      description:
        language === "it"
          ? "Libera il tuo team dalle domande ripetitive per concentrarsi su attività strategiche"
          : "Free your team from repetitive questions to focus on strategic activities",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: language === "it" ? "Multilingue" : "Multilingual",
      description:
        language === "it"
          ? "Comunica con clienti internazionali nella loro lingua madre"
          : "Communicate with international customers in their native language",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: language === "it" ? "Analytics Avanzati" : "Advanced Analytics",
      description:
        language === "it"
          ? "Ottieni insights preziosi dalle conversazioni con i clienti"
          : "Get valuable insights from customer conversations",
      color: "from-orange-500 to-red-500",
    },
  ]

  const features = [
    language === "it" ? "Natural Language Processing avanzato" : "Advanced Natural Language Processing",
    language === "it" ? "Integrazione con CRM e database" : "CRM and database integration",
    language === "it" ? "Personalizzazione completa" : "Complete customization",
    language === "it" ? "Escalation automatica agli operatori" : "Automatic escalation to operators",
    language === "it"
      ? "Supporto multicanale (web, WhatsApp, Telegram)"
      : "Multi-channel support (web, WhatsApp, Telegram)",
    language === "it" ? "Machine Learning continuo" : "Continuous Machine Learning",
    language === "it" ? "Dashboard analytics in tempo reale" : "Real-time analytics dashboard",
    language === "it" ? "API per integrazioni custom" : "APIs for custom integrations",
  ]

  const useCases = [
    {
      title: "Customer Service",
      description:
        language === "it"
          ? "Gestione automatica di FAQ, reclami e richieste di supporto"
          : "Automatic management of FAQs, complaints and support requests",
      example:
        language === "it"
          ? "Un'azienda di telecomunicazioni ha ridotto del 80% i tempi di attesa del customer service"
          : "A telecommunications company reduced customer service waiting times by 80%",
      icon: <MessageCircle className="w-8 h-8" />,
    },
    {
      title: "E-commerce",
      description:
        language === "it"
          ? "Assistenza agli acquisti, tracking ordini e raccomandazioni prodotti"
          : "Shopping assistance, order tracking and product recommendations",
      example:
        language === "it"
          ? "Un negozio online ha aumentato le conversioni del 35% con il nostro chatbot di vendita"
          : "An online store increased conversions by 35% with our sales chatbot",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Lead Generation",
      description:
        language === "it"
          ? "Qualificazione automatica dei lead e prenotazione appuntamenti"
          : "Automatic lead qualification and appointment booking",
      example:
        language === "it"
          ? "Un'agenzia immobiliare ha triplicato i lead qualificati con il chatbot"
          : "A real estate agency tripled qualified leads with the chatbot",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: language === "it" ? "Formazione" : "Training",
      description:
        language === "it"
          ? "Tutoring personalizzato e supporto educativo interattivo"
          : "Personalized tutoring and interactive educational support",
      example:
        language === "it"
          ? "Una scuola online ha migliorato del 50% il tasso di completamento dei corsi"
          : "An online school improved course completion rates by 50%",
      icon: <Brain className="w-8 h-8" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600/20 backdrop-blur-lg border-b border-blue-300/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              >
                Digital Aura
              </motion.div>
            </Link>
            <div className="flex space-x-6">
              <Link href="/" className="text-white/80 hover:text-blue-400 transition-colors">
                {t("service.nav.home")}
              </Link>
              <Link href="/services/ai-automation" className="text-white/80 hover:text-blue-400 transition-colors">
                AI Automation
              </Link>
              <Link href="/services/web-development" className="text-white/80 hover:text-blue-400 transition-colors">
                Web Development
              </Link>
              <Link href="/services/ai-marketing" className="text-white/80 hover:text-blue-400 transition-colors">
                AI Marketing
              </Link>
              <Link href="/appointments" className="text-white/80 hover:text-blue-400 transition-colors">
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
              className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 mb-6"
            >
              <Bot className="w-16 h-16 text-blue-400" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              {language === "it" ? "Chatbot AI" : "AI Chatbots"}
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              {language === "it"
                ? "Rivoluziona il tuo customer service con chatbot intelligenti che comprendono, imparano e risolvono. Disponibili 24/7 per i tuoi clienti."
                : "Revolutionize your customer service with intelligent chatbots that understand, learn and solve. Available 24/7 for your customers."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chatbot">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3"
                >
                  {language === "it" ? "Prova il Nostro Chatbot" : "Try Our Chatbot"}
                  <MessageCircle className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/appointments">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
                >
                  {language === "it" ? "Richiedi Demo Personalizzata" : "Request Custom Demo"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Prova l'Esperienza" : "Try the Experience"}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {language === "it"
                ? "Interagisci con il nostro chatbot demo e scopri le sue capacità"
                : "Interact with our demo chatbot and discover its capabilities"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white flex items-center justify-center">
                  <Bot className="w-8 h-8 mr-3 text-blue-400" />
                  {language === "it" ? "Chatbot Demo Interattivo" : "Interactive Demo Chatbot"}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {language === "it"
                    ? "Questo chatbot può rispondere a domande sui nostri servizi e aiutarti a prenotare un appuntamento"
                    : "This chatbot can answer questions about our services and help you book an appointment"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <Bot className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-white/80 mb-6">
                      {language === "it"
                        ? "Il chatbot interattivo sarà disponibile qui. Clicca il pulsante qui sotto per iniziare una conversazione."
                        : "The interactive chatbot will be available here. Click the button below to start a conversation."}
                    </p>
                    <Link href="/chatbot">
                      <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                        {language === "it" ? "Avvia Conversazione" : "Start Conversation"}
                        <MessageCircle className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
              {language === "it" ? "Vantaggi dei Nostri Chatbot" : "Benefits of Our Chatbots"}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {language === "it"
                ? "Scopri come i nostri chatbot AI possono trasformare la tua comunicazione con i clienti"
                : "Discover how our AI chatbots can transform your customer communication"}
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
                <Card className="bg-white/5 border-white/10 backdrop-blur-lg h-full">
                  <CardHeader className="text-center">
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
                    <CardDescription className="text-white/70 text-center">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              {language === "it" ? "Tecnologie Avanzate" : "Advanced Technologies"}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {language === "it"
                ? "I nostri chatbot utilizzano le tecnologie AI più avanzate per offrire esperienze conversazionali naturali"
                : "Our chatbots use the most advanced AI technologies to offer natural conversational experiences"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-white/90">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
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
              {language === "it" ? "Applicazioni Pratiche" : "Practical Applications"}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {language === "it"
                ? "Scopri come i nostri chatbot stanno rivoluzionando diversi settori"
                : "Discover how our chatbots are revolutionizing different sectors"}
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
                <Card className="bg-white/5 border-white/10 backdrop-blur-lg h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 mr-4">
                        <div className="text-blue-400">{useCase.icon}</div>
                      </div>
                      {useCase.title}
                    </CardTitle>
                    <CardDescription className="text-white/70 text-base">{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/20">
                      <p className="text-white/90 italic">
                        <strong>{language === "it" ? "Caso di Successo:" : "Success Case:"}</strong> {useCase.example}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it" ? "Sicurezza e Privacy" : "Security and Privacy"}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {language === "it"
                ? "I tuoi dati e quelli dei tuoi clienti sono protetti con i più alti standard di sicurezza. Conformità GDPR e crittografia end-to-end garantite."
                : "Your data and that of your customers are protected with the highest security standards. GDPR compliance and end-to-end encryption guaranteed."}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {language === "it" ? "Crittografia SSL" : "SSL Encryption"}
                </h3>
                <p className="text-white/70">
                  {language === "it"
                    ? "Tutte le comunicazioni sono protette con crittografia SSL/TLS"
                    : "All communications are protected with SSL/TLS encryption"}
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {language === "it" ? "Conformità GDPR" : "GDPR Compliance"}
                </h3>
                <p className="text-white/70">
                  {language === "it"
                    ? "Piena conformità alle normative europee sulla privacy"
                    : "Full compliance with European privacy regulations"}
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {language === "it" ? "Backup Sicuri" : "Secure Backups"}
                </h3>
                <p className="text-white/70">
                  {language === "it"
                    ? "Backup automatici e ridondanza dei dati garantita"
                    : "Automatic backups and guaranteed data redundancy"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "it"
                ? "Pronto a Rivoluzionare il Tuo Customer Service?"
                : "Ready to Revolutionize Your Customer Service?"}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {language === "it"
                ? "Inizia oggi stesso con il nostro chatbot AI. Demo gratuita e setup personalizzato inclusi."
                : "Start today with our AI chatbot. Free demo and personalized setup included."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chatbot">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90 px-8 py-3 font-semibold">
                    {language === "it" ? "Prova il Chatbot Ora" : "Try Chatbot Now"}
                    <MessageCircle className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/appointments">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-3 bg-transparent"
                  >
                    {language === "it" ? "Richiedi Demo Personalizzata" : "Request Custom Demo"}
                    <ArrowRight className="ml-2 w-5 h-5" />
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
