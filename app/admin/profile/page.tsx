"use client"

import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="mt-2 text-gray-400">Manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4">
              <User className="w-16 h-16 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">John Doe</h2>
            <p className="text-gray-400">Full Stack Developer</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3 text-gray-400">
              <Mail className="w-5 h-5" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <Phone className="w-5 h-5" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </motion.div>

        {/* Professional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Professional Summary</h3>
            <p className="text-gray-400">
              Experienced full-stack developer with a passion for creating elegant solutions
              to complex problems. Specialized in modern web technologies and cloud architecture.
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "TypeScript", "Python", "AWS", "Docker"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Experience</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium">Senior Developer</h4>
                  <p className="text-gray-400">Tech Corp • 2020 - Present</p>
                </div>
                <div>
                  <h4 className="text-white font-medium">Full Stack Developer</h4>
                  <p className="text-gray-400">Startup Inc • 2018 - 2020</p>
                </div>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Education</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium">Master of Computer Science</h4>
                  <p className="text-gray-400">Stanford University • 2016 - 2018</p>
                </div>
                <div>
                  <h4 className="text-white font-medium">Bachelor of Science</h4>
                  <p className="text-gray-400">MIT • 2012 - 2016</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 