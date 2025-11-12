import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export const dynamic = "force-dynamic"
export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const error = searchParams.get("error")
    const state = searchParams.get("state") || "english" // Get workspace from state
    const workspace = searchParams.get("workspace") || state // Support both methods

    console.log(`[v0] OAuth callback for ${workspace} workspace`)

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

    const redirectUri = `${baseUrl}/api/auth/zoho/callback?workspace=${workspace}`

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

    let organizationId = "unknown"
    try {
      const profileResponse = await fetch("https://accounts.zoho.eu/oauth/user/info", {
        headers: {
          Authorization: `Zoho-oauthtoken ${tokens.access_token}`,
        },
      })

      if (profileResponse.ok) {
        const profile = await profileResponse.json()
        console.log("[v0] Zoho user profile:", profile)
        organizationId = profile.ZGID || profile.organization_id || "unknown"
      }
    } catch (profileError) {
      console.error("[v0] Failed to get organization ID:", profileError)
    }

    if (databaseUrl) {
      try {
        const sql = neon(databaseUrl)
        const expiresAt = new Date(Date.now() + tokens.expires_in * 1000)
        const service = workspace === "italian" ? "bookings_italian" : "bookings"

        await sql`
          INSERT INTO zoho_tokens (service, access_token, refresh_token, expires_at)
          VALUES (${service}, ${tokens.access_token}, ${tokens.refresh_token}, ${expiresAt.toISOString()})
          ON CONFLICT (service) 
          DO UPDATE SET 
            access_token = ${tokens.access_token},
            refresh_token = ${tokens.refresh_token},
            expires_at = ${expiresAt.toISOString()},
            updated_at = NOW()
        `

        console.log(`[v0] Tokens saved to database for ${workspace} workspace (service: ${service})`)
        console.log(`[v0] Organization ID for ${workspace}: ${organizationId}`)
      } catch (dbError) {
        console.error("[v0] Failed to save tokens to database:", dbError)
      }
    }

    const successPage =
      workspace === "italian"
        ? `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Autorizzazione Workspace Italiano Completata</title>
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
                max-width: 600px;
              }
              h1 { color: #667eea; margin-bottom: 1rem; }
              p { color: #666; line-height: 1.6; margin-bottom: 1rem; }
              .success-icon { font-size: 4rem; margin-bottom: 1rem; }
              .info-box {
                background: #f0f9ff;
                border: 2px solid #3b82f6;
                border-radius: 0.5rem;
                padding: 1rem;
                margin-top: 1.5rem;
                text-align: left;
              }
              code {
                background: #e5e7eb;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-family: monospace;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success-icon">✅</div>
              <h1>Workspace Italiano Configurato!</h1>
              <p>L'integrazione con il workspace italiano di Zoho Bookings è stata completata con successo.</p>
              <div class="info-box">
                <strong>Organization ID rilevato:</strong><br/>
                <code>${organizationId}</code>
                <br/><br/>
                <strong>IMPORTANTE:</strong> Copia questo Organization ID e aggiungilo come variabile d'ambiente:
                <br/>
                <code>ZOHO_ORGANIZATION_ID_IT=${organizationId}</code>
              </div>
              <p style="margin-top: 1.5rem;">
                Ora il sistema userà automaticamente il workspace italiano quando la lingua è impostata su italiano.
              </p>
              <p>Puoi chiudere questa finestra.</p>
            </div>
          </body>
        </html>
      `
        : `
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
      `

    return new NextResponse(successPage, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    })
  } catch (error) {
    console.error("[v0] Error in Zoho callback route:", error)
    return NextResponse.json(
      { error: "Failed to process OAuth callback", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
