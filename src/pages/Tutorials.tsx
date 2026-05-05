import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Clock, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"

const tutorials = [
  {
    id: "getting-started",
    title: "Getting Started with GPT Computer",
    duration: "10:30",
    level: "Beginner",
    thumbnail: "/thumbnail-1.jpg",
  },
  {
    id: "api-integration",
    title: "Integrating the API",
    duration: "15:45",
    level: "Intermediate",
    thumbnail: "/thumbnail-2.jpg",
  },
  {
    id: "advanced-patterns",
    title: "Advanced Patterns & Best Practices",
    duration: "22:10",
    level: "Advanced",
    thumbnail: "/thumbnail-3.jpg",
  },
]

export function Tutorials() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Tutorials</h1>
          <p className="text-muted-foreground mb-8">
            Learn how to use GPT Computer tools with our video guides.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <Link key={tutorial.id} to={`/tutorials/${tutorial.id}`}>
                <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Play className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {tutorial.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {tutorial.level}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
