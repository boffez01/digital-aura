"use client"

import { useState, useEffect, useRef } from "react"

export default function HeroBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    let effect: any = null

    const initVanta = async () => {
      if (typeof window !== "undefined" && vantaRef.current && !vantaEffect) {
        try {
          // Import dinamico corretto per Next.js
          const [THREE, VANTA] = await Promise.all([import("three"), import("vanta/dist/vanta.net.min.js")])

          effect = (VANTA as any).default({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x22d3ee, // Cyan per le linee
            backgroundColor: 0x0f172a, // Slate 900 sfondo
            points: 15.0,
            maxDistance: 23.0,
            spacing: 18.0,
            showDots: true,
            backgroundAlpha: 0.0,
          })

          setVantaEffect(effect)
        } catch (error) {
          console.log("Vanta effect could not be loaded, using fallback:", error)
          // Fallback con CSS puro se Vanta non carica
          if (vantaRef.current) {
            vantaRef.current.style.background = "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
          }
        }
      }
    }

    // Inizializza dopo che il DOM è pronto
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
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      }}
    />
  )
}
