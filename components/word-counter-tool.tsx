// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Clipboard, Copy, Clock, RefreshCw } from "lucide-react"

// export default function WordCounterTool() {
//   const [text, setText] = useState("")
//   const [stats, setStats] = useState({
//     characters: 0,
//     charactersNoSpaces: 0,
//     words: 0,
//     sentences: 0,
//     paragraphs: 0,
//     readingTime: 0,
//   })
//   const [copied, setCopied] = useState(false)

//   // Calculate stats whenever text changes
//   useEffect(() => {
//     const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
//     const characters = text.length
//     const charactersNoSpaces = text.replace(/\s+/g, "").length

//     // Count sentences (roughly) by counting periods, exclamation points, and question marks
//     // followed by a space or end of string
//     const sentences = text === "" ? 0 : (text.match(/[.!?]+(?=\s|$)/g) || []).length

//     // Count paragraphs by counting double line breaks
//     const paragraphs = text === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim() !== "").length || 1

//     // Calculate reading time (average reading speed is about 200-250 words per minute)
//     const readingTime = Math.ceil(words / 225)

//     setStats({
//       characters,
//       charactersNoSpaces,
//       words,
//       sentences,
//       paragraphs,
//       readingTime,
//     })
//   }, [text])

//   // Handle paste from clipboard
//   const handlePasteFromClipboard = async () => {
//     try {
//       const clipboardText = await navigator.clipboard.readText()
//       setText(clipboardText)
//     } catch (error) {
//       console.error("Failed to read clipboard:", error)
//     }
//   }

//   // Handle copy to clipboard
//   const handleCopyToClipboard = () => {
//     navigator.clipboard.writeText(text)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   // Clear text
//   const handleClear = () => {
//     setText("")
//   }

//   return (
//     <div className="space-y-6">
//       {/* Stats display */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//         <StatCard title="Characters" value={stats.characters} />
//         <StatCard title="Without Spaces" value={stats.charactersNoSpaces} />
//         <StatCard title="Words" value={stats.words} />
//         <StatCard title="Sentences" value={stats.sentences} />
//         <StatCard title="Paragraphs" value={stats.paragraphs} />
//         <StatCard
//           title="Reading Time"
//           value={stats.readingTime}
//           suffix={`min${stats.readingTime !== 1 ? "s" : ""}`}
//           icon={<Clock className="h-3 w-3 text-muted-foreground" />}
//         />
//       </div>

//       {/* Text input area */}
//       <div className="space-y-4">
//         <div className="flex flex-wrap gap-2">
//           <Button variant="outline" size="sm" className="text-xs gap-1.5" onClick={handlePasteFromClipboard}>
//             <Clipboard className="h-3.5 w-3.5" />
//             Paste from Clipboard
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             className="text-xs gap-1.5"
//             onClick={handleCopyToClipboard}
//             disabled={text.length === 0}
//           >
//             {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
//             {copied ? "Copied!" : "Copy"}
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             className="text-xs gap-1.5"
//             onClick={handleClear}
//             disabled={text.length === 0}
//           >
//             <RefreshCw className="h-3.5 w-3.5" />
//             Clear
//           </Button>
//         </div>

//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Start typing or paste your text here..."
//           className="w-full h-64 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
//         />
//       </div>

//       {/* Additional information */}
//       <div className="bg-muted/30 rounded-lg p-4 text-sm">
//         <h3 className="font-medium mb-2">About Word Counter</h3>
//         <p className="text-muted-foreground">
//           This tool counts words, characters, sentences, and paragraphs in your text. It also estimates reading time
//           based on an average reading speed of 225 words per minute.
//         </p>
//       </div>
//     </div>
//   )
// }

// // Stat card component
// function StatCard({
//   title,
//   value,
//   suffix = "",
//   icon = null,
// }: {
//   title: string
//   value: number
//   suffix?: string
//   icon?: React.ReactNode
// }) {
//   return (
//     <Card>
//       <CardHeader className="py-4 px-4">
//         <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
//       </CardHeader>
//       <CardContent className="pt-0 px-4 pb-4">
//         <div className="text-2xl font-bold flex items-center gap-1">
//           {value}
//           {suffix} {icon}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// // Check icon component for copy confirmation
// function Check(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       {...props}
//     >
//       <polyline points="20 6 9 17 4 12" />
//     </svg>
//   )
// }

























"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clipboard, Copy, Clock, RefreshCw } from "lucide-react"

export default function WordCounterTool() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  })
  const [copied, setCopied] = useState(false)

  // Calculate stats whenever text changes
  useEffect(() => {
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s+/g, "").length

    // Count sentences (roughly) by counting periods, exclamation points, and question marks
    // followed by a space or end of string
    const sentences = text === "" ? 0 : (text.match(/[.!?]+(?=\s|$)/g) || []).length

    // Count paragraphs by counting double line breaks
    const paragraphs = text === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim() !== "").length || 1

    // Calculate reading time (average reading speed is about 200-250 words per minute)
    const readingTime = Math.ceil(words / 225)

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
    })
  }, [text])

  // Handle paste from clipboard
  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
    } catch (error) {
      console.error("Failed to read clipboard:", error)
    }
  }

  // Handle copy to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Clear text
  const handleClear = () => {
    setText("")
  }

  return (
    <div className="space-y-6">
      {/* Stats display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <StatCard title="Characters" value={stats.characters} />
        <StatCard title="Without Spaces" value={stats.charactersNoSpaces} />
        <StatCard title="Words" value={stats.words} />
        <StatCard title="Sentences" value={stats.sentences} />
        <StatCard title="Paragraphs" value={stats.paragraphs} />
        <StatCard
          title="Reading Time"
          value={stats.readingTime}
          suffix={`min${stats.readingTime !== 1 ? "s" : ""}`}
          icon={<Clock className="h-3 w-3 text-muted-foreground" />}
        />
      </div>

      {/* Text input area */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1.5" onClick={handlePasteFromClipboard}>
            <Clipboard className="h-3.5 w-3.5" />
            Paste from Clipboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5"
            onClick={handleCopyToClipboard}
            disabled={text.length === 0}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5"
            onClick={handleClear}
            disabled={text.length === 0}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-64 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-foreground bg-background"
        />
      </div>

      {/* Additional information */}
      <div className="bg-muted/30 rounded-lg p-4 text-sm">
        <h3 className="font-medium mb-2">About Word Counter</h3>
        <p className="text-muted-foreground">
          This tool counts words, characters, sentences, and paragraphs in your text. It also estimates reading time
          based on an average reading speed of 225 words per minute.
        </p>
      </div>
    </div>
  )
}

// Stat card component
function StatCard({
  title,
  value,
  suffix = "",
  icon = null,
}: {
  title: string
  value: number
  suffix?: string
  icon?: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="py-4 px-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-4">
        <div className="text-2xl font-bold flex items-center gap-1">
          {value}
          {suffix} {icon}
        </div>
      </CardContent>
    </Card>
  )
}

// Check icon component for copy confirmation
function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

