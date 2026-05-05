import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      // In production, connect to your newsletter service
      console.log("Newsletter signup:", email)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Thanks for subscribing!</h3>
        <p className="text-muted-foreground">
          You'll receive updates about our latest releases and news.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-muted rounded-lg p-8 text-center">
      <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
      <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Subscribe to our newsletter for the latest updates, releases, and insights.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  )
}
