"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    period: "2020 - Present",
    description: [
      "Led the development of a cloud-native microservices architecture",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Mentored junior developers and conducted code reviews",
      "Optimized database queries improving performance by 40%",
    ],
    technologies: ["React", "Node.js", "AWS", "Docker", "GraphQL"],
    link: "https://techcorp.example.com",
  },
  {
    title: "Full Stack Developer",
    company: "Startup Inc",
    location: "New York, NY",
    period: "2018 - 2020",
    description: [
      "Developed and maintained multiple client-facing applications",
      "Implemented real-time features using WebSocket",
      "Reduced server response time by 50% through optimization",
      "Collaborated with UX designers to improve user experience",
    ],
    technologies: ["Vue.js", "Express", "MongoDB", "Redis", "Socket.io"],
    link: "https://startupinc.example.com",
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency",
    location: "Boston, MA",
    period: "2016 - 2018",
    description: [
      "Built responsive web applications for various clients",
      "Implemented complex UI components and animations",
      "Worked with REST APIs and third-party integrations",
      "Participated in agile development processes",
    ],
    technologies: ["Angular", "TypeScript", "SCSS", "REST APIs", "Jest"],
    link: "https://digitalagency.example.com",
  },
]

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Experience</h1>
        <p className="mt-2 text-gray-400">Manage your work experience and achievements</p>
      </div>

      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Briefcase className="w-4 h-4" />
                    <span>{experience.company}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{experience.period}</span>
                  </div>
                </div>
              </div>
              <a
                href={experience.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Key Responsibilities</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                {experience.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 