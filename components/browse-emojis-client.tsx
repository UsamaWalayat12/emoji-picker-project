"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, Copy, Check, Info, Filter, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Emoji categories with their emojis
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
  ],
  "People & Body": [
    { emoji: "👋", name: "Waving Hand", unicode: "U+1F44B" },
    { emoji: "🤚", name: "Raised Back of Hand", unicode: "U+1F91A" },
    { emoji: "✋", name: "Raised Hand", unicode: "U+270B" },
    { emoji: "🖖", name: "Vulcan Salute", unicode: "U+1F596" },
    { emoji: "👌", name: "OK Hand", unicode: "U+1F44C" },
    { emoji: "🤌", name: "Pinched Fingers", unicode: "U+1F90C" },
    { emoji: "🤏", name: "Pinching Hand", unicode: "U+1F90F" },
    { emoji: "✌️", name: "Victory Hand", unicode: "U+270C U+FE0F" },
    { emoji: "🤞", name: "Crossed Fingers", unicode: "U+1F91E" },
    { emoji: "🫰", name: "Hand with Index Finger and Thumb Crossed", unicode: "U+1FAF0" },
    { emoji: "🤟", name: "Love-You Gesture", unicode: "U+1F91F" },
    { emoji: "🤘", name: "Sign of the Horns", unicode: "U+1F918" },
    { emoji: "👈", name: "Backhand Index Pointing Left", unicode: "U+1F448" },
    { emoji: "👉", name: "Backhand Index Pointing Right", unicode: "U+1F449" },
    { emoji: "👆", name: "Backhand Index Pointing Up", unicode: "U+1F446" },
    { emoji: "👇", name: "Backhand Index Pointing Down", unicode: "U+1F447" },
    { emoji: "☝️", name: "Index Pointing Up", unicode: "U+261D U+FE0F" },
    { emoji: "🫵", name: "Index Pointing at the Viewer", unicode: "U+1FAF5" },
  ],
  "Animals & Nature": [
    { emoji: "🐶", name: "Dog Face", unicode: "U+1F436" },
    { emoji: "🐱", name: "Cat Face", unicode: "U+1F431" },
    { emoji: "🐭", name: "Mouse Face", unicode: "U+1F42D" },
    { emoji: "🐹", name: "Hamster Face", unicode: "U+1F439" },
    { emoji: "🐰", name: "Rabbit Face", unicode: "U+1F430" },
    { emoji: "🦊", name: "Fox Face", unicode: "U+1F98A" },
    { emoji: "🐻", name: "Bear Face", unicode: "U+1F43B" },
    { emoji: "🐼", name: "Panda Face", unicode: "U+1F43C" },
    { emoji: "🐨", name: "Koala Face", unicode: "U+1F428" },
    { emoji: "🐯", name: "Tiger Face", unicode: "U+1F42F" },
    { emoji: "🦁", name: "Lion Face", unicode: "U+1F981" },
    { emoji: "🐮", name: "Cow Face", unicode: "U+1F42E" },
    { emoji: "🐷", name: "Pig Face", unicode: "U+1F437" },
    { emoji: "🐸", name: "Frog Face", unicode: "U+1F438" },
    { emoji: "🐵", name: "Monkey Face", unicode: "U+1F435" },
    { emoji: "🐔", name: "Chicken", unicode: "U+1F414" },
    { emoji: "🐧", name: "Penguin", unicode: "U+1F427" },
    { emoji: "🐦", name: "Bird", unicode: "U+1F426" },
  ],
  "Food & Drink": [
    { emoji: "🍎", name: "Red Apple", unicode: "U+1F34E" },
    { emoji: "🍐", name: "Pear", unicode: "U+1F350" },
    { emoji: "🍊", name: "Tangerine", unicode: "U+1F34A" },
    { emoji: "🍋", name: "Lemon", unicode: "U+1F34B" },
    { emoji: "🍌", name: "Banana", unicode: "U+1F34C" },
    { emoji: "🍉", name: "Watermelon", unicode: "U+1F349" },
    { emoji: "🍇", name: "Grapes", unicode: "U+1F347" },
    { emoji: "🍓", name: "Strawberry", unicode: "U+1F353" },
    { emoji: "🫐", name: "Blueberries", unicode: "U+1FAD0" },
    { emoji: "🍈", name: "Melon", unicode: "U+1F348" },
    { emoji: "🍒", name: "Cherries", unicode: "U+1F352" },
    { emoji: "🍑", name: "Peach", unicode: "U+1F351" },
    { emoji: "🥭", name: "Mango", unicode: "U+1F96D" },
    { emoji: "🍍", name: "Pineapple", unicode: "U+1F34D" },
    { emoji: "🥥", name: "Coconut", unicode: "U+1F965" },
    { emoji: "🥝", name: "Kiwi Fruit", unicode: "U+1F95D" },
    { emoji: "🍅", name: "Tomato", unicode: "U+1F345" },
    { emoji: "🍆", name: "Eggplant", unicode: "U+1F346" },
  ],
  "Travel & Places": [
    { emoji: "🚗", name: "Car", unicode: "U+1F697" },
    { emoji: "🚕", name: "Taxi", unicode: "U+1F695" },
    { emoji: "🚙", name: "Sport Utility Vehicle", unicode: "U+1F699" },
    { emoji: "🚌", name: "Bus", unicode: "U+1F68C" },
    { emoji: "🚎", name: "Trolleybus", unicode: "U+1F68E" },
    { emoji: "🏎️", name: "Racing Car", unicode: "U+1F3CE U+FE0F" },
    { emoji: "🚓", name: "Police Car", unicode: "U+1F693" },
    { emoji: "🚑", name: "Ambulance", unicode: "U+1F691" },
    { emoji: "🚒", name: "Fire Engine", unicode: "U+1F692" },
    { emoji: "🚐", name: "Minibus", unicode: "U+1F690" },
    { emoji: "🛻", name: "Pickup Truck", unicode: "U+1F6FB" },
    { emoji: "🚚", name: "Delivery Truck", unicode: "U+1F69A" },
  ],
  Activities: [
    { emoji: "⚽", name: "Soccer Ball", unicode: "U+26BD" },
    { emoji: "🏀", name: "Basketball", unicode: "U+1F3C0" },
    { emoji: "🏈", name: "American Football", unicode: "U+1F3C8" },
    { emoji: "⚾", name: "Baseball", unicode: "U+26BE" },
    { emoji: "🥎", name: "Softball", unicode: "U+1F94E" },
    { emoji: "🎾", name: "Tennis", unicode: "U+1F3BE" },
    { emoji: "🏐", name: "Volleyball", unicode: "U+1F3D0" },
    { emoji: "🏉", name: "Rugby Football", unicode: "U+1F3C9" },
    { emoji: "🥏", name: "Flying Disc", unicode: "U+1F94F" },
    { emoji: "🎱", name: "Pool 8 Ball", unicode: "U+1F3B1" },
  ],
  Objects: [
    { emoji: "⌚", name: "Watch", unicode: "U+231A" },
    { emoji: "📱", name: "Mobile Phone", unicode: "U+1F4F1" },
    { emoji: "💻", name: "Laptop", unicode: "U+1F4BB" },
    { emoji: "⌨️", name: "Keyboard", unicode: "U+2328 U+FE0F" },
    { emoji: "🖥️", name: "Desktop Computer", unicode: "U+1F5A5 U+FE0F" },
    { emoji: "🖨️", name: "Printer", unicode: "U+1F5A8 U+FE0F" },
    { emoji: "🖱️", name: "Computer Mouse", unicode: "U+1F5B1 U+FE0F" },
    { emoji: "🖲️", name: "Trackball", unicode: "U+1F5B2 U+FE0F" },
    { emoji: "🕹️", name: "Joystick", unicode: "U+1F579 U+FE0F" },
    { emoji: "🗜️", name: "Clamp", unicode: "U+1F5DC U+FE0F" },
  ],
  Symbols: [
    { emoji: "❤️", name: "Red Heart", unicode: "U+2764 U+FE0F" },
    { emoji: "🧡", name: "Orange Heart", unicode: "U+1F9E1" },
    { emoji: "💛", name: "Yellow Heart", unicode: "U+1F49B" },
    { emoji: "💚", name: "Green Heart", unicode: "U+1F49A" },
    { emoji: "💙", name: "Blue Heart", unicode: "U+1F499" },
    { emoji: "💜", name: "Purple Heart", unicode: "U+1F49C" },
    { emoji: "🖤", name: "Black Heart", unicode: "U+1F5A4" },
    { emoji: "🤍", name: "White Heart", unicode: "U+1F90D" },
    { emoji: "🤎", name: "Brown Heart", unicode: "U+1F90E" },
    { emoji: "💔", name: "Broken Heart", unicode: "U+1F494" },
  ],
  Flags: [
    { emoji: "🏁", name: "Chequered Flag", unicode: "U+1F3C1" },
    { emoji: "🚩", name: "Triangular Flag", unicode: "U+1F6A9" },
    { emoji: "🎌", name: "Crossed Flags", unicode: "U+1F38C" },
    { emoji: "🏴", name: "Black Flag", unicode: "U+1F3F4" },
    { emoji: "🏳️", name: "White Flag", unicode: "U+1F3F3 U+FE0F" },
    { emoji: "🏳️‍🌈", name: "Rainbow Flag", unicode: "U+1F3F3 U+FE0F U+200D U+1F308" },
    { emoji: "🏳️‍⚧️", name: "Transgender Flag", unicode: "U+1F3F3 U+FE0F U+200D U+26A7 U+FE0F" },
    { emoji: "🏴‍☠️", name: "Pirate Flag", unicode: "U+1F3F4 U+200D U+2620 U+FE0F" },
  ],
}

