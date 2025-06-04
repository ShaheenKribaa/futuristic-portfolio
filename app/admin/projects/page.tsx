"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleAddProject = () => {
    setIsAddingProject(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
  }

  const handleDeleteProject = async (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      // TODO: Implement project deletion
      console.log("Deleting project:", projectId)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="mt-2 text-gray-400">Manage your portfolio projects</p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center space-x-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.length === 0 ? (
          <div className="text-center py-12 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg">
            <p className="text-gray-400">No projects yet. Add your first project!</p>
          </div>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex space-x-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="text-gray-400 mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Project Modal */}
      {(isAddingProject || editingProject) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/90 border border-gray-800 rounded-lg p-6 w-full max-w-2xl"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              {isAddingProject ? "Add New Project" : "Edit Project"}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white"
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white"
                  rows={3}
                  placeholder="Enter project description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Technologies
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white"
                  placeholder="Enter technologies (comma-separated)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Live URL
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white"
                    placeholder="Enter live URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white"
                    placeholder="Enter GitHub URL"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  className="rounded border-gray-700 text-cyan-400 focus:ring-cyan-400"
                />
                <label htmlFor="featured" className="text-sm text-gray-300">
                  Featured Project
                </label>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingProject(false)
                    setEditingProject(null)
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors"
                >
                  {isAddingProject ? "Add Project" : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
} 