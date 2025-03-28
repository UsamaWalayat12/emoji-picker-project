"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Smile, Users, Cat, Coffee, Plane, Gamepad2, Lightbulb, Heart } from "lucide-react"

const categories = [
  {
    name: "Smileys & Emotion",
    icon: Smile,
    emoji: "😀 😂 🥰 😭",
    color: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
  {
    name: "People & Body",
    icon: Users,
    emoji: "👋 🙌 👨‍👩‍👧 💪",
    color: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    name: "Animals & Nature",
    icon: Cat,
    emoji: "🐶 🐱 🌿 🌷",
    color: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    name: "Food & Drink",
    icon: Coffee,
    emoji: "🍎 🍕 🍰 🍹",
    color: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    name: "Travel & Places",
    icon: Plane,
    emoji: "✈️ 🏖️ 🚗 🏠",
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    name: "Activities",
    icon: Gamepad2,
    emoji: "⚽ 🎮 🎨 🎭",
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    name: "Objects",
    icon: Lightbulb,
    emoji: "💡 📱 💻 🔋",
    color: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    name: "Symbols",
    icon: Heart,
    emoji: "❤️ ⭐ ✅ 🔣",
    color: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
]

export default function PopularCategories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = category.icon

        return (
          <Link key={category.name} href={`/browse?category=${encodeURIComponent(category.name)}`}>
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-full ${category.color}`}>
                      <Icon className={`h-5 w-5 ${category.iconColor}`} />
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                  <p className="text-2xl mt-2">{category.emoji}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

