// import type { Metadata } from "next"
// import MultiEmojiSelector from "@/components/multi-emoji-selector"
// import { generateMetadata } from "@/components/seo/default-meta"
// import JsonLd from "@/components/json-ld"

// export const metadata: Metadata = generateMetadata({
//   title: "Browse Emojis - Find and Copy Emojis",
//   description:
//     "Browse, search, and copy emojis for any occasion. Find the perfect emoji for your messages, social media, or documents.",
//   path: "/browse",
// })

// // Sample emoji data
// const emojiData = [
//   { emoji: "😀", name: "Grinning Face", unicode: "U+1F600" },
//   { emoji: "😃", name: "Grinning Face with Big Eyes", unicode: "U+1F603" },
//   { emoji: "😄", name: "Grinning Face with Smiling Eyes", unicode: "U+1F604" },
//   { emoji: "😁", name: "Beaming Face with Smiling Eyes", unicode: "U+1F601" },
//   { emoji: "😆", name: "Grinning Squinting Face", unicode: "U+1F606" },
//   { emoji: "😅", name: "Grinning Face with Sweat", unicode: "U+1F605" },
//   { emoji: "🤣", name: "Rolling on the Floor Laughing", unicode: "U+1F923" },
//   { emoji: "😂", name: "Face with Tears of Joy", unicode: "U+1F602" },
//   { emoji: "🙂", name: "Slightly Smiling Face", unicode: "U+1F642" },
//   { emoji: "🙃", name: "Upside-Down Face", unicode: "U+1F643" },
//   { emoji: "😉", name: "Winking Face", unicode: "U+1F609" },
//   { emoji: "😊", name: "Smiling Face with Smiling Eyes", unicode: "U+1F60A" },
//   { emoji: "😇", name: "Smiling Face with Halo", unicode: "U+1F607" },
//   { emoji: "🥰", name: "Smiling Face with Hearts", unicode: "U+1F970" },
//   { emoji: "😍", name: "Smiling Face with Heart-Eyes", unicode: "U+1F60D" },
//   { emoji: "🤩", name: "Star-Struck", unicode: "U+1F929" },
//   { emoji: "😘", name: "Face Blowing a Kiss", unicode: "U+1F618" },
//   { emoji: "😗", name: "Kissing Face", unicode: "U+1F617" },
//   { emoji: "😚", name: "Kissing Face with Closed Eyes", unicode: "U+1F61A" },
//   { emoji: "😙", name: "Kissing Face with Smiling Eyes", unicode: "U+1F619" },
//   { emoji: "🥲", name: "Smiling Face with Tear", unicode: "U+1F972" },
//   { emoji: "😋", name: "Face Savoring Food", unicode: "U+1F60B" },
//   { emoji: "😛", name: "Face with Tongue", unicode: "U+1F61B" },
//   { emoji: "😜", name: "Winking Face with Tongue", unicode: "U+1F61C" },
// ]

// export default function BrowseEmojis() {
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <BrowsePageSchema />
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Browse Emojis</h1>
//           <p className="text-muted-foreground">Find, select, and copy emojis for any occasion</p>
//         </div>
//       </div>

//       <div className="mb-8">
//         <div className="relative">
//           <input type="text" placeholder="Search emojis..." className="w-full px-4 py-2 pl-10 border rounded-md" />
//           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">🔍</span>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Category sidebar */}
//         <div className="md:w-64 shrink-0">
//           <div className="bg-card rounded-lg border p-4 sticky top-24">
//             <h3 className="font-medium mb-3">Categories</h3>
//             <div className="space-y-1">
//               {[
//                 "Smileys & Emotion",
//                 "People & Body",
//                 "Animals & Nature",
//                 "Food & Drink",
//                 "Travel & Places",
//                 "Activities",
//                 "Objects",
//                 "Symbols",
//                 "Flags",
//               ].map((category) => (
//                 <button key={category} className="w-full text-left px-3 py-2 rounded-md hover:bg-muted">
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Emoji display area */}
//         <div className="flex-1">
//           <h3 className="text-lg font-medium mb-4">Smileys & Emotion</h3>

