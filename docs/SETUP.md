# Setup Guide

## Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Git

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/gpt-computer/gpt-computer.github.io.git
   cd gpt-computer.github.io
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the project root:
   ```bash
   VITE_GITHUB_TOKEN=your_github_token_here
   ```
   This is optional but recommended for higher GitHub API rate limits.

## Development

### Start Development Server
```bash
npm run dev
```
The site will be available at `http://localhost:5000` (or the configured port).

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## IDE Setup

### VS Code

Recommended extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

Settings (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["tw`([^`]*)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### WebStorm

- Enable ESLint integration
- Enable Prettier as formatter
- Configure Tailwind CSS support

## Common Issues

### Port Already in Use
```bash
npm run kill  # Kills process on port 5000
```

### Dependency Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Ensure TypeScript version matches: `~5.7.2`
```bash
npm install typescript@~5.7.2
```

## Testing

```bash
# Run tests (when configured)
npm test
```

## Production Build

```bash
npm run build
```
Output will be in the `dist/` directory.
