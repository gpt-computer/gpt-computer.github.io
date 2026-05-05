# Architecture Overview

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with Radix UI components
- **State Management**: TanStack React Query for server state
- **Routing**: React Router DOM
- **API Integration**: Octokit (GitHub API client)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Radix-based)
│   ├── Navigation.tsx  # Site navigation
│   ├── Footer.tsx      # Site footer
│   └── ...
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Products.tsx    # Products listing
│   └── Repositories.tsx # GitHub repositories
├── hooks/              # Custom React hooks
│   └── useGitHubRepos.ts # GitHub API hooks
├── lib/                # Utility libraries
│   └── github-api.ts  # GitHub API client
├── App.tsx             # Main app component with routing
└── main.tsx            # Entry point
```

## Component Architecture

Components follow a modular pattern:
- UI components in `components/ui/` are based on Radix UI primitives
- Page components in `pages/` represent full page layouts
- Custom hooks encapsulate data fetching logic

## API Integration

The GitHub API client (`src/lib/github-api.ts`) uses Octokit to interact with GitHub:
- Organization data fetching
- Repository listing and details
- Member information
- Workflow status

React Query hooks (`src/hooks/useGitHubRepos.ts`) provide:
- Cached data fetching
- Automatic background refetching
- Loading and error states

## Build Process

1. TypeScript compilation (with type checking skipped for speed)
2. Vite bundling and optimization
3. Output to `dist/` directory

## Performance Considerations

- React Query caching reduces API calls
- Lazy loading for routes (to be implemented)
- Component-level code splitting (to be implemented)
