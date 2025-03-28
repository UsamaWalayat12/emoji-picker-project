export default function FAQ() {
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
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">Common questions about emojis and our platform</p>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">About Emojis</h2>
          <p className="text-muted-foreground mb-4">General questions about emojis</p>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">What are emojis?</h3>
              <p className="text-muted-foreground">
                Emojis are small digital images or icons used to express ideas, emotions, or objects in electronic
                communication. The word "emoji" comes from Japanese, combining "e" (picture) and "moji" (character).
                Unlike emoticons, which are created using keyboard symbols, emojis are actual pictures.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">How many emojis are there?</h3>
              <p className="text-muted-foreground">
                As of Unicode 15.0 (released in 2022), there are over 3,600 emojis in the Unicode Standard. This number
                continues to grow as new emojis are added with each Unicode update.
              </p>
            </div>

            <div className="pb-4">
              <h3 className="font-medium mb-2">Why do emojis look different on different devices?</h3>
              <p className="text-muted-foreground">
                While Unicode defines the code points for emojis, it doesn't specify how they should visually appear.
                Each platform (like Apple, Google, Microsoft, Samsung) creates its own emoji designs based on the
                Unicode descriptions. This is why the same emoji can look different depending on the device or platform
                you're using.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Using EmojiVerse</h2>
          <p className="text-muted-foreground mb-4">Questions about our platform features</p>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">How do I copy an emoji?</h3>
              <p className="text-muted-foreground">
                To copy an emoji on EmojiVerse, simply click on the copy icon (or the emoji itself in some views) and it
                will be copied to your clipboard. You can then paste it anywhere you want using Ctrl+V (Windows/Linux)
                or Cmd+V (Mac).
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">What are collections?</h3>
              <p className="text-muted-foreground">
                Collections are personalized groups of emojis that you can create and save for quick access. They're
                useful for organizing emojis you use frequently or for specific purposes. You can create collections
                like "Favorites," "Reactions," or "Work Appropriate" to suit your needs.
              </p>
            </div>

            <div className="pb-4">
              <h3 className="font-medium mb-2">Are my collections saved if I close the browser?</h3>
              <p className="text-muted-foreground">
                Yes, your collections are saved in your browser's local storage, so they will persist even if you close
                the browser or restart your device. However, they are specific to the browser and device you're using.
                If you clear your browser data or use a different device, your collections won't be available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

