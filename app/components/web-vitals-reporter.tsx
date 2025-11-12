"use client"

import { useEffect } from "react"
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from "web-vitals"
import { sendToAnalytics } from "../lib/web-vitals"

export function WebVitalsReporter() {
  useEffect(() => {
    // Report all Web Vitals
    onCLS(sendToAnalytics)
    onFID(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
    onINP(sendToAnalytics)
  }, [])

  return null
}
