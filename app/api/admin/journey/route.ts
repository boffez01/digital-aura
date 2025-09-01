import { type NextRequest, NextResponse } from "next/server"

// Simulazione dati customer journey
const journeyStages = [
  {
    id: "awareness",
    name: "Awareness",
    description: "Prima scoperta del brand",
    color: "blue",
    icon: "👁️",
    customers: 1000,
    conversionRate: 25,
    avgDuration: 2.5,
    dropoffRate: 75,
    revenue: 0,
    touchpoints: ["Social Media", "Google Ads", "Blog", "Referral"],
    actions: [
      {
        id: "1",
        name: "Content Marketing",
        type: "content" as const,
        effectiveness: 78,
        usage: 85,
      },
      {
        id: "2",
        name: "Social Media Ads",
        type: "automation" as const,
        effectiveness: 65,
        usage: 92,
      },
      {
        id: "3",
        name: "SEO Optimization",
        type: "content" as const,
        effectiveness: 82,
        usage: 70,
      },
    ],
    metrics: {
      satisfaction: 3.8,
      engagement: 45,
      responseRate: 12,
      completionRate: 25,
    },
    bottlenecks: [
      {
        issue: "Bassa brand recognition",
        impact: "medium" as const,
        suggestion: "Aumentare investimenti in brand awareness campaigns",
      },
      {
        issue: "Contenuti non sufficientemente targettizzati",
        impact: "high" as const,
        suggestion: "Creare contenuti specifici per ogni buyer persona",
      },
    ],
  },
  {
    id: "interest",
    name: "Interest",
    description: "Interesse attivo nei servizi",
    color: "green",
    icon: "🎯",
    customers: 250,
    conversionRate: 60,
    avgDuration: 5.2,
    dropoffRate: 40,
    revenue: 0,
    touchpoints: ["Website", "Newsletter", "Webinar", "Case Studies"],
    actions: [
      {
        id: "4",
        name: "Email Nurturing",
        type: "email" as const,
        effectiveness: 72,
        usage: 65,
      },
      {
        id: "5",
        name: "Webinar Series",
        type: "content" as const,
        effectiveness: 85,
        usage: 45,
      },
      {
        id: "6",
        name: "Retargeting Ads",
        type: "automation" as const,
        effectiveness: 68,
        usage: 80,
      },
    ],
    metrics: {
      satisfaction: 4.1,
      engagement: 68,
      responseRate: 28,
      completionRate: 60,
    },
    bottlenecks: [
      {
        issue: "Email automation non ottimizzata",
        impact: "high" as const,
        suggestion: "Implementare sequenze email personalizzate basate sul comportamento",
      },
    ],
  },
  {
    id: "consideration",
    name: "Consideration",
    description: "Valutazione attiva delle opzioni",
    color: "yellow",
    icon: "🤔",
    customers: 150,
    conversionRate: 45,
    avgDuration: 8.7,
    dropoffRate: 55,
    revenue: 0,
    touchpoints: ["Demo", "Consultation", "Proposal", "References"],
    actions: [
      {
        id: "7",
        name: "Product Demo",
        type: "meeting" as const,
        effectiveness: 88,
        usage: 75,
      },
      {
        id: "8",
        name: "Free Consultation",
        type: "call" as const,
        effectiveness: 82,
        usage: 90,
      },
      {
        id: "9",
        name: "Case Study Sharing",
        type: "content" as const,
        effectiveness: 76,
        usage: 60,
      },
    ],
    metrics: {
      satisfaction: 4.3,
      engagement: 75,
      responseRate: 45,
      completionRate: 45,
    },
    bottlenecks: [
      {
        issue: "Processo di demo troppo lungo",
        impact: "high" as const,
        suggestion: "Creare demo più concise e focalizzate sui pain points specifici",
      },
      {
        issue: "Mancanza di social proof",
        impact: "medium" as const,
        suggestion: "Aggiungere più testimonial e case studies nella fase di consideration",
      },
    ],
  },
  {
    id: "intent",
    name: "Intent",
    description: "Intenzione di acquisto chiara",
    color: "orange",
    icon: "💡",
    customers: 68,
    conversionRate: 75,
    avgDuration: 12.3,
    dropoffRate: 25,
    revenue: 0,
    touchpoints: ["Proposal", "Negotiation", "Contract", "Legal Review"],
    actions: [
      {
        id: "10",
        name: "Proposal Customization",
        type: "content" as const,
        effectiveness: 92,
        usage: 95,
      },
      {
        id: "11",
        name: "Follow-up Calls",
        type: "call" as const,
        effectiveness: 85,
        usage: 85,
      },
      {
        id: "12",
        name: "Urgency Creation",
        type: "automation" as const,
        effectiveness: 70,
        usage: 40,
      },
    ],
    metrics: {
      satisfaction: 4.5,
      engagement: 85,
      responseRate: 75,
      completionRate: 75,
    },
    bottlenecks: [
      {
        issue: "Tempi di risposta alle proposte troppo lunghi",
        impact: "high" as const,
        suggestion: "Implementare sistema di notifiche per follow-up automatici",
      },
    ],
  },
  {
    id: "purchase",
    name: "Purchase",
    description: "Decisione di acquisto finale",
    color: "purple",
    icon: "💳",
    customers: 51,
    conversionRate: 90,
    avgDuration: 18.5,
    dropoffRate: 10,
    revenue: 275000,
    touchpoints: ["Contract Signing", "Payment", "Onboarding", "Kickoff"],
    actions: [
      {
        id: "13",
        name: "Contract Optimization",
        type: "content" as const,
        effectiveness: 95,
        usage: 100,
      },
      {
        id: "14",
        name: "Payment Facilitation",
        type: "automation" as const,
        effectiveness: 88,
        usage: 100,
      },
      {
        id: "15",
        name: "Onboarding Preparation",
        type: "meeting" as const,
        effectiveness: 90,
        usage: 95,
      },
    ],
    metrics: {
      satisfaction: 4.7,
      engagement: 95,
      responseRate: 90,
      completionRate: 90,
    },
    bottlenecks: [
      {
        issue: "Processo di firma contratto complesso",
        impact: "medium" as const,
        suggestion: "Implementare firma digitale per velocizzare il processo",
      },
    ],
  },
  {
    id: "retention",
    name: "Retention",
    description: "Mantenimento e soddisfazione cliente",
    color: "pink",
    icon: "🤝",
    customers: 46,
    conversionRate: 85,
    avgDuration: 180,
    dropoffRate: 15,
    revenue: 195000,
    touchpoints: ["Project Delivery", "Support", "Check-ins", "Upselling"],
    actions: [
      {
        id: "16",
        name: "Regular Check-ins",
        type: "call" as const,
        effectiveness: 88,
        usage: 80,
      },
      {
        id: "17",
        name: "Proactive Support",
        type: "automation" as const,
        effectiveness: 82,
        usage: 90,
      },
      {
        id: "18",
        name: "Success Metrics Tracking",
        type: "automation" as const,
        effectiveness: 85,
        usage: 70,
      },
    ],
    metrics: {
      satisfaction: 4.6,
      engagement: 78,
      responseRate: 85,
      completionRate: 85,
    },
    bottlenecks: [
      {
        issue: "Comunicazione post-progetto insufficiente",
        impact: "high" as const,
        suggestion: "Creare programma strutturato di follow-up post-delivery",
      },
    ],
  },
  {
    id: "advocacy",
    name: "Advocacy",
    description: "Promozione attiva del brand",
    color: "indigo",
    icon: "⭐",
    customers: 39,
    conversionRate: 95,
    avgDuration: 365,
    dropoffRate: 5,
    revenue: 156000,
    touchpoints: ["Referrals", "Testimonials", "Case Studies", "Reviews"],
    actions: [
      {
        id: "19",
        name: "Referral Program",
        type: "automation" as const,
        effectiveness: 92,
        usage: 60,
      },
      {
        id: "20",
        name: "Testimonial Collection",
        type: "content" as const,
        effectiveness: 88,
        usage: 85,
      },
      {
        id: "21",
        name: "Loyalty Rewards",
        type: "automation" as const,
        effectiveness: 85,
        usage: 45,
      },
    ],
    metrics: {
      satisfaction: 4.9,
      engagement: 90,
      responseRate: 95,
      completionRate: 95,
    },
    bottlenecks: [
      {
        issue: "Programma referral sottoutilizzato",
        impact: "medium" as const,
        suggestion: "Migliorare comunicazione e incentivi del programma referral",
      },
    ],
  },
]

