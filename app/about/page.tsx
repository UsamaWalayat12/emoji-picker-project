export default function About() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">About EmojiVerse</h1>
        <p className="text-muted-foreground mb-8">
          The ultimate emoji explorer with comprehensive information and easy copying
        </p>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Our Mission</h2>
          <p className="text-muted-foreground mb-4">Making emojis accessible and easy to use for everyone</p>
          <p className="mb-4">
            EmojiVerse was created to solve a simple problem: finding and using the perfect emoji shouldn't be
            difficult. Whether you're a casual emoji user or someone who expresses themselves primarily through these
            digital icons, our platform provides a seamless experience for discovering, learning about, and using
            emojis.
          </p>
          <p>
            We believe that emojis are a universal language that transcends barriers, and our goal is to make this
            language as accessible as possible. With detailed information, intuitive organization, and helpful features,
            EmojiVerse is designed to be your go-to resource for all things emoji.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Features</h2>
          <p className="text-muted-foreground mb-4">What makes EmojiVerse special</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Comprehensive Library</h3>
              <p className="text-sm text-muted-foreground">
                Access thousands of emojis across multiple categories, all in one place.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Custom Collections</h3>
              <p className="text-sm text-muted-foreground">
                Create and save your favorite emoji collections for quick access.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Detailed Information</h3>
              <p className="text-sm text-muted-foreground">
                Learn about each emoji's meaning, Unicode details, and proper usage.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-medium">One-Click Copy</h3>
              <p className="text-sm text-muted-foreground">
                Copy any emoji with a single click and use it anywhere you want.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Emoji History</h2>
          <p className="text-muted-foreground mb-4">The evolution of digital expression</p>
          <p className="mb-4">
            Emojis originated in Japan in the late 1990s, with the word "emoji" combining the Japanese words for
            "picture" (e) and "character" (moji). The first set of 176 emojis was created by Shigetaka Kurita for NTT
            DoCoMo's mobile internet platform.
          </p>
          <p className="mb-4">
            In 2010, emojis were incorporated into Unicode, the computing industry standard for encoding and text
            representation, which allowed them to be used across different platforms and devices. This standardization
            led to the global explosion of emoji usage.
          </p>
          <p className="mb-4">
            Today, the Unicode Standard includes over 3,600 emojis, covering everything from facial expressions and hand
            gestures to food, animals, activities, and symbols. New emojis are added regularly, reflecting our evolving
            digital communication needs.
          </p>
          <div className="mt-4">
            <a
              href="/emoji-history"
              className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-block"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

