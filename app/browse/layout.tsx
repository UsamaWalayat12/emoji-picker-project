import type React from "react"
import type { Metadata } from "next"
import { generateMetadata } from "@/components/seo/default-meta"
import JsonLd from "@/components/json-ld"

export const metadata: Metadata = generateMetadata({
  title: "Browse Emojis - Find and Copy Emojis",
  description:
    "Browse, search, and copy emojis for any occasion. Find the perfect emoji for your messages, social media, or documents.",
  path: "/browse",
})

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BrowsePageSchema />
      {children}
    </>
  )
}

// Schema for the browse page
function BrowsePageSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Browse Emojis - Find and Copy Emojis",
        description:
          "Browse, search, and copy emojis for any occasion. Find the perfect emoji for your messages, social media, or documents.",
        url: `${baseUrl}/browse`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: 100,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Thing",
                name: "Grinning Face",
                identifier: "U+1F600",
                description: "😀 - Grinning Face",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Thing",
                name: "Face with Tears of Joy",
                identifier: "U+1F602",
                description: "😂 - Face with Tears of Joy",
              },
            },
          ],
        },
      }}
    />
  )
}

