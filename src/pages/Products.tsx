import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { ProductCard } from "@/components/ProductCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const products = [
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
  {
    name: "GPT Computer Dashboard",
    description: "Web dashboard for monitoring and managing GPT Computer services.",
    status: "experimental" as const,
    category: "Web",
    tags: ["Dashboard", "React", "Visualization"],
    repoUrl: "https://github.com/gpt-computer/gpt-computer-dashboard",
  },
  {
    name: "GPT Computer SDK",
    description: "Software development kit for building on GPT Computer platform.",
    status: "beta" as const,
    category: "Core",
    tags: ["SDK", "TypeScript", "Library"],
    repoUrl: "https://github.com/gpt-computer/gpt-computer-sdk",
  },
]

const categories = ["All", "Core", "Tools", "Web"]

export function Products() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Products</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
