import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Navigation } from "../Navigation"

describe("Navigation", () => {
  it("renders the organization name", () => {
    render(<Navigation />)
    expect(screen.getByText("GPT Computer")).toBeInTheDocument()
  })

  it("renders navigation links", () => {
    render(<Navigation />)
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Products")).toBeInTheDocument()
    expect(screen.getByText("Repositories")).toBeInTheDocument()
  })
})
