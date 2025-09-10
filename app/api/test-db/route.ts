import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Test basic connection
    const result = await sql`SELECT NOW() as current_time, 'Database connected successfully!' as message`

    // Test tables exist
    const tablesCheck = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('contacts', 'appointments')
    `

    // Get basic stats
    const contactsCount = await sql`SELECT COUNT(*) as count FROM contacts`
    const appointmentsCount = await sql`SELECT COUNT(*) as count FROM appointments`

    return NextResponse.json({
      success: true,
      timestamp: result[0].current_time,
      message: result[0].message,
      tables: tablesCheck.map((t) => t.table_name),
      stats: {
        contacts: contactsCount[0].count,
        appointments: appointmentsCount[0].count,
      },
    })
  } catch (error) {
    console.error("Database test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
