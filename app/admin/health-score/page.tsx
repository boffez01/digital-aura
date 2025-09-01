"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Heart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Users,
  Activity,
  Target,
  Zap,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Star,
  DollarSign,
  BarChart3,
  Filter,
  Download,
  RefreshCw,
  Bell,
  Settings,
  Lightbulb,
  Shield,
  Search,
  Eye,
  Edit,
  Send,
} from "lucide-react"
import Link from "next/link"

interface CustomerHealthScore {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  company?: string
  segment: "enterprise" | "business" | "startup" | "individual"
  overallScore: number
  previousScore: number
  trend: "up" | "down" | "stable"
  riskLevel: "low" | "medium" | "high" | "critical"
  lastUpdated: string

  // Score Components
  journeyScore: number
  engagementScore: number
  satisfactionScore: number
  valueScore: number
  loyaltyScore: number

  // Journey Metrics
  currentStage: string
  stageProgress: number
  timeInStage: number
  stageVelocity: number
  conversionProbability: number

  // Engagement Metrics
  emailOpenRate: number
  emailClickRate: number
  websiteVisits: number
  contentEngagement: number
  responseRate: number
  meetingAttendance: number

  // Satisfaction Metrics
  npsScore: number
  supportTickets: number
  complaintResolution: number
  feedbackSentiment: number

  // Value Metrics
  totalRevenue: number
  avgOrderValue: number
  purchaseFrequency: number
  lifetimeValue: number
  paymentHistory: number

  // Loyalty Metrics
  referrals: number
  testimonials: number
  renewalProbability: number
  upsellPotential: number
  churnRisk: number

  // Risk Factors
  riskFactors: Array<{
    factor: string
    impact: "high" | "medium" | "low"
    description: string
    recommendation: string
  }>

  // Opportunities
  opportunities: Array<{
    opportunity: string
    potential: number
    effort: "low" | "medium" | "high"
    description: string
    action: string
  }>

  // Recent Activities
  recentActivities: Array<{
    id: string
    type: "email" | "call" | "meeting" | "purchase" | "support" | "content"
    description: string
    date: string
    impact: "positive" | "neutral" | "negative"
    scoreChange: number
  }>
}

interface HealthScoreAnalytics {
  totalCustomers: number
  avgHealthScore: number
  healthyCustomers: number
  atRiskCustomers: number
  criticalCustomers: number
  scoreDistribution: Array<{
    range: string
    count: number
    percentage: number
  }>
  trendAnalysis: {
    improving: number
    declining: number
    stable: number
  }
  topRiskFactors: Array<{
    factor: string
    affectedCustomers: number
    avgImpact: number
  }>
  topOpportunities: Array<{
    opportunity: string
    potentialRevenue: number
    affectedCustomers: number
  }>
}

