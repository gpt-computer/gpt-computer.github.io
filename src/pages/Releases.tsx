import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tag, Calendar, Package } from "lucide-react"
import { Link } from "react-router-dom"

const releases = [
  {
    version: "v2.0.0",
    date: "2026-05-05",
    repo: "core",
    description: "Major rewrite with improved API and performance enhancements.",
    type: "major",
  },
  {
    version: "v1.3.0",
    date: "2026-04-20",
    repo: "tools",
    description: "Added new CLI commands and improved error handling.",
    type: "minor",
  },
  {
    version: "v1.2.1",
    date: "2026-04-10",
    repo: "website",
    description: "Fixed navigation issues and improved mobile responsiveness.",
    type: "patch",
  },
]

export function Releases() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Releases</h1>
          <p className="text-muted-foreground mb-8">
            Track the latest releases across all our repositories.
          </p>
          <div className="space-y-6">
            {releases.map((release) => (
              <Card key={`${release.repo}-${release.version}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <Link
                        to={`https://github.com/gpt-computer/${release.repo}`}
                        target="_blank"
                        className="font-semibold hover:text-primary"
                      >
                        {release.repo}
                      </Link>
                      <Badge variant={
                        release.type === "major" ? "destructive" :
                        release.type === "minor" ? "default" : "secondary"
                      }>
                        {release.version}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {release.date}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{release.description}</p>
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
