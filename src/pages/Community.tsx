import { useEffect, useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Github } from "lucide-react"

interface Contributor {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

export function Community() {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://api.github.com/orgs/gpt-computer/members")
      .then((res) => res.json())
      .then((data) => {
        setContributors(data.slice(0, 12))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Community</h1>
        <p className="text-muted-foreground mb-8">
          Meet the contributors and members of the GPT Computer organization.
        </p>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-2" />
                <div className="h-4 bg-muted rounded w-16 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {contributors.map((c) => (
              <a
                key={c.login}
                href={c.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <img
                      src={c.avatar_url}
                      alt={c.login}
                      className="w-20 h-20 rounded-full mx-auto mb-3"
                    />
                    <p className="font-medium text-sm">{c.login}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/gpt-computer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Github className="h-4 w-4" />
            Join us on GitHub
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
