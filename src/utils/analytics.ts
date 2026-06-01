import { logEvent } from 'firebase/analytics'
import { analyticsPromise } from '../config/firebase'

export async function trackEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    const analytics = await analyticsPromise
    if (!analytics) return
    logEvent(analytics, eventName, params)
  } catch {
    // Analytics unavailable — silently ignore
  }
}

export function trackPageView(pageName: string) {
  trackEvent(`page_view_${pageName}`)
}
