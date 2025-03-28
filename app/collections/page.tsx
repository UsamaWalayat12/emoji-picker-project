// import type { Metadata } from "next"
// import CollectionManager from "@/components/collection-manager"
// import { generateMetadata } from "@/components/seo/default-meta"
// import JsonLd from "@/components/json-ld"

// export const metadata: Metadata = generateMetadata({
//   title: "My Emoji Collections",
//   description: "Create and manage your custom emoji collections. Save your favorite emojis for quick access.",
//   path: "/collections",
// })

// export default function Collections() {
//   return (
//     <>
//       <CollectionsPageSchema />
//       <CollectionManager />
//     </>
//   )
// }

// // Schema for the collections page
// function CollectionsPageSchema() {
//   return (
//     <JsonLd
//       data={{
//         "@context": "https://schema.org",
//         "@type": "WebPage",
//         name: "My Emoji Collections",
//         description: "Create and manage your custom emoji collections. Save your favorite emojis for quick access.",
//         url:
//           typeof window !== "undefined"
//             ? `${window.location.origin}/collections`
//             : "https://emojiverse-example.com/collections",
//         mainEntity: {
//           "@type": "ItemList",
//           name: "Emoji Collections",
//           description: "User-created collections of emojis for quick access",
//           itemListElement: [
//             {
//               "@type": "ListItem",
//               position: 1,
//               name: "Create a Collection",
//               description: "Create a new collection to organize your favorite emojis",
//             },
//           ],
//         },
//       }}
//     />
//   )
// }
























import type { Metadata } from "next"
import CollectionManager from "@/components/collection-manager"
import { generateMetadata } from "@/components/seo/default-meta"
import JsonLd from "@/components/json-ld"

export const metadata: Metadata = generateMetadata({
  title: "My Emoji Collections",
  description: "Create and manage your custom emoji collections. Save your favorite emojis for quick access.",
  path: "/collections",
})

export default function Collections() {
  return (
    <>
      <CollectionsPageSchema />
      <CollectionManager />
    </>
  )
}

// Schema for the collections page - now server-side rendered
function CollectionsPageSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "My Emoji Collections",
        description: "Create and manage your custom emoji collections. Save your favorite emojis for quick access.",
        url: `${baseUrl}/collections`,
        mainEntity: {
          "@type": "ItemList",
          name: "Emoji Collections",
          description: "User-created collections of emojis for quick access",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Create a Collection",
              description: "Create a new collection to organize your favorite emojis",
            },
          ],
        },
      }}
    />
  )
}

