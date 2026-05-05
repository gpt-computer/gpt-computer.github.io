import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function useAnalytics() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("pageview", { u: window.location.href })
    }
  }, [location])
}
