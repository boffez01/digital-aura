"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Calendar,
  Users,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  HeadphonesIcon,
  MessageSquare,
  Globe,
  Zap,
  ArrowRight,
  Bell,
  Shield,
  Database,
  Activity,
  Heart,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const quickStats = [
    {
      title: "Appuntamenti Oggi",
      value: "12",
      change: "+3",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Assistenza Prioritaria",
      value: "3",
      change: "Urgenti",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Clienti Attivi",
      value: "847",
      change: "+12%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Soddisfazione",
      value: "96%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const adminModules = [
    {
      title: "Gestione Appuntamenti",
      description: "Visualizza e gestisci tutti gli appuntamenti, inclusa l'assistenza prioritaria",
      icon: Calendar,
      href: "/admin/appointments",
      color: "from-blue-500 to-blue-600",
      features: ["Assistenza Prioritaria", "Filtri Avanzati", "Timeline", "Note Admin"],
      urgent: 3,
      status: "active",
    },
    {
      title: "Gestione Clienti",
      description: "Database clienti, storico interazioni e profili dettagliati",
      icon: Users,
      href: "/admin/customers",
      color: "from-green-500 to-green-600",
      features: ["Profili Completi", "Storico", "Segmentazione", "CRM"],
      status: "active",
    },
    {
      title: "Customer Journey Mapping",
      description: "Visualizza e ottimizza il percorso clienti con AI analytics",
      icon: Activity,
      href: "/admin/journey",
      color: "from-blue-500 to-blue-600",
      features: ["Journey Flow", "Analytics AI", "Ottimizzazione", "Bottlenecks"],
      status: "active",
    },
    {
      title: "Customer Health Score",
      description: "Scoring avanzato clienti basato su journey e engagement",
      icon: Heart,
      href: "/admin/health-score",
      color: "from-purple-500 to-purple-600",
      features: ["AI Scoring", "Risk Analysis", "Predictive", "Bulk Actions"],
      status: "active",
    },
    {
      title: "Analytics & Report",
      description: "Statistiche dettagliate, performance e report personalizzati",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "from-purple-500 to-purple-600",
      features: ["Dashboard", "Report", "KPI", "Export"],
      badge: "Presto",
      status: "development",
    },
    {
      title: "Gestione Servizi",
      description: "Configura servizi, prezzi, disponibilità e automazioni",
      icon: Settings,
      href: "/admin/services",
      color: "from-orange-500 to-orange-600",
      features: ["Configurazione", "Prezzi", "Automazioni", "Template"],
      badge: "Presto",
      status: "development",
    },
    {
      title: "Sistema Notifiche",
      description: "Gestisci notifiche, alert e comunicazioni automatiche",
      icon: Bell,
      href: "/admin/notifications",
      color: "from-red-500 to-red-600",
      features: ["SMS", "Email", "Push", "Webhook"],
      badge: "Presto",
      status: "development",
    },
    {
      title: "Sicurezza & Accessi",
      description: "Gestione utenti, permessi e log di sicurezza",
      icon: Shield,
      href: "/admin/security",
      color: "from-gray-500 to-gray-600",
      features: ["Utenti", "Permessi", "Log", "2FA"],
      badge: "Presto",
      status: "development",
    },
  ]

  const recentActivity = [
    {
      type: "priority",
      message: "Nuova richiesta assistenza prioritaria da Marco Rossi",
      time: "2 min fa",
      icon: AlertCircle,
      color: "text-red-600",
    },
    {
      type: "appointment",
      message: "Appuntamento completato con Laura Bianchi",
      time: "15 min fa",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      type: "system",
      message: "Backup automatico completato con successo",
      time: "1 ora fa",
      icon: Database,
      color: "text-blue-600",
    },
    {
      type: "customer",
      message: "Nuovo cliente registrato: Giuseppe Verdi",
      time: "2 ore fa",
      icon: Users,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-800">Digital Aura Admin</h1>
              </div>
              <Badge className="bg-purple-100 text-purple-700">Dashboard Principale</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-red-100 text-red-700 animate-pulse">
                <AlertCircle className="w-3 h-3 mr-1" />3 Priorità Pendenti
              </Badge>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Bell className="w-4 h-4 mr-2" />
                Notifiche
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="flex items-baseline space-x-2">
                        <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                        <Badge variant="outline" className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Admin Modules */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Moduli Amministrativi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {adminModules.map((module, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div
                              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center text-white`}
                            >
                              <module.icon className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              {module.urgent && (
                                <Badge className="bg-red-500 text-white animate-pulse">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  {module.urgent}
                                </Badge>
                              )}
                              {module.badge && (
                                <Badge variant="outline" className="text-xs">
                                  {module.badge}
                                </Badge>
                              )}
                              {module.status === "active" && (
                                <Badge className="bg-green-500 text-white text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Attivo
                                </Badge>
                              )}
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{module.description}</p>

                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {module.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {module.status === "active" ? (
                            <Link href={module.href}>
                              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                Accedi
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          ) : (
                            <Button variant="outline" className="w-full bg-transparent" disabled>
                              In Sviluppo
                              <Clock className="w-4 h-4 ml-2" />
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Attività Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 rounded-full bg-gray-100`}>
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 leading-relaxed">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <Button variant="outline" className="w-full bg-transparent">
                    Vedi Tutte le Attività
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Azioni Rapide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/appointments">
                  <Button className="w-full justify-start bg-red-600 hover:bg-red-700">
                    <HeadphonesIcon className="w-4 h-4 mr-2" />
                    Gestisci Assistenza Prioritaria
                  </Button>
                </Link>

                <Link href="/admin/customers">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                    <Users className="w-4 h-4 mr-2" />
                    Gestisci Database Clienti
                  </Button>
                </Link>

                <Link href="/admin/journey">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <Activity className="w-4 h-4 mr-2" />
                    Analizza Customer Journey
                  </Button>
                </Link>

                <Link href="/admin/health-score">
                  <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                    <Heart className="w-4 h-4 mr-2" />
                    Monitora Health Score
                  </Button>
                </Link>

                <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Gestisci Chatbot (Presto)
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Report Giornaliero (Presto)
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                  <Globe className="w-4 h-4 mr-2" />
                  Backup Sistema (Presto)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Stato Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-800">API Server</p>
                  <p className="text-sm text-gray-600">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-800">Database</p>
                  <p className="text-sm text-gray-600">Connesso</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-800">Notifiche</p>
                  <p className="text-sm text-gray-600">Attive</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-800">Backup</p>
                  <p className="text-sm text-gray-600">In corso</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
