"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

interface HolographicTextProps {
  text: string
  width?: number
  height?: number
  className?: string
  fontSize?: number
  color?: string
}

export function HolographicText({
  text,
  width = 400,
  height = 200,
  className,
  fontSize = 0.5,
  color = "#00ffff",
}: HolographicTextProps) {
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

    // Create text using canvas texture
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")!
    canvas.width = 512
    canvas.height = 256

    context.fillStyle = "transparent"
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.font = `bold ${fontSize * 100}px 'Courier New', monospace`
    context.fillStyle = color
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    // Add glow effect
    context.shadowColor = color
    context.shadowBlur = 20
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true

    // Create text plane
    const geometry = new THREE.PlaneGeometry(4, 2)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        time: { value: 0 },
        opacity: { value: 0.9 },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          vUv = uv;
          
          vec3 pos = position;
          pos.z += sin(time * 2.0 + position.x * 3.0) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float time;
        uniform float opacity;
        varying vec2 vUv;
        
        void main() {
          vec4 texColor = texture2D(map, vUv);
          
          // Add holographic distortion
          vec2 distortedUv = vUv;
          distortedUv.x += sin(time * 3.0 + vUv.y * 10.0) * 0.01;
          distortedUv.y += cos(time * 2.0 + vUv.x * 8.0) * 0.01;
          
          vec4 distortedColor = texture2D(map, distortedUv);
          
          // Mix original and distorted
          vec4 finalColor = mix(texColor, distortedColor, 0.3);
          
          // Add scan lines
          float scanline = sin(vUv.y * 800.0 + time * 10.0) * 0.1 + 0.9;
          finalColor.rgb *= scanline;
          
          gl_FragColor = vec4(finalColor.rgb, finalColor.a * opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const textMesh = new THREE.Mesh(geometry, material)
    scene.add(textMesh)

    // Add wireframe overlay
    const wireframeGeometry = new THREE.PlaneGeometry(4.1, 2.1, 20, 10)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    })
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    scene.add(wireframeMesh)

    camera.position.z = 3

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Update shader uniforms
      material.uniforms.time.value = time

      // Gentle rotation
      textMesh.rotation.y = Math.sin(time * 0.5) * 0.1
      textMesh.rotation.x = Math.cos(time * 0.3) * 0.05

      wireframeMesh.rotation.y = Math.sin(time * 0.3) * 0.05
      wireframeMesh.rotation.x = Math.cos(time * 0.5) * 0.03

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
  }, [text, width, height, fontSize, color])

  return <div ref={mountRef} className={className} />
}
