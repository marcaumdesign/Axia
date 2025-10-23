"use client"

import { useState, useEffect } from "react"

interface ShootingStarsProps {
  count?: number
  minInterval?: number
  maxInterval?: number
  duration?: number
  color?: string
  angle?: number
}

interface Star {
  id: number
  x: number
  y: number
  angle: number
}

export function ShootingStars({
  count = 3,
  minInterval = 3000,
  maxInterval = 10000,
  duration = 1.5,
  color = "white",
  angle = 25,
}: ShootingStarsProps) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    let starId = 0

    const createShootingStar = () => {
      // Check if we've reached the maximum count
      setStars((prev) => {
        if (prev.length >= count) {
          return prev
        }

        const newStar: Star = {
          id: starId++,
          x: Math.random() * 80 + 10, // 10% to 90% from left
          y: Math.random() * 30, // Top 30% of screen
          angle: Math.random() * angle * 2 - angle, // -angle to +angle degrees
        }

        // Remove star after animation completes
        setTimeout(() => {
          setStars((current) => current.filter((star) => star.id !== newStar.id))
        }, duration * 1000)

        return [...prev, newStar]
      })
    }

    const scheduleNext = () => {
      const randomInterval = Math.random() * (maxInterval - minInterval) + minInterval
      return setTimeout(() => {
        createShootingStar()
        scheduleNext()
      }, randomInterval)
    }

    // Create initial star
    createShootingStar()

    // Schedule subsequent stars
    const timeoutId = scheduleNext()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [count, minInterval, maxInterval, duration, angle])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes shooting-star-move {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(500px) scale(0.7);
          }
        }

        .shooting-star-wrapper {
          position: absolute;
          will-change: transform;
        }

        .shooting-star {
          position: relative;
          width: 1.5px;
          height: 1.5px;
          border-radius: 50%;
          background: ${color};
          box-shadow: 0 0 4px ${color};
          will-change: transform, opacity, box-shadow;
        }

        .shooting-star::after {
          content: "";
          position: absolute;
          right: 100%;
          top: 0;
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${color});
          opacity: 0.6;
          filter: blur(0.8px);
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star-wrapper"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            transform: `rotate(${star.angle + 45}deg)`,
          }}
        >
          <div
            className="shooting-star"
            style={{
              animation: `shooting-star-move ${duration}s ease-out forwards`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

