"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Star, Download, RefreshCw, DollarSign, Clock } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Dati di esempio per i grafici
const appointmentData = [
  { name: "Lun", appuntamenti: 12, completati: 10 },
  { name: "Mar", appuntamenti: 19, completati: 16 },
  { name: "Mer", appuntamenti: 15, completati: 14 },
  { name: "Gio", appuntamenti: 22, completati: 20 },
  { name: "Ven", appuntamenti: 18, completati: 17 },
  { name: "Sab", appuntamenti: 8, completati: 7 },
  { name: "Dom", appuntamenti: 5, completati: 5 },
]

const serviceData = [
  { name: "Web Development", value: 35, color: "#8884d8" },
  { name: "AI Marketing", value: 25, color: "#82ca9d" },
  { name: "Chatbot", value: 20, color: "#ffc658" },
  { name: "AI Automation", value: 20, color: "#ff7300" },
]

const revenueData = [
  { month: "Gen", revenue: 4500, target: 5000 },
  { month: "Feb", revenue: 5200, target: 5500 },
  { month: "Mar", revenue: 4800, target: 5200 },
  { month: "Apr", revenue: 6100, target: 6000 },
  { month: "Mag", revenue: 5800, target: 6200 },
  { month: "Giu", revenue: 6500, target: 6500 },
]

const satisfactionData = [
  { period: "Settimana 1", rating: 4.2 },
  { period: "Settimana 2", rating: 4.5 },
  { period: "Settimana 3", rating: 4.3 },
  { period: "Settimana 4", rating: 4.7 },
  { period: "Settimana 5", rating: 4.6 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [loading, setLoading] = useState(false)

  const handleExport = (format: string) => {
    setLoading(true)
    // Simula export
    setTimeout(() => {
      setLoading(false)
      alert(`Export ${format} completato!`)
    }, 2000)
  }

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Report</h1>
          <p className="text-gray-600 mt-1">Dashboard completa con KPI e metriche avanzate</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 giorni</SelectItem>
              <SelectItem value="30d">30 giorni</SelectItem>
              <SelectItem value="90d">90 giorni</SelectItem>
              <SelectItem value="1y">1 anno</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRefresh} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Aggiorna
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Totale</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€32,900</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> rispetto al mese scorso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasso Conversione</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3.2%</span> miglioramento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Medio Risposta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-15min</span> più veloce
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8 punti</span> eccellente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </CardTitle>
          <CardDescription>Esporta i dati analytics in diversi formati</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => handleExport("PDF")} variant="outline" disabled={loading}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={() => handleExport("Excel")} variant="outline" disabled={loading}>
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button onClick={() => handleExport("CSV")} variant="outline" disabled={loading}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="appointments">Appuntamenti</TabsTrigger>
          <TabsTrigger value="clients">Clienti</TabsTrigger>
          <TabsTrigger value="services">Servizi</TabsTrigger>
          <TabsTrigger value="satisfaction">Soddisfazione</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trend Appuntamenti</CardTitle>
                <CardDescription>Andamento settimanale degli appuntamenti</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={appointmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="appuntamenti" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="completati" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuzione Servizi</CardTitle>
                <CardDescription>Ripartizione per tipologia di servizio</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Appuntamenti</CardTitle>
              <CardDescription>Analisi dettagliata degli appuntamenti per giorno</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appuntamenti" fill="#8884d8" name="Prenotati" />
                  <Bar dataKey="completati" fill="#82ca9d" name="Completati" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nuovi Clienti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">47</div>
                <p className="text-sm text-muted-foreground">Questo mese</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Clienti Ricorrenti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">73%</div>
                <p className="text-sm text-muted-foreground">Tasso di ritorno</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Valore Medio Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">€1,240</div>
                <p className="text-sm text-muted-foreground">LTV medio</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue per Servizio</CardTitle>
              <CardDescription>Confronto mensile dei ricavi per servizio</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${value}`, ""]} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue Effettiva" />
                  <Bar dataKey="target" fill="#82ca9d" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trend Soddisfazione Cliente</CardTitle>
              <CardDescription>Rating medio per periodo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip formatter={(value) => [`${value}/5`, "Rating"]} />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ fill: "#8884d8", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
