"use client"

import { useState, useEffect } from "react"
import { TimelineSection } from "@/components/timeline/timeline-section"
import { getExperiences } from "@/lib/models/experienceModel"
import type { Experience } from "@/types"

export default function TimelinePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await getExperiences()
        setExperiences(data)
      } catch (error) {
        console.error("Error loading experiences:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadExperiences()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading timeline...</p>
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
        <TimelineSection experiences={experiences} isVisible={true} />
      </div>
    </div>
  )
}
