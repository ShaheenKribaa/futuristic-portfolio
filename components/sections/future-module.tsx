"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Rocket, Brain, Globe, Zap, Calendar } from "lucide-react"

const futureProjects = [
  {
    id: 1,
    title: "Quantum Computing Interface",
    description: "Next-generation quantum algorithm visualization platform",
    status: "Research Phase",
    priority: "High",
    eta: "Q3 2025",
    progress: 15,
    icon: <Zap className="w-6 h-6" />,
    details:
      "Developing an intuitive interface for quantum computing algorithms with real-time visualization and educational components.",
    technologies: ["Quantum Computing", "WebGL", "React", "Python"],
    milestones: [
      { name: "Research & Planning", completed: true },
      { name: "Prototype Development", completed: false },
      { name: "Algorithm Implementation", completed: false },
      { name: "UI/UX Design", completed: false },
    ],
  },
  {
    id: 2,
    title: "AI-Powered Code Assistant",
    description: "Advanced AI companion for developers",
    status: "Prototype",
    priority: "High",
    eta: "Q2 2025",
    progress: 35,
    icon: <Brain className="w-6 h-6" />,
    details:
      "Building an intelligent code assistant that understands context, suggests optimizations, and helps with debugging.",
    technologies: ["GPT-4", "VSCode Extension", "TypeScript", "Machine Learning"],
    milestones: [
      { name: "Core AI Integration", completed: true },
      { name: "VSCode Extension", completed: true },
      { name: "Context Understanding", completed: false },
      { name: "Beta Testing", completed: false },
    ],
  },
  {
    id: 3,
    title: "Metaverse Portfolio",
    description: "3D immersive portfolio experience",
    status: "Concept",
    priority: "Medium",
    eta: "Q4 2025",
    progress: 5,
    icon: <Globe className="w-6 h-6" />,
    details: "Creating a virtual reality portfolio where visitors can explore projects in a 3D environment.",
    technologies: ["Three.js", "WebXR", "Blender", "React Three Fiber"],
    milestones: [
      { name: "Concept Design", completed: true },
      { name: "3D Modeling", completed: false },
      { name: "WebXR Implementation", completed: false },
      { name: "Interactive Features", completed: false },
    ],
  },
  {
    id: 4,
    title: "Neural Network Playground",
    description: "Interactive deep learning education platform",
    status: "Planning",
    priority: "Medium",
    eta: "Q1 2026",
    progress: 0,
    icon: <Rocket className="w-6 h-6" />,
    details:
      "Educational platform for understanding neural networks through interactive visualizations and hands-on experiments.",
    technologies: ["TensorFlow.js", "D3.js", "WebGL", "Python"],
    milestones: [
      { name: "Requirements Analysis", completed: false },
      { name: "Architecture Design", completed: false },
      { name: "Core Development", completed: false },
      { name: "Educational Content", completed: false },
    ],
  },
]

export function FutureModule() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % futureProjects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + futureProjects.length) % futureProjects.length)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Research Phase":
        return "border-blue-400 text-blue-400 bg-blue-400/10"
      case "Prototype":
        return "border-yellow-400 text-yellow-400 bg-yellow-400/10"
      case "Concept":
        return "border-purple-400 text-purple-400 bg-purple-400/10"
      case "Planning":
        return "border-gray-400 text-gray-400 bg-gray-400/10"
      default:
        return "border-gray-400 text-gray-400 bg-gray-400/10"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "border-red-400 text-red-400 bg-red-400/10"
      case "Medium":
        return "border-orange-400 text-orange-400 bg-orange-400/10"
      case "Low":
        return "border-green-400 text-green-400 bg-green-400/10"
      default:
        return "border-gray-400 text-gray-400 bg-gray-400/10"
    }
  }

  const currentProject = futureProjects[currentIndex]

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            FUTURE MODULE
          </h2>
          <p className="text-xl text-gray-400 font-mono">{">"} Mission control for upcoming projects</p>
        </motion.div>

        {/* Mission Control Panel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Display */}
          <Card className="bg-gray-900/30 border-gray-700 backdrop-blur-sm mb-8 relative overflow-hidden">
            {/* Animated background grid */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
              animate={{
                backgroundPosition: ["0px 0px", "20px 20px"],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <CardHeader className="border-b border-gray-700 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-green-400 font-mono text-sm">MISSION CONTROL ACTIVE</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400 font-mono">
                  <span>
                    PROJECT {currentIndex + 1} OF {futureProjects.length}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Project Info */}
                <div className="space-y-6">
                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="p-3 bg-cyan-400/10 rounded-lg border border-cyan-400/30"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {currentProject.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white font-mono">{currentProject.title}</h3>
                      <p className="text-gray-400">{currentProject.description}</p>
                    </div>
                  </motion.div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <span className="text-gray-400 font-mono text-sm">STATUS</span>
                        <Badge className={`font-mono text-xs ${getStatusColor(currentProject.status)}`}>
                          {currentProject.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <span className="text-gray-400 font-mono text-sm">PRIORITY</span>
                        <Badge className={`font-mono text-xs ${getPriorityColor(currentProject.priority)}`}>
                          {currentProject.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 font-mono text-sm">PROGRESS</span>
                        <span className="text-cyan-400 font-mono text-sm">{currentProject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${currentProject.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400 font-mono">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>ETA: {currentProject.eta}</span>
                      </div>
                    </div>
                  </div>

                  <motion.p
                    className="text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {currentProject.details}
                  </motion.p>

                  <div className="space-y-2">
                    <span className="text-gray-400 font-mono text-sm">TECH STACK</span>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.map((tech, index) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 font-mono text-xs">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Display & Milestones */}
                <div className="space-y-6">
                  <div className="aspect-square bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-center relative overflow-hidden">
                    {/* Holographic effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />

                    {/* Project icon */}
                    <motion.div
                      className="relative z-10 text-6xl text-cyan-400"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      {currentProject.icon}
                    </motion.div>

                    {/* Scanning lines */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      animate={{
                        y: [0, 200, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </div>

                  {/* Milestones */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-white font-mono">MILESTONES</h4>
                    <div className="space-y-2">
                      {currentProject.milestones.map((milestone, index) => (
                        <motion.div
                          key={milestone.name}
                          className="flex items-center gap-3 p-2 rounded bg-gray-800/30"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <motion.div
                            className={`w-3 h-3 rounded-full ${milestone.completed ? "bg-green-400" : "bg-gray-600"}`}
                            animate={milestone.completed ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <span
                            className={`text-sm font-mono ${milestone.completed ? "text-green-400" : "text-gray-400"}`}
                          >
                            {milestone.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={prevProject}
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-mono"
              >
                <ChevronLeft className="w-4 h-4" />
                PREV
              </Button>
            </motion.div>

            {/* Project indicators */}
            <div className="flex space-x-2">
              {futureProjects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={nextProject}
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-mono"
              >
                NEXT
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
