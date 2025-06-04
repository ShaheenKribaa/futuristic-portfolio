interface PageView {
  path: string
  timestamp: number
  userAgent: string
  referrer: string
}

interface AnalyticsEvent {
  name: string
  data: Record<string, any>
  timestamp: number
}

class Analytics {
  private static instance: Analytics
  private pageViews: PageView[] = []
  private events: AnalyticsEvent[] = []

  private constructor() {
    this.loadData()
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  public trackPageView(path: string) {
    const pageView: PageView = {
      path,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    }
    this.pageViews.push(pageView)
    this.saveData()
  }

  public trackEvent(name: string, data: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      name,
      data,
      timestamp: Date.now(),
    }
    this.events.push(event)
    this.saveData()
  }

  private saveData() {
    try {
      localStorage.setItem("analytics_page_views", JSON.stringify(this.pageViews))
      localStorage.setItem("analytics_events", JSON.stringify(this.events))
    } catch (error) {
      console.error("Error saving analytics data:", error)
    }
  }

  private loadData() {
    try {
      const pageViews = localStorage.getItem("analytics_page_views")
      const events = localStorage.getItem("analytics_events")
      if (pageViews) this.pageViews = JSON.parse(pageViews)
      if (events) this.events = JSON.parse(events)
    } catch (error) {
      console.error("Error loading analytics data:", error)
    }
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

  public getAnalyticsData() {
    const uniqueVisitors = new Set(
      this.pageViews.map((view) => view.userAgent)
    ).size

    const deviceTypes = Object.entries(
      this.pageViews.reduce((acc, view) => {
        const type = this.getDeviceType(view.userAgent)
        acc[type] = (acc[type] || 0) + 1
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

    return {
      totalVisits: this.pageViews.length,
      uniqueVisitors,
      averageTimeOnSite: this.getAverageTimeOnSite(),
      bounceRate: this.getBounceRate(),
      pageViews: this.pageViews.length,
      topPages,
      trafficSources,
      deviceTypes,
      dailyVisits: this.getDailyVisits(7),
    }
  }
}

export const analytics = Analytics.getInstance() 