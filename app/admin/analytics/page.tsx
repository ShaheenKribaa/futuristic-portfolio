"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Eye,
  MousePointer,
  Clock,
  TrendingUp,
  Globe,
  Smartphone,
  Laptop,
} from "lucide-react"
import { analytics } from "@/lib/analytics"

interface AnalyticsData {
  totalVisits: number
  uniqueVisitors: number
  averageTimeOnSite: string
  bounceRate: number
  pageViews: number
  topPages: { path: string; views: number }[]
  trafficSources: { source: string; percentage: number }[]
  deviceTypes: { type: string; percentage: number }[]
  dailyVisits: { date: string; visits: number }[]
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d")
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalVisits: 0,
    uniqueVisitors: 0,
    averageTimeOnSite: "0m",
    bounceRate: 0,
    pageViews: 0,
    topPages: [],
    trafficSources: [],
    deviceTypes: [],
    dailyVisits: [],
  })

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true)
      try {
        const data = analytics.getAnalyticsData()
        setAnalyticsData(data)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [timeRange])

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string
    value: string | number
    icon: React.ElementType
    color: string
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color} bg-opacity-10`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="mt-2 text-gray-400">Track your portfolio performance</p>
        </div>
        <div className="flex space-x-2">
          {["7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as "7d" | "30d" | "90d")}
              className={`px-4 py-2 rounded-lg text-sm ${
                timeRange === range
                  ? "bg-cyan-400 text-black"
                  : "bg-black/50 text-gray-400 hover:text-white"
              } transition-colors`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Visits"
          value={analyticsData.totalVisits.toLocaleString()}
          icon={Users}
          color="text-cyan-400"
        />
        <StatCard
          title="Unique Visitors"
          value={analyticsData.uniqueVisitors.toLocaleString()}
          icon={Eye}
          color="text-purple-400"
        />
        <StatCard
          title="Page Views"
          value={analyticsData.pageViews.toLocaleString()}
          icon={MousePointer}
          color="text-green-400"
        />
        <StatCard
          title="Avg. Time on Site"
          value={analyticsData.averageTimeOnSite}
          icon={Clock}
          color="text-orange-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
          <div className="space-y-4">
            {analyticsData.topPages.map((page, index) => (
              <div key={page.path} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">{index + 1}.</span>
                  <span className="text-white">{page.path}</span>
                </div>
                <span className="text-cyan-400">{page.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {analyticsData.trafficSources.map((source) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white">{source.source}</span>
                  <span className="text-cyan-400">{source.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Device Types</h3>
          <div className="grid grid-cols-3 gap-4">
            {analyticsData.deviceTypes.map((device) => (
              <div
                key={device.type}
                className="text-center p-4 bg-black/50 rounded-lg"
              >
                <div className="flex justify-center mb-2">
                  {device.type === "Desktop" ? (
                    <Laptop className="w-6 h-6 text-cyan-400" />
                  ) : device.type === "Mobile" ? (
                    <Smartphone className="w-6 h-6 text-purple-400" />
                  ) : (
                    <Globe className="w-6 h-6 text-green-400" />
                  )}
                </div>
                <p className="text-sm text-gray-400">{device.type}</p>
                <p className="text-xl font-bold text-white mt-1">
                  {device.percentage}%
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Daily Visits</h3>
          <div className="h-[200px] flex items-end space-x-2">
            {analyticsData.dailyVisits.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-cyan-400 rounded-t-lg transition-all duration-300"
                  style={{
                    height: `${(day.visits / Math.max(...analyticsData.dailyVisits.map(d => d.visits))) * 100}%`,
                  }}
                />
                <span className="text-xs text-gray-400 mt-2">
                  {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 