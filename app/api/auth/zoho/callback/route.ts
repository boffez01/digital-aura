import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Zoho OAuth endpoints per il dominio europeo
const ZOHO_TOKEN_URL = "https://accounts.zoho.eu/oauth/v2/token"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    console.error("[v0] Zoho OAuth error:", error)
    return NextResponse.redirect(new URL(`/admin?error=oauth_failed&details=${error}`, request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL("/admin?error=missing_code", request.url))
  }

  try {
    const tokenResponse = await fetch(ZOHO_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        code: code,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/zoho/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error("[v0] Zoho token exchange failed:", errorData)
      throw new Error("TOKEN_EXCHANGE_FAILED")
    }

    const tokenData = await tokenResponse.json()

    await sql`
      INSERT INTO zoho_tokens (
        access_token, 
        refresh_token, 
        expires_at, 
        created_at
      ) VALUES (
        ${tokenData.access_token},
        ${tokenData.refresh_token},
        NOW() + INTERVAL '${tokenData.expires_in} seconds',
        NOW()
      )
      ON CONFLICT (id) 
      DO UPDATE SET
        access_token = EXCLUDED.access_token,
        refresh_token = EXCLUDED.refresh_token,
        expires_at = EXCLUDED.expires_at,
        updated_at = NOW()
    `

    console.log("[v0] Zoho OAuth tokens saved successfully")

    return NextResponse.redirect(new URL("/admin?oauth=success", request.url))
  } catch (error) {
    console.error("[v0] Zoho OAuth callback error:", error)
    return NextResponse.redirect(new URL("/admin?error=oauth_callback_failed", request.url))
  }
}
