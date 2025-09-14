"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../contexts/language-context"
import Image from "next/image"

export default function TestimonialsCarousel() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: language === "it" ? "Marco Rossi" : "Marco Rossi",
      role: language === "it" ? "CEO, TechStart Italia" : "CEO, TechStart Italy",
      quote:
        language === "it"
          ? "Digital Aura ha trasformato completamente il nostro business. Il chatbot AI ha aumentato le conversioni del 300% e ridotto i costi del supporto clienti del 60%."
          : "Digital Aura completely transformed our business. The AI chatbot increased conversions by 300% and reduced customer support costs by 60%.",
      rating: 5,
      image: "/professional-businessman.png",
    },
    {
      name: language === "it" ? "Laura Bianchi" : "Laura Bianchi",
      role: language === "it" ? "Direttore Marketing, InnovaCorp" : "Marketing Director, InnovaCorp",
      quote:
        language === "it"
          ? "L'automazione AI sviluppata da Digital Aura ci ha permesso di scalare le operazioni senza aumentare il personale. ROI incredibile!"
          : "The AI automation developed by Digital Aura allowed us to scale operations without increasing staff. Incredible ROI!",
      rating: 5,
      image: "/professional-businesswoman.png",
    },
    {
      name: language === "it" ? "Giuseppe Verdi" : "Giuseppe Verdi",
      role: language === "it" ? "Fondatore, E-commerce Plus" : "Founder, E-commerce Plus",
      quote:
        language === "it"
          ? "Il sistema di raccomandazioni AI ha aumentato il valore medio degli ordini del 45%. Un investimento che si è ripagato in 3 mesi."
          : "The AI recommendation system increased average order value by 45%. An investment that paid for itself in 3 months.",
      rating: 5,
      image: "/professional-manager.png",
    },
  ]

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "it" ? "Cosa Dicono i Nostri Clienti" : "What Our Clients Say"}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {language === "it"
              ? "Risultati reali da aziende che hanno trasformato il loro business con l'AI"
              : "Real results from companies that transformed their business with AI"}
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 p-8">
                <CardContent className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-white mb-8 italic leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>

                  <div className="flex items-center justify-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white text-lg">{testimonials[currentIndex].name}</p>
                      <p className="text-slate-400">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 border-slate-600 hover:bg-slate-700"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 border-slate-600 hover:bg-slate-700"
            onClick={nextTestimonial}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-cyan-500" : "bg-slate-600"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
