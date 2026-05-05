import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, CheckCircle } from "lucide-react"
import packageJson from "../../package.json"

interface Dep {
  name: string
  version: string
  type: "dependency" | "devDependency"
}

export function Dependencies() {
  const deps: Dep[] = [
    ...Object.entries(packageJson.dependencies || {}).map(([name, version]) => ({
      name,
      version: version as string,
      type: "dependency" as const,
    })),
    ...Object.entries(packageJson.devDependencies || {}).map(([name, version]) => ({
      name,
      version: version as string,
      type: "devDependency" as const,
    })),
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Dependencies</h1>
          <p className="text-muted-foreground mb-8">
            Software Bill of Materials (SBOM) - {deps.length} packages
          </p>

          <div className="space-y-3">
            {deps.map((dep) => (
              <Card key={dep.name}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{dep.name}</p>
                      <p className="text-sm text-muted-foreground">{dep.version}</p>
                    </div>
                  </div>
                  <Badge variant={dep.type === "dependency" ? "default" : "secondary"}>
                    {dep.type === "dependency" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {dep.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
