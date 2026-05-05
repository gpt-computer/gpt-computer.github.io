import { Octokit } from "@octokit/core"

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const ORG_NAME = "gpt-computer"

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})

export interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string | null
  [key: string]: unknown
}

export interface GitHubOrgStats {
  public_repos: number
  members?: number
  total_stars?: number
  total_forks?: number
  [key: string]: unknown
}

export async function getOrganization(): Promise<GitHubOrgStats> {
  const response = await octokit.request("GET /orgs/{org}", {
    org: ORG_NAME,
  })
  return response.data as GitHubOrgStats
}

export async function getRepositories(): Promise<GitHubRepo[]> {
  const response = await octokit.request("GET /orgs/{org}/repos", {
    org: ORG_NAME,
    per_page: 100,
    sort: "stars",
    direction: "desc",
  })
  return response.data as GitHubRepo[]
}

export async function getRepository(repo: string): Promise<GitHubRepo> {
  const response = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: ORG_NAME,
    repo,
  })
  return response.data as GitHubRepo
}

export async function getStatistics(): Promise<GitHubOrgStats> {
  const [org, repos] = await Promise.all([
    getOrganization(),
    getRepositories(),
  ])

  const stats: GitHubOrgStats = {
    ...org,
    total_stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    total_forks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
  }

  return stats
}

export async function getMembers() {
  const response = await octokit.request("GET /orgs/{org}/members", {
    org: ORG_NAME,
  })
  return response.data
}

export async function getWorkflows(repo: string) {
  const response = await octokit.request("GET /repos/{owner}/{repo}/actions/workflows", {
    owner: ORG_NAME,
    repo,
  })
  return response.data
}
