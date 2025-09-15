import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    console.log("🔄 Fetching contacts from database...")

    // Query per ottenere tutti i contatti
    const contacts = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        company,
        service_type as service,
        message,
        created_at,
        status,
        priority,
        notes
      FROM contacts 
      ORDER BY created_at DESC
    `

    console.log(`📧 Found ${contacts.length} contacts`)

    // Calcola statistiche
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const stats = {
      total: contacts.length,
      thisMonth: contacts.filter((c) => new Date(c.created_at) >= thisMonth).length,
      byService: contacts.reduce((acc: any, contact) => {
        const service = contact.service || "Generale"
        acc[service] = (acc[service] || 0) + 1
        return acc
      }, {}),
      byStatus: contacts.reduce((acc: any, contact) => {
        const status = contact.status || "new"
        acc[status] = (acc[status] || 0) + 1
        return acc
      }, {}),
    }

    // Trasforma i dati per il frontend
    const transformedContacts = contacts.map((contact) => ({
      id: contact.id.toString(),
      name: contact.name || "Nome non disponibile",
      email: contact.email || "Email non disponibile",
      phone: contact.phone || "",
      company: contact.company || "",
      service: contact.service || "Generale",
      message: contact.message || "Nessun messaggio",
      createdAt: contact.created_at || new Date().toISOString(),
      status: contact.status || "new",
      priority: contact.priority || "medium",
      notes: contact.notes || "",
    }))

    console.log("✅ Contacts fetched successfully")

    return NextResponse.json({
      success: true,
      contacts: transformedContacts,
      stats,
    })
  } catch (error) {
    console.error("❌ Error fetching contacts:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Errore sconosciuto",
        contacts: [],
        stats: {
          total: 0,
          thisMonth: 0,
          byService: {},
          byStatus: {},
        },
      },
      { status: 500 },
    )
  }
}
