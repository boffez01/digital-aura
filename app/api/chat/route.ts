import { type NextRequest, NextResponse } from "next/server"
import { generateChatResponse, detectIntent } from "@/lib/gemini-ai"
import { getSession, addMessage, createSession } from "@/lib/session-manager"

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, language = "it" } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    let currentSessionId = sessionId
    if (!currentSessionId) {
      currentSessionId = createSession(language)
    }

    const session = getSession(currentSessionId)
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    addMessage(currentSessionId, {
      role: "user",
      content: message,
      timestamp: new Date(),
    })

    const intent = await detectIntent(message, language)
    const response = await generateChatResponse(session, message)

    addMessage(currentSessionId, {
      role: "assistant",
      content: response,
      timestamp: new Date(),
    })

    return NextResponse.json({
      response,
      sessionId: currentSessionId,
      intent,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
