"use client"

import { ShootingStars } from "@/components/ShootingStars"
import { Starfield } from "@/components/Starfield"

export default function ShootingStarsPage() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Animated starfield background */}
      <Starfield count={120} minDuration={3} maxDuration={10} />

      {/* Shooting stars */}
      <ShootingStars count={4} duration={2} color="#FFF" />

      {/* Info overlay */}
      <div className="absolute bottom-8 left-8 text-white font-mono text-sm pointer-events-none z-50">
        <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Shooting Stars Preview</h2>
          <p>Count: 4 stars</p>
          <p>Duration: 2 seconds</p>
          <p>Color: White</p>
          <p className="mt-2 text-xs opacity-70">Combined with Starfield</p>
        </div>
      </div>
    </div>
  )
}

