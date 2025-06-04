import { generateChatResponse, getKribaaContext } from "@/lib/openai"
import type { ChatMessage } from "@/types"

export class ChatController {
  static async processMessage(message: string): Promise<ReadableStream> {
    try {
      const context = getKribaaContext()
      const result = await generateChatResponse(message, context)
      return result.textStream
    } catch (error) {
      console.error("Error processing chat message:", error)
      throw new Error("Failed to process message")
    }
  }

  static getWelcomeMessage(): ChatMessage {
    return {
      id: "welcome",
      content:
        "Hello! I'm Kribaa's AI assistant. I can help you learn about his background, skills, projects, and experience. What would you like to know?",
      role: "assistant",
      timestamp: new Date(),
    }
  }

  static getSuggestedQuestions(): string[] {
    return [
      "Tell me about Kribaa's experience with AI and machine learning",
      "What projects has Kribaa worked on recently?",
      "What are Kribaa's main technical skills?",
      "How can I contact Kribaa for a project?",
      "What is Kribaa's educational background?",
    ]
  }
}
