import { NextResponse } from "next/server"

export async function GET() {
  try {
    const clientId = process.env.ZOHO_CLIENT_ID
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    if (!clientId) {
      return NextResponse.json({ error: "ZOHO_CLIENT_ID not configured" }, { status: 500 })
    }

    if (!baseUrl) {
      return NextResponse.json({ error: "NEXT_PUBLIC_BASE_URL not configured" }, { status: 500 })
    }

    const redirectUri = `${baseUrl}/api/auth/zoho/callback`

    const scope = [
      "AaaServer.profile.READ",
      "ZohoBookings.appointments.CREATE",
      "ZohoBookings.appointments.READ",
      "ZohoBookings.slots.READ",
    ].join(",")

    const authUrl = new URL("https://accounts.zoho.eu/oauth/v2/auth")
    authUrl.searchParams.set("client_id", clientId)
    authUrl.searchParams.set("response_type", "code")
    authUrl.searchParams.set("redirect_uri", redirectUri)
    authUrl.searchParams.set("scope", scope)
    authUrl.searchParams.set("access_type", "offline")
    authUrl.searchParams.set("prompt", "consent")

    console.log("[v0] Redirecting to Zoho OAuth:", authUrl.toString())

    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error("[v0] Error in Zoho authorize route:", error)
    return NextResponse.json(
      { error: "Failed to initiate OAuth flow", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
