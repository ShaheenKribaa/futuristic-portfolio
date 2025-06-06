import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/providers/analytics-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chahine Kribaa",
  description: "A modern portfolio showcasing my work and skills",
  keywords: ["Full-stack Engineer", "AI Enthusiast", "Web Developer", "System Architect", "Portfolio"],
  authors: [{ name: "Kribaa Chahine" }],
  creator: "Kribaa Chahine",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-url.com",
    title: "Kribaa Chahine | Full-stack Engineer & AI Enthusiast",
    description: "Portfolio of Kribaa Chahine, a Full-stack Engineer and AI Enthusiast specializing in rapid development and modern tech stacks.",
    siteName: "Kribaa Chahine Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kribaa Chahine Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kribaa Chahine | Full-stack Engineer & AI Enthusiast",
    description: "Portfolio of Kribaa Chahine, a Full-stack Engineer and AI Enthusiast specializing in rapid development and modern tech stacks.",
    images: ["/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
