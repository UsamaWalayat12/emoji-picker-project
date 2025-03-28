"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Initialize theme script
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const theme =
      localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

    // Apply theme class immediately to avoid flash
    document.documentElement.classList.toggle("dark", theme === "dark")

    // Save the current theme
    localStorage.setItem("theme", theme)

    // Initialize the icon
    updateThemeIcon(theme)
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme") || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"

    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)

    updateThemeIcon(newTheme)
  }

  // Update theme icon
  const updateThemeIcon = (theme: string) => {
    const themeIcon = document.getElementById("theme-icon")
    if (themeIcon) {
      if (theme === "light") {
        themeIcon.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
      } else {
        themeIcon.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
      }
    }
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="w-full bg-background border-b sticky top-0 z-50">
            <div className="container mx-auto px-4">
              <div className="flex h-16 items-center justify-between">
                <a href="/" className="flex items-center space-x-2">
                  <span className="font-bold text-xl">EmojiVerse</span>
                </a>
                <div className="flex items-center space-x-4">
                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex items-center space-x-4">
                    <a href="/" className="px-3 py-2 rounded-md hover:bg-muted">
                      Home
                    </a>
                    <a href="/browse" className="px-3 py-2 rounded-md hover:bg-muted">
                      Browse
                    </a>
                    <a href="/collections" className="px-3 py-2 rounded-md hover:bg-muted">
                      Collections
                    </a>
                    <a href="/tools" className="px-3 py-2 rounded-md hover:bg-muted">
                      Tools
                    </a>
                    <a href="/about" className="px-3 py-2 rounded-md hover:bg-muted">
                      About
                    </a>
                  </nav>

                  {/* Theme toggle button */}
                  <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-muted" aria-label="Toggle theme">
                    <span id="theme-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>
                    </span>
                  </button>

                  {/* Mobile menu button */}
                  <button
                    onClick={toggleMobileMenu}
                    className="md:hidden p-2 rounded-md hover:bg-muted"
                    aria-label="Toggle mobile menu"
                  >
                    {mobileMenuOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t">
                  <nav className="flex flex-col space-y-2">
                    <a href="/" className="px-3 py-2 rounded-md hover:bg-muted">
                      Home
                    </a>
                    <a href="/browse" className="px-3 py-2 rounded-md hover:bg-muted">
                      Browse
                    </a>
                    <a href="/collections" className="px-3 py-2 rounded-md hover:bg-muted">
                      Collections
                    </a>
                    <a href="/tools" className="px-3 py-2 rounded-md hover:bg-muted">
                      Tools
                    </a>
                    <a href="/about" className="px-3 py-2 rounded-md hover:bg-muted">
                      About
                    </a>
                    <a href="/faq" className="px-3 py-2 rounded-md hover:bg-muted">
                      FAQ
                    </a>
                    <a href="/emoji-history" className="px-3 py-2 rounded-md hover:bg-muted">
                      Emoji History
                    </a>
                    <a href="/unicode-info" className="px-3 py-2 rounded-md hover:bg-muted">
                      Unicode Info
                    </a>
                  </nav>
                </div>
              )}
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-muted/40">
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="font-bold mb-4">EmojiVerse</h3>
                  <p className="text-sm text-muted-foreground">
                    The ultimate emoji resource with detailed information, collections, and easy copying.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Navigation</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/" className="text-muted-foreground hover:text-foreground">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/browse" className="text-muted-foreground hover:text-foreground">
                        Browse
                      </a>
                    </li>
                    <li>
                      <a href="/collections" className="text-muted-foreground hover:text-foreground">
                        Collections
                      </a>
                    </li>
                    <li>
                      <a href="/tools" className="text-muted-foreground hover:text-foreground">
                        Tools
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/faq" className="text-muted-foreground hover:text-foreground">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="/emoji-history" className="text-muted-foreground hover:text-foreground">
                        Emoji History
                      </a>
                    </li>
                    <li>
                      <a href="/unicode-info" className="text-muted-foreground hover:text-foreground">
                        Unicode Info
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Legal</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/privacy" className="text-muted-foreground hover:text-foreground">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="/terms" className="text-muted-foreground hover:text-foreground">
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t pt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} EmojiVerse. All rights reserved. | Version 8.0.0
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

