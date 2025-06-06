"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Reduce number of particles from 30 to 15
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20" />

      {/* Circuit board pattern - reduced animation complexity */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, cyan 1px, transparent 1px),
            linear-gradient(180deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 30, // Increased duration for smoother animation
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Matrix rain effect - reduced number of particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-px h-20 bg-gradient-to-b from-cyan-400/80 to-transparent"
            style={{
              left: `${particle.x}%`,
            }}
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{
              y: "100vh",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 12, // Increased duration for smoother animation
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Single glowing orb instead of multiple */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6, // Increased duration for smoother animation
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
