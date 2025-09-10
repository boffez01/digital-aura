"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, User, CheckCircle, ArrowLeft } from "lucide-react"

const translations = {
  it: {
    title: "Assistente Prenotazioni",
    subtitle: "Prenota una consulenza personalizzata",
    selectService: "Seleziona il servizio:",
    services: {
      "web-development": "Sviluppo Web",
      "ai-automation": "Automazione AI",
      chatbot: "Chatbot Personalizzati",
      "ai-marketing": "Marketing AI",
    },
    selectDate: "Seleziona la data:",
    selectTime: "Seleziona l'orario:",
    personalInfo: "Informazioni personali:",
    name: "Nome completo",
    email: "Email",
    phone: "Telefono (opzionale)",
    message: "Messaggio (opzionale)",
    messagePlaceholder: "Descrivi brevemente le tue esigenze...",
    bookAppointment: "Prenota Appuntamento",
    booking: "Prenotazione in corso...",
    success: "Prenotazione confermata!",
    successMessage: "Ti contatteremo presto per confermare i dettagli.",
    backToChat: "Torna alla Chat",
    timeSlots: {
      "09:00": "09:00 - 10:00",
      "10:00": "10:00 - 11:00",
      "11:00": "11:00 - 12:00",
      "14:00": "14:00 - 15:00",
      "15:00": "15:00 - 16:00",
      "16:00": "16:00 - 17:00",
    },
  },
  en: {
    title: "Booking Assistant",
    subtitle: "Book a personalized consultation",
    selectService: "Select service:",
    services: {
      "web-development": "Web Development",
      "ai-automation": "AI Automation",
      chatbot: "Custom Chatbots",
      "ai-marketing": "AI Marketing",
    },
    selectDate: "Select date:",
    selectTime: "Select time:",
    personalInfo: "Personal information:",
    name: "Full name",
    email: "Email",
    phone: "Phone (optional)",
    message: "Message (optional)",
    messagePlaceholder: "Briefly describe your needs...",
    bookAppointment: "Book Appointment",
    booking: "Booking...",
    success: "Booking confirmed!",
    successMessage: "We'll contact you soon to confirm details.",
    backToChat: "Back to Chat",
    timeSlots: {
      "09:00": "09:00 - 10:00",
      "10:00": "10:00 - 11:00",
      "11:00": "11:00 - 12:00",
      "14:00": "14:00 - 15:00",
      "15:00": "15:00 - 16:00",
      "16:00": "16:00 - 17:00",
    },
  },
}

interface BookingChatbotProps {
  onClose?: () => void
}

export default function BookingChatbot({ onClose }: BookingChatbotProps) {
  const [language, setLanguage] = useState<"it" | "en">("it")
  const [showBookingForm, setShowBookingForm] = useState(false)

  useEffect(() => {
    const checkLanguage = () => {
      if (typeof window !== "undefined") {
        const savedLanguage = localStorage.getItem("language")
        if (savedLanguage === "en" || savedLanguage === "it") {
          setLanguage(savedLanguage)
        }
      }
    }

    checkLanguage()

    if (typeof window !== "undefined") {
      const handleStorageChange = () => {
        checkLanguage()
      }

      window.addEventListener("storage", handleStorageChange)

      const interval = setInterval(checkLanguage, 1000)

      return () => {
        window.removeEventListener("storage", handleStorageChange)
        clearInterval(interval)
      }
    }
  }, [])

  const t = translations[language]

  if (showBookingForm) {
    return <BookingForm language={language} onBack={() => setShowBookingForm(false)} />
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-center gap-2">
          <CalendarDays className="h-5 w-5" />
          {t.title}
        </CardTitle>
        <p className="text-blue-100">{t.subtitle}</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {language === "it"
                ? "Ciao! Sono qui per aiutarti a prenotare una consulenza. Che servizio ti interessa?"
                : "Hi! I'm here to help you book a consultation. Which service interests you?"}
            </p>
          </div>

          <div className="grid gap-2">
            {Object.entries(t.services).map(([key, value]) => (
              <Button
                key={key}
                variant="outline"
                className="justify-start h-auto p-3 text-left bg-transparent"
                onClick={() => setShowBookingForm(true)}
              >
                <div>
                  <div className="font-medium">{value}</div>
                  <div className="text-sm text-gray-500">
                    {language === "it" ? "Clicca per prenotare" : "Click to book"}
                  </div>
                </div>
              </Button>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button
              onClick={() => setShowBookingForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              {language === "it" ? "Prenota Ora" : "Book Now"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BookingForm({ language, onBack }: { language: "it" | "en"; onBack: () => void }) {
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isBooking, setIsBooking] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])

  const t = translations[language]

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots()
    }
  }, [selectedDate])

  const fetchBookedSlots = async () => {
    if (!selectedDate) return

    try {
      const dateString = selectedDate.toISOString().split("T")[0]
      const response = await fetch(`/api/appointments/availability?date=${dateString}`)
      if (response.ok) {
        const data = await response.json()
        setBookedSlots(data.bookedSlots || [])
      }
    } catch (error) {
      console.error("Error fetching availability:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService || !selectedDate || !selectedTime || !formData.name || !formData.email) {
      return
    }

    setIsBooking(true)

    try {
      const appointmentData = {
        service: selectedService,
        date: selectedDate.toISOString().split("T")[0],
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        language: language,
      }

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        throw new Error("Booking failed")
      }
    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setIsBooking(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-700 mb-2">{t.success}</h3>
          <p className="text-gray-600 mb-6">{t.successMessage}</p>
          <Button onClick={onBack} className="w-full">
            {t.backToChat}
          </Button>
        </CardContent>
      </Card>
    )
  }

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>{t.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>{t.selectService}</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.services).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t.selectDate}</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              className="rounded-md border"
            />
          </div>

          {selectedDate && (
            <div>
              <Label>{t.selectTime}</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {timeSlots.map((time) => {
                  const isBooked = bookedSlots.includes(time)
                  return (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      disabled={isBooked}
                      onClick={() => setSelectedTime(time)}
                      className={`${isBooked ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {t.timeSlots[time as keyof typeof t.timeSlots]}
                      {isBooked && (
                        <Badge variant="destructive" className="ml-1 text-xs">
                          Occupato
                        </Badge>
                      )}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Label>{t.personalInfo}</Label>
            <div>
              <Input
                placeholder={t.name}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder={t.email}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                placeholder={t.phone}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Textarea
                placeholder={t.messagePlaceholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              !selectedService || !selectedDate || !selectedTime || !formData.name || !formData.email || isBooking
            }
          >
            <User className="h-4 w-4 mr-2" />
            {isBooking ? t.booking : t.bookAppointment}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
