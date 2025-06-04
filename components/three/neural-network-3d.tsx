"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

interface NeuralNetwork3DProps {
  width?: number
  height?: number
  nodeCount?: number
  className?: string
  onNodeClick?: (nodeId: number) => void
}

export function NeuralNetwork3D({
  width = 600,
  height = 400,
  nodeCount = 20,
  className,
  onNodeClick,
}: NeuralNetwork3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const frameRef = useRef<number>()
  const nodesRef = useRef<THREE.Mesh[]>([])
  const connectionsRef = useRef<THREE.Line[]>([])
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

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

    // Create nodes
    const nodes: THREE.Mesh[] = []
    const nodePositions: THREE.Vector3[] = []

    for (let i = 0; i < nodeCount; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 16, 16)
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
      })

      const node = new THREE.Mesh(geometry, material)

      // Position nodes in a 3D space
      const phi = Math.acos(-1 + (2 * i) / nodeCount)
      const theta = Math.sqrt(nodeCount * Math.PI) * phi

      const x = Math.cos(theta) * Math.sin(phi) * 2
      const y = Math.sin(theta) * Math.sin(phi) * 2
      const z = Math.cos(phi) * 2

      node.position.set(x, y, z)
      nodePositions.push(new THREE.Vector3(x, y, z))

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(0.15, 16, 16)
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          intensity: { value: 1.0 },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float intensity;
          varying vec3 vNormal;
          
          void main() {
            float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 color = vec3(0.0, 1.0, 1.0);
            float alpha = fresnel * intensity * (0.5 + 0.5 * sin(time * 3.0));
            gl_FragColor = vec4(color, alpha * 0.3);
          }
        `,
        transparent: true,
        side: THREE.BackSide,
      })

      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.position.copy(node.position)
      scene.add(glow)

      nodes.push(node)
      scene.add(node)
    }

    nodesRef.current = nodes

    // Create connections
    const connections: THREE.Line[] = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = nodePositions[i].distanceTo(nodePositions[j])
        if (distance < 2.5 && Math.random() > 0.7) {
          const geometry = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]])

          const material = new THREE.LineBasicMaterial({
            color: 0x444444,
            transparent: true,
            opacity: 0.3,
          })

          const line = new THREE.Line(geometry, material)
          connections.push(line)
          scene.add(line)
        }
      }
    }

    connectionsRef.current = connections

    // Add ambient particles
    const particleCount = 100
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    camera.position.z = 5

    // Mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(nodes)

      if (intersects.length > 0) {
        const nodeIndex = nodes.indexOf(intersects[0].object as THREE.Mesh)
        setHoveredNode(nodeIndex)
      } else {
        setHoveredNode(null)
      }
    }

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(nodes)

      if (intersects.length > 0) {
        const nodeIndex = nodes.indexOf(intersects[0].object as THREE.Mesh)
        onNodeClick?.(nodeIndex)
      }
    }

    renderer.domElement.addEventListener("mousemove", onMouseMove)
    renderer.domElement.addEventListener("click", onClick)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Rotate the entire network
      scene.rotation.y = time * 0.1
      scene.rotation.x = Math.sin(time * 0.5) * 0.1

      // Animate nodes
      nodes.forEach((node, index) => {
        const material = node.material as THREE.MeshBasicMaterial

        if (hoveredNode === index) {
          material.color.setHex(0xff00ff)
          node.scale.setScalar(1.5)
        } else {
          material.color.setHex(0x00ffff)
          node.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.2)
        }

        // Pulse effect
        material.opacity = 0.6 + Math.sin(time * 3 + index) * 0.2
      })

      // Animate connections
      connections.forEach((connection, index) => {
        const material = connection.material as THREE.LineBasicMaterial
        material.opacity = 0.2 + Math.sin(time * 2 + index) * 0.1
      })

      // Animate particles
      particles.rotation.y = time * 0.05
      particles.rotation.x = time * 0.03

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      renderer.domElement.removeEventListener("mousemove", onMouseMove)
      renderer.domElement.removeEventListener("click", onClick)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [width, height, nodeCount, hoveredNode, onNodeClick])

  return <div ref={mountRef} className={className} />
}
