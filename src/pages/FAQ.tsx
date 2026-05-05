import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    q: "How do I contribute to GPT Computer projects?",
    a: "Check out our CONTRIBUTING.md guide in the docs folder. Fork the repo, make your changes, and submit a pull request!",
  },
  {
    q: "Where can I find documentation for the API?",
    a: "Visit our API.md documentation or check the /docs folder for detailed guides on using our tools and libraries.",
  },
  {
    q: "How do I report a bug?",
    a: "Open an issue on the relevant GitHub repository with steps to reproduce the problem and your environment details.",
  },
  {
    q: "Are these tools free to use?",
    a: "Yes! All our projects are open-source under MIT license. You can use them freely in your own projects.",
  },
  {
    q: "How can I join the organization?",
    a: "We welcome contributors! Start by contributing to our projects, and active contributors may be invited to join the org.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">FAQ</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Frequently asked questions about GPT Computer Organization.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold pr-4">{faq.q}</h3>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openIndex === i && (
                    <p className="mt-4 text-muted-foreground">{faq.a}</p>
                  )}
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
