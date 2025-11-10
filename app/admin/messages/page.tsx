"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RefreshCw, MessageSquare, AlertCircle, Clock, User, Bot, Calendar, Zap } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"

interface SessionSummary {
  session_id: string
  message_count: number
  last_user_message: string | null
  last_activity: string
  in_booking_mode: number
}

interface MessageDetail {
  id: string
  content: string
  sender: "user" | "bot"
  created_at: string
}

interface MessageStats {
  total: number
  thisMonth: number
  activeBookings: number
}

export default function AdminMessagesPage() {
  const { language } = useLanguage()
  const [sessions, setSessions] = useState<SessionSummary[]>([])
  const [selectedSession, setSelectedSession] = useState<SessionSummary | null>(null)
  const [sessionMessages, setSessionMessages] = useState<MessageDetail[]>([])

  const [stats, setStats] = useState<MessageStats>({
    total: 0,
    thisMonth: 0,
    activeBookings: 0,
  })
  const [loading, setLoading] = useState(true)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSessionDetails = useCallback(async (sessionId: string) => {
    setLoadingDetails(true)
    setSessionMessages([])
    try {
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
        cache: "no-store",
      })

      const data = await response.json()

      if (data.success) {
        setSessionMessages(data.data || [])
      } else {
        throw new Error(data.error || "Errore nel caricamento della sessione dettagliata")
      }
    } catch (err) {
      console.error("❌ Error fetching session details:", err)
      setError(err instanceof Error ? err.message : "Errore nel caricamento dei dettagli conversazione")
    } finally {
      setLoadingDetails(false)
    }
  }, [])

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔄 Fetching chat sessions from API...")

      const response = await fetch("/api/admin/messages", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      })

      const data = await response.json()
      console.log("💬 API Sessions Response:", data)

      if (data.success) {
        const sessionData: SessionSummary[] = data.data || []
        setSessions(sessionData)

        const total = sessionData.length
        const thisMonth = sessionData.filter(
          (s) => new Date(s.last_activity).getMonth() === new Date().getMonth(),
        ).length
        const activeBookings = sessionData.filter((s) => s.in_booking_mode === 1).length

        setStats({ total, thisMonth, activeBookings })

        console.log(`✅ Loaded ${sessionData.length} chat sessions`)
      } else {
        throw new Error(data.error || "Errore nel caricamento delle sessioni")
      }
    } catch (err) {
      console.error("❌ Error fetching sessions:", err)
      setError(err instanceof Error ? err.message : "Errore sconosciuto nel caricamento sessioni")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  const handleSelectSession = (session: SessionSummary) => {
    setSelectedSession(session)
    fetchSessionDetails(session.session_id)
  }

  const getStatusColor = (inBookingMode: number) => (inBookingMode === 1 ? "bg-red-500" : "bg-gray-500")

  const getStatusText = (inBookingMode: number) => (inBookingMode === 1 ? "In Prenotazione" : "Completata")

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
          <span className="ml-2 text-lg">Caricamento sessioni chat...</span>
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
            <Button onClick={fetchSessions} variant="outline" className="border-red-300 bg-transparent">
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
            {language === "it" ? "Sessioni Chat" : "Chat Sessions"} ({stats.total})
          </h1>
          <p className="text-muted-foreground">
            {language === "it" ? `${stats.thisMonth} sessioni questo mese` : `${stats.thisMonth} sessions this month`}
          </p>
        </div>
        <Button onClick={fetchSessions} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === "it" ? "Aggiorna" : "Refresh"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Sessioni Totali</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">In Booking Mode</p>
                <p className="text-2xl font-bold">{stats.activeBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Attività (Mese)</p>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Lista Sessioni Recenti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nessuna sessione trovata</p>
                    <Button onClick={fetchSessions} className="mt-4 bg-transparent" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Ricarica Sessioni
                    </Button>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <Card
                      key={session.session_id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedSession?.session_id === session.session_id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => handleSelectSession(session)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold">ID Sessione: {session.session_id.substring(8, 16)}...</span>
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(session.in_booking_mode)} text-white`}
                            >
                              {getStatusText(session.in_booking_mode)}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{formatDate(session.last_activity)}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>Messaggi totali: {session.message_count}</span>
                          </div>
                          <p className="text-foreground line-clamp-2 mt-2 font-medium">
                            Ultimo messaggio: {session.last_user_message || "(Nessun messaggio utente)"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Conversation Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Conversazione Dettagliata
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSession ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold text-lg">
                    ID Sessione: {selectedSession.session_id.substring(8, 16)}...
                  </span>
                  <Badge variant="outline" className={`${getStatusColor(selectedSession.in_booking_mode)} text-white`}>
                    {getStatusText(selectedSession.in_booking_mode)}
                  </Badge>
                </div>

                <Separator />

                {loadingDetails ? (
                  <div className="flex items-center justify-center h-[500px]">
                    <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                    <span className="ml-2">Caricamento conversazione...</span>
                  </div>
                ) : (
                  <ScrollArea className="h-[500px] p-2 pr-4">
                    <div className="space-y-4">
                      {sessionMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] p-3 rounded-lg shadow-md ${
                              msg.sender === "user"
                                ? "bg-primary text-primary-foreground rounded-br-none"
                                : "bg-muted text-foreground rounded-tl-none"
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs mb-1">
                              {msg.sender === "user" ? (
                                <User className="w-3 h-3 mr-1" />
                              ) : (
                                <Bot className="w-3 h-3 mr-1" />
                              )}
                              <span className="font-semibold">{msg.sender === "user" ? "Utente" : "PraxisBot"}</span>
                              <span className="text-xs ml-2 opacity-70">
                                {new Date(msg.created_at).toLocaleTimeString("it-IT", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Seleziona una sessione per vedere la cronologia completa</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
