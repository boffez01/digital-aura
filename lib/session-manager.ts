import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface ChatSession {
  session_id: string
  booking_mode: boolean
  flow_step?: string | null
  booking_data?: any
  created_at: string
  updated_at: string
}

export class SessionManager {
  private static instance: SessionManager

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager()
    }
    return SessionManager.instance
  }

  async createSession(sessionId: string): Promise<ChatSession> {
    try {
      console.log(`🆕 Creating new session: ${sessionId}`)

      // First try to get existing session
      const existing = await this.getSession(sessionId)
      if (existing) {
        console.log(`✅ Session already exists: ${sessionId}`)
        return existing
      }

      // Create new session
      const result = await sql`
        INSERT INTO chat_sessions (session_id, booking_mode, flow_step, booking_data, created_at, updated_at)
        VALUES (${sessionId}, false, null, null, NOW(), NOW())
        RETURNING *
      `

      if (result.length > 0) {
        console.log(`✅ New session created: ${sessionId}`)
        return result[0] as ChatSession
      } else {
        throw new Error("Failed to create session")
      }
    } catch (error) {
      console.error(`❌ Error creating session ${sessionId}:`, error)

      // Return a default session to prevent crashes
      return {
        session_id: sessionId,
        booking_mode: false,
        flow_step: null,
        booking_data: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  }

  async getSession(sessionId: string): Promise<ChatSession | null> {
    try {
      const result = await sql`
        SELECT * FROM chat_sessions WHERE session_id = ${sessionId}
      `

      if (result.length > 0) {
        const session = result[0] as ChatSession
        console.log(`✅ Session found: ${sessionId}, booking_mode: ${session.booking_mode}, step: ${session.flow_step}`)
        return session
      }

      console.log(`❌ Session not found: ${sessionId}`)
      return null
    } catch (error) {
      console.error(`❌ Error getting session ${sessionId}:`, error)
      return null
    }
  }

  async updateSession(
    sessionId: string,
    updates: Partial<Omit<ChatSession, "session_id" | "created_at">>,
  ): Promise<ChatSession | null> {
    try {
      const setClause = []
      const values = []

      if (updates.booking_mode !== undefined) {
        setClause.push(`booking_mode = $${values.length + 1}`)
        values.push(updates.booking_mode)
      }

      if (updates.flow_step !== undefined) {
        setClause.push(`flow_step = $${values.length + 1}`)
        values.push(updates.flow_step)
      }

      if (updates.booking_data !== undefined) {
        setClause.push(`booking_data = $${values.length + 1}::jsonb`)
        values.push(JSON.stringify(updates.booking_data))
      }

      setClause.push(`updated_at = NOW()`)

      if (setClause.length === 1) {
        // Only updating timestamp
        const result = await sql`
          UPDATE chat_sessions 
          SET updated_at = NOW()
          WHERE session_id = ${sessionId}
          RETURNING *
        `
        return result.length > 0 ? (result[0] as ChatSession) : null
      }

      // Build dynamic query
      const query = `
        UPDATE chat_sessions 
        SET ${setClause.join(", ")}
        WHERE session_id = $${values.length + 1}
        RETURNING *
      `

      values.push(sessionId)

      const result = await sql(query, values)

      if (result.length > 0) {
        console.log(`✅ Session updated: ${sessionId}`)
        return result[0] as ChatSession
      }

      return null
    } catch (error) {
      console.error(`❌ Error updating session ${sessionId}:`, error)
      return null
    }
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    try {
      await sql`DELETE FROM chat_sessions WHERE session_id = ${sessionId}`
      console.log(`🗑️ Session deleted: ${sessionId}`)
      return true
    } catch (error) {
      console.error(`❌ Error deleting session ${sessionId}:`, error)
      return false
    }
  }

  async cleanupOldSessions(olderThanHours = 24): Promise<number> {
    try {
      const result = await sql`
        DELETE FROM chat_sessions 
        WHERE updated_at < NOW() - INTERVAL '${olderThanHours} hours'
        RETURNING session_id
      `

      console.log(`🧹 Cleaned up ${result.length} old sessions`)
      return result.length
    } catch (error) {
      console.error("❌ Error cleaning up old sessions:", error)
      return 0
    }
  }
}
