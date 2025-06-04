"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HeroSection } from "@/components/sections/hero-section"
import { TimelineSection } from "@/components/timeline/timeline-section"
import { SkillsSection } from "@/components/skills-map/skills-section"
import { ProjectsSection } from "@/components/projects/projects-section"
import { FutureModule } from "@/components/sections/future-module"
import { CommandFooter } from "@/components/sections/command-footer"
import { FloatingNav } from "@/components/navigation/floating-nav"
import { ProjectController } from "@/lib/controllers/projectController"
import { getExperiences } from "@/lib/models/experienceModel"
import { getSkills } from "@/lib/models/skillModel"
import { ProgressIndicator } from "@/components/ui/progress-indicator"
import { PerformanceMonitor } from "@/components/monitoring/performance-monitor"
import type { PersonalInfo, Experience, Skill, Project } from "@/types"
import dynamic from "next/dynamic"
import Script from "next/script"

const personalInfo: PersonalInfo = {
  name: "Kribaa Chahine",
  title: "Freelance Web Developer & AI Enthusiast",
  location: "Constantine, Algeria",
  phone: "+213 792017211",
  email: "shaheenkribaa@gmail.com",
  linkedin: "LinkedIn Profile",
  bio: "Specializing in rapid development and modern tech stacks",
  profileImage: "/profile.jpg",
}

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  description: personalInfo.bio,
  image: personalInfo.profileImage,
  email: personalInfo.email,
  telephone: personalInfo.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: personalInfo.location,
  },
  sameAs: [
    personalInfo.linkedin,
    // Add other social media profiles here
  ],
  knowsAbout: [
    "Web Development",
    "Artificial Intelligence",
    "Full-stack Development",
    "System Architecture",
  ],
}

// Dynamically import heavy components
const FloatingChatbot = dynamic(
  () => import("@/components/chatbot/floating-chatbot").then((mod) => mod.FloatingChatbot),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-4 right-4 w-12 h-12 bg-cyan-500/20 rounded-full animate-pulse" />
    ),
  }
)

const AnimatedBackground = dynamic(
  () => import("@/components/ui/animated-background").then((mod) => mod.AnimatedBackground),
  {
    ssr: false,
  }
)

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <motion.div
      className="text-center space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.p
        className="text-gray-400 font-mono"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        Initializing portfolio systems...
      </motion.p>
    </motion.div>
  </div>
)

// Skip link component
const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-400 focus:text-black focus:rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
  >
    Skip to main content
  </a>
)

export default function Portfolio() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [experiencesData, skillsData, projectsData] = await Promise.all([
          getExperiences(),
          getSkills(),
          ProjectController.getFeaturedProjects(),
        ])

        setExperiences(experiencesData)
        setSkills(skillsData)
        setProjects(projectsData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
        <SkipLink />
        <ProgressIndicator />
        <PerformanceMonitor />
        <AnimatedBackground />

        <FloatingNav />

        <main id="main-content" className="relative z-10" role="main">
          <motion.section 
            id="hero" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
            aria-label="Hero section"
          >
            <HeroSection personalInfo={personalInfo} />
          </motion.section>

          <motion.section
            id="timeline"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            aria-label="Experience timeline"
          >
            <TimelineSection experiences={experiences} />
          </motion.section>

          <motion.section
            id="skills"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            aria-label="Skills and expertise"
          >
            <SkillsSection skills={skills} />
          </motion.section>

          <motion.section
            id="projects"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            aria-label="Featured projects"
          >
            <ProjectsSection projects={projects} />
          </motion.section>

          <motion.section
            id="future"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            aria-label="Future vision"
          >
            <FutureModule />
          </motion.section>

          <motion.section
            id="footer"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            aria-label="Contact and footer"
          >
            <CommandFooter />
          </motion.section>
        </main>

        <FloatingChatbot />
      </div>
    </>
  )
}
