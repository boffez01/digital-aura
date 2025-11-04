import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { sessionId, rating, comment } = await request.json()

    console.log("[v0] Feedback received:", { sessionId, rating, comment })

    // Here you would typically store feedback in a database

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback!",
    })
  } catch (error) {
    console.error("[v0] Feedback API error:", error)
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}
