"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Check, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type RecentEmoji = {
  emoji: string
  name: string
  timestamp: number
}

export default function RecentlyUsed() {
  const [recentEmojis, setRecentEmojis] = useState<RecentEmoji[]>([])
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()

  // Set client-side flag after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load recently used emojis from localStorage
  useEffect(() => {
    if (!isClient) return

    try {
      const stored = localStorage.getItem("recentlyUsed")
      if (stored) {
        setRecentEmojis(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error)
    }
  }, [isClient])

  const handleCopyEmoji = (emoji: string, name: string) => {
    navigator.clipboard.writeText(emoji)
    setCopiedEmoji(emoji)
    toast({
      title: "Emoji Copied!",
      description: `${emoji} ${name} has been copied to clipboard`,
      duration: 2000,
    })

    setTimeout(() => {
      setCopiedEmoji(null)
    }, 2000)

    // Store in recently used (localStorage) - safely
    try {
      const recentlyUsed = JSON.parse(localStorage.getItem("recentlyUsed") || "[]")
      const newRecentlyUsed = [
        { emoji, name, timestamp: Date.now() },
        ...recentlyUsed.filter((item: any) => item.emoji !== emoji),
      ].slice(0, 24) // Keep only the 24 most recent

      localStorage.setItem("recentlyUsed", JSON.stringify(newRecentlyUsed))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  const clearRecentlyUsed = () => {
    localStorage.removeItem("recentlyUsed")
    setRecentEmojis([])
    toast({
      title: "History Cleared",
      description: "Your recently used emojis have been cleared",
      duration: 2000,
    })
  }

  if (!isClient) {
    return (
      <div className="text-center py-12 bg-card rounded-xl border">
        <p className="text-muted-foreground">Loading recently used emojis...</p>
      </div>
    )
  }

  if (recentEmojis.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-xl border">
        <p className="text-muted-foreground">No recently used emojis yet</p>
        <p className="text-sm text-muted-foreground mt-2">Emojis you copy will appear here for quick access</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" className="text-xs gap-1" onClick={clearRecentlyUsed}>
          <Trash2 className="h-3 w-3" />
          Clear History
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {recentEmojis.map((item, index) => (
          <Card key={index} className="overflow-hidden group hover:shadow-sm transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col items-center justify-center p-3 text-center relative">
                <div className="text-3xl mb-1">{item.emoji}</div>
                <p className="text-xs text-muted-foreground truncate w-full">{item.name}</p>

                <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleCopyEmoji(item.emoji, item.name)}
                        >
                          {copiedEmoji === item.emoji ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy emoji</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

