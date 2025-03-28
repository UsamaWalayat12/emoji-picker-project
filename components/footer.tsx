import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EmojiVerse. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <nav className="flex space-x-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/browse" className="text-sm text-muted-foreground hover:text-foreground">
                Browse
              </Link>
              <Link href="/collections" className="text-sm text-muted-foreground hover:text-foreground">
                Collections
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

