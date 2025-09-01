"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Settings, Calendar, Users, Activity, Heart, ChevronDown, AlertCircle } from "lucide-react"

export function AdminNav() {
  const adminModules = [
    {
      title: "Dashboard Principale",
      href: "/admin",
      icon: Settings,
      description: "Panoramica generale sistema",
    },
    {
      title: "Gestione Appuntamenti",
      href: "/admin/appointments",
      icon: Calendar,
      description: "Appuntamenti e assistenza prioritaria",
      urgent: 3,
    },
    {
      title: "Database Clienti",
      href: "/admin/customers",
      icon: Users,
      description: "CRM e gestione clienti",
    },
    {
      title: "Customer Journey",
      href: "/admin/journey",
      icon: Activity,
      description: "Analisi percorso clienti",
    },
    {
      title: "Health Score",
      href: "/admin/health-score",
      icon: Heart,
      description: "Scoring e analisi clienti",
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative bg-transparent">
          <Settings className="w-4 h-4 mr-2" />
          Admin Panel
          <ChevronDown className="w-4 h-4 ml-2" />
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0 min-w-[20px] h-5 rounded-full animate-pulse">
            3
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          Pannello Amministrativo
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {adminModules.map((module, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link href={module.href} className="flex items-start space-x-3 p-3 cursor-pointer">
              <div className="flex-shrink-0">
                <module.icon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">{module.title}</p>
                  {module.urgent && (
                    <Badge className="bg-red-500 text-white text-xs ml-2">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {module.urgent}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{module.description}</p>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin" className="flex items-center justify-center p-2 text-purple-600 font-medium">
            <Settings className="w-4 h-4 mr-2" />
            Vai al Dashboard Completo
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
