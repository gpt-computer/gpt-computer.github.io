import { useEffect, useState } from "react"

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
]

export function useKonami(onActivate: () => void) {
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = [...keys, e.key]
      if (newKeys.length > KONAMI_CODE.length) {
        newKeys.shift()
      }
      setKeys(newKeys)

      if (newKeys.join(",") === KONAMI_CODE.join(",")) {
        onActivate()
        setKeys([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [keys, onActivate])
}
