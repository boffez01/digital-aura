import { type NextRequest, NextResponse } from "next/server"
import { getSession, getSessionMessages } from "@/lib/session-manager"

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    const session = getSession(sessionId)

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    const messages = getSessionMessages(sessionId)

    return NextResponse.json({
      sessionId: session.id,
      messageCount: messages.length,
      lastActivity: session.lastActivity,
      language: session.language,
    })
  } catch (error) {
    console.error("[v0] Status API error:", error)
    return NextResponse.json({ error: "Failed to get session status" }, { status: 500 })
  }
}
