"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, RotateCcw, Play, Pause, Settings, Eye, EyeOff } from 'lucide-react'
import type { Skill } from "@/types"

interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  name: string
  category: string
  level: number
  radius: number
  connections: string[]
  color: string
  isFixed: boolean
}

interface Connection {
  from: string
  to: string
  strength: number
  distance: number
  isActive: boolean
}

interface NeuralNetworkProps {
  skills: Skill[]
  onNodeSelect?: (skillId: string | null) => void
  selectedSkill?: string | null
}

const CATEGORY_COLORS = {
  programming: "#00ffff",
  framework: "#8b5cf6",
  tool: "#10b981",
  ai: "#ec4899",
  design: "#f59e0b",
  language: "#f97316",
} as const

const SKILL_CONNECTIONS = {
  React: ["TypeScript", "Next.js", "JavaScript", "Node.js"],
  "Next.js": ["React", "TypeScript", "Node.js", "Supabase"],
  TypeScript: ["JavaScript", "React", "Next.js", "Node.js"],
  Python: ["AI/ML", "Genetic Algorithms", "SQL"],
  "Node.js": ["JavaScript", "TypeScript", "Next.js", "Supabase"],
  JavaScript: ["TypeScript", "React", "Node.js"],
  Docker: ["Node.js", "Python", "Git & GitHub"],
  GraphQL: ["Next.js", "React", "Supabase"],
  "AI/ML": ["Python", "Prompt Engineering"],
  Figma: ["React", "Next.js"],
  Supabase: ["Next.js", "SQL", "Firebase"],
  Firebase: ["Supabase", "Node.js"],
  "Git & GitHub": ["Docker"],
  SQL: ["Python", "Supabase"],
  "Prompt Engineering": ["AI/ML", "AI Agents"],
  "AI Agents": ["Prompt Engineering", "Python"],
  "Genetic Algorithms": ["Python", "AI/ML"],
  Flutter: ["Dart (Flutter)"],
  "Dart (Flutter)": ["Flutter"],
  Java: ["SQL"],
  Arabic: ["English", "French"],
  English: ["Arabic", "French"],
  French: ["Arabic", "English"],
}

