import type { Experience } from "@/types"

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Freelance Web Developer & AI Solutions Engineer",
    company: "Remote",
    location: "Remote",
    startDate: "2024-01",
    endDate: "Present",
    type: "work",
    description: [
      "Designed and developed responsive web applications using Next.js and Supabase",
      "Created feature-rich e-learning platform for student-teacher interaction",
      "Specialized in AI agents and prompt engineering for task automation",
      "Collaborated with clients to deliver scalable solutions under tight deadlines",
      "Utilized Figma for intuitive UI/UX design and user experience optimization",
    ],
  },
  {
    id: "2",
    title: "IT Intern",
    company: "Algerie Qatari Steel",
    location: "Milia, Jijel",
    startDate: "2021-07",
    endDate: "2021-10",
    type: "work",
    description: [
      "Gained hands-on experience with SAP ERP systems under PwC and Seidor supervision",
      "Contributed to ERP implementation across 5 major departments",
      "Collaborated with 10+ IT professionals in multinational environment",
      "Assisted with system configuration, troubleshooting, and support",
      "Participated in key projects optimizing ERP functionalities",
    ],
  },
  {
    id: "3",
    title: "Restaurant Staff Member",
    company: "Traditional Restaurant",
    location: "Oran, Algeria",
    startDate: "2025-01",
    endDate: "2025-12",
    type: "work",
    description: [
      "Worked long shifts (7 AM to 11 PM) in fast-paced environment",
      "Managed peak hours with 30+ customers in small venue",
      "Collaborated with small team to maintain efficiency and service quality",
      "Optimized limited space and resources for smooth customer service",
      "Delivered excellent customer service under pressure",
    ],
  },
  {
    id: "4",
    title: "Master's Degree in System Information and Decision Support",
    company: "Mohammed Seddik Benyahia University",
    location: "Jijel",
    startDate: "2021-09",
    endDate: "2024-09",
    type: "education",
    description: [
      "Decision Support Systems",
      "Systems Design and Analysis",
      "IT Project Management",
      "Operations Research",
    ],
  },
  {
    id: "5",
    title: "Bachelor's Degree in Information Systems",
    company: "Mohammed Seddik Benyahia University",
    location: "Jijel",
    startDate: "2018-09",
    endDate: "2021-06",
    type: "education",
    description: [
      "Database Management Systems",
      "Software Engineering",
      "Programming in Python and Java",
      "Web Development",
      "Systems Integration",
      "Information Security",
    ],
  },
]

export async function getExperiences(): Promise<Experience[]> {
  return experiences
}

export async function getExperiencesByType(type: Experience["type"]): Promise<Experience[]> {
  return experiences.filter((exp) => exp.type === type)
}
