// "use client"

// import { useEffect, useState } from "react"
// import JsonLd from "@/components/json-ld"
// import {
//   generateBreadcrumbSchema,
//   generateWordCounterSchema,
//   generateImageMergerSchema,
//   generateToolSchema,
// } from "@/lib/schema"

// interface ToolSchemaProps {
//   toolName: string
//   toolSlug: string
//   description: string
//   category: string
//   features: string[]
//   breadcrumbs: { name: string; item: string }[]
//   customSchema?: Record<string, any>
// }

// export default function ToolSchema({
//   toolName,
//   toolSlug,
//   description,
//   category,
//   features,
//   breadcrumbs,
//   customSchema,
// }: ToolSchemaProps) {
//   const [baseUrl, setBaseUrl] = useState("")

//   useEffect(() => {
//     setBaseUrl(window.location.origin)
//   }, [])

//   if (!baseUrl) return null

//   // Use custom schema if provided, otherwise generate one
//   const toolSchema = customSchema || generateToolSchema(toolName, toolSlug, description, category, features, baseUrl)

//   const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs, baseUrl)

//   return (
//     <>
//       <JsonLd data={toolSchema} />
//       <JsonLd data={breadcrumbSchema} />
//     </>
//   )
// }

// // Pre-configured schemas for existing tools
// export function WordCounterSchema() {
//   const [baseUrl, setBaseUrl] = useState("")

//   useEffect(() => {
//     setBaseUrl(window.location.origin)
//   }, [])

//   if (!baseUrl) return null

//   const schema = generateWordCounterSchema(baseUrl)
//   const breadcrumbs = [
//     { name: "Home", item: "/" },
//     { name: "Tools", item: "/tools" },
//     { name: "Word Counter", item: "/tools/word-counter" },
//   ]

//   const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs, baseUrl)

//   return (
//     <>
//       <JsonLd data={schema} />
//       <JsonLd data={breadcrumbSchema} />
//     </>
//   )
// }

// export function ImageMergerSchema() {
//   const [baseUrl, setBaseUrl] = useState("")

//   useEffect(() => {
//     setBaseUrl(window.location.origin)
//   }, [])

//   if (!baseUrl) return null

//   const schema = generateImageMergerSchema(baseUrl)
//   const breadcrumbs = [
//     { name: "Home", item: "/" },
//     { name: "Tools", item: "/tools" },
//     { name: "Image Merger", item: "/tools/image-merger" },
//   ]

//   const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs, baseUrl)

//   return (
//     <>
//       <JsonLd data={schema} />
//       <JsonLd data={breadcrumbSchema} />
//     </>
//   )
// }



































import JsonLd from "@/components/json-ld"
import {
  generateBreadcrumbSchema,
  generateWordCounterSchema,
  generateImageMergerSchema,
  generateToolSchema,
} from "@/lib/schema"

interface ToolSchemaProps {
  toolName: string
  toolSlug: string
  description: string
  category: string
  features: string[]
  breadcrumbs: { name: string; item: string }[]
  customSchema?: Record<string, any>
}

export default function ToolSchema({
  toolName,
  toolSlug,
  description,
  category,
  features,
  breadcrumbs,
  customSchema,
}: ToolSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"

  // Use custom schema if provided, otherwise generate one
  const toolSchema = customSchema || generateToolSchema(toolName, toolSlug, description, category, features, baseUrl)

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs, baseUrl)

  return (
    <>
      <JsonLd data={toolSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  )
}

// Pre-configured schemas for existing tools
export function WordCounterSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"

  const schema = generateWordCounterSchema(baseUrl)
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Tools", item: "/tools" },
    { name: "Word Counter", item: "/tools/word-counter" },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs, baseUrl)

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  )
}

export function ImageMergerSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojiverse-example.com"

  const schema = generateImageMergerSchema(baseUrl)
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Tools", item: "/tools" },
    { name: "Image Merger", item: "/tools/image-merger" },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs, baseUrl)

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  )
}

