import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface ChatSession {
  session_id: string
  booking_mode: boolean
  flow_step?: string | null
  booking_data?: any
  created_at: string
  updated_at: string
  support_mode?: boolean
  attempt_count?: number
  escalation_count?: number
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
      // Build update object for tagged template
      const updateData: any = {
        session_id: sessionId,
      }

      if (updates.booking_mode !== undefined) {
        updateData.booking_mode = updates.booking_mode
      }
      if (updates.flow_step !== undefined) {
        updateData.flow_step = updates.flow_step
      }
      if (updates.booking_data !== undefined) {
        updateData.booking_data = updates.booking_data
      }

      // Perform update using tagged template
      const result = await sql`
        UPDATE chat_sessions 
        SET 
          booking_mode = COALESCE(${updateData.booking_mode}, booking_mode),
          flow_step = COALESCE(${updateData.flow_step}, flow_step),
          booking_data = COALESCE(${updateData.booking_data ? JSON.stringify(updateData.booking_data) : null}::jsonb, booking_data),
          updated_at = NOW()
        WHERE session_id = ${sessionId}
        RETURNING *
      `

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

  async activateSupportMode(sessionId: string): Promise<void> {
    try {
      await sql`
        UPDATE chat_sessions 
        SET support_mode = true, updated_at = NOW()
        WHERE session_id = ${sessionId}
      `
      console.log(`🔧 Support mode activated for session: ${sessionId}`)
    } catch (error) {
      console.error(`❌ Error activating support mode for ${sessionId}:`, error)
    }
  }

  async incrementAttemptCount(sessionId: string): Promise<number> {
    try {
      const result = await sql`
        UPDATE chat_sessions 
        SET attempt_count = COALESCE(attempt_count, 0) + 1, updated_at = NOW()
        WHERE session_id = ${sessionId}
        RETURNING attempt_count
      `
      const attemptCount = result[0]?.attempt_count || 1
      console.log(`📊 Attempt count for ${sessionId}: ${attemptCount}`)
      return attemptCount
    } catch (error) {
      console.error(`❌ Error incrementing attempt count for ${sessionId}:`, error)
      return 1
    }
  }

  async incrementEscalationCount(sessionId: string): Promise<number> {
    try {
      const result = await sql`
        UPDATE chat_sessions 
        SET escalation_count = COALESCE(escalation_count, 0) + 1, updated_at = NOW()
        WHERE session_id = ${sessionId}
        RETURNING escalation_count
      `
      const escalationCount = result[0]?.escalation_count || 1
      console.log(`🚨 Escalation count for ${sessionId}: ${escalationCount}`)
      return escalationCount
    } catch (error) {
      console.error(`❌ Error incrementing escalation count for ${sessionId}:`, error)
      return 1
    }
  }

  async activateBookingMode(sessionId: string): Promise<void> {
    try {
      await sql`
        UPDATE chat_sessions 
        SET booking_mode = true, flow_step = 'date_selection', updated_at = NOW()
        WHERE session_id = ${sessionId}
      `
      console.log(`📅 Booking mode activated for session: ${sessionId}`)
    } catch (error) {
      console.error(`❌ Error activating booking mode for ${sessionId}:`, error)
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
