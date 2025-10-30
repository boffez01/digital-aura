"use server"

import { z } from "zod"

const emailSchema = z.string().email()

// Zoho OAuth credentials (from environment variables)
const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID || "1000.WJB9IPERDUU33L1E9UVFMB2D5ODNHN"
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET || "e732199b69fe928ccf677f4332b03d1f31df0f126a"
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN || ""

const ZOHO_ACCOUNTS_URL = "https://accounts.zoho.eu/oauth/v2/token"
const ZOHO_CAMPAIGNS_URL = "https://campaigns.zoho.eu/api/v1.1"

// Cache for access token (in production, use Redis or database)
let cachedAccessToken: string | null = null
let tokenExpiresAt = 0

async function getAccessToken(): Promise<string> {
  console.log("[v0] Zoho Token: Checking access token...")

  // Check if we have a valid cached token
  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    console.log(
      "[v0] Zoho Token: Using cached token (valid for",
      Math.floor((tokenExpiresAt - Date.now()) / 1000 / 60),
      "more minutes)",
    )
    return cachedAccessToken
  }

  console.log("[v0] Zoho Token: Cached token expired or missing, refreshing...")

  // Validate refresh token exists
  if (!ZOHO_REFRESH_TOKEN) {
    console.error("[v0] Zoho Token: ZOHO_REFRESH_TOKEN environment variable is not set")
    throw new Error("Zoho refresh token not configured. Please add ZOHO_REFRESH_TOKEN to environment variables.")
  }

  // Get a new access token using refresh token
  const params = new URLSearchParams({
    refresh_token: ZOHO_REFRESH_TOKEN,
    client_id: ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    grant_type: "refresh_token",
  })

  try {
    const response = await fetch(ZOHO_ACCOUNTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Zoho Token: Failed to refresh token. Status:", response.status, "Response:", errorText)
      throw new Error(`Failed to get access token from Zoho: ${response.status} ${errorText}`)
    }

    const data = await response.json()

    if (!data.access_token) {
      console.error("[v0] Zoho Token: No access_token in response:", data)
      throw new Error("Invalid response from Zoho OAuth: missing access_token")
    }

    cachedAccessToken = data.access_token
    // Token expires in 1 hour, cache for 55 minutes to be safe
    tokenExpiresAt = Date.now() + 55 * 60 * 1000

    console.log("[v0] Zoho Token: Successfully refreshed access token (valid for 55 minutes)")
    return cachedAccessToken
  } catch (error) {
    console.error("[v0] Zoho Token: Error during token refresh:", error)
    throw error
  }
}

export async function subscribeToNewsletter(email: string) {
  try {
    // Validate email
    const validatedEmail = emailSchema.parse(email)

    // Get access token
    const accessToken = await getAccessToken()

    // Add subscriber to Zoho Campaigns
    // You'll need to replace 'YOUR_LIST_KEY' with your actual mailing list key
    const listKey = process.env.ZOHO_LIST_KEY || "YOUR_LIST_KEY"

    const response = await fetch(
      `${ZOHO_CAMPAIGNS_URL}/json/listsubscribe?resfmt=JSON&listkey=${listKey}&contactinfo={"Contact Email":"${validatedEmail}"}`,
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Zoho API error:", errorData)
      throw new Error("Failed to subscribe to newsletter")
    }

    const data = await response.json()

    if (data.status === "success" || data.code === "0") {
      return { success: true, message: "Successfully subscribed to newsletter" }
    } else {
      throw new Error(data.message || "Failed to subscribe")
    }
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)

    if (error instanceof z.ZodError) {
      return { success: false, message: "Invalid email address" }
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to subscribe to newsletter",
    }
  }
}
