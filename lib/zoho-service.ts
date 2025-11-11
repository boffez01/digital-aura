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
const ZOHO_BOOKINGS_BASE_URL = "https://www.zohoapis.eu/bookings/v1"
const ZOHO_CRM_BASE_URL = "https://www.zohoapis.eu/crm/v6"

export class ZohoService {
  private tokenManager = new ZohoTokenManager()

  private getZohoServiceId(serviceName: string): string {
    // Map service names to actual Zoho Bookings Service IDs
    const serviceMap: Record<string, string> = {
      "AI Automation": process.env.ZOHO_SERVICE_ID_AI_AUTOMATION || "",
      "Intelligent Chatbots": process.env.ZOHO_SERVICE_ID_CHATBOTS || "",
      "Web Development": process.env.ZOHO_SERVICE_ID_WEB_DEVELOPMENT || "",
      "AI Marketing": process.env.ZOHO_SERVICE_ID_AI_MARKETING || "",
    }

    // Fallback to a default service ID if not mapped
    return serviceMap[serviceName] || process.env.ZOHO_DEFAULT_SERVICE_ID || ""
  }

  private getZohoOrgId(): string {
    return process.env.ZOHO_ORGANIZATION_ID || ""
  }

  // 1. Gestione Access Token (Refresh Token)
  private async getAccessToken(): Promise<string> {
    return await this.tokenManager.getValidAccessToken()
  }

  // 3. Prenotazione finale (Zoho Bookings)
  public async bookAppointment(data: BookingData): Promise<string> {
    const zohoServiceId = this.getZohoServiceId(data.service)
    const token = await this.getAccessToken()

    // URL: https://www.zohoapis.eu/bookings/v1/json/appointment (datacenter EU)
    const zohoApiUrl = `https://www.zohoapis.eu/bookings/v1/json/appointment`

    const formattedDate = this.formatDateForZoho(data.date, data.time)

    const formData = new FormData()
    formData.append("service_id", zohoServiceId)
    // Nota: staff_id è opzionale, Zoho assegna automaticamente uno staff disponibile
    formData.append("from_time", formattedDate)
    formData.append("timezone", "Europe/Rome")
    formData.append(
      "customer_details",
      JSON.stringify({
        name: data.name,
        email: data.email,
        phone_number: data.phone,
      }),
    )
    if (data.message) {
      formData.append("notes", data.message)
    }

    try {
      const response = await fetch(zohoApiUrl, {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Zoho Booking API Error:", errorData)

        if (response.status === 409 || response.status === 400) {
          throw new Error("BOOKING_CONFLICT")
        }
        throw new Error("ZOHO_BOOKING_FAILED")
      }

      const result = await response.json()
      const bookingId = result.response?.returnvalue?.booking_id || "Zoho-ID-Unknown"
      console.log("[v0] Zoho booking successful:", bookingId)
      return bookingId
    } catch (error) {
      console.error("❌ Errore prenotazione Zoho:", error)
      throw error
    }
  }

  private formatDateForZoho(date: string, time: string): string {
    // Input: date = "2024-11-12", time = "14:00"
    // Output: "12-Nov-2024 14:00:00"
    const [year, month, day] = date.split("-")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthName = monthNames[Number.parseInt(month) - 1]
    return `${day}-${monthName}-${year} ${time}:00`
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
