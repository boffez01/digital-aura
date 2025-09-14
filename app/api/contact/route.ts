import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Contact API called")

    const body = await request.json()
    console.log("📝 Request body:", body)

    const { name, email, phone, company, service_type, message } = body

    // Validation
    if (!name || !email || !message) {
      console.log("❌ Missing required fields")
      return NextResponse.json({ error: "Nome, email e messaggio sono obbligatori" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format")
      return NextResponse.json({ error: "Formato email non valido" }, { status: 400 })
    }

    console.log("💾 Saving to database...")

    // Insert into database
    const result = await sql`
      INSERT INTO contacts (
        name, 
        email, 
        phone, 
        company, 
        service_type, 
        message, 
        status,
        created_at
      )
      VALUES (
        ${name.trim()},
        ${email.trim()},
        ${phone?.trim() || null},
        ${company?.trim() || null},
        ${service_type || null},
        ${message.trim()},
        'pending',
        NOW()
      )
      RETURNING *
    `

    console.log("✅ Contact saved successfully:", result[0])

    return NextResponse.json({
      success: true,
      message: "Messaggio inviato con successo!",
      data: result[0],
    })
  } catch (error) {
    console.error("❌ Contact API Error:", error)
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 })
  }
}

export async function GET() {
  try {
    console.log("📋 Fetching contacts...")

    const result = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        company,
        service_type,
        message,
        status,
        created_at
      FROM contacts 
      ORDER BY created_at DESC
      LIMIT 50
    `

    console.log(`✅ Found ${result.length} contacts`)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("❌ Error fetching contacts:", error)
    return NextResponse.json({ error: "Errore nel recupero dei contatti" }, { status: 500 })
  }
}
