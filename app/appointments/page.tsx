"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarIcon, Clock, CheckCircle, Star, Zap, BarChart3, Headphones } from "lucide-react"
import { format, addDays, isAfter, isBefore, startOfDay } from "date-fns"
import { it, enUS } from "date-fns/locale"
import Link from "next/link"
import { useLanguage } from "@/app/contexts/language-context"

interface AppointmentType {
  id: string
  title: string
  description: string
  duration: string
  price: string
  icon: React.ReactNode
  color: string
  bgColor: string
  features: string[]
  popular?: boolean
}

interface TimeSlot {
  time: string
  available: boolean
  occupied?: boolean
}

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
  appointmentType: string
  date: Date | null
  time: string
}

export default function AppointmentsPage() {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState<AppointmentType | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    appointmentType: "",
    date: null,
    time: "",
  })

  const appointmentTypes: AppointmentType[] = [
    {
      id: "strategic-consultation",
      title: language === "it" ? "Consulenza Strategica" : "Strategic Consultation",
      description:
        language === "it"
          ? "Strategia digitale personalizzata per il tuo business"
          : "Personalized digital strategy for your business",
      duration: "30",
      price: language === "it" ? "Gratuito" : "Free",
      icon: <Star className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 border-purple-200",
      features:
        language === "it"
          ? ["Analisi completa del business", "Strategia personalizzata", "Piano d'azione dettagliato"]
          : ["Complete business analysis", "Personalized strategy", "Detailed action plan"],
      popular: true,
    },
    {
      id: "personalized-demo",
      title: language === "it" ? "Demo Personalizzata" : "Personalized Demo",
      description:
        language === "it" ? "Vedi le nostre soluzioni AI in azione dal vivo" : "See our AI solutions in action live",
      duration: "30",
      price: language === "it" ? "Gratuito" : "Free",
      icon: <Zap className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
      features:
        language === "it"
          ? ["Demo live personalizzata", "Q&A in tempo reale", "Prova delle funzionalità"]
          : ["Personalized live demo", "Real-time Q&A", "Feature testing"],
    },
    {
      id: "project-analysis",
      title: language === "it" ? "Analisi Progetto" : "Project Analysis",
      description:
        language === "it"
          ? "Valutazione tecnica approfondita del tuo progetto"
          : "In-depth technical evaluation of your project",
      duration: "30",
      price: language === "it" ? "Gratuito" : "Free",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200",
      features:
        language === "it"
          ? ["Analisi tecnica dettagliata", "Stima tempi e costi", "Roadmap implementazione"]
          : ["Detailed technical analysis", "Time and cost estimation", "Implementation roadmap"],
    },
    {
      id: "priority-support",
      title: language === "it" ? "Supporto Prioritario" : "Priority Support",
      description:
        language === "it" ? "Risoluzione rapida per problemi critici" : "Quick resolution for critical issues",
      duration: "30",
      price: language === "it" ? "Gratuito" : "Free",
      icon: <Headphones className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200",
      features:
        language === "it"
          ? ["Supporto immediato", "Risoluzione prioritaria", "Follow-up garantito"]
          : ["Immediate support", "Priority resolution", "Guaranteed follow-up"],
    },
  ]

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate)
    }
  }, [selectedDate])

  const fetchAvailability = async (date: Date) => {
    setIsLoading(true)
    try {
      const dateStr = format(date, "yyyy-MM-dd")
      console.log("🔍 Fetching availability for date:", dateStr)

      const response = await fetch(`/api/appointments/availability?date=${dateStr}`)
      const data = await response.json()

      console.log("📅 Availability response:", data)

      if (data.success) {
        const occupiedTimes = data.occupied_slots || []
        console.log("⏰ Occupied times:", occupiedTimes)

        const slots = timeSlots.map((time) => ({
          time,
          available: !occupiedTimes.includes(time),
          occupied: occupiedTimes.includes(time),
        }))

        console.log("🎯 Generated slots:", slots)
        setAvailableSlots(slots)
      } else {
        console.error("❌ Error fetching availability:", data.error)
        // Fallback: tutti gli slot disponibili
        setAvailableSlots(timeSlots.map((time) => ({ time, available: true, occupied: false })))
      }
    } catch (error) {
      console.error("❌ Error fetching availability:", error)
      // Fallback: tutti gli slot disponibili
      setAvailableSlots(timeSlots.map((time) => ({ time, available: true, occupied: false })))
    } finally {
      setIsLoading(false)
    }
  }

  const handleTypeSelect = (type: AppointmentType) => {
    setSelectedType(type)
    setFormData((prev) => ({ ...prev, appointmentType: type.id }))
    setCurrentStep(2)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setFormData((prev) => ({ ...prev, date }))
      setSelectedTime("")
    }
  }

  const handleTimeSelect = async (time: string) => {
    if (!selectedDate) return

    // Double check availability before selecting
    const dateStr = format(selectedDate, "yyyy-MM-dd")

    try {
      console.log("🔍 Double-checking availability for:", { date: dateStr, time })

      const response = await fetch("/api/appointments/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: dateStr, time }),
      })

      const data = await response.json()
      console.log("📊 Availability check result:", data)

      if (data.available) {
        setSelectedTime(time)
        setFormData((prev) => ({ ...prev, time }))
        setCurrentStep(3)
      } else {
        alert(
          language === "it"
            ? "Questo orario è stato appena prenotato da qualcun altro. Seleziona un altro orario."
            : "This time slot was just booked by someone else. Please select another time.",
        )
        // Refresh availability
        fetchAvailability(selectedDate)
      }
    } catch (error) {
      console.error("❌ Error checking availability:", error)
      alert(
        language === "it"
          ? "Errore nel controllo disponibilità. Riprova."
          : "Error checking availability. Please try again.",
      )
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("📝 Submitting appointment:", formData)

      // Final availability check before submission
      if (selectedDate && selectedTime) {
        const dateStr = format(selectedDate, "yyyy-MM-dd")

        const availabilityCheck = await fetch("/api/appointments/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: dateStr, time: selectedTime }),
        })

        const availabilityData = await availabilityCheck.json()

        if (!availabilityData.available) {
          alert(
            language === "it"
              ? "Questo orario è stato appena prenotato. Seleziona un altro orario."
              : "This time slot was just booked. Please select another time.",
          )
          setCurrentStep(2)
          fetchAvailability(selectedDate)
          return
        }
      }

      const appointmentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: selectedType?.title || formData.appointmentType,
        date: formData.date ? format(formData.date, "yyyy-MM-dd") : "",
        time: formData.time,
        message:
          formData.message ||
          `${language === "it" ? "Richiesta appuntamento per" : "Appointment request for"}: ${selectedType?.title}`,
        status: "pending" as const,
        priority: selectedType?.id === "priority-support",
      }

      console.log("🚀 Sending appointment data:", appointmentData)

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })

      const result = await response.json()
      console.log("✅ Appointment response:", result)

      if (result.success) {
        setSubmitSuccess(true)
        setCurrentStep(4)

        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            message: "",
            appointmentType: "",
            date: null,
            time: "",
          })
          setSelectedType(null)
          setSelectedDate(null)
          setSelectedTime("")
          setCurrentStep(1)
          setSubmitSuccess(false)
        }, 5000)
      } else {
        console.error("❌ Error submitting appointment:", result.error)

        if (result.occupied) {
          alert(
            language === "it"
              ? "Questo orario è stato appena prenotato. Seleziona un altro orario."
              : "This time slot was just booked. Please select another time.",
          )
          setCurrentStep(2)
          if (selectedDate) fetchAvailability(selectedDate)
        } else {
          alert(
            language === "it"
              ? "Errore nell'invio della richiesta. Riprova."
              : "Error submitting request. Please try again.",
          )
        }
      }
    } catch (error) {
      console.error("❌ Error submitting appointment:", error)
      alert(
        language === "it"
          ? "Errore nell'invio della richiesta. Riprova."
          : "Error submitting request. Please try again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date())
    const maxDate = addDays(today, 60) // 60 giorni nel futuro
    return isBefore(date, today) || isAfter(date, maxDate)
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {language === "it" ? "Prenota Appuntamento" : "Book Appointment"}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {language === "it" ? "Scegli il servizio perfetto per te" : "Choose the perfect service for you"}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      step <= currentStep
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-8 h-1 mx-2 rounded-full transition-all ${
                        step < currentStep ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          {/* Step 2: Select Date & Time */}
          {currentStep === 2 && selectedType && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-gray-900 mb-4"
                >
                  {language === "it" ? "Scegli Data e Orario" : "Choose Date and Time"}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-600"
                >
                  {language === "it"
                    ? `Seleziona quando vuoi la tua ${selectedType.title.toLowerCase()}`
                    : `Select when you want your ${selectedType.title.toLowerCase()}`}
                </motion.p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Time Slots */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <Card className="p-6 shadow-lg border-0 h-full">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-xl text-gray-900 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-purple-600" />
                        {language === "it" ? "Orari Disponibili" : "Available Times"}
                      </CardTitle>
                      {selectedDate && (
                        <p className="text-gray-600 text-sm">
                          {format(selectedDate, "EEEE, d MMMM yyyy", {
                            locale: language === "it" ? it : enUS,
                          })}
                        </p>
                      )}
                    </CardHeader>

                    {!selectedDate ? (
                      <div className="text-center py-12">
                        <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          {language === "it" ? "Seleziona prima una data" : "Please select a date first"}
                        </p>
                      </div>
                    ) : isLoading ? (
                      <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">
                          {language === "it" ? "Caricamento orari..." : "Loading times..."}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                          {availableSlots.map((slot) => (
                            <Button
                              key={slot.time}
                              variant={selectedTime === slot.time ? "default" : "outline"}
                              className={`p-3 h-auto transition-all ${
                                slot.occupied
                                  ? "bg-red-50 border-red-200 text-red-600 cursor-not-allowed opacity-60"
                                  : selectedTime === slot.time
                                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                                    : slot.available
                                      ? "bg-white hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600"
                                      : "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                              }`}
                              onClick={() => slot.available && !slot.occupied && handleTimeSelect(slot.time)}
                              disabled={!slot.available || slot.occupied}
                            >
                              <div className="text-center">
                                <div className="font-semibold">{slot.time}</div>
                                <div className="text-xs opacity-75">
                                  {slot.occupied
                                    ? language === "it"
                                      ? "Occupato"
                                      : "Occupied"
                                    : slot.available
                                      ? language === "it"
                                        ? "Disponibile"
                                        : "Available"
                                      : language === "it"
                                        ? "Non disponibile"
                                        : "Unavailable"}
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>

                        {/* Legend */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                            {language === "it" ? "Legenda:" : "Legend:"}
                          </h4>
                          <div className="grid grid-cols-3 gap-4 text-xs">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-white border border-gray-300 rounded mr-2"></div>
                              <span className="text-gray-600">{language === "it" ? "Disponibile" : "Available"}</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded mr-2"></div>
                              <span className="text-gray-600">{language === "it" ? "Occupato" : "Occupied"}</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded mr-2"></div>
                              <span className="text-gray-600">{language === "it" ? "Selezionato" : "Selected"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
