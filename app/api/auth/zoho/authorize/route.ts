import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const workspace = searchParams.get("workspace") || "english" // Added workspace parameter

    const clientId = process.env.ZOHO_CLIENT_ID
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    if (!clientId) {
      return NextResponse.json({ error: "ZOHO_CLIENT_ID not configured" }, { status: 500 })
    }

    if (!baseUrl) {
      return NextResponse.json({ error: "NEXT_PUBLIC_BASE_URL not configured" }, { status: 500 })
    }

    const redirectUri = `${baseUrl}/api/auth/zoho/callback?workspace=${workspace}`

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
    authUrl.searchParams.set("state", workspace) // Store workspace in state

    console.log(`[v0] Redirecting to Zoho OAuth for ${workspace} workspace:`, authUrl.toString())

    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error("[v0] Error in Zoho authorize route:", error)
    return NextResponse.json(
      { error: "Failed to initiate OAuth flow", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
