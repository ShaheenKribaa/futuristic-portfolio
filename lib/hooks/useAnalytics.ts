import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type EventName = 
  | 'page_view'
  | 'section_view'
  | 'project_click'
  | 'skill_click'
  | 'contact_click'
  | 'download_cv'

interface AnalyticsEvent {
  name: EventName
  properties?: Record<string, any>
}

export function useAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views
    trackEvent({
      name: 'page_view',
      properties: {
        path: pathname,
        search: searchParams.toString(),
        timestamp: new Date().toISOString(),
      },
    })
  }, [pathname, searchParams])

  const trackEvent = (event: AnalyticsEvent) => {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event)
    }

    // In production, send to your analytics service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement your analytics service here
      // Example: sendToAnalytics(event)
    }
  }

  const trackSectionView = (sectionId: string) => {
    trackEvent({
      name: 'section_view',
      properties: {
        sectionId,
        timestamp: new Date().toISOString(),
      },
    })
  }

  const trackProjectClick = (projectId: string, projectName: string) => {
    trackEvent({
      name: 'project_click',
      properties: {
        projectId,
        projectName,
        timestamp: new Date().toISOString(),
      },
    })
  }

  const trackSkillClick = (skillId: string, skillName: string) => {
    trackEvent({
      name: 'skill_click',
      properties: {
        skillId,
        skillName,
        timestamp: new Date().toISOString(),
      },
    })
  }

  const trackContactClick = (method: string) => {
    trackEvent({
      name: 'contact_click',
      properties: {
        method,
        timestamp: new Date().toISOString(),
      },
    })
  }

  const trackDownloadCV = () => {
    trackEvent({
      name: 'download_cv',
      properties: {
        timestamp: new Date().toISOString(),
      },
    })
  }

  return {
    trackEvent,
    trackSectionView,
    trackProjectClick,
    trackSkillClick,
    trackContactClick,
    trackDownloadCV,
  }
} 