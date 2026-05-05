import { useEffect } from "react"

export function useKeyboardShortcut(
  keys: string[],
  callback: () => void,
  deps: unknown[] = []
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyCombo = keys.every((key) => {
        if (key === "Meta") return e.metaKey
        if (key === "Ctrl") return e.ctrlKey
        if (key === "Shift") return e.shiftKey
        if (key === "Alt") return e.altKey
        return e.key.toLowerCase() === key.toLowerCase()
      })

      if (keyCombo) {
        e.preventDefault()
        callback()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, deps)
}
