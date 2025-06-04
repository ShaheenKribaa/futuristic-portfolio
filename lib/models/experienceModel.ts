import type { Experience } from "@/types"

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Freelance Web Developer & AI Solutions Engineer",
    company: "Remote",
    location: "Remote",
    period: "2024 - Present",
    description: "Designed and developed responsive web applications using Next.js and Supabase. Created feature-rich e-learning platform for student-teacher interaction. Specialized in AI agents and prompt engineering for task automation.",
    link: "https://github.com/yourusername",
    technologies: ["Next.js", "Supabase", "AI/ML", "Figma", "TypeScript", "React"],
  },
  {
    id: "2",
    title: "IT Intern",
    company: "Algerie Qatari Steel",
    location: "Milia, Jijel",
    period: "2021",
    description: "Gained hands-on experience with SAP ERP systems under PwC and Seidor supervision. Contributed to ERP implementation across 5 major departments.",
    link: "https://www.aqs.dz",
    technologies: ["SAP", "ERP", "IT Support", "System Configuration"],
  },
  {
    id: "3",
    title: "Restaurant Staff Member",
    company: "Traditional Restaurant",
    location: "Oran, Algeria",
    period: "2025",
    description: "Worked long shifts in fast-paced environment. Managed peak hours with 30+ customers in small venue. Collaborated with small team to maintain efficiency and service quality.",
    link: "#",
    technologies: ["Customer Service", "Team Management", "Resource Optimization"],
  },
  {
    id: "4",
    title: "Master's Degree in System Information and Decision Support",
    company: "Mohammed Seddik Benyahia University",
    location: "Jijel",
    period: "2021 - 2024",
    description: "Specialized in Decision Support Systems, Systems Design and Analysis, IT Project Management, and Operations Research.",
    link: "https://www.univ-jijel.dz",
    technologies: ["Decision Support Systems", "IT Project Management", "Operations Research"],
  },
  {
    id: "5",
    title: "Bachelor's Degree in Information Systems",
    company: "Mohammed Seddik Benyahia University",
    location: "Jijel",
    period: "2018 - 2021",
    description: "Studied Database Management Systems, Software Engineering, Programming in Python and Java, Web Development, Systems Integration, and Information Security.",
    link: "https://www.univ-jijel.dz",
    technologies: ["Database Management", "Software Engineering", "Python", "Java", "Web Development"],
  },
]

export async function getExperiences(): Promise<Experience[]> {
  return experiences
}

export async function getExperiencesByType(type: string): Promise<Experience[]> {
  return experiences.filter((exp) => exp.technologies.includes(type))
}
