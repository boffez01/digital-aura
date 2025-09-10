"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Filter,
  Search,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Star,
  Building,
} from "lucide-react"
import { format } from "date-fns"
import { it } from "date-fns/locale"

interface Appointment {
  id: number
  name: string
  email: string
  phone?: string
  service: string
  date: string
  time: string
  message?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  priority: boolean
  created_at: string
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
    priority: 0,
  })

  useEffect(() => {
    fetchAppointments()
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAppointments, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    filterAppointments()
  }, [appointments, searchTerm, statusFilter, serviceFilter])

  const fetchAppointments = async () => {
    try {
      console.log("🔄 Fetching appointments from admin dashboard...")

      const response = await fetch("/api/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("📊 Admin appointments data:", data)

      if (data.success && data.appointments) {
        setAppointments(data.appointments)
        calculateStats(data.appointments)
      } else {
        console.error("❌ Invalid response format:", data)
        setAppointments([])
      }
    } catch (error) {
      console.error("❌ Error fetching appointments:", error)
      setAppointments([])
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = (appointmentsList: Appointment[]) => {
    const stats = {
      total: appointmentsList.length,
      pending: appointmentsList.filter((apt) => apt.status === "pending").length,
      confirmed: appointmentsList.filter((apt) => apt.status === "confirmed").length,
      cancelled: appointmentsList.filter((apt) => apt.status === "cancelled").length,
      completed: appointmentsList.filter((apt) => apt.status === "completed").length,
      priority: appointmentsList.filter((apt) => apt.priority).length,
    }
    setStats(stats)
  }

  const filterAppointments = () => {
    let filtered = appointments

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.service.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((apt) => apt.status === statusFilter)
    }

    // Service filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter((apt) => apt.service.toLowerCase().includes(serviceFilter.toLowerCase()))
    }

    setFilteredAppointments(filtered)
  }

  const updateAppointmentStatus = async (id: number, newStatus: string) => {
    try {
      // This would be implemented with a PUT endpoint
      console.log(`Updating appointment ${id} to status: ${newStatus}`)
      // For now, just update locally
      setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus as any } : apt)))
    } catch (error) {
      console.error("Error updating appointment status:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getServiceColor = (service: string) => {
    if (service.toLowerCase().includes("automation")) return "bg-purple-100 text-purple-800"
    if (service.toLowerCase().includes("chatbot")) return "bg-blue-100 text-blue-800"
    if (service.toLowerCase().includes("web")) return "bg-green-100 text-green-800"
    if (service.toLowerCase().includes("marketing")) return "bg-orange-100 text-orange-800"
    return "bg-gray-100 text-gray-800"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento appuntamenti...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestione Appuntamenti</h1>
              <p className="text-gray-600 mt-2">Visualizza e gestisci tutti gli appuntamenti prenotati</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={fetchAppointments} variant="outline" className="flex items-center bg-transparent">
                <RefreshCw className="w-4 h-4 mr-2" />
                Aggiorna
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Esporta CSV
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Totale</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">In Attesa</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Confermati</p>
                      <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Cancellati</p>
                      <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completati</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Prioritari</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.priority}</p>
                    </div>
                    <Star className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <Card className="bg-white border-0 shadow-sm mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cerca per nome, email o servizio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtra per stato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti gli stati</SelectItem>
                    <SelectItem value="pending">In attesa</SelectItem>
                    <SelectItem value="confirmed">Confermati</SelectItem>
                    <SelectItem value="cancelled">Cancellati</SelectItem>
                    <SelectItem value="completed">Completati</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={serviceFilter} onValueChange={setServiceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtra per servizio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i servizi</SelectItem>
                    <SelectItem value="automation">AI Automation</SelectItem>
                    <SelectItem value="chatbot">Chatbot</SelectItem>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtri Avanzati
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nessun appuntamento trovato</h3>
                <p className="text-gray-600">
                  {appointments.length === 0
                    ? "Non ci sono ancora appuntamenti prenotati."
                    : "Nessun appuntamento corrisponde ai filtri selezionati."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex items-center space-x-2">
                            <User className="w-5 h-5 text-gray-400" />
                            <h3 className="text-lg font-semibold text-gray-900">{appointment.name}</h3>
                          </div>
                          {appointment.priority && (
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                              <Star className="w-3 h-3 mr-1" />
                              Prioritario
                            </Badge>
                          )}
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status === "pending" && "In Attesa"}
                            {appointment.status === "confirmed" && "Confermato"}
                            {appointment.status === "cancelled" && "Cancellato"}
                            {appointment.status === "completed" && "Completato"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{appointment.email}</span>
                          </div>

                          {appointment.phone && (
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span className="text-sm">{appointment.phone}</span>
                            </div>
                          )}

                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {format(new Date(appointment.date), "dd/MM/yyyy", { locale: it })}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                          <Badge className={getServiceColor(appointment.service)}>
                            <Building className="w-3 h-3 mr-1" />
                            {appointment.service}
                          </Badge>

                          <span className="text-xs text-gray-500">
                            Creato il {format(new Date(appointment.created_at), "dd/MM/yyyy HH:mm", { locale: it })}
                          </span>
                        </div>

                        {appointment.message && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <div className="flex items-start space-x-2">
                              <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                              <p className="text-sm text-gray-700">{appointment.message}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {appointment.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Conferma
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Annulla
                            </Button>
                          </>
                        )}

                        {appointment.status === "confirmed" && (
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completa
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination would go here */}
        {filteredAppointments.length > 0 && (
          <div className="mt-8 flex justify-center">
            <p className="text-gray-600">
              Visualizzati {filteredAppointments.length} di {appointments.length} appuntamenti
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
