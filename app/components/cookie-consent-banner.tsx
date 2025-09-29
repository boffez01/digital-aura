"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, Settings, X, Shield, BarChart3, Target, Eye } from "lucide-react"
import Link from "next/link"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export default function CookieConsentBanner() {
  const { language } = useLanguage()
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const content = {
    it: {
      title: "La tua privacy è la nostra priorità",
      description:
        "Questo sito utilizza cookie per migliorare la tua esperienza di navigazione. I cookie necessari sono sempre attivi, mentre puoi scegliere se accettare cookie analitici e di marketing per contenuti personalizzati.",
      learnMore: "Scopri di più nella nostra",
      cookiePolicy: "Cookie Policy",
      acceptAll: "Accetta Tutti",
      acceptSelected: "Accetto I Selezionati",
      manageOptions: "Gestisci Opzioni",
      continueWithout: "Continua senza accettare",
      close: "Chiudi",
      categories: {
        necessary: {
          title: "Cookie Necessari",
          description: "Essenziali per il funzionamento del sito. Non possono essere disabilitati.",
          always: "Sempre attivi",
        },
        analytics: {
          title: "Cookie Analitici",
          description: "Ci aiutano a capire come utilizzi il sito per migliorare l'esperienza utente.",
        },
        marketing: {
          title: "Cookie di Marketing",
          description: "Utilizzati per mostrarti contenuti e pubblicità personalizzati.",
        },
        preferences: {
          title: "Cookie di Preferenze",
          description: "Memorizzano le tue scelte per personalizzare l'esperienza di navigazione.",
        },
      },
      detailsTitle: "Gestisci i tuoi consensi",
      detailsDescription:
        "Puoi scegliere quali categorie di cookie accettare. I cookie necessari sono sempre attivi per garantire il funzionamento del sito.",
    },
    en: {
      title: "Your privacy is our priority",
      description:
        "This site uses cookies to improve your browsing experience. Necessary cookies are always active, while you can choose whether to accept analytics and marketing cookies for personalized content.",
      learnMore: "Learn more in our",
      cookiePolicy: "Cookie Policy",
      acceptAll: "Accept All",
      acceptSelected: "Accept Selected",
      manageOptions: "Manage Options",
      continueWithout: "Continue without accepting",
      close: "Close",
      categories: {
        necessary: {
          title: "Necessary Cookies",
          description: "Essential for site functionality. Cannot be disabled.",
          always: "Always active",
        },
        analytics: {
          title: "Analytics Cookies",
          description: "Help us understand how you use the site to improve user experience.",
        },
        marketing: {
          title: "Marketing Cookies",
          description: "Used to show you personalized content and advertising.",
        },
        preferences: {
          title: "Preference Cookies",
          description: "Store your choices to personalize the browsing experience.",
        },
      },
      detailsTitle: "Manage your consents",
      detailsDescription:
        "You can choose which categories of cookies to accept. Necessary cookies are always active to ensure site functionality.",
    },
  }

  const t = content[language as keyof typeof content]

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    savePreferences(allPreferences)
  }

  const handleAcceptSelected = () => {
    savePreferences(preferences)
  }

  const handleRejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    savePreferences(minimalPreferences)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())

    // Set actual cookies based on preferences
    if (prefs.analytics) {
      // Enable Google Analytics
      document.cookie = "analytics-enabled=true; path=/; max-age=31536000; SameSite=Lax"
    }
    if (prefs.marketing) {
      // Enable marketing cookies
      document.cookie = "marketing-enabled=true; path=/; max-age=31536000; SameSite=Lax"
    }
    if (prefs.preferences) {
      // Enable preference cookies
      document.cookie = "preferences-enabled=true; path=/; max-age=31536000; SameSite=Lax"
    }

    setShowBanner(false)
    setShowDetails(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return // Cannot disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

      {/* Banner */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white text-slate-900 shadow-2xl">
          <CardContent className="p-6">
            {!showDetails ? (
              // Main Banner
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
                      <p className="text-sm text-slate-600">Digital Aura</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRejectAll}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    {t.continueWithout}
                  </Button>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <p className="text-slate-700 leading-relaxed">{t.description}</p>
                  <p className="text-sm text-slate-600">
                    {t.learnMore}{" "}
                    <Link href="/cookies" className="text-blue-600 hover:text-blue-800 underline">
                      {t.cookiePolicy}
                    </Link>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setShowDetails(true)}
                    variant="outline"
                    className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {t.manageOptions}
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                  >
                    {t.acceptAll}
                  </Button>
                </div>
              </div>
            ) : (
              // Detailed Settings
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">{t.detailsTitle}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Description */}
                <p className="text-slate-700 text-sm">{t.detailsDescription}</p>

                {/* Cookie Categories */}
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {/* Necessary Cookies */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-slate-900">{t.categories.necessary.title}</h3>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {t.categories.necessary.always}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{t.categories.necessary.description}</p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-slate-900">{t.categories.analytics.title}</h3>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={() => togglePreference("analytics")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <p className="text-sm text-slate-600">{t.categories.analytics.description}</p>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-orange-600" />
                        <h3 className="font-semibold text-slate-900">{t.categories.marketing.title}</h3>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={() => togglePreference("marketing")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <p className="text-sm text-slate-600">{t.categories.marketing.description}</p>
                  </div>

                  {/* Preference Cookies */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-slate-900">{t.categories.preferences.title}</h3>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.preferences}
                          onChange={() => togglePreference("preferences")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <p className="text-sm text-slate-600">{t.categories.preferences.description}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
                  <Button
                    onClick={handleAcceptSelected}
                    variant="outline"
                    className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                  >
                    {t.acceptSelected}
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                  >
                    {t.acceptAll}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
