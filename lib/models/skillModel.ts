import type { Skill } from "@/types"

export const skills: Skill[] = [
  // Programming Languages
  {
    id: "1",
    name: "Python",
    category: "programming",
    level: 90,
    description: "Advanced proficiency in Python development",
  },
  {
    id: "2",
    name: "JavaScript",
    category: "programming",
    level: 88,
    description: "Expert in modern JavaScript and ES6+",
  },
  {
    id: "3",
    name: "TypeScript",
    category: "programming",
    level: 85,
    description: "Strong typing and advanced TypeScript patterns",
  },
  {
    id: "4",
    name: "Dart (Flutter)",
    category: "programming",
    level: 75,
    description: "Mobile app development with Flutter",
  },
  { id: "5", name: "SQL", category: "programming", level: 82, description: "Database design and optimization" },
  {
    id: "6",
    name: "Java",
    category: "programming",
    level: 78,
    description: "Object-oriented programming and enterprise applications",
  },

  // Frameworks & Libraries
  { id: "7", name: "React", category: "framework", level: 90, description: "Modern React with hooks and context" },
  { id: "8", name: "Next.js", category: "framework", level: 88, description: "Full-stack React framework expertise" },
  { id: "9", name: "Flutter", category: "framework", level: 75, description: "Cross-platform mobile development" },

  // Tools & Technologies
  { id: "10", name: "Git & GitHub", category: "tool", level: 85, description: "Version control and collaboration" },
  { id: "11", name: "Firebase", category: "tool", level: 80, description: "Backend-as-a-Service platform" },
  { id: "12", name: "Supabase", category: "tool", level: 85, description: "Open source Firebase alternative" },
  { id: "13", name: "Figma", category: "design", level: 78, description: "UI/UX design and prototyping" },

  // AI/ML
  {
    id: "14",
    name: "Prompt Engineering",
    category: "ai",
    level: 88,
    description: "AI agent creation and optimization",
  },
  { id: "15", name: "AI Agents", category: "ai", level: 85, description: "Task automation and problem-solving" },
  { id: "16", name: "Genetic Algorithms", category: "ai", level: 75, description: "Optimization problem solving" },

  // Languages
  { id: "17", name: "Arabic", category: "language", level: 100, description: "Native speaker" },
  {
    id: "18",
    name: "English",
    category: "language",
    level: 90,
    description: "Fluent in technical and business contexts",
  },
  { id: "19", name: "French", category: "language", level: 70, description: "Intermediate conversational level" },
]

export async function getSkills(): Promise<Skill[]> {
  return skills
}

export async function getSkillsByCategory(category: Skill["category"]): Promise<Skill[]> {
  return skills.filter((skill) => skill.category === category)
}
