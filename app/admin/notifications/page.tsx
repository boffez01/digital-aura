"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Bell,
  Mail,
  MessageSquare,
  Send,
  Settings,
  TestTube,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Eye,
  Edit,
  ArrowLeft,
  Smartphone,
  Activity,
} from "lucide-react"
import Link from "next/link"

interface NotificationProvider {
  id: string
  name: string
  type: "email" | "sms" | "whatsapp"
  status: "active" | "inactive" | "testing"
  config: Record<string, any>
  description: string
}

interface TestResult {
  success: boolean
  message: string
  timestamp: string
  provider: string
  recipient: string
}

const providers: NotificationProvider[] = [
  {
    id: "resend",
    name: "Resend",
    type: "email",
    status: "active",
    description: "Provider EMAIL professionale per notifiche automatiche",
    config: {
      apiKey: process.env.RESEND_API_KEY ? "Configurato" : "Non configurato",
      fromEmail: "noreply@digitalaura.com",
      fromName: "Digital Aura",
    },
  },
  {
    id: "gmail",
    name: "Gmail SMTP",
    type: "email",
    status: "inactive",
    description: "Provider EMAIL tramite Gmail SMTP",
    config: {
      host: "smtp.gmail.com",
      port: "587",
      username: "your-email@gmail.com",
      password: "Non configurato",
    },
  },
  {
    id: "twilio-sms",
    name: "Twilio SMS",
    type: "sms",
    status: process.env.TWILIO_ACCOUNT_SID ? "testing" : "inactive",
    description: "Provider SMS per notifiche automatiche",
    config: {
      accountSid: process.env.TWILIO_ACCOUNT_SID ? "Configurato" : "Non configurato",
      authToken: process.env.TWILIO_AUTH_TOKEN ? "Configurato" : "Non configurato",
      fromNumber: "+1234567890",
    },
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    type: "whatsapp",
    status: "inactive",
    description: "Provider WHATSAPP per notifiche automatiche",
    config: {
      phoneNumberId: "Non configurato",
      accessToken: "Non configurato",
    },
  },
]

