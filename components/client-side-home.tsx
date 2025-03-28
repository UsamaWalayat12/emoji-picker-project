"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Smile, Search, Copy, Heart, ArrowRight, Clock, Zap } from "lucide-react"
import FeaturedEmojis from "@/components/featured-emojis"
import RecentlyUsed from "@/components/recently-used"
import PopularCategories from "@/components/popular-categories"

export default function ClientSideHome() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <>
        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Emojis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Powerful Search</h3>
                <p className="text-muted-foreground">
                  Find any emoji instantly with our smart search that understands descriptions, emotions, and keywords.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Copy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">One-Click Copy</h3>
                <p className="text-muted-foreground">
                  Copy any emoji with a single click and use it anywhere - social media, documents, or messages.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Collections</h3>
                <p className="text-muted-foreground">
                  Create and save your favorite emoji collections for quick access to your most-used emojis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loading placeholders for client-side content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Emojis</h2>
              <div className="h-10 w-24 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Emojis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Powerful Search</h3>
              <p className="text-muted-foreground">
                Find any emoji instantly with our smart search that understands descriptions, emotions, and keywords.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Copy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">One-Click Copy</h3>
              <p className="text-muted-foreground">
                Copy any emoji with a single click and use it anywhere - social media, documents, or messages.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Collections</h3>
              <p className="text-muted-foreground">
                Create and save your favorite emoji collections for quick access to your most-used emojis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Emojis */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Emojis</h2>
            <Link href="/browse">
              <Button variant="ghost" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <FeaturedEmojis />
        </div>
      </section>

      {/* Recently Used */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recently Used
            </h2>
          </div>
          <RecentlyUsed />
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Popular Categories
            </h2>
            <Link href="/browse">
              <Button variant="ghost" className="gap-1">
                All Categories <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <PopularCategories />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore the emoji universe?</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Dive into thousands of emojis, discover their meanings, and find the perfect ones for your messages.
          </p>
          <Link href="/browse">
            <Button size="lg" className="gap-2">
              <Smile className="h-4 w-4" />
              Start Exploring
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}

