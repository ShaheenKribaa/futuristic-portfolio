"use client"

import { motion } from "framer-motion"
import { Bell, Lock, Globe, Palette, Database, Shield } from "lucide-react"

const settings = [
  {
    title: "Notifications",
    icon: Bell,
    description: "Manage your notification preferences",
    settings: [
      { name: "Email Notifications", enabled: true },
      { name: "Push Notifications", enabled: false },
      { name: "Weekly Reports", enabled: true },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    description: "Manage your account security settings",
    settings: [
      { name: "Two-Factor Authentication", enabled: true },
      { name: "Password Change Required", enabled: false },
      { name: "Login Notifications", enabled: true },
    ],
  },
  {
    title: "Appearance",
    icon: Palette,
    description: "Customize your portfolio appearance",
    settings: [
      { name: "Dark Mode", enabled: true },
      { name: "Animations", enabled: true },
      { name: "Custom Theme", enabled: false },
    ],
  },
  {
    title: "Privacy",
    icon: Shield,
    description: "Manage your privacy settings",
    settings: [
      { name: "Profile Visibility", enabled: true },
      { name: "Analytics Tracking", enabled: true },
      { name: "Contact Form", enabled: true },
    ],
  },
  {
    title: "Data",
    icon: Database,
    description: "Manage your data and storage",
    settings: [
      { name: "Auto Backup", enabled: true },
      { name: "Data Export", enabled: true },
      { name: "Storage Optimization", enabled: false },
    ],
  },
  {
    title: "Language",
    icon: Globe,
    description: "Manage your language preferences",
    settings: [
      { name: "English", enabled: true },
      { name: "Spanish", enabled: false },
      { name: "French", enabled: false },
    ],
  },
]

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-gray-400">Manage your portfolio settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-cyan-400/20 rounded-lg">
                <category.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                <p className="text-sm text-gray-400">{category.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {category.settings.map((setting) => (
                <div key={setting.name} className="flex items-center justify-between">
                  <span className="text-gray-400">{setting.name}</span>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      setting.enabled ? "bg-cyan-400" : "bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 