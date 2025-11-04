import { type NextRequest, NextResponse } from "next/server"
import { initializeBookingFlow, processBookingStep, type BookingState } from "@/lib/booking-flow"

const bookingSessions = new Map<string, BookingState>()

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, language = "it" } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    let bookingState = bookingSessions.get(sessionId)
    if (!bookingState) {
      bookingState = initializeBookingFlow(language)
      bookingSessions.set(sessionId, bookingState)
    }

    const result = processBookingStep(bookingState, message)
    bookingState.step = result.nextStep

    if (result.completed) {
      console.log("[v0] Booking completed:", bookingState.data)
      bookingSessions.delete(sessionId)
    }

    return NextResponse.json({
      response: result.message,
      step: result.nextStep,
      completed: result.completed,
      bookingData: bookingState.data,
    })
  } catch (error) {
    console.error("[v0] Booking API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
