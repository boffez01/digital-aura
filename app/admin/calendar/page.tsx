"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO, isSameDay, startOfMonth, endOfMonth } from "date-fns"
import { it } from "date-fns/locale"
import { CalendarIcon, Clock, User, Mail, Phone, RefreshCw, CheckCircle, AlertCircle, Plus } from "lucide-react"

interface Appointment {
  id: number
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
  status: string
  priority: boolean
  google_event_id?: string
  google_event_link?: string
  created_at: string
  updated_at: string
}

export default function AdminCalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔄 Fetching appointments...")

      const response = await fetch("/api/appointments")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("❌ Non-JSON response:", text)
        throw new Error("Server returned non-JSON response")
      }

      const data = await response.json()
      console.log("📋 Appointments data:", data)

      if (data.success) {
        setAppointments(data.appointments || [])
        console.log(`✅ Loaded ${data.appointments?.length || 0} appointments`)
      } else {
        throw new Error(data.message || "Failed to fetch appointments")
      }
    } catch (error) {
      console.error("❌ Error fetching appointments:", error)
      setError(error instanceof Error ? error.message : "Unknown error occurred")
      setAppointments([])
    } finally {
      setLoading(false)
    }
  }

  // Get appointments for selected date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appointment) => {
      try {
        // Handle both ISO date strings and YYYY-MM-DD format
        const appointmentDate = appointment.date.includes("T")
          ? parseISO(appointment.date)
          : parseISO(appointment.date + "T00:00:00")
        return isSameDay(appointmentDate, date)
      } catch (error) {
        console.error("Error parsing date:", appointment.date, error)
        return false
      }
    })
  }

  // Get appointments for selected month
  const getAppointmentsForMonth = (date: Date) => {
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)

    return appointments.filter((appointment) => {
      try {
        const appointmentDate = appointment.date.includes("T")
          ? parseISO(appointment.date)
          : parseISO(appointment.date + "T00:00:00")
        return appointmentDate >= monthStart && appointmentDate <= monthEnd
      } catch (error) {
        console.error("Error parsing date:", appointment.date, error)
        return false
      }
    })
  }

  // Get days with appointments for calendar highlighting
  const getDaysWithAppointments = () => {
    const monthAppointments = getAppointmentsForMonth(selectedDate)
    const daysWithAppointments = new Set()

    monthAppointments.forEach((appointment) => {
      try {
        const appointmentDate = appointment.date.includes("T")
          ? parseISO(appointment.date)
          : parseISO(appointment.date + "T00:00:00")
        daysWithAppointments.add(format(appointmentDate, "yyyy-MM-dd"))
      } catch (error) {
        console.error("Error parsing date for calendar:", appointment.date, error)
      }
    })

    return daysWithAppointments
  }

  const selectedDateAppointments = getAppointmentsForDate(selectedDate)
  const filteredAppointments =
    filterStatus === "all"
      ? selectedDateAppointments
      : selectedDateAppointments.filter((apt) => apt.status === filterStatus)

  const daysWithAppointments = getDaysWithAppointments()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getServiceColor = (service: string) => {
    switch (service.toLowerCase()) {
      case "ai-automation":
        return "bg-blue-100 text-blue-800"
      case "chatbots":
        return "bg-purple-100 text-purple-800"
      case "web-development":
        return "bg-green-100 text-green-800"
      case "ai-marketing":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Caricamento calendario...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Errore nel caricamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">{error}</p>
            <Button onClick={fetchAppointments} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Riprova
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendario Appuntamenti</h1>
          <p className="text-muted-foreground">Gestisci e visualizza tutti i tuoi appuntamenti</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchAppointments} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Aggiorna
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Appuntamento
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Appuntamenti</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confermati</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter((apt) => apt.status === "confirmed").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Attesa</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {appointments.filter((apt) => apt.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oggi</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{getAppointmentsForDate(new Date()).length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
            <CardDescription>Seleziona una data per vedere gli appuntamenti</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              locale={it}
              className="rounded-md border"
              modifiers={{
                hasAppointments: (date) => {
                  const dateStr = format(date, "yyyy-MM-dd")
                  return daysWithAppointments.has(dateStr)
                },
              }}
              modifiersStyles={{
                hasAppointments: {
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontWeight: "bold",
                },
              }}
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Giorni con appuntamenti</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
                <span>Giorni liberi</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Appuntamenti per {format(selectedDate, "dd MMMM yyyy", { locale: it })}</CardTitle>
                <CardDescription>{filteredAppointments.length} appuntamenti trovati</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  Tutti
                </Button>
                <Button
                  variant={filterStatus === "confirmed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("confirmed")}
                >
                  Confermati
                </Button>
                <Button
                  variant={filterStatus === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("pending")}
                >
                  In Attesa
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nessun appuntamento per questa data</p>
              </div>
            ) : (
              filteredAppointments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{appointment.time}</h4>
                          <p className="text-sm text-gray-600">{appointment.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        <Badge className={getServiceColor(appointment.service)}>{appointment.service}</Badge>
                        {appointment.priority && <Badge variant="destructive">Priorità</Badge>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{appointment.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{appointment.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{appointment.phone}</span>
                      </div>
                    </div>

                    {appointment.message && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{appointment.message}</p>
                      </div>
                    )}

                    {appointment.google_event_link && (
                      <div className="flex justify-end">
                        <Button size="sm" variant="outline" asChild>
                          <a href={appointment.google_event_link} target="_blank" rel="noopener noreferrer">
                            Apri in Google Calendar
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
