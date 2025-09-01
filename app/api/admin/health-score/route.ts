import { type NextRequest, NextResponse } from "next/server"

// Simulazione dati health score
const healthScores = [
  {
    id: "1",
    customerId: "1",
    customerName: "Marco Rossi",
    customerEmail: "marco.rossi@techcorp.it",
    company: "TechCorp Italia",
    segment: "enterprise" as const,
    overallScore: 92,
    previousScore: 88,
    trend: "up" as const,
    riskLevel: "low" as const,
    lastUpdated: "2024-01-21T10:30:00Z",

    // Score Components
    journeyScore: 95,
    engagementScore: 88,
    satisfactionScore: 94,
    valueScore: 90,
    loyaltyScore: 93,

    // Journey Metrics
    currentStage: "Advocacy",
    stageProgress: 85,
    timeInStage: 45,
    stageVelocity: 1.2,
    conversionProbability: 95,

    // Engagement Metrics
    emailOpenRate: 85,
    emailClickRate: 45,
    websiteVisits: 28,
    contentEngagement: 78,
    responseRate: 92,
    meetingAttendance: 95,

    // Satisfaction Metrics
    npsScore: 9,
    supportTickets: 1,
    complaintResolution: 100,
    feedbackSentiment: 95,

    // Value Metrics
    totalRevenue: 85000,
    avgOrderValue: 28333,
    purchaseFrequency: 3,
    lifetimeValue: 120000,
    paymentHistory: 100,

    // Loyalty Metrics
    referrals: 5,
    testimonials: 2,
    renewalProbability: 95,
    upsellPotential: 80,
    churnRisk: 5,

    // Risk Factors
    riskFactors: [],

    // Opportunities
    opportunities: [
      {
        opportunity: "Upsell Premium Package",
        potential: 35,
        effort: "medium" as const,
        description: "Cliente ideale per upgrade a pacchetto premium",
        action: "Presentare demo delle funzionalità avanzate",
      },
      {
        opportunity: "Referral Program",
        potential: 25,
        effort: "low" as const,
        description: "Alto potenziale per generare referral",
        action: "Attivare programma referral personalizzato",
      },
    ],

    // Recent Activities
    recentActivities: [
      {
        id: "1",
        type: "meeting" as const,
        description: "Quarterly Business Review completato",
        date: "2024-01-20T14:00:00Z",
        impact: "positive" as const,
        scoreChange: 4,
      },
      {
        id: "2",
        type: "email" as const,
        description: "Risposta positiva a survey di soddisfazione",
        date: "2024-01-18T09:15:00Z",
        impact: "positive" as const,
        scoreChange: 2,
      },
    ],
  },
  {
    id: "2",
    customerId: "2",
    customerName: "Laura Bianchi",
    customerEmail: "laura.bianchi@startup.com",
    company: "InnovaStart",
    segment: "startup" as const,
    overallScore: 76,
    previousScore: 82,
    trend: "down" as const,
    riskLevel: "medium" as const,
    lastUpdated: "2024-01-21T09:45:00Z",

    journeyScore: 78,
    engagementScore: 65,
    satisfactionScore: 80,
    valueScore: 75,
    loyaltyScore: 82,

    currentStage: "Retention",
    stageProgress: 60,
    timeInStage: 120,
    stageVelocity: 0.8,
    conversionProbability: 75,

    emailOpenRate: 65,
    emailClickRate: 25,
    websiteVisits: 12,
    contentEngagement: 55,
    responseRate: 70,
    meetingAttendance: 80,

    npsScore: 7,
    supportTickets: 3,
    complaintResolution: 85,
    feedbackSentiment: 75,

    totalRevenue: 25000,
    avgOrderValue: 12500,
    purchaseFrequency: 2,
    lifetimeValue: 45000,
    paymentHistory: 95,

    referrals: 1,
    testimonials: 1,
    renewalProbability: 70,
    upsellPotential: 60,
    churnRisk: 30,

    riskFactors: [
      {
        factor: "Diminuzione engagement",
        impact: "medium" as const,
        description: "Calo significativo nell'apertura email e visite al sito",
        recommendation: "Implementare campagna di re-engagement personalizzata",
      },
      {
        factor: "Aumento support tickets",
        impact: "medium" as const,
        description: "Incremento del 50% nei ticket di supporto negli ultimi 30 giorni",
        recommendation: "Analizzare cause ricorrenti e migliorare documentazione",
      },
    ],

    opportunities: [
      {
        opportunity: "Training Program",
        potential: 20,
        effort: "low" as const,
        description: "Formazione per massimizzare utilizzo prodotto",
        action: "Organizzare sessioni di training personalizzate",
      },
    ],

    recentActivities: [
      {
        id: "3",
        type: "support" as const,
        description: "Ticket di supporto risolto",
        date: "2024-01-19T16:30:00Z",
        impact: "neutral" as const,
        scoreChange: 0,
      },
      {
        id: "4",
        type: "email" as const,
        description: "Mancata risposta a email di follow-up",
        date: "2024-01-17T11:00:00Z",
        impact: "negative" as const,
        scoreChange: -3,
      },
    ],
  },
  {
    id: "3",
    customerId: "3",
    customerName: "Giuseppe Verdi",
    customerEmail: "giuseppe.verdi@consulting.it",
    company: "Verdi Consulting",
    segment: "business" as const,
    overallScore: 45,
    previousScore: 48,
    trend: "down" as const,
    riskLevel: "high" as const,
    lastUpdated: "2024-01-21T08:20:00Z",

    journeyScore: 40,
    engagementScore: 35,
    satisfactionScore: 50,
    valueScore: 60,
    loyaltyScore: 40,

    currentStage: "Consideration",
    stageProgress: 30,
    timeInStage: 45,
    stageVelocity: 0.3,
    conversionProbability: 35,

    emailOpenRate: 25,
    emailClickRate: 8,
    websiteVisits: 3,
    contentEngagement: 20,
    responseRate: 40,
    meetingAttendance: 60,

    npsScore: 5,
    supportTickets: 0,
    complaintResolution: 0,
    feedbackSentiment: 45,

    totalRevenue: 0,
    avgOrderValue: 0,
    purchaseFrequency: 0,
    lifetimeValue: 15000,
    paymentHistory: 0,

    referrals: 0,
    testimonials: 0,
    renewalProbability: 30,
    upsellPotential: 20,
    churnRisk: 70,

    riskFactors: [
      {
        factor: "Basso engagement",
        impact: "high" as const,
        description: "Engagement molto basso su tutti i canali di comunicazione",
        recommendation: "Contatto diretto per comprendere esigenze specifiche",
      },
      {
        factor: "Stagnazione nel journey",
        impact: "high" as const,
        description: "Fermo nella fase Consideration da oltre 45 giorni",
        recommendation: "Proporre demo personalizzata e case study specifici",
      },
      {
        factor: "Mancanza di decisore",
        impact: "medium" as const,
        description: "Possibile mancanza di authority nel processo decisionale",
        recommendation: "Identificare e coinvolgere i decision maker chiave",
      },
    ],

    opportunities: [
      {
        opportunity: "Personalized Demo",
        potential: 40,
        effort: "medium" as const,
        description: "Demo personalizzata per riattivare interesse",
        action: "Organizzare demo focalizzata sui pain points specifici",
      },
    ],

    recentActivities: [
      {
        id: "5",
        type: "email" as const,
        description: "Email di follow-up non aperta",
        date: "2024-01-18T10:00:00Z",
        impact: "negative" as const,
        scoreChange: -2,
      },
    ],
  },
  {
    id: "4",
    customerId: "4",
    customerName: "Anna Ferrari",
    customerEmail: "anna.ferrari@fashion.com",
    company: "Ferrari Fashion",
    segment: "business" as const,
    overallScore: 88,
    previousScore: 85,
    trend: "up" as const,
    riskLevel: "low" as const,
    lastUpdated: "2024-01-21T11:15:00Z",

    journeyScore: 90,
    engagementScore: 85,
    satisfactionScore: 92,
    valueScore: 86,
    loyaltyScore: 87,

    currentStage: "Advocacy",
    stageProgress: 75,
    timeInStage: 180,
    stageVelocity: 1.1,
    conversionProbability: 90,

    emailOpenRate: 78,
    emailClickRate: 42,
    websiteVisits: 22,
    contentEngagement: 82,
    responseRate: 88,
    meetingAttendance: 92,

    npsScore: 9,
    supportTickets: 2,
    complaintResolution: 100,
    feedbackSentiment: 90,

    totalRevenue: 45000,
    avgOrderValue: 11250,
    purchaseFrequency: 4,
    lifetimeValue: 75000,
    paymentHistory: 100,

    referrals: 3,
    testimonials: 2,
    renewalProbability: 92,
    upsellPotential: 75,
    churnRisk: 8,

    riskFactors: [],

    opportunities: [
      {
        opportunity: "Premium Service Upgrade",
        potential: 30,
        effort: "low" as const,
        description: "Candidata ideale per servizi premium",
        action: "Presentare pacchetto servizi avanzati",
      },
      {
        opportunity: "Case Study Creation",
        potential: 15,
        effort: "low" as const,
        description: "Ottima candidata per case study di successo",
        action: "Proporre collaborazione per case study",
      },
    ],

    recentActivities: [
      {
        id: "6",
        type: "purchase" as const,
        description: "Rinnovo contratto annuale",
        date: "2024-01-17T15:30:00Z",
        impact: "positive" as const,
        scoreChange: 5,
      },
      {
        id: "7",
        type: "content" as const,
        description: "Condivisione case study sui social",
        date: "2024-01-15T12:00:00Z",
        impact: "positive" as const,
        scoreChange: 3,
      },
    ],
  },
  {
    id: "5",
    customerId: "5",
    customerName: "Roberto Neri",
    customerEmail: "roberto.neri@individual.com",
    company: null,
    segment: "individual" as const,
    overallScore: 32,
    previousScore: 38,
    trend: "down" as const,
    riskLevel: "critical" as const,
    lastUpdated: "2024-01-21T07:45:00Z",

    journeyScore: 25,
    engagementScore: 20,
    satisfactionScore: 40,
    valueScore: 45,
    loyaltyScore: 30,

    currentStage: "Retention",
    stageProgress: 15,
    timeInStage: 90,
    stageVelocity: 0.1,
    conversionProbability: 15,

    emailOpenRate: 15,
    emailClickRate: 3,
    websiteVisits: 1,
    contentEngagement: 10,
    responseRate: 20,
    meetingAttendance: 30,

    npsScore: 3,
    supportTickets: 5,
    complaintResolution: 60,
    feedbackSentiment: 25,

    totalRevenue: 3500,
    avgOrderValue: 3500,
    purchaseFrequency: 1,
    lifetimeValue: 5000,
    paymentHistory: 80,

    referrals: 0,
    testimonials: 0,
    renewalProbability: 15,
    upsellPotential: 10,
    churnRisk: 85,

    riskFactors: [
      {
        factor: "Inattività prolungata",
        impact: "high" as const,
        description: "Nessuna interazione significativa negli ultimi 60 giorni",
        recommendation: "Contatto immediato per valutare soddisfazione e bisogni",
      },
      {
        factor: "Problemi di supporto irrisolti",
        impact: "high" as const,
        description: "Multipli ticket di supporto con risoluzione parziale",
        recommendation: "Escalation a senior support per risoluzione completa",
      },
      {
        factor: "Basso NPS score",
        impact: "critical" as const,
        description: "Score NPS critico indica alta probabilità di churn",
        recommendation: "Intervento immediato del customer success manager",
      },
    ],

    opportunities: [
      {
        opportunity: "Win-back Campaign",
        potential: 50,
        effort: "high" as const,
        description: "Campagna di recupero cliente a rischio",
        action: "Contatto diretto per comprendere problematiche e offrire soluzioni",
      },
    ],

    recentActivities: [
      {
        id: "8",
        type: "support" as const,
        description: "Ticket di supporto aperto senza risoluzione",
        date: "2024-01-16T14:20:00Z",
        impact: "negative" as const,
        scoreChange: -4,
      },
      {
        id: "9",
        type: "email" as const,
        description: "Email di re-engagement non aperta",
        date: "2024-01-14T09:00:00Z",
        impact: "negative" as const,
        scoreChange: -2,
      },
    ],
  },
  {
    id: "6",
    customerId: "6",
    customerName: "Francesca Blu",
    customerEmail: "francesca.blu@healthtech.it",
    company: "HealthTech Solutions",
    segment: "enterprise" as const,
    overallScore: 95,
    previousScore: 93,
    trend: "up" as const,
    riskLevel: "low" as const,
    lastUpdated: "2024-01-21T12:00:00Z",

    journeyScore: 98,
    engagementScore: 92,
    satisfactionScore: 96,
    valueScore: 94,
    loyaltyScore: 95,

    currentStage: "Advocacy",
    stageProgress: 95,
    timeInStage: 365,
    stageVelocity: 1.5,
    conversionProbability: 98,

    emailOpenRate: 92,
    emailClickRate: 58,
    websiteVisits: 35,
    contentEngagement: 88,
    responseRate: 95,
    meetingAttendance: 98,

    npsScore: 10,
    supportTickets: 0,
    complaintResolution: 100,
    feedbackSentiment: 98,

    totalRevenue: 120000,
    avgOrderValue: 20000,
    purchaseFrequency: 6,
    lifetimeValue: 200000,
    paymentHistory: 100,

    referrals: 8,
    testimonials: 4,
    renewalProbability: 98,
    upsellPotential: 85,
    churnRisk: 2,

    riskFactors: [],

    opportunities: [
      {
        opportunity: "Strategic Partnership",
        potential: 50,
        effort: "medium" as const,
        description: "Potenziale per partnership strategica a lungo termine",
        action: "Proporre accordo di partnership esclusiva",
      },
      {
        opportunity: "Enterprise Expansion",
        potential: 40,
        effort: "low" as const,
        description: "Espansione servizi ad altre divisioni aziendali",
        action: "Presentare soluzioni per altre business unit",
      },
    ],

    recentActivities: [
      {
        id: "10",
        type: "meeting" as const,
        description: "Strategic planning session Q1 2024",
        date: "2024-01-21T10:00:00Z",
        impact: "positive" as const,
        scoreChange: 2,
      },
      {
        id: "11",
        type: "content" as const,
        description: "Partecipazione a webinar come speaker",
        date: "2024-01-19T16:00:00Z",
        impact: "positive" as const,
        scoreChange: 3,
      },
    ],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get("customerId")

    // Se richiesto un cliente specifico
    if (customerId) {
      const customer = healthScores.find((score) => score.customerId === customerId)
      if (!customer) {
        return NextResponse.json({ error: "Cliente non trovato" }, { status: 404 })
      }
      return NextResponse.json({ score: customer })
    }

    // Calcolo analytics
    const analytics = {
      totalCustomers: healthScores.length,
      avgHealthScore: Math.round(
        healthScores.reduce((sum, score) => sum + score.overallScore, 0) / healthScores.length,
      ),
      healthyCustomers: healthScores.filter((score) => score.overallScore >= 70).length,
      atRiskCustomers: healthScores.filter((score) => score.overallScore >= 40 && score.overallScore < 70).length,
      criticalCustomers: healthScores.filter((score) => score.overallScore < 40).length,
      scoreDistribution: [
        {
          range: "80-100",
          count: healthScores.filter((score) => score.overallScore >= 80).length,
          percentage: Math.round(
            (healthScores.filter((score) => score.overallScore >= 80).length / healthScores.length) * 100,
          ),
        },
        {
          range: "60-79",
          count: healthScores.filter((score) => score.overallScore >= 60 && score.overallScore < 80).length,
          percentage: Math.round(
            (healthScores.filter((score) => score.overallScore >= 60 && score.overallScore < 80).length /
              healthScores.length) *
              100,
          ),
        },
        {
          range: "40-59",
          count: healthScores.filter((score) => score.overallScore >= 40 && score.overallScore < 60).length,
          percentage: Math.round(
            (healthScores.filter((score) => score.overallScore >= 40 && score.overallScore < 60).length /
              healthScores.length) *
              100,
          ),
        },
        {
          range: "0-39",
          count: healthScores.filter((score) => score.overallScore < 40).length,
          percentage: Math.round(
            (healthScores.filter((score) => score.overallScore < 40).length / healthScores.length) * 100,
          ),
        },
      ],
      trendAnalysis: {
        improving: healthScores.filter((score) => score.trend === "up").length,
        declining: healthScores.filter((score) => score.trend === "down").length,
        stable: healthScores.filter((score) => score.trend === "stable").length,
      },
      topRiskFactors: [
        {
          factor: "Basso engagement",
          affectedCustomers: 3,
          avgImpact: 75,
        },
        {
          factor: "Problemi di supporto",
          affectedCustomers: 2,
          avgImpact: 65,
        },
        {
          factor: "Stagnazione nel journey",
          affectedCustomers: 2,
          avgImpact: 70,
        },
      ],
      topOpportunities: [
        {
          opportunity: "Upsell/Cross-sell",
          potentialRevenue: 150000,
          affectedCustomers: 4,
        },
        {
          opportunity: "Referral Program",
          potentialRevenue: 75000,
          affectedCustomers: 3,
        },
        {
          opportunity: "Partnership Strategiche",
          potentialRevenue: 200000,
          affectedCustomers: 2,
        },
      ],
    }

    return NextResponse.json({
      scores: healthScores,
      analytics,
    })
  } catch (error) {
    console.error("Errore API health score:", error)
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, customerIds, parameters } = body

    // Simulazione azioni bulk
    if (action === "bulk_email") {
      return NextResponse.json({
        success: true,
        message: `Email campaign inviata a ${customerIds.length} clienti`,
        results: {
          sent: customerIds.length,
          failed: 0,
          estimatedImpact: "+5-15 punti health score",
        },
      })
    }

    if (action === "bulk_call") {
      return NextResponse.json({
        success: true,
        message: `Call campaign pianificata per ${customerIds.length} clienti`,
        results: {
          scheduled: customerIds.length,
          estimatedImpact: "+10-25 punti health score",
        },
      })
    }

    if (action === "update_score") {
      const { customerId, scoreUpdates } = body
      return NextResponse.json({
        success: true,
        message: "Health score aggiornato con successo",
        updatedScore: scoreUpdates,
      })
    }

    return NextResponse.json({ error: "Azione non riconosciuta" }, { status: 400 })
  } catch (error) {
    console.error("Errore azione health score:", error)
    return NextResponse.json({ error: "Errore nell'esecuzione dell'azione" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerId, scoreComponents, riskFactors, opportunities } = body

    // Simulazione aggiornamento score
    const customerIndex = healthScores.findIndex((score) => score.customerId === customerId)
    if (customerIndex === -1) {
      return NextResponse.json({ error: "Cliente non trovato" }, { status: 404 })
    }

    // Aggiornamento dati (in un'app reale, questo andrebbe nel database)
    if (scoreComponents) {
      healthScores[customerIndex] = {
        ...healthScores[customerIndex],
        ...scoreComponents,
        lastUpdated: new Date().toISOString(),
      }
    }

    return NextResponse.json({
      success: true,
      message: "Health score aggiornato con successo",
      updatedScore: healthScores[customerIndex],
    })
  } catch (error) {
    console.error("Errore aggiornamento health score:", error)
    return NextResponse.json({ error: "Errore nell'aggiornamento" }, { status: 500 })
  }
}
