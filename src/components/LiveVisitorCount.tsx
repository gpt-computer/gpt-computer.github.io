import { useEffect, useState } from "react"
import { Users } from "lucide-react"

export function LiveVisitorCount() {
  const [count, setCount] = useState(1)

  useEffect(() => {
    // Placeholder for real-time visitor tracking
    // In production, use WebSocket or Server-Sent Events
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Users className="h-4 w-4" />
      <span>
        <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse" />
        {Math.max(1, count)} live
      </span>
    </div>
  )
}
