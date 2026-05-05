import { useParams } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const postContent: Record<string, { title: string; date: string; body: string }> = {
  "welcome-to-gpt-computer": {
    title: "Welcome to GPT Computer Organization",
    date: "2026-05-05",
    body: `
# Welcome to GPT Computer Organization

We're excited to launch our new organization website! GPT Computer is dedicated to building the future of AI-powered computing tools and libraries.

## Our Mission

We believe that AI should be accessible, powerful, and easy to integrate into every developer's workflow. Our open-source projects aim to make that vision a reality.

## What's Next

Stay tuned for our upcoming releases and join our community on GitHub!
    `,
  },
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? postContent[slug] : null

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <article>
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-muted-foreground mb-8">{post.date}</p>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans">{post.body}</pre>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