//           {/* Multi-emoji selector component */}
//           <MultiEmojiSelector emojis={emojiData} />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Schema for the browse page
// function BrowsePageSchema() {
//   return (
//     <JsonLd
//       data={{
//         "@context": "https://schema.org",
//         "@type": "CollectionPage",
//         name: "Browse Emojis - Find and Copy Emojis",
//         description:
//           "Browse, search, and copy emojis for any occasion. Find the perfect emoji for your messages, social media, or documents.",
//         url:
//           typeof window !== "undefined" ? `${window.location.origin}/browse` : "https://emojiverse-example.com/browse",
//         mainEntity: {
//           "@type": "ItemList",
//           numberOfItems: emojiData.length,
//           itemListElement: emojiData.slice(0, 10).map((emoji, index) => ({
//             "@type": "ListItem",
//             position: index + 1,
//             item: {
//               "@type": "Thing",
//               name: emoji.name,
//               identifier: emoji.unicode,
//               description: `${emoji.emoji} - ${emoji.name}`,
//             },
//           })),
//         },
//       }}
//     />
//   )
// }





























// import type { Metadata } from "next"
// import MultiEmojiSelector from "@/components/multi-emoji-selector"
// import { generateMetadata } from "@/components/seo/default-meta"
// import JsonLd from "@/components/json-ld"

// export const metadata: Metadata = generateMetadata({
//   title: "Browse Emojis - Find and Copy Emojis",
//   description:
//     "Browse, search, and copy emojis for any occasion. Find the perfect emoji for your messages, social media, or documents.",
//   path: "/browse",
// })

// // Sample emoji data
// const emojiData = [
//   { emoji: "😀", name: "Grinning Face", unicode: "U+1F600" },
//   { emoji: "😃", name: "Grinning Face with Big Eyes", unicode: "U+1F603" },
//   { emoji: "😄", name: "Grinning Face with Smiling Eyes", unicode: "U+1F604" },
//   { emoji: "😁", name: "Beaming Face with Smiling Eyes", unicode: "U+1F601" },
//   { emoji: "😆", name: "Grinning Squinting Face", unicode: "U+1F606" },
//   { emoji: "😅", name: "Grinning Face with Sweat", unicode: "U+1F605" },
//   { emoji: "🤣", name: "Rolling on the Floor Laughing", unicode: "U+1F923" },
//   { emoji: "😂", name: "Face with Tears of Joy", unicode: "U+1F602" },
//   { emoji: "🙂", name: "Slightly Smiling Face", unicode: "U+1F642" },
//   { emoji: "🙃", name: "Upside-Down Face", unicode: "U+1F643" },
//   { emoji: "😉", name: "Winking Face", unicode: "U+1F609" },
//   { emoji: "😊", name: "Smiling Face with Smiling Eyes", unicode: "U+1F60A" },
//   { emoji: "😇", name: "Smiling Face with Halo", unicode: "U+1F607" },
//   { emoji: "🥰", name: "Smiling Face with Hearts", unicode: "U+1F970" },
//   { emoji: "😍", name: "Smiling Face with Heart-Eyes", unicode: "U+1F60D" },
//   { emoji: "🤩", name: "Star-Struck", unicode: "U+1F929" },
//   { emoji: "😘", name: "Face Blowing a Kiss", unicode: "U+1F618" },
//   { emoji: "😗", name: "Kissing Face", unicode: "U+1F617" },
//   { emoji: "😚", name: "Kissing Face with Closed Eyes", unicode: "U+1F61A" },
//   { emoji: "😙", name: "Kissing Face with Smiling Eyes", unicode: "U+1F619" },
//   { emoji: "🥲", name: "Smiling Face with Tear", unicode: "U+1F972" },
//   { emoji: "😋", name: "Face Savoring Food", unicode: "U+1F60B" },
//   { emoji: "😛", name: "Face with Tongue", unicode: "U+1F61B" },
//   { emoji: "😜", name: "Winking Face with Tongue", unicode: "U+1F61C" },
// ]

// export default function BrowseEmojis() {
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <BrowsePageSchema />
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Browse Emojis</h1>
//           <p className="text-muted-foreground">Find, select, and copy emojis for any occasion</p>
//         </div>
//       </div>

//       <div className="mb-8">
//         <div className="relative">
//           <input type="text" placeholder="Search emojis..." className="w-full px-4 py-2 pl-10 border rounded-md" />
//           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">🔍</span>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Category sidebar */}
//         <div className="md:w-64 shrink-0">
//           <div className="bg-card rounded-lg border p-4 sticky top-24">
//             <h3 className="font-medium mb-3">Categories</h3>
//             <div className="space-y-1">
//               {[
//                 "Smileys & Emotion",
//                 "People & Body",
//                 "Animals & Nature",
//                 "Food & Drink",
//                 "Travel & Places",
//                 "Activities",
//                 "Objects",
//                 "Symbols",
//                 "Flags",
//               ].map((category) => (
//                 <button key={category} className="w-full text-left px-3 py-2 rounded-md hover:bg-muted">
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Emoji display area */}
//         <div className="flex-1">
//           <h3 className="text-lg font-medium mb-4">Smileys & Emotion</h3>

