import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { provider, recipient, template, variables } = await request.json()

    console.log("🧪 NOTIFICATION TEST API - Testing notification...")
    console.log("Provider:", provider)
    console.log("Recipient:", recipient)
    console.log("Template:", template)

    // Validazione
    if (!provider || !recipient) {
      return NextResponse.json({ success: false, error: "Provider e recipient sono obbligatori" }, { status: 400 })
    }

    // Dati di test
    const testVariables = {
      name: "Mario Rossi",
      service: "Web Development",
      date: "15/01/2024",
      time: "14:30",
      duration: "60 minuti",
      ...variables,
    }

    let result

    if (provider.includes("email") || provider === "resend" || provider === "gmail") {
      // Test Email
      const emailResponse = await fetch(
        `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/notifications/email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: recipient,
            subject: "Test Email - Digital Aura",
            content: `Ciao {{name}},\n\nQuesto è un messaggio di test per il servizio {{service}}.\n\nData: {{date}}\nOra: {{time}}\n\nGrazie!`,
            variables: testVariables,
          }),
        },
      )

      result = await emailResponse.json()
    } else if (provider.includes("sms") || provider === "twilio-sms") {
      // Test SMS
      const smsResponse = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/notifications/sms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipient,
          content: "Test SMS Digital Aura: Appuntamento {{service}} il {{date}} alle {{time}}",
          variables: testVariables,
        }),
      })

      result = await smsResponse.json()
    } else {
      return NextResponse.json({ success: false, error: "Provider non supportato per il test" }, { status: 400 })
    }

    console.log("✅ Test notification result:", result)

    return NextResponse.json({
      success: result.success,
      message: result.success ? "Test completato con successo!" : `Errore nel test: ${result.error}`,
      details: result,
    })
  } catch (error) {
    console.error("❌ Test notification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Errore durante il test",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
