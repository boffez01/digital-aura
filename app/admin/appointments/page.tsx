"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertCircle,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  HeadphonesIcon,
  Eye,
  Edit,
  Send,
  Archive,
} from "lucide-react"

interface Appointment {
  id: string
  type: "priority" | "regular"
  service: string
  serviceName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  message: string
  date: string
  time: string
  status: "pending" | "contacted" | "in_progress" | "completed" | "cancelled"
  priority: boolean
  createdAt: string
  updatedAt: string
  assignedTo?: string
  notes?: string
  estimatedDuration?: number
  actualDuration?: number
}

interface AdminStats {
  totalAppointments: number
  priorityAppointments: number
  pendingPriority: number
  completedToday: number
  averageResponseTime: number
  satisfactionRate: number
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [stats, setStats] = useState<AdminStats>({
    totalAppointments: 0,
    priorityAppointments: 0,
    pendingPriority: 0,
    completedToday: 0,
    averageResponseTime: 0,
    satisfactionRate: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // Simula il caricamento dei dati
  useEffect(() => {
    loadAppointments()
  }, [])

  // Filtra gli appuntamenti
  useEffect(() => {
    let filtered = appointments

    if (searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((apt) => apt.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((apt) => apt.type === typeFilter)
    }

    setFilteredAppointments(filtered)
  }, [appointments, searchTerm, statusFilter, typeFilter])

  const loadAppointments = async () => {
    setLoading(true)
    try {
      // Simula chiamata API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dati di esempio
      const mockAppointments: Appointment[] = [
        {
          id: "PRIORITY-1703123456789",
          type: "priority",
          service: "assistance",
          serviceName: "Assistenza Prioritaria",
          customerName: "Marco Rossi",
          customerEmail: "marco.rossi@email.com",
          customerPhone: "+39 333 123 4567",
          message: "Il sito web è down da 2 ore, clienti non riescono ad accedere. Urgente!",
          date: new Date().toISOString(),
          time: "14:30",
          status: "pending",
          priority: true,
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min fa
          updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          estimatedDuration: 30,
        },
        {
          id: "PRIORITY-1703123456790",
          type: "priority",
          service: "assistance",
          serviceName: "Assistenza Prioritaria",
          customerName: "Laura Bianchi",
          customerEmail: "laura.bianchi@startup.it",
          customerPhone: "+39 347 987 6543",
          message: "Chatbot non risponde, perdiamo lead. Sistema di pagamento bloccato.",
          date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // tra 2 ore
          time: "16:00",
          status: "contacted",
          priority: true,
          createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min fa
          updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          assignedTo: "Tech Support Team",
          notes: "Cliente contattato, problema identificato. Intervento programmato.",
          estimatedDuration: 45,
        },
        {
          id: "REGULAR-1703123456791",
          type: "regular",
          service: "chatbot",
          serviceName: "Smart Chatbots",
          customerName: "Giuseppe Verdi",
          customerEmail: "g.verdi@azienda.com",
          customerPhone: "+39 320 555 7890",
          message: "Interessato a implementare chatbot per e-commerce",
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // domani
          time: "10:00",
          status: "pending",
          priority: false,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 ore fa
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          estimatedDuration: 45,
        },
        {
          id: "PRIORITY-1703123456792",
          type: "priority",
          service: "assistance",
          serviceName: "Assistenza Prioritaria",
          customerName: "Anna Ferrari",
          customerEmail: "anna.ferrari@negozio.it",
          customerPhone: "+39 366 444 3333",
          message: "Database corrotto, backup non funziona. Negozio online fermo!",
          date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 ore fa
          time: "12:00",
          status: "completed",
          priority: true,
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 ore fa
          updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          assignedTo: "Senior Developer",
          notes: "Problema risolto. Database ripristinato da backup. Cliente soddisfatto.",
          estimatedDuration: 60,
          actualDuration: 90,
        },
        {
          id: "REGULAR-1703123456793",
          type: "regular",
          service: "web-development",
          serviceName: "Web Development",
          customerName: "Roberto Blu",
          customerEmail: "roberto.blu@studio.com",
          customerPhone: "+39 338 222 1111",
          message: "Nuovo sito web per studio legale",
          date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // dopodomani
          time: "15:30",
          status: "pending",
          priority: false,
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 ore fa
          updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          estimatedDuration: 60,
        },
      ]

      setAppointments(mockAppointments)

      // Calcola statistiche
      const priorityCount = mockAppointments.filter((apt) => apt.priority).length
      const pendingPriorityCount = mockAppointments.filter((apt) => apt.priority && apt.status === "pending").length
      const completedTodayCount = mockAppointments.filter(
        (apt) => apt.status === "completed" && new Date(apt.updatedAt).toDateString() === new Date().toDateString(),
      ).length

      setStats({
        totalAppointments: mockAppointments.length,
        priorityAppointments: priorityCount,
        pendingPriority: pendingPriorityCount,
        completedToday: completedTodayCount,
        averageResponseTime: 25, // minuti
        satisfactionRate: 96, // percentuale
      })
    } catch (error) {
      console.error("Error loading appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string, notes?: string) => {
    setIsUpdating(true)
    try {
      // Simula chiamata API
      await new Promise((resolve) => setTimeout(resolve, 500))

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? {
                ...apt,
                status: newStatus as any,
                updatedAt: new Date().toISOString(),
                notes: notes || apt.notes,
                assignedTo: newStatus === "contacted" ? "Support Team" : apt.assignedTo,
              }
            : apt,
        ),
      )

      console.log(`✅ Appointment ${appointmentId} updated to ${newStatus}`)
    } catch (error) {
      console.error("Error updating appointment:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "contacted":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "in_progress":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "contacted":
        return <Phone className="w-4 h-4" />
      case "in_progress":
        return <RefreshCw className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Ora"
    if (diffInMinutes < 60) return `${diffInMinutes} min fa`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ore fa`
    return `${Math.floor(diffInMinutes / 1440)} giorni fa`
  }

  const openAppointmentDetail = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setAdminNotes(appointment.notes || "")
    setIsDetailModalOpen(true)
  }

  const saveAdminNotes = async () => {
    if (!selectedAppointment) return

    setIsUpdating(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedAppointment.id
            ? {
                ...apt,
                notes: adminNotes,
                updatedAt: new Date().toISOString(),
              }
            : apt,
        ),
      )

      setSelectedAppointment((prev) => (prev ? { ...prev, notes: adminNotes } : null))
      console.log("✅ Admin notes saved")
    } catch (error) {
      console.error("Error saving notes:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Caricamento dashboard admin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              </div>
              <Badge className="bg-purple-100 text-purple-700">Gestione Appuntamenti</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={loadAppointments} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Aggiorna
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Esporta
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Totale Appuntamenti</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalAppointments}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Assistenza Prioritaria</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.priorityAppointments}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Priorità Pendenti</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.pendingPriority}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completati Oggi</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.completedToday}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tempo Risposta</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.averageResponseTime}m</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Soddisfazione</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.satisfactionRate}%</p>
                </div>
                <Users className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtri e Ricerca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Cerca per nome, email, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="pending">In attesa</SelectItem>
                  <SelectItem value="contacted">Contattato</SelectItem>
                  <SelectItem value="in_progress">In corso</SelectItem>
                  <SelectItem value="completed">Completato</SelectItem>
                  <SelectItem value="cancelled">Annullato</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i tipi</SelectItem>
                  <SelectItem value="priority">Assistenza Prioritaria</SelectItem>
                  <SelectItem value="regular">Appuntamenti Normali</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setTypeFilter("all")
                }}
              >
                Reset Filtri
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Appuntamenti ({filteredAppointments.length})
              </div>
              {stats.pendingPriority > 0 && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  <Bell className="w-3 h-3 mr-1" />
                  {stats.pendingPriority} Priorità Pendenti
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {filteredAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`border rounded-lg p-6 transition-all duration-300 hover:shadow-md ${
                      appointment.priority
                        ? "border-red-200 bg-red-50"
                        : appointment.status === "pending"
                          ? "border-yellow-200 bg-yellow-50"
                          : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex items-center space-x-2">
                            {appointment.priority ? (
                              <HeadphonesIcon className="w-5 h-5 text-red-600" />
                            ) : (
                              <Calendar className="w-5 h-5 text-gray-600" />
                            )}
                            <h3 className="text-lg font-semibold text-gray-800">{appointment.serviceName}</h3>
                          </div>

                          <Badge className={`border ${getStatusColor(appointment.status)} flex items-center space-x-1`}>
                            {getStatusIcon(appointment.status)}
                            <span className="capitalize">{appointment.status.replace("_", " ")}</span>
                          </Badge>

                          {appointment.priority && (
                            <Badge className="bg-red-500 text-white">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              PRIORITÀ
                            </Badge>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            <span className="font-medium">{appointment.customerName}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <span className="text-sm">{appointment.customerEmail}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            <span className="text-sm">{appointment.customerPhone}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              {new Date(appointment.date).toLocaleDateString("it-IT")} - {appointment.time}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-start">
                            <MessageSquare className="w-4 h-4 mr-2 mt-1 text-gray-400" />
                            <p className="text-gray-700 text-sm leading-relaxed">{appointment.message}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>ID: {appointment.id}</span>
                          <span>Creato: {formatTimeAgo(appointment.createdAt)}</span>
                          {appointment.assignedTo && <span>Assegnato a: {appointment.assignedTo}</span>}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-6">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAppointmentDetail(appointment)}
                          className="flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Dettagli
                        </Button>

                        {appointment.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, "contacted")}
                            disabled={isUpdating}
                            className={
                              appointment.priority ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                            }
                          >
                            <Phone className="w-4 h-4 mr-1" />
                            Contatta
                          </Button>
                        )}

                        {appointment.status === "contacted" && (
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, "in_progress")}
                            disabled={isUpdating}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Avvia
                          </Button>
                        )}

                        {appointment.status === "in_progress" && (
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                            disabled={isUpdating}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completa
                          </Button>
                        )}
                      </div>
                    </div>

                    {appointment.priority && appointment.status === "pending" && (
                      <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-200">
                        <div className="flex items-center text-red-700">
                          <Zap className="w-4 h-4 mr-2" />
                          <span className="font-medium text-sm">
                            ⚠️ ASSISTENZA PRIORITARIA - Risposta richiesta entro 1 ora!
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredAppointments.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Nessun appuntamento trovato</h3>
                  <p className="text-gray-500">Prova a modificare i filtri di ricerca</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedAppointment?.priority ? (
                <HeadphonesIcon className="w-5 h-5 text-red-600" />
              ) : (
                <Calendar className="w-5 h-5 text-blue-600" />
              )}
              <span>Dettagli Appuntamento</span>
              {selectedAppointment?.priority && (
                <Badge className="bg-red-500 text-white">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  PRIORITÀ
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>ID: {selectedAppointment?.id}</DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-6">
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informazioni Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nome</label>
                    <p className="text-lg font-semibold">{selectedAppointment.customerName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-lg">{selectedAppointment.customerEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Telefono</label>
                    <p className="text-lg">{selectedAppointment.customerPhone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Servizio</label>
                    <p className="text-lg font-semibold">{selectedAppointment.serviceName}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Appointment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Dettagli Appuntamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Data</label>
                    <p className="text-lg">
                      {new Date(selectedAppointment.date).toLocaleDateString("it-IT", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Ora</label>
                    <p className="text-lg font-semibold">{selectedAppointment.time}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Stato</label>
                    <Badge className={`${getStatusColor(selectedAppointment.status)} flex items-center w-fit`}>
                      {getStatusIcon(selectedAppointment.status)}
                      <span className="ml-1 capitalize">{selectedAppointment.status.replace("_", " ")}</span>
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Durata Stimata</label>
                    <p className="text-lg">{selectedAppointment.estimatedDuration} minuti</p>
                  </div>
                </CardContent>
              </Card>

              {/* Message */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Messaggio Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800 leading-relaxed">{selectedAppointment.message}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Edit className="w-5 h-5 mr-2" />
                    Note Amministratore
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Aggiungi note interne, aggiornamenti, osservazioni..."
                    rows={4}
                    className="w-full"
                  />
                  <Button onClick={saveAdminNotes} disabled={isUpdating} className="bg-purple-600 hover:bg-purple-700">
                    {isUpdating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Salvataggio...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Salva Note
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Appuntamento creato</p>
                        <p className="text-sm text-gray-600">{formatTimeAgo(selectedAppointment.createdAt)}</p>
                      </div>
                    </div>
                    {selectedAppointment.updatedAt !== selectedAppointment.createdAt && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Ultimo aggiornamento</p>
                          <p className="text-sm text-gray-600">{formatTimeAgo(selectedAppointment.updatedAt)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                {selectedAppointment.status === "pending" && (
                  <Button
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, "contacted")
                      setIsDetailModalOpen(false)
                    }}
                    className={
                      selectedAppointment.priority ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                    }
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contatta Cliente
                  </Button>
                )}

                {selectedAppointment.status === "contacted" && (
                  <Button
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, "in_progress")
                      setIsDetailModalOpen(false)
                    }}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Avvia Sessione
                  </Button>
                )}

                {selectedAppointment.status === "in_progress" && (
                  <Button
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, "completed")
                      setIsDetailModalOpen(false)
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completa
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    updateAppointmentStatus(selectedAppointment.id, "cancelled")
                    setIsDetailModalOpen(false)
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Annulla
                </Button>

                <Button variant="outline">
                  <Archive className="w-4 h-4 mr-2" />
                  Archivia
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
