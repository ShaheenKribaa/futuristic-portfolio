"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Node {
  id: string
  x: number
  y: number
  name: string
  category: string
  level: number
  connections: string[]
}

interface Connection {
  from: string
  to: string
  strength: number
}

interface NeuralNetworkProps {
  skills: any[]
  onNodeClick?: (skillId: string) => void
  selectedSkill?: string | null
}

export function NeuralNetwork({ skills, onNodeClick, selectedSkill }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Initialize nodes and connections
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || skills.length === 0) return

    const rect = canvas.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(rect.width, rect.height) * 0.35

    // Create nodes in a circular layout
    const newNodes: Node[] = skills.map((skill, index) => {
      const angle = (index / skills.length) * 2 * Math.PI
      const nodeRadius = radius + (Math.random() - 0.5) * 50

      return {
        id: skill.id,
        x: centerX + Math.cos(angle) * nodeRadius,
        y: centerY + Math.sin(angle) * nodeRadius,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        connections: [],
      }
    })

    // Create connections based on skill relationships
    const newConnections: Connection[] = []
    const skillConnections = {
      React: ["TypeScript", "Next.js", "JavaScript"],
      "Next.js": ["React", "TypeScript", "Node.js"],
      TypeScript: ["JavaScript", "React", "Next.js"],
      Python: ["AI/ML", "Node.js"],
      "Node.js": ["JavaScript", "Next.js", "Python"],
      JavaScript: ["TypeScript", "React", "Node.js"],
      Docker: ["Node.js", "Python"],
      GraphQL: ["Next.js", "React"],
      "AI/ML": ["Python"],
      Figma: ["React", "Next.js"],
    }

    newNodes.forEach((node) => {
      const relatedSkills = skillConnections[node.name as keyof typeof skillConnections] || []
      relatedSkills.forEach((relatedSkill) => {
        const targetNode = newNodes.find((n) => n.name === relatedSkill)
        if (targetNode) {
          newConnections.push({
            from: node.id,
            to: targetNode.id,
            strength: Math.random() * 0.5 + 0.3,
          })
        }
      })
    })

    setNodes(newNodes)
    setConnections(newConnections)
  }, [skills])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      // Draw connections
      connections.forEach((connection) => {
        const fromNode = nodes.find((n) => n.id === connection.from)
        const toNode = nodes.find((n) => n.id === connection.to)

        if (fromNode && toNode) {
          const isHighlighted =
            selectedSkill === connection.from ||
            selectedSkill === connection.to ||
            hoveredNode === connection.from ||
            hoveredNode === connection.to

          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)

          const alpha = isHighlighted ? 0.8 : 0.2 + Math.sin(time * 2 + connection.strength * 10) * 0.1
          ctx.strokeStyle = isHighlighted ? `rgba(0, 255, 255, ${alpha})` : `rgba(100, 100, 100, ${alpha})`
          ctx.lineWidth = isHighlighted ? 2 : 1
          ctx.stroke()

          // Animated particles along connections
          if (isHighlighted) {
            const progress = (time * 0.5 + connection.strength) % 1
            const particleX = fromNode.x + (toNode.x - fromNode.x) * progress
            const particleY = fromNode.y + (toNode.y - fromNode.y) * progress

            ctx.beginPath()
            ctx.arc(particleX, particleY, 2, 0, 2 * Math.PI)
            ctx.fillStyle = "rgba(0, 255, 255, 0.8)"
            ctx.fill()
          }
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        const isSelected = selectedSkill === node.id
        const isHovered = hoveredNode === node.id
        const isHighlighted = isSelected || isHovered

        // Node glow
        if (isHighlighted) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI)
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20)
          gradient.addColorStop(0, "rgba(0, 255, 255, 0.3)")
          gradient.addColorStop(1, "rgba(0, 255, 255, 0)")
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8 + (isHighlighted ? 4 : 0), 0, 2 * Math.PI)

        const categoryColors = {
          programming: "#00ffff",
          framework: "#8b5cf6",
          tool: "#10b981",
          ai: "#ec4899",
          design: "#f59e0b",
          language: "#f97316",
        }

        ctx.fillStyle = categoryColors[node.category as keyof typeof categoryColors] || "#6b7280"
        ctx.fill()

        // Node border
        ctx.strokeStyle = isHighlighted ? "#ffffff" : "#374151"
        ctx.lineWidth = isHighlighted ? 2 : 1
        ctx.stroke()

        // Pulse effect for selected node
        if (isSelected) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 12 + Math.sin(time * 4) * 3, 0, 2 * Math.PI)
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 + Math.sin(time * 4) * 0.3})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [nodes, connections, selectedSkill, hoveredNode])

  // Handle mouse interactions
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const hoveredNodeId =
      nodes.find((node) => {
        const distance = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2)
        return distance < 15
      })?.id || null

    setHoveredNode(hoveredNodeId)
    canvas.style.cursor = hoveredNodeId ? "pointer" : "default"
  }

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const clickedNode = nodes.find((node) => {
      const distance = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2)
      return distance < 15
    })

    if (clickedNode && onNodeClick) {
      onNodeClick(clickedNode.id)
    }
  }

  return (
    <motion.div
      className="relative w-full h-96 bg-gray-900/30 rounded-lg border border-gray-700 overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />

      {/* Network status overlay */}
      <div className="absolute top-4 left-4 text-xs text-cyan-400 font-mono">NEURAL NETWORK ACTIVE</div>
      <div className="absolute top-4 right-4 text-xs text-gray-400 font-mono">
        NODES: {nodes.length} | CONNECTIONS: {connections.length}
      </div>

      {/* Hover tooltip */}
      {hoveredNode && (
        <motion.div
          className="absolute bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-mono border border-cyan-400/50 pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            left: nodes.find((n) => n.id === hoveredNode)?.x || 0,
            top: (nodes.find((n) => n.id === hoveredNode)?.y || 0) - 40,
            transform: "translateX(-50%)",
          }}
        >
          {nodes.find((n) => n.id === hoveredNode)?.name}
        </motion.div>
      )}
    </motion.div>
  )
}
