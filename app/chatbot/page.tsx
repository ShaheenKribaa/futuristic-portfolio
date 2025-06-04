"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ChatMessage } from "@/types"
import { ChatController } from "@/lib/controllers/chatController"
import { Send, MessageCircle } from "lucide-react"

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([ChatController.getWelcomeMessage()])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const suggestedQuestions = ChatController.getSuggestedQuestions()

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const stream = await ChatController.processMessage(input)
      const reader = stream.getReader()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        assistantMessage.content += chunk

        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: assistantMessage.content } : msg)),
        )
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble responding right now. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Chat with Kribaa's AI Assistant
            </h1>
            <p className="text-gray-400">Ask me anything about Kribaa's background, skills, and projects</p>
          </div>

          <Card className="bg-gray-900/50 border-cyan-400 shadow-lg shadow-cyan-400/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                AI Assistant
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2" />
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-800/50 rounded-lg">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.role === "user" ? "bg-cyan-600 text-white ml-12" : "bg-gray-700 text-gray-300 mr-12"
                    }`}
                  >
                    <div className="text-sm mb-1 opacity-70">{message.role === "user" ? "You" : "AI Assistant"}</div>
                    {message.content}
                  </div>
                ))}
                {isLoading && (
                  <div className="bg-gray-700 text-gray-300 mr-12 p-4 rounded-lg">
                    <div className="text-sm mb-1 opacity-70">AI Assistant</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100" />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200" />
                    </div>
                  </div>
                )}
              </div>

              {messages.length === 1 && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">Try asking:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-sm text-cyan-400 hover:text-cyan-300 p-3 bg-gray-800/50 rounded-lg text-left hover:bg-gray-800 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything about Kribaa..."
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-cyan-500 hover:bg-cyan-600 px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
