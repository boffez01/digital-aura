"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  Activity,
  DollarSign,
  Clock,
  MessageSquare,
  Tag,
  Edit,
  Download,
  Upload,
  BarChart3,
  UserPlus,
  Heart,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Building,
  Briefcase,
  History,
} from "lucide-react"
import Link from "next/link"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  position?: string
  location: string
  avatar?: string
  status: "active" | "inactive" | "prospect" | "vip"
  segment: "enterprise" | "business" | "startup" | "individual"
  totalValue: number
  lastContact: string
  acquisitionDate: string
  source: string
  tags: string[]
  notes: string
  satisfaction: number
  appointments: number
  projects: number
  revenue: number
  lastActivity: string
  priority: "high" | "medium" | "low"
  lifecycle: "lead" | "prospect" | "customer" | "advocate" | "churned"
  interactions: Array<{
    id: string
    type: "email" | "call" | "meeting" | "project" | "support"
    title: string
    description: string
    date: string
    outcome: "positive" | "neutral" | "negative"
  }>
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [segmentFilter, setSegmentFilter] = useState("all")
  const [sortBy, setSortBy] = useState("lastContact")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [showCustomerDetail, setShowCustomerDetail] = useState(false)

  // Statistiche
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    vip: 0,
    prospects: 0,
    totalRevenue: 0,
    avgSatisfaction: 0,
    newThisMonth: 0,
    churnRate: 0,
  })

  useEffect(() => {
    fetchCustomers()
  }, [])

  useEffect(() => {
    filterCustomers()
  }, [customers, searchTerm, statusFilter, segmentFilter, sortBy])

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/admin/customers")
      const data = await response.json()
      setCustomers(data.customers)
      setStats(data.stats)
    } catch (error) {
      console.error("Errore nel caricamento clienti:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterCustomers = () => {
    let filtered = [...customers]

    // Filtro ricerca
    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filtro stato
    if (statusFilter !== "all") {
      filtered = filtered.filter((customer) => customer.status === statusFilter)
    }

    // Filtro segmento
    if (segmentFilter !== "all") {
      filtered = filtered.filter((customer) => customer.segment === segmentFilter)
    }

    // Ordinamento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "revenue":
          return b.revenue - a.revenue
        case "satisfaction":
          return b.satisfaction - a.satisfaction
        case "lastContact":
        default:
          return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime()
      }
    })

    setFilteredCustomers(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "vip":
        return "bg-purple-100 text-purple-800"
      case "prospect":
        return "bg-blue-100 text-blue-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "enterprise":
        return "bg-red-100 text-red-800"
      case "business":
        return "bg-orange-100 text-orange-800"
      case "startup":
        return "bg-green-100 text-green-800"
      case "individual":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return null
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const CustomerCard = ({ customer }: { customer: Customer }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group">
      <Card
        className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200 cursor-pointer"
        onClick={() => {
          setSelectedCustomer(customer)
          setShowCustomerDetail(true)
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {customer.name}
                </h3>
                {customer.company && <p className="text-sm text-gray-600">{customer.company}</p>}
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <Badge className={getStatusColor(customer.status)}>{customer.status.toUpperCase()}</Badge>
              {getPriorityIcon(customer.priority)}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              {customer.email}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              {customer.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {customer.location}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Badge className={getSegmentColor(customer.segment)}>{customer.segment}</Badge>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{customer.satisfaction}/5</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{customer.appointments}</p>
              <p className="text-xs text-gray-600">Appuntamenti</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(customer.revenue)}</p>
              <p className="text-xs text-gray-600">Fatturato</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {customer.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {customer.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{customer.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="text-xs text-gray-500">Ultimo contatto: {formatDate(customer.lastContact)}</div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const CustomerRow = ({ customer }: { customer: Customer }) => (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hover:bg-gray-50 cursor-pointer"
      onClick={() => {
        setSelectedCustomer(customer)
        setShowCustomerDetail(true)
      }}
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-gray-800">{customer.name}</div>
            {customer.company && <div className="text-sm text-gray-600">{customer.company}</div>}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-800">{customer.email}</div>
        <div className="text-sm text-gray-600">{customer.phone}</div>
      </td>
      <td className="px-6 py-4">
        <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
      </td>
      <td className="px-6 py-4">
        <Badge className={getSegmentColor(customer.segment)}>{customer.segment}</Badge>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span>{customer.satisfaction}/5</span>
        </div>
      </td>
      <td className="px-6 py-4 text-center font-medium text-green-600">{formatCurrency(customer.revenue)}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(customer.lastContact)}</td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-1">{getPriorityIcon(customer.priority)}</div>
      </td>
    </motion.tr>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento clienti...</p>
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
              <Link href="/admin" className="text-gray-600 hover:text-purple-600">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-800">Gestione Clienti</h1>
              </div>
              <Badge className="bg-purple-100 text-purple-700">
                {filteredCustomers.length} di {customers.length} clienti
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Esporta
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Upload className="w-4 h-4 mr-2" />
                Importa
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowAddCustomer(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Nuovo Cliente
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Statistiche */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clienti Totali</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                  <p className="text-sm text-green-600">+{stats.newThisMonth} questo mese</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clienti Attivi</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.active}</p>
                  <p className="text-sm text-gray-600">{((stats.active / stats.total) * 100).toFixed(1)}% del totale</p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Fatturato Totale</p>
                  <p className="text-3xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p>
                  <p className="text-sm text-green-600">+12% vs mese scorso</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Soddisfazione Media</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.avgSatisfaction}/5</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(stats.avgSatisfaction) ? "text-yellow-500 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtri e Ricerca */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cerca per nome, email, azienda o tag..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Stato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti gli stati</SelectItem>
                    <SelectItem value="active">Attivi</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="inactive">Inattivi</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i segmenti</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordina per" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lastContact">Ultimo contatto</SelectItem>
                    <SelectItem value="name">Nome</SelectItem>
                    <SelectItem value="revenue">Fatturato</SelectItem>
                    <SelectItem value="satisfaction">Soddisfazione</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista Clienti */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contatti
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stato
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Segmento
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Soddisfazione
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fatturato
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ultimo Contatto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priorità
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <CustomerRow key={customer.id} customer={customer} />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredCustomers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Nessun cliente trovato</h3>
              <p className="text-gray-600 mb-6">Prova a modificare i filtri di ricerca o aggiungi un nuovo cliente.</p>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowAddCustomer(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Aggiungi Primo Cliente
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal Dettaglio Cliente */}
      <Dialog open={showCustomerDetail} onOpenChange={setShowCustomerDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                    {selectedCustomer.company && <p className="text-gray-600">{selectedCustomer.company}</p>}
                  </div>
                  <Badge className={getStatusColor(selectedCustomer.status)}>
                    {selectedCustomer.status.toUpperCase()}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Panoramica</TabsTrigger>
                  <TabsTrigger value="interactions">Interazioni</TabsTrigger>
                  <TabsTrigger value="projects">Progetti</TabsTrigger>
                  <TabsTrigger value="notes">Note</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          Informazioni Personali
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{selectedCustomer.location}</span>
                        </div>
                        {selectedCustomer.company && (
                          <div className="flex items-center space-x-3">
                            <Building className="w-4 h-4 text-gray-500" />
                            <span>{selectedCustomer.company}</span>
                          </div>
                        )}
                        {selectedCustomer.position && (
                          <div className="flex items-center space-x-3">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <span>{selectedCustomer.position}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2" />
                          Metriche Cliente
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Soddisfazione</span>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < selectedCustomer.satisfaction ? "text-yellow-500 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">{selectedCustomer.satisfaction}/5</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Fatturato Totale</span>
                          <span className="font-bold text-green-600">{formatCurrency(selectedCustomer.revenue)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Appuntamenti</span>
                          <span className="font-medium">{selectedCustomer.appointments}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Progetti</span>
                          <span className="font-medium">{selectedCustomer.projects}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Cliente da</span>
                          <span className="font-medium">{formatDate(selectedCustomer.acquisitionDate)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Tag className="w-5 h-5 mr-2" />
                        Segmentazione e Tag
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600 font-medium">Segmento:</span>
                          <Badge className={getSegmentColor(selectedCustomer.segment)}>
                            {selectedCustomer.segment}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600 font-medium">Priorità:</span>
                          <div className="flex items-center space-x-2">
                            {getPriorityIcon(selectedCustomer.priority)}
                            <span className="capitalize">{selectedCustomer.priority}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600 font-medium">Lifecycle:</span>
                          <Badge variant="outline">{selectedCustomer.lifecycle}</Badge>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium mb-2 block">Tag:</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedCustomer.tags.map((tag, index) => (
                              <Badge key={index} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="interactions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <History className="w-5 h-5 mr-2" />
                        Storico Interazioni
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedCustomer.interactions.map((interaction) => (
                          <div key={interaction.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                            <div
                              className={`p-2 rounded-full ${
                                interaction.outcome === "positive"
                                  ? "bg-green-100"
                                  : interaction.outcome === "negative"
                                    ? "bg-red-100"
                                    : "bg-gray-100"
                              }`}
                            >
                              {interaction.type === "email" && <Mail className="w-4 h-4" />}
                              {interaction.type === "call" && <Phone className="w-4 h-4" />}
                              {interaction.type === "meeting" && <Calendar className="w-4 h-4" />}
                              {interaction.type === "project" && <Briefcase className="w-4 h-4" />}
                              {interaction.type === "support" && <MessageSquare className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{interaction.title}</h4>
                                <span className="text-sm text-gray-500">{formatDate(interaction.date)}</span>
                              </div>
                              <p className="text-gray-600 text-sm mt-1">{interaction.description}</p>
                              <Badge
                                className={`mt-2 ${
                                  interaction.outcome === "positive"
                                    ? "bg-green-100 text-green-800"
                                    : interaction.outcome === "negative"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {interaction.outcome}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        Progetti e Servizi
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Storico progetti in sviluppo</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Note e Commenti
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Aggiungi note sul cliente..."
                        value={selectedCustomer.notes}
                        rows={6}
                        className="mb-4"
                      />
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Salva Note
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button variant="outline" className="bg-transparent">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifica
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Prenota Appuntamento
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Invia Email
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Aggiungi Cliente */}
      <Dialog open={showAddCustomer} onOpenChange={setShowAddCustomer}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <UserPlus className="w-6 h-6 mr-2" />
              Aggiungi Nuovo Cliente
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome *</label>
                <Input placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input type="email" placeholder="email@esempio.com" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Telefono</label>
                <Input placeholder="+39 123 456 7890" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Azienda</label>
                <Input placeholder="Nome azienda" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Segmento</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Priorità</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona priorità" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="low">Bassa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Note iniziali</label>
              <Textarea placeholder="Note sul cliente..." rows={3} />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setShowAddCustomer(false)}>
                Annulla
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Crea Cliente
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
