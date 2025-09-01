import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json()

    // Log della prenotazione
    const logPrefix = appointmentData.priority ? "🚨 PRIORITY APPOINTMENT" : "📅 APPOINTMENT"
    console.log(`${logPrefix} - New booking:`, {
      service: appointmentData.serviceName,
      date: appointmentData.date,
      time: appointmentData.time,
      name: appointmentData.name,
      email: appointmentData.email,
      phone: appointmentData.phone,
      priority: appointmentData.priority,
      language: appointmentData.language,
    })

    // Simula il salvataggio nel database
    const appointmentId = `${appointmentData.priority ? "PRIORITY" : "REGULAR"}-${Date.now()}`

    // Per assistenza prioritaria, invia notifiche immediate
    if (appointmentData.priority) {
      console.log("📱 Sending priority SMS notification to support team")
      console.log("📧 Sending priority email notification to support@digitalaura.it")
      console.log("🎫 Creating high-priority support ticket")

      // Simula creazione ticket prioritario
      const priorityTicket = {
        ticketId: `URGENT-${Date.now()}`,
        type: "priority_support",
        urgency: "high",
        customer: appointmentData.name,
        phone: appointmentData.phone,
        email: appointmentData.email,
        message: appointmentData.message,
        scheduledTime: `${appointmentData.date} ${appointmentData.time}`,
        createdAt: new Date().toISOString(),
      }

      console.log("🚨 Priority ticket created:", priorityTicket)
    }

    // Simula invio email di conferma
    console.log("📧 Sending confirmation email to:", appointmentData.email)

    // Risposta di successo
    return NextResponse.json({
      success: true,
      appointmentId,
      priority: appointmentData.priority,
      message: appointmentData.priority
        ? "Priority support request received. We will contact you within 1 hour."
        : "Appointment booked successfully. You will receive a confirmation email shortly.",
      estimatedResponse: appointmentData.priority ? "1 hour" : "24 hours",
    })
  } catch (error) {
    console.error("Appointment booking error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to book appointment. Please try again.",
      },
      { status: 500 },
    )
  }
}
