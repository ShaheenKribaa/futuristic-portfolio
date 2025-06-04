"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Experience } from "@/types"
import { Briefcase, GraduationCap, Award } from "lucide-react"

interface TimelineSectionProps {
  experiences: Experience[]
}

export function TimelineSection({ experiences }: TimelineSectionProps) {
  const getIcon = (type: Experience["type"]) => {
    switch (type) {
      case "work":
        return <Briefcase className="w-4 h-4" />
      case "education":
        return <GraduationCap className="w-4 h-4" />
      case "certification":
        return <Award className="w-4 h-4" />
      default:
        return <Briefcase className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: Experience["type"]) => {
    switch (type) {
      case "work":
        return "border-cyan-400 text-cyan-400"
      case "education":
        return "border-purple-400 text-purple-400"
      case "certification":
        return "border-green-400 text-green-400"
      default:
        return "border-cyan-400 text-cyan-400"
    }
  }

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Professional Journey
        </motion.h2>

        <div className="relative">
          {/* Central timeline line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-600 rounded-full"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ originY: 0 }}
          />

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 order-2"}`}>
                <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm group">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                          <Badge variant="outline" className={getTypeColor(experience.type)}>
                            {experience.startDate} - {experience.endDate}
                          </Badge>
                        </motion.div>
                      </div>
                      <CardTitle className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {experience.title}
                      </CardTitle>
                      <CardDescription className="text-purple-400">
                        {experience.company} • {experience.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.ul
                        className="text-gray-300 space-y-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {experience.description.map((item, idx) => (
                          <motion.li
                            key={idx}
                            className="text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                          >
                            • {item}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Timeline node */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                whileHover={{ scale: 1.2 }}
              >
                <motion.div className="text-black" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  {getIcon(experience.type)}
                </motion.div>

                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
