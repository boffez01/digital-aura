"use client"
import { useState, useEffect, useRef } from "react"

export default function HeroBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let effect: any = null

    const initVanta = async () => {
      if (typeof window !== "undefined" && vantaRef.current && !vantaEffect) {
        try {
          // Dynamically import THREE and VANTA
          const THREE = await import("three")
          const { default: NET } = await import("vanta/dist/vanta.net.min.js")

          effect = NET({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x22d3ee, // Cyan 400
            backgroundColor: 0x0f172a, // Slate 900
            points: 15.0,
            maxDistance: 23.0,
            spacing: 18.0,
            showDots: true,
            backgroundAlpha: 0.0,
          })

          setVantaEffect(effect)
        } catch (error) {
          console.log("Vanta effect could not be loaded:", error)
        }
      }
    }

    const timer = setTimeout(initVanta, 100)

    return () => {
      clearTimeout(timer)
      if (effect) {
        try {
          effect.destroy()
        } catch (error) {
          console.log("Error destroying Vanta effect:", error)
        }
      }
    }
  }, [vantaEffect])

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-0 w-full h-full"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    />
  )
}
