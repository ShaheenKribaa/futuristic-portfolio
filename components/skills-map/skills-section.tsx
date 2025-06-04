"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { EnhancedNeuralNetwork } from "./enhanced-neural-network"
import type { Skill } from "@/types"
import { Grid, BarChart3, Network, Zap } from "lucide-react"

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "network">("network")

  const getCategoryColor = (category: Skill["category"]) => {
    switch (category) {
      case "programming":
        return "border-cyan-400 text-cyan-400 bg-cyan-400/10"
      case "framework":
        return "border-purple-400 text-purple-400 bg-purple-400/10"
      case "tool":
        return "border-green-400 text-green-400 bg-green-400/10"
      case "ai":
        return "border-pink-400 text-pink-400 bg-pink-400/10"
      case "design":
        return "border-yellow-400 text-yellow-400 bg-yellow-400/10"
      case "language":
        return "border-orange-400 text-orange-400 bg-orange-400/10"
      default:
        return "border-gray-400 text-gray-400 bg-gray-400/10"
    }
  }

  const getCategoryIcon = (category: Skill["category"]) => {
    switch (category) {
      case "programming":
        return "💻"
      case "framework":
        return "🏗️"
      case "tool":
        return "🔧"
      case "ai":
        return "🤖"
      case "design":
        return "🎨"
      case "language":
        return "🌐"
      default:
        return "📦"
    }
  }

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  const filteredCategories = selectedCategory ? { [selectedCategory]: groupedSkills[selectedCategory] } : groupedSkills

  const handleNodeSelect = (skillId: string | null) => {
    setSelectedSkill(skillId)
  }

  const selectedSkillData = skills.find((skill) => skill.id === selectedSkill)

  // Calculate category stats
  const categoryStats = Object.entries(groupedSkills).map(([category, categorySkills]) => ({
    category,
    count: categorySkills.length,
    avgLevel: Math.round(categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length),
    icon: getCategoryIcon(category as Skill["category"]),
    color: getCategoryColor(category as Skill["category"]),
  }))

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            NEURAL SKILL MATRIX
          </h2>
          <p className="text-xl text-gray-400 font-mono">{">"} Interactive knowledge visualization system</p>
        </motion.div>

        {/* Category Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categoryStats.map((stat, index) => (
            <motion.div
              key={stat.category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="bg-gray-900/50 border-gray-700 hover:border-purple-400/50 transition-all duration-300 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-sm font-mono text-white capitalize mb-1">
                    {stat.category.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    {stat.count} skills • {stat.avgLevel}% avg
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex bg-gray-900/50 rounded-lg border border-gray-700 p-1">
            <motion.button
              onClick={() => setViewMode("network")}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-mono text-sm transition-all duration-300 ${
                viewMode === "network"
                  ? "bg-purple-400/20 text-purple-400 border border-purple-400/50"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Network className="w-4 h-4" />
              Neural Network
              <Badge variant="outline" className="border-purple-400/50 text-purple-400 text-xs">
                Enhanced
              </Badge>
            </motion.button>
            <motion.button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-mono text-sm transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid className="w-4 h-4" />
              Grid View
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === "network" ? (
            <motion.div
              key="network"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Enhanced Neural Network */}
              <div className="relative h-[700px] w-full">
                <EnhancedNeuralNetwork skills={skills} onNodeSelect={handleNodeSelect} selectedSkill={selectedSkill} />
              </div>

              {/* Selected Skill Details */}
              <AnimatePresence>
                {selectedSkillData && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-gray-900/50 border-purple-400 backdrop-blur-sm shadow-2xl shadow-purple-400/20">
                      <CardHeader>
                        <CardTitle className="text-purple-400 flex items-center gap-3 font-mono">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Zap className="w-5 h-5" />
                          </motion.div>
                          Neural Node Analysis: {selectedSkillData.name}
                          <Badge className={getCategoryColor(selectedSkillData.category)}>
                            {selectedSkillData.category.toUpperCase()}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Proficiency */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 font-mono text-sm">PROFICIENCY</span>
                              <span className="text-purple-400 font-mono text-lg font-bold">
                                {selectedSkillData.level}%
                              </span>
                            </div>
                            <div className="relative">
                              <Progress value={0} className="h-3 bg-gray-800" />
                              <motion.div
                                className="absolute top-0 left-0 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${selectedSkillData.level}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </div>

                          {/* Connections */}
                          <div className="space-y-3">
                            <span className="text-gray-400 font-mono text-sm">CONNECTIONS</span>
                            <div className="flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-cyan-400" />
                              <span className="text-cyan-400 font-mono">
                                {skills.find((s) => s.id === selectedSkill)?.name &&
                                  Object.keys(skills.find((s) => s.id === selectedSkill)?.name || {}).length}{" "}
                                linked skills
                              </span>
                            </div>
                          </div>

                          {/* Category Info */}
                          <div className="space-y-3">
                            <span className="text-gray-400 font-mono text-sm">CATEGORY</span>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{getCategoryIcon(selectedSkillData.category)}</span>
                              <span className="text-white font-mono capitalize">
                                {selectedSkillData.category.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <span className="text-gray-400 font-mono text-sm">DESCRIPTION</span>
                          <p className="text-gray-300 leading-relaxed">
                            {selectedSkillData.description ||
                              `Advanced proficiency in ${selectedSkillData.name} with extensive practical experience in real-world projects. This skill is integral to modern development workflows and demonstrates strong technical competency.`}
                          </p>
                        </div>

                        {/* Neural Network Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
                          <div className="text-center">
                            <div className="text-cyan-400 font-mono text-lg font-bold">
                              {Math.floor(Math.random() * 50) + 20}
                            </div>
                            <div className="text-gray-400 text-xs font-mono">Neural Weight</div>
                          </div>
                          <div className="text-center">
                            <div className="text-green-400 font-mono text-lg font-bold">
                              {Math.floor(Math.random() * 30) + 70}%
                            </div>
                            <div className="text-gray-400 text-xs font-mono">Activation</div>
                          </div>
                          <div className="text-center">
                            <div className="text-yellow-400 font-mono text-lg font-bold">
                              {Math.floor(Math.random() * 10) + 5}
                            </div>
                            <div className="text-gray-400 text-xs font-mono">Synapses</div>
                          </div>
                          <div className="text-center">
                            <div className="text-pink-400 font-mono text-lg font-bold">
                              {(Math.random() * 2 + 1).toFixed(1)}x
                            </div>
                            <div className="text-gray-400 text-xs font-mono">Learning Rate</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Filter */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full border font-mono text-sm transition-all duration-300 ${
                    selectedCategory === null
                      ? "border-cyan-400 text-cyan-400 bg-cyan-400/10"
                      : "border-gray-600 text-gray-400 hover:border-gray-500"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All Skills
                </motion.button>
                {Object.keys(groupedSkills).map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full border font-mono text-sm transition-all duration-300 capitalize ${
                      selectedCategory === category
                        ? getCategoryColor(category as Skill["category"])
                        : "border-gray-600 text-gray-400 hover:border-gray-500"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {getCategoryIcon(category as Skill["category"])} {category.replace(/([A-Z])/g, " $1").trim()}
                  </motion.button>
                ))}
              </motion.div>

              <div className="space-y-12">
                {Object.entries(filteredCategories).map(([category, categorySkills], categoryIndex) => (
                  <motion.div
                    key={category}
                    className="space-y-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  >
                    <motion.h3
                      className="text-2xl font-bold text-white capitalize mb-6 flex items-center gap-3"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <span className="text-3xl">{getCategoryIcon(category as Skill["category"])}</span>
                      {category.replace(/([A-Z])/g, " $1").trim()}
                      <Badge variant="outline" className={getCategoryColor(category as Skill["category"])}>
                        {categorySkills.length} skills
                      </Badge>
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorySkills.map((skill, index) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onHoverStart={() => setHoveredSkill(skill.id)}
                          onHoverEnd={() => setHoveredSkill(null)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Card
                              className={`bg-gray-900/50 border-gray-700 backdrop-blur-sm transition-all duration-300 ${
                                hoveredSkill === skill.id
                                  ? "border-purple-400 shadow-lg shadow-purple-400/20"
                                  : "hover:border-gray-600"
                              }`}
                            >
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg text-white flex items-center justify-between">
                                  <span className="font-mono tracking-wide">{skill.name}</span>
                                  <motion.div
                                    animate={{
                                      rotate: hoveredSkill === skill.id ? 360 : 0,
                                    }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    <Badge variant="outline" className={getCategoryColor(skill.category)}>
                                      {skill.category}
                                    </Badge>
                                  </motion.div>
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Proficiency</span>
                                    <motion.span
                                      className="text-purple-400 font-mono"
                                      animate={{
                                        scale: hoveredSkill === skill.id ? 1.1 : 1,
                                      }}
                                    >
                                      {skill.level}%
                                    </motion.span>
                                  </div>
                                  <div className="relative">
                                    <Progress value={0} className="h-2 bg-gray-800" />
                                    <motion.div
                                      className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${skill.level}%` }}
                                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                    />
                                  </div>
                                  {skill.description && (
                                    <motion.p
                                      className="text-xs text-gray-400 mt-2"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                      {skill.description}
                                    </motion.p>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
