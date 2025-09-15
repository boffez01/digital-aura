"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  RefreshCw,
  Mail,
  CalendarIcon,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Send,
  Eye,
  BarChart3,
  Settings,
  TrendingUp,
  Shield,
  Bell,
  Zap,
  Activity,
  Users,
  Phone,
  Plus,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Self-contained language management for admin page
const useAdminLanguage = () => {
  const [language, setLanguage] = useState<"it" | "en">("it")

  useEffect(() => {
    // Read language from localStorage
    const savedLanguage = localStorage.getItem("language") as "it" | "en"
    if (savedLanguage && (savedLanguage === "it" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }

    // Listen for language changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "language" && e.newValue) {
        const newLang = e.newValue as "it" | "en"
        if (newLang === "it" || newLang === "en") {
          setLanguage(newLang)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return { language }
}

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  createdAt: string
  status: string
  priority: string
  notes: string
}

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
  updated_at: string
  google_event_id?: string
  google_event_link?: string
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

// Custom Calendar Component
const CustomCalendar = ({
  selectedDate,
  onDateSelect,
  appointments,
}: {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  appointments: Appointment[]
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthNames = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ]

  const dayNames = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Adjust for Monday start

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const hasAppointmentsOnDate = (date: Date) => {
    if (!date) return false
    const dateString = date.toISOString().split("T")[0]
    return appointments.some((apt) => {
      if (!apt || !apt.date) return false
      const aptDate = apt.date.split("T")[0]
      return aptDate === dateString
    })
  }

  const isToday = (date: Date) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    if (!date) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className="bg-white rounded-lg p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")} className="p-2 hover:bg-gray-100">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")} className="p-2 hover:bg-gray-100">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <div key={index} className="aspect-square">
            {date ? (
              <button
                onClick={() => onDateSelect(date)}
                className={`w-full h-full flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
                  isSelected(date)
                    ? "bg-blue-500 text-white font-bold"
                    : isToday(date)
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : hasAppointmentsOnDate(date)
                        ? "bg-green-500 text-white font-semibold hover:bg-green-600"
                        : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-gray-600">Giorni con appuntamenti</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-100 border-2 border-blue-500 rounded-full mr-2"></div>
          <span className="text-gray-600">Oggi</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-gray-600">Data selezionata</span>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { language } = useAdminLanguage()
  const [activeTab, setActiveTab] = useState("calendario")
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
  const [error, setError] = useState<string | null>(null)
  const [showAllMessages, setShowAllMessages] = useState(false)
  const [emailDialog, setEmailDialog] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [sendingEmail, setSendingEmail] = useState(false)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      setError(null)
      console.log("🔄 Fetching admin data...")

      // Fetch appointments
      const appointmentsRes = await fetch("/api/admin/appointments", {
        cache: "no-store",
      })
      if (appointmentsRes.ok) {
        const data = await appointmentsRes.json()
        console.log("📅 Appointments API response:", data)

        if (data.success && Array.isArray(data.appointments)) {
          setAppointments(data.appointments)

          // Calculate stats from appointments
          const today = new Date().toISOString().split("T")[0]
          const todayAppointments = data.appointments.filter(
            (apt: Appointment) => apt.date && apt.date.split("T")[0] === today,
          ).length

          setStats((prev) => ({
            ...prev,
            totalAppointments: data.appointments.length,
            confirmedAppointments: data.appointments.filter((apt: Appointment) => apt.status === "confirmed").length,
            pendingAppointments: data.appointments.filter((apt: Appointment) => apt.status === "pending").length,
            todayAppointments: todayAppointments,
          }))
        }
      }

      // Fetch contacts
      try {
        const contactsRes = await fetch("/api/admin/contacts", {
          cache: "no-store",
        })
        if (contactsRes.ok) {
          const contactsData = await contactsRes.json()
          if (contactsData.success && Array.isArray(contactsData.contacts)) {
            setContacts(contactsData.contacts)
            setStats((prev) => ({
              ...prev,
              totalContacts: contactsData.contacts.length,
              respondedContacts: contactsData.contacts.filter((c: Contact) => c.status === "replied").length,
              pendingContacts: contactsData.contacts.filter((c: Contact) => c.status === "new").length,
              priorityContacts: contactsData.contacts.filter((c: Contact) => c.priority === "high").length,
            }))
          }
        }
      } catch (err) {
        console.error("Error fetching contacts:", err)
      }

      console.log("✅ Data fetch completed")
    } catch (error) {
      console.error("❌ Error fetching data:", error)
      setError("Errore nel caricamento dei dati")
    } finally {
      setLoading(false)
    }
  }

  const sendEmailReply = async () => {
    if (!selectedContact || !emailSubject || !emailMessage) return

    setSendingEmail(true)
    try {
      const response = await fetch("/api/notifications/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: selectedContact.email,
          subject: emailSubject,
          message: emailMessage,
          type: "reply",
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert("Email inviata con successo!")
        setEmailDialog(false)
        setEmailSubject("")
        setEmailMessage("")
        setSelectedContact(null)
      } else {
        alert("Errore nell'invio dell'email: " + result.error)
      }
    } catch (error) {
      console.error("Error sending email:", error)
      alert("Errore nell'invio dell'email")
    } finally {
      setSendingEmail(false)
    }
  }

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    if (!Array.isArray(appointments)) return []

    const dateString = date.toISOString().split("T")[0]
    return appointments.filter((apt) => {
      if (!apt || !apt.date) return false
      const aptDate = apt.date.split("T")[0]
      return aptDate === dateString
    })
  }

  const selectedDateAppointments = getAppointmentsForDate(selectedDate)

  const formatTime = (timeString: string) => {
    if (!timeString) return ""
    return timeString.slice(0, 5)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    } catch (err) {
      return dateString
    }
  }

  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case "ai-automation":
        return "🤖"
      case "web-development":
        return "🌐"
      case "ai-marketing":
        return "📊"
      case "chatbot":
        return "💬"
      default:
        return "⚡"
    }
  }

  const getRecentActivities = () => {
    const activities = [
      {
        type: "appointment",
        message: "Nuovo appuntamento confermato",
        time: "2 minuti fa",
        color: "green",
        icon: CheckCircle,
      },
      {
        type: "contact",
        message: "Nuova conversazione chatbot",
        time: "5 minuti fa",
        color: "blue",
        icon: MessageSquare,
      },
      {
        type: "client",
        message: "Nuovo cliente registrato",
        time: "12 minuti fa",
        color: "purple",
        icon: User,
      },
      {
        type: "backup",
        message: "Backup automatico completato",
        time: "1 ora fa",
        color: "orange",
        icon: Shield,
      },
    ]
    return activities
  }

  const getServiceBadgeColor = (service: string) => {
    switch (service.toLowerCase()) {
      case "chatbot":
        return "bg-blue-100 text-blue-800"
      case "marketing":
        return "bg-green-100 text-green-800"
      case "web":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const TabButton = ({ id, label, isActive, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
        isActive
          ? id === "calendario"
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
            : id === "moduli"
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
              : id === "panoramica"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
    >
      {id === "calendario" && <CalendarIcon className="w-4 h-4" />}
      {id === "moduli" && <Settings className="w-4 h-4" />}
      {id === "panoramica" && <BarChart3 className="w-4 h-4" />}
      {id === "messaggi" && <MessageSquare className="w-4 h-4" />}
      {label}
    </button>
  )

  const displayedMessages = showAllMessages ? contacts : contacts.slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Caricamento dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Gestisci la tua piattaforma Digital Aura</p>
          </div>
          <Button
            onClick={fetchData}
            disabled={loading}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Aggiorna
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
            <Button onClick={fetchData} className="ml-4 bg-red-600 hover:bg-red-700 text-white">
              Riprova
            </Button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <TabButton id="calendario" label="Calendario" isActive={activeTab === "calendario"} onClick={setActiveTab} />
          <TabButton id="moduli" label="Moduli Sistema" isActive={activeTab === "moduli"} onClick={setActiveTab} />
          <TabButton id="panoramica" label="Panoramica" isActive={activeTab === "panoramica"} onClick={setActiveTab} />
          <TabButton id="messaggi" label="Messaggi" isActive={activeTab === "messaggi"} onClick={setActiveTab} />
        </div>

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
                  <CustomCalendar
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    appointments={appointments}
                  />
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
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {selectedDateAppointments.length > 0 ? (
                    selectedDateAppointments
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((appointment) => (
                        <div key={appointment.id} className="bg-white/10 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mr-3">
                                <span className="text-lg">{getServiceIcon(appointment.service)}</span>
                              </div>
                              <div>
                                <span className="font-bold text-lg">{formatTime(appointment.time)}</span>
                                <p className="text-purple-100 text-sm">{appointment.service}</p>
                              </div>
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
                              {appointment.status === "confirmed" ? "confermato" : "pending"}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-purple-100">
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
                          {appointment.message && (
                            <div className="mt-3 p-2 bg-white/10 rounded text-sm">{appointment.message}</div>
                          )}
                          <div className="mt-2 text-xs text-purple-200">
                            Prenotato il {new Date(appointment.created_at).toLocaleDateString("it-IT")}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-purple-100">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nessun appuntamento per questa data</p>
                      <p className="text-sm mt-2">Seleziona una data diversa o aggiungi un nuovo appuntamento</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

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

        {/* Messaggi Tab */}
        {activeTab === "messaggi" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100">Messaggi Totali</span>
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
                  <div className="text-green-100 text-sm">Tasso risposta 70%</div>
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

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100">Prioritari</span>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stats.priorityContacts}</div>
                  <div className="text-purple-100 text-sm">Supporto tecnico</div>
                </CardContent>
              </Card>
            </div>

            {/* Lista Messaggi */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-900">
                  <div className="flex items-center">
                    <MessageSquare className="w-6 h-6 mr-3" />
                    Messaggi Recenti
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowAllMessages(!showAllMessages)}
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white border-0"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {showAllMessages ? "Mostra Meno" : "Visualizza Tutti"}
                    </Button>
                    <Button onClick={fetchData} variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Aggiorna
                    </Button>
                  </div>
                </CardTitle>
                <p className="text-gray-600">Ultimi messaggi ricevuti dal sistema</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {displayedMessages.length > 0 ? (
                  displayedMessages.map((contact) => (
                    <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900">{contact.name}</span>
                            <p className="text-sm text-gray-500">{contact.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${getServiceBadgeColor(contact.service)} border-0`}>
                            {contact.service}
                          </Badge>
                          <Badge className="bg-orange-100 text-orange-800 border-0 text-xs">In Attesa</Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(contact.createdAt).toLocaleDateString("it-IT")}
                          </span>
                        </div>
                      </div>
                      <div className="ml-13">
                        <p className="text-gray-900 mb-2 text-sm">{contact.message}</p>
                        <div className="flex space-x-2">
                          <Dialog
                            open={emailDialog && selectedContact?.id === contact.id}
                            onOpenChange={setEmailDialog}
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1"
                                onClick={() => {
                                  setSelectedContact(contact)
                                  setEmailSubject(`Re: ${contact.service} - Risposta alla tua richiesta`)
                                  setEmailMessage(
                                    `Ciao ${contact.name},\n\nGrazie per averci contattato riguardo ${contact.service}.\n\n`,
                                  )
                                }}
                              >
                                <Mail className="w-3 h-3 mr-1" />
                                Rispondi
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Rispondi a {selectedContact?.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="email-to">Destinatario</Label>
                                  <Input
                                    id="email-to"
                                    value={selectedContact?.email || ""}
                                    disabled
                                    className="bg-muted"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="email-subject">Oggetto</Label>
                                  <Input
                                    id="email-subject"
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                    placeholder="Oggetto dell'email"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="email-message">Messaggio</Label>
                                  <Textarea
                                    id="email-message"
                                    value={emailMessage}
                                    onChange={(e) => setEmailMessage(e.target.value)}
                                    placeholder="Scrivi la tua risposta..."
                                    rows={8}
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setEmailDialog(false)
                                      setSelectedContact(null)
                                      setEmailSubject("")
                                      setEmailMessage("")
                                    }}
                                  >
                                    Annulla
                                  </Button>
                                  <Button
                                    onClick={sendEmailReply}
                                    disabled={sendingEmail || !emailSubject || !emailMessage}
                                    className="bg-blue-500 hover:bg-blue-600"
                                  >
                                    {sendingEmail ? (
                                      <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Invio...
                                      </>
                                    ) : (
                                      <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Invia Email
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" variant="outline" className="text-xs px-3 py-1 bg-transparent">
                            <Eye className="w-3 h-3 mr-1" />
                            Dettagli
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nessun messaggio trovato</p>
                    <Button onClick={fetchData} className="mt-4 bg-transparent" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Ricarica Messaggi
                    </Button>
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
