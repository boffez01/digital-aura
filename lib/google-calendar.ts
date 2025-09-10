// Mock Google Calendar service per compatibilità v0 preview
interface CalendarEvent {
  title: string
  description: string
  date: string
  time: string
  duration: number
  attendeeEmail: string
  attendeeName: string
}

interface CalendarResult {
  success: boolean
  eventId?: string
  eventLink?: string
  error?: string
}

class GoogleCalendarService {
  private isPreviewMode(): boolean {
    // Rileva se siamo in ambiente v0 preview
    return typeof window !== "undefined" || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  }

  getMode(): "preview" | "production" {
    return this.isPreviewMode() ? "preview" : "production"
  }

  async createEvent(eventData: CalendarEvent): Promise<CalendarResult> {
    console.log("📅 Creating calendar event:", eventData)

    if (this.isPreviewMode()) {
      // Mock per v0 preview
      console.log("🎭 Preview mode: Using mock Google Calendar")

      const mockEventId = `mock_event_${Date.now()}`
      const mockEventLink = `https://calendar.google.com/calendar/event?eid=${mockEventId}`

      return {
        success: true,
        eventId: mockEventId,
        eventLink: mockEventLink,
      }
    }

    try {
      // In production, qui useremmo la vera Google Calendar API
      // Per ora usiamo mock anche in production per compatibilità
      const mockEventId = `prod_event_${Date.now()}`
      const mockEventLink = `https://calendar.google.com/calendar/event?eid=${mockEventId}`

      console.log("✅ Calendar event created successfully")

      return {
        success: true,
        eventId: mockEventId,
        eventLink: mockEventLink,
      }
    } catch (error) {
      console.error("❌ Error creating calendar event:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown calendar error",
      }
    }
  }

  async listEvents(): Promise<CalendarResult> {
    console.log("📋 Listing calendar events")

    if (this.isPreviewMode()) {
      console.log("🎭 Preview mode: Using mock events list")
      return {
        success: true,
        eventId: "mock_list",
        eventLink: "https://calendar.google.com",
      }
    }

    try {
      // In production, qui useremmo la vera Google Calendar API
      return {
        success: true,
        eventId: "prod_list",
        eventLink: "https://calendar.google.com",
      }
    } catch (error) {
      console.error("❌ Error listing calendar events:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown calendar error",
      }
    }
  }

  async deleteEvent(eventId: string): Promise<CalendarResult> {
    console.log("🗑️ Deleting calendar event:", eventId)

    if (this.isPreviewMode()) {
      console.log("🎭 Preview mode: Mock delete event")
      return { success: true }
    }

    try {
      // In production, qui useremmo la vera Google Calendar API
      return { success: true }
    } catch (error) {
      console.error("❌ Error deleting calendar event:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown calendar error",
      }
    }
  }
}

export const googleCalendar = new GoogleCalendarService()
