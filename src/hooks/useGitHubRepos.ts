import { useQuery } from "@tanstack/react-query"
import { getRepositories, getStatistics, getRepository } from "@/lib/github-api"
import type { GitHubRepo, GitHubOrgStats } from "@/lib/github-api"

export function useGitHubRepos() {
  return useQuery({
    queryKey: ["repositories"],
    queryFn: getRepositories,
    staleTime: 5 * 60 * 1000,
  })
}

export function useGitHubOrgStats() {
  return useQuery<GitHubOrgStats>({
    queryKey: ["orgStats"],
    queryFn: getStatistics,
    staleTime: 10 * 60 * 1000,
  })
}

export function useGitHubRepository(repo: string) {
  return useQuery<GitHubRepo>({
    queryKey: ["repository", repo],
    queryFn: () => getRepository(repo),
    enabled: !!repo,
    staleTime: 5 * 60 * 1000,
  })
}
