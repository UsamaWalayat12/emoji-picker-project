// import type { Metadata } from "next"
// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { FileText, Image, Calculator, ArrowRight } from "lucide-react"
// import { generateMetadata } from "@/components/seo/default-meta"
// import JsonLd from "@/components/json-ld"

// export const metadata: Metadata = generateMetadata({
//   title: "Useful Tools - Free Online Utilities",
//   description:
//     "Discover our collection of free online tools including Word Counter, Image Merger, and more to enhance your productivity.",
//   path: "/tools",
// })

// export default function ToolsPage() {
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <ToolsPageSchema />
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Useful Tools</h1>
//           <p className="text-muted-foreground">Helpful utilities to enhance your productivity</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <Card className="overflow-hidden hover:shadow-md transition-shadow">
//           <CardHeader className="pb-2">
//             <CardTitle className="flex items-center gap-2">
//               <FileText className="h-5 w-5 text-primary" />
//               Word Counter
//             </CardTitle>
//             <CardDescription>Count words, characters, and more</CardDescription>
//           </CardHeader>
//           <CardContent className="pb-2">
//             <p className="text-sm text-muted-foreground">
//               A simple tool to count words, characters, and analyze text. Perfect for writers, students, and content
//               creators.
//             </p>
//           </CardContent>
//           <CardFooter>
//             <Link href="/tools/word-counter" className="text-sm text-primary hover:underline flex items-center gap-1">
//               Try it now <ArrowRight className="h-3 w-3" />
//             </Link>
//           </CardFooter>
//         </Card>

//         <Card className="overflow-hidden hover:shadow-md transition-shadow">
//           <CardHeader className="pb-2">
//             <CardTitle className="flex items-center gap-2">
//               <Image className="h-5 w-5 text-primary" />
//               Image Merger
//             </CardTitle>
//             <CardDescription>Combine multiple images easily</CardDescription>
//           </CardHeader>
//           <CardContent className="pb-2">
//             <p className="text-sm text-muted-foreground">
//               Merge multiple images with customizable layouts. Adjust spacing, background, and more with this simple
//               tool.
//             </p>
//           </CardContent>
//           <CardFooter>
//             <Link href="/tools/image-merger" className="text-sm text-primary hover:underline flex items-center gap-1">
//               Try it now <ArrowRight className="h-3 w-3" />
//             </Link>
//           </CardFooter>
//         </Card>

//         <Card className="overflow-hidden hover:shadow-md transition-shadow">
//           <CardHeader className="pb-2">
//             <CardTitle className="flex items-center gap-2">
//               <Calculator className="h-5 w-5 text-primary" />
//               Character Counter
//             </CardTitle>
//             <CardDescription>Count characters for social media</CardDescription>
//           </CardHeader>
//           <CardContent className="pb-2">
//             <p className="text-sm text-muted-foreground">
//               Optimize your posts for Twitter, Instagram, and other platforms with character limits.
//             </p>
//           </CardContent>
//           <CardFooter>
//             <Link href="/tools/word-counter" className="text-sm text-primary hover:underline flex items-center gap-1">
//               Try it now <ArrowRight className="h-3 w-3" />
//             </Link>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   )
// }

// // Schema for the tools page
// function ToolsPageSchema() {
//   return (
//     <JsonLd
//       data={{
//         "@context": "https://schema.org",
//         "@type": "CollectionPage",
//         name: "Useful Tools - Free Online Utilities",
//         description:
//           "Discover our collection of free online tools including Word Counter, Image Merger, and more to enhance your productivity.",
//         url: typeof window !== "undefined" ? `${window.location.origin}/tools` : "https://emojiverse-example.com/tools",
//         mainEntity: {
//           "@type": "ItemList",
//           itemListElement: [
//             {
//               "@type": "ListItem",
//               position: 1,
//               name: "Word Counter Tool",
//               url:
//                 typeof window !== "undefined"
//                   ? `${window.location.origin}/tools/word-counter`
//                   : "https://emojiverse-example.com/tools/word-counter",
//             },
//             {
//               "@type": "ListItem",
//               position: 2,
//               name: "Image Merger Tool",
//               url:
//                 typeof window !== "undefined"
//                   ? `${window.location.origin}/tools/image-merger`
//                   : "https://emojiverse-example.com/tools/image-merger",
//             },
//           ],
//         },
//       }}
//     />
//   )
// }




































import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Image, Calculator, ArrowRight } from "lucide-react"
import { generateMetadata } from "@/components/seo/default-meta"
import JsonLd from "@/components/json-ld"

export const metadata: Metadata = generateMetadata({
  title: "Useful Tools - Free Online Utilities",
  description:
    "Discover our collection of free online tools including Word Counter, Image Merger, and more to enhance your productivity.",
  path: "/tools",
})

export default function ToolsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <ToolsPageSchema />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Useful Tools</h1>
          <p className="text-muted-foreground">Helpful utilities to enhance your productivity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Word Counter
            </CardTitle>
            <CardDescription>Count words, characters, and more</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">
              A simple tool to count words, characters, and analyze text. Perfect for writers, students, and content
              creators.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/tools/word-counter" className="text-sm text-primary hover:underline flex items-center gap-1">
              Try it now <ArrowRight className="h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              Image Merger
            </CardTitle>
            <CardDescription>Combine multiple images easily</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">
              Merge multiple images with customizable layouts. Adjust spacing, background, and more with this simple
              tool.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/tools/image-merger" className="text-sm text-primary hover:underline flex items-center gap-1">
              Try it now <ArrowRight className="h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Character Counter
            </CardTitle>
            <CardDescription>Count characters for social media</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">
              Optimize your posts for Twitter, Instagram, and other platforms with character limits.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/tools/word-counter" className="text-sm text-primary hover:underline flex items-center gap-1">
              Try it now <ArrowRight className="h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Schema for the tools page - now server-side rendered
function ToolsPageSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Useful Tools - Free Online Utilities",
        description:
          "Discover our collection of free online tools including Word Counter, Image Merger, and more to enhance your productivity.",
        url: `${baseUrl}/tools`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Word Counter Tool",
              url: `${baseUrl}/tools/word-counter`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Image Merger Tool",
              url: `${baseUrl}/tools/image-merger`,
            },
          ],
        },
      }}
    />
  )
}

