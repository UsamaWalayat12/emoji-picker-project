// "use client"

// import { useEffect, useState } from "react"

// interface JsonLdProps {
//   data: Record<string, any> | Record<string, any>[]
// }

// // Component to render JSON-LD structured data
// export default function JsonLd({ data }: JsonLdProps) {
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) return null

//   // Convert the data to a JSON string
//   const jsonLdString = JSON.stringify(data)

//   return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
// }













// Change the component to be server-side rendered instead of client-side
// This avoids React hook issues since JSON-LD doesn't need client interactivity

export default function JsonLd({ data }: { data: Record<string, any> | Record<string, any>[] }) {
  // Convert the data to a JSON string
  const jsonLdString = JSON.stringify(data)

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
}