export default function HealthScorePage() {
  const [healthScores, setHealthScores] = useState<CustomerHealthScore[]>([])
  const [filteredScores, setFilteredScores] = useState<CustomerHealthScore[]>([])
  const [analytics, setAnalytics] = useState<HealthScoreAnalytics | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerHealthScore | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [segmentFilter, setSegmentFilter] = useState("all")
  const [trendFilter, setTrendFilter] = useState("all")
  const [sortBy, setSortBy] = useState("overallScore")
  const [showCustomerDetail, setShowCustomerDetail] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  useEffect(() => {
    fetchHealthScores()
  }, [])

  useEffect(() => {
    filterHealthScores()
  }, [healthScores, searchTerm, riskFilter, segmentFilter, trendFilter, sortBy])

  const fetchHealthScores = async () => {
    try {
      const response = await fetch("/api/admin/health-score")
      const data = await response.json()
      setHealthScores(data.scores)
      setAnalytics(data.analytics)
    } catch (error) {
      console.error("Errore nel caricamento health scores:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterHealthScores = () => {
    let filtered = [...healthScores]

    // Filtro ricerca
    if (searchTerm) {
      filtered = filtered.filter(
        (score) =>
          score.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          score.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          score.company?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro rischio
    if (riskFilter !== "all") {
      filtered = filtered.filter((score) => score.riskLevel === riskFilter)
    }

    // Filtro segmento
    if (segmentFilter !== "all") {
      filtered = filtered.filter((score) => score.segment === segmentFilter)
    }

    // Filtro trend
    if (trendFilter !== "all") {
      filtered = filtered.filter((score) => score.trend === trendFilter)
    }

    // Ordinamento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "customerName":
          return a.customerName.localeCompare(b.customerName)
        case "riskLevel":
          const riskOrder = { critical: 4, high: 3, medium: 2, low: 1 }
          return riskOrder[b.riskLevel] - riskOrder[a.riskLevel]
        case "trend":
          const trendOrder = { down: 3, stable: 2, up: 1 }
          return trendOrder[b.trend] - trendOrder[a.trend]
        case "overallScore":
        default:
          return b.overallScore - a.overallScore
      }
    })

    setFilteredScores(filtered)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    if (score >= 40) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    if (score >= 40) return "bg-orange-100"
    return "bg-red-100"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string, scoreChange: number) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      case "stable":
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
      default:
        return null
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

  const HealthScoreCard = ({ score }: { score: CustomerHealthScore }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group">
      <Card
        className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
          selectedCustomers.includes(score.id)
            ? "border-purple-500 bg-purple-50"
            : score.riskLevel === "critical"
              ? "border-red-200 hover:border-red-300"
              : score.riskLevel === "high"
                ? "border-orange-200 hover:border-orange-300"
                : "border-gray-200 hover:border-purple-200"
        }`}
        onClick={() => {
          setSelectedCustomer(score)
          setShowCustomerDetail(true)
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${getScoreBackground(
                  score.overallScore,
                )} ${getScoreColor(score.overallScore)}`}
              >
                {score.customerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {score.customerName}
                </h3>
                {score.company && <p className="text-sm text-gray-600">{score.company}</p>}
                <p className="text-xs text-gray-500">{score.customerEmail}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge className={getRiskColor(score.riskLevel)}>{score.riskLevel.toUpperCase()}</Badge>
              <div className="flex items-center space-x-1">
                {getTrendIcon(score.trend, score.overallScore - score.previousScore)}
                <span className="text-xs text-gray-600">
                  {score.overallScore > score.previousScore ? "+" : ""}
                  {(score.overallScore - score.previousScore).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Health Score</span>
              <span className={`text-2xl font-bold ${getScoreColor(score.overallScore)}`}>
                {score.overallScore}/100
              </span>
            </div>
            <Progress value={score.overallScore} className="h-3" />
          </div>

          {/* Score Components */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Activity className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-gray-600">Journey</span>
              </div>
              <div className={`text-lg font-bold ${getScoreColor(score.journeyScore)}`}>{score.journeyScore}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Heart className="w-3 h-3 text-red-500" />
                <span className="text-xs text-gray-600">Engagement</span>
              </div>
              <div className={`text-lg font-bold ${getScoreColor(score.engagementScore)}`}>{score.engagementScore}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-gray-600">Satisfaction</span>
              </div>
              <div className={`text-lg font-bold ${getScoreColor(score.satisfactionScore)}`}>
                {score.satisfactionScore}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <DollarSign className="w-3 h-3 text-green-500" />
                <span className="text-xs text-gray-600">Value</span>
              </div>
              <div className={`text-lg font-bold ${getScoreColor(score.valueScore)}`}>{score.valueScore}</div>
            </div>
          </div>

          {/* Current Stage & Risk Factors */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Stage Attuale:</span>
              <Badge variant="outline">{score.currentStage}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Probabilità Conversione:</span>
              <span className="font-medium">{score.conversionProbability}%</span>
            </div>
            {score.riskFactors.length > 0 && (
              <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">{score.riskFactors.length} fattori di rischio</span>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500 mt-4">Ultimo aggiornamento: {formatDate(score.lastUpdated)}</div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const AnalyticsDashboard = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Health Score Medio</p>
              <p className="text-3xl font-bold text-gray-800">{analytics?.avgHealthScore || 0}/100</p>
              <p className="text-sm text-blue-600">+5.2 vs mese scorso</p>
            </div>
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clienti Sani</p>
              <p className="text-3xl font-bold text-gray-800">{analytics?.healthyCustomers || 0}</p>
              <p className="text-sm text-green-600">
                {analytics ? ((analytics.healthyCustomers / analytics.totalCustomers) * 100).toFixed(1) : 0}% del totale
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">A Rischio</p>
              <p className="text-3xl font-bold text-gray-800">{analytics?.atRiskCustomers || 0}</p>
              <p className="text-sm text-orange-600">Richiedono attenzione</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critici</p>
              <p className="text-3xl font-bold text-gray-800">{analytics?.criticalCustomers || 0}</p>
              <p className="text-sm text-red-600">Azione immediata</p>
            </div>
            <Shield className="w-8 h-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ScoreDistributionChart = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Distribuzione Health Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analytics?.scoreDistribution.map((range, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{range.range}</span>
                <span className="text-gray-600">
                  {range.count} clienti ({range.percentage}%)
                </span>
              </div>
              <div className="relative">
                <div
                  className={`h-6 rounded-lg transition-all duration-300 ${
                    range.range.includes("80-100")
                      ? "bg-green-500"
                      : range.range.includes("60-79")
                        ? "bg-yellow-500"
                        : range.range.includes("40-59")
                          ? "bg-orange-500"
                          : "bg-red-500"
                  }`}
                  style={{ width: `${range.percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
                  {range.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const TrendAnalysis = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Analisi Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">In Miglioramento</span>
            </div>
            <span className="text-2xl font-bold text-green-600">{analytics?.trendAnalysis.improving || 0}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-400 rounded-full" />
              <span className="font-medium text-gray-800">Stabili</span>
            </div>
            <span className="text-2xl font-bold text-gray-600">{analytics?.trendAnalysis.stable || 0}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-800">In Peggioramento</span>
            </div>
            <span className="text-2xl font-bold text-red-600">{analytics?.trendAnalysis.declining || 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento health scores...</p>
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
                <Heart className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-800">Customer Health Score</h1>
              </div>
              <Badge className="bg-purple-100 text-purple-700">
                {filteredScores.length} di {healthScores.length} clienti
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setShowBulkActions(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Azioni Bulk
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Esporta
              </Button>
              <Button variant="outline" onClick={fetchHealthScores}>
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

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ScoreDistributionChart />
          <TrendAnalysis />
        </div>

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
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Rischio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i rischi</SelectItem>
                    <SelectItem value="low">Basso</SelectItem>
                    <SelectItem value="medium">Medio</SelectItem>
                    <SelectItem value="high">Alto</SelectItem>
                    <SelectItem value="critical">Critico</SelectItem>
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
                <Select value={trendFilter} onValueChange={setTrendFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Trend" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i trend</SelectItem>
                    <SelectItem value="up">In miglioramento</SelectItem>
                    <SelectItem value="stable">Stabili</SelectItem>
                    <SelectItem value="down">In peggioramento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordina per" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overallScore">Health Score</SelectItem>
                    <SelectItem value="customerName">Nome</SelectItem>
                    <SelectItem value="riskLevel">Livello Rischio</SelectItem>
                    <SelectItem value="trend">Trend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Score Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScores.map((score) => (
            <HealthScoreCard key={score.id} score={score} />
          ))}
        </div>

        {filteredScores.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Nessun cliente trovato</h3>
              <p className="text-gray-600 mb-6">Prova a modificare i filtri di ricerca.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setRiskFilter("all")
                  setSegmentFilter("all")
                  setTrendFilter("all")
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Rimuovi Filtri
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Customer Detail Modal */}
      <Dialog open={showCustomerDetail} onOpenChange={setShowCustomerDetail}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${getScoreBackground(
                      selectedCustomer.overallScore,
                    )} ${getScoreColor(selectedCustomer.overallScore)}`}
                  >
                    {selectedCustomer.customerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedCustomer.customerName}</h2>
                    {selectedCustomer.company && <p className="text-gray-600">{selectedCustomer.company}</p>}
                    <p className="text-sm text-gray-500">{selectedCustomer.customerEmail}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRiskColor(selectedCustomer.riskLevel)}>
                      {selectedCustomer.riskLevel.toUpperCase()}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(
                        selectedCustomer.trend,
                        selectedCustomer.overallScore - selectedCustomer.previousScore,
                      )}
                      <span className="text-sm font-medium">
                        {selectedCustomer.overallScore > selectedCustomer.previousScore ? "+" : ""}
                        {(selectedCustomer.overallScore - selectedCustomer.previousScore).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Panoramica</TabsTrigger>
                  <TabsTrigger value="components">Componenti</TabsTrigger>
                  <TabsTrigger value="risks">Rischi</TabsTrigger>
                  <TabsTrigger value="opportunities">Opportunità</TabsTrigger>
                  <TabsTrigger value="activities">Attività</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Overall Score */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Heart className="w-5 h-5 mr-2" />
                          Health Score Generale
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className={`text-6xl font-bold mb-4 ${getScoreColor(selectedCustomer.overallScore)}`}>
                            {selectedCustomer.overallScore}
                          </div>
                          <Progress value={selectedCustomer.overallScore} className="h-4 mb-4" />
                          <div className="flex items-center justify-center space-x-2">
                            {getTrendIcon(
                              selectedCustomer.trend,
                              selectedCustomer.overallScore - selectedCustomer.previousScore,
                            )}
                            <span className="text-sm text-gray-600">
                              {selectedCustomer.overallScore > selectedCustomer.previousScore ? "+" : ""}
                              {(selectedCustomer.overallScore - selectedCustomer.previousScore).toFixed(1)} vs
                              precedente
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Journey Progress */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Activity className="w-5 h-5 mr-2" />
                          Progresso Journey
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Stage Attuale</span>
                            <Badge variant="outline">{selectedCustomer.currentStage}</Badge>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progresso Stage</span>
                            <span>{selectedCustomer.stageProgress}%</span>
                          </div>
                          <Progress value={selectedCustomer.stageProgress} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Tempo in Stage</span>
                            <span>{selectedCustomer.timeInStage} giorni</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Prob. Conversione</span>
                            <span className="font-medium">{selectedCustomer.conversionProbability}%</span>
                          </div>
                          <Progress value={selectedCustomer.conversionProbability} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Key Metrics */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Target className="w-5 h-5 mr-2" />
                          Metriche Chiave
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">NPS Score</span>
                          <span className="font-medium">{selectedCustomer.npsScore}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Lifetime Value</span>
                          <span className="font-medium">€{selectedCustomer.lifetimeValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Churn Risk</span>
                          <span
                            className={`font-medium ${selectedCustomer.churnRisk > 70 ? "text-red-600" : selectedCustomer.churnRisk > 40 ? "text-yellow-600" : "text-green-600"}`}
                          >
                            {selectedCustomer.churnRisk}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Upsell Potential</span>
                          <span className="font-medium text-green-600">{selectedCustomer.upsellPotential}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Referrals</span>
                          <span className="font-medium">{selectedCustomer.referrals}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="components" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Score Components */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Componenti del Score</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Journey Score</span>
                            <span className={`font-bold ${getScoreColor(selectedCustomer.journeyScore)}`}>
                              {selectedCustomer.journeyScore}/100
                            </span>
                          </div>
                          <Progress value={selectedCustomer.journeyScore} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Engagement Score</span>
                            <span className={`font-bold ${getScoreColor(selectedCustomer.engagementScore)}`}>
                              {selectedCustomer.engagementScore}/100
                            </span>
                          </div>
                          <Progress value={selectedCustomer.engagementScore} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Satisfaction Score</span>
                            <span className={`font-bold ${getScoreColor(selectedCustomer.satisfactionScore)}`}>
                              {selectedCustomer.satisfactionScore}/100
                            </span>
                          </div>
                          <Progress value={selectedCustomer.satisfactionScore} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Value Score</span>
                            <span className={`font-bold ${getScoreColor(selectedCustomer.valueScore)}`}>
                              {selectedCustomer.valueScore}/100
                            </span>
                          </div>
                          <Progress value={selectedCustomer.valueScore} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Loyalty Score</span>
                            <span className={`font-bold ${getScoreColor(selectedCustomer.loyaltyScore)}`}>
                              {selectedCustomer.loyaltyScore}/100
                            </span>
                          </div>
                          <Progress value={selectedCustomer.loyaltyScore} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Detailed Metrics */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Metriche Dettagliate</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-gray-700">Engagement</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span>Email Open Rate</span>
                              <span>{selectedCustomer.emailOpenRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Click Rate</span>
                              <span>{selectedCustomer.emailClickRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Website Visits</span>
                              <span>{selectedCustomer.websiteVisits}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Response Rate</span>
                              <span>{selectedCustomer.responseRate}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-gray-700">Value</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span>Total Revenue</span>
                              <span>€{selectedCustomer.totalRevenue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Avg Order Value</span>
                              <span>€{selectedCustomer.avgOrderValue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Purchase Freq.</span>
                              <span>{selectedCustomer.purchaseFrequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Payment Score</span>
                              <span>{selectedCustomer.paymentHistory}/100</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="risks" className="space-y-4">
                  <div className="space-y-4">
                    {selectedCustomer.riskFactors.map((risk, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle
                              className={`w-5 h-5 mt-1 ${
                                risk.impact === "high"
                                  ? "text-red-500"
                                  : risk.impact === "medium"
                                    ? "text-yellow-500"
                                    : "text-blue-500"
                              }`}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-800">{risk.factor}</h4>
                                <Badge
                                  className={
                                    risk.impact === "high"
                                      ? "bg-red-100 text-red-800"
                                      : risk.impact === "medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-blue-100 text-blue-800"
                                  }
                                >
                                  {risk.impact}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{risk.description}</p>
                              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                                <p className="text-blue-800 text-sm">
                                  <strong>Raccomandazione:</strong> {risk.recommendation}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                  <Settings className="w-4 h-4 mr-2" />
                                  Risolvi
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Pianifica
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="opportunities" className="space-y-4">
                  <div className="space-y-4">
                    {selectedCustomer.opportunities.map((opportunity, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <Lightbulb className="w-5 h-5 mt-1 text-yellow-500" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-800">{opportunity.opportunity}</h4>
                                <div className="flex items-center space-x-2">
                                  <Badge className="bg-green-100 text-green-800">+{opportunity.potential}%</Badge>
                                  <Badge
                                    className={
                                      opportunity.effort === "low"
                                        ? "bg-green-100 text-green-800"
                                        : opportunity.effort === "medium"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {opportunity.effort} effort
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{opportunity.description}</p>
                              <div className="bg-green-50 p-3 rounded-lg mb-3">
                                <p className="text-green-800 text-sm">
                                  <strong>Azione suggerita:</strong> {opportunity.action}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <Zap className="w-4 h-4 mr-2" />
                                  Implementa
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4 mr-2" />
                                  Analizza
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="activities" className="space-y-4">
                  <div className="space-y-4">
                    {selectedCustomer.recentActivities.map((activity) => (
                      <Card key={activity.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div
                              className={`p-2 rounded-full ${
                                activity.impact === "positive"
                                  ? "bg-green-100"
                                  : activity.impact === "negative"
                                    ? "bg-red-100"
                                    : "bg-gray-100"
                              }`}
                            >
                              {activity.type === "email" && <Mail className="w-4 h-4" />}
                              {activity.type === "call" && <Phone className="w-4 h-4" />}
                              {activity.type === "meeting" && <Calendar className="w-4 h-4" />}
                              {activity.type === "purchase" && <DollarSign className="w-4 h-4" />}
                              {activity.type === "support" && <MessageSquare className="w-4 h-4" />}
                              {activity.type === "content" && <Eye className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-800">{activity.description}</h4>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-500">{formatDate(activity.date)}</span>
                                  <Badge
                                    className={
                                      activity.impact === "positive"
                                        ? "bg-green-100 text-green-800"
                                        : activity.impact === "negative"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {activity.scoreChange > 0 ? "+" : ""}
                                    {activity.scoreChange}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifica Score
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Prenota Follow-up
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Send className="w-4 h-4 mr-2" />
                  Invia Alert
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Bulk Actions Modal */}
      <Dialog open={showBulkActions} onOpenChange={setShowBulkActions}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Azioni Bulk sui Health Score
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Azioni Bulk</h3>
              <p className="text-gray-600">
                Seleziona clienti e applica azioni in massa per ottimizzare i health score.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 h-16">
                <Mail className="w-6 h-6 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Email Campaign</div>
                  <div className="text-sm opacity-90">Invia email mirate</div>
                </div>
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 h-16">
                <Phone className="w-6 h-6 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Call Campaign</div>
                  <div className="text-sm opacity-90">Pianifica chiamate</div>
                </div>
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 h-16">
                <Bell className="w-6 h-6 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Alert Setup</div>
                  <div className="text-sm opacity-90">Configura notifiche</div>
                </div>
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 h-16">
                <Target className="w-6 h-6 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Score Boost</div>
                  <div className="text-sm opacity-90">Azioni miglioramento</div>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
