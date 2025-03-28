import type { Metadata } from "next"
import WordCounterTool from "@/components/word-counter-tool"
import { generateMetadata } from "@/components/seo/default-meta"
import { WordCounterSchema } from "@/components/seo/tool-schema"

export const metadata: Metadata = generateMetadata({
  title: "Word & Character Counter Tool",
  description:
    "Count words, characters, and analyze your text with this simple tool. Perfect for writers, students, and content creators.",
  path: "/tools/word-counter",
})

export default function WordCounterPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <WordCounterSchema />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Word & Character Counter</h1>
          <p className="text-muted-foreground">Count words, characters, and analyze your text with this simple tool</p>
        </div>

        <WordCounterTool />
      </div>
    </div>
  )
}

