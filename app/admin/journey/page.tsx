"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  ArrowRight,
  Users,
  TrendingUp,
  Clock,
  Target,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Mail,
  Phone,
  MessageSquare,
  Star,
  DollarSign,
  UserX,
  Download,
  RefreshCw,
  ArrowDown,
  ArrowUp,
  Lightbulb,
  Settings,
} from "lucide-react"
import Link from "next/link"

interface JourneyStage {
  id: string
  name: string
  description: string
  color: string
  icon: React.ReactNode
  customers: number
  conversionRate: number
  avgDuration: number
  dropoffRate: number
  revenue: number
  touchpoints: string[]
  actions: Array<{
    id: string
    name: string
    type: "email" | "call" | "meeting" | "content" | "automation"
    effectiveness: number
    usage: number
  }>
  metrics: {
    satisfaction: number
    engagement: number
    responseRate: number
    completionRate: number
  }
  bottlenecks: Array<{
    issue: string
    impact: "high" | "medium" | "low"
    suggestion: string
  }>
}

interface CustomerFlow {
  from: string
  to: string
  count: number
  conversionRate: number
  avgTime: number
}

interface JourneyAnalytics {
  totalCustomers: number
  avgJourneyTime: number
  overallConversion: number
  totalRevenue: number
  topPerformingStage: string
  bottleneckStage: string
  churnPoints: string[]
  opportunityAreas: string[]
}

