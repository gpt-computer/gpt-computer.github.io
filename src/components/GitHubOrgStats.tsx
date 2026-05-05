import { useGitHubOrgStats } from "@/hooks/useGitHubRepos"
import { Card, CardContent } from "./ui/card"
import { Star, GitFork, Users, BookOpen } from "lucide-react"

export function GitHubOrgStats() {
  const { data: stats, isLoading, error } = useGitHubOrgStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-8 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return null
  }

  const statItems = [
    { label: "Repositories", value: stats.public_repos, icon: BookOpen },
    { label: "Members", value: stats.members || 0, icon: Users },
    { label: "Stars", value: stats.total_stars || 0, icon: Star },
    { label: "Forks", value: stats.total_forks || 0, icon: GitFork },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
              <item.icon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
