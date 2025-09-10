import { NextResponse } from "next/server"

// Mock Google Calendar per compatibilità v0
export async function GET() {
  try {
    console.log("📅 CALENDAR API - Fetching events...")

    // Simula eventi del calendario
    const mockEvents = [
      {
        id: "event_1",
        title: "Appuntamento Web Development",
        start: new Date().toISOString(),
        end: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        attendee: "mario.rossi@email.com",
      },
      {
        id: "event_2",
        title: "Consulenza AI Marketing",
        start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        end: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
        attendee: "giulia.bianchi@email.com",
      },
    ]

    console.log("✅ Calendar events fetched successfully")

    return NextResponse.json({
      success: true,
      events: mockEvents,
      count: mockEvents.length,
      mode: "mock",
    })
  } catch (error) {
    console.error("❌ Calendar API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Errore nel recupero degli eventi",
        events: [],
      },
      { status: 500 },
    )
  }
}
