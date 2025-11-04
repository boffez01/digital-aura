import type { ChatContext, ChatMessage } from "./gemini-ai"

const sessions = new Map<string, ChatContext>()

export function createSession(language: "it" | "en" = "it"): string {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const context: ChatContext = {
    sessionId,
    language,
    history: [],
  }

  sessions.set(sessionId, context)

  setTimeout(
    () => {
      sessions.delete(sessionId)
    },
    30 * 60 * 1000,
  )

  return sessionId
}

export function getSession(sessionId: string): ChatContext | null {
  return sessions.get(sessionId) || null
}

export function updateSession(sessionId: string, updates: Partial<ChatContext>): boolean {
  const session = sessions.get(sessionId)
  if (!session) return false

  Object.assign(session, updates)
  return true
}

export function addMessage(sessionId: string, message: ChatMessage): boolean {
  const session = sessions.get(sessionId)
  if (!session) return false

  session.history.push(message)

  if (session.history.length > 20) {
    session.history = session.history.slice(-20)
  }

  return true
}

export function deleteSession(sessionId: string): boolean {
  return sessions.delete(sessionId)
}

export function getSessionCount(): number {
  return sessions.size
}
