"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"
import { Button } from "./button"

export function ProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const rafRef = useRef<number>()
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        // Only update if scroll position changed significantly
        if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight
          const currentProgress = (currentScrollY / totalScroll) * 100
          setScrollProgress(currentProgress)
          setShowBackToTop(currentScrollY > window.innerHeight / 2)
          lastScrollY.current = currentScrollY
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={scrollToTop}
              className="relative group bg-black/50 backdrop-blur-sm border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 p-3 rounded-full"
              aria-label="Back to top"
            >
              <ChevronUp className="w-6 h-6" />
              <motion.div
                className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                aria-hidden="true"
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 