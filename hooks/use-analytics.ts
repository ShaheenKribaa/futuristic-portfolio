"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { analytics } from "@/lib/analytics"

export function useAnalytics() {
  const pathname = usePathname()

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

  return {
    trackEvent: analytics.trackEvent.bind(analytics),
  }
} 