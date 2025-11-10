import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "Zoho auth routes are working!",
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    clientId: process.env.ZOHO_CLIENT_ID ? "Set" : "Missing",
  })
}