export default function CustomerJourneyPage() {
  const [journeyData, setJourneyData] = useState<JourneyStage[]>([])
  const [customerFlows, setCustomerFlows] = useState<CustomerFlow[]>([])
  const [analytics, setAnalytics] = useState<JourneyAnalytics | null>(null)
  const [selectedStage, setSelectedStage] = useState<JourneyStage | null>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [showStageDetail, setShowStageDetail] = useState(false)
  const [showOptimization, setShowOptimization] = useState(false)

  useEffect(() => {
    fetchJourneyData()
  }, [selectedTimeframe, selectedSegment])

  const fetchJourneyData = async () => {
    try {
      const response = await fetch(`/api/admin/journey?timeframe=${selectedTimeframe}&segment=${selectedSegment}`)
      const data = await response.json()
      setJourneyData(data.stages)
      setCustomerFlows(data.flows)
      setAnalytics(data.analytics)
    } catch (error) {
      console.error("Errore nel caricamento journey data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStageColor = (stage: JourneyStage) => {
    const colors = {
      awareness: "bg-blue-500",
      interest: "bg-green-500",
      consideration: "bg-yellow-500",
      intent: "bg-orange-500",
      purchase: "bg-purple-500",
      retention: "bg-pink-500",
      advocacy: "bg-indigo-500",
    }
    return colors[stage.id as keyof typeof colors] || "bg-gray-500"
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const formatDuration = (days: number) => {
    if (days < 1) return `${Math.round(days * 24)}h`
    if (days < 30) return `${Math.round(days)}g`
    return `${Math.round(days / 30)}m`
  }

  const JourneyVisualization = () => (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-bold text-gray-800">Customer Journey Flow</h3>
          <Badge className="bg-blue-100 text-blue-700">{analytics?.totalCustomers} clienti totali</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setShowOptimization(true)}>
            <Lightbulb className="w-4 h-4 mr-2" />
            Ottimizza
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Esporta
          </Button>
        </div>
      </div>

      <div className="relative overflow-x-auto pb-8">
        <div className="flex items-center space-x-8 min-w-max">
          {journeyData.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Stage Card */}
              <Card
                className={`w-80 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                  selectedStage?.id === stage.id ? "border-purple-500 shadow-lg" : "border-gray-200"
                }`}
                onClick={() => {
                  setSelectedStage(stage)
                  setShowStageDetail(true)
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getStageColor(stage)} text-white`}>{stage.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{stage.name}</CardTitle>
                        <p className="text-sm text-gray-600">{stage.description}</p>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        stage.conversionRate > 70
                          ? "bg-green-100 text-green-800"
                          : stage.conversionRate > 40
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {stage.conversionRate}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{stage.customers}</p>
                      <p className="text-xs text-gray-600">Clienti</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(stage.revenue)}</p>
                      <p className="text-xs text-gray-600">Revenue</p>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conversione</span>
                        <span>{stage.conversionRate}%</span>
                      </div>
                      <Progress value={stage.conversionRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Soddisfazione</span>
                        <span>{stage.metrics.satisfaction}/5</span>
                      </div>
                      <Progress value={(stage.metrics.satisfaction / 5) * 100} className="h-2" />
                    </div>
                  </div>

                  {/* Duration & Dropoff */}
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDuration(stage.avgDuration)}
                    </div>
                    <div className="flex items-center">
                      <UserX className="w-4 h-4 mr-1" />
                      {stage.dropoffRate}% dropoff
                    </div>
                  </div>

                  {/* Bottlenecks Alert */}
                  {stage.bottlenecks.length > 0 && (
                    <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">{stage.bottlenecks.length} problemi rilevati</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Flow Arrow */}
              {index < journeyData.length - 1 && (
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="bg-white border-2 border-gray-300 rounded-full p-2 shadow-sm">
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                  </div>
                  {/* Flow Stats */}
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border rounded-lg p-2 shadow-sm min-w-max">
                    <div className="text-xs text-center">
                      <div className="font-medium text-gray-800">
                        {customerFlows.find((f) => f.from === stage.id)?.count || 0}
                      </div>
                      <div className="text-gray-600">clienti</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const AnalyticsDashboard = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tempo Medio Journey</p>
              <p className="text-3xl font-bold text-gray-800">
                {analytics ? formatDuration(analytics.avgJourneyTime) : "0"}
              </p>
              <p className="text-sm text-blue-600">-15% vs mese scorso</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversione Totale</p>
              <p className="text-3xl font-bold text-gray-800">{analytics?.overallConversion || 0}%</p>
              <p className="text-sm text-green-600">+8% vs mese scorso</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue Totale</p>
              <p className="text-3xl font-bold text-gray-800">
                {analytics ? formatCurrency(analytics.totalRevenue) : "€0"}
              </p>
              <p className="text-sm text-purple-600">+23% vs mese scorso</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stage Top</p>
              <p className="text-2xl font-bold text-gray-800">{analytics?.topPerformingStage || "N/A"}</p>
              <p className="text-sm text-orange-600">Migliore performance</p>
            </div>
            <Star className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const OptimizationSuggestions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">Suggerimenti di Ottimizzazione</h3>
        <Badge className="bg-green-100 text-green-700">AI-Powered</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* High Impact Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <ArrowUp className="w-5 h-5 mr-2" />
              Opportunità Alto Impatto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Email Automation nella fase Interest</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Implementare sequenze email automatiche può aumentare la conversione del 35%
                  </p>
                  <Badge className="mt-2 bg-green-100 text-green-800">+35% conversione</Badge>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Follow-up Proattivo nella fase Intent</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Chiamate proattive entro 24h possono ridurre il dropoff del 28%
                  </p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">-28% dropoff</Badge>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Chatbot Intelligente per Qualification</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Chatbot AI per pre-qualificare i lead può migliorare l'efficienza del 45%
                  </p>
                  <Badge className="mt-2 bg-purple-100 text-purple-800">+45% efficienza</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Problemi Critici
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ArrowDown className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Alto Dropoff nella fase Consideration</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    45% dei prospect abbandonano in questa fase. Serve contenuto più convincente.
                  </p>
                  <Badge className="mt-2 bg-red-100 text-red-800">Critico</Badge>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Tempi Lunghi nella fase Purchase</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Tempo medio di 18 giorni per chiudere. Ottimizzare il processo di vendita.
                  </p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">Medio</Badge>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <UserX className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Bassa Retention Post-Purchase</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Solo 60% dei clienti rimane attivo dopo 6 mesi. Migliorare onboarding.
                  </p>
                  <Badge className="mt-2 bg-orange-100 text-orange-800">Alto</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Piano di Azione Raccomandato
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Implementare Email Automation</h4>
                  <p className="text-sm text-gray-600">Setup sequenze automatiche per nurturing</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">ROI: 320%</Badge>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Implementa
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Ottimizzare Processo di Vendita</h4>
                  <p className="text-sm text-gray-600">Ridurre friction nella fase Purchase</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-800">Tempo: -40%</Badge>
                <Button size="sm" variant="outline">
                  Pianifica
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Migliorare Customer Onboarding</h4>
                  <p className="text-sm text-gray-600">Aumentare retention e soddisfazione</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">Retention: +25%</Badge>
                <Button size="sm" variant="outline">
                  Valuta
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento customer journey...</p>
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
                <Activity className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-800">Customer Journey Mapping</h1>
              </div>
              <Badge className="bg-purple-100 text-purple-700">AI-Powered Analytics</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
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
              <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i segmenti</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={fetchJourneyData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Aggiorna
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Analytics Dashboard */}
        <AnalyticsDashboard />

        {/* Journey Visualization */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <JourneyVisualization />
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="optimization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="optimization">Ottimizzazione</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Avanzati</TabsTrigger>
            <TabsTrigger value="segments">Segmenti</TabsTrigger>
            <TabsTrigger value="automation">Automazioni</TabsTrigger>
          </TabsList>

          <TabsContent value="optimization">
            <OptimizationSuggestions />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Conversion Funnel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journeyData.map((stage, index) => (
                      <div key={stage.id} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{stage.name}</span>
                          <span className="text-sm text-gray-600">{stage.customers} clienti</span>
                        </div>
                        <div className="relative">
                          <div
                            className={`h-8 ${getStageColor(stage)} rounded-lg transition-all duration-300`}
                            style={{
                              width: `${(stage.customers / (journeyData[0]?.customers || 1)) * 100}%`,
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
                            {stage.conversionRate}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Revenue per Stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journeyData.map((stage) => (
                      <div key={stage.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${getStageColor(stage)}`} />
                          <span className="text-sm font-medium">{stage.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-800">{formatCurrency(stage.revenue)}</div>
                          <div className="text-xs text-gray-600">
                            {((stage.revenue / (analytics?.totalRevenue || 1)) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="segments">
            <Card>
              <CardHeader>
                <CardTitle>Analisi per Segmento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Analisi segmentazione in sviluppo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation">
            <Card>
              <CardHeader>
                <CardTitle>Automazioni Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Sistema automazioni in sviluppo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Stage Detail Modal */}
      <Dialog open={showStageDetail} onOpenChange={setShowStageDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedStage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${getStageColor(selectedStage)} text-white`}>
                    {selectedStage.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedStage.name}</h2>
                    <p className="text-gray-600">{selectedStage.description}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Panoramica</TabsTrigger>
                  <TabsTrigger value="actions">Azioni</TabsTrigger>
                  <TabsTrigger value="bottlenecks">Problemi</TabsTrigger>
                  <TabsTrigger value="optimization">Ottimizzazione</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Metriche Chiave</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span>Clienti</span>
                          <span className="font-bold">{selectedStage.customers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conversione</span>
                          <span className="font-bold">{selectedStage.conversionRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Durata Media</span>
                          <span className="font-bold">{formatDuration(selectedStage.avgDuration)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dropoff</span>
                          <span className="font-bold text-red-600">{selectedStage.dropoffRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue</span>
                          <span className="font-bold text-green-600">{formatCurrency(selectedStage.revenue)}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Soddisfazione</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Soddisfazione</span>
                            <span>{selectedStage.metrics.satisfaction}/5</span>
                          </div>
                          <Progress value={(selectedStage.metrics.satisfaction / 5) * 100} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Engagement</span>
                            <span>{selectedStage.metrics.engagement}%</span>
                          </div>
                          <Progress value={selectedStage.metrics.engagement} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Response Rate</span>
                            <span>{selectedStage.metrics.responseRate}%</span>
                          </div>
                          <Progress value={selectedStage.metrics.responseRate} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Touchpoints</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedStage.touchpoints.map((touchpoint, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-2">
                              {touchpoint}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedStage.actions.map((action) => (
                      <Card key={action.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{action.name}</h4>
                            <Badge
                              className={
                                action.effectiveness > 70
                                  ? "bg-green-100 text-green-800"
                                  : action.effectiveness > 40
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {action.effectiveness}% efficace
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Utilizzo</span>
                                <span>{action.usage}%</span>
                              </div>
                              <Progress value={action.usage} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Efficacia</span>
                                <span>{action.effectiveness}%</span>
                              </div>
                              <Progress value={action.effectiveness} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="bottlenecks" className="space-y-4">
                  {selectedStage.bottlenecks.map((bottleneck, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle
                            className={`w-5 h-5 mt-1 ${
                              bottleneck.impact === "high"
                                ? "text-red-500"
                                : bottleneck.impact === "medium"
                                  ? "text-yellow-500"
                                  : "text-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-800">{bottleneck.issue}</h4>
                              <Badge
                                className={
                                  bottleneck.impact === "high"
                                    ? "bg-red-100 text-red-800"
                                    : bottleneck.impact === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                }
                              >
                                {bottleneck.impact}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{bottleneck.suggestion}</p>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              <Settings className="w-4 h-4 mr-2" />
                              Risolvi
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="optimization">
                  <div className="text-center py-12">
                    <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Suggerimenti di ottimizzazione specifici per questo stage</p>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Optimization Modal */}
      <Dialog open={showOptimization} onOpenChange={setShowOptimization}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Ottimizzazione Journey AI
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI Journey Optimizer</h3>
              <p className="text-gray-600">
                Il nostro sistema AI sta analizzando il tuo customer journey per identificare le migliori opportunità di
                ottimizzazione.
              </p>
            </div>
            <div className="flex justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Zap className="w-4 h-4 mr-2" />
                Avvia Analisi AI
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
