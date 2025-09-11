import { type NextRequest, NextResponse } from "next/server"
// import { Resend } from 'resend'

// Commented out for testing - uncomment when you have RESEND_API_KEY
// const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message, type = "general" } = await request.json()

    // Validation
    if (!to || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields: to, subject, message" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(to)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    console.log("📧 EMAIL SIMULATION MODE - Would send email:")
    console.log("To:", to)
    console.log("Subject:", subject)
    console.log("Message:", message)
    console.log("Type:", type)
    console.log("From:", process.env.RESEND_FROM_EMAIL || "noreply@digitalaura.com")

    // TESTING MODE - Simulate email sending without Resend
    // Uncomment the code below when you have RESEND_API_KEY set up

    /*
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Digital Aura <noreply@digitalaura.com>',
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Digital Aura</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #333;">${subject}</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <div style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">
              <p>Questo messaggio è stato inviato da Digital Aura</p>
              <p>Se non hai richiesto questo messaggio, puoi ignorarlo.</p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      id: data?.id
    })
    */

    // SIMULATION RESPONSE - Remove this when using real Resend
    return NextResponse.json({
      success: true,
      message: "Email simulated successfully (testing mode)",
      id: `sim_${Date.now()}`,
      simulation: true,
      details: {
        to,
        subject,
        type,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Email API is running",
    mode: "simulation",
    message: "Resend integration is commented out for testing",
  })
}
