import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function useAnalytics() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window as unknown as { plausible?: (event: string, options: { u: string }) => void }
      if (w.plausible) {
        w.plausible("pageview", { u: window.location.href })
      }
    }
  }, [location])
}
