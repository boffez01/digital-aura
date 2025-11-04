import { type NextRequest, NextResponse } from "next/server"

interface Feedback {
  sessionId: string
  rating: number
  comment?: string
  timestamp: Date
}

const feedbackStore: Feedback[] = []

export async function POST(request: NextRequest) {
  try {
    const { sessionId, rating, comment } = await request.json()

    if (!sessionId || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid feedback data" }, { status: 400 })
    }

    const feedback: Feedback = {
      sessionId,
      rating,
      comment,
      timestamp: new Date(),
    }

    feedbackStore.push(feedback)
    console.log("[v0] Feedback received:", feedback)

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback!",
    })
  } catch (error) {
    console.error("[v0] Feedback API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const averageRating =
      feedbackStore.length > 0 ? feedbackStore.reduce((sum, f) => sum + f.rating, 0) / feedbackStore.length : 0

    return NextResponse.json({
      totalFeedback: feedbackStore.length,
      averageRating: averageRating.toFixed(2),
      recentFeedback: feedbackStore.slice(-10),
    })
  } catch (error) {
    console.error("[v0] Feedback GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
