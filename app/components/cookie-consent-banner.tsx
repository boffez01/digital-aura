"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "../contexts/language-context"
import { Cookie, Shield, BarChart3, Target } from "lucide-react"

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
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem("cookie-consent")
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setShowDetails(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    setPreferences(onlyNecessary)
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setShowDetails(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setShowDetails(false)
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const content = {
    it: {
      title: "Utilizziamo i Cookie",
      description:
        "Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza, analizzare il traffico e personalizzare i contenuti.",
      acceptAll: "Accetta Tutti",
      rejectAll: "Rifiuta Tutti",
      manageOptions: "Gestisci Opzioni",
      detailsTitle: "Preferenze Cookie",
      detailsDescription: "Scegli quali cookie accettare. Puoi modificare queste impostazioni in qualsiasi momento.",
      save: "Salva Preferenze",
      categories: {
        necessary: {
          title: "Cookie Necessari",
          description: "Essenziali per il funzionamento del sito web. Non possono essere disabilitati.",
        },
        analytics: {
          title: "Cookie Analitici",
          description: "Ci aiutano a capire come i visitatori interagiscono con il sito web.",
        },
        marketing: {
          title: "Cookie Marketing",
          description: "Utilizzati per tracciare i visitatori sui siti web per mostrare annunci pertinenti.",
        },
        preferences: {
          title: "Cookie Preferenze",
          description: "Permettono al sito web di ricordare le tue scelte e preferenze.",
        },
      },
      links: {
        privacy: "Informativa Privacy",
        cookies: "Policy Cookie",
      },
    },
    en: {
      title: "We Use Cookies",
      description:
        "We use cookies and similar technologies to improve your experience, analyze traffic, and personalize content.",
      acceptAll: "Accept All",
      rejectAll: "Reject All",
      manageOptions: "Manage Options",
      detailsTitle: "Cookie Preferences",
      detailsDescription: "Choose which cookies to accept. You can change these settings at any time.",
      save: "Save Preferences",
      categories: {
        necessary: {
          title: "Necessary Cookies",
          description: "Essential for the website to function. Cannot be disabled.",
        },
        analytics: {
          title: "Analytics Cookies",
          description: "Help us understand how visitors interact with the website.",
        },
        marketing: {
          title: "Marketing Cookies",
          description: "Used to track visitors across websites to display relevant ads.",
        },
        preferences: {
          title: "Preference Cookies",
          description: "Allow the website to remember your choices and preferences.",
        },
      },
      links: {
        privacy: "Privacy Policy",
        cookies: "Cookie Policy",
      },
    },
  }

  const t = content[language as keyof typeof content] || content.it

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Cookie className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{t.description}</p>
                    <div className="flex gap-4 mt-2">
                      <a href="/privacy" className="text-xs text-blue-600 hover:underline">
                        {t.links.privacy}
                      </a>
                      <a href="/cookies" className="text-xs text-blue-600 hover:underline">
                        {t.links.cookies}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" onClick={() => setShowDetails(true)} className="w-full sm:w-auto">
                    {t.manageOptions}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="w-full sm:w-auto bg-transparent"
                  >
                    {t.rejectAll}
                  </Button>
                  <Button size="sm" onClick={handleAcceptAll} className="w-full sm:w-auto">
                    {t.acceptAll}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              {t.detailsTitle}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <p className="text-sm text-gray-600">{t.detailsDescription}</p>

            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex items-start gap-3 flex-1">
                  <Shield className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">{t.categories.necessary.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t.categories.necessary.description}</p>
                  </div>
                </div>
                <Switch checked={preferences.necessary} disabled className="mt-1" />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-3 flex-1">
                  <BarChart3 className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">{t.categories.analytics.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t.categories.analytics.description}</p>
                  </div>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => updatePreference("analytics", checked)}
                  className="mt-1"
                />
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-3 flex-1">
                  <Target className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">{t.categories.marketing.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t.categories.marketing.description}</p>
                  </div>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => updatePreference("marketing", checked)}
                  className="mt-1"
                />
              </div>

              {/* Preference Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-3 flex-1">
                  <Cookie className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">{t.categories.preferences.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t.categories.preferences.description}</p>
                  </div>
                </div>
                <Switch
                  checked={preferences.preferences}
                  onCheckedChange={(checked) => updatePreference("preferences", checked)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleRejectAll} className="flex-1 bg-transparent">
                {t.rejectAll}
              </Button>
              <Button onClick={handleSavePreferences} className="flex-1">
                {t.save}
              </Button>
              <Button onClick={handleAcceptAll} className="flex-1">
                {t.acceptAll}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
