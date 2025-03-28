"use client"

import { useState, useEffect } from "react"

type Collection = {
  id: string
  name: string
  description: string
  emojis: Array<{
    emoji: string
    name: string
  }>
  createdAt: number
}

export default function CollectionManager() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [activeCollection, setActiveCollection] = useState<string | null>(null)
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null)

  // Load collections from localStorage
  useEffect(() => {
    try {
      const storedCollections = localStorage.getItem("emojiCollections")
      if (storedCollections) {
        const parsedCollections = JSON.parse(storedCollections)
        setCollections(parsedCollections)
        if (parsedCollections.length > 0 && !activeCollection) {
          setActiveCollection(parsedCollections[0].id)
        }
      } else {
        // Sample collections if none exist
        const sampleCollections = [
          {
            id: "favorites",
            name: "Favorites",
            description: "My most used emojis",
            emojis: [
              { emoji: "❤️", name: "Red Heart" },
              { emoji: "👍", name: "Thumbs Up" },
              { emoji: "😊", name: "Smiling Face with Smiling Eyes" },
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
            ],
            createdAt: Date.now() - 2000000,
          },
        ]
        setCollections(sampleCollections)
        setActiveCollection(sampleCollections[0].id)
        localStorage.setItem("emojiCollections", JSON.stringify(sampleCollections))
      }
    } catch (error) {
      console.error("Error loading collections:", error)
    }
  }, [activeCollection])

  // Create a new collection
  const createNewCollection = () => {
    if (!newCollectionName.trim()) return

    const newCollection: Collection = {
      id: `collection-${Date.now()}`,
      name: newCollectionName,
      description: newCollectionDescription,
      emojis: [],
      createdAt: Date.now(),
    }

    const updatedCollections = [...collections, newCollection]
    setCollections(updatedCollections)
    localStorage.setItem("emojiCollections", JSON.stringify(updatedCollections))

    setActiveCollection(newCollection.id)
    setNewCollectionName("")
    setNewCollectionDescription("")
    setShowNewCollectionModal(false)
  }

  // Delete a collection
  const deleteCollection = (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return

    const updatedCollections = collections.filter((collection) => collection.id !== id)
    setCollections(updatedCollections)
    localStorage.setItem("emojiCollections", JSON.stringify(updatedCollections))

    if (activeCollection === id) {
      setActiveCollection(updatedCollections.length > 0 ? updatedCollections[0].id : null)
    }
  }

  // Remove emoji from collection
  const removeEmoji = (collectionId: string, emoji: string) => {
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
  }

  // Copy emoji to clipboard
  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji)
    setCopiedEmoji(emoji)

    setTimeout(() => {
      setCopiedEmoji(null)
    }, 2000)
  }

  // Copy all emojis in a collection
  const copyAllEmojis = (collectionId: string) => {
    const collection = collections.find((c) => c.id === collectionId)
    if (!collection) return

    const emojiString = collection.emojis.map((e) => e.emoji).join("")
    navigator.clipboard.writeText(emojiString)

    // Visual feedback
    const copyButton = document.getElementById(`copy-all-${collectionId}`)
    if (copyButton) {
      const originalText = copyButton.innerText
      copyButton.innerText = "Copied!"
      setTimeout(() => {
        copyButton.innerText = originalText
      }, 2000)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Collections</h1>
          <p className="text-muted-foreground">Create and manage your emoji collections</p>
        </div>
        <button
          onClick={() => setShowNewCollectionModal(true)}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          New Collection
        </button>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl border">
          <div className="text-6xl mb-4">📁</div>
          <h2 className="text-xl font-medium mb-2">No Collections Yet</h2>
          <p className="text-muted-foreground mb-6">
            Create your first collection to start organizing your favorite emojis
          </p>
          <button
            onClick={() => setShowNewCollectionModal(true)}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create Collection
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Collection tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto pb-2 gap-2">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  className={`px-4 py-2 rounded-md whitespace-nowrap ${
                    activeCollection === collection.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                  onClick={() => setActiveCollection(collection.id)}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active collection */}
          {activeCollection && (
            <div className="bg-card border rounded-lg overflow-hidden">
              {collections.map(
                (collection) =>
                  collection.id === activeCollection && (
                    <div key={collection.id}>
                      <div className="p-4 border-b flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold">{collection.name}</h2>
                          <p className="text-sm text-muted-foreground">{collection.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            id={`copy-all-${collection.id}`}
                            onClick={() => copyAllEmojis(collection.id)}
                            className="px-3 py-1.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm"
                            disabled={collection.emojis.length === 0}
                          >
                            Copy All
                          </button>
                          <button
                            onClick={() => deleteCollection(collection.id)}
                            className="px-3 py-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="p-4">
                        {collection.emojis.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">
                              This collection is empty. Add emojis from the browser.
                            </p>
                            <a
                              href="/browse"
                              className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-block"
                            >
                              Browse Emojis
                            </a>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                            {collection.emojis.map((emoji, index) => (
                              <div
                                key={index}
                                className="bg-muted/30 rounded-lg p-3 flex flex-col items-center text-center relative group"
                              >
                                <div className="text-3xl mb-1">{emoji.emoji}</div>
                                <p className="text-xs text-muted-foreground truncate w-full">{emoji.name}</p>

                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                  <button
                                    onClick={() => copyEmoji(emoji.emoji)}
                                    className="p-1 rounded-md bg-background/80 hover:bg-background text-muted-foreground hover:text-foreground"
                                    title="Copy emoji"
                                  >
                                    {copiedEmoji === emoji.emoji ? (
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
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    ) : (
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
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                      </svg>
                                    )}
                                  </button>
                                  <button
                                    onClick={() => removeEmoji(collection.id, emoji.emoji)}
                                    className="p-1 rounded-md bg-background/80 hover:bg-background text-muted-foreground hover:text-destructive"
                                    title="Remove from collection"
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
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="p-4 bg-muted/20 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {collection.emojis.length} {collection.emojis.length === 1 ? "emoji" : "emojis"}
                        </span>
                        <a href="/browse" className="text-sm text-primary hover:underline">
                          Add Emojis
                        </a>
                      </div>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      )}

      {/* New Collection Modal */}
      {showNewCollectionModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Create New Collection</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="collection-name" className="block text-sm font-medium mb-1">
                  Collection Name
                </label>
                <input
                  id="collection-name"
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="My Collection"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="collection-description" className="block text-sm font-medium mb-1">
                  Description (Optional)
                </label>
                <input
                  id="collection-description"
                  type="text"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                  placeholder="A collection of my favorite emojis"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewCollectionModal(false)}
                className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              >
                Cancel
              </button>
              <button
                onClick={createNewCollection}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!newCollectionName.trim()}
              >
                Create Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

