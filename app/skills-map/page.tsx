"use client"

import { useState, useEffect } from "react"
import { SkillsSection } from "@/components/skills-map/skills-section"
import { getSkills } from "@/lib/models/skillModel"
import type { Skill } from "@/types"

export default function SkillsMapPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await getSkills()
        setSkills(data)
      } catch (error) {
        console.error("Error loading skills:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSkills()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading skills...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      </div>

      <div className="relative z-10 pt-20">
        <SkillsSection skills={skills} isVisible={true} />
      </div>
    </div>
  )
}
