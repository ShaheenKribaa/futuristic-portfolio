"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

interface FloatingGeometryProps {
  width?: number
  height?: number
  geometryType?: "cube" | "octahedron" | "dodecahedron" | "icosahedron"
  className?: string
}

export function FloatingGeometry({
  width = 300,
  height = 300,
  geometryType = "octahedron",
  className,
}: FloatingGeometryProps) {
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

    // Create geometry based on type
    let geometry: THREE.BufferGeometry
    switch (geometryType) {
      case "cube":
        geometry = new THREE.BoxGeometry(1, 1, 1)
        break
      case "octahedron":
        geometry = new THREE.OctahedronGeometry(1)
        break
      case "dodecahedron":
        geometry = new THREE.DodecahedronGeometry(1)
        break
      case "icosahedron":
        geometry = new THREE.IcosahedronGeometry(1)
        break
      default:
        geometry = new THREE.OctahedronGeometry(1)
    }

    // Holographic material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float time;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          pos += normal * sin(time * 2.0 + position.x * 5.0) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vec3 color = vec3(0.0, 1.0, 1.0);
          
          // Add some variation based on position
          color.r = sin(vPosition.x * 3.0 + time) * 0.5 + 0.5;
          color.g = 0.5 + sin(time) * 0.3;
          color.b = 1.0;
          
          // Fresnel effect
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          
          gl_FragColor = vec4(color, opacity * fresnel);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Add wireframe
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    })
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial)
    wireframeMesh.scale.setScalar(1.02)
    scene.add(wireframeMesh)

    camera.position.z = 3

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Update uniforms
      material.uniforms.time.value = time

      // Rotate meshes
      mesh.rotation.x = time * 0.5
      mesh.rotation.y = time * 0.3
      mesh.rotation.z = time * 0.1

      wireframeMesh.rotation.x = time * 0.3
      wireframeMesh.rotation.y = -time * 0.5
      wireframeMesh.rotation.z = time * 0.2

      // Float up and down
      mesh.position.y = Math.sin(time * 2) * 0.2
      wireframeMesh.position.y = Math.sin(time * 2 + 0.5) * 0.15

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
  }, [width, height, geometryType])

  return <div ref={mountRef} className={className} />
}
