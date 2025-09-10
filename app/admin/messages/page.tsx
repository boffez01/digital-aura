"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
  Reply,
  Archive,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Message {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
  created_at: string
  status: "new" | "read" | "replied" | "archived"
  priority: "low" | "medium" | "high"
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState("")
  const [isReplying, setIsReplying] = useState(false)

  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/admin/contacts")
      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }

      const data = await response.json()

      // Transform contacts into messages format with safe date handling
      const transformedMessages: Message[] = (data.contacts || []).map((contact: any, index: number) => ({
        id: contact.id || index,
        name: contact.name || "Nome non disponibile",
        email: contact.email || "Email non disponibile",
        phone: contact.phone || "",
        company: contact.company || "",
        service: contact.service || "Generale",
        message: contact.message || "Nessun messaggio",
        created_at: contact.created_at || new Date().toISOString(),
        status: contact.status || "new",
        priority: contact.priority || "medium",
      }))

      setMessages(transformedMessages)
      setFilteredMessages(transformedMessages)
    } catch (error) {
      console.error("Error fetching messages:", error)
      setError("Errore nel caricamento dei messaggi")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    let filtered = messages

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.service.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((message) => message.status === statusFilter)
    }

    setFilteredMessages(filtered)
  }, [messages, searchTerm, statusFilter])

  const formatDate = (dateString: string | undefined) => {
    try {
      if (!dateString) {
        return "Data non disponibile"
      }

      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return "Data non valida"
      }

      return date.toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (error) {
      console.error("Error formatting date:", dateString, error)
      return "Data non disponibile"
    }
  }

  const updateMessageStatus = async (messageId: number, status: string) => {
    try {
      // Update local state immediately for better UX
      setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, status: status as any } : msg)))

      // Here you would typically make an API call to update the status
      // await fetch(`/api/admin/messages/${messageId}`, {
      //   method: 'PATCH',
      //   body: JSON.stringify({ status })
      // })
    } catch (error) {
      console.error("Error updating message status:", error)
    }
  }

  const deleteMessage = async (messageId: number) => {
    if (!confirm("Sei sicuro di voler eliminare questo messaggio?")) return

    try {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
      setSelectedMessage(null)

      // Here you would typically make an API call to delete the message
      // await fetch(`/api/admin/messages/${messageId}`, { method: 'DELETE' })
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  const sendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return

    try {
      setIsReplying(true)

      // Here you would typically send the reply via email
      // await fetch('/api/admin/messages/reply', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     messageId: selectedMessage.id,
      //     reply: replyText,
      //     recipientEmail: selectedMessage.email
      //   })
      // })

      // Update message status to replied
      await updateMessageStatus(selectedMessage.id, "replied")
      setReplyText("")
      alert("Risposta inviata con successo!")
    } catch (error) {
      console.error("Error sending reply:", error)
      alert("Errore nell'invio della risposta")
    } finally {
      setIsReplying(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "read":
        return "bg-yellow-100 text-yellow-800"
      case "replied":
        return "bg-green-100 text-green-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Errore</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
            <Button onClick={fetchMessages} className="mt-4">
              Riprova
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestione Messaggi</h1>
          <p className="text-gray-600">Visualizza e gestisci tutti i messaggi ricevuti</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{messages.length}</p>
                  <p className="text-sm text-gray-600">Totali</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertCircle className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{messages.filter((m) => m.status === "new").length}</p>
                  <p className="text-sm text-gray-600">Nuovi</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{messages.filter((m) => m.status === "replied").length}</p>
                  <p className="text-sm text-gray-600">Risposti</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Archive className="w-8 h-8 text-gray-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{messages.filter((m) => m.status === "archived").length}</p>
                  <p className="text-sm text-gray-600">Archiviati</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cerca per nome, email, messaggio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtra per stato" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="new">Nuovi</SelectItem>
                  <SelectItem value="read">Letti</SelectItem>
                  <SelectItem value="replied">Risposti</SelectItem>
                  <SelectItem value="archived">Archiviati</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Messaggi ({filteredMessages.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedMessage?.id === message.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                        }`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{message.name}</h3>
                              <Badge className={`text-xs ${getStatusColor(message.status)}`}>
                                {message.status === "new"
                                  ? "Nuovo"
                                  : message.status === "read"
                                    ? "Letto"
                                    : message.status === "replied"
                                      ? "Risposto"
                                      : "Archiviato"}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                                {message.priority === "high"
                                  ? "Alta"
                                  : message.priority === "medium"
                                    ? "Media"
                                    : "Bassa"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{message.email}</p>
                            <p className="text-sm text-gray-500 mb-2">Servizio: {message.service}</p>
                            <p className="text-sm text-gray-700 line-clamp-2">{message.message}</p>
                          </div>
                          <div className="text-xs text-gray-500 ml-4">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {formatDate(message.created_at)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nessun messaggio trovato</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Detail */}
          <div>
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Dettagli Messaggio</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateMessageStatus(selectedMessage.id, "archived")}
                      >
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{selectedMessage.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedMessage.email}</span>
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{selectedMessage.phone}</span>
                      </div>
                    )}
                    {selectedMessage.company && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">Azienda: {selectedMessage.company}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{formatDate(selectedMessage.created_at)}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Servizio Richiesto:</h4>
                    <Badge className="mb-4">{selectedMessage.service}</Badge>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Messaggio:</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Stato:</h4>
                    <Select
                      value={selectedMessage.status}
                      onValueChange={(value) => updateMessageStatus(selectedMessage.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="new">Nuovo</SelectItem>
                        <SelectItem value="read">Letto</SelectItem>
                        <SelectItem value="replied">Risposto</SelectItem>
                        <SelectItem value="archived">Archiviato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Risposta:</h4>
                    <Textarea
                      placeholder="Scrivi la tua risposta..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="mb-2"
                      rows={4}
                    />
                    <Button onClick={sendReply} disabled={isReplying || !replyText.trim()} className="w-full">
                      <Reply className="w-4 h-4 mr-2" />
                      {isReplying ? "Invio in corso..." : "Invia Risposta"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Seleziona un messaggio per visualizzare i dettagli</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
