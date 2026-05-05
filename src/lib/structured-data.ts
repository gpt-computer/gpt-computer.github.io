export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GPT Computer",
    url: "https://gpt-computer.github.io",
    logo: "https://gpt-computer.github.io/icon-512.png",
    sameAs: ["https://github.com/gpt-computer"],
    description: "Building the future of AI-powered computing tools and libraries",
  }
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GPT Computer Organization",
    url: "https://gpt-computer.github.io",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://gpt-computer.github.io/repositories?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
