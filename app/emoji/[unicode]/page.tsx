 import type { Metadata } from "next"
import { generateMetadata as generateDefaultMetadata } from "@/components/seo/default-meta"
import EmojiDetailWrapper from "@/components/emoji-detail-wrapper"

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

export default function EmojiDetail({ params }: { params: { unicode: string } }) {
  return <EmojiDetailWrapper unicodeParam={decodeURIComponent(params.unicode)} />
}

