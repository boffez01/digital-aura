import { type NextRequest, NextResponse } from "next/server"

// Zoho OAuth authorization endpoint per il dominio europeo
const ZOHO_AUTH_URL = "https://accounts.zoho.eu/oauth/v2/auth"

export async function GET(request: NextRequest) {
  try {
    if (!process.env.ZOHO_CLIENT_ID) {
      return NextResponse.json({ error: "ZOHO_CLIENT_ID not configured" }, { status: 500 })
    }

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      return NextResponse.json({ error: "NEXT_PUBLIC_BASE_URL not configured" }, { status: 500 })
    }

    const authUrl = new URL(ZOHO_AUTH_URL)

    authUrl.searchParams.append("client_id", process.env.ZOHO_CLIENT_ID)
    authUrl.searchParams.append("response_type", "code")
    authUrl.searchParams.append("scope", "ZohoBookings.fullaccess.all,ZohoCRM.modules.ALL")
    authUrl.searchParams.append("redirect_uri", `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/zoho/callback`)
    authUrl.searchParams.append("access_type", "offline")
    authUrl.searchParams.append("prompt", "consent")

    console.log("[v0] Zoho OAuth URL:", authUrl.toString())

    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error("[v0] Error in Zoho authorize route:", error)
    return NextResponse.json({ error: "Failed to initialize OAuth flow", details: String(error) }, { status: 500 })
  }
}
