export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  link: string
  technologies: string[]
}

export interface Skill {
  id: string
  name: string
  category: "programming" | "framework" | "tool" | "ai" | "design" | "language"
  level: number
  description?: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  startDate: string
  endDate: string
  status: "completed" | "in-progress" | "planned"
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export interface PersonalInfo {
  name: string
  title: string
  location: string
  phone: string
  email: string
  linkedin?: string
  github?: string
  bio: string
  profileImage: string
}
