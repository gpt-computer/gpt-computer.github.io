import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { GitHubActivity } from "@/components/GitHubActivity"
import { GitHubOrgStats } from "@/components/GitHubOrgStats"
import { FeaturedProducts } from "@/components/FeaturedProducts"

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              GPT Computer Organization
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Building the future of AI-powered computing tools and infrastructure.
              Open source, collaborative, and innovative.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/gpt-computer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                View on GitHub
              </a>
              <a
                href="/repositories"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Explore Repositories
              </a>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Organization Stats</h2>
            <GitHubOrgStats />
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
          <FeaturedProducts />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <GitHubActivity />
        </div>
      </section>
      </main>
      <Footer />
    </div>
  )
}
