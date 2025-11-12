"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, AlertCircle } from "lucide-react"
import Link from "next/link"

export function ItalianWorkspaceSetupBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem("italian-workspace-setup-dismissed")
    if (!isDismissed) {
      setShowBanner(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem("italian-workspace-setup-dismissed", "true")
    setShowBanner(false)
    setDismissed(true)
  }

  if (!showBanner || dismissed) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <strong className="text-blue-900">Setup Workspace Italiano Richiesto</strong>
            <p className="text-sm text-blue-700 mt-1">
              Per ricevere email in italiano, configura il workspace italiano di Zoho Bookings.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/setup-italian-workspace">
              <Button size="sm" variant="default">
                Configura Ora
              </Button>
            </Link>
            <Button size="sm" variant="ghost" onClick={handleDismiss}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
