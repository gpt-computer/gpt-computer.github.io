import { useState, useEffect } from "react"
import { X, Sparkles } from "lucide-react"

export function EasterEgg() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleKonami = () => {
      setShow(true)
      document.body.classList.add("konami-mode")
      setTimeout(() => {
        setShow(false)
        document.body.classList.remove("konami-mode")
      }, 5000)
    }

    window.addEventListener("konami", handleKonami)
    return () => window.removeEventListener("konami", handleKonami)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur">
      <div className="text-center space-y-4">
        <Sparkles className="h-16 w-16 mx-auto text-yellow-500 animate-bounce" />
        <h2 className="text-4xl font-bold">🎉 Konami Code Activated!</h2>
        <p className="text-muted-foreground">You found the easter egg!</p>
        <button
          onClick={() => setShow(false)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
          Close
        </button>
      </div>
    </div>
  )
}
