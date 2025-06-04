"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NeuralNetwork3D } from "@/components/three/neural-network-3d"

const skills = [
  { id: 1, name: "React", category: "Frontend", level: 95, x: 50, y: 30, icon: "⚛️" },
  { id: 2, name: "Python", category: "Backend", level: 90, x: 30, y: 50, icon: "🐍" },
  { id: 3, name: "TypeScript", category: "Language", level: 88, x: 70, y: 40, icon: "📘" },
  { id: 4, name: "Next.js", category: "Framework", level: 85, x: 60, y: 60, icon: "▲" },
  { id: 5, name: "Node.js", category: "Backend", level: 82, x: 40, y: 70, icon: "💚" },
  { id: 6, name: "AI/ML", category: "Emerging", level: 78, x: 20, y: 30, icon: "🤖" },
  { id: 7, name: "Docker", category: "DevOps", level: 75, x: 80, y: 70, icon: "🐳" },
  { id: 8, name: "GraphQL", category: "API", level: 70, x: 25, y: 80, icon: "🔗" },
]

const connections = [
  { from: 1, to: 3 }, // React to TypeScript
  { from: 1, to: 4 }, // React to Next.js
  { from: 2, to: 5 }, // Python to Node.js
  { from: 3, to: 4 }, // TypeScript to Next.js
  { from: 4, to: 5 }, // Next.js to Node.js
  { from: 6, to: 2 }, // AI/ML to Python
  { from: 7, to: 5 }, // Docker to Node.js
  { from: 8, to: 4 }, // GraphQL to Next.js
]

export function SkillNeuralMap() {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const [pulseNodes, setPulseNodes] = useState<Set<number>>(new Set())

  useEffect(() => {
    const interval = setInterval(() => {
      const randomSkill = skills[Math.floor(Math.random() * skills.length)]
      setPulseNodes(new Set([randomSkill.id]))
      setTimeout(() => setPulseNodes(new Set()), 1000)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getSkillById = (id: number) => skills.find((skill) => skill.id === id)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "text-cyan-400 border-cyan-400"
      case "Backend":
        return "text-green-400 border-green-400"
      case "Language":
        return "text-purple-400 border-purple-400"
      case "Framework":
        return "text-yellow-400 border-yellow-400"
      case "DevOps":
        return "text-orange-400 border-orange-400"
      case "API":
        return "text-pink-400 border-pink-400"
      case "Emerging":
        return "text-red-400 border-red-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            NEURAL SKILL MAP
          </h2>
          <p className="text-xl text-gray-400 font-mono">{">"} Interactive knowledge graph</p>
        </div>

        <div className="relative">
          {/* 3D Neural Map Container */}
          <div className="relative mb-8">
            <NeuralNetwork3D
              width={800}
              height={500}
              nodeCount={skills.length}
              className="mx-auto rounded-2xl border border-gray-700 backdrop-blur-sm overflow-hidden"
              onNodeClick={(nodeId) => setSelectedSkill(skills[nodeId]?.id || null)}
            />

            {/* Overlay UI elements */}
            <div className="absolute top-4 left-4 text-sm text-cyan-400 font-mono">3D NEURAL NETWORK ACTIVE</div>
            <div className="absolute top-4 right-4 text-sm text-gray-400 font-mono">
              NODES: {skills.length} | CONNECTIONS: DYNAMIC
            </div>
          </div>

          {/* Skill Details Panel */}
          {selectedSkill && (
            <Card className="mt-8 bg-gray-900/50 border-cyan-400 backdrop-blur-sm animate-in slide-in-from-bottom duration-300">
              <CardContent className="p-6">
                {(() => {
                  const skill = getSkillById(selectedSkill)
                  if (!skill) return null

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white font-mono">
                          {skill.icon} {skill.name}
                        </h3>
                        <Badge className={`font-mono ${getCategoryColor(skill.category)}`}>{skill.category}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400 font-mono">PROFICIENCY LEVEL</span>
                          <span className="text-cyan-400 font-mono">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-gray-300 font-mono text-sm">
                        <p>
                          Connected to {connections.filter((c) => c.from === skill.id || c.to === skill.id).length}{" "}
                          other technologies in the neural network.
                        </p>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
