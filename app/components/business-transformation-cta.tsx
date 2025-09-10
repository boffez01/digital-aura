"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Heart, Clock, Lock, Star } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../contexts/language-context"

export default function BusinessTransformationCTA() {
  const { language } = useLanguage()

  const stats = [
    {
      icon: Heart,
      value: "100%",
      label: language === "it" ? "Soddisfazione Garantita" : "Satisfaction Guaranteed",
    },
    {
      icon: Clock,
      value: "24/7",
      label: language === "it" ? "Supporto Dedicato" : "Dedicated Support",
    },
    {
      icon: Lock,
      value: "SSL",
      label: language === "it" ? "Sicurezza Garantita" : "Guaranteed Security",
    },
    {
      icon: Star,
      value: "5★",
      label: language === "it" ? "Rating Medio" : "Average Rating",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <svg width="60" height="60" className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid-cta" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="white" fillOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-cta)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold mb-8 border border-white/30"
          >
            <span className="mr-2">🚀</span>
            {language === "it" ? "Inizia Oggi" : "Start Today"}
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {language === "it" ? (
              <>
                Pronto a Trasformare il{" "}
                <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
                  Tuo Business?
                </span>
              </>
            ) : (
              <>
                Ready to Transform{" "}
                <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
                  Your Business?
                </span>
              </>
            )}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto"
          >
            {language === "it"
              ? "Unisciti a centinaia di aziende che hanno già rivoluzionato il loro approccio digitale con le nostre soluzioni AI"
              : "Join hundreds of companies that have already revolutionized their digital approach with our AI solutions"}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/appointments">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="mr-2">🚀</span>
                  {language === "it" ? "Richiedi Consulenza Gratuita" : "Request Free Consultation"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/services/chatbot-demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full bg-transparent backdrop-blur-sm"
                >
                  <Play className="mr-2 w-5 h-5" />
                  {language === "it" ? "Prova Demo Gratuita" : "Try Free Demo"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-white/80" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-16 text-center"
          >
            <p className="text-white/70 text-sm mb-4">
              {language === "it"
                ? "Trusted by 500+ companies worldwide • GDPR Compliant • ISO 27001 Certified"
                : "Trusted by 500+ companies worldwide • GDPR Compliant • ISO 27001 Certified"}
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-white/50 text-xs">🏆 AI Excellence Award 2024</div>
              <div className="text-white/50 text-xs">🌟 Top Rated on Clutch</div>
              <div className="text-white/50 text-xs">🔒 Security Verified</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