//           {/* Multi-emoji selector component */}
//           <MultiEmojiSelector emojis={emojiData} />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Schema for the browse page - now server-side rendered
// function BrowsePageSchema() {
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"

//   return (
//     <JsonLd
//       data={{
//         "@context": "https://schema.org",
//         "@type": "CollectionPage",
//         name: "Browse Emojis - Find and Copy Emojis",
//         description:
//           "Browse, search, and copy emojis for any occasion. Find the perfect emoji for your messages, social media, or documents.",
//         url: `${baseUrl}/browse`,
//         mainEntity: {
//           "@type": "ItemList",
//           numberOfItems: emojiData.length,
//           itemListElement: emojiData.slice(0, 10).map((emoji, index) => ({
//             "@type": "ListItem",
//             position: index + 1,
//             item: {
//               "@type": "Thing",
//               name: emoji.name,
//               identifier: emoji.unicode,
//               description: `${emoji.emoji} - ${emoji.name}`,
//             },
//           })),
//         },
//       }}
//     />
//   )
// }






























"use client"

import { useState } from "react"
import MultiEmojiSelector from "@/components/multi-emoji-selector"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Sample emoji data
const emojiData = [
  { emoji: "😀", name: "Grinning Face", unicode: "U+1F600" },
  { emoji: "😃", name: "Grinning Face with Big Eyes", unicode: "U+1F603" },
  { emoji: "😄", name: "Grinning Face with Smiling Eyes", unicode: "U+1F604" },
  { emoji: "😁", name: "Beaming Face with Smiling Eyes", unicode: "U+1F601" },
  { emoji: "😆", name: "Grinning Squinting Face", unicode: "U+1F606" },
  { emoji: "😅", name: "Grinning Face with Sweat", unicode: "U+1F605" },
  { emoji: "🤣", name: "Rolling on the Floor Laughing", unicode: "U+1F923" },
  { emoji: "😂", name: "Face with Tears of Joy", unicode: "U+1F602" },
  { emoji: "🙂", name: "Slightly Smiling Face", unicode: "U+1F642" },
  { emoji: "🙃", name: "Upside-Down Face", unicode: "U+1F643" },
  { emoji: "😉", name: "Winking Face", unicode: "U+1F609" },
  { emoji: "😊", name: "Smiling Face with Smiling Eyes", unicode: "U+1F60A" },
  { emoji: "😇", name: "Smiling Face with Halo", unicode: "U+1F607" },
  { emoji: "🥰", name: "Smiling Face with Hearts", unicode: "U+1F970" },
  { emoji: "😍", name: "Smiling Face with Heart-Eyes", unicode: "U+1F60D" },
  { emoji: "🤩", name: "Star-Struck", unicode: "U+1F929" },
  { emoji: "😘", name: "Face Blowing a Kiss", unicode: "U+1F618" },
  { emoji: "😗", name: "Kissing Face", unicode: "U+1F617" },
  { emoji: "😚", name: "Kissing Face with Closed Eyes", unicode: "U+1F61A" },
  { emoji: "😙", name: "Kissing Face with Smiling Eyes", unicode: "U+1F619" },
  { emoji: "🥲", name: "Smiling Face with Tear", unicode: "U+1F972" },
  { emoji: "😋", name: "Face Savoring Food", unicode: "U+1F60B" },
  { emoji: "😛", name: "Face with Tongue", unicode: "U+1F61B" },
  { emoji: "😜", name: "Winking Face with Tongue", unicode: "U+1F61C" },
]

