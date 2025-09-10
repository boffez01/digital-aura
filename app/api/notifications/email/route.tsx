import { NextResponse } from "next/server"
import { Resend } from "resend"

// Inizializza Resend con la tua API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { to, subject, content, template, variables } = await request.json()

    console.log("📧 REAL EMAIL API - Sending email via Resend...")
    console.log("To:", to)
    console.log("Subject:", subject)

    // Validazione
    if (!to || !subject || !content) {
      return NextResponse.json({ success: false, error: "Parametri mancanti: to, subject, content" }, { status: 400 })
    }

    // Sostituisci le variabili nel contenuto se fornite
    let finalContent = content
    if (variables && typeof variables === "object") {
      Object.entries(variables).forEach(([key, value]) => {
        finalContent = finalContent.replace(new RegExp(`{{${key}}}`, "g"), String(value))
      })
    }

    // Invia email tramite Resend
    const emailData = {
      from: process.env.RESEND_FROM_EMAIL || "noreply@digitalaura.com",
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Digital Aura</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              ${finalContent.replace(/\n/g, "<br>")}
            </div>
          </div>
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p>© 2024 Digital Aura. Tutti i diritti riservati.</p>
            <p>Questa email è stata inviata automaticamente dal nostro sistema.</p>
          </div>
        </div>
      `,
      text: finalContent,
    }

    const result = await resend.emails.send(emailData)

    if (result.error) {
      console.error("❌ Resend error:", result.error)
      return NextResponse.json({ success: false, error: result.error.message }, { status: 500 })
    }

    console.log("✅ Email sent successfully via Resend:", result.data?.id)

    return NextResponse.json({
      success: true,
      message: "Email inviata con successo",
      emailId: result.data?.id,
      provider: "Resend",
    })
  } catch (error) {
    console.error("❌ Email API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Errore nell'invio dell'email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
