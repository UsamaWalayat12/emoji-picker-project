import type { Metadata } from "next"

// Default metadata for the site
export const defaultMetadata: Metadata = {
  title: {
    default: "EmojiVerse - The Ultimate Emoji Explorer",
    template: "%s | EmojiVerse",
  },
  description: "Browse, search, and discover emojis with detailed information, collections, and easy copying",
  keywords: ["emoji", "emojis", "emoji finder", "emoji search", "emoji explorer", "emoji collections", "copy emoji"],
  authors: [{ name: "EmojiVerse Team" }],
  creator: "EmojiVerse",
  publisher: "EmojiVerse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EmojiVerse",
    title: "EmojiVerse - The Ultimate Emoji Explorer",
    description: "Browse, search, and discover emojis with detailed information, collections, and easy copying",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EmojiVerse - The Ultimate Emoji Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EmojiVerse - The Ultimate Emoji Explorer",
    description: "Browse, search, and discover emojis with detailed information, collections, and easy copying",
    images: ["/og-image.png"],
    creator: "@emojiverse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

// Helper function to generate page metadata
export function generateMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title: string
  description: string
  path: string
  ogImage?: string
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      images: [
        {
          url: ogImage || "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage || "/og-image.png"],
    },
  }
}

