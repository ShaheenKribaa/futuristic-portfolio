"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

interface ParticleFieldProps {
  width?: number
  height?: number
  particleCount?: number
  className?: string
  color?: string
}

export function ParticleField({
  width = 800,
  height = 600,
  particleCount = 1000,
  className,
  color = "#00ffff",
}: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const frameRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    rendererRef.current = renderer

    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create particle system
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Velocity
      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02

      // Color variation
      const baseColor = new THREE.Color(color)
      const hsl = { h: 0, s: 0, l: 0 }
      baseColor.getHSL(hsl)

      const newColor = new THREE.Color()
      newColor.setHSL(hsl.h + (Math.random() - 0.5) * 0.1, hsl.s, hsl.l + (Math.random() - 0.5) * 0.3)

      colors[i * 3] = newColor.r
      colors[i * 3 + 1] = newColor.g
      colors[i * 3 + 2] = newColor.b

      // Size
      sizes[i] = Math.random() * 0.5 + 0.5
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    // Particle material with shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: window.devicePixelRatio },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 velocity;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          
          vec3 pos = position;
          pos += velocity * time * 10.0;
          
          // Wrap around boundaries
          pos.x = mod(pos.x + 10.0, 20.0) - 10.0;
          pos.y = mod(pos.y + 10.0, 20.0) - 10.0;
          pos.z = mod(pos.z + 10.0, 20.0) - 10.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    camera.position.z = 10

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Update shader uniforms
      material.uniforms.time.value = time

      // Rotate camera around the scene
      camera.position.x = Math.cos(time * 0.1) * 10
      camera.position.z = Math.sin(time * 0.1) * 10
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [width, height, particleCount, color])

  return <div ref={mountRef} className={className} />
}
