import { NextResponse } from "next/server"
import { getAppointments, updateAppointmentGoogleEvent } from "@/lib/database"
import { googleCalendar } from "@/lib/google-calendar"

export async function POST() {
  try {
    console.log("🔄 Starting calendar synchronization...")

    // Ottieni tutti gli appuntamenti senza Google Event ID
    const appointments = await getAppointments()
    const unsyncedAppointments = appointments.filter((apt) => !apt.google_event_id)

    console.log(`📊 Found ${unsyncedAppointments.length} appointments to sync`)

    const results = {
      total: unsyncedAppointments.length,
      synced: 0,
      failed: 0,
      errors: [] as string[],
    }

    // Sincronizza ogni appuntamento
    for (const appointment of unsyncedAppointments) {
      try {
        console.log(`🔄 Syncing appointment ${appointment.id}...`)

        const calendarEventData = {
          title: `🎯 ${appointment.service}`,
          description: `
📋 DETTAGLI APPUNTAMENTO DIGITAL AURA:

👤 Cliente: ${appointment.name}
📧 Email: ${appointment.email}
📞 Telefono: ${appointment.phone}
🎯 Servizio: ${appointment.service}
📝 Note: ${appointment.message}

🆔 ID Appuntamento: ${appointment.id}
🌐 Digital Aura Portfolio

---
Questo appuntamento è stato sincronizzato automaticamente.
          `.trim(),
          date: appointment.date,
          time: appointment.time,
          duration: 60,
          attendeeEmail: appointment.email,
          attendeeName: appointment.name,
        }

        const calendarResult = await googleCalendar.createEvent(calendarEventData)

        if (calendarResult.success && calendarResult.eventId) {
          // Aggiorna l'appuntamento con i dati di Google Calendar
          await updateAppointmentGoogleEvent(appointment.id, calendarResult.eventId, calendarResult.eventLink || "")

          results.synced++
          console.log(`✅ Appointment ${appointment.id} synced successfully`)
        } else {
          results.failed++
          const error = `Appointment ${appointment.id}: ${calendarResult.error}`
          results.errors.push(error)
          console.error(`❌ Failed to sync appointment ${appointment.id}:`, calendarResult.error)
        }
      } catch (error) {
        results.failed++
        const errorMsg = `Appointment ${appointment.id}: ${error instanceof Error ? error.message : "Unknown error"}`
        results.errors.push(errorMsg)
        console.error(`❌ Error syncing appointment ${appointment.id}:`, error)
      }
    }

    const mode = googleCalendar.getMode()
    const message =
      mode === "preview"
        ? `Sincronizzazione completata! ✅ (Modalità demo) - ${results.synced}/${results.total} sincronizzati`
        : `Sincronizzazione completata! ✅ - ${results.synced}/${results.total} sincronizzati`

    console.log("🎉 Calendar synchronization completed:", results)

    return NextResponse.json({
      success: true,
      message,
      results,
      mode,
    })
  } catch (error) {
    console.error("❌ Error in calendar synchronization:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Errore durante la sincronizzazione del calendario",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
