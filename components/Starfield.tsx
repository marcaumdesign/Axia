"use client"

import { useState, useEffect } from "react"

interface StarfieldProps {
  count?: number
  minDuration?: number
  maxDuration?: number
}

interface Star {
  id: number
  left: string
  top: string
  size: number
  duration: number
  delay: number
}

export function Starfield({ count = 120, minDuration = 3, maxDuration = 10 }: StarfieldProps) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const durations = [minDuration, (minDuration + maxDuration) / 2, maxDuration]
    const generatedStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      size: Math.random() * 1.5 + 0.5, // 0.5px to 2px
      duration: durations[Math.floor(Math.random() * durations.length)],
      delay: Math.random() * 2, // Random delay for variation
    }))
    setStars(generatedStars)
  }, [count, minDuration, maxDuration])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            willChange: "opacity, transform",
          }}
        />
      ))}
    </div>
  )
}

