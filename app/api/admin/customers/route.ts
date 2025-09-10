import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    console.log("👥 ADMIN CUSTOMERS API - Generating customer data from real appointments...")

    // Recupera tutti i clienti unici dagli appuntamenti - USA 'date' NON 'appointment_date'
    const customersResult = await sql`
      SELECT DISTINCT
        email,
        name,
        phone,
        MIN(date) as first_appointment,
        MAX(date) as last_appointment,
        COUNT(*) as total_appointments,
        STRING_AGG(DISTINCT service, ', ') as services,
        MAX(created_at) as latest_created
      FROM appointments 
      WHERE email IS NOT NULL AND name IS NOT NULL
      GROUP BY email, name, phone
      ORDER BY MAX(date) DESC
    `

    console.log(`📊 Found ${customersResult.length} unique customers from appointments`)

    // Trasforma i dati nel formato richiesto dal frontend
    const customers = customersResult.map((row, index) => {
      const daysSinceFirst = Math.floor(
        (new Date().getTime() - new Date(row.first_appointment).getTime()) / (1000 * 60 * 60 * 24),
      )
      const daysSinceLast = Math.floor(
        (new Date().getTime() - new Date(row.last_appointment).getTime()) / (1000 * 60 * 60 * 24),
      )

      // Determina lo stato basato sull'ultima attività
      let status = "inactive"
      if (daysSinceLast <= 7) status = "active"
      else if (daysSinceLast <= 30) status = "prospect"
      else if (row.total_appointments >= 3) status = "vip"

      // Determina il segmento basato sui servizi
      let segment = "individual"
      const servicesLower = (row.services || "").toLowerCase()
      if (servicesLower.includes("enterprise") || servicesLower.includes("business")) segment = "business"
      if (servicesLower.includes("startup")) segment = "startup"
      if (row.total_appointments >= 5) segment = "enterprise"

      // Calcola soddisfazione basata su appointments e tempo
      const satisfactionScore = Math.min(
        5,
        Math.max(3, 3 + row.total_appointments * 0.3 + (daysSinceLast <= 7 ? 0.5 : 0)),
      )

      return {
        id: `customer_${index + 1}`,
        name: row.name || "Nome non disponibile",
        email: row.email || "",
        phone: row.phone || "Non fornito",
        company: "", // Non disponibile negli appuntamenti
        position: "", // Non disponibile negli appuntamenti
        location: "Italia", // Default
        avatar: "",
        status,
        segment,
        totalValue: row.total_appointments * 500, // Stima valore basata su appuntamenti
        lastContact: row.last_appointment,
        acquisitionDate: row.first_appointment,
        source: "Website",
        tags: row.services ? row.services.split(", ").slice(0, 3) : ["Cliente"],
        notes: `Cliente con ${row.total_appointments} appuntamenti. Primo contatto: ${new Date(row.first_appointment).toLocaleDateString("it-IT")}`,
        satisfaction: Math.round(satisfactionScore * 10) / 10,
        appointments: Number.parseInt(row.total_appointments),
        projects: Math.floor(row.total_appointments / 2), // Stima progetti
        revenue: row.total_appointments * 500, // Stima revenue
        lastActivity: row.last_appointment,
        priority: daysSinceLast <= 7 ? "high" : daysSinceLast <= 30 ? "medium" : "low",
        lifecycle: status === "active" ? "customer" : status === "vip" ? "advocate" : "prospect",
        interactions: [
          {
            id: `interaction_${index}_1`,
            type: "appointment" as const,
            title: "Appuntamento prenotato",
            description: `Appuntamento per ${row.services || "consulenza"}`,
            date: row.last_appointment,
            outcome: "positive" as const,
          },
        ],
      }
    })

    // Calcola statistiche
    const stats = {
      total: customers.length,
      active: customers.filter((c) => c.status === "active").length,
      vip: customers.filter((c) => c.status === "vip").length,
      prospects: customers.filter((c) => c.status === "prospect").length,
      totalRevenue: customers.reduce((sum, c) => sum + c.revenue, 0),
      avgSatisfaction:
        customers.length > 0 ? customers.reduce((sum, c) => sum + c.satisfaction, 0) / customers.length : 0,
      newThisMonth: customers.filter((c) => {
        const acquisitionDate = new Date(c.acquisitionDate)
        const thisMonth = new Date()
        return (
          acquisitionDate.getMonth() === thisMonth.getMonth() &&
          acquisitionDate.getFullYear() === thisMonth.getFullYear()
        )
      }).length,
      churnRate: 0, // Calcolo complesso, per ora 0
    }

    console.log("✅ ADMIN CUSTOMERS API - Generated customer data:", {
      customersCount: customers.length,
      stats,
    })

    return NextResponse.json({
      success: true,
      customers,
      stats,
      message: "Customers loaded successfully",
    })
  } catch (error) {
    console.error("❌ ADMIN CUSTOMERS API - Error:", error)

    const fallbackStats = {
      total: 0,
      active: 0,
      vip: 0,
      prospects: 0,
      totalRevenue: 0,
      avgSatisfaction: 0,
      newThisMonth: 0,
      churnRate: 0,
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch customers",
        details: error instanceof Error ? error.message : "Unknown error",
        customers: [],
        stats: fallbackStats,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, segment, priority, notes } = body

    // Validation
    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Nome e email sono obbligatori" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Formato email non valido" }, { status: 400 })
    }

    // Per ora salva come contatto, in futuro potresti avere una tabella customers separata
    const result = await sql`
      INSERT INTO contacts (name, email, phone, company, service_type, message)
      VALUES (${name}, ${email}, ${phone || null}, ${company || null}, 'Manual Customer', ${notes || "Cliente aggiunto manualmente"})
      RETURNING *
    `

    console.log("✅ New customer added:", result[0].id)

    return NextResponse.json({
      success: true,
      message: "Cliente aggiunto con successo",
      customer: result[0],
    })
  } catch (error) {
    console.error("❌ Error adding customer:", error)
    return NextResponse.json({ success: false, error: "Errore nell'aggiunta del cliente" }, { status: 500 })
  }
}
