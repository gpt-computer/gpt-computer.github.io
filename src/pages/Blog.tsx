import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { Link } from "react-router-dom"

const posts = [
  {
    slug: "welcome-to-gpt-computer",
    title: "Welcome to GPT Computer Organization",
    date: "2026-05-05",
    excerpt: "Announcing the launch of our new organization website and the vision for AI-powered computing tools.",
    tags: ["announcement", "website"],
  },
  {
    slug: "roadmap-2026",
    title: "Our 2026 Roadmap",
    date: "2026-05-01",
    excerpt: "A look at the projects and tools we're building this year to advance AI computing.",
    tags: ["roadmap", "planning"],
  },
]

export function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground mb-8">
            News, updates, and insights from the GPT Computer team.
          </p>
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
