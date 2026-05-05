const BASE_URL = "https://gpt-computer.github.io"

export interface SitemapEntry {
  url: string
  lastModified?: string
  changeFreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}

export function generateSitemap(entries: SitemapEntry[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${BASE_URL}${entry.url}</loc>
    ${entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : ""}
    ${entry.changeFreq ? `<changefreq>${entry.changeFreq}</changefreq>` : ""}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`
  return xml
}

export const defaultSitemap: SitemapEntry[] = [
  { url: "/", changeFreq: "weekly", priority: 1.0 },
  { url: "/products", changeFreq: "monthly", priority: 0.8 },
  { url: "/repositories", changeFreq: "weekly", priority: 0.8 },
  { url: "/community", changeFreq: "monthly", priority: 0.7 },
  { url: "/blog", changeFreq: "weekly", priority: 0.8 },
  { url: "/releases", changeFreq: "weekly", priority: 0.7 },
]
