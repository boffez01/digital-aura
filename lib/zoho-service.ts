// lib/zoho-service.ts

import { ZohoTokenManager } from "./zoho-token-manager"

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
  private tokenManager = new ZohoTokenManager()

  private getZohoServiceId(serviceName: string): string {
    // Map service names to actual Zoho Bookings Service IDs
    // These IDs need to be retrieved from Zoho Bookings dashboard
    const serviceMap: Record<string, string> = {
      "AI Automation": process.env.ZOHO_SERVICE_ID_AI_AUTOMATION || "",
      "Intelligent Chatbots": process.env.ZOHO_SERVICE_ID_CHATBOTS || "",
      "Web Development": process.env.ZOHO_SERVICE_ID_WEB || "",
      "AI Marketing": process.env.ZOHO_SERVICE_ID_MARKETING || "",
    }

    // Fallback to a default service ID if not mapped
    return serviceMap[serviceName] || process.env.ZOHO_DEFAULT_SERVICE_ID || ""
  }

  private getZohoOrgId(): string {
    return process.env.ZOHO_ORGANIZATION_ID || "ORGANIZATION_ID_MANCANTE"
  }

  // 1. Gestione Access Token (Refresh Token)
  private async getAccessToken(): Promise<string> {
    return await this.tokenManager.getValidAccessToken()
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
