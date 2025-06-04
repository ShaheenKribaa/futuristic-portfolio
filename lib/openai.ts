import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateChatResponse(message: string, context: string) {
  const result = await streamText({
    model: openai("gpt-4o"),
    system: `You are Kribaa Chahine's AI assistant. You help visitors learn about Kribaa's background, skills, and projects. 
    
    Context about Kribaa:
    ${context}
    
    Be helpful, professional, and knowledgeable about Kribaa's experience. Keep responses concise but informative.`,
    prompt: message,
  })

  return result
}

export function getKribaaContext(): string {
  return `
    Kribaa Chahine is a Freelance Web Developer and AI Enthusiast from Constantine, Algeria.
    
    Current Role: Freelance Web Developer & AI Solutions Engineer (January 2024 – Present)
    
    Education:
    - Master's Degree in System Information and Decision Support (2021-2024)
    - Bachelor's Degree in Information Systems (2018-2021)
    
    Core Skills:
    - Programming: Python, JavaScript, Dart (Flutter), SQL
    - Frameworks: React, Next.js
    - Tools: Git, GitHub, Firebase, Supabase
    - AI/ML: Prompt Engineering, AI Agents
    - Languages: Arabic (native), English (fluent), French (intermediate)
    
    Key Projects:
    - E-Learning Web App (Next.js + Supabase)
    - AI-Powered Personal Portfolio
    - TOPTW Optimization Solution
    - Chat Room Application (Java)
    - Genetic Algorithms Implementation
    
    Specializes in rapid development, modern tech stacks, and AI solutions.
  `
}
