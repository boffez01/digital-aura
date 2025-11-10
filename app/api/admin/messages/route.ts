import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    console.log("🔄 Fetching messages from database...")

    // Query per ottenere tutti i messaggi/contatti
    const messages = await sql`
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

    console.log(`📧 Found ${messages.length} messages`)

    // Calcola statistiche
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const stats = {
      total: messages.length,
      thisMonth: messages.filter((m) => new Date(m.created_at) >= thisMonth).length,
      byService: messages.reduce((acc: any, message) => {
        const service = message.service || "Generale"
        acc[service] = (acc[service] || 0) + 1
        return acc
      }, {}),
      byStatus: messages.reduce((acc: any, message) => {
        const status = message.status || "new"
        acc[status] = (acc[status] || 0) + 1
        return acc
      }, {}),
    }

    // Trasforma i dati per il frontend
    const transformedMessages = messages.map((message) => ({
      id: message.id.toString(),
      name: message.name || "Nome non disponibile",
      email: message.email || "Email non disponibile",
      phone: message.phone || "",
      company: message.company || "",
      service: message.service || "Generale",
      message: message.message || "Nessun messaggio",
      createdAt: message.created_at || new Date().toISOString(),
      status: message.status || "new",
      priority: message.priority || "medium",
      notes: message.notes || "",
    }))

    console.log("✅ Messages fetched successfully")

    return NextResponse.json({
      success: true,
      contacts: transformedMessages,
      stats,
    })
  } catch (error) {
    console.error("❌ Error fetching messages:", error)
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
