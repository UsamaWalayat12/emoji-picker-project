// Schema utility functions for generating JSON-LD structured data

type WebsiteSchema = {
  name: string
  description: string
  url: string
  logo?: string
  sameAs?: string[]
  keywords?: string[]
}

type WebApplicationSchema = {
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  offers?: {
    price: string
    priceCurrency: string
  }
  screenshot?: string
  featureList?: string[]
}

type BreadcrumbItem = {
  name: string
  item: string
}

export function generateWebsiteSchema(data: WebsiteSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.sameAs && { sameAs: data.sameAs }),
    ...(data.keywords && { keywords: data.keywords.join(", ") }),
    potentialAction: {
      "@type": "SearchAction",
      target: `${data.url}/browse?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateWebApplicationSchema(data: WebApplicationSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: data.name,
    description: data.description,
    applicationCategory: data.applicationCategory,
    operatingSystem: data.operatingSystem,
    url: data.url,
    ...(data.offers && {
      offers: {
        "@type": "Offer",
        price: data.offers.price,
        priceCurrency: data.offers.priceCurrency,
      },
    }),
    ...(data.screenshot && { screenshot: data.screenshot }),
    ...(data.featureList && { featureList: data.featureList }),
  }
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.item}`,
    })),
  }
}

export function generateOrganizationSchema(data: {
  name: string
  url: string
  logo?: string
  sameAs?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.sameAs && { sameAs: data.sameAs }),
  }
}

// Tool-specific schemas
export function generateWordCounterSchema(baseUrl: string) {
  return generateWebApplicationSchema({
    name: "Word Counter Tool",
    description: "Count words, characters, and analyze text with this simple tool",
    url: `${baseUrl}/tools/word-counter`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      price: "0",
      priceCurrency: "USD",
    },
    featureList: ["Word counting", "Character counting", "Reading time estimation", "Sentence and paragraph analysis"],
  })
}

export function generateImageMergerSchema(baseUrl: string) {
  return generateWebApplicationSchema({
    name: "Image Merger Tool",
    description: "Combine multiple images with customizable layouts and options",
    url: `${baseUrl}/tools/image-merger`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Merge multiple images",
      "Customizable layouts (horizontal, vertical, grid)",
      "Border and spacing options",
      "Watermark functionality",
    ],
  })
}

// Helper function to generate schema for any tool
export function generateToolSchema(
  toolName: string,
  toolSlug: string,
  description: string,
  category: string,
  features: string[],
  baseUrl: string,
) {
  return generateWebApplicationSchema({
    name: toolName,
    description: description,
    url: `${baseUrl}/tools/${toolSlug}`,
    applicationCategory: category,
    operatingSystem: "Web",
    offers: {
      price: "0",
      priceCurrency: "USD",
    },
    featureList: features,
  })
}

