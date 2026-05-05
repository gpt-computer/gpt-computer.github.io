import { lazy, Suspense } from "react"
import i18n from "./lib/i18n"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Navigation } from "./components/Navigation"
import { Footer } from "./components/Footer"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { useAnalytics } from "./hooks/useAnalytics"
import { CommandPalette } from "./components/CommandPalette"
import { SkipLink } from "./components/SkipLink"
import { EasterEgg } from "./components/EasterEgg"
import { useKonami } from "./hooks/useKonami"
import { LoadingSpinner } from "./components/LoadingSpinner"

const Home = lazy(() => import("./pages/Home"))
const Products = lazy(() => import("./pages/Products"))
const Repositories = lazy(() => import("./pages/Repositories"))
const Community = lazy(() => import("./pages/Community"))
const Blog = lazy(() => import("./pages/Blog"))
const BlogPost = lazy(() => import("./pages/BlogPost"))
const Releases = lazy(() => import("./pages/Releases"))
const FAQ = lazy(() => import("./pages/FAQ"))
const Status = lazy(() => import("./pages/Status"))

const queryClient = new QueryClient()

function App() {
  useAnalytics()
  useKonami(() => {
    window.dispatchEvent(new CustomEvent("konami"))
  })

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SkipLink />
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/repositories" element={<Repositories />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/releases" element={<Releases />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/status" element={<Status />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/dependencies" element={<Dependencies />} />
                </Routes>
              </Suspense>
            </main>
            <CommandPalette />
            <EasterEgg />
            <Footer />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
