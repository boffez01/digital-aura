import { type NextRequest, NextResponse } from "next/server"
import { getSession, getSessionCount } from "@/lib/session-manager"

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId")

    if (sessionId) {
      const session = getSession(sessionId)
      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 })
      }

      return NextResponse.json({
        sessionId: session.sessionId,
        language: session.language,
        messageCount: session.history.length,
        hasUserInfo: !!session.userInfo,
      })
    }

    return NextResponse.json({
      activeSessions: getSessionCount(),
      status: "operational",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Status API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
