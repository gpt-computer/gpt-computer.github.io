import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "./ui/card"

interface Product {
  name: string
  description: string
  status: "stable" | "beta" | "experimental"
  category: string
  tags: string[]
  repoUrl?: string
  demoUrl?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const statusColors = {
    stable: "bg-green-100 text-green-800",
    beta: "bg-yellow-100 text-yellow-800",
    experimental: "bg-red-100 text-red-800",
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <Badge className={statusColors[product.status]}>
            {product.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          {product.repoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={product.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Repository
              </a>
            </Button>
          )}
          {product.demoUrl && (
            <Button size="sm" asChild>
              <a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
