import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    console.log("📋 ADMIN APPOINTMENTS API - Fetching real appointments from database...")

    // Ottieni tutti gli appuntamenti reali dal database
    const appointments = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        service,
        date,
        time,
        message,
        status,
        priority,
        created_at,
        updated_at,
        google_event_id,
        google_event_link
      FROM appointments 
      ORDER BY created_at DESC
    `

    console.log(`✅ Found ${appointments.length} real appointments in database`)

    // Calcola statistiche reali
    const today = new Date().toISOString().split("T")[0]
    const todayAppointments = appointments.filter((apt) => apt.date === today)
    const priorityAppointments = appointments.filter((apt) => apt.priority === true)
    const pendingPriority = appointments.filter((apt) => apt.priority === true && apt.status === "pending")
    const completedToday = appointments.filter((apt) => apt.date === today && apt.status === "confirmed")

    const stats = {
      totalAppointments: appointments.length,
      priorityAppointments: priorityAppointments.length,
      pendingPriority: pendingPriority.length,
      completedToday: completedToday.length,
      averageResponseTime: 15, // Calcolato dinamicamente in futuro
      satisfactionRate: 98, // Calcolato dinamicamente in futuro
    }

    // Trasforma i dati per il frontend
    const transformedAppointments = appointments.map((apt) => ({
      id: apt.id.toString(),
      type: apt.priority ? "priority" : "regular",
      service: apt.service,
      serviceName: apt.service,
      customerName: apt.name,
      customerEmail: apt.email,
      customerPhone: apt.phone,
      message: apt.message,
      date: apt.date,
      time: apt.time,
      status: apt.status,
      priority: apt.priority,
      createdAt: apt.created_at,
      updatedAt: apt.updated_at,
      name: apt.name,
      email: apt.email,
      phone: apt.phone,
    }))

    console.log("✅ ADMIN APPOINTMENTS API - Returning real data:", {
      appointmentsCount: transformedAppointments.length,
      stats,
    })

    return NextResponse.json({
      success: true,
      appointments: transformedAppointments,
      stats,
    })
  } catch (error) {
    console.error("❌ ADMIN APPOINTMENTS API - Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Errore nel caricamento degli appuntamenti",
        appointments: [],
        stats: {
          totalAppointments: 0,
          priorityAppointments: 0,
          pendingPriority: 0,
          completedToday: 0,
          averageResponseTime: 0,
          satisfactionRate: 0,
        },
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { appointmentId, status, notes } = await request.json()

    console.log(`🔄 ADMIN APPOINTMENTS API - Updating appointment ${appointmentId} to ${status}`)

    const result = await sql`
      UPDATE appointments 
      SET 
        status = ${status},
        updated_at = NOW()
      WHERE id = ${appointmentId}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ success: false, error: "Appuntamento non trovato" }, { status: 404 })
    }

    console.log(`✅ ADMIN APPOINTMENTS API - Updated appointment ${appointmentId}`)

    return NextResponse.json({
      success: true,
      appointment: result[0],
      message: `Appuntamento aggiornato a ${status}`,
    })
  } catch (error) {
    console.error("❌ ADMIN APPOINTMENTS API - Update error:", error)
    return NextResponse.json({ success: false, error: "Errore nell'aggiornamento dell'appuntamento" }, { status: 500 })
  }
}
