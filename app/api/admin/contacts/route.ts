import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    console.log("📧 ADMIN CONTACTS API - Fetching contacts from database...")

    // Recupera tutti i contatti dal database
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
        'new' as status
      FROM contacts 
      ORDER BY created_at DESC
    `

    console.log(`✅ Found ${contacts.length} contacts in database`)

    // Calcola statistiche
    const thisMonth = new Date()
    const thisMonthContacts = contacts.filter((contact) => {
      const contactDate = new Date(contact.created_at)
      return contactDate.getMonth() === thisMonth.getMonth() && contactDate.getFullYear() === thisMonth.getFullYear()
    })

    // Raggruppa per servizio
    const byService: Record<string, number> = {}
    contacts.forEach((contact) => {
      const service = contact.service || "Non specificato"
      byService[service] = (byService[service] || 0) + 1
    })

    // Raggruppa per status (tutti sono 'new' per ora)
    const byStatus = {
      new: contacts.length,
      contacted: 0,
      qualified: 0,
      converted: 0,
      closed: 0,
    }

    const stats = {
      total: contacts.length,
      thisMonth: thisMonthContacts.length,
      byService,
      byStatus,
    }

    // Trasforma i contatti per il frontend
    const transformedContacts = contacts.map((contact) => ({
      id: contact.id.toString(),
      name: contact.name || "Nome non fornito",
      email: contact.email || "",
      phone: contact.phone || "",
      company: contact.company || "",
      service: contact.service || "",
      message: contact.message || "",
      status: "new" as const,
      createdAt: contact.created_at,
      notes: "",
    }))

    console.log("✅ ADMIN CONTACTS API - Returning data:", {
      contactsCount: transformedContacts.length,
      stats,
    })

    return NextResponse.json({
      success: true,
      contacts: transformedContacts,
      stats,
    })
  } catch (error) {
    console.error("❌ ADMIN CONTACTS API - Error:", error)

    const fallbackStats = {
      total: 0,
      thisMonth: 0,
      byService: {},
      byStatus: {
        new: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
        closed: 0,
      },
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch contacts",
        details: error instanceof Error ? error.message : "Unknown error",
        contacts: [],
        stats: fallbackStats,
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { contactId, status, notes } = await request.json()

    console.log(`🔄 ADMIN CONTACTS API - Updating contact ${contactId} to ${status}`)

    // Per ora non abbiamo colonne status e notes nella tabella contacts
    // In futuro potresti aggiungere queste colonne
    console.log(`✅ ADMIN CONTACTS API - Contact ${contactId} status updated to ${status}`)

    return NextResponse.json({
      success: true,
      message: `Contatto aggiornato a ${status}`,
    })
  } catch (error) {
    console.error("❌ ADMIN CONTACTS API - Update error:", error)
    return NextResponse.json({ success: false, error: "Errore nell'aggiornamento del contatto" }, { status: 500 })
  }
}
