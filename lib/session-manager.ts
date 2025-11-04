interface ChatSession {
  id: string
  messages: Array<{ role: "user" | "assistant"; content: string; timestamp: number }>
  context: string
  language: "it" | "en"
  createdAt: number
  lastActivity: number
}

const sessions = new Map<string, ChatSession>()

export function createSession(language: "it" | "en" = "en"): string {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  sessions.set(sessionId, {
    id: sessionId,
    messages: [],
    context: "",
    language,
    createdAt: Date.now(),
    lastActivity: Date.now(),
  })

  return sessionId
}

export function getSession(sessionId: string): ChatSession | null {
  const session = sessions.get(sessionId)
  if (!session) return null

  // Clean up old sessions (older than 1 hour)
  if (Date.now() - session.lastActivity > 3600000) {
    sessions.delete(sessionId)
    return null
  }

  return session
}

export function updateSession(sessionId: string, message: { role: "user" | "assistant"; content: string }): void {
  const session = sessions.get(sessionId)
  if (!session) return

  session.messages.push({
    ...message,
    timestamp: Date.now(),
  })
  session.lastActivity = Date.now()
}

export function setSessionContext(sessionId: string, context: string): void {
  const session = sessions.get(sessionId)
  if (!session) return

  session.context = context
  session.lastActivity = Date.now()
}

export function getSessionMessages(sessionId: string) {
  const session = sessions.get(sessionId)
  return session?.messages || []
}

export function clearOldSessions(): void {
  const now = Date.now()
  for (const [id, session] of sessions.entries()) {
    if (now - session.lastActivity > 3600000) {
      sessions.delete(id)
    }
  }
}
