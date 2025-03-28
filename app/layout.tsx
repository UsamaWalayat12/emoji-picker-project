import type React from "react"
import type { Metadata } from "next/types"
import ClientLayout from "./ClientLayout"
import { defaultMetadata } from "@/components/seo/default-meta"
import SiteSchema from "@/components/seo/site-schema"

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientLayout>
      <SiteSchema />
      {children}
    </ClientLayout>
  )
}



import './globals.css'