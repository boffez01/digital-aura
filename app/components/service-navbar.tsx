"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/language-context"
import { Home, Bot, Code, TrendingUp, Zap, ChevronDown, ArrowRight, Sparkles, Rocket } from "lucide-react"

export default function ServiceNavbar() {
  const pathname = usePathname()
  const { language, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const services = [
    {
      href: "/services/ai-automation",
      name: language === "en" ? "AI Automation" : "Automazione AI",
      description: language === "en" ? "Intelligent process automation" : "Automazione intelligente dei processi",
      icon: <Zap className="h-4 w-4" />,
      color: "from-purple-600 to-pink-600",
      badge: language === "en" ? "Popular" : "Popolare",
    },
    {
      href: "/services/chatbot",
      name: language === "en" ? "AI Chatbot" : "Chatbot AI",
      description: language === "en" ? "Intelligent virtual assistants" : "Assistenti virtuali intelligenti",
      icon: <Bot className="h-4 w-4" />,
      color: "from-blue-600 to-indigo-600",
      badge: "24/7",
    },
    {
      href: "/services/web-development",
      name: language === "en" ? "Web Development" : "Sviluppo Web",
      description: language === "en" ? "Modern and responsive websites" : "Siti web moderni e responsive",
      icon: <Code className="h-4 w-4" />,
      color: "from-green-600 to-teal-600",
      badge: language === "en" ? "Custom" : "Personalizzato",
    },
    {
      href: "/services/ai-marketing",
      name: language === "en" ? "AI Marketing" : "Marketing AI",
      description:
        language === "en" ? "Intelligent and personalized marketing" : "Marketing intelligente e personalizzato",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "from-orange-600 to-red-600",
      badge: "ROI+",
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Home Link */}
          <Link href="/" className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors">
            <Home className="h-5 w-5" />
            <span className="font-semibold">{t("nav.home")}</span>
          </Link>

          {/* Services Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {services.map((service) => (
              <Link key={service.href} href={service.href}>
                <Button
                  variant={isActive(service.href) ? "default" : "ghost"}
                  className={`relative h-10 px-4 ${
                    isActive(service.href)
                      ? `bg-gradient-to-r ${service.color} text-white hover:opacity-90`
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  } transition-all duration-200`}
                >
                  <div className="flex items-center space-x-2">
                    {service.icon}
                    <span className="font-medium">{service.name}</span>
                    {service.badge && (
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          isActive(service.href) ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {service.badge}
                      </Badge>
                    )}
                  </div>
                  {isActive(service.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/50"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-1"
            >
              <span className="text-sm font-medium">{t("nav.services")}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/appointments">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                <Sparkles className="h-4 w-4 mr-2" />
                {language === "en" ? "Book Consultation" : "Prenota Consulenza"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="grid gap-3">
              {services.map((service) => (
                <Link key={service.href} href={service.href} onClick={() => setIsOpen(false)}>
                  <Card
                    className={`p-4 hover:shadow-md transition-all duration-200 ${
                      isActive(service.href) ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${service.color} text-white`}>
                          {service.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{service.name}</div>
                          <div className="text-sm text-gray-600">{service.description}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Card>
                </Link>
              ))}
              <Link href="/appointments" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 mt-2">
                  <Rocket className="h-4 w-4 mr-2" />
                  {language === "en" ? "Book Consultation" : "Prenota Consulenza"}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
