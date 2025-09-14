"use client"

import { useEffect, useRef } from "react"

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Fibonacci spiral animation
    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw animated fibonacci spiral
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let i = 0; i < 200; i++) {
        const angle = i * 0.1 + time * 0.01
        const radius = Math.sqrt(i) * 8
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()

      // Draw floating particles
      for (let i = 0; i < 50; i++) {
        const x = centerX + Math.cos(time * 0.005 + i) * (100 + i * 5)
        const y = centerY + Math.sin(time * 0.003 + i) * (80 + i * 3)

        ctx.fillStyle = `rgba(59, 130, 246, ${0.1 + Math.sin(time * 0.01 + i) * 0.1})`
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      time++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)" }}
    />
  )
}
