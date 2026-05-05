import { ProductCard } from "./ProductCard"

const featuredProducts = [
  {
    name: "GPT Computer Agent",
    description: "AI-powered computer automation agent with natural language interface.",
    status: "stable" as const,
    category: "Core",
    tags: ["AI", "Automation", "Agent"],
    repoUrl: "https://github.com/gpt-computer/gpt-computer",
  },
  {
    name: "GPT Computer API",
    description: "RESTful API for GPT Computer services and integrations.",
    status: "beta" as const,
    category: "Core",
    tags: ["API", "Backend", "REST"],
    repoUrl: "https://github.com/gpt-computer/gpt-computer-api",
  },
  {
    name: "GPT Computer CLI",
    description: "Command-line interface for managing GPT Computer resources.",
    status: "stable" as const,
    category: "Tools",
    tags: ["CLI", "Developer Tools"],
    repoUrl: "https://github.com/gpt-computer/gpt-computer-cli",
  },
]

export function FeaturedProducts() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  )
}
