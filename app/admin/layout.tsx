"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Skip auth check for login page
        if (pathname === "/admin/login") {
          setIsLoading(false)
          return
        }

        const isAdmin = localStorage.getItem("admin_token")
        if (!isAdmin) {
          router.replace("/admin/login")
        } else {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Auth error:", error)
        router.replace("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto" />
          <p className="text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Allow login page to render without authentication
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Show nothing if not authenticated
  if (!isAuthenticated) {
    return null
  }

  // Render admin layout for authenticated users
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-cyan-400 font-bold">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  localStorage.removeItem("admin_token")
                  router.replace("/admin/login")
                }}
                className="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
} 