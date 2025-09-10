"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Plus, Edit, Trash2, DollarSign, Clock, Zap, Mail, MessageSquare, Save, Eye } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  active: boolean
  features: string[]
}

const initialServices: Service[] = [
  {
    id: "1",
    name: "Web Development",
    description: "Sviluppo siti web moderni e responsive",
    price: 2500,
    duration: 30,
    category: "development",
    active: true,
    features: ["Design Responsive", "SEO Ottimizzato", "CMS Integrato", "Analytics"],
  },
  {
    id: "2",
    name: "AI Marketing",
    description: "Strategie di marketing potenziate dall'intelligenza artificiale",
    price: 1800,
    duration: 20,
    category: "marketing",
    active: true,
    features: ["Automazione Campagne", "Analisi Predittiva", "Targeting Avanzato"],
  },
  {
    id: "3",
    name: "Chatbot Development",
    description: "Chatbot intelligenti per customer service",
    price: 1200,
    duration: 15,
    category: "ai",
    active: true,
    features: ["NLP Avanzato", "Integrazione Multi-canale", "Analytics Conversazioni"],
  },
  {
    id: "4",
    name: "AI Automation",
    description: "Automazione processi aziendali con AI",
    price: 3000,
    duration: 45,
    category: "automation",
    active: true,
    features: ["Workflow Automation", "Document Processing", "API Integration"],
  },
]

const automationTemplates = [
  {
    id: "1",
    name: "Welcome Series",
    description: "Serie di email di benvenuto per nuovi clienti",
    trigger: "Nuovo cliente registrato",
    actions: ["Email di benvenuto", "SMS di conferma", "Assegnazione account manager"],
  },
  {
    id: "2",
    name: "Appointment Reminder",
    description: "Promemoria automatici per appuntamenti",
    trigger: "24h prima dell'appuntamento",
    actions: ["Email reminder", "SMS reminder", "Notifica calendario"],
  },
  {
    id: "3",
    name: "Follow-up Post Servizio",
    description: "Follow-up automatico dopo completamento servizio",
    trigger: "Servizio completato",
    actions: ["Email feedback", "Survey soddisfazione", "Proposta upsell"],
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [newService, setNewService] = useState<Partial<Service>>({
    name: "",
    description: "",
    price: 0,
    duration: 0,
    category: "development",
    active: true,
    features: [],
  })

  const handleSaveService = () => {
    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? editingService : s)))
      setEditingService(null)
    } else if (newService.name) {
      const service: Service = {
        id: Date.now().toString(),
        name: newService.name,
        description: newService.description || "",
        price: newService.price || 0,
        duration: newService.duration || 0,
        category: newService.category || "development",
        active: newService.active ?? true,
        features: newService.features || [],
      }
      setServices([...services, service])
      setNewService({
        name: "",
        description: "",
        price: 0,
        duration: 0,
        category: "development",
        active: true,
        features: [],
      })
    }
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const toggleServiceActive = (id: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, active: !s.active } : s)))
  }

  const calculateTotalRevenue = () => {
    return services.reduce((total, service) => total + service.price, 0)
  }

  const calculateAverageDuration = () => {
    const total = services.reduce((sum, service) => sum + service.duration, 0)
    return Math.round(total / services.length)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestione Servizi</h1>
          <p className="text-gray-600 mt-1">Configura servizi, prezzi e automazioni</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {services.filter((s) => s.active).length} Servizi Attivi
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Potenziale</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{calculateTotalRevenue().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Tutti i servizi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durata Media</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateAverageDuration()} giorni</div>
            <p className="text-xs text-muted-foreground">Tempo di completamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servizi Totali</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
            <p className="text-xs text-muted-foreground">{services.filter((s) => s.active).length} attivi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automazioni</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automationTemplates.length}</div>
            <p className="text-xs text-muted-foreground">Template attivi</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Servizi</TabsTrigger>
          <TabsTrigger value="pricing">Prezzi</TabsTrigger>
          <TabsTrigger value="automations">Automazioni</TabsTrigger>
          <TabsTrigger value="templates">Template</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          {/* Add New Service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Nuovo Servizio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Servizio</Label>
                  <Input
                    id="name"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    placeholder="Es. Web Development"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newService.category}
                    onValueChange={(value) => setNewService({ ...newService, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="ai">AI & Automation</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Prezzo (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                    placeholder="2500"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Durata (giorni)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: Number(e.target.value) })}
                    placeholder="30"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Descrizione dettagliata del servizio..."
                />
              </div>
              <Button onClick={handleSaveService} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Salva Servizio
              </Button>
            </CardContent>
          </Card>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.id} className={`${!service.active ? "opacity-60" : ""}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Switch checked={service.active} onCheckedChange={() => toggleServiceActive(service.id)} />
                      <Button variant="ghost" size="sm" onClick={() => setEditingService(service)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteService(service.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Prezzo:</span>
                      <span className="text-lg font-bold">€{service.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Durata:</span>
                      <span>{service.duration} giorni</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Categoria:</span>
                      <Badge variant="outline">{service.category}</Badge>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm font-medium">Features:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurazione Prezzi</CardTitle>
              <CardDescription>Gestisci prezzi, sconti e commissioni</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>IVA (%)</Label>
                  <Input type="number" defaultValue="22" />
                </div>
                <div>
                  <Label>Commissione Piattaforma (%)</Label>
                  <Input type="number" defaultValue="3" />
                </div>
                <div>
                  <Label>Sconto Clienti Ricorrenti (%)</Label>
                  <Input type="number" defaultValue="10" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Calcoli Automatici</h4>
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-3 border rounded">
                    <span className="font-medium">{service.name}</span>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        Base: €{service.price} + IVA: €{Math.round(service.price * 0.22)}
                      </div>
                      <div className="font-bold">Totale: €{Math.round(service.price * 1.22)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automations" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {automationTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      {template.name}
                    </CardTitle>
                    <Badge variant="default" className="bg-green-500">
                      Attivo
                    </Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium">Trigger:</span>
                      <div className="mt-1 p-2 bg-blue-50 rounded text-sm">{template.trigger}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Azioni:</span>
                      <div className="mt-1 space-y-1">
                        {template.actions.map((action, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Email & SMS</CardTitle>
              <CardDescription>Gestisci i template per le comunicazioni automatiche</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Template Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Conferma Appuntamento
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Promemoria 24h
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Follow-up Post Servizio
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Richiesta Feedback
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Template SMS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Conferma Rapida
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Promemoria Breve
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Codice Verifica
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Notifica Urgente
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
