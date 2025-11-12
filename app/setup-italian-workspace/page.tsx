"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function SetupItalianWorkspace() {
  const [status, setStatus] = useState<"idle" | "authorizing" | "success" | "error">("idle")
  const [orgId, setOrgId] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleAuthorize = () => {
    setStatus("authorizing")
    // Redirect to OAuth with workspace parameter
    window.location.href = "/api/auth/zoho/authorize?workspace=italian"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Setup Workspace Italiano Zoho Bookings</CardTitle>
          <CardDescription className="text-center text-lg">
            Configura il workspace italiano per ricevere email in italiano
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Cosa farà questo setup:</h3>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              <li>Ti chiederà di autorizzare l'accesso al workspace italiano</li>
              <li>Ricaverà automaticamente l'Organization ID del workspace italiano</li>
              <li>Salverà il refresh token per il workspace italiano</li>
              <li>Configurerà il sistema per usare i service ID italiani quando la lingua è italiana</li>
            </ul>
          </div>

          {status === "idle" && (
            <Button onClick={handleAuthorize} size="lg" className="w-full">
              Inizia Autorizzazione Workspace Italiano
            </Button>
          )}

          {status === "authorizing" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Reindirizzamento a Zoho per l'autorizzazione... Assicurati di selezionare il workspace ITALIANO quando
                ti viene chiesto.
              </AlertDescription>
            </Alert>
          )}

          {status === "success" && orgId && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Setup completato con successo!</strong>
                <br />
                Organization ID italiano: <code className="font-mono bg-white px-2 py-1 rounded">{orgId}</code>
                <br />
                <br />
                Ora il sistema userà automaticamente il workspace italiano quando la lingua è impostata su italiano.
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Errore durante il setup:</strong>
                <br />
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Importante:</h4>
            <p className="text-sm text-yellow-700">
              Durante l'autorizzazione, assicurati di essere loggato con lo stesso account email che usi per entrambi i
              workspace e di autorizzare specificamente il workspace ITALIANO (Praxis Futura Italian), non quello
              inglese.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
