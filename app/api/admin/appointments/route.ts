import { type NextRequest, NextResponse } from "next/server"

// Simulazione database in memoria
const appointmentsDB: any[] = [
  {
    id: "PRIORITY-1703123456789",
    type: "priority",
    service: "assistance",
    serviceName: "Assistenza Prioritaria",
    customerName: "Marco Rossi",
    customerEmail: "marco.rossi@email.com",
    customerPhone: "+39 333 123 4567",
    message: "Il sito web è down da 2 ore, clienti non riescono ad accedere. Urgente!",
    date: new Date().toISOString(),
    time: "14:30",
    status: "pending",
    priority: true,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    estimatedDuration: 30,
  },
  {
    id: "PRIORITY-1703123456790",
    type: "priority",
    service: "assistance",
    serviceName: "Assistenza Prioritaria",
    customerName: "Laura Bianchi",
    customerEmail: "laura.bianchi@startup.it",
    customerPhone: "+39 347 987 6543",
    message: "Chatbot non risponde, perdiamo lead. Sistema di pagamento bloccato.",
    date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    time: "16:00",
    status: "contacted",
    priority: true,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    assignedTo: "Tech Support Team",
    notes: "Cliente contattato, problema identificato. Intervento programmato.",
    estimatedDuration: 45,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const type = searchParams.get("type")
    const search = searchParams.get("search")

    let filteredAppointments = [...appointmentsDB]

    // Filtro per stato
    if (status && status !== "all") {
      filteredAppointments = filteredAppointments.filter((apt) => apt.status === status)
    }

    // Filtro per tipo
    if (type && type !== "all") {
      filteredAppointments = filteredAppointments.filter((apt) => apt.type === type)
    }

    // Filtro per ricerca
    if (search) {
      const searchLower = search.toLowerCase()
      filteredAppointments = filteredAppointments.filter(
        (apt) =>
          apt.customerName.toLowerCase().includes(searchLower) ||
          apt.customerEmail.toLowerCase().includes(searchLower) ||
          apt.serviceName.toLowerCase().includes(searchLower) ||
          apt.id.toLowerCase().includes(searchLower),
      )
    }

    // Ordina per priorità e data di creazione
    filteredAppointments.sort((a, b) => {
      if (a.priority && !b.priority) return -1
      if (!a.priority && b.priority) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    // Calcola statistiche
    const stats = {
      totalAppointments: appointmentsDB.length,
      priorityAppointments: appointmentsDB.filter((apt) => apt.priority).length,
      pendingPriority: appointmentsDB.filter((apt) => apt.priority && apt.status === "pending").length,
      completedToday: appointmentsDB.filter(
        (apt) => apt.status === "completed" && new Date(apt.updatedAt).toDateString() === new Date().toDateString(),
      ).length,
      averageResponseTime: 25,
      satisfactionRate: 96,
    }

    return NextResponse.json({
      success: true,
      appointments: filteredAppointments,
      stats,
      total: filteredAppointments.length,
    })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch appointments",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { appointmentId, status, notes, assignedTo } = await request.json()

    // Trova e aggiorna l'appuntamento
    const appointmentIndex = appointmentsDB.findIndex((apt) => apt.id === appointmentId)

    if (appointmentIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Appointment not found",
        },
        { status: 404 },
      )
    }

    // Aggiorna l'appuntamento
    appointmentsDB[appointmentIndex] = {
      ...appointmentsDB[appointmentIndex],
      status: status || appointmentsDB[appointmentIndex].status,
      notes: notes !== undefined ? notes : appointmentsDB[appointmentIndex].notes,
      assignedTo: assignedTo || appointmentsDB[appointmentIndex].assignedTo,
      updatedAt: new Date().toISOString(),
    }

    // Log dell'aggiornamento
    const appointment = appointmentsDB[appointmentIndex]
    const logPrefix = appointment.priority ? "🚨 PRIORITY UPDATE" : "📝 UPDATE"
    console.log(`${logPrefix} - Appointment ${appointmentId}:`, {
      status: appointment.status,
      customer: appointment.customerName,
      service: appointment.serviceName,
      updatedBy: "Admin",
      timestamp: new Date().toISOString(),
    })

    // Se è assistenza prioritaria e viene contattato, invia notifica
    if (appointment.priority && status === "contacted") {
      console.log("📱 Sending priority contact confirmation to customer")
      console.log("📧 Notifying support team of priority contact")
    }

    return NextResponse.json({
      success: true,
      appointment: appointmentsDB[appointmentIndex],
      message: "Appointment updated successfully",
    })
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update appointment",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json()

    // Crea nuovo appuntamento
    const newAppointment = {
      id: `${appointmentData.priority ? "PRIORITY" : "REGULAR"}-${Date.now()}`,
      type: appointmentData.priority ? "priority" : "regular",
      ...appointmentData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Aggiungi al database
    appointmentsDB.push(newAppointment)

    // Log della creazione
    const logPrefix = newAppointment.priority ? "🚨 NEW PRIORITY APPOINTMENT" : "📅 NEW APPOINTMENT"
    console.log(`${logPrefix} - Created:`, {
      id: newAppointment.id,
      customer: newAppointment.customerName,
      service: newAppointment.serviceName,
      priority: newAppointment.priority,
    })

    return NextResponse.json({
      success: true,
      appointment: newAppointment,
      message: "Appointment created successfully",
    })
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create appointment",
      },
      { status: 500 },
    )
  }
}
