import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters long" }, { status: 400 })
    }

    // Here you would typically save to database
    console.log("New contact form submission:", {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || "unknown",
    })

    // In a real application, you would:
    // 1. Save to database
    // 2. Send confirmation email to client
    // 3. Send notification email to admin
    // 4. Add to CRM system
    // 5. Create support ticket (if needed)

    // Simulate email sending
    await Promise.all([sendConfirmationEmail(email, name), sendNotificationEmail(name, email, message)])

    return NextResponse.json(
      {
        message: "Message sent successfully",
        messageId: `msg_${Date.now()}`,
        status: "received",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Mock email functions
async function sendConfirmationEmail(email: string, name: string) {
  console.log(`Sending confirmation email to ${email}`)
  console.log(`Dear ${name}, thank you for contacting Digital Aura. We'll get back to you within 24 hours.`)
  await new Promise((resolve) => setTimeout(resolve, 300))
}

async function sendNotificationEmail(name: string, email: string, message: string) {
  console.log("Sending notification to admin")
  console.log(`New contact form submission from ${name} (${email}): ${message}`)
  await new Promise((resolve) => setTimeout(resolve, 300))
}
