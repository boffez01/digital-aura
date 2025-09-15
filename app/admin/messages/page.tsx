"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  RefreshCw,
  Mail,
  Phone,
  Building,
  Calendar,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
} from "lucide-react"
import { useLanguage } from "../../contexts/language-context"

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

interface ContactStats {
  total: number
  thisMonth: number
  byService: Record<string, number>
  byStatus: Record<string, number>
}

export default function AdminMessagesPage() {
  const { language } = useLanguage()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [stats, setStats] = useState<ContactStats>({
    total: 0,
    thisMonth: 0,
    byService: {},
    byStatus: { new: 0, contacted: 0, qualified: 0, converted: 0, closed: 0 },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔄 Fetching contacts from API...")

      // QUESTA È LA RIGA CHIAVE: cache: 'no-store' forza il refresh dei dati
      const response = await fetch("/api/admin/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // ← RISOLVE IL PROBLEMA DEL CACHING!
      })

      const data = await response.json()
      console.log("📧 API Response:", data)

      if (data.success) {
        setContacts(data.contacts || [])
        setStats(
          data.stats || {
            total: 0,
            thisMonth: 0,
            byService: {},
            byStatus: { new: 0, contacted: 0, qualified: 0, converted: 0, closed: 0 },
          },
        )
        console.log(`✅ Loaded ${data.contacts?.length || 0} contacts`)
      } else {
        throw new Error(data.error || "Errore nel caricamento dei contatti")
      }
    } catch (err) {
      console.error("❌ Error fetching contacts:", err)
      setError(err instanceof Error ? err.message : "Errore sconosciuto")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "contacted":
        return "bg-yellow-500"
      case "qualified":
        return "bg-green-500"
      case "converted":
        return "bg-purple-500"
      case "closed":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4" />
      case "contacted":
        return <Clock className="w-4 h-4" />
      case "qualified":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "Data non valida"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Caricamento messaggi...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">Errore nel caricamento</span>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <Button onClick={fetchMessages} variant="outline" className="border-red-300 bg-transparent">
              <RefreshCw className="w-4 h-4 mr-2" />
              Riprova
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === "it" ? "Messaggi" : "Messages"} ({stats.total})
          </h1>
          <p className="text-muted-foreground">
            {language === "it"
              ? `${stats.thisMonth} nuovi messaggi questo mese`
              : `${stats.thisMonth} new messages this month`}
          </p>
        </div>
        <Button onClick={fetchMessages} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === "it" ? "Aggiorna" : "Refresh"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Totali</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Nuovi</p>
                <p className="text-2xl font-bold">{stats.byStatus.new || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Questo Mese</p>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Servizi Richiesti</p>
                <p className="text-2xl font-bold">{Object.keys(stats.byService).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Lista Messaggi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nessun messaggio trovato</p>
                    <Button onClick={fetchMessages} className="mt-4 bg-transparent" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Ricarica Messaggi
                    </Button>
                  </div>
                ) : (
                  contacts.map((contact) => (
                    <Card
                      key={contact.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedContact?.id === contact.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold">{contact.name}</span>
                            <Badge variant="outline" className={`${getStatusColor(contact.status)} text-white`}>
                              {contact.status}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{formatDate(contact.createdAt)}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MessageSquare className="w-3 h-3" />
                            <span>Servizio: {contact.service}</span>
                          </div>
                          <p className="text-foreground line-clamp-2 mt-2">{contact.message}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Dettagli Messaggio
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContact ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold text-lg">{selectedContact.name}</span>
                  <Badge variant="outline" className={`${getStatusColor(selectedContact.status)} text-white`}>
                    {getStatusIcon(selectedContact.status)}
                    {selectedContact.status}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <span>{selectedContact.email}</span>
                  </div>

                  {selectedContact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Telefono:</span>
                      <span>{selectedContact.phone}</span>
                    </div>
                  )}

                  {selectedContact.company && (
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Azienda:</span>
                      <span>{selectedContact.company}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Servizio:</span>
                    <Badge variant="secondary">{selectedContact.service}</Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Data:</span>
                    <span>{formatDate(selectedContact.createdAt)}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Messaggio:</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Rispondi
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Chiama
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Seleziona un messaggio per vedere i dettagli</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
