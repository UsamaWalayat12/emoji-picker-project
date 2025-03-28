"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, Check, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Featured emojis with additional information
const featuredEmojis = [
  {
    emoji: "😂",
    name: "Face with Tears of Joy",
    description: "A face with tears streaming down its cheeks, laughing. Used to express something is very funny.",
    unicode: "U+1F602",
    category: "Smileys & Emotion",
  },
  {
    emoji: "❤️",
    name: "Red Heart",
    description: "A classic red love heart. Used to express love, affection, and warm feelings.",
    unicode: "U+2764 U+FE0F",
    category: "Symbols",
  },
  {
    emoji: "🔥",
    name: "Fire",
    description: "A flame. Used to signify something is hot, trendy, exciting, or that someone is 'on fire'.",
    unicode: "U+1F525",
    category: "Travel & Places",
  },
  {
    emoji: "✨",
    name: "Sparkles",
    description:
      "Three golden stars with smaller white sparkles. Used to indicate something new, shiny, clean, or special.",
    unicode: "U+2728",
    category: "Activities",
  },
  {
    emoji: "🥰",
    name: "Smiling Face with Hearts",
    description: "A smiling face with hearts floating around its head. Expresses adoration or feeling loved.",
    unicode: "U+1F970",
    category: "Smileys & Emotion",
  },
  {
    emoji: "🙏",
    name: "Folded Hands",
    description:
      "Two hands pressed together with thumbs pointed upwards. Used to express gratitude, hope, or a request.",
    unicode: "U+1F64F",
    category: "People & Body",
  },
  {
    emoji: "😭",
    name: "Loudly Crying Face",
    description:
      "A face with tears streaming down from closed eyes. Used to express intense sadness or uncontrollable laughter.",
    unicode: "U+1F62D",
    category: "Smileys & Emotion",
  },
  {
    emoji: "👍",
    name: "Thumbs Up",
    description: "A thumbs-up gesture indicating approval, agreement, or encouragement.",
    unicode: "U+1F44D",
    category: "People & Body",
  },
]

export default function FeaturedEmojis() {
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCopyEmoji = (emoji: string, name: string) => {
    navigator.clipboard.writeText(emoji)
    setCopiedEmoji(emoji)
    toast({
      title: "Emoji Copied!",
      description: `${emoji} ${name} has been copied to clipboard`,
      duration: 2000,
    })

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedEmoji(null)
    }, 2000)

    // Store in recently used (localStorage) - safely
    try {
      if (typeof window !== "undefined") {
        const recentlyUsed = JSON.parse(localStorage.getItem("recentlyUsed") || "[]")
        const newRecentlyUsed = [
          { emoji, name, timestamp: Date.now() },
          ...recentlyUsed.filter((item: any) => item.emoji !== emoji),
        ].slice(0, 24) // Keep only the 24 most recent

        localStorage.setItem("recentlyUsed", JSON.stringify(newRecentlyUsed))
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {featuredEmojis.map((emoji) => (
        <Card key={emoji.unicode} className="overflow-hidden group hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="text-4xl">{emoji.emoji}</div>
                <div className="flex gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopyEmoji(emoji.emoji, emoji.name)}
                        >
                          {copiedEmoji === emoji.emoji ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy emoji</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/emoji/${encodeURIComponent(emoji.unicode)}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Info className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-medium text-sm">{emoji.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{emoji.description}</p>
                <div className="mt-auto pt-3">
                  <div className="text-xs text-muted-foreground flex flex-wrap gap-2 mt-2">
                    <span className="bg-muted px-2 py-0.5 rounded-full">{emoji.category}</span>
                    <span className="bg-muted px-2 py-0.5 rounded-full font-mono">{emoji.unicode}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

