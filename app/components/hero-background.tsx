"use client"

import { useEffect, useRef } from "react"

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Imposta le dimensioni del canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Parametri dell'animazione Fibonacci
    let time = 0
    const centerX = canvas.offsetWidth / 2
    const centerY = canvas.offsetHeight / 2
    const goldenRatio = 1.618033988749
    const maxRadius = Math.min(centerX, centerY) * 0.8

    const animate = () => {
      // Pulisci il canvas
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Disegna la spirale Fibonacci
      const numPoints = 200
      const rotationSpeed = 0.01

      for (let i = 0; i < numPoints; i++) {
        // Calcola l'angolo usando la spirale di Fibonacci
        const angle = i * goldenRatio + time * rotationSpeed
        const radius = (i / numPoints) * maxRadius

        // Posizione del punto
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        // Calcola l'opacità basata sulla distanza dal centro
        const opacity = Math.max(0, 1 - radius / maxRadius)

        // Calcola la dimensione del punto
        const pointSize = 2 + opacity * 3

        // Colore dorato con gradiente
        const hue = 45 + (i / numPoints) * 30 // Da giallo a arancione
        const saturation = 80 + opacity * 20
        const lightness = 50 + opacity * 30

        ctx.beginPath()
        ctx.arc(x, y, pointSize, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`
        ctx.fill()

        // Aggiungi un effetto glow
        ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity * 0.5})`
        ctx.shadowBlur = pointSize * 2
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Aggiungi linee di connessione sottili
      ctx.strokeStyle = "rgba(255, 215, 0, 0.1)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < numPoints - 1; i++) {
        const angle1 = i * goldenRatio + time * rotationSpeed
        const radius1 = (i / numPoints) * maxRadius
        const x1 = centerX + Math.cos(angle1) * radius1
        const y1 = centerY + Math.sin(angle1) * radius1

        const angle2 = (i + 1) * goldenRatio + time * rotationSpeed
        const radius2 = ((i + 1) / numPoints) * maxRadius
        const x2 = centerX + Math.cos(angle2) * radius2
        const y2 = centerY + Math.sin(angle2) * radius2

        if (Math.abs(radius2 - radius1) < maxRadius * 0.1) {
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      }

      time += 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)" }}
    />
  )
}
