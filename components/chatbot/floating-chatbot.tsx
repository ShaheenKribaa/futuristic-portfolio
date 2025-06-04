"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ChatMessage } from "@/types"
import { ChatController } from "@/lib/controllers/chatController"
import { MessageCircle, X, Send, Zap, Minimize2 } from "lucide-react"

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedQuestions = ChatController.getSuggestedQuestions()

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setMessages([ChatController.getWelcomeMessage()])
          setIsTyping(false)
        }, 1500)
      }, 500)
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

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

      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, response])
      setIsLoading(false)
      setIsTyping(false)
    }, 2000)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mb-4"
          >
            <Card
              className={`bg-gray-900/95 border-cyan-400 shadow-2xl shadow-cyan-400/20 backdrop-blur-sm flex flex-col transition-all duration-300 ${
                isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
              }`}
            >
              <CardHeader className="pb-2 border-b border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-cyan-400 flex items-center gap-2 font-mono">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                    Kribaa's AI Assistant
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Minimize2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex-1 flex flex-col overflow-hidden"
                  >
                    <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden p-4">
                      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                        <AnimatePresence>
                          {messages.map((message, index) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 20, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -20, scale: 0.8 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`p-3 rounded-lg text-sm ${
                                message.role === "user"
                                  ? "bg-cyan-600/20 border border-cyan-400/30 ml-8 text-cyan-100"
                                  : "bg-gray-800/50 border border-gray-600/30 mr-8 text-gray-300"
                              }`}
                            >
                              <div className="text-xs opacity-70 mb-1 font-mono">
                                {message.role === "user" ? "USER" : "AI_ASSISTANT"}
                              </div>
                              {message.content}
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-800/50 border border-gray-600/30 mr-8 p-3 rounded-lg text-sm"
                          >
                            <div className="text-xs opacity-70 mb-1 font-mono">AI_ASSISTANT</div>
                            <div className="flex items-center space-x-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 bg-cyan-400 rounded-full"
                                  animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                  }}
                                  transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.2,
                                  }}
                                />
                              ))}
                              <span className="ml-2 text-gray-400 font-mono text-xs">Processing...</span>
                            </div>
                          </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>

                      {messages.length === 1 && !isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2"
                        >
                          <p className="text-xs text-gray-400 font-mono">SUGGESTED_QUERIES:</p>
                          {suggestedQuestions.slice(0, 2).map((question, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleSuggestedQuestion(question)}
                              className="text-xs text-cyan-400 hover:text-cyan-300 block text-left w-full p-2 bg-gray-800/30 rounded border border-gray-700 hover:border-cyan-400/50 transition-colors font-mono"
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {">"} {question}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}

                      <div className="flex gap-2 flex-shrink-0">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          placeholder="Ask me anything..."
                          className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 font-mono text-sm"
                          disabled={isLoading}
                        />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            onClick={handleSendMessage}
                            disabled={isLoading || !input.trim()}
                            className="bg-cyan-500 hover:bg-cyan-600 text-black"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Orb Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(0, 255, 255, 0.3)",
            "0 0 30px rgba(0, 255, 255, 0.6)",
            "0 0 20px rgba(0, 255, 255, 0.3)",
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
        }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border-2 border-cyan-400 shadow-2xl transition-all duration-300 relative overflow-hidden"
        >
          {/* Orb Core */}
          <div className="relative z-10">
            <MessageCircle className="w-7 h-7" />
          </div>

          {/* Holographic rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-400/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-purple-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Energy particles */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Pulse indicator */}
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <Zap className="w-2 h-2 text-white" />
            </motion.div>
          )}
        </Button>
      </motion.div>
    </div>
  )
}
