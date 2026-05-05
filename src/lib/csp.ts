export function generateCSP(): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://plausible.io",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://*.githubusercontent.com",
    "font-src 'self' data:",
    "connect-src 'self' https://api.github.com https://plausible.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ]

  return directives.join("; ")
}

export function applyCSP() {
  if (typeof document !== "undefined") {
    const meta = document.createElement("meta")
    meta.httpEquiv = "Content-Security-Policy"
    meta.content = generateCSP()
    document.head.appendChild(meta)
  }
}
