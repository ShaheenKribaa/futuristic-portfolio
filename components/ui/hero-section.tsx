"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, MapPin, Mail, Phone } from "lucide-react"
import type { PersonalInfo } from "@/types"

interface HeroSectionProps {
  personalInfo: PersonalInfo
  isVisible: boolean
}

export function HeroSection({ personalInfo, isVisible }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <div
        className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="relative mb-8">
          <Avatar className="w-32 h-32 mx-auto border-4 border-cyan-400 shadow-lg shadow-cyan-400/50">
            <AvatarImage src={personalInfo.profileImage || "/placeholder.svg"} alt={personalInfo.name} />
            <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-purple-600 text-black text-2xl font-bold">
              {personalInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full opacity-20 blur-xl animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {personalInfo.name.toUpperCase()}
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4">{personalInfo.title}</p>

        <p className="text-lg text-cyan-400 mb-8 max-w-2xl mx-auto">{personalInfo.bio}</p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Badge
            variant="outline"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 px-4 py-2"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {personalInfo.location}
          </Badge>
          <Badge
            variant="outline"
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300 px-4 py-2"
          >
            <Mail className="w-4 h-4 mr-2" />
            {personalInfo.email}
          </Badge>
          <Badge
            variant="outline"
            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 px-4 py-2"
          >
            <Phone className="w-4 h-4 mr-2" />
            {personalInfo.phone}
          </Badge>
        </div>

        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105"
          onClick={() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })}
        >
          Explore My Journey
          <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
        </Button>
      </div>
    </section>
  )
}
