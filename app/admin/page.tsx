"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  CalendarIcon,
  Settings,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Zap,
  Shield,
  Bell,
  Mail,
  Phone,
  User,
  RefreshCw,
  Plus,
  Eye,
} from "lucide-react"

interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
  status: string
  created_at: string
}

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  status: string
}

interface Stats {
  totalAppointments: number
  confirmedAppointments: number
  pendingAppointments: number
  todayAppointments: number
  totalContacts: number
  respondedContacts: number
  pendingContacts: number
  priorityContacts: number
  totalRevenue: number
  activeClients: number
  conversionRate: number
  responseTime: number
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("moduli")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [stats, setStats] = useState<Stats>({
    totalAppointments: 0,
    confirmedAppointments: 0,
    pendingAppointments: 0,
    todayAppointments: 0,
    totalContacts: 0,
    respondedContacts: 0,
    pendingContacts: 0,
    priorityContacts: 0,
    totalRevenue: 45231,
    activeClients: 127,
    conversionRate: 94.2,
    responseTime: 145,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      // Fetch appointments
      const appointmentsRes = await fetch("/api/admin/appointments")
      if (appointmentsRes.ok) {
        const appointmentsData = await appointmentsRes.json()
        setAppointments(appointmentsData)
      }

      // Fetch contacts
      const contactsRes = await fetch("/api/admin/contacts")
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json()
        setContacts(contactsData)
      }

      // Calculate stats
      const today = new Date().toISOString().split("T")[0]
      const totalAppointments = appointments.length
      const confirmedAppointments = appointments.filter((apt) => apt.status === "confirmed").length
      const pendingAppointments = appointments.filter((apt) => apt.status === "pending").length
      const todayAppointments = appointments.filter((apt) => apt.date === today).length

      const totalContacts = contacts.length
      const respondedContacts = contacts.filter((contact) => contact.status === "responded").length
      const pendingContacts = contacts.filter((contact) => contact.status === "pending").length
      const priorityContacts = contacts.filter((contact) => contact.subject.toLowerCase().includes("urgent")).length

      setStats((prev) => ({
        ...prev,
        totalAppointments,
        confirmedAppointments,
        pendingAppointments,
        todayAppointments,
        totalContacts,
        respondedContacts,
        pendingContacts,
        priorityContacts,
      }))
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return appointments.filter((apt) => apt.date === dateString)
  }

