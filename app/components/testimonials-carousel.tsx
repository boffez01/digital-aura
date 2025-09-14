"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Marco Rossi",
    company: "TechStart SRL",
    role: "CEO",
    content:
      "Digital Aura ha trasformato completamente il nostro processo di vendita con il loro sistema AI. Le vendite sono aumentate del 40% in soli 3 mesi!",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=MR",
  },
  {
    id: 2,
    name: "Laura Bianchi",
    company: "Fashion Forward",
    role: "Marketing Director",
    content:
      "Il chatbot sviluppato da Digital Aura ha rivoluzionato il nostro customer service. Ora possiamo assistere i clienti 24/7 con risultati eccellenti.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=LB",
  },
  {
    id: 3,
    name: "Giuseppe Verdi",
    company: "Consulenza Pro",
    role: "Founder",
    content:
      "Il nuovo sito web ha superato ogni aspettativa. Design moderno, velocità incredibile e un aumento del 300% nel traffico organico.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=GV",
  },
  {
    id: 4,
    name: "Sofia Romano",
    company: "E-commerce Plus",
    role: "Operations Manager",
    content:
      "L'automazione AI implementata da Digital Aura ci ha fatto risparmiare 20 ore di lavoro a settimana. Incredibile efficienza!",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=SR",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <motion.h4
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="text-xl font-semibold text-white"
                    >
                      {testimonials[currentIndex].name}
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="text-white/70"
                    >
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="flex mb-4"
                >
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.2 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  className="text-lg text-white/90 italic leading-relaxed"
                >
                  "{testimonials[currentIndex].content}"
                </motion.blockquote>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={prevTestimonial}
          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-purple-400" : "bg-white/30"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextTestimonial}
          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Auto-play indicator */}
      <div className="flex justify-center mt-4">
        <motion.button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`text-sm px-3 py-1 rounded-full transition-all ${
            isAutoPlaying ? "bg-purple-500/20 text-purple-300" : "bg-white/10 text-white/60"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? "Auto-play ON" : "Auto-play OFF"}
        </motion.button>
      </div>
    </div>
  )
}

// Named export
export { TestimonialsCarousel }
