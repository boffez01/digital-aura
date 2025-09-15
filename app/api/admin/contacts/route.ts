import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    console.log("Fetching contacts from database...")

    // Query per ottenere tutti i contatti ordinati per data più recente
    const contacts = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        company,
        service,
        message,
        created_at,
        status,
        priority
      FROM contacts 
      ORDER BY created_at DESC
    `

    console.log(`Found ${contacts.length} contacts`)

    // Trasforma i dati per assicurarsi che siano nel formato corretto
    const formattedContacts = contacts.map((contact) => ({
      id: contact.id,
      name: contact.name || "Nome non disponibile",
      email: contact.email || "Email non disponibile",
      phone: contact.phone || "",
      company: contact.company || "",
      service: contact.service || "Generale",
      message: contact.message || "Nessun messaggio",
      created_at: contact.created_at || new Date().toISOString(),
      status: contact.status || "new",
      priority: contact.priority || "medium",
    }))

    return NextResponse.json({
      success: true,
      contacts: formattedContacts,
      total: formattedContacts.length,
    })
  } catch (error) {
    console.error("Error fetching contacts:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Errore nel caricamento dei contatti",
        contacts: [],
        total: 0,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    console.log("Creating new contact:", { name, email, service })

    const result = await sql`
      INSERT INTO contacts (name, email, phone, company, service, message, created_at, status, priority)
      VALUES (${name}, ${email}, ${phone || ""}, ${company || ""}, ${service}, ${message}, NOW(), 'new', 'medium')
      RETURNING id, created_at
    `

    console.log("Contact created successfully:", result[0])

    return NextResponse.json({
      success: true,
      message: "Contatto salvato con successo",
      contact: result[0],
    })
  } catch (error) {
    console.error("Error creating contact:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Errore nel salvataggio del contatto",
      },
      { status: 500 },
    )
  }
}
