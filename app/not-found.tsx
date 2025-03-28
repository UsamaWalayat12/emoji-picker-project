export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-8xl mb-6">😕</div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <a
          href="/"
          className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 inline-block"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}

