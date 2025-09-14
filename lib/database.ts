import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface CreateAppointmentData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
  status: string
  priority: boolean
}

export async function createAppointment(data: CreateAppointmentData) {
  try {
    console.log("💾 Creating appointment in database:", data)

    const result = await sql`
      INSERT INTO appointments (
        name, 
        email, 
        phone, 
        service, 
        date, 
        time, 
        message, 
        status, 
        priority, 
        created_at, 
        updated_at
      )
      VALUES (
        ${data.name},
        ${data.email},
        ${data.phone},
        ${data.service},
        ${data.date},
        ${data.time},
        ${data.message},
        ${data.status},
        ${data.priority},
        NOW(),
        NOW()
      )
      RETURNING *
    `

    console.log("✅ Appointment created successfully:", result[0])
    return result[0]
  } catch (error) {
    console.error("❌ Database error creating appointment:", error)
    throw error
  }
}

export async function getAppointments() {
  try {
    const result = await sql`
      SELECT * FROM appointments 
      ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error("❌ Database error fetching appointments:", error)
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
