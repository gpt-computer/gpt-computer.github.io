import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const categories = ["All", "Repositories", "Products", "Blog", "Docs"]
const sortOptions = ["Relevance", "Date", "Name", "Stars"]

export function AdvancedSearch() {
  const [query, setQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"])
  const [sortBy, setSortBy] = useState("Relevance")

  const toggleCategory = (cat: string) => {
    if (cat === "All") {
      setSelectedCategories(["All"])
      return
    }
    setSelectedCategories((prev) => {
      const withoutAll = prev.filter((c) => c !== "All")
      if (prev.includes(cat)) {
        return withoutAll.filter((c) => c !== cat)
      }
      return [...withoutAll, cat]
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search across all content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {categories.map((cat) => (
              <DropdownMenuCheckboxItem
                key={cat}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              >
                {cat}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Sort by:</span>
        {sortOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setSortBy(opt)}
            className={`px-2 py-1 rounded ${
              sortBy === opt
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
