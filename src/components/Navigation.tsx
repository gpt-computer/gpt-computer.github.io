import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { SiteSearch } from "./Search"
import { ThemeToggle } from "./ThemeToggle"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">GPT Computer</span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </Link>
             <Link to="/repositories" className="text-sm font-medium transition-colors hover:text-primary">
               Repositories
             </Link>
             <Link to="/community" className="text-sm font-medium transition-colors hover:text-primary">
               Community
             </Link>
             <Link to="/blog" className="text-sm font-medium transition-colors hover:text-primary">
               Blog
             </Link>
           </div>

          <div className="hidden md:block">
            <SiteSearch />
          </div>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/repositories"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Repositories
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
