"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Copy, Check, FolderPlus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type EmojiCollection = {
  id: string
  name: string
  description: string
  emojis: Array<{
    emoji: string
    name: string
  }>
  createdAt: number
}

// Sample collections
const sampleCollections: EmojiCollection[] = [
  {
    id: "favorites",
    name: "Favorites",
    description: "My most used emojis",
    emojis: [
      { emoji: "❤️", name: "Red Heart" },
      { emoji: "👍", name: "Thumbs Up" },
      { emoji: "😊", name: "Smiling Face with Smiling Eyes" },
      { emoji: "🎉", name: "Party Popper" },
      { emoji: "🔥", name: "Fire" },
      { emoji: "✨", name: "Sparkles" },
    ],
    createdAt: Date.now() - 1000000,
  },
  {
    id: "reactions",
    name: "Reactions",
    description: "Emojis for reacting to messages",
    emojis: [
      { emoji: "👍", name: "Thumbs Up" },
      { emoji: "👎", name: "Thumbs Down" },
      { emoji: "😂", name: "Face with Tears of Joy" },
      { emoji: "😮", name: "Face with Open Mouth" },
      { emoji: "❤️", name: "Red Heart" },
      { emoji: "🎉", name: "Party Popper" },
    ],
    createdAt: Date.now() - 2000000,
  },
]

export default function CollectionsClient() {
  const [collections, setCollections] = useState<EmojiCollection[]>([])
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [activeCollection, setActiveCollection] = useState<string | null>(null)
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()

  // Set client-side flag after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load collections from localStorage
  useEffect(() => {
    if (!isClient) return

    try {
      const storedCollections = localStorage.getItem("emojiCollections")
      if (storedCollections) {
        setCollections(JSON.parse(storedCollections))
      } else {
        // Use sample collections if none exist
        setCollections(sampleCollections)
        localStorage.setItem("emojiCollections", JSON.stringify(sampleCollections))
      }
    } catch (error) {
      console.error("Error loading collections:", error)
      // Fallback to sample collections
      setCollections(sampleCollections)
    }
  }, [isClient])

  // Set active collection when collections load
  useEffect(() => {
    if (collections.length > 0 && !activeCollection) {
      setActiveCollection(collections[0].id)
    }
  }, [collections, activeCollection])

  // Handle copying emoji to clipboard
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

  // Create a new collection
  const createCollection = () => {
    if (!newCollectionName.trim()) {
      toast({
        title: "Collection name required",
        description: "Please enter a name for your collection",
        variant: "destructive",
      })
      return
    }

    const newCollection: EmojiCollection = {
      id: `collection-${Date.now()}`,
      name: newCollectionName,
      description: newCollectionDescription,
      emojis: [],
      createdAt: Date.now(),
    }

    const updatedCollections = [...collections, newCollection]
    setCollections(updatedCollections)
    localStorage.setItem("emojiCollections", JSON.stringify(updatedCollections))

    setNewCollectionName("")
    setNewCollectionDescription("")
    setActiveCollection(newCollection.id)
    setIsDialogOpen(false)

    toast({
      title: "Collection created",
      description: `"${newCollectionName}" has been created`,
    })
  }

  // Delete a collection
  const deleteCollection = (id: string) => {
    const updatedCollections = collections.filter((collection) => collection.id !== id)
    setCollections(updatedCollections)
    localStorage.setItem("emojiCollections", JSON.stringify(updatedCollections))

    if (activeCollection === id) {
      setActiveCollection(updatedCollections.length > 0 ? updatedCollections[0].id : null)
    }

    toast({
      title: "Collection deleted",
      description: "The collection has been deleted",
    })
  }

  // Remove emoji from collection
  const removeEmojiFromCollection = (collectionId: string, emoji: string) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          emojis: collection.emojis.filter((e) => e.emoji !== emoji),
        }
      }
      return collection
    })

    setCollections(updatedCollections)
    localStorage.setItem("emojiCollections", JSON.stringify(updatedCollections))

    toast({
      title: "Emoji removed",
      description: "The emoji has been removed from the collection",
    })
  }

  // If not client-side yet, show a loading state that matches server rendering
  if (!isClient) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Collections</h1>
            <p className="text-muted-foreground">Create and manage your emoji collections</p>
          </div>
          <div className="h-10 w-40 bg-muted/50 rounded animate-pulse"></div>
        </div>
        <div className="h-64 bg-muted/20 rounded-lg animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Collections</h1>
          <p className="text-muted-foreground">Create and manage your emoji collections</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
              <DialogDescription>Create a new collection to organize your favorite emojis</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Collection name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  placeholder="Collection description (optional)"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createCollection}>Create Collection</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl border">
          <FolderPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No Collections Yet</h2>
          <p className="text-muted-foreground mb-6">
            Create your first collection to start organizing your favorite emojis
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>Create Collection</Button>
        </div>
      ) : (
        <Tabs
          defaultValue={collections[0]?.id}
          value={activeCollection || undefined}
          onValueChange={setActiveCollection}
          className="w-full"
        >
          <div className="flex overflow-x-auto pb-2 mb-6">
            <TabsList>
              {collections.map((collection) => (
                <TabsTrigger key={collection.id} value={collection.id}>
                  {collection.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {collections.map((collection) => (
            <TabsContent key={collection.id} value={collection.id} className="mt-0">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{collection.name}</CardTitle>
                      {collection.description && <CardDescription>{collection.description}</CardDescription>}
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => deleteCollection(collection.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Collection
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {collection.emojis.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        This collection is empty. Add emojis from the browser.
                      </p>
                      <Link href="/browse">
                        <Button variant="outline">Browse Emojis</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                      {collection.emojis.map((emoji, index) => (
                        <Card key={index} className="overflow-hidden group hover:shadow-sm transition-shadow">
                          <CardContent className="p-0">
                            <div className="flex flex-col items-center justify-center p-3 text-center relative">
                              <div className="text-3xl mb-1">{emoji.emoji}</div>
                              <p className="text-xs text-muted-foreground truncate w-full">{emoji.name}</p>

                              <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleCopyEmoji(emoji.emoji, emoji.name)}
                                >
                                  {copiedEmoji === emoji.emoji ? (
                                    <Check className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-destructive"
                                  onClick={() => removeEmojiFromCollection(collection.id, emoji.emoji)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-xs text-muted-foreground">
                    {collection.emojis.length} {collection.emojis.length === 1 ? "emoji" : "emojis"}
                  </p>
                  <Link href="/browse">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Plus className="h-3 w-3" />
                      Add Emojis
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}