export function EnhancedNeuralNetwork({ skills, onNodeSelect, selectedSkill }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])

  // State management - using refs for frequently updated values to prevent re-renders
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [showControls, setShowControls] = useState(true)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [connectionStrength, setConnectionStrength] = useState(0.3)
  const [showConnections, setShowConnections] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Physics simulation parameters
  const simulationParams = useMemo(() => ({
    repulsion: 100,
    attraction: 0.1,
    damping: 0.9,
    centerForce: 0.01,
  }), [])

  // Initialize nodes and connections only once
  useEffect(() => {
    if (skills.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Create nodes with physics properties
    const newNodes: Node[] = skills.map((skill, index) => {
      const angle = (index / skills.length) * 2 * Math.PI
      const radius = Math.min(rect.width, rect.height) * 0.25

      return {
        id: skill.id,
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100,
        vx: 0,
        vy: 0,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        radius: Math.max(8, skill.level / 10),
        connections: [],
        color: CATEGORY_COLORS[skill.category as keyof typeof CATEGORY_COLORS] || "#6b7280",
        isFixed: false,
      }
    })

    // Create connections based on skill relationships
    const newConnections: Connection[] = []
    newNodes.forEach((node) => {
      const relatedSkills = SKILL_CONNECTIONS[node.name as keyof typeof SKILL_CONNECTIONS] || []
      relatedSkills.forEach((relatedSkill) => {
        const targetNode = newNodes.find((n) => n.name === relatedSkill)
        if (
          targetNode &&
          !newConnections.some(
            (c) => (c.from === node.id && c.to === targetNode.id) || (c.from === targetNode.id && c.to === node.id),
          )
        ) {
          const strength = Math.random() * 0.5 + 0.3
          newConnections.push({
            from: node.id,
            to: targetNode.id,
            strength,
            distance: 100 + strength * 50,
            isActive: true,
          })
          node.connections.push(targetNode.id)
          targetNode.connections.push(node.id)
        }
      })
    })

    nodesRef.current = newNodes
    connectionsRef.current = newConnections
  }, [skills])

  // Physics simulation using refs to avoid state updates
  const updatePhysics = useCallback(() => {
    if (!isAnimating || isDragging) return

    const nodes = nodesRef.current
    const connections = connectionsRef.current
    const canvas = canvasRef.current
    if (!canvas || nodes.length === 0) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Apply forces
    nodes.forEach((node, i) => {
      if (node.isFixed) return

      let fx = 0,
        fy = 0

      // Repulsion between nodes
      nodes.forEach((other, j) => {
        if (i === j) return
        const dx = node.x - other.x
        const dy = node.y - other.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance > 0) {
          const force = simulationParams.repulsion / (distance * distance)
          fx += (dx / distance) * force
          fy += (dy / distance) * force
        }
      })

      // Attraction along connections
      connections.forEach((conn) => {
        if (conn.from === node.id || conn.to === node.id) {
          const otherId = conn.from === node.id ? conn.to : conn.from
          const other = nodes.find((n) => n.id === otherId)
          if (other) {
            const dx = other.x - node.x
            const dy = other.y - node.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const targetDistance = conn.distance
            const force = (distance - targetDistance) * simulationParams.attraction
            fx += (dx / distance) * force
            fy += (dy / distance) * force
          }
        }
      })

      // Center force
      const centerDx = centerX - node.x
      const centerDy = centerY - node.y
      fx += centerDx * simulationParams.centerForce
      fy += centerDy * simulationParams.centerForce

      // Update velocity and position
      node.vx = (node.vx + fx) * simulationParams.damping
      node.vy = (node.vy + fy) * simulationParams.damping
      node.x += node.vx
      node.y += node.vy

      // Boundary constraints
      const margin = node.radius + 10
      node.x = Math.max(margin, Math.min(canvas.width - margin, node.x))
      node.y = Math.max(margin, Math.min(canvas.height - margin, node.y))
    })
  }, [isAnimating, isDragging, simulationParams])

  // Rendering function
  const render = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const nodes = nodesRef.current
    const connections = connectionsRef.current

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply zoom and pan
    ctx.save()
    ctx.translate(pan.x, pan.y)
    ctx.scale(zoom, zoom)

    // Filter nodes and connections
    const filteredNodes = nodes.filter((node) => {
      const categoryMatch = !filterCategory || node.category === filterCategory
      const searchMatch = !searchTerm || node.name.toLowerCase().includes(searchTerm.toLowerCase())
      return categoryMatch && searchMatch
    })

    const filteredConnections = connections.filter((conn) => {
      const fromNode = filteredNodes.find((n) => n.id === conn.from)
      const toNode = filteredNodes.find((n) => n.id === conn.to)
      return fromNode && toNode && conn.strength >= connectionStrength && showConnections
    })

    // Draw connections
    filteredConnections.forEach((conn) => {
      const fromNode = nodes.find((n) => n.id === conn.from)
      const toNode = nodes.find((n) => n.id === conn.to)
      if (!fromNode || !toNode) return

      const isHighlighted =
        selectedSkill === conn.from || selectedSkill === conn.to || hoveredNode === conn.from || hoveredNode === conn.to

      // Connection line
      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)

      const alpha = isHighlighted ? 0.8 : 0.3
      const width = isHighlighted ? 3 : 1

      ctx.strokeStyle = isHighlighted ? fromNode.color : `rgba(100, 100, 100, ${alpha})`
      ctx.lineWidth = width
      ctx.stroke()

      // Animated particles
      if (isHighlighted && isAnimating) {
        const time = Date.now() * 0.001
        const progress = (time * 0.5 + conn.strength) % 1
        const particleX = fromNode.x + (toNode.x - fromNode.x) * progress
        const particleY = fromNode.y + (toNode.y - fromNode.y) * progress

        ctx.beginPath()
        ctx.arc(particleX, particleY, 3, 0, 2 * Math.PI)
        ctx.fillStyle = fromNode.color
        ctx.fill()
      }
    })

    // Draw nodes
    filteredNodes.forEach((node) => {
      const isSelected = selectedSkill === node.id
      const isHovered = hoveredNode === node.id
      const isHighlighted = isSelected || isHovered

      // Node glow
      if (isHighlighted) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 15, 0, 2 * Math.PI)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius + 15)
        gradient.addColorStop(0, `${node.color}40`)
        gradient.addColorStop(1, `${node.color}00`)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI)
      ctx.fillStyle = node.color
      ctx.fill()

      // Node border
      ctx.strokeStyle = isHighlighted ? "#ffffff" : "#374151"
      ctx.lineWidth = isHighlighted ? 3 : 1
      ctx.stroke()

      // Level indicator
      if (node.level > 0) {
        const levelRadius = node.radius * (node.level / 100)
        ctx.beginPath()
        ctx.arc(node.x, node.y, levelRadius, 0, 2 * Math.PI)
        ctx.fillStyle = `${node.color}80`
        ctx.fill()
      }

      // Node label
      if (isHighlighted || zoom > 1.5) {
        ctx.fillStyle = "#ffffff"
        ctx.font = `${Math.max(10, 12 * zoom)}px monospace`
        ctx.textAlign = "center"
        ctx.fillText(node.name, node.x, node.y - node.radius - 10)
      }

      // Pulse effect for selected node
      if (isSelected && isAnimating) {
        const time = Date.now() * 0.001
        const pulseRadius = node.radius + Math.sin(time * 4) * 5
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseRadius, 0, 2 * Math.PI)
        ctx.strokeStyle = `${node.color}80`
        ctx.lineWidth = 2
        ctx.stroke()
      }
    })

    ctx.restore()
  }, [
    zoom,
    pan,
    filterCategory,
    searchTerm,
    connectionStrength,
    showConnections,
    selectedSkill,
    hoveredNode,
    isAnimating,
  ])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      updatePhysics()
      render()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [updatePhysics, render])

  // Mouse interactions
  const getMousePos = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }

      const rect = canvas.getBoundingClientRect()
      const x = (event.clientX - rect.left - pan.x) / zoom
      const y = (event.clientY - rect.top - pan.y) / zoom
      return { x, y }
    },
    [zoom, pan],
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const { x, y } = getMousePos(event)
      const nodes = nodesRef.current

      if (isDragging && draggedNode) {
        const nodeIndex = nodes.findIndex((n) => n.id === draggedNode)
        if (nodeIndex !== -1) {
          nodes[nodeIndex].x = x
          nodes[nodeIndex].y = y
          nodes[nodeIndex].vx = 0
          nodes[nodeIndex].vy = 0
          nodes[nodeIndex].isFixed = true
        }
        return
      }

      const hoveredNodeId =
        nodes.find((node) => {
          const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
          return distance < node.radius + 5
        })?.id || null

      setHoveredNode(hoveredNodeId)
    },
    [getMousePos, isDragging, draggedNode],
  )

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const { x, y } = getMousePos(event)
      const nodes = nodesRef.current

      const clickedNode = nodes.find((node) => {
        const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
        return distance < node.radius + 5
      })

      if (clickedNode) {
        setIsDragging(true)
        setDraggedNode(clickedNode.id)
        onNodeSelect?.(clickedNode.id === selectedSkill ? null : clickedNode.id)
      }
    },
    [getMousePos, selectedSkill, onNodeSelect],
  )

  const handleMouseUp = useCallback(() => {
    if (draggedNode) {
      const nodes = nodesRef.current
      const nodeIndex = nodes.findIndex((n) => n.id === draggedNode)
      if (nodeIndex !== -1) {
        nodes[nodeIndex].isFixed = false
      }
    }
    setIsDragging(false)
    setDraggedNode(null)
  }, [draggedNode])

  // Zoom and pan controls
  const handleZoom = useCallback((delta: number) => {
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)))
  }, [])

  const handleReset = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setFilterCategory(null)
    setSearchTerm("")
    setConnectionStrength(0.3)
  }, [])

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const categories = useMemo(() => Array.from(new Set(skills.map((skill) => skill.category))), [skills])

  return (
    <div className="relative w-full h-full min-h-[600px]" ref={containerRef}>
      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-gray-900/30 rounded-lg border border-gray-700 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Control Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute top-4 left-4 space-y-4"
          >
            {/* Zoom Controls */}
            <Card className="bg-gray-900/90 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-cyan-400 font-mono">ZOOM & PAN</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleZoom(0.2)}
                    className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleZoom(-0.2)}
                    className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReset}
                    className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-gray-400 font-mono">Zoom: {(zoom * 100).toFixed(0)}%</div>
              </CardContent>
            </Card>

            {/* Animation Controls */}
            <Card className="bg-gray-900/90 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-cyan-400 font-mono">ANIMATION</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="w-full border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                >
                  {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isAnimating ? "Pause" : "Play"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowConnections(!showConnections)}
                  className="w-full border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                >
                  {showConnections ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  Connections
                </Button>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="bg-gray-900/90 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-cyan-400 font-mono">FILTERS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-mono">Category</label>
                  <select
                    value={filterCategory || ""}
                    onChange={(e) => setFilterCategory(e.target.value || null)}
                    className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white font-mono"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-mono">
                    Connection Strength: {connectionStrength.toFixed(1)}
                  </label>
                  <Slider
                    value={[connectionStrength]}
                    onValueChange={(value) => setConnectionStrength(value[0])}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-mono">Search</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search skills..."
                    className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Controls Button */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => setShowControls(!showControls)}
        className="absolute top-4 right-4 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
      >
        <Settings className="w-4 h-4" />
      </Button>

      {/* Status Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <div className="text-xs text-cyan-400 font-mono bg-gray-900/90 px-3 py-1 rounded border border-gray-700">
          NODES: {nodesRef.current.filter((n) => !filterCategory || n.category === filterCategory).length} | 
          CONNECTIONS: {connectionsRef.current.filter((c) => c.strength >= connectionStrength).length} | 
          PHYSICS: {isAnimating ? "ACTIVE" : "PAUSED"}
        </div>

        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900/90 px-3 py-2 rounded border border-cyan-400/50 text-xs font-mono"
          >
            <div className="text-cyan-400">{nodesRef.current.find((n) => n.id === hoveredNode)?.name}</div>
            <div className="text-gray-400">
              Level: {nodesRef.current.find((n) => n.id === hoveredNode)?.level}% | Category:{" "}
              {nodesRef.current.find((n) => n.id === hoveredNode)?.category}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
