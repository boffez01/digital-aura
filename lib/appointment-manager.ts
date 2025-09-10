import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface AppointmentData {
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

export async function createAppointment(data: AppointmentData) {
  try {
    console.log("💾 Creating appointment in database:", data)

    const result = await sql`
      INSERT INTO appointments (name, email, phone, service, date, time, message, status, priority, created_at)
      VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.service}, ${data.date}, ${data.time}, ${data.message}, ${data.status}, ${data.priority}, NOW())
      RETURNING *
    `

    console.log("✅ Appointment created successfully:", result[0])
    return result[0]
  } catch (error) {
    console.error("❌ Error creating appointment:", error)
    throw error
  }
}

export async function checkAvailability(date: string, time: string) {
  try {
    console.log(`🔍 Checking availability for ${date} at ${time}`)

    const existingAppointment = await sql`
      SELECT id, name, email FROM appointments 
      WHERE date = ${date} 
      AND time = ${time}
      AND status != 'cancelled'
    `

    if (existingAppointment.length > 0) {
      return {
        available: false,
        conflict: existingAppointment[0],
      }
    }

    return {
      available: true,
      conflict: null,
    }
  } catch (error) {
    console.error("❌ Error checking availability:", error)
    return {
      available: true, // Default to available if check fails
      conflict: null,
    }
  }
}
