import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (error) {
      console.error("[v0] OAuth error:", error)
      return NextResponse.json({ error: "OAuth authorization failed", details: error }, { status: 400 })
    }

    if (!code) {
      return NextResponse.json({ error: "No authorization code received" }, { status: 400 })
    }

    const clientId = process.env.ZOHO_CLIENT_ID
    const clientSecret = process.env.ZOHO_CLIENT_SECRET
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const databaseUrl = process.env.DATABASE_URL

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Zoho credentials not configured" }, { status: 500 })
    }

    if (!baseUrl) {
      return NextResponse.json({ error: "NEXT_PUBLIC_BASE_URL not configured" }, { status: 500 })
    }

    const redirectUri = `${baseUrl}/api/auth/zoho/callback`

    const tokenResponse = await fetch("https://accounts.zoho.eu/oauth/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: code,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("[v0] Token exchange failed:", errorText)
      return NextResponse.json(
        { error: "Failed to exchange code for tokens", details: errorText },
        { status: tokenResponse.status },
      )
    }

    const tokens = await tokenResponse.json()

    if (databaseUrl) {
      try {
        const sql = neon(databaseUrl)
        const expiresAt = new Date(Date.now() + tokens.expires_in * 1000)

        await sql`
          INSERT INTO zoho_tokens (service, access_token, refresh_token, expires_at)
          VALUES ('bookings', ${tokens.access_token}, ${tokens.refresh_token}, ${expiresAt.toISOString()})
          ON CONFLICT (service) 
          DO UPDATE SET 
            access_token = ${tokens.access_token},
            refresh_token = ${tokens.refresh_token},
            expires_at = ${expiresAt.toISOString()},
            updated_at = NOW()
        `

        console.log("[v0] Tokens saved to database successfully")
      } catch (dbError) {
        console.error("[v0] Failed to save tokens to database:", dbError)
      }
    }

    return new NextResponse(
      `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Authorization Successful</title>
            <style>
              body {
                font-family: system-ui, -apple-system, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
              .container {
                background: white;
                padding: 3rem;
                border-radius: 1rem;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                text-align: center;
                max-width: 500px;
              }
              h1 { color: #667eea; margin-bottom: 1rem; }
              p { color: #666; line-height: 1.6; }
              .success-icon { font-size: 4rem; margin-bottom: 1rem; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success-icon">✅</div>
              <h1>Authorization Successful!</h1>
              <p>Your Zoho Bookings integration has been configured successfully.</p>
              <p>You can now close this window and return to your application.</p>
            </div>
          </body>
        </html>
      `,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Error in Zoho callback route:", error)
    return NextResponse.json(
      { error: "Failed to process OAuth callback", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
