import { type NextRequest, NextResponse } from "next/server"

// Zoho OAuth authorization endpoint per il dominio europeo
const ZOHO_AUTH_URL = "https://accounts.zoho.eu/oauth/v2/auth"

export async function GET(request: NextRequest) {
  const authUrl = new URL(ZOHO_AUTH_URL)

  authUrl.searchParams.append("client_id", process.env.ZOHO_CLIENT_ID!)
  authUrl.searchParams.append("response_type", "code")
  authUrl.searchParams.append("scope", "ZohoBookings.fullaccess.all,ZohoCRM.modules.ALL")
  authUrl.searchParams.append("redirect_uri", `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/zoho/callback`)
  authUrl.searchParams.append("access_type", "offline")
  authUrl.searchParams.append("prompt", "consent")

  console.log("[v0] Redirecting to Zoho OAuth:", authUrl.toString())

  return NextResponse.redirect(authUrl.toString())
}
