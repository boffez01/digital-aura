"use client"

import { motion } from "framer-motion"
import { ArrowRight, Target, TrendingUp, Users, Zap, BarChart3, MessageSquare, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLanguage } from "../../contexts/language-context"
import FAQSection from "../../components/faq-section"
import ChatbotWidget from "../../components/chatbot-widget"

const features = [
  {
    icon: Target,
    title: { it: "Targeting Intelligente", en: "Smart Targeting" },
    description: {
      it: "Identifica automaticamente i clienti ideali usando algoritmi di machine learning avanzati",
      en: "Automatically identify ideal customers using advanced machine learning algorithms",
    },
  },
  {
    icon: TrendingUp,
    title: { it: "Ottimizzazione Campagne", en: "Campaign Optimization" },
    description: {
      it: "Ottimizza budget e performance delle campagne in tempo reale per massimizzare il ROI",
      en: "Optimize budget and campaign performance in real-time to maximize ROI",
    },
  },
  {
    icon: Users,
    title: { it: "Segmentazione Avanzata", en: "Advanced Segmentation" },
    description: {
      it: "Crea segmenti di pubblico ultra-specifici basati su comportamenti e preferenze",
      en: "Create ultra-specific audience segments based on behaviors and preferences",
    },
  },
  {
    icon: MessageSquare,
    title: { it: "Contenuti Personalizzati", en: "Personalized Content" },
    description: {
      it: "Genera contenuti marketing personalizzati per ogni segmento di pubblico",
      en: "Generate personalized marketing content for each audience segment",
    },
  },
  {
    icon: BarChart3,
    title: { it: "Analytics Predittivi", en: "Predictive Analytics" },
    description: {
      it: "Prevedi trend di mercato e comportamenti dei clienti con precisione",
      en: "Predict market trends and customer behaviors with precision",
    },
  },
  {
    icon: Zap,
    title: { it: "Automazione Completa", en: "Complete Automation" },
    description: {
      it: "Automatizza l'intero funnel di marketing dalla lead generation alla conversione",
      en: "Automate the entire marketing funnel from lead generation to conversion",
    },
  },
]

const benefits = [
  {
    metric: "300%",
    label: { it: "Aumento Lead Qualificati", en: "Increase in Qualified Leads" },
  },
  {
    metric: "85%",
    label: { it: "Riduzione Costi Acquisizione", en: "Reduction in Acquisition Costs" },
  },
  {
    metric: "24/7",
    label: { it: "Ottimizzazione Automatica", en: "Automatic Optimization" },
  },
  {
    metric: "45%",
    label: { it: "Miglioramento Conversioni", en: "Conversion Improvement" },
  },
]

const testimonials = [
  {
    name: "Marco Rossi",
    company: "TechStart Milano",
    content: {
      it: "L'AI marketing di Digital Aura ha trasformato completamente la nostra strategia. Abbiamo triplicato i lead qualificati in soli 3 mesi!",
      en: "Digital Aura's AI marketing completely transformed our strategy. We tripled qualified leads in just 3 months!",
    },
    rating: 5,
  },
  {
    name: "Sofia Chen",
    company: "E-commerce Plus",
    content: {
      it: "Incredibile come l'automazione AI abbia ottimizzato le nostre campagne. ROI aumentato del 250% e tempo risparmiato enorme.",
      en: "Amazing how AI automation optimized our campaigns. ROI increased by 250% and saved enormous time.",
    },
    rating: 5,
  },
]

const processSteps = [
  {
    step: "01",
    title: { it: "Analisi Dati", en: "Data Analysis" },
    description: {
      it: "Analizziamo i tuoi dati storici e il comportamento dei clienti",
      en: "We analyze your historical data and customer behavior",
    },
  },
  {
    step: "02",
    title: { it: "Setup AI", en: "AI Setup" },
    description: {
      it: "Configuriamo algoritmi personalizzati per il tuo business",
      en: "We configure personalized algorithms for your business",
    },
  },
  {
    step: "03",
    title: { it: "Lancio Campagne", en: "Campaign Launch" },
    description: {
      it: "Lanciamo campagne ottimizzate dall'intelligenza artificiale",
      en: "We launch campaigns optimized by artificial intelligence",
    },
  },
  {
    step: "04",
    title: { it: "Ottimizzazione", en: "Optimization" },
    description: {
      it: "Monitoriamo e ottimizziamo continuamente le performance",
      en: "We continuously monitor and optimize performance",
    },
  },
]

