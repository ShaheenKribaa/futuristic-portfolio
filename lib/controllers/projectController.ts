import { getProjects, getProjectById } from "@/lib/models/projectModel"
import type { Project } from "@/types"

export class ProjectController {
  static async getAllProjects(): Promise<Project[]> {
    try {
      return await getProjects()
    } catch (error) {
      console.error("Error fetching projects:", error)
      return []
    }
  }

  static async getProject(id: string): Promise<Project | null> {
    try {
      return await getProjectById(id)
    } catch (error) {
      console.error("Error fetching project:", error)
      return null
    }
  }

  static async getFeaturedProjects(): Promise<Project[]> {
    try {
      const projects = await getProjects()
      return projects.filter((p) => p.status === "completed").slice(0, 6)
    } catch (error) {
      console.error("Error fetching featured projects:", error)
      return []
    }
  }
}
