import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, XCircle, Github } from "lucide-react"

interface Service {
  name: string
  status: "operational" | "degraded" | "outage"
  description: string
}

const services: Service[] = [
  { name: "Website", status: "operational", description: "Main organization website" },
  { name: "API Core", status: "operational", description: "Core API services" },
  { name: "Documentation", status: "operational", description: "Docs and guides" },
  { name: "GitHub Actions", status: "degraded", description: "CI/CD pipelines" },
]

const statusConfig = {
  operational: { color: "bg-green-500", icon: CheckCircle, label: "Operational" },
  degraded: { color: "bg-yellow-500", icon: AlertTriangle, label: "Degraded" },
  outage: { color: "bg-red-500", icon: XCircle, label: "Outage" },
}

export function Status() {
  const operational = services.filter(s => s.status === "operational").length
  const total = services.length

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <h1 className="text-4xl font-bold">System Status</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            {operational}/{total} services operational
          </p>

          <div className="space-y-4">
            {services.map((service) => {
              const config = statusConfig[service.status]
              const Icon = config.icon
              return (
                <Card key={service.name}>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-3 w-3 rounded-full ${config.color}`} />
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://github.com/gpt-computer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