export default function AIMarketingPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-orange-600/20 backdrop-blur-lg border-b border-orange-300/20 shadow-sm">
        {/* Navigation content here */}
      </nav>

      <ChatbotWidget />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-orange-100 text-orange-700 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              {language === "it" ? "AI Marketing Avanzato" : "Advanced AI Marketing"}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              {language === "it" ? (
                <>
                  Marketing{" "}
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Intelligente
                  </span>
                  <br />
                  che Converte
                </>
              ) : (
                <>
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Smart
                  </span>{" "}
                  Marketing
                  <br />
                  that Converts
                </>
              )}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              {language === "it"
                ? "Trasforma il tuo marketing con l'intelligenza artificiale. Automatizza campagne, ottimizza budget e aumenta conversioni con algoritmi predittivi avanzati."
                : "Transform your marketing with artificial intelligence. Automate campaigns, optimize budgets, and increase conversions with advanced predictive algorithms."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {language === "it" ? "Inizia Ora" : "Get Started"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 hover:bg-gray-50 bg-transparent"
              >
                {language === "it" ? "Vedi Demo" : "View Demo"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  {benefit.metric}
                </div>
                <div className="text-gray-600 font-medium">{benefit.label[language]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {language === "it" ? "Funzionalità Avanzate" : "Advanced Features"}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {language === "it"
                ? "Scopri come la nostra AI rivoluziona ogni aspetto del tuo marketing digitale"
                : "Discover how our AI revolutionizes every aspect of your digital marketing"}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title[language]}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description[language]}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {language === "it" ? "Come Funziona" : "How It Works"}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {language === "it"
                ? "Il nostro processo in 4 step per trasformare il tuo marketing"
                : "Our 4-step process to transform your marketing"}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title[language]}</h3>
                <p className="text-gray-600">{step.description[language]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Risultati Comprovati Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {language === "it" ? "Risultati Comprovati" : "Proven Results"}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {language === "it"
                ? "Casi studio reali di clienti che hanno trasformato il loro marketing con la nostra AI"
                : "Real case studies of clients who transformed their marketing with our AI"}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {[
              {
                company: "TechStart Milano",
                sector: "SaaS B2B",
                challenge:
                  language === "it"
                    ? "Basso tasso di conversione (0.5%) e alto costo per lead (€150)"
                    : "Low conversion rate (0.5%) and high cost per lead (€150)",
                solution:
                  language === "it"
                    ? "Implementazione AI per targeting intelligente e personalizzazione contenuti"
                    : "AI implementation for smart targeting and content personalization",
                results: [
                  { metric: "5x", label: language === "it" ? "Aumento Conversioni" : "Conversion Increase" },
                  { metric: "70%", label: language === "it" ? "Riduzione Costo Lead" : "Lead Cost Reduction" },
                  { metric: "€2.5M", label: language === "it" ? "Fatturato Aggiuntivo" : "Additional Revenue" },
                ],
                timeline: language === "it" ? "3 mesi" : "3 months",
              },
              {
                company: "Fashion E-commerce",
                sector: "Retail Online",
                challenge:
                  language === "it"
                    ? "Carrelli abbandonati 75% e basso lifetime value clienti"
                    : "75% cart abandonment and low customer lifetime value",
                solution:
                  language === "it"
                    ? "AI per raccomandazioni prodotto e automazione email marketing"
                    : "AI for product recommendations and email marketing automation",
                results: [
                  { metric: "45%", label: language === "it" ? "Riduzione Abbandoni" : "Abandonment Reduction" },
                  { metric: "180%", label: language === "it" ? "Aumento LTV" : "LTV Increase" },
                  { metric: "€1.8M", label: language === "it" ? "Revenue Aggiuntivo" : "Additional Revenue" },
                ],
                timeline: language === "it" ? "2 mesi" : "2 months",
              },
            ].map((caseStudy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{caseStudy.company}</h3>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-4">{caseStudy.sector}</Badge>
                  <div className="text-sm text-orange-600 font-medium">Timeline: {caseStudy.timeline}</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">{language === "it" ? "Sfida:" : "Challenge:"}</h4>
                    <p className="text-gray-600 text-sm">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {language === "it" ? "Soluzione:" : "Solution:"}
                    </h4>
                    <p className="text-gray-600 text-sm">{caseStudy.solution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {caseStudy.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="text-center bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-orange-600">{result.metric}</div>
                      <div className="text-xs text-gray-600">{result.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strumenti AI Avanzati Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {language === "it" ? "Strumenti AI Avanzati" : "Advanced AI Tools"}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                name: "Smart Targeting",
                description:
                  language === "it"
                    ? "AI che identifica automaticamente i prospect più propensi alla conversione"
                    : "AI that automatically identifies prospects most likely to convert",
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                name: "Content AI",
                description:
                  language === "it"
                    ? "Generazione automatica di contenuti personalizzati per ogni segmento"
                    : "Automatic generation of personalized content for each segment",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                name: "Predictive Analytics",
                description:
                  language === "it"
                    ? "Previsioni accurate su trend di mercato e comportamenti clienti"
                    : "Accurate predictions on market trends and customer behaviors",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                name: "Real-Time Optimization",
                description:
                  language === "it"
                    ? "Ottimizzazione automatica delle campagne in tempo reale"
                    : "Automatic real-time campaign optimization",
              },
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <div className="text-orange-600">{tool.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{tool.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tool.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {language === "it" ? "Cosa Dicono i Clienti" : "What Clients Say"}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content[language]}"</p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              {language === "it"
                ? "Pronto a Rivoluzionare il Tuo Marketing?"
                : "Ready to Revolutionize Your Marketing?"}
            </h2>
            <p className="text-xl text-orange-100 mb-12 max-w-3xl mx-auto">
              {language === "it"
                ? "Inizia oggi stesso e scopri come l'AI può trasformare i tuoi risultati di marketing"
                : "Start today and discover how AI can transform your marketing results"}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
              >
                {language === "it" ? "Richiedi Consulenza Gratuita" : "Request Free Consultation"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/appointments">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                >
                  {language === "it" ? "Prenota Appuntamento" : "Book Appointment"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
