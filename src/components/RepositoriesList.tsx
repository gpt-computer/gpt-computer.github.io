import { useGitHubRepos } from "@/hooks/useGitHubRepos"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Star, GitFork, ExternalLink } from "lucide-react"
import { Button } from "./ui/button"

export function RepositoriesList() {
  const { data: repos, isLoading, error } = useGitHubRepos()

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-muted rounded w-48 mb-2" />
              <div className="h-4 bg-muted rounded w-full mb-4" />
              <div className="flex gap-4">
                <div className="h-4 bg-muted rounded w-16" />
                <div className="h-4 bg-muted rounded w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Failed to load repositories. Please try again later.</p>
      </div>
    )
  }

  if (!repos || repos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No repositories found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {repos.map((repo) => (
        <Card key={repo.name}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:text-primary flex items-center gap-2"
              >
                {repo.name}
                <ExternalLink className="h-4 w-4" />
              </a>
              {repo.language && (
                <Badge variant="secondary">{repo.language}</Badge>
              )}
            </div>
            {repo.description && (
              <p className="text-sm text-muted-foreground mb-4">{repo.description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                {repo.forks_count}
              </span>
              {repo.updated_at && (
                <span>
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
