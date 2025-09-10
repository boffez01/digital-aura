import { type NextRequest, NextResponse } from "next/server"
import { createAppointment, type CreateAppointmentData } from "@/lib/database"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("📝 Received appointment request:", body)

    const { name, email, phone, service, date, time, message, status, priority } = body

    // Validate required fields
    if (!name || !email || !service || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          message: "Name, email, service, date, and time are required",
        },
        { status: 400 },
      )
    }

    // ✅ FINAL AVAILABILITY CHECK before creating appointment
    console.log("🔍 Final availability check before creating appointment...")

    const existingAppointment = await sql`
      SELECT id, name, status FROM appointments 
      WHERE date = ${date} AND time = ${time} AND status != 'cancelled'
      LIMIT 1
    `

    if (existingAppointment.length > 0) {
      console.log(`❌ Time slot ${date} ${time} is already occupied by: ${existingAppointment[0].name}`)

      return NextResponse.json(
        {
          success: false,
          error: "Time slot occupied",
          message: "This time slot was just booked by someone else. Please select another time.",
          occupied: true,
          conflicting_appointment: existingAppointment[0],
        },
        { status: 409 }, // Conflict status
      )
    }

    // Create the appointment
    const appointmentData: CreateAppointmentData = {
      name,
      email,
      phone: phone || "",
      service,
      date,
      time,
      message: message || "",
      status: status || "pending",
      priority: priority || false,
    }

    console.log("💾 Creating appointment with data:", appointmentData)

    const newAppointment = await createAppointment(appointmentData)

    console.log("✅ Appointment created successfully:", newAppointment.id)

    return NextResponse.json({
      success: true,
      message: "Appointment created successfully",
      appointment: newAppointment,
    })
  } catch (error) {
    console.error("❌ Error creating appointment:", error)

    // Check if it's a duplicate key error (race condition)
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json(
        {
          success: false,
          error: "Time slot occupied",
          message: "This time slot was just booked. Please select another time.",
          occupied: true,
        },
        { status: 409 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Database error",
        message: error instanceof Error ? error.message : "Failed to create appointment",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const appointments = await sql`
      SELECT * FROM appointments 
      ORDER BY date DESC, time DESC
    `

    return NextResponse.json({
      success: true,
      appointments,
    })
  } catch (error) {
    console.error("❌ Error fetching appointments:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Database error",
        message: error instanceof Error ? error.message : "Failed to fetch appointments",
      },
      { status: 500 },
    )
  }
}
