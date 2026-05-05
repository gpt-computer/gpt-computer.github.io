import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Navigation } from "./components/Navigation"
import { Footer } from "./components/Footer"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { useAnalytics } from "./hooks/useAnalytics"
import { Home } from "./pages/Home"
import { Products } from "./pages/Products"
import { Repositories } from "./pages/Repositories"

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
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
