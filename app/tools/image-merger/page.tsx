import type { Metadata } from "next"
import ImageMergerTool from "@/components/image-merger-tool"
import { generateMetadata } from "@/components/seo/default-meta"
import { ImageMergerSchema } from "@/components/seo/tool-schema"

export const metadata: Metadata = generateMetadata({
  title: "Image Merger Tool",
  description:
    "Combine multiple images with customizable layouts, borders, and watermarks. A free online tool for merging images.",
  path: "/tools/image-merger",
})

export default function ImageMergerPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <ImageMergerSchema />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Image Merger</h1>
          <p className="text-muted-foreground">Combine multiple images with customizable layouts and options</p>
        </div>

        <ImageMergerTool />
      </div>
    </div>
  )
}

