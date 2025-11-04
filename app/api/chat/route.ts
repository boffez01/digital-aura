import { type NextRequest, NextResponse } from "next/server"
import { generateAIResponse } from "@/lib/gemini-ai"
import { createSession, getSession, updateSession, setSessionContext } from "@/lib/session-manager"

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, language = "en", context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get or create session
    let currentSessionId = sessionId
    if (!currentSessionId || !getSession(currentSessionId)) {
      currentSessionId = createSession(language)
    }

    // Update context if provided
    if (context) {
      setSessionContext(currentSessionId, context)
    }

    // Get session for context
    const session = getSession(currentSessionId)
    const sessionContext = session?.context || ""

    // Update session with user message
    updateSession(currentSessionId, { role: "user", content: message })

    // Generate AI response
    const aiResponse = await generateAIResponse(message, sessionContext, language)

    // Update session with AI response
    updateSession(currentSessionId, { role: "assistant", content: aiResponse })

    return NextResponse.json({
      response: aiResponse,
      sessionId: currentSessionId,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
