// lib/zoho-service.ts

interface BookingData {
  service: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  message?: string
}

// Punti di accesso API per il dominio Europeo (zohoapis.eu)
const ZOHO_AUTH_URL = "https://accounts.zoho.eu/oauth/v2/token"
const ZOHO_BOOKINGS_BASE_URL = "https://www.zohoapis.eu/bookings/v1/json"
const ZOHO_CRM_BASE_URL = "https://www.zohoapis.eu/crm/v6"

export class ZohoService {
  private accessToken: string | null = null
  private tokenExpiryTime = 0

  private getZohoServiceId(serviceName: string): string {
    // Usa la ZOHO_LIST_KEY come ID predefinito del servizio
    return process.env.ZOHO_LIST_KEY || ""
  }

  private getZohoOrgId(): string {
    return process.env.ZOHO_ORGANIZATION_ID || "ORGANIZATION_ID_MANCANTE"
  }

  // 1. Gestione Access Token (Refresh Token)
  private async getAccessToken(): Promise<string> {
    const now = Date.now()
    if (this.accessToken && this.tokenExpiryTime > now) {
      return this.accessToken
    }

    try {
      const response = await fetch(
        `${ZOHO_AUTH_URL}?refresh_token=${process.env.ZOHO_REFRESH_TOKEN}&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&grant_type=refresh_token`,
        { method: "POST" },
      )

      if (!response.ok) {
        throw new Error(`Failed to refresh Zoho token: ${response.status}`)
      }

      const data = await response.json()
      this.accessToken = data.access_token
      this.tokenExpiryTime = now + data.expires_in * 1000 - 5 * 60 * 1000
      return this.accessToken
    } catch (error) {
      console.error("❌ ERRORE CRITICO: Impossibile ottenere il token Zoho.", error)
      throw new Error("ZOHO_AUTH_FAILED")
    }
  }

  // 2. Richiesta disponibilità (Zoho Bookings)
  public async getAvailableSlots(date: string, serviceName: string): Promise<string[]> {
    const zohoServiceId = this.getZohoServiceId(serviceName)

    try {
      const token = await this.getAccessToken()
      const zohoApiUrl = `${ZOHO_BOOKINGS_BASE_URL}/availability?date=${date}&serviceId=${zohoServiceId}&timeZone=Europe/Rome&viewType=slot`

      const response = await fetch(zohoApiUrl, {
        method: "GET",
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
      })

      if (!response.ok) {
        console.error(`Zoho availability API error: ${response.status} ${response.statusText}`)
        // Fallback: ritorna slot vuoti, il sistema userà il database locale
        return []
      }

      const data = await response.json()
      // Adattare la mappatura in base al formato di risposta di Zoho Bookings
      const slots = data.availableSlots?.map((slot: any) => slot.startTime) || []

      console.log(`[v0] Zoho disponibilità per ${date}:`, slots)
      return slots
    } catch (error) {
      console.error("❌ Errore durante il check di disponibilità su Zoho:", error)
      return [] // Nessuna disponibilità in caso di errore
    }
  }

  // 3. Prenotazione finale (Zoho Bookings)
  public async bookAppointment(data: BookingData): Promise<string> {
    const zohoServiceId = this.getZohoServiceId(data.service)
    const token = await this.getAccessToken()

    const zohoPayload = {
      service_id: zohoServiceId,
      appointment_time: `${data.date}T${data.time}:00`,
      customer_details: {
        customer_name: data.name,
        email: data.email,
        phone: data.phone,
      },
      notes: data.message || `Prenotazione servizio: ${data.service}`,
    }

    try {
      const zohoApiUrl = `${ZOHO_BOOKINGS_BASE_URL}/appointment`

      const response = await fetch(zohoApiUrl, {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(zohoPayload),
      })

      if (response.status === 409 || response.status === 400) {
        throw new Error("BOOKING_CONFLICT")
      }
      if (!response.ok) {
        const errorData = await response.json()
        console.error("Zoho Booking API Error:", errorData)
        throw new Error("ZOHO_BOOKING_FAILED")
      }

      const result = await response.json()
      // Adattare l'estrazione dell'ID di prenotazione
      return result.appointmentId || result.data?.[0]?.id || "Zoho-ID-Unknown"
    } catch (error) {
      throw error
    }
  }

  // 4. Invio Contatto (Zoho CRM)
  public async createLead(contactData: any): Promise<void> {
    try {
      const token = await this.getAccessToken()
      const zohoApiUrl = `${ZOHO_CRM_BASE_URL}/Leads`

      const zohoPayload = {
        data: [
          {
            Company: contactData.company || "Praxis Futura Chatbot Lead",
            Last_Name: contactData.name?.split(" ").pop() || contactData.name,
            First_Name: contactData.name?.split(" ").slice(0, -1).join(" ") || contactData.name,
            Email: contactData.email,
            Phone: contactData.phone,
            Description: contactData.message,
            Lead_Source: "Chatbot PraxisBot",
          },
        ],
      }

      const response = await fetch(zohoApiUrl, {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(zohoPayload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Zoho CRM Lead API Error:", errorData)
      } else {
        console.log("[v0] Lead inviato a Zoho CRM con successo")
      }
    } catch (error) {
      console.error("❌ Errore durante la creazione del Lead su Zoho:", error)
    }
  }

  // 5. Recupero del Contesto Cliente (Dati Zia/CRM)
  public async getCustomerContext(email: string): Promise<any | null> {
    console.log(`📞 Chiamata Zoho CRM: Ricerca Contesto per email: ${email}`)

    if (!email) {
      return null
    }

    try {
      const token = await this.getAccessToken()
      // Ricerca un Contatto nel CRM tramite email
      const searchUrl = `${ZOHO_CRM_BASE_URL}/Contacts/search?email=${encodeURIComponent(email)}`

      const response = await fetch(searchUrl, {
        method: "GET",
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
      })

      if (!response.ok) {
        console.error("Zoho Context Search failed:", response.status)
        return null
      }

      const data = await response.json()
      const customer = data.data?.[0]

      if (customer) {
        // Mappa i campi rilevanti per l'AI
        return {
          status: customer.Status || "N/A",
          lead_score: customer.Zia_Score__c || "N/A",
          priority: customer.Priority || "Bassa",
          last_message: customer.Description || "",
        }
      }
      return null
    } catch (error) {
      console.error("❌ Errore nel recupero contesto Zoho Zia/CRM:", error)
      return null
    }
  }
}
