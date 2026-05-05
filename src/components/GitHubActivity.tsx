import { useEffect, useState } from "react"
import { Github, GitCommit, GitPullRequest, AlertCircle } from "lucide-react"

interface ActivityItem {
  type: "push" | "pr" | "issue"
  repo: string
  title: string
  time: string
}

export function GitHubActivity() {
  const [activities] = useState<ActivityItem[]>([
    { type: "push", repo: "gpt-computer/website", title: "Update homepage layout", time: "2 hours ago" },
    { type: "pr", repo: "gpt-computer/core", title: "Add new API endpoint", time: "5 hours ago" },
    { type: "issue", repo: "gpt-computer/tools", title: "Bug: Fix auth flow", time: "1 day ago" },
  ])

  const icons = {
    push: GitCommit,
    pr: GitPullRequest,
    issue: AlertCircle,
  }

  return (
    <div className="space-y-3">
      {activities.map((activity, i) => {
        const Icon = icons[activity.type]
        return (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
            <Icon className="h-4 w-4 mt-1 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.title}</p>
              <p className="text-xs text-muted-foreground">
                {activity.repo} · {activity.time}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
