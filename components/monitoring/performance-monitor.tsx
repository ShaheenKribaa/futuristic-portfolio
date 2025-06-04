"use client"

import { useEffect, useState } from 'react'
import { onCLS, onFCP, onLCP, Metric } from 'web-vitals'

interface PerformanceMetrics {
  cls: number | null
  fcp: number | null
  lcp: number | null
  ttfb: number | null
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cls: null,
    fcp: null,
    lcp: null,
    ttfb: null,
  })

  useEffect(() => {
    // Track Core Web Vitals
    onCLS((metric: Metric) => {
      setMetrics((prev) => ({ ...prev, cls: metric.value }))
      reportMetric('CLS', metric.value)
    })

    onFCP((metric: Metric) => {
      setMetrics((prev) => ({ ...prev, fcp: metric.value }))
      reportMetric('FCP', metric.value)
    })

    onLCP((metric: Metric) => {
      setMetrics((prev) => ({ ...prev, lcp: metric.value }))
      reportMetric('LCP', metric.value)
    })

    // Track Time to First Byte
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart
      setMetrics((prev) => ({ ...prev, ttfb }))
      reportMetric('TTFB', ttfb)
    }

    // Track memory usage
    if ('memory' in performance) {
      const memory = (performance as any).memory
      if (memory) {
        reportMetric('Memory', {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
        })
      }
    }
  }, [])

  const reportMetric = (name: string, value: number | object) => {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}:`, value)
    }

    // In production, send to your monitoring service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement your monitoring service here
      // Example: sendToMonitoring({ name, value })
    }
  }

  // This component doesn't render anything
  return null
} 