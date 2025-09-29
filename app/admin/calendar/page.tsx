"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, User, Mail, Phone, MessageSquare, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { format, parseISO, isToday, isTomorrow, isYesterday } from "date-fns"
import { it } from "date-fns/locale"

interface Appointment {
  id: number
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
  status: "pending" | "confirmed" | "cancelled"
  priority: boolean
  created_at: string
}

export default function AdminCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔄 Fetching appointments...")

      const response = await fetch("/api/admin/appointments", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("📊 Raw API response:", data)

      if (data.success && Array.isArray(data.appointments)) {
        setAppointments(data.appointments)
        setDebugInfo({
          totalAppointments: data.appointments.length,
          apiResponse: data,
          fetchTime: new Date().toISOString(),
        })
        console.log(`✅ Loaded ${data.appointments.length} appointments`)
      } else {
        console.error("❌ Invalid API response format:", data)
        setError("Formato risposta API non valido")
      }
    } catch (error) {
      console.error("❌ Error fetching appointments:", error)
      setError(error instanceof Error ? error.message : "Errore sconosciuto")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  // Get appointments for selected date
  const selectedDateAppointments = appointments.filter((apt) => {
    try {
      const aptDate = parseISO(apt.date)
      return format(aptDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    } catch (error) {
      console.error("Error parsing appointment date:", apt.date, error)
      return false
    }
  })

  // Get dates with appointments for calendar highlighting
  const datesWithAppointments = appointments
    .map((apt) => {
      try {
        return parseISO(apt.date)
      } catch (error) {
        console.error("Error parsing date for highlighting:", apt.date, error)
        return null
      }
    })
    .filter(Boolean) as Date[]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Confermato
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">Annullato</Badge>
      default:
        return <Badge variant="secondary">In Attesa</Badge>
    }
  }

  const formatTime = (timeString: string) => {
    try {
      // Handle different time formats
      if (timeString.includes(":")) {
        const [hours, minutes] = timeString.split(":")
        return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
      }
      return timeString
    } catch (error) {
      console.error("Error formatting time:", timeString, error)
      return timeString
    }
  }

  const getDateDescription = (date: Date) => {
    if (isToday(date)) return "Oggi"
    if (isTomorrow(date)) return "Domani"
    if (isYesterday(date)) return "Ieri"
    return format(date, "EEEE d MMMM yyyy", { locale: it })
  }

  const updateAppointmentStatus = async (id: number, newStatus: "confirmed" | "cancelled") => {
    try {
      const response = await fetch(`/api/admin/appointments`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (response.ok) {
        await fetchAppointments() // Refresh the list
      } else {
        console.error("Failed to update appointment status")
      }
    } catch (error) {
      console.error("Error updating appointment:", error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Caricamento calendario...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendario Appuntamenti</h1>
          <p className="text-gray-600 mt-1">Gestisci tutti gli appuntamenti dei clienti</p>
        </div>
        <Button onClick={fetchAppointments} disabled={loading}>
          {loading ? "Aggiornamento..." : "Aggiorna"}
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Errore: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Debug Info */}
      {debugInfo && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-sm text-blue-800">Debug Info</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Totale Appuntamenti:</strong> {debugInfo.totalAppointments}
              </div>
              <div>
                <strong>Ultimo Aggiornamento:</strong> {new Date(debugInfo.fetchTime).toLocaleString("it-IT")}
              </div>
              <div className="col-span-2">
                <strong>Appuntamenti per Data Selezionata:</strong> {selectedDateAppointments.length}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5" />
              <span>Calendario</span>
            </CardTitle>
            <CardDescription>Seleziona una data per vedere gli appuntamenti</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              modifiers={{
                hasAppointments: datesWithAppointments,
              }}
              modifiersStyles={{
                hasAppointments: {
                  backgroundColor: "#dbeafe",
                  color: "#1e40af",
                  fontWeight: "bold",
                },
              }}
              className="rounded-md border"
            />
            <div className="mt-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                <span>Giorni con appuntamenti</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Appuntamenti - {getDateDescription(selectedDate)}</span>
            </CardTitle>
            <CardDescription>
              {selectedDateAppointments.length === 0
                ? "Nessun appuntamento per questa data"
                : `${selectedDateAppointments.length} appuntamento${selectedDateAppointments.length > 1 ? "i" : ""} programmato${selectedDateAppointments.length > 1 ? "i" : ""}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nessun appuntamento per {format(selectedDate, "d MMMM yyyy", { locale: it })}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`p-4 rounded-lg border ${
                        appointment.priority ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"
                      } hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {getStatusIcon(appointment.status)}
                            <h3 className="font-semibold text-gray-900">{appointment.name}</h3>
                            {getStatusBadge(appointment.status)}
                            {appointment.priority && (
                              <Badge variant="destructive" className="text-xs">
                                PRIORITÀ
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{formatTime(appointment.time)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>{appointment.service}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{appointment.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{appointment.phone}</span>
                            </div>
                          </div>

                          {appointment.message && appointment.message !== "Nessun messaggio aggiuntivo" && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-md">
                              <div className="flex items-start space-x-2">
                                <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                                <p className="text-sm text-gray-700">{appointment.message}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {appointment.status === "pending" && (
                          <div className="flex space-x-2 ml-4">
                            <Button
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Conferma
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              Annulla
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Totale Appuntamenti</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
              <CalendarDays className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Attesa</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {appointments.filter((apt) => apt.status === "pending").length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confermati</p>
                <p className="text-2xl font-bold text-green-600">
                  {appointments.filter((apt) => apt.status === "confirmed").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Oggi</p>
                <p className="text-2xl font-bold text-blue-600">
                  {
                    appointments.filter((apt) => {
                      try {
                        return isToday(parseISO(apt.date))
                      } catch {
                        return false
                      }
                    }).length
                  }
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
