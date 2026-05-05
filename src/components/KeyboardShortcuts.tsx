import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Keyboard } from "lucide-react"

const shortcuts = [
  { keys: ["g", "h"], description: "Go to Home" },
  { keys: ["g", "p"], description: "Go to Products" },
  { keys: ["g", "r"], description: "Go to Repositories" },
  { keys: ["g", "c"], description: "Go to Community" },
  { keys: ["/"], description: "Focus Search" },
  { keys: ["?"], description: "Show this help" },
]

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        setIsOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Keyboard className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
          </div>
          <div className="space-y-3">
            {shortcuts.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {s.description}
                </span>
                <div className="flex gap-1">
                  {s.keys.map((k) => (
                    <kbd
                      key={k}
                      className="px-2 py-1 text-xs bg-muted rounded border"
                    >
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