// Sort options
const sortOptions = [
  { value: "default", label: "Default" },
  { value: "a-z", label: "A-Z" },
  { value: "z-a", label: "Z-A" },
]

export default function BrowseEmojisClient() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("Smileys & Emotion")
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("default")
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize from URL parameters
  useEffect(() => {
    if (!mounted) return

    const category = searchParams.get("category")
    const search = searchParams.get("search")

    if (category && Object.keys(emojiCategories).includes(category)) {
      setActiveCategory(category)
    }

    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams, mounted])

  // Handle copying emoji to clipboard
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
        {} as Record<string, (typeof emojiCategories)[keyof typeof emojiCategories]>,
      )
    : emojiCategories

  // Sort emojis based on selected option
  const sortEmojis = (emojis: (typeof emojiCategories)[keyof typeof emojiCategories]) => {
    if (sortBy === "a-z") {
      return [...emojis].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "z-a") {
      return [...emojis].sort((a, b) => b.name.localeCompare(a.name))
    }
    return emojis
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Emojis</h1>
          <p className="text-muted-foreground">Find and copy the perfect emoji for any occasion</p>
        </div>

        {/* Mobile filter button */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Filter className="h-4 w-4" />
                Filters & Categories
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Categories & Filters</SheetTitle>
                <SheetDescription>Browse by category or apply filters to find emojis</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Sort By</h3>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort order" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.keys(emojiCategories).map((category) => (
                      <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        className="justify-start"
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
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search emojis..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Desktop filters */}
        <div className="hidden md:flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Emoji categories */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop category sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="bg-card rounded-lg border p-4 sticky top-20">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-1">
              {Object.keys(emojiCategories).map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category && !searchTerm ? "default" : "ghost"}
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
          {/* Display emojis */}
          {searchTerm ? (
            <div className="mt-2">
              {Object.keys(filteredEmojis).length > 0 ? (
                Object.entries(filteredEmojis).map(([category, emojis]) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-lg font-medium mb-4">{category}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {sortEmojis(emojis).map((emoji) => (
                        <Card key={emoji.unicode} className="overflow-hidden group hover:shadow-md transition-shadow">
                          <CardContent className="p-0">
                            <div className="flex flex-col items-center justify-center p-4 text-center relative">
                              <div className="text-4xl mb-2">{emoji.emoji}</div>
                              <p className="text-xs text-muted-foreground truncate w-full">{emoji.name}</p>

                              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => handleCopyEmoji(emoji.emoji, emoji.name)}
                                      >
                                        {copiedEmoji === emoji.emoji ? (
                                          <Check className="h-3.5 w-3.5 text-green-500" />
                                        ) : (
                                          <Copy className="h-3.5 w-3.5" />
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
                                        <Button variant="ghost" size="icon" className="h-7 w-7">
                                          <Info className="h-3.5 w-3.5" />
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
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border">
                  <p className="text-muted-foreground">No emojis found for "{searchTerm}"</p>
                  <Button variant="link" onClick={() => setSearchTerm("")} className="mt-2">
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Tabs
              defaultValue={activeCategory}
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="mb-4 hidden">
                {Object.keys(emojiCategories).map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.keys(emojiCategories).map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <h3 className="text-lg font-medium mb-4">{category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {sortEmojis(emojiCategories[category as keyof typeof emojiCategories]).map((emoji) => (
                      <Card key={emoji.unicode} className="overflow-hidden group hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex flex-col items-center justify-center p-4 text-center relative">
                            <div className="text-4xl mb-2">{emoji.emoji}</div>
                            <p className="text-xs text-muted-foreground truncate w-full">{emoji.name}</p>

                            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() => handleCopyEmoji(emoji.emoji, emoji.name)}
                                    >
                                      {copiedEmoji === emoji.emoji ? (
                                        <Check className="h-3.5 w-3.5 text-green-500" />
                                      ) : (
                                        <Copy className="h-3.5 w-3.5" />
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
                                      <Button variant="ghost" size="icon" className="h-7 w-7">
                                        <Info className="h-3.5 w-3.5" />
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}

