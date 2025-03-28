"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, ArrowLeft, Heart, Plus, Share2, Code, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// All emoji categories with their emojis
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
}

// Flatten all emojis for searching
const allEmojis = Object.values(emojiCategories).flat()

export default function EmojiDetailClient() {
  const params = useParams()
  const unicodeParam = typeof params.unicode === "string" ? decodeURIComponent(params.unicode) : ""
  const [emoji, setEmoji] = useState<any>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [selectedCollection, setSelectedCollection] = useState("")
  const [collections, setCollections] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()

  // Set client-side flag after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Find emoji by unicode
  useEffect(() => {
    if (!isClient) return

    const foundEmoji = allEmojis.find((e) => e.unicode === unicodeParam)
    setEmoji(foundEmoji || null)
  }, [unicodeParam, isClient])

  // Load collections from localStorage
  useEffect(() => {
    if (!isClient) return

    try {
      const storedCollections = localStorage.getItem("emojiCollections")
      if (storedCollections) {
        setCollections(JSON.parse(storedCollections))
      }
    } catch (error) {
      console.error("Error loading collections:", error)
    }
  }, [isClient])

  // Handle copying to clipboard
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)

    toast({
      title: "Copied!",
      description: `${label} has been copied to clipboard`,
      duration: 2000,
    })

    setTimeout(() => {
      setCopiedText(null)
    }, 2000)
  }

  // Add emoji to collection
  const addToCollection = () => {
    if (!selectedCollection || !emoji) return

    const updatedCollections = collections.map((collection) => {
      if (collection.id === selectedCollection) {
        // Check if emoji already exists in collection
        const emojiExists = collection.emojis.some((e: any) => e.emoji === emoji.emoji)

        if (!emojiExists) {
          return {
            ...collection,
            emojis: [...collection.emojis, { emoji: emoji.emoji, name: emoji.name }],
          }
        }
      }
      return collection
    })

    setCollections(updatedCollections)
    localStorage.setItem("emojiCollections", JSON.stringify(updatedCollections))

    toast({
      title: "Added to collection",
      description: `${emoji.emoji} has been added to the collection`,
    })
  }

  // If not client-side yet, show a loading state that matches server rendering
  if (!isClient) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <div className="h-10 w-24 bg-muted/50 rounded animate-pulse"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr]">
          <div className="h-64 bg-muted/20 rounded-lg animate-pulse"></div>
          <div className="h-64 bg-muted/20 rounded-lg animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (!emoji) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Emoji Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The emoji you're looking for doesn't exist or has an invalid Unicode.
        </p>
        <Link href="/browse">
          <Button>Browse All Emojis</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/browse">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr]">
        {/* Emoji Preview Card */}
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="text-[8rem] mb-4 leading-none">{emoji.emoji}</div>
                <h1 className="text-2xl font-bold mb-1">{emoji.name}</h1>
                <p className="text-muted-foreground mb-6">Unicode: {emoji.unicode}</p>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button className="gap-1" onClick={() => handleCopy(emoji.emoji, "Emoji")}>
                    {copiedText === emoji.emoji ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Emoji
                  </Button>

                  <Button variant="outline" className="gap-1" onClick={() => handleCopy(emoji.unicode, "Unicode")}>
                    {copiedText === emoji.unicode ? <Check className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                    Copy Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add to Collection */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Add to Collection</CardTitle>
            </CardHeader>
            <CardContent>
              {collections.length > 0 ? (
                <div className="flex gap-2">
                  <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={addToCollection} disabled={!selectedCollection}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-sm text-muted-foreground mb-2">No collections yet</p>
                  <Link href="/collections">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Plus className="h-3 w-3" />
                      Create Collection
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Share */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Share</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full gap-1"
                onClick={() => handleCopy(window.location.href, "URL")}
              >
                {copiedText === window.location.href ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                Copy Link
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emoji Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Emoji Details</CardTitle>
              <CardDescription>Complete information about this emoji</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info">
                <TabsList className="mb-4">
                  <TabsTrigger value="info">Information</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-muted-foreground">
                        {emoji.description || `A detailed description of the ${emoji.name} emoji and its common uses.`}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Category</h3>
                      <div className="flex">
                        <span className="bg-muted px-3 py-1 rounded-full text-sm">
                          {Object.entries(emojiCategories).find(([_, emojis]) =>
                            (emojis as any[]).some((e) => e.unicode === emoji.unicode),
                          )?.[0] || "Unknown"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Also Known As</h3>
                      <p className="text-muted-foreground">{emoji.aliases || "No alternative names available."}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="usage">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Common Usage</h3>
                      <p className="text-muted-foreground">
                        {emoji.usage ||
                          `The ${emoji.name} emoji is commonly used to express feelings or situations related to its visual representation.`}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Examples</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Example message with the {emoji.emoji} emoji</li>
                        <li>Another context where {emoji.emoji} might be used</li>
                        <li>Creative way to incorporate {emoji.emoji} in communication</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Combinations</h3>
                      <p className="text-muted-foreground mb-2">Emojis that are often used together with this one:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="text-lg">
                          {emoji.emoji}✨
                        </Button>
                        <Button variant="outline" size="sm" className="text-lg">
                          {emoji.emoji}👍
                        </Button>
                        <Button variant="outline" size="sm" className="text-lg">
                          {emoji.emoji}❤️
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="technical">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Unicode Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Unicode</p>
                          <p className="font-mono">{emoji.unicode}</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">HTML Entity</p>
                          <p className="font-mono">&amp;#{Number.parseInt(emoji.unicode.replace("U+", ""), 16)};</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">CSS Code</p>
                          <p className="font-mono">\{emoji.unicode.replace("U+", "")}</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">JavaScript</p>
                          <p className="font-mono">String.fromCodePoint(0x{emoji.unicode.replace("U+", "")})</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Platform Support</h3>
                      <p className="text-muted-foreground mb-2">How this emoji appears on different platforms:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <div className="bg-muted p-3 rounded-lg text-center">
                          <p className="text-xs text-muted-foreground mb-1">Apple</p>
                          <p className="text-2xl">{emoji.emoji}</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg text-center">
                          <p className="text-xs text-muted-foreground mb-1">Google</p>
                          <p className="text-2xl">{emoji.emoji}</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg text-center">
                          <p className="text-xs text-muted-foreground mb-1">Microsoft</p>
                          <p className="text-2xl">{emoji.emoji}</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg text-center">
                          <p className="text-xs text-muted-foreground mb-1">Samsung</p>
                          <p className="text-2xl">{emoji.emoji}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm" className="gap-1">
                <Info className="h-4 w-4" />
                Report Issue
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <Heart className="h-4 w-4" />
                Add to Favorites
              </Button>
            </CardFooter>
          </Card>

          {/* Related Emojis */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Related Emojis</CardTitle>
              <CardDescription>Similar emojis you might be interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {allEmojis.slice(0, 8).map((relatedEmoji) => (
                  <Link key={relatedEmoji.unicode} href={`/emoji/${encodeURIComponent(relatedEmoji.unicode)}`}>
                    <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center p-1">
                      <span className="text-2xl mb-1">{relatedEmoji.emoji}</span>
                      <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                        {relatedEmoji.name}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

