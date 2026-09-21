import React, { useRef, useEffect } from 'react'

export default function InteractiveBackdrop() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Handle Window Resize
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    };
    window.addEventListener('resize', handleResize)

    // Handle Mouse Move to influence blobs
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
    };
    window.addEventListener('mousemove', handleMouseMove)

    // Defining organic blob objects
    const blobs = [
      {
        x: width * 0.2,
        y: height * 0.3,
        radius: Math.min(width, height) * 0.35,
        vx: 0.6,
        vy: 0.4,
        color1: 'rgba(16, 185, 129, 0.25)', // Liquid Green
        color2: 'rgba(245, 158, 11, 0.05)',  // Radiant Yellow
      },
      {
        x: width * 0.8,
        y: height * 0.2,
        radius: Math.min(width, height) * 0.4,
        vx: -0.4,
        vy: 0.7,
        color1: 'rgba(220, 38, 38, 0.2)',    // Fiery Crimson
        color2: 'rgba(234, 88, 12, 0.05)',   // Reactive Amber
      },
      {
        x: width * 0.5,
        y: height * 0.7,
        radius: Math.min(width, height) * 0.45,
        vx: 0.5,
        vy: -0.5,
        color1: 'rgba(8, 145, 178, 0.22)',   // Cyber Teal
        color2: 'rgba(49, 46, 129, 0.05)',   // Deep Indigo
      },
      {
        x: width * 0.3,
        y: height * 0.8,
        radius: Math.min(width, height) * 0.3,
        vx: -0.5,
        vy: 0.3,
        color1: 'rgba(219, 39, 119, 0.18)',  // Cosmic Pink
        color2: 'rgba(245, 158, 11, 0.05)',  // Yellow
      }
    ]

    // Animation Loop
    const render = () => {
      // Clear canvas with base background color matching cream-light
      ctx.fillStyle = '#FAF9F6'
      ctx.fillRect(0, 0, width, height)

      // Smooth interpolation of mouse positions
      const mouse = mouseRef.current
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Draw and update blobs
      blobs.forEach((blob, idx) => {
        // Move blobs
        blob.x += blob.vx
        blob.y += blob.vy

        // Boundaries check and organic bounce
        if (blob.x - blob.radius < -100 || blob.x + blob.radius > width + 100) {
          blob.vx *= -1
        }
        if (blob.y - blob.radius < -100 || blob.y + blob.radius > height + 100) {
          blob.vy *= -1
        }

        // Draw radial gradient representing 3D fluid lighting
        // Mouse coordinates warp the center of gradient slightly
        const dx = (mouse.x - width / 2) * 0.1
        const dy = (mouse.y - height / 2) * 0.1
        const gradX = blob.x + dx * (idx === 0 ? 1 : idx === 1 ? -1.2 : 0.8)
        const gradY = blob.y + dy * (idx === 0 ? -0.8 : idx === 1 ? 1 : -0.7)

        const gradient = ctx.createRadialGradient(
          gradX,
          gradY,
          blob.radius * 0.05,
          blob.x,
          blob.y,
          blob.radius
        )

        gradient.addColorStop(0, blob.color1)
        gradient.addColorStop(1, blob.color2)

        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-30 pointer-events-none w-screen h-screen overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block filter blur-[70px] sm:blur-[110px]"
      />
      {/* Optional frosted overlay to bind sections together */}
      <div className="absolute inset-0 bg-cream-light/35 backdrop-blur-[1px] pointer-events-none" />
    </div>
  )
}
