"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Custom shader material for advanced effects
const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    // Low-frequency motion for smooth blobs
    float n = sin(uv.x * 3.0 + time * 0.25) * cos(uv.y * 2.5 + time * 0.2);
    n = n * 0.5 + 0.5; // 0..1
    
    // Moving highlight similar to reference
    vec2 center = vec2(0.72 + sin(time * 0.08) * 0.05, 0.28 + cos(time * 0.06) * 0.05);
    float glow = 1.0 - length(uv - center) * 1.6;
    glow = smoothstep(0.0, 1.0, clamp(glow, 0.0, 1.0));
    
    // Combine grayscale only (no hue)
    float shade = clamp(n * 0.35 + glow, 0.0, 1.0);
    vec3 color = vec3(shade);
    
    gl_FragColor = vec4(color, 1.0);
  }
`

export function ShaderPlane({
  position,
  color1 = "#000000",
  color2 = "#ffffff",
}: {
  position: [number, number, number]
  color1?: string
  color2?: string
}) {
  const mesh = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    }),
    [color1, color2],
  )

  useFrame((state) => {
    if (mesh.current) {
      uniforms.time.value = state.clock.elapsedTime
      uniforms.intensity.value = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export function EnergyRing({
  radius = 1,
  position = [0, 0, 0],
}: {
  radius?: number
  position?: [number, number, number]
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.elapsedTime
      // @ts-ignore
      mesh.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <ringGeometry args={[radius * 0.8, radius, 32]} />
      <meshBasicMaterial color="#ff5722" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  )
}


