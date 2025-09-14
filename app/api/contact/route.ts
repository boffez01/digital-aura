import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    console.log("📧 CONTACT API - Ricevuta richiesta POST")

    const body = await request.json()
    console.log("📧 CONTACT API - Dati ricevuti:", body)

    const { name, email, phone, company, service, message } = body

    // Validazione campi obbligatori
    if (!name || !email || !message) {
      console.log("❌ CONTACT API - Campi obbligatori mancanti")
      return NextResponse.json(
        {
          success: false,
          error: "Nome, email e messaggio sono obbligatori",
        },
        { status: 400 },
      )
    }

    // Validazione formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("❌ CONTACT API - Formato email non valido")
      return NextResponse.json(
        {
          success: false,
          error: "Formato email non valido",
        },
        { status: 400 },
      )
    }

    console.log("✅ CONTACT API - Validazione completata, salvataggio nel database...")

    // Salva nel database
    const result = await sql`
      INSERT INTO contacts (
        name, 
        email, 
        phone, 
        company, 
        service_type, 
        message, 
        created_at
      ) VALUES (
        ${name}, 
        ${email}, 
        ${phone || null}, 
        ${company || null}, 
        ${service || null}, 
        ${message}, 
        NOW()
      ) RETURNING id, created_at
    `

    console.log("✅ CONTACT API - Contatto salvato con successo:", result[0])

    return NextResponse.json({
      success: true,
      message: "Messaggio inviato con successo! Ti contatteremo presto.",
      data: {
        id: result[0].id,
        created_at: result[0].created_at,
      },
    })
  } catch (error) {
    console.error("❌ CONTACT API - Errore:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Errore interno del server. Riprova più tardi.",
        details: error instanceof Error ? error.message : "Errore sconosciuto",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    console.log("📧 CONTACT API - Ricevuta richiesta GET")

    // Recupera tutti i contatti dal database
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

    console.log(`✅ CONTACT API - Trovati ${contacts.length} contatti`)

    return NextResponse.json({
      success: true,
      contacts: contacts,
      count: contacts.length,
    })
  } catch (error) {
    console.error("❌ CONTACT API - Errore GET:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Errore nel recupero dei contatti",
        details: error instanceof Error ? error.message : "Errore sconosciuto",
      },
      { status: 500 },
    )
  }
}
