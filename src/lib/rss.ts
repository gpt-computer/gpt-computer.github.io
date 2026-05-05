export interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
}

export function generateRSS(items: RSSItem[], title: string, description: string): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${title}</title>
    <description>${description}</description>
    <link>https://gpt-computer.github.io</link>
${items
  .map(
    (item) => `    <item>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <description>${item.description}</description>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`
  return xml
}
