"use client"

import { useEffect } from "react"

export default function ThemeScript() {
  useEffect(() => {
    // On page load, check if there's a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme")

    // If there's a saved preference, apply it
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      // If no preference is saved, check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    }
  }, [])

  return null
}