// Define emoji categories with their emojis
const emojiCategories = {
  "Smileys & Emotion": [
    { emoji: "😀", name: "Grinning Face", unicode: "U+1F600" },
    { emoji: "😃", name: "Grinning Face with Big Eyes", unicode: "U+1F603" },
    { emoji: "😄", name: "Grinning Face with Smiling Eyes", unicode: "U+1F604" },
    { emoji: "😁", name: "Beaming Face with Smiling Eyes", unicode: "U+1F601" },
    { emoji: "😆", name: "Grinning Squinting Face", unicode: "U+1F606" },
    { emoji: "😅", name: "Grinning Face with Sweat", unicode: "U+1F605" },
    { emoji: "🤣", name: "Rolling on the Floor Laughing", unicode: "U+1F923" },
    { emoji: "😂", name: "Face with Tears of Joy", unicode: "U+1F602" },
  ],
  "People & Body": [
    { emoji: "👋", name: "Waving Hand", unicode: "U+1F44B" },
    { emoji: "🤚", name: "Raised Back of Hand", unicode: "U+1F91A" },
    { emoji: "✋", name: "Raised Hand", unicode: "U+270B" },
    { emoji: "🖖", name: "Vulcan Salute", unicode: "U+1F596" },
  ],
  "Animals & Nature": [
    { emoji: "🐶", name: "Dog Face", unicode: "U+1F436" },
    { emoji: "🐱", name: "Cat Face", unicode: "U+1F431" },
    { emoji: "🐭", name: "Mouse Face", unicode: "U+1F42D" },
    { emoji: "🐹", name: "Hamster Face", unicode: "U+1F439" },
  ],
  "Food & Drink": [
    { emoji: "🍎", name: "Red Apple", unicode: "U+1F34E" },
    { emoji: "🍐", name: "Pear", unicode: "U+1F350" },
    { emoji: "🍊", name: "Tangerine", unicode: "U+1F34A" },
    { emoji: "🍋", name: "Lemon", unicode: "U+1F34B" },
  ],
  "Travel & Places": [
    { emoji: "🚗", name: "Car", unicode: "U+1F697" },
    { emoji: "🚕", name: "Taxi", unicode: "U+1F695" },
    { emoji: "🚙", name: "Sport Utility Vehicle", unicode: "U+1F699" },
    { emoji: "🚌", name: "Bus", unicode: "U+1F68C" },
  ],
  Activities: [
    { emoji: "⚽", name: "Soccer Ball", unicode: "U+26BD" },
    { emoji: "🏀", name: "Basketball", unicode: "U+1F3C0" },
    { emoji: "🏈", name: "American Football", unicode: "U+1F3C8" },
    { emoji: "⚾", name: "Baseball", unicode: "U+26BE" },
  ],
  Objects: [
    { emoji: "⌚", name: "Watch", unicode: "U+231A" },
    { emoji: "📱", name: "Mobile Phone", unicode: "U+1F4F1" },
    { emoji: "💻", name: "Laptop", unicode: "U+1F4BB" },
    { emoji: "⌨️", name: "Keyboard", unicode: "U+2328 U+FE0F" },
  ],
  Symbols: [
    { emoji: "❤️", name: "Red Heart", unicode: "U+2764 U+FE0F" },
    { emoji: "🧡", name: "Orange Heart", unicode: "U+1F9E1" },
    { emoji: "💛", name: "Yellow Heart", unicode: "U+1F49B" },
    { emoji: "💚", name: "Green Heart", unicode: "U+1F49A" },
  ],
  Flags: [
    { emoji: "🏁", name: "Chequered Flag", unicode: "U+1F3C1" },
    { emoji: "🚩", name: "Triangular Flag", unicode: "U+1F6A9" },
    { emoji: "🎌", name: "Crossed Flags", unicode: "U+1F38C" },
    { emoji: "🏴", name: "Black Flag", unicode: "U+1F3F4" },
  ],
}

export default function BrowseEmojis() {
  const [activeCategory, setActiveCategory] = useState("Smileys & Emotion")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter emojis based on search term
  const filteredEmojis = searchTerm
    ? Object.entries(emojiCategories).reduce(
        (acc, [category, emojis]) => {
          const filtered = emojis.filter(
            (emoji) => emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) || emoji.emoji.includes(searchTerm),
          )
          if (filtered.length > 0) {
            acc[category] = filtered
          }
          return acc
        },
        {} as Record<string, typeof emojiData>,
      )
    : emojiCategories

  // Get emojis to display based on active category or search results
  const emojisToDisplay = searchTerm
    ? Object.values(filteredEmojis).flat()
    : emojiCategories[activeCategory as keyof typeof emojiCategories] || []

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Emojis</h1>
          <p className="text-muted-foreground">Find, select, and copy emojis for any occasion</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search emojis..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Category sidebar */}
        <div className="md:w-64 shrink-0">
          <div className="bg-card rounded-lg border p-4 sticky top-24">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-1">
              {Object.keys(emojiCategories).map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveCategory(category)
                    setSearchTerm("")
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Emoji display area */}
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-4">{searchTerm ? "Search Results" : activeCategory}</h3>

          {/* Multi-emoji selector component */}
          <MultiEmojiSelector emojis={emojisToDisplay} />
        </div>
      </div>
    </div>
  )
}

