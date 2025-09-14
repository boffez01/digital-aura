"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "../contexts/language-context"

const testimonials = {
  it: [
    {
      name: "Marco Rossi",
      role: "CEO, TechInnovate",
      company: "TechInnovate S.r.l.",
      quote:
        "Digital Aura ha rivoluzionato completamente il nostro processo di customer service. Il chatbot AI ha ridotto i tempi di risposta del 80% e aumentato la soddisfazione clienti.",
      rating: 5,
      image: "/professional-businessman.png",
    },
    {
      name: "Laura Bianchi",
      role: "Marketing Director",
      company: "Fashion Forward",
      quote:
        "L'automazione AI per il marketing ha aumentato le nostre conversioni del 150%. Un investimento che si è ripagato in meno di 3 mesi.",
      rating: 5,
      image: "/professional-businesswoman.png",
    },
    {
      name: "Giuseppe Verdi",
      role: "Operations Manager",
      company: "LogiFlow",
      quote:
        "La soluzione di automazione dei processi ha ottimizzato la nostra supply chain, riducendo i costi operativi del 35% e migliorando l'efficienza.",
      rating: 5,
      image: "/professional-manager.png",
    },
  ],
  en: [
    {
      name: "Marco Rossi",
      role: "CEO, TechInnovate",
      company: "TechInnovate S.r.l.",
      quote:
        "Digital Aura completely revolutionized our customer service process. The AI chatbot reduced response times by 80% and increased customer satisfaction.",
      rating: 5,
      image: "/professional-businessman.png",
    },
    {
      name: "Laura Bianchi",
      role: "Marketing Director",
      company: "Fashion Forward",
      quote:
        "AI marketing automation increased our conversions by 150%. An investment that paid for itself in less than 3 months.",
      rating: 5,
      image: "/professional-businesswoman.png",
    },
    {
      name: "Giuseppe Verdi",
      role: "Operations Manager",
      company: "LogiFlow",
      quote:
        "The process automation solution optimized our supply chain, reducing operational costs by 35% and improving efficiency.",
      rating: 5,
      image: "/professional-manager.png",
    },
  ],
}

export default function TestimonialsCarousel() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const currentTestimonials = testimonials[language]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentTestimonials.length, isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background to-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            {language === "it" ? "Cosa Dicono i Nostri Clienti" : "What Our Clients Say"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "it"
              ? "Storie di successo reali da aziende che hanno trasformato il loro business con le nostre soluzioni AI"
              : "Real success stories from companies that transformed their business with our AI solutions"}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-background/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-12">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                          <img
                            src={currentTestimonials[currentIndex].image || "/placeholder.svg"}
                            alt={currentTestimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-4">
                          {[...Array(currentTestimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        <blockquote className="text-xl lg:text-2xl font-medium text-foreground mb-6 leading-relaxed">
                          "{currentTestimonials[currentIndex].quote}"
                        </blockquote>

                        <div>
                          <div className="font-semibold text-lg text-foreground">
                            {currentTestimonials[currentIndex].name}
                          </div>
                          <div className="text-primary font-medium">{currentTestimonials[currentIndex].role}</div>
                          <div className="text-muted-foreground">{currentTestimonials[currentIndex].company}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={goToNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {currentTestimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
