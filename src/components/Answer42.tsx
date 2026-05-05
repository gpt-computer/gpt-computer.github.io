import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

export function Answer42() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 42000) // 42 seconds
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm font-medium">
          The answer to life, the universe, and everything: <strong>42</strong>
        </span>
      </div>
    </div>
  )
}
