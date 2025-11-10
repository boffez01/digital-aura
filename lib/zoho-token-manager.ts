import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

const ZOHO_TOKEN_URL = "https://accounts.zoho.eu/oauth/v2/token"

interface ZohoTokens {
  accessToken: string
  refreshToken: string
  expiresAt: Date
}

export class ZohoTokenManager {
  public async getValidAccessToken(): Promise<string> {
    try {
      const tokenResult = await sql`
        SELECT access_token, refresh_token, expires_at
        FROM zoho_tokens
        WHERE id = 1
        LIMIT 1
      `

      if (tokenResult.length === 0) {
        console.log("[v0] No tokens in DB, using env REFRESH_TOKEN")
        return await this.refreshTokenFromEnv()
      }

      const token = tokenResult[0]
      const now = new Date()
      const expiresAt = new Date(token.expires_at)

      if (expiresAt > now) {
        return token.access_token
      }

      console.log("[v0] Token expired, refreshing...")
      return await this.refreshToken(token.refresh_token)
    } catch (error) {
      console.error("[v0] Error getting valid access token:", error)
      return await this.refreshTokenFromEnv()
    }
  }

  private async refreshToken(refreshToken: string): Promise<string> {
    const response = await fetch(ZOHO_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        refresh_token: refreshToken,
      }),
    })

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`)
    }

    const data = await response.json()

    await sql`
      UPDATE zoho_tokens
      SET 
        access_token = ${data.access_token},
        expires_at = NOW() + INTERVAL '${data.expires_in} seconds',
        updated_at = NOW()
      WHERE id = 1
    `

    return data.access_token
  }

  private async refreshTokenFromEnv(): Promise<string> {
    if (!process.env.ZOHO_REFRESH_TOKEN) {
      throw new Error("ZOHO_REFRESH_TOKEN not found in environment variables")
    }

    const response = await fetch(ZOHO_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
      }),
    })

    if (!response.ok) {
      throw new Error(`Token refresh from env failed: ${response.status}`)
    }

    const data = await response.json()
    return data.access_token
  }
}