export default function NotificationsPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [testMessage, setTestMessage] = useState("")
  const [testRecipient, setTestRecipient] = useState("")
  const [testSubject, setTestSubject] = useState("Test Notification - Digital Aura")
  const [isTestModalOpen, setIsTestModalOpen] = useState(false)
  const [isTestingProvider, setIsTestingProvider] = useState<string | null>(null)

  const handleTestProvider = async (providerId: string) => {
    if (!testRecipient || !testMessage) {
      alert("Inserisci destinatario e messaggio per il test")
      return
    }

    setIsTestingProvider(providerId)

    try {
      console.log(`🧪 Testing provider: ${providerId}`)

      const response = await fetch("/api/notifications/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerId,
          recipient: testRecipient,
          template: "test",
          variables: {
            name: "Test User",
            service: "Test Service",
            date: new Date().toLocaleDateString("it-IT"),
            time: new Date().toLocaleTimeString("it-IT"),
          },
        }),
      })

      const result = await response.json()

      const testResult: TestResult = {
        success: result.success,
        message: result.message,
        timestamp: new Date().toLocaleString("it-IT"),
        provider: providers.find((p) => p.id === providerId)?.name || providerId,
        recipient: testRecipient,
      }

      setTestResults((prev) => [testResult, ...prev.slice(0, 9)]) // Keep last 10 results

      if (result.success) {
        alert("✅ Test completato con successo!")
      } else {
        alert(`❌ Test fallito: ${result.message}`)
      }
    } catch (error) {
      console.error("Test error:", error)
      const testResult: TestResult = {
        success: false,
        message: "Errore di rete durante il test",
        timestamp: new Date().toLocaleString("it-IT"),
        provider: providers.find((p) => p.id === providerId)?.name || providerId,
        recipient: testRecipient,
      }
      setTestResults((prev) => [testResult, ...prev.slice(0, 9)])
      alert("❌ Errore durante il test")
    } finally {
      setIsTestingProvider(null)
    }
  }

  const handleQuickTest = async () => {
    if (!selectedProvider || !testRecipient || !testMessage) {
      alert("Compila tutti i campi per il test")
      return
    }

    await handleTestProvider(selectedProvider)
    setIsTestModalOpen(false)
  }

  const getProviderIcon = (type: string) => {
    switch (type) {
      case "email":
        return Mail
      case "sms":
        return Smartphone
      case "whatsapp":
        return MessageSquare
      default:
        return Bell
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white"
      case "testing":
        return "bg-yellow-500 text-white"
      case "inactive":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Attivo"
      case "testing":
        return "Test"
      case "inactive":
        return "Inattivo"
      default:
        return "Sconosciuto"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-red-600 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Sistema Notifiche</h1>
                  <p className="text-gray-600">Gestisci email, SMS e automazioni marketing</p>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-700 border-red-200">
                <Activity className="w-3 h-3 mr-1" />
                Sistema Reale
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setIsTestModalOpen(true)}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
              >
                <TestTube className="w-4 h-4 mr-2" />
                Test Rapido
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email Inviate</p>
                    <p className="text-3xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-green-600 mt-1">+12% questo mese</p>
                  </div>
                  <Mail className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">SMS Inviati</p>
                    <p className="text-3xl font-bold text-gray-900">342</p>
                    <p className="text-xs text-green-600 mt-1">+8% questo mese</p>
                  </div>
                  <Smartphone className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tasso Apertura</p>
                    <p className="text-3xl font-bold text-gray-900">68.5%</p>
                    <p className="text-xs text-green-600 mt-1">+2.1% miglioramento</p>
                  </div>
                  <Eye className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Automazioni</p>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-600 mt-1">Template attivi</p>
                  </div>
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="providers" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="providers" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Provider
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Template
            </TabsTrigger>
            <TabsTrigger value="automations" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Automazioni
            </TabsTrigger>
            <TabsTrigger value="testing" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Test & Debug
            </TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {providers.map((provider, index) => {
                const Icon = getProviderIcon(provider.type)
                return (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{provider.name}</CardTitle>
                              <CardDescription className="text-sm">{provider.description}</CardDescription>
                            </div>
                          </div>
                          <Badge className={getStatusColor(provider.status)}>{getStatusText(provider.status)}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          {Object.entries(provider.config).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="font-medium text-gray-700 capitalize">{key}:</span>
                              <span className="text-gray-600 font-mono text-sm">
                                {key.toLowerCase().includes("key") ||
                                key.toLowerCase().includes("token") ||
                                key.toLowerCase().includes("password")
                                  ? value === "Configurato"
                                    ? "✅ Configurato"
                                    : "❌ Non configurato"
                                  : value}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2 pt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProvider(provider.id)
                              setIsTestModalOpen(true)
                            }}
                            disabled={isTestingProvider === provider.id}
                            className="flex-1"
                          >
                            {isTestingProvider === provider.id ? (
                              <Clock className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <TestTube className="w-4 h-4 mr-2" />
                            )}
                            Test
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Settings className="w-4 h-4 mr-2" />
                            Config
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Configuration Instructions */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Settings className="w-5 h-5 mr-2" />
                  Istruzioni Configurazione
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">📧 Email (Resend)</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Registrati su resend.com</li>
                      <li>Ottieni la tua API key</li>
                      <li>Aggiungi RESEND_API_KEY al file .env.local</li>
                      <li>Verifica il dominio email</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">📱 SMS (Twilio)</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Registrati su twilio.com</li>
                      <li>Ottieni Account SID e Auth Token</li>
                      <li>Aggiungi le credenziali al .env.local</li>
                      <li>Acquista un numero di telefono</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            {/* Test History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Cronologia Test Recenti
                </CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <TestTube className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Nessun test eseguito ancora</p>
                    <p className="text-sm">Usa il pulsante "Test Rapido" per iniziare</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                          result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {result.success ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <div>
                            <p className="font-medium">
                              {result.provider} → {result.recipient}
                            </p>
                            <p className={`text-sm ${result.success ? "text-green-700" : "text-red-700"}`}>
                              {result.message}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{result.timestamp}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Notifiche</CardTitle>
                <CardDescription>Gestisci i template per le notifiche automatiche</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Edit className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Sezione Template in sviluppo</p>
                  <p className="text-sm">Presto disponibile per personalizzare i messaggi</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automazioni Marketing</CardTitle>
                <CardDescription>Configura flussi automatici per il customer journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Sezione Automazioni in sviluppo</p>
                  <p className="text-sm">Presto disponibile per creare flussi automatici</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Test Modal */}
      <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <TestTube className="w-5 h-5 mr-2" />
              Test Rapido Notifica
            </DialogTitle>
            <DialogDescription>Invia un messaggio di test per verificare la configurazione</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Provider</Label>
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers
                    .filter((p) => p.status !== "inactive")
                    .map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name} ({provider.type.toUpperCase()})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Destinatario</Label>
              <Input
                value={testRecipient}
                onChange={(e) => setTestRecipient(e.target.value)}
                placeholder="email@example.com o +39123456789"
              />
            </div>
            {selectedProvider?.includes("email") && (
              <div>
                <Label>Oggetto</Label>
                <Input value={testSubject} onChange={(e) => setTestSubject(e.target.value)} />
              </div>
            )}
            <div>
              <Label>Messaggio</Label>
              <Textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Ciao {{name}}, questo è un messaggio di test per {{service}}..."
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsTestModalOpen(false)} className="flex-1">
                Annulla
              </Button>
              <Button
                onClick={handleQuickTest}
                disabled={!selectedProvider || !testRecipient || !testMessage}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                <Send className="w-4 h-4 mr-2" />
                Invia Test
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
