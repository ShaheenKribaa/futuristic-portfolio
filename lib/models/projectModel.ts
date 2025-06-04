import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Learning Web App",
    description: "Modern web application for student-teacher 1-on-1 sessions",
    longDescription:
      "Built a comprehensive e-learning platform that allows students to reserve individual sessions with teachers. Features include user authentication, session scheduling, payment integration, and real-time communication tools.",
    technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Figma"],
    startDate: "2024-11",
    endDate: "2025-02",
    status: "completed",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "2",
    title: "AI-Powered Personal Portfolio",
    description: "Portfolio website created entirely with AI assistance",
    longDescription:
      "Designed, developed, and deployed a personal portfolio website fully utilizing AI tools for planning, coding assistance, and deployment. Demonstrated strong adaptability to emerging technologies and efficient AI-powered development workflows.",
    technologies: ["Next.js", "AI Tools", "Vercel", "Responsive Design"],
    startDate: "2025-04",
    endDate: "2025-04",
    status: "completed",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "3",
    title: "TOPTW Optimization Solution",
    description: "Advanced solution for Team Orienteering Problem with Time Windows",
    longDescription:
      "Developed a novel solution for the Team Orienteering Problem with Time Windows (TOPTW) using Iterated Local Search (ILS) algorithm in Python. Implemented various optimization techniques and analyzed large datasets to improve solution accuracy.",
    technologies: ["Python", "Optimization Algorithms", "Data Analysis", "ILS"],
    startDate: "2024-03",
    endDate: "2024-09",
    status: "completed",
    githubUrl: "#",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "4",
    title: "Chat Room Application",
    description: "Real-time chat application with client-server architecture",
    longDescription:
      "Created a robust chat room application using Java with client-server architecture. Features include user management, message handling, connection stability, and real-time communication capabilities.",
    technologies: ["Java", "Socket Programming", "Client-Server Architecture"],
    startDate: "2021-01",
    endDate: "2021-06",
    status: "completed",
    githubUrl: "#",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "5",
    title: "Warehouse Management System",
    description: "Comprehensive inventory and order processing system",
    longDescription:
      "Developed a complete warehouse management system using SQL Developer and Java, optimizing inventory management and order processing workflows. Designed database structures and user-friendly interfaces.",
    technologies: ["Java", "SQL Developer", "Database Design", "UI/UX"],
    startDate: "2021-01",
    endDate: "2023-12",
    status: "completed",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
]

export async function getProjects(): Promise<Project[]> {
  // In a real app, this would fetch from Supabase
  return projects
}

export async function getProjectById(id: string): Promise<Project | null> {
  return projects.find((p) => p.id === id) || null
}
