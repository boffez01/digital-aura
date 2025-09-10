import { NextResponse } from "next/server"
import { googleCalendar } from "@/lib/google-calendar"

export async function GET() {
  try {
    console.log("🔍 Testing Google Calendar connection...")

    const result = await googleCalendar.testConnection()
    const mode = googleCalendar.getMode()

    if (result.success) {
      const message =
        mode === "preview"
          ? "Google Calendar connection test successful! ✅ (Modalità demo)"
          : "Google Calendar connection successful! ✅"

      return NextResponse.json({
        success: true,
        message,
        calendars: result.calendars,
        serviceAccount: result.serviceAccount || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        projectId: result.projectId || process.env.GOOGLE_PROJECT_ID,
        mode,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: "Google Calendar connection failed ❌",
          mode,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("❌ Error testing Google Calendar:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Errore nel test della connessione Google Calendar",
        details: error instanceof Error ? error.message : "Unknown error",
        mode: "error",
      },
      { status: 500 },
    )
  }
}
