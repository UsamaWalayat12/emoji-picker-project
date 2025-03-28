export default function EmojiHistory() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <a
          href="/about"
          className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-block"
        >
          Back to About
        </a>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">The History of Emojis</h1>
        <p className="text-muted-foreground mb-8">From simple emoticons to the colorful symbols we use today</p>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">The Evolution of Digital Expression</h2>
          <p className="text-muted-foreground mb-4">How emojis became a universal language</p>
          <p className="mb-4">
            Emojis have become an integral part of our digital communication, allowing us to express emotions, convey
            tone, and add nuance to our text-based conversations. But the journey from simple text-based emoticons to
            the colorful, detailed emojis we use today spans several decades and involves cultural exchange,
            technological advancement, and standardization efforts.
          </p>
          <p>
            Below is a timeline of key events in emoji history, from the earliest emoticons to the modern
            Unicode-standardized emoji sets that are available across platforms worldwide.
          </p>
        </div>

        <div className="mb-8 space-y-8">
          {/* Timeline items using simple divs */}
          <div className="relative pl-8 border-l-2 border-border">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
            <h3 className="text-lg font-semibold mb-2">1982: The First Emoticon</h3>
            <p className="text-muted-foreground">
              Computer scientist Scott Fahlman proposed using :-) and :-( to distinguish jokes from serious statements
              in online message boards at Carnegie Mellon University. This is widely considered the birth of the
              emoticon.
            </p>
          </div>

          <div className="relative pl-8 border-l-2 border-border">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
            <h3 className="text-lg font-semibold mb-2">1990s: Emoticons Spread Globally</h3>
            <p className="text-muted-foreground">
              As the internet became more accessible, emoticons spread globally and evolved to include more complex
              expressions. In Japan, kaomoji (face characters) like (^_^) and (T_T) became popular, offering a wider
              range of emotions than Western emoticons.
            </p>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
            <h3 className="text-lg font-semibold mb-2">Present Day: Thousands of Emojis</h3>
            <p className="text-muted-foreground">
              Today, the Unicode Standard includes over 3,600 emojis, covering a vast range of expressions, objects,
              activities, and concepts. New emojis are added regularly through a proposal and review process managed by
              the Unicode Consortium.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

