import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Navigation } from "./components/Navigation"
import { Footer } from "./components/Footer"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { useAnalytics } from "./hooks/useAnalytics"
import { Home } from "./pages/Home"
import { Products } from "./pages/Products"
import { Repositories } from "./pages/Repositories"
import { Community } from "./pages/Community"
import { Blog } from "./pages/Blog"
import { BlogPost } from "./pages/BlogPost"
import { Releases } from "./pages/Releases"
import { FAQ } from "./pages/FAQ"
import { CommandPalette } from "./components/CommandPalette"

const queryClient = new QueryClient()

function App() {
  useAnalytics()

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/repositories" element={<Repositories />} />
                <Route path="/community" element={<Community />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/releases" element={<Releases />} />
                <Route path="/faq" element={<FAQ />} />
              </Routes>
            </main>
            <CommandPalette />
            <Footer />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
