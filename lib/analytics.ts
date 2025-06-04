interface PageView {
  path: string
  timestamp: number
  userAgent: string
  referrer: string
  sessionId: string
  ip?: string
  country?: string
  city?: string
  browser: string
  os: string
  deviceType: string
  screenSize: {
    width: number
    height: number
  }
}

interface AnalyticsEvent {
  name: string
  data: Record<string, any>
  timestamp: number
  sessionId: string
  path: string
}

interface HeatmapData {
  x: number
  y: number
  value: number
  timestamp: number
  path: string
  type: "click" | "hover" | "scroll"
}

class Analytics {
  private static instance: Analytics
  private pageViews: PageView[] = []
  private events: AnalyticsEvent[] = []
  private heatmapData: HeatmapData[] = []
  private sessionStart: number
  private currentSessionId: string

  private constructor() {
    this.sessionStart = Date.now()
    this.currentSessionId = this.generateSessionId()
    if (typeof window !== 'undefined') {
      this.loadData()
    }
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  private getBrowserInfo(): { browser: string; os: string } {
    const ua = navigator.userAgent
    let browser = "Unknown"
    let os = "Unknown"

    // Browser detection
    if (ua.includes("Chrome")) browser = "Chrome"
    else if (ua.includes("Firefox")) browser = "Firefox"
    else if (ua.includes("Safari")) browser = "Safari"
    else if (ua.includes("Edge")) browser = "Edge"
    else if (ua.includes("MSIE") || ua.includes("Trident/")) browser = "Internet Explorer"

    // OS detection
    if (ua.includes("Windows")) os = "Windows"
    else if (ua.includes("Mac")) os = "MacOS"
    else if (ua.includes("Linux")) os = "Linux"
    else if (ua.includes("Android")) os = "Android"
    else if (ua.includes("iOS")) os = "iOS"

    return { browser, os }
  }

  public async trackPageView(path: string) {
    const { browser, os } = this.getBrowserInfo()
    const pageView: PageView = {
      path,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      sessionId: this.currentSessionId,
      browser,
      os,
      deviceType: this.getDeviceType(navigator.userAgent),
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }

    // Try to get geolocation data
    try {
      const response = await fetch("https://ipapi.co/json/")
      const data = await response.json()
      pageView.ip = data.ip
      pageView.country = data.country_name
      pageView.city = data.city
    } catch (error) {
      console.error("Error fetching geolocation:", error)
    }

    this.pageViews.push(pageView)
    this.saveData()
  }

  public trackEvent(name: string, data: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      name,
      data,
      timestamp: Date.now(),
      sessionId: this.currentSessionId,
      path: window.location.pathname,
    }
    this.events.push(event)
    this.saveData()
  }

  public trackHeatmap(x: number, y: number, type: "click" | "hover" | "scroll", value: number = 1) {
    const heatmapPoint: HeatmapData = {
      x,
      y,
      value,
      timestamp: Date.now(),
      path: window.location.pathname,
      type,
    }
    this.heatmapData.push(heatmapPoint)
    this.saveData()
  }

  private saveData() {
    if (typeof window === 'undefined') return
    localStorage.setItem('analytics_pageViews', JSON.stringify(this.pageViews))
    localStorage.setItem('analytics_events', JSON.stringify(this.events))
    localStorage.setItem('analytics_heatmapData', JSON.stringify(this.heatmapData))
  }

  private loadData() {
    if (typeof window === 'undefined') return
    const pageViews = localStorage.getItem('analytics_pageViews')
    const events = localStorage.getItem('analytics_events')
    const heatmapData = localStorage.getItem('analytics_heatmapData')

    if (pageViews) this.pageViews = JSON.parse(pageViews)
    if (events) this.events = JSON.parse(events)
    if (heatmapData) this.heatmapData = JSON.parse(heatmapData)
  }