  const hasAppointmentsOnDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return appointments.some((apt) => apt.date === dateString)
  }

  const selectedDateAppointments = getAppointmentsForDate(selectedDate)

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const getRecentActivities = () => {
    const activities = []

    // Recent appointments
    const recentAppointments = appointments
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 2)

    recentAppointments.forEach((apt) => {
      activities.push({
        type: "appointment",
        message: "Nuovo appuntamento confermato",
        time: getTimeAgo(apt.created_at),
        color: "green",
        icon: CheckCircle,
      })
    })

    // Recent contacts
    const recentContacts = contacts
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 2)

    recentContacts.forEach((contact) => {
      activities.push({
        type: "contact",
        message: "Nuova conversazione chatbot",
        time: getTimeAgo(contact.created_at),
        color: "blue",
        icon: MessageSquare,
      })
    })

    return activities.slice(0, 4)
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Ora"
    if (diffInMinutes < 60) return `${diffInMinutes} minuti fa`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ore fa`
    return `${Math.floor(diffInMinutes / 1440)} giorni fa`
  }

  const TabButton = ({ id, label, isActive, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? id === "calendario"
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
            : id === "moduli"
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
              : id === "panoramica"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Gestisci la tua piattaforma Digital Aura</p>
          </div>
          <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Aggiorna
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <TabButton
            id="calendario"
            label="📅 Calendario"
            isActive={activeTab === "calendario"}
            onClick={setActiveTab}
          />
          <TabButton id="moduli" label="⚙️ Moduli Sistema" isActive={activeTab === "moduli"} onClick={setActiveTab} />
          <TabButton
            id="panoramica"
            label="📊 Panoramica"
            isActive={activeTab === "panoramica"}
            onClick={setActiveTab}
          />
          <TabButton id="messaggi" label="💬 Messaggi" isActive={activeTab === "messaggi"} onClick={setActiveTab} />
        </div>

        {/* Moduli Sistema Tab */}
        {activeTab === "moduli" && (
          <div className="space-y-8">
            {/* Main Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Analytics Card */}
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="w-8 h-8" />
                    <Badge className="bg-white/20 text-white border-0">Analytics</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Analytics</h3>
                  <p className="text-blue-100 mb-4">Analisi avanzate e metriche</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-100">Conversioni</span>
                      <span className="font-bold">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">ROI</span>
                      <span className="font-bold">+340%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Servizi Card */}
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="w-8 h-8" />
                    <Badge className="bg-white/20 text-white border-0">Servizi</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Servizi</h3>
                  <p className="text-green-100 mb-4">Gestione servizi e automazioni</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-100">Attivi</span>
                      <span className="font-bold">4/4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-100">Uptime</span>
                      <span className="font-bold">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifiche Card */}
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Bell className="w-8 h-8" />
                    <Badge className="bg-white/20 text-white border-0">Notifiche</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Notifiche</h3>
                  <p className="text-purple-100 mb-4">Sistema di notifiche avanzato</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-purple-100">Email</span>
                      <span className="font-bold">Attivo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-100">SMS</span>
                      <span className="font-bold">Attivo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sicurezza Card */}
              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="w-8 h-8" />
                    <Badge className="bg-white/20 text-white border-0">Sicurezza</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sicurezza</h3>
                  <p className="text-red-100 mb-4">Controllo accessi e sicurezza</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-red-100">Utenti</span>
                      <span className="font-bold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">Sicurezza</span>
                      <span className="font-bold">Alta</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Azioni Rapide Sistema */}
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Settings className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-bold">Azioni Rapide Sistema</h3>
                </div>
                <p className="text-purple-100 mb-6">Gestisci rapidamente i moduli del sistema</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Esplora Analytics
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <Zap className="w-5 h-5 mr-2" />
                    Gestisci Servizi
                  </Button>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <Bell className="w-5 h-5 mr-2" />
                    Configura Notifiche
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <Shield className="w-5 h-5 mr-2" />
                    Gestisci Sicurezza
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Panoramica Tab */}
        {activeTab === "panoramica" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-100">Revenue Totale</span>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">€{stats.totalRevenue.toLocaleString()}</div>
                  <div className="text-green-100 text-sm">+20.1% dal mese scorso</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100">Clienti Attivi</span>
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.activeClients}</div>
                  <div className="text-blue-100 text-sm">+4% crescita mensile</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100">Tasso Conversione</span>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.conversionRate}%</div>
                  <div className="text-purple-100 text-sm">+2.5% miglioramento</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-100">Tempo Risposta</span>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.responseTime}ms</div>
                  <div className="text-red-100 text-sm">-15% più veloce</div>
                </CardContent>
              </Card>
            </div>

            {/* Performance e Attività */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Sistema */}
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Activity className="w-6 h-6 mr-3" />
                    Performance Sistema
                  </CardTitle>
                  <p className="text-blue-100">Metriche di sistema in tempo reale</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Uptime Sistema</span>
                      <span className="font-bold">99.9%</span>
                    </div>
                    <div className="w-full bg-blue-400 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: "99.9%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Velocità Risposta API</span>
                      <span className="font-bold">145ms</span>
                    </div>
                    <div className="w-full bg-blue-400 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Utilizzo Database</span>
                      <span className="font-bold">67%</span>
                    </div>
                    <div className="w-full bg-blue-400 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: "67%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attività Recenti */}
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Clock className="w-6 h-6 mr-3" />
                    Attività Recenti
                  </CardTitle>
                  <p className="text-purple-100">Ultime attività del sistema</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getRecentActivities().map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                      <div className={`p-2 rounded-full bg-${activity.color}-500`}>
                        <activity.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.message}</p>
                        <p className="text-sm text-purple-100">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Calendario Tab */}
        {activeTab === "calendario" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100">Totale Appuntamenti</span>
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.totalAppointments}</div>
                  <div className="text-blue-100 text-sm">+12% dal mese scorso</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-100">Confermati</span>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.confirmedAppointments}</div>
                  <div className="text-green-100 text-sm">Tasso conferma 94%</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-orange-100">In Attesa</span>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.pendingAppointments}</div>
                  <div className="text-orange-100 text-sm">Da confermare</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100">Oggi</span>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.todayAppointments}</div>
                  <div className="text-purple-100 text-sm">Appuntamenti oggi</div>
                </CardContent>
              </Card>
            </div>

            {/* Calendario e Appuntamenti */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendario Interattivo */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <CalendarIcon className="w-6 h-6 mr-3" />
                    Calendario Interattivo
                  </CardTitle>
                  <p className="text-blue-100">Seleziona una data per vedere gli appuntamenti</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      locale="it"
                      className="text-gray-900"
                      modifiers={{
                        hasAppointments: (date) => hasAppointmentsOnDate(date),
                      }}
                      modifiersStyles={{
                        hasAppointments: {
                          backgroundColor: "#10b981",
                          color: "white",
                          fontWeight: "bold",
                        },
                      }}
                    />
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Giorni con appuntamenti</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>Oggi</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-white border-2 border-gray-300 rounded-full mr-2"></div>
                        <span>Data selezionata</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Appuntamenti per Data Selezionata */}
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 mr-3" />
                      Appuntamenti per {formatDate(selectedDate.toISOString())}
                    </div>
                    <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      <Plus className="w-4 h-4 mr-1" />
                      Nuovo
                    </Button>
                  </CardTitle>
                  <p className="text-purple-100">{selectedDateAppointments.length} appuntamenti trovati</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedDateAppointments.length > 0 ? (
                    selectedDateAppointments
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((appointment) => (
                        <div key={appointment.id} className="bg-white/10 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                              <span className="font-bold text-lg">{formatTime(appointment.time)}</span>
                            </div>
                            <Badge
                              className={`${
                                appointment.status === "confirmed"
                                  ? "bg-green-500"
                                  : appointment.status === "pending"
                                    ? "bg-orange-500"
                                    : "bg-gray-500"
                              } text-white border-0`}
                            >
                              {appointment.status === "confirmed" ? "confermato" : "in attesa"}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-purple-100">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              <span>{appointment.name}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2" />
                              <span>{appointment.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2" />
                              <span>{appointment.phone}</span>
                            </div>
                          </div>
                          <div className="mt-2 p-2 bg-white/10 rounded text-sm">
                            {appointment.service} - {appointment.message}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-purple-100">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nessun appuntamento per questa data</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Messaggi Tab */}
        {activeTab === "messaggi" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100">Totale Messaggi</span>
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.totalContacts}</div>
                  <div className="text-blue-100 text-sm">+8% dal mese scorso</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-100">Risposti</span>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.respondedContacts}</div>
                  <div className="text-green-100 text-sm">Tasso risposta 89%</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-orange-100">In Attesa</span>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.pendingContacts}</div>
                  <div className="text-orange-100 text-sm">Da rispondere</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-100">Prioritari</span>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.priorityContacts}</div>
                  <div className="text-red-100 text-sm">Urgenti</div>
                </CardContent>
              </Card>
            </div>

            {/* Lista Messaggi */}
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center">
                    <MessageSquare className="w-6 h-6 mr-3" />
                    Messaggi Recenti
                  </div>
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <Eye className="w-4 h-4 mr-1" />
                    Vedi Tutti
                  </Button>
                </CardTitle>
                <p className="text-purple-100">Ultimi messaggi ricevuti dal sistema</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {contacts.length > 0 ? (
                  contacts
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 5)
                    .map((contact) => (
                      <div key={contact.id} className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full mr-3 ${
                                contact.status === "responded"
                                  ? "bg-green-400"
                                  : contact.subject.toLowerCase().includes("urgent")
                                    ? "bg-red-400"
                                    : "bg-orange-400"
                              }`}
                            ></div>
                            <span className="font-bold">{contact.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={`${
                                contact.status === "responded"
                                  ? "bg-green-500"
                                  : contact.subject.toLowerCase().includes("urgent")
                                    ? "bg-red-500"
                                    : "bg-orange-500"
                              } text-white border-0`}
                            >
                              {contact.status === "responded"
                                ? "risposto"
                                : contact.subject.toLowerCase().includes("urgent")
                                  ? "urgente"
                                  : "in attesa"}
                            </Badge>
                            <span className="text-sm text-purple-100">{getTimeAgo(contact.created_at)}</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-purple-100">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="font-medium">{contact.subject}</div>
                        </div>
                        <div className="mt-2 p-2 bg-white/10 rounded text-sm">
                          {contact.message.length > 100 ? `${contact.message.substring(0, 100)}...` : contact.message}
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white border-0">
                            <Mail className="w-4 h-4 mr-1" />
                            Rispondi
                          </Button>
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white border-0">
                            <Eye className="w-4 h-4 mr-1" />
                            Dettagli
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-purple-100">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nessun messaggio ricevuto</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
