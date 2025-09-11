"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { ArrowLeft, CalendarIcon, Clock, CheckCircle, Star, Zap, BarChart3, Headphones } from "lucide-react"
import { format, addDays, isAfter, isBefore, startOfDay } from "date-fns"
import { it, enUS } from "date-fns/locale"
import Link from "next/link"

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
  // Self-contained language management
  const [language, setLanguage] = useState<"it" | "en">("it")
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

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as "it" | "en"
      if (savedLanguage && (savedLanguage === "it" || savedLanguage === "en")) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  // Listen for language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = () => {
        const savedLanguage = localStorage.getItem("language") as "it" | "en"
        if (savedLanguage && (savedLanguage === "it" || savedLanguage === "en")) {
          setLanguage(savedLanguage)
        }
      }

      window.addEventListener("storage", handleStorageChange)
      return () => window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

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
          {/* Step 1: Select Service Type */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
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
                  {language === "it" ? "Che tipo di consulenza ti serve?" : "What type of consultation do you need?"}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-600"
                >
                  {language === "it"
                    ? "Scegli il servizio più adatto alle tue esigenze"
                    : "Choose the service that best fits your needs"}
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {appointmentTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                        type.bgColor
                      } ${type.popular ? "ring-2 ring-purple-500" : ""}`}
                      onClick={() => handleTypeSelect(type)}
                    >
                      {type.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {language === "it" ? "Più Richiesto" : "Most Popular"}
                          </span>
                        </div>
                      )}
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-3 rounded-lg bg-white shadow-sm ${type.color}`}>{type.icon}</div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">{type.price}</div>
                            <div className="text-sm text-gray-500">{type.duration} min</div>
                          </div>
                        </div>
                        <CardTitle className="text-xl text-gray-900">{type.title}</CardTitle>
                        <p className="text-gray-600">{type.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {type.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

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
                {/* Calendar */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="p-6 shadow-lg border-0">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-xl text-gray-900 flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2 text-purple-600" />
                        {language === "it" ? "Seleziona Data" : "Select Date"}
                      </CardTitle>
                    </CardHeader>
                    <Calendar
                      mode="single"
                      selected={selectedDate || undefined}
                      onSelect={handleDateSelect}
                      disabled={isDateDisabled}
                      className="rounded-md border-0"
                    />
                  </Card>
                </motion.div>

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

          {/* Step 3: Personal Information */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
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
                  {language === "it" ? "I Tuoi Dati" : "Your Information"}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-600"
                >
                  {language === "it"
                    ? "Inserisci i tuoi dati per completare la prenotazione"
                    : "Enter your details to complete the booking"}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto"
              >
                <Card className="p-8 shadow-lg border-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                          {language === "it" ? "Nome completo *" : "Full name *"}
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          {language === "it" ? "Telefono" : "Phone"}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                          {language === "it" ? "Azienda" : "Company"}
                        </Label>
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                        {language === "it" ? "Messaggio (opzionale)" : "Message (optional)"}
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="mt-1"
                        rows={4}
                        placeholder={
                          language === "it"
                            ? "Descrivi brevemente le tue esigenze o domande..."
                            : "Briefly describe your needs or questions..."
                        }
                      />
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        {language === "it" ? "Riepilogo Appuntamento" : "Appointment Summary"}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === "it" ? "Servizio:" : "Service:"}</span>
                          <span className="font-medium">{selectedType?.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === "it" ? "Data:" : "Date:"}</span>
                          <span className="font-medium">
                            {selectedDate &&
                              format(selectedDate, "EEEE, d MMMM yyyy", {
                                locale: language === "it" ? it : enUS,
                              })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === "it" ? "Orario:" : "Time:"}</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === "it" ? "Durata:" : "Duration:"}</span>
                          <span className="font-medium">{selectedType?.duration} min</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.email}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {language === "it" ? "Prenotazione..." : "Booking..."}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          {language === "it" ? "Conferma Prenotazione" : "Confirm Booking"}
                        </div>
                      )}
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && submitSuccess && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center max-w-2xl mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-gray-900 mb-4"
                >
                  {language === "it" ? "Prenotazione Confermata!" : "Booking Confirmed!"}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 mb-8"
                >
                  {language === "it"
                    ? "Grazie per aver prenotato con noi. Riceverai una email di conferma a breve."
                    : "Thank you for booking with us. You will receive a confirmation email shortly."}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-50 p-6 rounded-lg mb-8"
                >
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {language === "it" ? "Dettagli Appuntamento" : "Appointment Details"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{language === "it" ? "Servizio:" : "Service:"}</span>
                      <span className="font-medium">{selectedType?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{language === "it" ? "Data:" : "Date:"}</span>
                      <span className="font-medium">
                        {selectedDate &&
                          format(selectedDate, "EEEE, d MMMM yyyy", {
                            locale: language === "it" ? it : enUS,
                          })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{language === "it" ? "Orario:" : "Time:"}</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <Link href="/">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3">
                      {language === "it" ? "Torna alla Home" : "Back to Home"}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
