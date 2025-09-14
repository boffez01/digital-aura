import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    console.log("📧 Contact form submission received")

    const body = await request.json()
    console.log("📋 Form data:", body)

    const { name, email, phone, company, service, message } = body

    // Validation
    if (!name || !email || !message) {
      console.log("❌ Validation failed: missing required fields")
      return NextResponse.json(
        {
          success: false,
          error: "Nome, email e messaggio sono obbligatori",
        },
        { status: 400 },
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("❌ Validation failed: invalid email format")
      return NextResponse.json(
        {
          success: false,
          error: "Formato email non valido",
        },
        { status: 400 },
      )
    }

    console.log("✅ Validation passed, saving to database...")

    // Save to database
    const result = await sql`
      INSERT INTO contacts (
        name, 
        email, 
        phone, 
        company, 
        service_type, 
        message, 
        created_at
      )
      VALUES (
        ${name},
        ${email},
        ${phone || null},
        ${company || null},
        ${service || null},
        ${message},
        NOW()
      )
      RETURNING id, created_at
    `

    console.log("✅ Contact saved successfully:", result[0])

    return NextResponse.json({
      success: true,
      message: "Messaggio inviato con successo! Ti contatteremo presto.",
      data: {
        id: result[0].id,
        timestamp: result[0].created_at,
      },
    })
  } catch (error) {
    console.error("❌ Error saving contact:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Errore interno del server. Riprova più tardi.",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    console.log("📋 Fetching all contacts...")

    const contacts = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        company,
        service_type,
        message,
        created_at
      FROM contacts 
      ORDER BY created_at DESC
      LIMIT 50
    `

    console.log(`✅ Found ${contacts.length} contacts`)

    return NextResponse.json({
      success: true,
      data: contacts,
    })
  } catch (error) {
    console.error("❌ Error fetching contacts:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Errore nel recupero dei contatti",
      },
      { status: 500 },
    )
  }
}
