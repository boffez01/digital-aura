import { NextRequest, NextResponse } from 'next/server'
import { saveContact, createTables } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    // Ensure tables exist
    await createTables()

    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save to database
    const result = await saveContact({
      name,
      email,
      phone: phone || null,
      company: company || null,
      service: service || null,
      message,
    })

    if (!result.success) {
      console.error('Database error:', result.error)
      return NextResponse.json(
        { success: false, error: 'Failed to save contact' },
        { status: 500 }
      )
    }

    // Send notification email (optional - you can implement this later)
    // await sendNotificationEmail({ name, email, message })

    return NextResponse.json({
      success: true,
      message: 'Contact saved successfully',
      data: result.data,
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API is working' },
    { status: 200 }
  )
}
