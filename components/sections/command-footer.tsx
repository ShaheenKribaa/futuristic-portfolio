"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink } from "lucide-react"

export function CommandFooter() {
  const [currentTime, setCurrentTime] = useState("")
  const [commandHistory, setCommandHistory] = useState([
    "$ whoami",
    "kribaa_chahine",
    "$ pwd",
    "/home/portfolio",
    "$ ls -la skills/",
    "react.js  python.py  nextjs.ts  ai_ml.py",
    "$ status",
    "ONLINE - Available for hire",
  ])

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/kribaa",
      label: "GitHub",
      color: "hover:text-white hover:border-white",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/kribaa",
      label: "LinkedIn",
      color: "hover:text-blue-400 hover:border-blue-400",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:shaheenkribaa@gmail.com",
      label: "Email",
      color: "hover:text-red-400 hover:border-red-400",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      href: "tel:+213792017211",
      label: "Phone",
      color: "hover:text-green-400 hover:border-green-400",
    },
  ]

  const quickActions = [
    {
      icon: <Download className="w-4 h-4" />,
      label: "Download CV",
      action: () => {
        // Create a downloadable CV
        const link = document.createElement("a")
        link.href = "/cv-kribaa-chahine.pdf"
        link.download = "CV-Kribaa-Chahine.pdf"
        link.click()
      },
      color: "hover:text-cyan-400 hover:border-cyan-400",
    },
    {
      icon: <ExternalLink className="w-4 h-4" />,
      label: "View Projects",
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
      },
      color: "hover:text-purple-400 hover:border-purple-400",
    },
  ]

  return (
    <footer className="relative z-10 py-12 px-4 bg-gray-900/50 border-t border-gray-700">
      <div className="max-w-6xl mx-auto">
        {/* Terminal Interface */}
        <motion.div
          className="bg-black/80 rounded-lg border border-gray-700 overflow-hidden mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-3 h-3 bg-red-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="w-3 h-3 bg-yellow-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
              />
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
              />
            </div>
            <div className="text-gray-400 text-sm font-mono">terminal@portfolio:~$ {currentTime}</div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm space-y-1">
            {commandHistory.map((line, index) => (
              <motion.div
                key={index}
                className={`${
                  line.startsWith("$") ? "text-green-400" : line.includes("ONLINE") ? "text-cyan-400" : "text-gray-300"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {line}
              </motion.div>
            ))}

            <motion.div
              className="flex items-center space-x-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <span className="text-green-400">root@portfolio:~$</span>
              <span className="text-white">Thanks for visiting.</span>
              <motion.div
                className="w-2 h-4 bg-green-400"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Contact & Social Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-cyan-400 font-mono">CONTACT_PROTOCOLS</h3>
            <div className="space-y-3 text-gray-300">
              <motion.div
                className="flex items-center space-x-3 hover:text-cyan-400 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-sm">Constantine, Algeria</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 hover:text-cyan-400 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
                onClick={() => window.open("mailto:shaheenkribaa@gmail.com")}
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-sm">shaheenkribaa@gmail.com</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 hover:text-cyan-400 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
                onClick={() => window.open("tel:+213792017211")}
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-sm">+213 792017211</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-cyan-400 font-mono">SOCIAL_NETWORKS</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full border-gray-600 text-gray-400 transition-all duration-300 ${link.color} font-mono text-xs`}
                    onClick={() => window.open(link.href, "_blank")}
                  >
                    {link.icon}
                    <span className="ml-2">{link.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-cyan-400 font-mono">QUICK_ACTIONS</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full border-gray-600 text-gray-400 transition-all duration-300 ${action.color} font-mono text-xs`}
                    onClick={action.action}
                  >
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="pt-8 border-t border-gray-700 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 font-mono text-sm mb-2">
            © 2025 KRIBAA_CHAHINE.EXE - All rights reserved | Built with ❤️ and ☕
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 font-mono">
            <span>VERSION 2.0.1</span>
            <span>•</span>
            <span>LAST_UPDATED: {new Date().toLocaleDateString()}</span>
            <span>•</span>
            <motion.span
              className="text-green-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              STATUS: OPERATIONAL
            </motion.span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
