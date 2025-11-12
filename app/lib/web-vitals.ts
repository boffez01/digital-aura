import type { Metric } from "web-vitals"

export function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[v0] Web Vital:", metric.name, metric.value)
  }

  // Send to analytics in production
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    })

    // Use sendBeacon if available for better reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/web-vitals", body)
    } else {
      fetch("/api/analytics/web-vitals", {
        body,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        keepalive: true,
      }).catch(console.error)
    }
  }
}
