export default function UnicodeInfo() {
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
        <h1 className="text-3xl font-bold mb-2">Unicode and Emoji</h1>
        <p className="text-muted-foreground mb-8">Understanding how emojis work in the Unicode standard</p>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">What is Unicode?</h2>
          <p className="text-muted-foreground mb-4">The foundation of digital text representation</p>
          <p className="mb-4">
            Unicode is an international encoding standard that allows computers to consistently represent and manipulate
            text from any writing system in the world. Before Unicode, there were hundreds of different encoding systems
            for assigning numeric values to characters, which led to conflicts and inconsistencies when data was
            transferred between different computers or languages.
          </p>
          <p className="mb-4">
            Unicode solves this problem by assigning a unique numeric value (code point) to each character, regardless
            of platform, program, or language. This ensures that text data can be transferred between systems without
            corruption.
          </p>
          <p>
            The Unicode standard is maintained by the Unicode Consortium, a non-profit organization that includes
            members from major technology companies like Apple, Google, Microsoft, and Adobe.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Emojis in Unicode</h2>
          <p className="text-muted-foreground mb-4">How emojis became part of the standard</p>
          <p className="mb-4">
            Emojis were first incorporated into Unicode in version 6.0, released in October 2010. This inclusion was a
            significant step in making emojis universally available across different platforms and devices.
          </p>
          <p className="mb-4">
            In Unicode, each emoji is assigned a specific code point or a sequence of code points. For example, the
            "Grinning Face" emoji (😀) is represented by the code point U+1F600.
          </p>
          <p>
            Since their initial inclusion, the number of emojis in Unicode has grown substantially with each new
            version. The Unicode Consortium regularly reviews and approves new emoji proposals, ensuring that the
            standard evolves to meet changing communication needs.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Unicode Versions and Emoji Additions</h2>
          <p className="text-muted-foreground mb-4">Key milestones in emoji standardization</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Unicode Version</th>
                  <th className="text-left p-2">Release Year</th>
                  <th className="text-left p-2">Emoji Additions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Unicode 6.0</td>
                  <td className="p-2">2010</td>
                  <td className="p-2">Initial set of 722 emojis</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Unicode 6.1</td>
                  <td className="p-2">2012</td>
                  <td className="p-2">Minor emoji additions</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Unicode 7.0</td>
                  <td className="p-2">2014</td>
                  <td className="p-2">250+ new emojis including transportation and weather symbols</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

