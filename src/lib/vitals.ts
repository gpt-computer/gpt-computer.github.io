import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals"

export function initVitals() {
  onCLS((metric) => sendToAnalytics("CLS", metric))
  onFCP((metric) => sendToAnalytics("FCP", metric))
  onINP((metric) => sendToAnalytics("INP", metric))
  onLCP((metric) => sendToAnalytics("LCP", metric))
  onTTFB((metric) => sendToAnalytics("TTFB", metric))
}

function sendToAnalytics(name: string, metric: any) {
  const body = JSON.stringify({
    name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta,
  })

  // Send to analytics endpoint or console
  console.log(`📈 Web Vital: ${name}`, metric.value)

  // In production, send to your analytics service
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/vitals", body)
  }
}

export function getVitalsSummary() {
  return {
    LCP: "Largest Contentful Paint - measures loading performance",
    INP: "Interaction to Next Paint - measures interactivity",
    CLS: "Cumulative Layout Shift - measures visual stability",
    FCP: "First Contentful Paint - first content render",
    TTFB: "Time to First Byte - server response time",
  }
}
