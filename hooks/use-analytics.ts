"use client"

import { useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { analytics } from "@/lib/analytics"

export function useAnalytics() {
  const pathname = usePathname()

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const rect = target.getBoundingClientRect()
    analytics.trackHeatmap(
      e.clientX - rect.left,
      e.clientY - rect.top,
      "click"
    )
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const rect = target.getBoundingClientRect()
    analytics.trackHeatmap(
      e.clientX - rect.left,
      e.clientY - rect.top,
      "hover",
      0.1
    )
  }, [])

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const viewportHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollPercentage = (scrollY / (documentHeight - viewportHeight)) * 100

    analytics.trackHeatmap(
      scrollPercentage,
      0,
      "scroll",
      0.5
    )
  }, [])

  useEffect(() => {
    // Track page view
    analytics.trackPageView(pathname)

    // Track time on page
    const startTime = Date.now()
    return () => {
      const timeSpent = Date.now() - startTime
      analytics.trackEvent("time_on_page", {
        path: pathname,
        duration: timeSpent,
      })
    }
  }, [pathname])

  useEffect(() => {
    // Add event listeners for heatmap tracking
    document.addEventListener("click", handleClick)
    document.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("click", handleClick)
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleClick, handleMouseMove, handleScroll])

  return {
    trackEvent: analytics.trackEvent.bind(analytics),
  }
} 