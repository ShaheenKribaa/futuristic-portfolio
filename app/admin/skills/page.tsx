"use client"

import { motion } from "framer-motion"
import { Code, Database, Cloud, Wrench, Palette, Languages } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    title: "Backend Development",
    icon: Database,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "Express.js", level: 85 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 80 },
      { name: "Docker", level: 75 },
      { name: "Kubernetes", level: 70 },
      { name: "CI/CD", level: 80 },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: Wrench,
    skills: [
      { name: "Git", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    title: "Design & UX",
    icon: Palette,
    skills: [
      { name: "Figma", level: 80 },
      { name: "UI/UX Design", level: 75 },
      { name: "Responsive Design", level: 85 },
      { name: "Accessibility", level: 80 },
    ],
  },
  {
    title: "Languages",
    icon: Languages,
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 80 },
      { name: "SQL", level: 85 },
    ],
  },
]

export default function SkillsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Skills</h1>
        <p className="mt-2 text-gray-400">Manage your technical skills and expertise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-cyan-400/20 rounded-lg">
                <category.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{category.title}</h3>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 