import { type NextRequest, NextResponse } from "next/server"

// Simulazione database clienti
const customers = [
  {
    id: "1",
    name: "Marco Rossi",
    email: "marco.rossi@techcorp.it",
    phone: "+39 335 123 4567",
    company: "TechCorp Italia",
    position: "CTO",
    location: "Milano, Italia",
    status: "vip" as const,
    segment: "enterprise" as const,
    totalValue: 85000,
    lastContact: "2024-01-20",
    acquisitionDate: "2023-03-15",
    source: "Referral",
    tags: ["Enterprise", "Tech", "High-Value", "Decision Maker"],
    notes: "Cliente strategico con budget elevato. Interessato a soluzioni AI avanzate.",
    satisfaction: 5,
    appointments: 12,
    projects: 3,
    revenue: 85000,
    lastActivity: "2024-01-20",
    priority: "high" as const,
    lifecycle: "customer" as const,
    interactions: [
      {
        id: "1",
        type: "meeting" as const,
        title: "Presentazione AI Automation",
        description: "Presentato il nuovo sistema di automazione AI per il loro workflow",
        date: "2024-01-20",
        outcome: "positive" as const,
      },
      {
        id: "2",
        type: "email" as const,
        title: "Follow-up proposta",
        description: "Inviata proposta dettagliata per il progetto di automazione",
        date: "2024-01-18",
        outcome: "positive" as const,
      },
      {
        id: "3",
        type: "call" as const,
        title: "Chiamata di discovery",
        description: "Analisi dei requisiti e delle esigenze aziendali",
        date: "2024-01-15",
        outcome: "positive" as const,
      },
    ],
  },
  {
    id: "2",
    name: "Laura Bianchi",
    email: "laura.bianchi@startup.com",
    phone: "+39 347 987 6543",
    company: "InnovaStart",
    position: "Founder",
    location: "Roma, Italia",
    status: "active" as const,
    segment: "startup" as const,
    totalValue: 25000,
    lastContact: "2024-01-19",
    acquisitionDate: "2023-08-22",
    source: "Website",
    tags: ["Startup", "Innovation", "Growth", "Founder"],
    notes: "Startup promettente nel settore fintech. Molto interessata alle soluzioni chatbot.",
    satisfaction: 4,
    appointments: 8,
    projects: 2,
    revenue: 25000,
    lastActivity: "2024-01-19",
    priority: "medium" as const,
    lifecycle: "customer" as const,
    interactions: [
      {
        id: "4",
        type: "project" as const,
        title: "Implementazione Chatbot",
        description: "Completata implementazione chatbot per customer service",
        date: "2024-01-19",
        outcome: "positive" as const,
      },
      {
        id: "5",
        type: "support" as const,
        title: "Supporto tecnico",
        description: "Risolto problema di integrazione con il sistema esistente",
        date: "2024-01-17",
        outcome: "positive" as const,
      },
    ],
  },
  {
    id: "3",
    name: "Giuseppe Verdi",
    email: "giuseppe.verdi@consulting.it",
    phone: "+39 320 456 7890",
    company: "Verdi Consulting",
    position: "Managing Director",
    location: "Torino, Italia",
    status: "prospect" as const,
    segment: "business" as const,
    totalValue: 0,
    lastContact: "2024-01-18",
    acquisitionDate: "2024-01-10",
    source: "LinkedIn",
    tags: ["Consulting", "B2B", "Prospect", "Interested"],
    notes: "Interessato ai nostri servizi di web development. Richiesta preventivo in corso.",
    satisfaction: 0,
    appointments: 2,
    projects: 0,
    revenue: 0,
    lastActivity: "2024-01-18",
    priority: "medium" as const,
    lifecycle: "prospect" as const,
    interactions: [
      {
        id: "6",
        type: "call" as const,
        title: "Prima chiamata commerciale",
        description: "Discussione iniziale sui servizi e le esigenze",
        date: "2024-01-18",
        outcome: "positive" as const,
      },
      {
        id: "7",
        type: "email" as const,
        title: "Invio materiale informativo",
        description: "Inviato portfolio e case studies",
        date: "2024-01-15",
        outcome: "neutral" as const,
      },
    ],
  },
  {
    id: "4",
    name: "Anna Ferrari",
    email: "anna.ferrari@fashion.com",
    phone: "+39 338 234 5678",
    company: "Ferrari Fashion",
    position: "E-commerce Manager",
    location: "Firenze, Italia",
    status: "active" as const,
    segment: "business" as const,
    totalValue: 45000,
    lastContact: "2024-01-17",
    acquisitionDate: "2023-06-10",
    source: "Google Ads",
    tags: ["Fashion", "E-commerce", "Digital Marketing", "Loyal"],
    notes: "Cliente nel settore fashion con focus su e-commerce. Molto soddisfatta dei risultati.",
    satisfaction: 5,
    appointments: 15,
    projects: 4,
    revenue: 45000,
    lastActivity: "2024-01-17",
    priority: "high" as const,
    lifecycle: "advocate" as const,
    interactions: [
      {
        id: "8",
        type: "project" as const,
        title: "Lancio nuova campagna",
        description: "Lanciata campagna di marketing AI per la collezione primavera",
        date: "2024-01-17",
        outcome: "positive" as const,
      },
      {
        id: "9",
        type: "meeting" as const,
        title: "Review mensile",
        description: "Analisi performance e pianificazione prossimi step",
        date: "2024-01-10",
        outcome: "positive" as const,
      },
    ],
  },
  {
    id: "5",
    name: "Roberto Neri",
    email: "roberto.neri@individual.com",
    phone: "+39 349 876 5432",
    company: null,
    position: null,
    location: "Napoli, Italia",
    status: "inactive" as const,
    segment: "individual" as const,
    totalValue: 3500,
    lastContact: "2023-11-15",
    acquisitionDate: "2023-05-20",
    source: "Referral",
    tags: ["Individual", "Small Project", "Inactive"],
    notes: "Cliente individuale per progetto personale. Non attivo da alcuni mesi.",
    satisfaction: 3,
    appointments: 3,
    projects: 1,
    revenue: 3500,
    lastActivity: "2023-11-15",
    priority: "low" as const,
    lifecycle: "churned" as const,
    interactions: [
      {
        id: "10",
        type: "project" as const,
        title: "Completamento sito web",
        description: "Completato sito web personale con portfolio",
        date: "2023-11-15",
        outcome: "positive" as const,
      },
      {
        id: "11",
        type: "support" as const,
        title: "Supporto post-lancio",
        description: "Fornito supporto per piccole modifiche",
        date: "2023-10-20",
        outcome: "neutral" as const,
      },
    ],
  },
  {
    id: "6",
    name: "Francesca Blu",
    email: "francesca.blu@healthtech.it",
    phone: "+39 331 567 8901",
    company: "HealthTech Solutions",
    position: "Product Manager",
    location: "Bologna, Italia",
    status: "vip" as const,
    segment: "enterprise" as const,
    totalValue: 120000,
    lastContact: "2024-01-21",
    acquisitionDate: "2022-11-30",
    source: "Conference",
    tags: ["HealthTech", "Enterprise", "Innovation", "Long-term"],
    notes: "Cliente enterprise nel settore healthcare. Partnership strategica a lungo termine.",
    satisfaction: 5,
    appointments: 25,
    projects: 6,
    revenue: 120000,
    lastActivity: "2024-01-21",
    priority: "high" as const,
    lifecycle: "advocate" as const,
    interactions: [
      {
        id: "12",
        type: "meeting" as const,
        title: "Strategic Planning Q1",
        description: "Pianificazione strategica per il primo trimestre 2024",
        date: "2024-01-21",
        outcome: "positive" as const,
      },
      {
        id: "13",
        type: "project" as const,
        title: "AI Diagnostic Tool",
        description: "Sviluppo tool di diagnostica AI per pazienti",
        date: "2024-01-15",
        outcome: "positive" as const,
      },
    ],
  },
  {
    id: "7",
    name: "Matteo Verde",
    email: "matteo.verde@retail.com",
    phone: "+39 342 678 9012",
    company: "Verde Retail Chain",
    position: "Digital Director",
    location: "Venezia, Italia",
    status: "active" as const,
    segment: "business" as const,
    totalValue: 35000,
    lastContact: "2024-01-16",
    acquisitionDate: "2023-09-05",
    source: "Partner",
    tags: ["Retail", "Digital Transformation", "Multi-location"],
    notes: "Catena retail con 15 punti vendita. Focus su digitalizzazione e automazione.",
    satisfaction: 4,
    appointments: 10,
    projects: 3,
    revenue: 35000,
    lastActivity: "2024-01-16",
    priority: "medium" as const,
    lifecycle: "customer" as const,
    interactions: [
      {
        id: "14",
        type: "call" as const,
        title: "Check-in mensile",
        description: "Aggiornamento sui progetti in corso e prossimi step",
        date: "2024-01-16",
        outcome: "positive" as const,
      },
    ],
  },
  {
    id: "8",
    name: "Silvia Rosa",
    email: "silvia.rosa@nonprofit.org",
    phone: "+39 355 789 0123",
    company: "Rosa Foundation",
    position: "Communications Director",
    location: "Palermo, Italia",
    status: "prospect" as const,
    segment: "individual" as const,
    totalValue: 0,
    lastContact: "2024-01-14",
    acquisitionDate: "2024-01-05",
    source: "Social Media",
    tags: ["Non-profit", "Social Impact", "Budget Limited"],
    notes: "Organizzazione non-profit interessata a soluzioni a costo ridotto per la comunicazione.",
    satisfaction: 0,
    appointments: 1,
    projects: 0,
    revenue: 0,
    lastActivity: "2024-01-14",
    priority: "low" as const,
    lifecycle: "lead" as const,
    interactions: [
      {
        id: "15",
        type: "email" as const,
        title: "Prima interazione",
        description: "Richiesta informazioni sui servizi per non-profit",
        date: "2024-01-14",
        outcome: "neutral" as const,
      },
    ],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const segment = searchParams.get("segment")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "lastContact"

    let filteredCustomers = [...customers]

    // Filtri
    if (status && status !== "all") {
      filteredCustomers = filteredCustomers.filter((c) => c.status === status)
    }

    if (segment && segment !== "all") {
      filteredCustomers = filteredCustomers.filter((c) => c.segment === segment)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredCustomers = filteredCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower) ||
          c.company?.toLowerCase().includes(searchLower) ||
          c.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Ordinamento
    filteredCustomers.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "revenue":
          return b.revenue - a.revenue
        case "satisfaction":
          return b.satisfaction - a.satisfaction
        case "lastContact":
        default:
          return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime()
      }
    })

    // Calcolo statistiche
    const stats = {
      total: customers.length,
      active: customers.filter((c) => c.status === "active").length,
      vip: customers.filter((c) => c.status === "vip").length,
      prospects: customers.filter((c) => c.status === "prospect").length,
      totalRevenue: customers.reduce((sum, c) => sum + c.revenue, 0),
      avgSatisfaction:
        customers.reduce((sum, c) => sum + c.satisfaction, 0) / customers.filter((c) => c.satisfaction > 0).length,
      newThisMonth: customers.filter((c) => {
        const acquisitionDate = new Date(c.acquisitionDate)
        const now = new Date()
        return acquisitionDate.getMonth() === now.getMonth() && acquisitionDate.getFullYear() === now.getFullYear()
      }).length,
      churnRate: (customers.filter((c) => c.lifecycle === "churned").length / customers.length) * 100,
    }

    return NextResponse.json({
      customers: filteredCustomers,
      stats: {
        ...stats,
        avgSatisfaction: Math.round(stats.avgSatisfaction * 10) / 10,
      },
    })
  } catch (error) {
    console.error("Errore API clienti:", error)
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newCustomer = {
      id: (customers.length + 1).toString(),
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      company: body.company || null,
      position: body.position || null,
      location: body.location || "",
      status: "prospect" as const,
      segment: body.segment || ("individual" as const),
      totalValue: 0,
      lastContact: new Date().toISOString().split("T")[0],
      acquisitionDate: new Date().toISOString().split("T")[0],
      source: "Manual",
      tags: body.tags || [],
      notes: body.notes || "",
      satisfaction: 0,
      appointments: 0,
      projects: 0,
      revenue: 0,
      lastActivity: new Date().toISOString().split("T")[0],
      priority: body.priority || ("medium" as const),
      lifecycle: "lead" as const,
      interactions: [],
    }

    customers.push(newCustomer)

    return NextResponse.json({
      success: true,
      customer: newCustomer,
    })
  } catch (error) {
    console.error("Errore creazione cliente:", error)
    return NextResponse.json({ error: "Errore nella creazione del cliente" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const customerIndex = customers.findIndex((c) => c.id === id)
    if (customerIndex === -1) {
      return NextResponse.json({ error: "Cliente non trovato" }, { status: 404 })
    }

    customers[customerIndex] = {
      ...customers[customerIndex],
      ...updates,
      lastActivity: new Date().toISOString().split("T")[0],
    }

    return NextResponse.json({
      success: true,
      customer: customers[customerIndex],
    })
  } catch (error) {
    console.error("Errore aggiornamento cliente:", error)
    return NextResponse.json({ error: "Errore nell'aggiornamento del cliente" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID cliente richiesto" }, { status: 400 })
    }

    const customerIndex = customers.findIndex((c) => c.id === id)
    if (customerIndex === -1) {
      return NextResponse.json({ error: "Cliente non trovato" }, { status: 404 })
    }

    customers.splice(customerIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Cliente eliminato con successo",
    })
  } catch (error) {
    console.error("Errore eliminazione cliente:", error)
    return NextResponse.json({ error: "Errore nell'eliminazione del cliente" }, { status: 500 })
  }
}
