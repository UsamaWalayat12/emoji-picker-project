import Link from "next/link"
import { Smile } from "lucide-react"

export default function Header() {
  return (
    <header className="w-full bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Smile className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">EmojiVerse</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-muted">
              Home
            </Link>
            <Link href="/browse" className="px-3 py-2 rounded-md hover:bg-muted">
              Browse
            </Link>
            <Link href="/collections" className="px-3 py-2 rounded-md hover:bg-muted">
              Collections
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md hover:bg-muted">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

