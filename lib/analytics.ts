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
  region?: string
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
  private readonly STORAGE_KEYS = {
    pageViews: 'analytics_pageViews',
    events: 'analytics_events',
    heatmapData: 'analytics_heatmapData'
  }

  private constructor() {
    this.sessionStart = Date.now()
    this.currentSessionId = this.generateSessionId()
    this.loadData()
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

  private loadData() {
    if (typeof window === 'undefined') return

    try {
      // Load page views
      const pageViewsData = localStorage.getItem(this.STORAGE_KEYS.pageViews)
      if (pageViewsData) {
        this.pageViews = JSON.parse(pageViewsData)
      }

      // Load events
      const eventsData = localStorage.getItem(this.STORAGE_KEYS.events)
      if (eventsData) {
        this.events = JSON.parse(eventsData)
      }

      // Load heatmap data
      const heatmapData = localStorage.getItem(this.STORAGE_KEYS.heatmapData)
      if (heatmapData) {
        this.heatmapData = JSON.parse(heatmapData)
      }
    } catch (error) {
      console.warn('Failed to load analytics data:', error)
      // Reset data on error
      this.pageViews = []
      this.events = []
      this.heatmapData = []
      this.clearStorage()
    }
  }

  private saveData() {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(this.STORAGE_KEYS.pageViews, JSON.stringify(this.pageViews))
      localStorage.setItem(this.STORAGE_KEYS.events, JSON.stringify(this.events))
      localStorage.setItem(this.STORAGE_KEYS.heatmapData, JSON.stringify(this.heatmapData))
    } catch (error) {
      console.warn('Failed to save analytics data:', error)
      this.clearStorage()
    }
  }

  private clearStorage() {
    try {
      Object.values(this.STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.warn('Failed to clear analytics storage:', error)
    }
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
      const response = await fetch("https://ipinfo.io/json")
      const data = await response.json()
      pageView.ip = data.ip
      pageView.country = data.country
      pageView.city = data.city
      pageView.region = data.region
    } catch (error) {
      console.warn("Error fetching geolocation:", error)
    }

    // Check for duplicate user in the last 30 minutes
    const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000)
    const isDuplicate = this.pageViews.some(view => 
      view.ip === pageView.ip && 
      view.timestamp > thirtyMinutesAgo &&
      view.path === pageView.path
    )

    if (!isDuplicate) {
      this.pageViews.push(pageView)
      this.saveData()
    }
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

  private getReturningVisitors() {
    const uniqueIPs = new Set<string>()
    const returningIPs = new Set<string>()
    const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000)

    this.pageViews.forEach(view => {
      if (view.ip) {
        if (view.timestamp > thirtyMinutesAgo) {
          if (uniqueIPs.has(view.ip)) {
            returningIPs.add(view.ip)
          } else {
            uniqueIPs.add(view.ip)
          }
        }
      }
    })

    return {
      unique: uniqueIPs.size,
      returning: returningIPs.size
    }
  }

  private getGeolocationData() {
    const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000)
    const recentViews = this.pageViews.filter(view => view.timestamp > thirtyMinutesAgo)
    
    return {
      countries: Object.entries(
        recentViews.reduce((acc, view) => {
          if (view.country) {
            acc[view.country] = (acc[view.country] || 0) + 1
          }
          return acc
        }, {} as Record<string, number>)
      ).map(([country, count]) => ({
        country,
        visitors: count
      })),
      cities: Object.entries(
        recentViews.reduce((acc, view) => {
          if (view.city) {
            acc[view.city] = (acc[view.city] || 0) + 1
          }
          return acc
        }, {} as Record<string, number>)
      ).map(([city, count]) => ({
        city,
        visitors: count
      }))
    }
  }

  public getAnalyticsData() {
    const { unique, returning } = this.getReturningVisitors()
    const uniqueVisitors = unique + returning

    // Get visitor details, deduplicating by IP address
    const visitorDetails = Object.values(
      this.pageViews
        .filter(view => view.timestamp > Date.now() - (30 * 60 * 1000)) // Last 30 minutes
        .reduce((acc, view) => {
          // Only keep the most recent visit for each IP
          if (!acc[view.ip || 'unknown'] || view.timestamp > acc[view.ip || 'unknown'].timestamp) {
            acc[view.ip || 'unknown'] = {
              ip: view.ip || 'Unknown',
              country: view.country || 'Unknown',
              city: view.city || 'Unknown',
              browser: view.browser,
              os: view.os,
              deviceType: view.deviceType,
              timestamp: new Date(view.timestamp).toLocaleString(),
              path: view.path,
              timestamp_ms: view.timestamp // Keep original timestamp for sorting
            }
          }
          return acc
        }, {} as Record<string, any>)
    )
      .sort((a, b) => b.timestamp_ms - a.timestamp_ms) // Sort by most recent
      .map(({ timestamp_ms, ...visitor }) => visitor) // Remove temporary timestamp field

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
      visitorDetails,
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