import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, Home, Package, Github, Users, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"

const commands = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: Github, label: "Repositories", path: "/repositories" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: FileText, label: "Blog", path: "/blog" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Type a command..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0"
              autoFocus
            />
          </div>
        </div>
        <div className="py-2">
          {filtered.map((cmd) => (
            <button
              key={cmd.path}
              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-accent transition-colors text-left"
              onClick={() => {
                navigate(cmd.path)
                setOpen(false)
                setQuery("")
              }}
            >
              <cmd.icon className="h-4 w-4" />
              <span>{cmd.label}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
