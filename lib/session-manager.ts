// Session Manager with JSONB support and async processing
// Version 244 - Complete session persistence with intelligent escalation

import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: string
  processing?: boolean
  fallback?: boolean
  final?: boolean
  error?: boolean
}

export interface ChatSession {
  id: number
  session_id: string
  messages: ChatMessage[]
  context: Record<string, any>
  metadata: Record<string, any>
  language: string
  support_mode: boolean
  booking_mode: boolean
  flow_step?: string
  attempt_count: number
  escalation_count: number
  processing_status: "idle" | "processing" | "completed" | "error"
  created_at: string
  updated_at: string
  last_activity: string
}

export class SessionManager {
  private static instance: SessionManager
  private pool: Pool

  private constructor() {
    this.pool = pool
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager()
    }
    return SessionManager.instance
  }

  async getSession(sessionId: string): Promise<ChatSession | null> {
    try {
      console.log(`🔍 Getting session: ${sessionId}`)

      const result = await this.pool.query("SELECT * FROM chat_sessions WHERE session_id = $1", [sessionId])

      if (result.rows.length === 0) {
        console.log(`➕ Creating new session: ${sessionId}`)
        return await this.createSession(sessionId)
      }

      const session = result.rows[0]
      console.log(`✅ Session found: ${sessionId} (${session.messages?.length || 0} messages)`)

      return {
        ...session,
        messages: session.messages || [],
        context: session.context || {},
        metadata: session.metadata || {},
      }
    } catch (error) {
      console.error("❌ Error getting session:", error)
      // Return a minimal session instead of null to prevent crashes
      return {
        id: 0,
        session_id: sessionId,
        messages: [],
        context: {},
        metadata: {},
        language: "it",
        support_mode: false,
        booking_mode: false,
        attempt_count: 0,
        escalation_count: 0,
        processing_status: "idle" as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_activity: new Date().toISOString(),
      }
    }
  }

  async createSession(sessionId: string): Promise<ChatSession> {
    try {
      const result = await this.pool.query(
        `
        INSERT INTO chat_sessions (
          session_id, 
          messages, 
          context, 
          metadata,
          language,
          support_mode,
          booking_mode,
          attempt_count,
          escalation_count,
          processing_status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `,
        [
          sessionId,
          JSON.stringify([]),
          JSON.stringify({}),
          JSON.stringify({ version: "244", created: new Date().toISOString() }),
          "it",
          false,
          false,
          0,
          0,
          "idle",
        ],
      )

      const session = result.rows[0]
      console.log(`✅ Session created: ${sessionId}`)

      return {
        ...session,
        messages: session.messages || [],
        context: session.context || {},
        metadata: session.metadata || {},
      }
    } catch (error) {
      console.error("❌ Error creating session:", error)
      // Return a minimal session instead of throwing
      return {
        id: 0,
        session_id: sessionId,
        messages: [],
        context: {},
        metadata: {},
        language: "it",
        support_mode: false,
        booking_mode: false,
        attempt_count: 0,
        escalation_count: 0,
        processing_status: "idle" as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_activity: new Date().toISOString(),
      }
    }
  }

  async updateSession(sessionId: string, updates: Partial<ChatSession>): Promise<void> {
    try {
      const setClause = []
      const values = []
      let paramIndex = 1

      // Build dynamic update query
      for (const [key, value] of Object.entries(updates)) {
        if (key === "messages" || key === "context" || key === "metadata") {
          setClause.push(`${key} = $${paramIndex}`)
          values.push(JSON.stringify(value))
        } else {
          setClause.push(`${key} = $${paramIndex}`)
          values.push(value)
        }
        paramIndex++
      }

      values.push(sessionId)

      await this.pool.query(
        `
        UPDATE chat_sessions 
        SET ${setClause.join(", ")}
        WHERE session_id = $${paramIndex}
      `,
        values,
      )

      console.log(`✅ Session updated: ${sessionId}`)
    } catch (error) {
      console.error("❌ Error updating session:", error)
      // Don't throw - this is not critical
    }
  }

  async addMessage(sessionId: string, message: ChatMessage): Promise<void> {
    try {
      await this.pool.query(
        `
        UPDATE chat_sessions 
        SET messages = messages || $1::jsonb
        WHERE session_id = $2
      `,
        [JSON.stringify([message]), sessionId],
      )

      console.log(`💬 Message added to session: ${sessionId}`)
    } catch (error) {
      console.error("❌ Error adding message:", error)
      // Don't throw - this is not critical for immediate response
    }
  }

  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    try {
      const result = await this.pool.query("SELECT messages FROM chat_sessions WHERE session_id = $1", [sessionId])

      if (result.rows.length === 0) {
        return []
      }

      return result.rows[0].messages || []
    } catch (error) {
      console.error("❌ Error getting messages:", error)
      return []
    }
  }

  async incrementAttemptCount(sessionId: string): Promise<number> {
    try {
      const result = await this.pool.query(
        `
        UPDATE chat_sessions 
        SET attempt_count = attempt_count + 1
        WHERE session_id = $1
        RETURNING attempt_count
      `,
        [sessionId],
      )

      const newCount = result.rows[0]?.attempt_count || 0
      console.log(`📊 Attempt count incremented: ${sessionId} -> ${newCount}`)
      return newCount
    } catch (error) {
      console.error("❌ Error incrementing attempt count:", error)
      return 0
    }
  }

  async incrementEscalationCount(sessionId: string): Promise<number> {
    try {
      const result = await this.pool.query(
        `
        UPDATE chat_sessions 
        SET escalation_count = escalation_count + 1
        WHERE session_id = $1
        RETURNING escalation_count
      `,
        [sessionId],
      )

      const newCount = result.rows[0]?.escalation_count || 0
      console.log(`🚨 Escalation count incremented: ${sessionId} -> ${newCount}`)
      return newCount
    } catch (error) {
      console.error("❌ Error incrementing escalation count:", error)
      return 0
    }
  }

  async activateSupportMode(sessionId: string): Promise<void> {
    try {
      await this.pool.query(
        `
        UPDATE chat_sessions 
        SET support_mode = true, flow_step = 'support_active'
        WHERE session_id = $1
      `,
        [sessionId],
      )

      console.log(`🔧 Support mode activated: ${sessionId}`)
    } catch (error) {
      console.error("❌ Error activating support mode:", error)
      // Don't throw - this is not critical
    }
  }

  async activateBookingMode(sessionId: string): Promise<void> {
    try {
      await this.pool.query(
        `
        UPDATE chat_sessions 
        SET booking_mode = true, flow_step = 'booking_start'
        WHERE session_id = $1
      `,
        [sessionId],
      )

      console.log(`📅 Booking mode activated: ${sessionId}`)
    } catch (error) {
      console.error("❌ Error activating booking mode:", error)
      // Don't throw - this is not critical
    }
  }

  async cleanupOldSessions(): Promise<number> {
    try {
      const result = await this.pool.query(`
        DELETE FROM chat_sessions 
        WHERE last_activity < CURRENT_TIMESTAMP - INTERVAL '7 days'
      `)

      const deletedCount = result.rowCount || 0
      console.log(`🧹 Cleaned up ${deletedCount} old sessions`)
      return deletedCount
    } catch (error) {
      console.error("❌ Error cleaning up sessions:", error)
      return 0
    }
  }

  async getSessionStats(): Promise<any> {
    try {
      const result = await this.pool.query(`
        SELECT 
          COUNT(*) as total_sessions,
          COUNT(*) FILTER (WHERE support_mode = true) as support_sessions,
          COUNT(*) FILTER (WHERE booking_mode = true) as booking_sessions,
          COUNT(*) FILTER (WHERE processing_status = 'processing') as processing_sessions,
          AVG(attempt_count) as avg_attempts,
          AVG(escalation_count) as avg_escalations
        FROM chat_sessions
        WHERE last_activity > CURRENT_TIMESTAMP - INTERVAL '24 hours'
      `)

      return result.rows[0]
    } catch (error) {
      console.error("❌ Error getting session stats:", error)
      return {}
    }
  }
}
