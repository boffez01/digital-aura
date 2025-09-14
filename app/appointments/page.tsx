"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Target,
  Zap,
  Home,
} from "lucide-react"
import Link from "next/link"

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export default function AppointmentsPage() {
  // Use local state for language instead of context to avoid provider issues
  const [language, setLanguage] = useState<"it" | "en">("it")
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "it" | "en"
    if (savedLanguage && (savedLanguage === "it" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail)
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "language" && event.newValue) {
        setLanguage(event.newValue as "it" | "en")
      }
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const t = {
    it: {
      title: "Prenota la Tua Consulenza Gratuita",
      subtitle: "Scopri come l'AI può trasformare il tuo business",
      step1: "Seleziona Servizio",
      step2: "Scegli Data e Ora",
      step3: "I Tuoi Dati",
      step4: "Conferma",
      backToHome: "Torna alla Home",
      contactUs: "Contattaci Ora",
      services: {
        "ai-automation": "AI Automation",
        chatbot: "Chatbot Intelligenti",
        "web-development": "Web Development",
        "ai-marketing": "AI Marketing",
      },
      serviceDescriptions: {
        "ai-automation": "Automatizza i processi aziendali con l'intelligenza artificiale",
        chatbot: "Assistenti virtuali 24/7 per il customer service",
        "web-development": "Siti web moderni e e-commerce performanti",
        "ai-marketing": "Campagne marketing automatizzate e personalizzate",
      },
      selectService: "Seleziona un servizio",
      selectDate: "Seleziona una data",
      selectTime: "Seleziona un orario",
      availableTimes: "Orari Disponibili",
      name: "Nome e Cognome",
      email: "Email",
      phone: "Telefono",
      message: "Messaggio (opzionale)",
      messagePlaceholder: "Descrivi brevemente le tue esigenze...",
      back: "Indietro",
      continue: "Continua",
      bookAppointment: "Prenota Consulenza",
      success: "Prenotazione Confermata!",
      successMessage: "La tua consulenza è stata prenotata con successo. Riceverai una email di conferma a breve.",
      successContact: "Per qualsiasi domanda, contattaci a info@digitalaura.it",
      error: "Errore nella prenotazione",
      errorMessage: "Si è verificato un errore. Riprova o contattaci direttamente.",
      required: "Campo obbligatorio",
      invalidEmail: "Email non valida",
      invalidPhone: "Numero di telefono non valido",
      occupied: "Orario già occupato",
      businessHours: "Orari: 9:00-12:00 e 14:00-18:00",
      today: "Oggi",
      selected: "Selezionato",
      available: "Disponibile",
      unavailable: "Non disponibile",
      closed: "Chiuso",
      bookingSummary: "Riepilogo Prenotazione",
      service: "Servizio",
      date: "Data",
      time: "Orario",
      submitting: "Prenotando...",
    },
    en: {
      title: "Book Your Free Consultation",
      subtitle: "Discover how AI can transform your business",
      step1: "Select Service",
      step2: "Choose Date & Time",
      step3: "Your Details",
      step4: "Confirm",
      backToHome: "Back to Home",
      contactUs: "Contact Us Now",
      services: {
        "ai-automation": "AI Automation",
        chatbot: "Intelligent Chatbots",
        "web-development": "Web Development",
        "ai-marketing": "AI Marketing",
      },
      serviceDescriptions: {
        "ai-automation": "Automate business processes with artificial intelligence",
        chatbot: "24/7 virtual assistants for customer service",
        "web-development": "Modern websites and high-performance e-commerce",
        "ai-marketing": "Automated and personalized marketing campaigns",
      },
      selectService: "Select a service",
      selectDate: "Select a date",
      selectTime: "Select a time",
      availableTimes: "Available Times",
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      message: "Message (optional)",
      messagePlaceholder: "Briefly describe your needs...",
      back: "Back",
      continue: "Continue",
      bookAppointment: "Book Consultation",
      success: "Booking Confirmed!",
      successMessage: "Your consultation has been successfully booked. You will receive a confirmation email shortly.",
      successContact: "For any questions, contact us at info@digitalaura.it",
      error: "Booking Error",
      errorMessage: "An error occurred. Please try again or contact us directly.",
      required: "Required field",
      invalidEmail: "Invalid email",
      invalidPhone: "Invalid phone number",
      occupied: "Time slot occupied",
      businessHours: "Hours: 9:00-12:00 and 14:00-18:00",
      today: "Today",
      selected: "Selected",
      available: "Available",
      unavailable: "Unavailable",
      closed: "Closed",
      bookingSummary: "Booking Summary",
      service: "Service",
      date: "Date",
      time: "Time",
      submitting: "Booking...",
    },
  }

  const currentT = t[language] || t.it

  // Generate time slots (every 30 minutes)
  const generateTimeSlots = () => {
    const slots: string[] = []

    // Morning: 9:00 - 12:00
    for (let hour = 9; hour < 12; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      slots.push(`${hour.toString().padStart(2, "0")}:30`)
    }

    // Afternoon: 14:00 - 18:00
    for (let hour = 14; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      slots.push(`${hour.toString().padStart(2, "0")}:30`)
    }

    return slots
  }

  const timeSlots = generateTimeSlots()

  // Check availability when date changes
  useEffect(() => {
    if (formData.date) {
      checkAvailability(formData.date)
    }
  }, [formData.date])

  const checkAvailability = async (date: string) => {
    try {
      const response = await fetch(`/api/appointments/availability?date=${date}`)
      if (response.ok) {
        const data = await response.json()
        setOccupiedSlots(data.occupied_slots || [])
      }
    } catch (error) {
      console.error("Error checking availability:", error)
    }
  }

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  }

  const isToday = (date: Date, day: number) => {
    const today = new Date()
    return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && day === today.getDate()
  }

  const isSelected = (date: Date, day: number) => {
    if (!formData.date) return false
    const selectedDate = new Date(formData.date)
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      day === selectedDate.getDate()
    )
  }

  const formatDateForInput = (date: Date, day: number) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const dayStr = day.toString().padStart(2, "0")
    return `${year}-${month}-${dayStr}`
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(currentMonth, day)
      const isSelectedDay = isSelected(currentMonth, day)
      const dateStr = formatDateForInput(currentMonth, day)
      const isPast = new Date(dateStr) < new Date(new Date().toDateString())

      days.push(
        <button
          key={day}
          onClick={() => {
            if (!isPast) {
              setFormData({ ...formData, date: dateStr, time: "" })
              setSelectedDate(new Date(dateStr))
            }
          }}
          disabled={isPast}
          className={`
            h-12 w-full rounded-xl font-medium transition-all duration-200 transform hover:scale-105
            ${isPast ? "text-slate-500 cursor-not-allowed" : "text-slate-200 hover:bg-slate-700 cursor-pointer"}
            ${isCurrentDay ? "ring-2 ring-cyan-400 bg-slate-800" : ""}
            ${isSelectedDay ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg" : ""}
          `}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    switch (step) {
      case 1:
        if (!formData.service) newErrors.service = currentT.required
        break
      case 2:
        if (!formData.date) newErrors.date = currentT.required
        if (!formData.time) newErrors.time = currentT.required
        break
      case 3:
        if (!formData.name.trim()) newErrors.name = currentT.required
        if (!formData.email.trim()) {
          newErrors.email = currentT.required
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = currentT.invalidEmail
        }
        if (!formData.phone.trim()) {
          newErrors.phone = currentT.required
        } else if (!/^[+]?[0-9\s\-()]{8,}$/.test(formData.phone)) {
          newErrors.phone = currentT.invalidPhone
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      console.log("Submitting appointment with data:", formData)

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          status: "pending",
          priority: false,
        }),
      })

      console.log("Response status:", response.status)
      const data = await response.json()
      console.log("Response data:", data)

      if (response.ok && data.success) {
        console.log("Appointment booked successfully!")
        setSubmitStatus("success")
        setCurrentStep(4)
      } else {
        console.error("Appointment booking failed:", data)
        setSubmitStatus("error")
        if (data.occupied) {
          setErrors({ time: currentT.occupied })
          setCurrentStep(2)
        }
      }
    } catch (error) {
      console.error("Error submitting appointment:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getServiceIcon = (service: string) => {
    const icons = {
      "ai-automation": <Zap className="w-6 h-6" />,
      chatbot: <MessageSquare className="w-6 h-6" />,
      "web-development": <Target className="w-6 h-6" />,
      "ai-marketing": <Sparkles className="w-6 h-6" />,
    }
    return icons[service as keyof typeof icons] || <Target className="w-6 h-6" />
  }

  const getServiceColor = (service: string) => {
    const colors = {
      "ai-automation": "from-purple-500 to-indigo-600",
      chatbot: "from-blue-500 to-cyan-600",
      "web-development": "from-green-500 to-emerald-600",
      "ai-marketing": "from-orange-500 to-red-600",
    }
    return colors[service as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">{currentT.success}</h2>
            <p className="text-slate-300 mb-4">{currentT.successMessage}</p>
            <p className="text-slate-400 text-sm mb-6">{currentT.successContact}</p>

            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  <Home className="w-4 h-4 mr-2" />
                  {currentT.backToHome}
                </Button>
              </Link>

              <Link href="/#contact">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {currentT.contactUs}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header con tasto Back */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentT.backToHome}
            </Button>
          </Link>

          <Link href="/#contact">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              <Mail className="w-4 h-4 mr-2" />
              {currentT.contactUs}
            </Button>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{currentT.title}</h1>
          <p className="text-xl text-slate-300">{currentT.subtitle}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-1 rounded transition-all duration-300 ${
                      step < currentStep ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-slate-700"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              {currentStep === 1 && currentT.step1}
              {currentStep === 2 && currentT.step2}
              {currentStep === 3 && currentT.step3}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(currentT.services).map(([key, name]) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, service: key })}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 text-left ${
                        formData.service === key
                          ? "border-cyan-500 bg-slate-700/50"
                          : "border-slate-600 bg-slate-700/20 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${getServiceColor(key)}`}>
                          {getServiceIcon(key)}
                        </div>
                        <h3 className="text-lg font-semibold text-white">{name}</h3>
                      </div>
                      <p className="text-slate-300 text-sm">
                        {currentT.serviceDescriptions[key as keyof typeof currentT.serviceDescriptions]}
                      </p>
                    </button>
                  ))}
                </div>
                {errors.service && (
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.service}
                  </p>
                )}
              </div>
            )}

            {/* Step 2: Date and Time Selection */}
            {currentStep === 2 && (
              <div className="space-y-8">
                {/* Calendar */}
                <div className="bg-slate-700/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">{currentT.selectDate}</h3>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newMonth = new Date(currentMonth)
                          newMonth.setMonth(newMonth.getMonth() - 1)
                          setCurrentMonth(newMonth)
                        }}
                        className="text-slate-400 hover:text-white hover:bg-slate-600"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <span className="text-white font-medium min-w-[120px] text-center">
                        {currentMonth.toLocaleDateString(language === "en" ? "en-US" : "it-IT", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newMonth = new Date(currentMonth)
                          newMonth.setMonth(newMonth.getMonth() + 1)
                          setCurrentMonth(newMonth)
                        }}
                        className="text-slate-400 hover:text-white hover:bg-slate-600"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {(language === "en"
                      ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
                      : ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"]
                    ).map((day) => (
                      <div key={day} className="h-10 flex items-center justify-center text-slate-400 font-medium">
                        {day}
                      </div>
                    ))}
                    {renderCalendar()}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full ring-2 ring-cyan-400 bg-slate-800"></div>
                      <span className="text-slate-300">{currentT.today}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
                      <span className="text-slate-300">{currentT.selected}</span>
                    </div>
                  </div>
                </div>

                {/* Time Selection */}
                {formData.date && (
                  <div className="bg-slate-700/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">{currentT.availableTimes}</h3>
                    <p className="text-sm text-slate-400 mb-4">{currentT.businessHours}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timeSlots.map((time) => {
                        const isOccupied = occupiedSlots.includes(time)
                        return (
                          <button
                            key={time}
                            onClick={() => !isOccupied && setFormData({ ...formData, time })}
                            disabled={isOccupied}
                            className={`p-3 rounded-lg font-medium transition-all duration-200 ${
                              formData.time === time
                                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                                : isOccupied
                                  ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                                  : "bg-slate-600 text-slate-200 hover:bg-slate-500"
                            }`}
                          >
                            {time}
                            {isOccupied && <div className="text-xs mt-1">{currentT.occupied}</div>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {(errors.date || errors.time) && (
                  <div className="space-y-2">
                    {errors.date && (
                      <p className="text-red-400 text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.date}
                      </p>
                    )}
                    {errors.time && (
                      <p className="text-red-400 text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.time}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      {currentT.name}
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500"
                      placeholder="Mario Rossi"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      {currentT.email}
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500"
                      placeholder="mario@esempio.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    {currentT.phone}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500"
                    placeholder="+39 333 1234567"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    {currentT.message}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500 min-h-[100px]"
                    placeholder={currentT.messagePlaceholder}
                  />
                </div>

                {/* Summary */}
                <div className="bg-slate-700/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">{currentT.bookingSummary}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{currentT.service}:</span>
                      <span className="text-white">
                        {currentT.services[formData.service as keyof typeof currentT.services]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{currentT.date}:</span>
                      <span className="text-white">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{currentT.time}:</span>
                      <span className="text-white">{formData.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {currentT.back}
                </Button>
              )}

              <div className="ml-auto">
                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    {currentT.continue}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {currentT.submitting}
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        {currentT.bookAppointment}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {submitStatus === "error" && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">{currentT.error}</span>
                </div>
                <p className="text-red-300 text-sm mt-1">{currentT.errorMessage}</p>
                <div className="mt-3">
                  <Link href="/#contact">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-400 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {currentT.contactUs}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
