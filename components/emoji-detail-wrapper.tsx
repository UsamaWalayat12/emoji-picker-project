"use client"

import dynamic from "next/dynamic"

// Import the emoji detail component with no SSR to avoid hydration issues
const EmojiDetailClient = dynamic(() => import("@/components/emoji-detail-client"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto py-8 px-4">
      <div className="h-screen bg-muted/20 animate-pulse rounded-lg"></div>
    </div>
  ),
})

export default function EmojiDetailWrapper({ unicodeParam }: { unicodeParam: string }) {
  return <EmojiDetailClient />
}


