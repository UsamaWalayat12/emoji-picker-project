"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-8xl mb-6">😬</div>
        <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-muted-foreground mb-8">
          We're sorry, but we encountered an error while processing your request.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 mr-4"
        >
          Try again
        </button>
        <a
          href="/"
          className="px-6 py-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-block"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}

