"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar } from "lucide-react"
import { FloatingGeometry } from "@/components/three/floating-geometry"

const projects = [
  {
    id: 1,
    title: "E-Learning Web App",
    description: "Modern web application for student-teacher 1-on-1 sessions",
    longDescription:
      "Built a comprehensive e-learning platform that allows students to reserve individual sessions with teachers. Features include user authentication, session scheduling, payment integration, and real-time communication tools.",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Figma"],
    period: "Nov 2024 - Feb 2025",
    status: "completed",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "AI-Powered Personal Portfolio",
    description: "Portfolio website created entirely with AI assistance",
    longDescription:
      "Designed, developed, and deployed a personal portfolio website fully utilizing AI tools for planning, coding assistance, and deployment. Demonstrated strong adaptability to emerging technologies.",
    tech: ["Next.js", "AI Tools", "Vercel", "Responsive Design"],
    period: "Apr 2025",
    status: "completed",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "TOPTW Optimization Solution",
    description: "Advanced solution for Team Orienteering Problem with Time Windows",
    longDescription:
      "Developed a novel solution using Iterated Local Search (ILS) algorithm in Python. Implemented various optimization techniques and analyzed large datasets to improve solution accuracy.",
    tech: ["Python", "Optimization Algorithms", "Data Analysis", "ILS"],
    period: "Mar 2024 - Sep 2024",
    status: "completed",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Neural Network Visualizer",
    description: "Interactive tool for understanding deep learning models",
    longDescription:
      "An educational tool that visualizes how neural networks learn and make decisions. Features interactive layers, real-time training visualization, and model architecture exploration.",
    tech: ["Python", "TensorFlow", "React", "WebGL", "D3.js"],
    period: "Jan 2024 - Jun 2024",
    status: "in-progress",
    githubUrl: "#",
  },
]

export function ProjectTimeline() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-400 text-green-400 bg-green-400/10"
      case "in-progress":
        return "border-yellow-400 text-yellow-400 bg-yellow-400/10"
      default:
        return "border-gray-400 text-gray-400 bg-gray-400/10"
    }
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            PROJECT TIMELINE
          </h2>
          <p className="text-xl text-gray-400 font-mono">{">"} Exploring the digital frontier</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full" />

          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                <Card
                  className={`bg-gray-900/50 border-gray-700 backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                    hoveredProject === project.id
                      ? "border-cyan-400 shadow-2xl shadow-cyan-400/20 transform scale-105"
                      : "hover:border-gray-600"
                  } ${expandedProject === project.id ? "ring-2 ring-cyan-400" : ""}`}
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`font-mono text-xs ${getStatusColor(project.status)}`}>
                        {project.status.toUpperCase()}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-400 font-mono">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.period}
                      </div>
                    </div>

                    <CardTitle className="text-xl text-white font-mono tracking-wide">{project.title}</CardTitle>

                    <CardDescription className="text-gray-300">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="relative overflow-hidden">
                      {/* 3D Floating Geometry */}
                      <div className="absolute top-2 right-2 z-10">
                        <FloatingGeometry
                          width={80}
                          height={80}
                          geometryType={index % 2 === 0 ? "octahedron" : "icosahedron"}
                          className="opacity-70"
                        />
                      </div>

                      {/* Keep existing image and overlay code */}
                      <img
                        src={project.imageUrl || "/placeholder.svg?height=200&width=300"}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-colors font-mono text-xs"
                          style={{ animationDelay: `${techIndex * 100}ms` }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Expanded Content */}
                    {expandedProject === project.id && (
                      <div className="mt-4 space-y-4 animate-in slide-in-from-top duration-300">
                        <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>

                        <div className="flex gap-3">
                          {project.githubUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-mono"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(project.githubUrl, "_blank")
                              }}
                            >
                              <Github className="w-4 h-4 mr-2" />
                              CODE
                            </Button>
                          )}

                          {project.liveUrl && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 font-mono"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(project.liveUrl, "_blank")
                              }}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              DEPLOY
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div
                  className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                    hoveredProject === project.id
                      ? "bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50 scale-150"
                      : "bg-gray-900 border-cyan-400"
                  }`}
                >
                  {hoveredProject === project.id && (
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
              </div>

              {/* Glitch effect */}
              {hoveredProject === project.id && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-px bg-cyan-400 animate-pulse" />
                  <div className="absolute bottom-0 right-0 w-full h-px bg-purple-400 animate-pulse delay-100" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
