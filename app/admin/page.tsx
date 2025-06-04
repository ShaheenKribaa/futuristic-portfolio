"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  Briefcase, 
  Code2, 
  User, 
  Settings,
  BarChart3,
  FileText
} from "lucide-react"

interface AdminCard {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
}

const adminCards: AdminCard[] = [
  {
    title: "Projects",
    description: "Manage your portfolio projects",
    icon: <Briefcase className="w-6 h-6" />,
    href: "/admin/projects",
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "Skills",
    description: "Update your skills and expertise",
    icon: <Code2 className="w-6 h-6" />,
    href: "/admin/skills",
    color: "from-purple-400 to-pink-500",
  },
  {
    title: "Experience",
    description: "Edit your work experience",
    icon: <FileText className="w-6 h-6" />,
    href: "/admin/experience",
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Profile",
    description: "Update your personal information",
    icon: <User className="w-6 h-6" />,
    href: "/admin/profile",
    color: "from-orange-400 to-red-500",
  },
  {
    title: "Analytics",
    description: "View portfolio statistics",
    icon: <BarChart3 className="w-6 h-6" />,
    href: "/admin/analytics",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Settings",
    description: "Configure your portfolio",
    icon: <Settings className="w-6 h-6" />,
    href: "/admin/settings",
    color: "from-gray-400 to-gray-500",
  },
]

export default function AdminDashboard() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-gray-400">Manage your portfolio content and settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card, index) => (
          <motion.a
            key={card.title}
            href={card.href}
            className="relative group"
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative overflow-hidden rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  <p className="text-sm text-gray-400">{card.description}</p>
                </div>
              </div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${card.color.split(' ')[1]}, ${card.color.split(' ')[3]})`,
                }}
                animate={{
                  opacity: hoveredCard === index ? 0.1 : 0,
                }}
              />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <p className="text-gray-400">No recent activity</p>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/50 rounded-lg">
              <p className="text-sm text-gray-400">Total Projects</p>
              <p className="text-2xl font-bold text-cyan-400">0</p>
            </div>
            <div className="p-4 bg-black/50 rounded-lg">
              <p className="text-sm text-gray-400">Total Skills</p>
              <p className="text-2xl font-bold text-purple-400">0</p>
            </div>
            <div className="p-4 bg-black/50 rounded-lg">
              <p className="text-sm text-gray-400">Experience Items</p>
              <p className="text-2xl font-bold text-green-400">0</p>
            </div>
            <div className="p-4 bg-black/50 rounded-lg">
              <p className="text-sm text-gray-400">Profile Views</p>
              <p className="text-2xl font-bold text-orange-400">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 