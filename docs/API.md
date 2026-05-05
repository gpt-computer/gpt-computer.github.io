# API Documentation

## GitHub API Client

The project uses Octokit to interact with the GitHub API. The client is configured in `src/lib/github-api.ts`.

### Authentication

Set the `VITE_GITHUB_TOKEN` environment variable for higher rate limits:

```bash
# .env.local
VITE_GITHUB_TOKEN=your_github_token_here
```

Generate a token at: https://github.com/settings/tokens

### Available Methods

#### `getOrganization()`
Fetches organization information.

```typescript
const org = await getOrganization()
// Returns: { public_repos, members, ... }
```

#### `getRepositories()`
Lists all public repositories for the organization.

```typescript
const repos = await getRepositories()
// Returns: Array of GitHubRepo objects
```

#### `getRepository(repo: string)`
Fetches details for a specific repository.

```typescript
const repo = await getRepository("gpt-computer")
// Returns: GitHubRepo object
```

#### `getStatistics()`
Returns aggregated organization statistics.

```typescript
const stats = await getStatistics()
// Returns: { public_repos, total_stars, total_forks, ... }
```

#### `getMembers()`
Lists organization members.

```typescript
const members = await getMembers()
// Returns: Array of member objects
```

#### `getWorkflows(repo: string)`
Fetches CI/CD workflows for a repository.

```typescript
const workflows = await getWorkflows("gpt-computer")
// Returns: Workflow data
```

## React Query Hooks

### `useGitHubRepos()`
Fetches all repositories with caching.

```typescript
const { data, isLoading, error } = useGitHubRepos()
```

### `useGitHubOrgStats()`
Fetches organization statistics.

```typescript
const { data, isLoading, error } = useGitHubOrgStats()
```

### `useGitHubRepository(repo: string)`
Fetches a single repository.

```typescript
const { data, isLoading, error } = useGitHubRepository("repo-name")
```

## Rate Limiting

GitHub API has rate limits:
- Unauthenticated: 60 requests/hour
- Authenticated: 5000 requests/hour

Use `VITE_GITHUB_TOKEN` to increase limits.

## Error Handling

All API calls should be wrapped in try-catch blocks or use React Query's error handling:

```typescript
const { data, error } = useGitHubRepos()
if (error) {
  // Handle error
}
```
