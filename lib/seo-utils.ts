// Helper function to create a new tool schema
export function createToolSchema({
  name,
  slug,
  description,
  category,
  features,
}: {
  name: string
  slug: string
  description: string
  category: string
  features: string[]
}) {
  // This is a helper function to make it easy to add new tools in the future
  return {
    toolName: name,
    toolSlug: slug,
    description,
    category,
    features,
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Tools", item: "/tools" },
      { name, item: `/tools/${slug}` },
    ],
  }
}

// Example usage for a new tool:
/*
import { createToolSchema } from "@/lib/seo-utils";
import ToolSchema from "@/components/seo/tool-schema";

// In your new tool page:
<ToolSchema
  {...createToolSchema({
    name: "New Tool Name",
    slug: "new-tool-slug",
    description: "Description of the new tool",
    category: "UtilityApplication",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  })}
/>
*/

