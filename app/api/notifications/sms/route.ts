import { NextResponse } from "next/server"
import twilio from "twilio"

// Inizializza Twilio con le tue credenziali
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export async function POST(request: Request) {
  try {
    const { to, content, variables } = await request.json()

    console.log("📱 REAL SMS API - Sending SMS via Twilio...")
    console.log("To:", to)

    // Validazione
    if (!to || !content) {
      return NextResponse.json({ success: false, error: "Parametri mancanti: to, content" }, { status: 400 })
    }

    // Sostituisci le variabili nel contenuto se fornite
    let finalContent = content
    if (variables && typeof variables === "object") {
      Object.entries(variables).forEach(([key, value]) => {
        finalContent = finalContent.replace(new RegExp(`{{${key}}}`, "g"), String(value))
      })
    }

    // Invia SMS tramite Twilio
    const message = await client.messages.create({
      body: finalContent,
      from: process.env.TWILIO_PHONE_NUMBER || "+1234567890",
      to: to,
    })

    console.log("✅ SMS sent successfully via Twilio:", message.sid)

    return NextResponse.json({
      success: true,
      message: "SMS inviato con successo",
      messageId: message.sid,
      provider: "Twilio",
    })
  } catch (error) {
    console.error("❌ SMS API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Errore nell'invio dell'SMS",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