const customerFlows = [
  { from: "awareness", to: "interest", count: 250, conversionRate: 25, avgTime: 2.5 },
  { from: "interest", to: "consideration", count: 150, conversionRate: 60, avgTime: 5.2 },
  { from: "consideration", to: "intent", count: 68, conversionRate: 45, avgTime: 8.7 },
  { from: "intent", to: "purchase", count: 51, conversionRate: 75, avgTime: 12.3 },
  { from: "purchase", to: "retention", count: 46, conversionRate: 90, avgTime: 18.5 },
  { from: "retention", to: "advocacy", count: 39, conversionRate: 85, avgTime: 180 },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "30d"
    const segment = searchParams.get("segment") || "all"

    // Simulazione filtri (in un'app reale, questi influenzerebbero i dati)
    const filteredStages = [...journeyStages]
    const filteredFlows = [...customerFlows]

    // Calcolo analytics
    const analytics = {
      totalCustomers: filteredStages[0]?.customers || 0,
      avgJourneyTime: 45.2, // giorni medi per completare tutto il journey
      overallConversion:
        ((filteredStages[filteredStages.length - 1]?.customers || 0) / (filteredStages[0]?.customers || 1)) * 100,
      totalRevenue: filteredStages.reduce((sum, stage) => sum + stage.revenue, 0),
      topPerformingStage:
        filteredStages.reduce((best, stage) => (stage.conversionRate > (best?.conversionRate || 0) ? stage : best))
          ?.name || "N/A",
      bottleneckStage:
        filteredStages.reduce((worst, stage) => (stage.dropoffRate > (worst?.dropoffRate || 0) ? stage : worst))
          ?.name || "N/A",
      churnPoints: ["Consideration", "Intent"],
      opportunityAreas: ["Email Automation", "Follow-up Process", "Referral Program"],
    }

    return NextResponse.json({
      stages: filteredStages,
      flows: filteredFlows,
      analytics: {
        ...analytics,
        overallConversion: Math.round(analytics.overallConversion * 10) / 10,
      },
    })
  } catch (error) {
    console.error("Errore API journey:", error)
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, stageId, optimizationType } = body

    // Simulazione implementazione ottimizzazioni
    if (action === "optimize") {
      // Qui implementeresti la logica per applicare le ottimizzazioni
      return NextResponse.json({
        success: true,
        message: `Ottimizzazione ${optimizationType} applicata allo stage ${stageId}`,
        estimatedImprovement: {
          conversionRate: "+15%",
          dropoffReduction: "-25%",
          revenueIncrease: "+€50,000",
        },
      })
    }

    return NextResponse.json({ error: "Azione non riconosciuta" }, { status: 400 })
  } catch (error) {
    console.error("Errore ottimizzazione journey:", error)
    return NextResponse.json({ error: "Errore nell'ottimizzazione" }, { status: 500 })
  }
}
