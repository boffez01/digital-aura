import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface Appointment {
  id: number
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
  status: "pending" | "confirmed" | "cancelled"
  priority: boolean
  google_event_id?: string
  google_event_link?: string
  created_at: string
  updated_at: string
}

export interface CreateAppointmentData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
  status: "pending" | "confirmed" | "cancelled"
  priority: boolean
}

export async function createAppointment(data: CreateAppointmentData): Promise<Appointment> {
  try {
    console.log("💾 Creating appointment in database:", data)

    // Use the exact column names from the original table structure
    const result = await sql`
      INSERT INTO appointments (
        name, email, phone, service, 
        date, time, message, status, priority
      ) VALUES (
        ${data.name}, ${data.email}, ${data.phone}, ${data.service}, 
        ${data.date}, ${data.time}, ${data.message}, ${data.status}, ${data.priority}
      )
      RETURNING *
    `

    console.log("✅ Appointment created successfully:", result[0].id)
    return result[0] as Appointment
  } catch (error) {
    console.error("❌ Error creating appointment:", error)
    throw error
  }
}

export async function updateAppointmentGoogleEvent(
  appointmentId: number,
  googleEventId: string,
  googleEventLink: string,
): Promise<Appointment> {
  try {
    console.log("🔄 Updating appointment with Google Calendar info:", {
      appointmentId,
      googleEventId,
      googleEventLink,
    })

    const result = await sql`
      UPDATE appointments 
      SET 
        google_event_id = ${googleEventId},
        google_event_link = ${googleEventLink},
        updated_at = NOW()
      WHERE id = ${appointmentId}
      RETURNING *
    `

    console.log("✅ Appointment updated with Google Calendar info")
    return result[0] as Appointment
  } catch (error) {
    console.error("❌ Error updating appointment with Google Calendar info:", error)
    throw error
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  try {
    console.log("📋 Fetching appointments from database...")

    const result = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        service,
        date,
        time,
        message,
        status,
        priority,
        google_event_id,
        google_event_link,
        created_at,
        updated_at
      FROM appointments 
      ORDER BY date DESC, time DESC
    `

    console.log(`✅ Found ${result.length} appointments`)
    return result as Appointment[]
  } catch (error) {
    console.error("❌ Error fetching appointments:", error)
    throw error
  }
}

export async function getAppointmentById(id: number): Promise<Appointment | null> {
  try {
    const result = await sql`
      SELECT * FROM appointments WHERE id = ${id}
    `

    return (result[0] as Appointment) || null
  } catch (error) {
    console.error("❌ Error fetching appointment by ID:", error)
    throw error
  }
}

export async function updateAppointmentStatus(
  id: number,
  status: "pending" | "confirmed" | "cancelled",
): Promise<Appointment> {
  try {
    const result = await sql`
      UPDATE appointments 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    return result[0] as Appointment
  } catch (error) {
    console.error("❌ Error updating appointment status:", error)
    throw error
  }
}

export async function deleteAppointment(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM appointments WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("❌ Error deleting appointment:", error)
    throw error
  }
}

// Contact form functions
export interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  created_at: string
}

export interface CreateContactData {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
}

export async function saveContact(data: CreateContactData) {
  try {
    const result = await sql`
      INSERT INTO contacts (name, email, phone, company, service_type, message)
      VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.company || null}, ${data.service || null}, ${data.message})
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error) {
    console.error("Error saving contact:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function createTables() {
  try {
    // This would be handled by your SQL scripts
    console.log("Tables should already exist from SQL scripts")
  } catch (error) {
    console.error("Error creating tables:", error)
  }
}

export async function createContact(data: CreateContactData): Promise<Contact> {
  try {
    const result = await sql`
      INSERT INTO contacts (name, email, phone, company, service_type, message)
      VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.company || null}, ${data.service || null}, ${data.message})
      RETURNING *
    `

    return result[0] as Contact
  } catch (error) {
    console.error("❌ Error creating contact:", error)
    throw error
  }
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const result = await sql`
      SELECT * FROM contacts 
      ORDER BY created_at DESC
    `

    return result as Contact[]
  } catch (error) {
    console.error("❌ Error fetching contacts:", error)
    throw error
  }
}

export async function getAppointmentsByDate(date: string) {
  try {
    const result = await sql`
      SELECT * FROM appointments 
      WHERE date = ${date}
      ORDER BY time ASC
    `
    return result
  } catch (error) {
    console.error("❌ Database error fetching appointments by date:", error)
    throw error
  }
}
