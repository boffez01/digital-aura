"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Clock, Zap, MessageSquare, Shield, Settings, Bell } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

const adminNavItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: BarChart,
    isExact: true,
  },
  {
    name: "Health Score",
    href: "/admin/health-score",
    icon: Zap,
    isExact: false,
  },
  {
    name: "Journey",
    href: "/admin/journey",
    icon: Clock,
    isExact: false,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
    isExact: false,
  },

  // - Contatti/Customers
  // - Appointments/Calendar

  {
    name: "Services",
    href: "/admin/services",
    icon: Settings,
    isExact: false,
  },
  {
    name: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    isExact: false,
  },
  {
    name: "Security",
    href: "/admin/security",
    icon: Shield,
    isExact: false,
  },
]

export function AdminNav() {
  const pathname = usePathname()
  const { language } = useLanguage()

  const isActive = (href: string, isExact: boolean) => {
    if (isExact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const getDisplayName = (name: string) => {
    if (language === "it") {
      switch (name) {
        case "Dashboard":
          return "Dashboard"
        case "Health Score":
          return "Punteggio Salute"
        case "Journey":
          return "Percorso Utente"
        case "Messages":
          return "Messaggi"
        case "Services":
          return "Servizi"
        case "Notifications":
          return "Notifiche"
        case "Security":
          return "Sicurezza"
        default:
          return name
      }
    }
    return name
  }

  return (
    <nav className="space-y-2">
      {adminNavItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            isActive(item.href, item.isExact)
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <item.icon className="h-5 w-5" />
          {getDisplayName(item.name)}
        </Link>
      ))}
    </nav>
  )
}
