// import type { Metadata } from "next"
// import { generateMetadata } from "@/components/seo/default-meta"
// import JsonLd from "@/components/json-ld"

// export const metadata: Metadata = generateMetadata({
//   title: "EmojiVerse - The Ultimate Emoji Explorer",
//   description: "Browse, search, and discover emojis with detailed information, collections, and easy copying",
//   path: "/",
// })

// export default function Home() {
//   return (
//     <div className="flex flex-col min-h-[calc(100vh-4rem)]">
//       <HomePageSchema />
//       {/* Hero Section */}
//       <section className="relative py-20 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0" />
//         <div className="container relative z-10 mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
//             Find, Copy, and Explore <span className="text-primary">Emojis</span>
//           </h1>
//           <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-8">
//             The ultimate emoji resource with detailed information, collections, and easy copying for all your emoji
//             needs.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a href="/browse" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
//               Browse Emojis
//             </a>
//             <a
//               href="/collections"
//               className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
//             >
//               View Collections
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Emojis</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
//               <h3 className="text-xl font-semibold mb-2">Powerful Search</h3>
//               <p className="text-muted-foreground">
//                 Find any emoji instantly with our smart search that understands descriptions, emotions, and keywords.
//               </p>
//             </div>
//             <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
//               <h3 className="text-xl font-semibold mb-2">One-Click Copy</h3>
//               <p className="text-muted-foreground">
//                 Copy any emoji with a single click and use it anywhere - social media, documents, or messages.
//               </p>
//             </div>
//             <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
//               <h3 className="text-xl font-semibold mb-2">Custom Collections</h3>
//               <p className="text-muted-foreground">
//                 Create and save your favorite emoji collections for quick access to your most-used emojis.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Emojis */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl font-bold mb-8">Featured Emojis</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
//             {["😀", "😂", "❤️", "👍", "🔥", "✨", "🥰", "🙏"].map((emoji, index) => (
//               <div key={index} className="bg-card rounded-lg border p-4 flex flex-col items-center text-center">
//                 <div className="text-4xl mb-2">{emoji}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-primary/10">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-4">Ready to explore the emoji universe?</h2>
//           <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
//             Dive into thousands of emojis, discover their meanings, and find the perfect ones for your messages.
//           </p>
//           <a
//             href="/browse"
//             className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-lg inline-block"
//           >
//             Start Exploring
//           </a>
//         </div>
//       </section>
//     </div>
//   )
// }

// // Schema for the home page
// function HomePageSchema() {
//   return (
//     <JsonLd
//       data={{
//         "@context": "https://schema.org",
//         "@type": "WebPage",
//         name: "EmojiVerse - The Ultimate Emoji Explorer",
//         description: "Browse, search, and discover emojis with detailed information, collections, and easy copying",
//         url: typeof window !== "undefined" ? window.location.origin : "https://emojiverse-example.com",
//         speakable: {
//           "@type": "SpeakableSpecification",
//           cssSelector: ["h1", "h2", "h3"],
//         },
//         mainEntity: {
//           "@type": "ItemList",
//           name: "Featured Emojis",
//           itemListElement: [
//             {
//               "@type": "ListItem",
//               position: 1,
//               item: {
//                 "@type": "Thing",
//                 name: "Grinning Face",
//                 description: "😀 - A yellow face with a big grin and simple, open eyes.",
//               },
//             },
//             {
//               "@type": "ListItem",
//               position: 2,
//               item: {
//                 "@type": "Thing",
//                 name: "Face with Tears of Joy",
//                 description: "😂 - A yellow face with a big grin and scrunched, X-shaped eyes.",
//               },
//             },
//             {
//               "@type": "ListItem",
//               position: 3,
//               item: {
//                 "@type": "Thing",
//                 name: "Red Heart",
//                 description: "❤️ - A classic red love heart emoji, used for expressions of love.",
//               },
//             },
//           ],
//         },
//       }}
//     />
//   )
// }












































import type { Metadata } from "next"
import { generateMetadata } from "@/components/seo/default-meta"
import JsonLd from "@/components/json-ld"

export const metadata: Metadata = generateMetadata({
  title: "EmojiVerse - The Ultimate Emoji Explorer",
  description: "Browse, search, and discover emojis with detailed information, collections, and easy copying",
  path: "/",
})

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <HomePageSchema />
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Find, Copy, and Explore <span className="text-primary">Emojis</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-8">
            The ultimate emoji resource with detailed information, collections, and easy copying for all your emoji
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/browse" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
              Browse Emojis
            </a>
            <a
              href="/collections"
              className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              View Collections
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Emojis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-2">Powerful Search</h3>
              <p className="text-muted-foreground">
                Find any emoji instantly with our smart search that understands descriptions, emotions, and keywords.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-2">One-Click Copy</h3>
              <p className="text-muted-foreground">
                Copy any emoji with a single click and use it anywhere - social media, documents, or messages.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-2">Custom Collections</h3>
              <p className="text-muted-foreground">
                Create and save your favorite emoji collections for quick access to your most-used emojis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Emojis */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Emojis</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {["😀", "😂", "❤️", "👍", "🔥", "✨", "🥰", "🙏"].map((emoji, index) => (
              <div key={index} className="bg-card rounded-lg border p-4 flex flex-col items-center text-center">
                <div className="text-4xl mb-2">{emoji}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore the emoji universe?</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Dive into thousands of emojis, discover their meanings, and find the perfect ones for your messages.
          </p>
          <a
            href="/browse"
            className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-lg inline-block"
          >
            Start Exploring
          </a>
        </div>
      </section>
    </div>
  )
}

// Schema for the home page - now server-side rendered
function HomePageSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "EmojiVerse - The Ultimate Emoji Explorer",
        description: "Browse, search, and discover emojis with detailed information, collections, and easy copying",
        url: baseUrl,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", "h3"],
        },
        mainEntity: {
          "@type": "ItemList",
          name: "Featured Emojis",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Thing",
                name: "Grinning Face",
                description: "😀 - A yellow face with a big grin and simple, open eyes.",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Thing",
                name: "Face with Tears of Joy",
                description: "😂 - A yellow face with a big grin and scrunched, X-shaped eyes.",
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "Thing",
                name: "Red Heart",
                description: "❤️ - A classic red love heart emoji, used for expressions of love.",
              },
            },
          ],
        },
      }}
    />
  )
}

