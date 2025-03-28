"use client"

import { useState, useEffect } from "react"

type Emoji = {
  emoji: string
  name: string
  unicode: string
}

export default function MultiEmojiSelector({ emojis }: { emojis: Emoji[] }) {
  const [selectedEmojis, setSelectedEmojis] = useState<Emoji[]>([])
  const [copied, setCopied] = useState(false)
  const [collections, setCollections] = useState<any[]>([])
  const [selectedCollection, setSelectedCollection] = useState("")
  const [showCollectionModal, setShowCollectionModal] = useState(false)
  const [addedToCollection, setAddedToCollection] = useState(false)

  // Load collections from localStorage
  useEffect(() => {
    try {
      const storedCollections = localStorage.getItem("emojiCollections")
      if (storedCollections) {
        setCollections(JSON.parse(storedCollections))
      } else {
        // Sample collections if none exist
        const sampleCollections = [
          {
            id: "favorites",
            name: "Favorites",
            description: "My most used emojis",
            emojis: [],
            createdAt: Date.now() - 1000000,
          },
          {
            id: "reactions",
            name: "Reactions",
            description: "Emojis for reacting to messages",
            emojis: [],
            createdAt: Date.now() - 2000000,
          },
        ]
        setCollections(sampleCollections)
        localStorage.setItem("emojiCollections", JSON.stringify(sampleCollections))
      }
    } catch (error) {
      console.error("Error loading collections:", error)
    }
  }, [])

  // Toggle emoji selection
  const toggleEmojiSelection = (emoji: Emoji) => {
    if (selectedEmojis.some((e) => e.emoji === emoji.emoji)) {
      setSelectedEmojis(selectedEmojis.filter((e) => e.emoji !== emoji.emoji))
    } else {
      setSelectedEmojis([...selectedEmojis, emoji])
    }
  }

  // Copy selected emojis
  const copySelectedEmojis = () => {
    const emojiString = selectedEmojis.map((e) => e.emoji).join("")
    navigator.clipboard.writeText(emojiString)
    setCopied(true)

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  // Clear selection
  const clearSelection = () => {
    setSelectedEmojis([])
  }

  // Add to collection
  const addToCollection = () => {
    if (!selectedCollection || selectedEmojis.length === 0) return

    try {
      const updatedCollections = collections.map((collection) => {
        if (collection.id === selectedCollection) {
          // Get existing emoji strings in this collection
          const existingEmojiStrings = collection.emojis.map((e: any) => e.emoji)

          // Filter out emojis that are already in the collection
          const newEmojis = selectedEmojis.filter((emoji) => !existingEmojiStrings.includes(emoji.emoji))

          return {
            ...collection,
            emojis: [
              ...collection.emojis,
              ...newEmojis.map((emoji) => ({
                emoji: emoji.emoji,
                name: emoji.name,
              })),
            ],
          }
        }
        return collection
      })

      setCollections(updatedCollections)
      localStorage.setItem("emojiCollections", JSON.stringify(updatedCollections))

      setAddedToCollection(true)
      setTimeout(() => {
        setAddedToCollection(false)
        setShowCollectionModal(false)
      }, 2000)
    } catch (error) {
      console.error("Error adding to collection:", error)
    }
  }

  return (
    <div className="mb-6">
      {/* Selection controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h3 className="font-medium text-lg">Multi-Select Mode</h3>
          <p className="text-sm text-muted-foreground">Select multiple emojis to copy or add to collections</p>
        </div>
        <div className="flex gap-2">
          {selectedEmojis.length > 0 && (
            <>
              <button
                onClick={copySelectedEmojis}
                className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
              >
                {copied ? "Copied!" : `Copy ${selectedEmojis.length} Emoji${selectedEmojis.length > 1 ? "s" : ""}`}
              </button>
              <button
                onClick={() => setShowCollectionModal(true)}
                className="px-3 py-1.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm"
              >
                Add to Collection
              </button>
              <button
                onClick={clearSelection}
                className="px-3 py-1.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm"
              >
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Selected emojis display */}
      {selectedEmojis.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-3 mb-4 overflow-x-auto">
          <div className="flex gap-2 flex-wrap">
            {selectedEmojis.map((emoji, index) => (
              <div key={index} className="bg-background rounded-md px-2 py-1 border flex items-center gap-2">
                <span className="text-xl">{emoji.emoji}</span>
                <button
                  onClick={() => toggleEmojiSelection(emoji)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emoji grid with selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {emojis.map((emoji, index) => (
          <div
            key={index}
            className={`bg-card rounded-lg border p-4 flex flex-col items-center text-center cursor-pointer transition-colors ${
              selectedEmojis.some((e) => e.emoji === emoji.emoji)
                ? "ring-2 ring-primary border-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
            onClick={() => toggleEmojiSelection(emoji)}
          >
            <div className="text-4xl mb-2">{emoji.emoji}</div>
            <p className="text-xs text-muted-foreground truncate w-full">{emoji.name}</p>
          </div>
        ))}
      </div>

      {/* Collection selection modal */}
      {showCollectionModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Add to Collection</h3>

            {addedToCollection ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-muted-foreground">
                  Added {selectedEmojis.length} emoji{selectedEmojis.length > 1 ? "s" : ""} to collection!
                </p>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">
                  Select a collection to add {selectedEmojis.length} emoji{selectedEmojis.length > 1 ? "s" : ""}
                </p>

                {collections.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {collections.map((collection) => (
                      <div
                        key={collection.id}
                        className={`border rounded-md p-3 cursor-pointer ${
                          selectedCollection === collection.id
                            ? "ring-2 ring-primary border-primary"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedCollection(collection.id)}
                      >
                        <h4 className="font-medium">{collection.name}</h4>
                        <p className="text-sm text-muted-foreground">{collection.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 mb-4">
                    <p className="text-muted-foreground">No collections found. Create one first.</p>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowCollectionModal(false)}
                    className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addToCollection}
                    className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!selectedCollection || collections.length === 0}
                  >
                    Add to Collection
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

