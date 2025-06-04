"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/types"
import { ExternalLink, Github, X, Calendar, Eye } from "lucide-react"

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "border-green-400 text-green-400 bg-green-400/10"
      case "in-progress":
        return "border-yellow-400 text-yellow-400 bg-yellow-400/10"
      case "planned":
        return "border-gray-400 text-gray-400 bg-gray-400/10"
      default:
        return "border-gray-400 text-gray-400 bg-gray-400/10"
    }
  }

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-green-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${expandedProject === project.id ? "md:col-span-2 lg:col-span-3" : ""}`}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card
                    className={`bg-gray-900/50 border-gray-700 backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden ${
                      hoveredProject === project.id
                        ? "border-cyan-400 shadow-2xl shadow-cyan-400/20"
                        : "hover:border-gray-600"
                    } ${expandedProject === project.id ? "ring-2 ring-cyan-400" : ""}`}
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={project.imageUrl || "/placeholder.svg?height=200&width=300"}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 0.8 }}
                      />
                      <div className="absolute top-4 right-4">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </motion.div>
                      </div>
                      <motion.div
                        className="absolute top-4 left-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Eye className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span className="font-mono tracking-wide">{project.title}</span>
                        <motion.div
                          animate={{ rotate: expandedProject === project.id ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {expandedProject === project.id ? (
                            <X className="w-5 h-5 text-cyan-400" />
                          ) : (
                            <ExternalLink className="w-5 h-5 text-gray-400" />
                          )}
                        </motion.div>
                      </CardTitle>
                      <CardDescription className="text-gray-300">{project.description}</CardDescription>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {project.startDate} - {project.endDate}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge
                              variant="outline"
                              className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-colors font-mono text-xs"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>

                      <AnimatePresence>
                        {expandedProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-4"
                          >
                            <motion.p
                              className="text-gray-300 leading-relaxed"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              {project.longDescription}
                            </motion.p>

                            <motion.div
                              className="flex gap-3"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            >
                              {project.githubUrl && (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                                    View Code
                                  </Button>
                                </motion.div>
                              )}

                              {project.liveUrl && (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 font-mono"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      window.open(project.liveUrl, "_blank")
                                    }}
                                  >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                  </Button>
                                </motion.div>
                              )}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
