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
  Map,
  Monitor,
  Download,
} from "lucide-react"
import { analytics } from "@/lib/analytics"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

interface AnalyticsData {
  totalVisits: number
  uniqueVisitors: number
  returningVisitors: number
  visitorDetails: {
    ip: string
    country: string
    city: string
    browser: string
    os: string
    deviceType: string
    timestamp: string
    path: string
  }[]
  topPages: { path: string; views: number }[]
  trafficSources: { source: string; percentage: number }[]
  deviceTypes: { type: string; percentage: number }[]
  browserStats: { browser: string; percentage: number }[]
  dailyVisits: { date: string; visits: number }[]
  geolocation: { country: string; visitors: number }[]
  heatmapData: {
    x: number
    y: number
    value: number
    type: "click" | "hover" | "scroll"
  }[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalVisits: 0,
    uniqueVisitors: 0,
    returningVisitors: 0,
    visitorDetails: [],
    topPages: [],
    trafficSources: [],
    deviceTypes: [],
    browserStats: [],
    dailyVisits: [],
    geolocation: [],
    heatmapData: [],
  })

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = analytics.getAnalyticsData()
        setAnalyticsData(data)
      } catch (error) {
        console.error("Error fetching analytics:", error)
        setError("Failed to load analytics data. Please try again later.")
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

  const exportToCSV = () => {
    const headers = [
      "Metric",
      "Value",
      "Date Range",
    ]

    const data = [
      ["Total Visits", analyticsData.totalVisits, timeRange],
      ["Unique Visitors", analyticsData.uniqueVisitors, timeRange],
      ["Returning Visitors", analyticsData.returningVisitors, timeRange],
      ["Average Time on Site", analyticsData.averageTimeOnSite, timeRange],
      ["Bounce Rate", `${analyticsData.bounceRate.toFixed(2)}%`, timeRange],
      ["Page Views", analyticsData.pageViews, timeRange],
    ]

    const csvContent = [
      headers.join(","),
      ...data.map(row => row.join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `analytics-export-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

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
          <button
            onClick={exportToCSV}
            className="px-4 py-2 rounded-lg text-sm bg-green-400 text-black hover:bg-green-300 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
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
          title="Returning Visitors"
          value={analyticsData.returningVisitors.toLocaleString()}
          icon={TrendingUp}
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
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.trafficSources}
                  dataKey="percentage"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {analyticsData.trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
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
          <h3 className="text-lg font-semibold text-white mb-4">Browser Usage</h3>
          <div className="space-y-4">
            {analyticsData.browserStats.map((browser) => (
              <div key={browser.browser} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4 text-cyan-400" />
                    <span className="text-white">{browser.browser}</span>
                  </div>
                  <span className="text-cyan-400">{browser.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${browser.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Visitors</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {analyticsData.visitorDetails.map((visitor, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">IP:</span>
                    <span className="text-white ml-2">{visitor.ip}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white ml-2">{visitor.city}, {visitor.country}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Browser:</span>
                    <span className="text-white ml-2">{visitor.browser}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">OS:</span>
                    <span className="text-white ml-2">{visitor.os}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Device:</span>
                    <span className="text-white ml-2">{visitor.deviceType}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white ml-2">{visitor.timestamp}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Page:</span>
                    <span className="text-white ml-2">{visitor.path}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Visitor Locations</h3>
          <div className="h-[400px]">
            <ComposableMap>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryData = analyticsData.geolocation.find(
                      (d) => d.country === geo.properties.name
                    )
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={countryData ? "#0EA5E9" : "#1F2937"}
                        stroke="#374151"
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "#38BDF8" },
                          pressed: { outline: "none", fill: "#0284C7" },
                        }}
                      />
                    )
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
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

      <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">User Engagement Heatmap</h3>
        <div className="relative h-[400px] bg-gray-900 rounded-lg overflow-hidden">
          {analyticsData.heatmapData.map((point, index) => (
            <div
              key={index}
              className="absolute w-4 h-4 rounded-full bg-cyan-400/20"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: point.value,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 