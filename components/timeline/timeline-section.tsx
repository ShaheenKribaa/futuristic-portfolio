"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, Link, MapPin, ArrowRight } from "lucide-react"

interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  link: string
  technologies: string[]
}

interface TimelineSectionProps {
  experiences: Experience[]
}

export function TimelineSection({ experiences }: TimelineSectionProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Experience Timeline
        </h2>
        <p className="text-base sm:text-lg text-gray-400">My professional journey through time</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 hidden sm:block" />

        {/* Timeline items */}
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative flex flex-col sm:flex-row items-center"
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-cyan-400 z-10 hidden sm:block">
                <motion.div
                  className="absolute inset-0 rounded-full bg-cyan-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Content */}
              <div className="w-full sm:w-1/2 sm:pl-8 sm:pr-8">
                <motion.div
                  className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-cyan-400/50 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {experience.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-cyan-400 mt-1">
                        <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{experience.company}</span>
                      </div>
                    </div>
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors group/link mt-2 sm:mt-0"
                    >
                      <span>Visit Website</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{experience.period}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
                    {experience.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {experience.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 bg-cyan-400/20 text-cyan-400 rounded-full text-[10px] sm:text-xs md:text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
