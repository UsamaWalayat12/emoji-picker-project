export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 2025</p>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Introduction</h2>
          <p className="mb-4">
            At EmojiVerse, we respect your privacy and are committed to protecting your personal data. This privacy
            policy will inform you about how we look after your personal data when you visit our website and tell you
            about your privacy rights and how the law protects you.
          </p>
          <p>
            This website does not collect any personal information beyond what is necessary for basic functionality. We
            use local storage to save your theme preferences and emoji collections, but this data remains on your device
            and is not transmitted to our servers.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
          <p className="mb-4">
            <strong>Local Storage Data:</strong> We use your browser's local storage to save your theme preferences
            (light/dark mode) and any emoji collections you create. This data is stored entirely on your device and is
            not accessible to us.
          </p>
          <p>
            <strong>Usage Data:</strong> We may collect anonymous usage data such as page views and feature usage to
            help us improve our service. This data is aggregated and cannot be used to identify individual users.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our data practices, please contact us at
            privacy@emojiverse-example.com.
          </p>
        </div>
      </div>
    </div>
  )
}

