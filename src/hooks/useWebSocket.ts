import { useEffect, useRef } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useWebSocket(url: string, _onMessage: (data: unknown) => void) {
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    // Placeholder for real WebSocket connection
    // In production, connect to your WebSocket server
    if (url) {
      console.log(`WebSocket placeholder: would connect to ${url}`)
    }

    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [url])

  const sendMessage = (data: unknown) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data))
    }
  }

  return { sendMessage }
}

// Example usage:
// const { sendMessage } = useWebSocket('wss://api.gpt-computer.org/ws', (data) => {
//   console.log('Received:', data)
// })
