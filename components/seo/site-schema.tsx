// "use client"

// import { useEffect, useState } from "react"
// import JsonLd from "@/components/json-ld"
// import { generateWebsiteSchema, generateOrganizationSchema } from "@/lib/schema"

// export default function SiteSchema() {
//   const [baseUrl, setBaseUrl] = useState("")

//   useEffect(() => {
//     setBaseUrl(window.location.origin)
//   }, [])

//   if (!baseUrl) return null

//   const websiteSchema = generateWebsiteSchema({
//     name: "EmojiVerse",
//     description: "The ultimate emoji explorer with comprehensive information and easy copying",
//     url: baseUrl,
//     logo: `${baseUrl}/logo.png`,
//     keywords: ["emoji", "emojis", "emoji finder", "emoji search", "emoji explorer", "emoji collections", "copy emoji"],
//     sameAs: ["https://twitter.com/emojiverse", "https://facebook.com/emojiverse", "https://instagram.com/emojiverse"],
//   })

//   const organizationSchema = generateOrganizationSchema({
//     name: "EmojiVerse",
//     url: baseUrl,
//     logo: `${baseUrl}/logo.png`,
//     sameAs: ["https://twitter.com/emojiverse", "https://facebook.com/emojiverse", "https://instagram.com/emojiverse"],
//   })

//   return (
//     <>
//       <JsonLd data={websiteSchema} />
//       <JsonLd data={organizationSchema} />
//     </>
//   )
// }
































import JsonLd from "@/components/json-ld"
import { generateWebsiteSchema, generateOrganizationSchema } from "@/lib/schema"

export default function SiteSchema() {
  // Use a default base URL that will be replaced by the actual URL in production
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"

  const websiteSchema = generateWebsiteSchema({
    name: "EmojiVerse",
    description: "The ultimate emoji explorer with comprehensive information and easy copying",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    keywords: ["emoji", "emojis", "emoji finder", "emoji search", "emoji explorer", "emoji collections", "copy emoji"],
    sameAs: ["https://twitter.com/emojiverse", "https://facebook.com/emojiverse", "https://instagram.com/emojiverse"],
  })

  const organizationSchema = generateOrganizationSchema({
    name: "EmojiVerse",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: ["https://twitter.com/emojiverse", "https://facebook.com/emojiverse", "https://instagram.com/emojiverse"],
  })

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
    </>
  )
}

