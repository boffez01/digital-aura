import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json({ success: false, error: "Date parameter required" }, { status: 400 })
    }

    console.log("🔍 Checking availability for date:", date)

    // Query per ottenere gli appuntamenti per la data specifica
    const appointments = await sql`
      SELECT time, status, created_at 
      FROM appointments 
      WHERE date = ${date} 
      AND status IN ('pending', 'confirmed')
      ORDER BY time ASC
    `

    console.log("📊 Raw appointments from DB:", appointments)

    // Normalizza i formati orario e rimuovi duplicati
    const normalizedTimes = new Set<string>()

    appointments.forEach((apt: any) => {
      if (apt.time) {
        // Converti il time in stringa e normalizza il formato
        let timeStr = apt.time.toString()

        // Se ha i secondi, rimuovili: "09:30:00" → "09:30"
        if (timeStr.length > 5) {
          timeStr = timeStr.substring(0, 5)
        }

        normalizedTimes.add(timeStr)
        console.log(`⏰ Normalized time: ${apt.time} → ${timeStr}`)
      }
    })

    const uniqueOccupiedSlots = Array.from(normalizedTimes)

    console.log("✅ Final occupied slots:", uniqueOccupiedSlots)

    return NextResponse.json({
      success: true,
      date: date,
      occupied_slots: uniqueOccupiedSlots,
      debug: {
        raw_count: appointments.length,
        normalized_count: uniqueOccupiedSlots.length,
        raw_times: appointments.map((apt: any) => apt.time),
        normalized_times: uniqueOccupiedSlots,
      },
    })
  } catch (error) {
    console.error("❌ Error checking availability:", error)
    return NextResponse.json({ success: false, error: "Failed to check availability" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { date, time } = await request.json()

    if (!date || !time) {
      return NextResponse.json({ success: false, error: "Date and time required" }, { status: 400 })
    }

    console.log("🔍 Checking specific slot:", { date, time })

    // Controlla se esiste già un appuntamento per quella data/ora
    const existingAppointment = await sql`
      SELECT id, time, status 
      FROM appointments 
      WHERE date = ${date} 
      AND time = ${time}
      AND status IN ('pending', 'confirmed')
      LIMIT 1
    `

    const isAvailable = existingAppointment.length === 0

    console.log("📊 Slot check result:", {
      date,
      time,
      existing: existingAppointment.length,
      available: isAvailable,
    })

    return NextResponse.json({
      success: true,
      available: isAvailable,
      date,
      time,
      existing_appointments: existingAppointment.length,
    })
  } catch (error) {
    console.error("❌ Error checking specific slot:", error)
    return NextResponse.json({ success: false, error: "Failed to check slot availability" }, { status: 500 })
  }
}
