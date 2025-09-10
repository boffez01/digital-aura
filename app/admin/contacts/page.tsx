"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Calendar,
  Search,
  Download,
  RefreshCw,
  Eye,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  status: "new" | "contacted" | "qualified" | "converted" | "closed"
  createdAt: string
  notes?: string
}

interface ContactStats {
  total: number
  thisMonth: number
  byService: Record<string, number>
  byStatus: Record<string, number>
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [stats, setStats] = useState<ContactStats | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [showContactDetail, setShowContactDetail] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    filterContacts()
  }, [contacts, searchTerm, statusFilter, serviceFilter])

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/admin/contacts")
      const data = await response.json()

      if (data.success) {
        setContacts(data.contacts)
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error loading contacts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterContacts = () => {
    let filtered = [...contacts]

    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.company?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.status === statusFilter)
    }

    if (serviceFilter !== "all") {
      filtered = filtered.filter((contact) => contact.service === serviceFilter)
    }

    setFilteredContacts(filtered)
  }

  const updateContactStatus = async (contactId: string, newStatus: string, notes?: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch("/api/admin/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, status: newStatus, notes }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setContacts((prev) =>
            prev.map((contact) =>
              contact.id === contactId ? { ...contact, status: newStatus as any, notes } : contact,
            ),
          )
        }
      }
    } catch (error) {
      console.error("Error updating contact:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "qualified":
        return "bg-purple-100 text-purple-800"
      case "converted":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4" />
      case "contacted":
        return <Phone className="w-4 h-4" />
      case "qualified":
        return <CheckCircle className="w-4 h-4" />
      case "converted":
        return <TrendingUp className="w-4 h-4" />
      case "closed":
        return <Clock className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento contatti...</p>
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
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-800">Gestione Contatti</h1>
              </div>
              <Badge className="bg-purple-100 text-purple-700">
                {filteredContacts.length} di {contacts.length} contatti
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={fetchContacts}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Aggiorna
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Esporta
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contatti Totali</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Questo Mese</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.thisMonth}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Servizio Top</p>
                    <p className="text-lg font-bold text-gray-800">
                      {Object.entries(stats.byService).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A"}
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tasso Conversione</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.total > 0 ? Math.round(((stats.byStatus?.converted || 0) / stats.total) * 100) : 0}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cerca per nome, email o azienda..."
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
                    <SelectItem value="new">Nuovo</SelectItem>
                    <SelectItem value="contacted">Contattato</SelectItem>
                    <SelectItem value="qualified">Qualificato</SelectItem>
                    <SelectItem value="converted">Convertito</SelectItem>
                    <SelectItem value="closed">Chiuso</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={serviceFilter} onValueChange={setServiceFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Servizio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i servizi</SelectItem>
                    <SelectItem value="ai-automation">AI Automation</SelectItem>
                    <SelectItem value="chatbot">Smart Chatbots</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="ai-marketing">AI Marketing</SelectItem>
                    <SelectItem value="consulting">Consulenza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacts List */}
        <div className="grid gap-6">
          {filteredContacts.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
                          {contact.company && <p className="text-sm text-gray-600">{contact.company}</p>}
                        </div>
                        <Badge className={`${getStatusColor(contact.status)} flex items-center space-x-1`}>
                          {getStatusIcon(contact.status)}
                          <span className="capitalize">{contact.status}</span>
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="text-sm">{contact.email}</span>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            <span className="text-sm">{contact.phone}</span>
                          </div>
                        )}
                        {contact.service && (
                          <div className="flex items-center text-gray-600">
                            <Building className="w-4 h-4 mr-2" />
                            <span className="text-sm">{contact.service}</span>
                          </div>
                        )}
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">{formatDate(contact.createdAt)}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-start">
                          <MessageSquare className="w-4 h-4 mr-2 mt-1 text-gray-400" />
                          <p className="text-gray-700 text-sm leading-relaxed">{contact.message}</p>
                        </div>
                      </div>

                      {contact.notes && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-blue-800 text-sm">
                            <strong>Note:</strong> {contact.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedContact(contact)
                          setAdminNotes(contact.notes || "")
                          setShowContactDetail(true)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Dettagli
                      </Button>

                      {contact.status === "new" && (
                        <Button
                          size="sm"
                          onClick={() => updateContactStatus(contact.id, "contacted")}
                          disabled={isUpdating}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Contatta
                        </Button>
                      )}

                      {contact.status === "contacted" && (
                        <Button
                          size="sm"
                          onClick={() => updateContactStatus(contact.id, "qualified")}
                          disabled={isUpdating}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Qualifica
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Nessun contatto trovato</h3>
              <p className="text-gray-600">Prova a modificare i filtri di ricerca.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Contact Detail Modal */}
      <Dialog open={showContactDetail} onOpenChange={setShowContactDetail}>
        <DialogContent className="max-w-2xl">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedContact.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedContact.name}</h2>
                    {selectedContact.company && <p className="text-gray-600">{selectedContact.company}</p>}
                  </div>
                  <Badge className={getStatusColor(selectedContact.status)}>
                    {selectedContact.status.toUpperCase()}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-lg">{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Telefono</label>
                      <p className="text-lg">{selectedContact.phone}</p>
                    </div>
                  )}
                  {selectedContact.service && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Servizio</label>
                      <p className="text-lg">{selectedContact.service}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Data Contatto</label>
                    <p className="text-lg">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Messaggio</label>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <p className="text-gray-800">{selectedContact.message}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Note Amministratore</label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Aggiungi note interne..."
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setShowContactDetail(false)}>
                    Chiudi
                  </Button>
                  <Button
                    onClick={() => {
                      updateContactStatus(selectedContact.id, selectedContact.status, adminNotes)
                      setShowContactDetail(false)
                    }}
                    disabled={isUpdating}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Salva Note
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
