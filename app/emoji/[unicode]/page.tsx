import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { generateMetadata as generateDefaultMetadata } from "@/components/seo/default-meta"

// Import the emoji detail component with no SSR to avoid hydration issues
const EmojiDetailClient = dynamic(() => import("@/components/emoji-detail-client"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto py-8 px-4">
      <div className="h-screen bg-muted/20 animate-pulse rounded-lg"></div>
    </div>
  ),
})

// Generate metadata dynamically based on the emoji
export async function generateMetadata({ params }: { params: { unicode: string } }): Promise<Metadata> {
  const unicodeParam = decodeURIComponent(params.unicode)

  // This is a simplified approach - in a real app, you'd fetch the emoji details from a database
  // For now, we'll use a generic title and description
  return generateDefaultMetadata({
    title: "Emoji Details",
    description: `Detailed information about this emoji, including meaning, Unicode details, and usage examples.`,
    path: `/emoji/${params.unicode}`,
  })
}

export default function EmojiDetail() {
  return <EmojiDetailClient />
}

