"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, MapPin, Mail, Phone, Zap } from "lucide-react"
import type { PersonalInfo } from "@/types"

interface HeroSectionProps {
  personalInfo: PersonalInfo
}

export function HeroSection({ personalInfo }: HeroSectionProps) {
  const [glitchText, setGlitchText] = useState("KRIBAA CHAHINE")
  const [isGlitching, setIsGlitching] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 4000)

    return () => clearInterval(glitchInterval)
  }, [])

  const handleLaunchPortfolio = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative px-4"
      aria-label="Hero section"
    >
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        {/* Holographic Avatar */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          role="presentation"
        >
          <div className="relative z-10">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              transition={{ type: "spring", stiffness: 300 }}
              role="presentation"
            >
              <div className="relative w-40 h-40 mx-auto">
                <Image
                  src={personalInfo.profileImage || "/profile.jpg"}
                  alt={`${personalInfo.name}'s profile picture`}
                  fill
                  sizes="(max-width: 768px) 160px, 160px"
                  className="rounded-full object-cover border-4 border-cyan-400 shadow-2xl shadow-cyan-400/50"
                  priority
                  onError={() => setImageError(true)}
                />
                {imageError && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full text-black text-4xl font-bold"
                    role="img"
                    aria-label={`${personalInfo.name}'s initials`}
                  >
                    {personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Holographic rings */}
          <div className="absolute inset-0 flex items-center justify-center" role="presentation">
            <motion.div
              className="w-48 h-48 border border-cyan-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute w-56 h-56 border border-purple-400/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              aria-hidden="true"
            />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0" role="presentation" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-2xl md:text-3xl text-cyan-400 font-mono tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {">"} WELCOME TO THE DIGITAL IDENTITY OF
          </motion.h1>

          <motion.h2
            className={`text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent transition-all duration-200 ${
              isGlitching ? "animate-pulse filter blur-sm" : ""
            }`}
            style={{
              textShadow: isGlitching ? "0 0 10px cyan, 0 0 20px cyan, 0 0 30px cyan" : "none",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {glitchText}
          </motion.h2>

          <motion.div
            className="text-xl md:text-2xl text-gray-300 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <p className="font-mono">
              <span className="text-cyan-400">Full-stack Engineer</span> ·
              <span className="text-purple-400"> AI Strategist</span> ·
              <span className="text-pink-400"> System Architect</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Contact badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          role="list"
          aria-label="Contact information"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} role="listitem">
            <Badge
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 px-4 py-2 cursor-pointer"
              aria-label={`Location: ${personalInfo.location}`}
            >
              <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
              {personalInfo.location}
            </Badge>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} role="listitem">
            <Badge
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300 px-4 py-2 cursor-pointer"
              aria-label={`Email: ${personalInfo.email}`}
            >
              <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
              {personalInfo.email}
            </Badge>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} role="listitem">
            <Badge
              variant="outline"
              className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 px-4 py-2 cursor-pointer"
              aria-label={`Phone: ${personalInfo.phone}`}
            >
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              {personalInfo.phone}
            </Badge>
          </motion.div>
        </motion.div>

        {/* Status indicators */}
        <motion.div
          className="flex justify-center space-x-8 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          role="status"
          aria-label="Current status"
        >
          <motion.div
            className="flex items-center space-x-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full" aria-hidden="true" />
            <span className="text-green-400">ONLINE</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full" aria-hidden="true" />
            <span className="text-cyan-400">AVAILABLE FOR HIRE</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          >
            <div className="w-2 h-2 bg-purple-400 rounded-full" aria-hidden="true" />
            <span className="text-purple-400">AI ENHANCED</span>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="pt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleLaunchPortfolio}
              size="lg"
              className="relative group bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 px-8 py-4 text-lg font-mono tracking-wider overflow-hidden"
              aria-label="Launch portfolio and scroll to timeline section"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Zap className="w-5 h-5" aria-hidden="true" />
                <span>LAUNCH PORTFOLIO</span>
              </span>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                aria-hidden="true"
              />

              {/* Scanning line */}
              <motion.div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                aria-hidden="true"
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          role="presentation"
          aria-hidden="true"
        >
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </motion.div>
      </div>
    </section>
  )
}
