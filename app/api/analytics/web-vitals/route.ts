import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const metric = await request.json()

    // Log the metric (in production, send to analytics service)
    console.log("[v0] Web Vital received:", metric.name, metric.value)

    // Here you can send to your analytics service
    // Example: await sendToGoogleAnalytics(metric)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error processing web vital:", error)
    return NextResponse.json({ error: "Failed to process metric" }, { status: 500 })
  }
}
