import { useEffect, useRef } from 'react'

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'
    const fontSize = 14
    let columns = 0
    let drops: number[] = []

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      columns = Math.floor(canvas!.width / fontSize)

      // Preserve existing drops, initialize new ones
      const newDrops = new Array(columns).fill(0)
      for (let i = 0; i < Math.min(drops.length, columns); i++) {
        newDrops[i] = drops[i]
      }
      drops = newDrops
    }

    resize()

    let animationId: number
    let lastTime = 0
    const interval = 35 // ~29fps

    function draw(timestamp: number) {
      animationId = requestAnimationFrame(draw)

      // Throttle to target fps
      if (timestamp - lastTime < interval) return
      lastTime = timestamp

      ctx!.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

      ctx!.fillStyle = '#FFFFFF'
      ctx!.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx!.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    animationId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.3,
        pointerEvents: 'none',
      }}
    />
  )
}

export default MatrixRain