  private getDeviceType(userAgent: string): string {
    if (/Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)) {
      return "Mobile"
    } else if (/Tablet|iPad/i.test(userAgent)) {
      return "Tablet"
    }
    return "Desktop"
  }

  private getTrafficSource(referrer: string): string {
    if (!referrer) return "Direct"
    if (referrer.includes("google")) return "Search"
    if (referrer.includes("facebook") || referrer.includes("twitter")) return "Social"
    return "Referral"
  }

  private getDailyVisits(days: number) {
    const now = Date.now()
    const dayInMs = 24 * 60 * 60 * 1000
    const visits = Array.from({ length: days }, (_, i) => {
      const date = new Date(now - i * dayInMs)
      const dateStr = date.toLocaleDateString()
      const dayVisits = this.pageViews.filter(
        (view) => new Date(view.timestamp).toLocaleDateString() === dateStr
      ).length
      return { date: dateStr, visits: dayVisits }
    }).reverse()
    return visits
  }

  private getAverageTimeOnSite(): string {
    const timeEvents = this.events.filter((event) => event.name === "time_on_page")
    if (timeEvents.length === 0) return "0m"

    const totalTime = timeEvents.reduce((sum, event) => sum + event.data.duration, 0)
    const averageTime = totalTime / timeEvents.length
    const minutes = Math.floor(averageTime / 60000)
    const seconds = Math.floor((averageTime % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  private getBounceRate(): number {
    const singlePageVisits = this.pageViews.filter(
      (view, index, self) =>
        self.findIndex((v) => v.timestamp - view.timestamp < 10000) === index
    ).length
    return (singlePageVisits / this.pageViews.length) * 100
  }

  private getReturningVisitors(): { unique: number; returning: number } {
    const visitorSessions = new Map<string, number>()
    this.pageViews.forEach((view) => {
      const count = visitorSessions.get(view.sessionId) || 0
      visitorSessions.set(view.sessionId, count + 1)
    })

    let unique = 0
    let returning = 0
    visitorSessions.forEach((count) => {
      if (count === 1) unique++
      else returning++
    })

    return { unique, returning }
  }

  private getGeolocationData() {
    const locations = this.pageViews.reduce((acc, view) => {
      if (view.country) {
        acc[view.country] = (acc[view.country] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    return Object.entries(locations).map(([country, count]) => ({
      country,
      visitors: count,
    }))
  }

  public getAnalyticsData() {
    const { unique, returning } = this.getReturningVisitors()
    const uniqueVisitors = unique + returning

    const deviceTypes = Object.entries(
      this.pageViews.reduce((acc, view) => {
        acc[view.deviceType] = (acc[view.deviceType] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    ).map(([type, count]) => ({
      type,
      percentage: Math.round((count / this.pageViews.length) * 100),
    }))

    const trafficSources = Object.entries(
      this.pageViews.reduce((acc, view) => {
        const source = this.getTrafficSource(view.referrer)
        acc[source] = (acc[source] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    ).map(([source, count]) => ({
      source,
      percentage: Math.round((count / this.pageViews.length) * 100),
    }))

    const topPages = Object.entries(
      this.pageViews.reduce((acc, view) => {
        acc[view.path] = (acc[view.path] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    )
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)

    const browserStats = Object.entries(
      this.pageViews.reduce((acc, view) => {
        acc[view.browser] = (acc[view.browser] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    ).map(([browser, count]) => ({
      browser,
      percentage: Math.round((count / this.pageViews.length) * 100),
    }))

    return {
      totalVisits: this.pageViews.length,
      uniqueVisitors,
      returningVisitors: returning,
      averageTimeOnSite: this.getAverageTimeOnSite(),
      bounceRate: this.getBounceRate(),
      pageViews: this.pageViews.length,
      topPages,
      trafficSources,
      deviceTypes,
      browserStats,
      dailyVisits: this.getDailyVisits(7),
      geolocation: this.getGeolocationData(),
      heatmapData: this.heatmapData,
    }
  }
}

export const analytics = Analytics.getInstance() 