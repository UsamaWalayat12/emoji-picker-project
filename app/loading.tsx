export default function Loading() {
  return (
    <div className="container mx-auto py-16 px-4 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-bounce text-6xl mb-4">🔄</div>
        <p className="text-muted-foreground">Loading content...</p>
      </div>
    </div>
  )
}

