"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Zap } from "lucide-react"
import { HolographicText } from "@/components/three/holographic-text"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [pulseIntensity, setPulseIntensity] = useState(1)

  // Pulsing effect for the AI orb
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity(Math.random() * 0.5 + 0.5)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setMessages([
            {
              id: "welcome",
              content:
                "Greetings, visitor. I am Kribaa's Personal AI Guide. I can provide insights about his projects, skills, and professional journey. How may I assist you today?",
              role: "assistant",
              timestamp: new Date(),
            },
          ])
          setIsTyping(false)
        }, 1500)
      }, 500)
    }
  }, [isOpen, messages.length])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Kribaa specializes in full-stack development with expertise in React, Next.js, and Python. His recent projects include an e-learning platform and AI-powered solutions.",
        "Based on his portfolio, Kribaa has strong experience in modern web technologies, AI/ML integration, and rapid prototyping. He's particularly skilled in Next.js and Supabase.",
        "Kribaa's background includes a Master's in System Information and Decision Support. He's worked on optimization algorithms, neural networks, and web applications.",
        "His technical stack includes React, TypeScript, Python, Next.js, and various AI tools. He's also experienced with Docker, GraphQL, and cloud platforms.",
        "Kribaa is available for freelance projects and specializes in rapid development cycles. You can reach him at shaheenkribaa@gmail.com for collaboration opportunities.",
      ]

      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 2000)
  }

  const suggestedQuestions = [
    "What are Kribaa's main technical skills?",
    "Tell me about his recent projects",
    "What's his educational background?",
    "How can I contact him for a project?",
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Modal */}
      {isOpen && (
        <Card className="mb-4 w-96 h-[500px] bg-gray-900/95 border-cyan-400 shadow-2xl shadow-cyan-400/20 backdrop-blur-sm animate-in slide-in-from-bottom duration-300 flex flex-col">
          <CardHeader className="pb-3 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                </div>
                <div className="h-8">
                  <HolographicText text="AI GUIDE" width={120} height={32} fontSize={0.3} color="#00ffff" />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-400 font-mono">Neural Network Status: ACTIVE | Response Time: ~2s</div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-cyan-600/20 border border-cyan-400/30 ml-8 text-cyan-100"
                      : "bg-gray-800/50 border border-gray-600/30 mr-8 text-gray-300"
                  }`}
                >
                  <div className="text-xs opacity-70 mb-1 font-mono">
                    {message.role === "user" ? "USER" : "AI_GUIDE"}
                  </div>
                  {message.content}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="bg-gray-800/50 border border-gray-600/30 mr-8 p-3 rounded-lg text-sm">
                  <div className="text-xs opacity-70 mb-1 font-mono">AI_GUIDE</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200" />
                    <span className="ml-2 text-gray-400 font-mono text-xs">Processing query...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && !isTyping && (
              <div className="mb-4 space-y-2">
                <div className="text-xs text-gray-400 font-mono">SUGGESTED_QUERIES:</div>
                {suggestedQuestions.slice(0, 2).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 block text-left w-full p-2 bg-gray-800/30 rounded border border-gray-700 hover:border-cyan-400/50 transition-colors font-mono"
                  >
                    {">"} {question}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2 flex-shrink-0">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Enter query..."
                className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 font-mono text-sm"
                disabled={isTyping}
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                disabled={isTyping || !input.trim()}
                className="bg-cyan-500 hover:bg-cyan-600 text-black"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Orb Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border-2 border-cyan-400 shadow-2xl transition-all duration-300 transform hover:scale-110 relative overflow-hidden"
        style={{
          boxShadow: `0 0 ${20 * pulseIntensity}px rgba(0, 255, 255, ${0.5 * pulseIntensity})`,
        }}
      >
        {/* Orb Core */}
        <div className="relative z-10">
          <MessageCircle className="w-7 h-7" />
        </div>

        {/* Holographic rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping" />
        <div
          className="absolute inset-2 rounded-full border border-purple-400/20 animate-spin"
          style={{ animationDuration: "3s" }}
        />

        {/* Energy particles */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Pulse indicator */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
            <Zap className="w-2 h-2 text-white" />
          </div>
        )}
      </Button>
    </div>
  )
}
