"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Download, Upload } from "lucide-react"

type UploadedImage = {
  id: string
  file: File
  url: string
}

type LayoutType = "horizontal" | "vertical" | "grid"
type BorderType = "none" | "solid" | "dashed" | "dotted"
type WatermarkPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"

export default function ImageMergerTool() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [layout, setLayout] = useState<LayoutType>("horizontal")
  const [spacing, setSpacing] = useState(10)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")

  // Border options
  const [borderWidth, setBorderWidth] = useState(0)
  const [borderType, setBorderType] = useState<BorderType>("none")
  const [borderColor, setBorderColor] = useState("#000000")

  // Watermark options
  const [watermarkText, setWatermarkText] = useState("")
  const [watermarkFontSize, setWatermarkFontSize] = useState(24)
  const [watermarkColor, setWatermarkColor] = useState("#000000")
  const [watermarkPosition, setWatermarkPosition] = useState<WatermarkPosition>("bottom-right")
  const [watermarkOpacity, setWatermarkOpacity] = useState(50)

  const [mergedImageUrl, setMergedImageUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const newFiles = Array.from(e.target.files)
    const validFiles = newFiles.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp" ||
        file.type === "image/gif",
    )

    if (validFiles.length === 0) return

    const newImages = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      url: URL.createObjectURL(file),
    }))

    setImages((prev) => [...prev, ...newImages])

    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return

    const newFiles = Array.from(e.dataTransfer.files)
    const validFiles = newFiles.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp" ||
        file.type === "image/gif",
    )

    if (validFiles.length === 0) return

    const newImages = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      url: URL.createObjectURL(file),
    }))

    setImages((prev) => [...prev, ...newImages])
  }

  // Remove an image
  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id)
      return filtered
    })
  }

  // Clear all images
  const clearAllImages = () => {
    // Revoke all object URLs to prevent memory leaks
    images.forEach((img) => URL.revokeObjectURL(img.url))
    setImages([])
    setMergedImageUrl(null)
  }

  // Modify the mergeImages function to automatically download after merging
  const mergeImages = async () => {
    if (images.length === 0 || !canvasRef.current) return

    setIsProcessing(true)

    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      // Load all images first
      const loadedImages = await Promise.all(
        images.map((img) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = document.createElement("img");  // ✅ Fixed
            image.crossOrigin = "anonymous"
            image.onload = () => resolve(image)
            image.onerror = reject
            image.src = img.url
          })
        }),
      )

      // Calculate dimensions based on layout
      let canvasWidth = 0
      let canvasHeight = 0

      if (layout === "horizontal") {
        // Sum of all widths + spacing
        canvasWidth = loadedImages.reduce(
          (sum, img, i) => sum + img.width + (i < loadedImages.length - 1 ? spacing : 0),
          0,
        )
        // Max height
        canvasHeight = Math.max(...loadedImages.map((img) => img.height))
      } else if (layout === "vertical") {
        // Max width
        canvasWidth = Math.max(...loadedImages.map((img) => img.width))
        // Sum of all heights + spacing
        canvasHeight = loadedImages.reduce(
          (sum, img, i) => sum + img.height + (i < loadedImages.length - 1 ? spacing : 0),
          0,
        )
      } else if (layout === "grid") {
        // Calculate grid dimensions (try to make it as square as possible)
        const cols = Math.ceil(Math.sqrt(loadedImages.length))
        const rows = Math.ceil(loadedImages.length / cols)

        // Calculate max width and height in each column and row
        const colWidths = Array(cols).fill(0)
        const rowHeights = Array(rows).fill(0)

        loadedImages.forEach((img, i) => {
          const col = i % cols
          const row = Math.floor(i / cols)
          colWidths[col] = Math.max(colWidths[col], img.width)
          rowHeights[row] = Math.max(rowHeights[row], img.height)
        })

        // Calculate total width and height
        canvasWidth = colWidths.reduce((sum, width, i) => sum + width + (i < colWidths.length - 1 ? spacing : 0), 0)
        canvasHeight = rowHeights.reduce(
          (sum, height, i) => sum + height + (i < rowHeights.length - 1 ? spacing : 0),
          0,
        )
      }

      // Add border width to canvas dimensions if needed
      if (borderWidth > 0 && borderType !== "none") {
        canvasWidth += borderWidth * 2
        canvasHeight += borderWidth * 2
      }

      // Set canvas dimensions
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      // Fill background
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw border if needed
      if (borderWidth > 0 && borderType !== "none") {
        ctx.strokeStyle = borderColor
        ctx.lineWidth = borderWidth

        if (borderType === "dashed") {
          ctx.setLineDash([borderWidth * 2, borderWidth])
        } else if (borderType === "dotted") {
          ctx.setLineDash([borderWidth, borderWidth])
        } else {
          ctx.setLineDash([])
        }

        ctx.strokeRect(borderWidth / 2, borderWidth / 2, canvasWidth - borderWidth, canvasHeight - borderWidth)
      }

      // Calculate offset for border
      const offsetX = borderWidth > 0 ? borderWidth : 0
      const offsetY = borderWidth > 0 ? borderWidth : 0

      // Draw images based on layout
      let x = offsetX
      let y = offsetY

      if (layout === "horizontal") {
        loadedImages.forEach((img, i) => {
          ctx.drawImage(img, x, offsetY, img.width, img.height)
          x += img.width + spacing
        })
      } else if (layout === "vertical") {
        loadedImages.forEach((img, i) => {
          ctx.drawImage(img, offsetX, y, img.width, img.height)
          y += img.height + spacing
        })
      } else if (layout === "grid") {
        const cols = Math.ceil(Math.sqrt(loadedImages.length))

        loadedImages.forEach((img, i) => {
          const col = i % cols
          const row = Math.floor(i / cols)

          // Calculate x position (sum of previous column widths + spacing)
          x = offsetX
          for (let c = 0; c < col; c++) {
            x += Math.max(...loadedImages.filter((_, idx) => idx % cols === c).map((img) => img.width)) + spacing
          }

          // Calculate y position (sum of previous row heights + spacing)
          y = offsetY
          for (let r = 0; r < row; r++) {
            y +=
              Math.max(...loadedImages.filter((_, idx) => Math.floor(idx / cols) === r).map((img) => img.height)) +
              spacing
          }

          ctx.drawImage(img, x, y, img.width, img.height)
        })
      }

      // Add watermark if text is provided
      if (watermarkText.trim()) {
        ctx.font = `${watermarkFontSize}px Arial`
        ctx.fillStyle = watermarkColor
        ctx.globalAlpha = watermarkOpacity / 100

        const textWidth = ctx.measureText(watermarkText).width
        const textHeight = watermarkFontSize

        let watermarkX = 0
        let watermarkY = 0

        // Position watermark based on selected position
        switch (watermarkPosition) {
          case "top-left":
            watermarkX = 10 + offsetX
            watermarkY = textHeight + 10 + offsetY
            break
          case "top-right":
            watermarkX = canvasWidth - textWidth - 10 - offsetX
            watermarkY = textHeight + 10 + offsetY
            break
          case "bottom-left":
            watermarkX = 10 + offsetX
            watermarkY = canvasHeight - 10 - offsetY
            break
          case "bottom-right":
            watermarkX = canvasWidth - textWidth - 10 - offsetX
            watermarkY = canvasHeight - 10 - offsetY
            break
          case "center":
            watermarkX = (canvasWidth - textWidth) / 2
            watermarkY = (canvasHeight + textHeight) / 2
            break
        }

        ctx.fillText(watermarkText, watermarkX, watermarkY)
        ctx.globalAlpha = 1.0
      }

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/png")
      setMergedImageUrl(dataUrl)

      // Automatically download the merged image
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = `merged-image-${new Date().getTime()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error merging images:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Fix the downloadMergedImage function to ensure it works properly
  const downloadMergedImage = () => {
    if (!mergedImageUrl) return

    try {
      const link = document.createElement("a")
      link.href = mergedImageUrl
      link.download = `merged-image-${new Date().getTime()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading image:", error)

      // Fallback method if the first approach fails
      const newTab = window.open()
      if (newTab) {
        newTab.document.write(`<img src="${mergedImageUrl}" alt="Merged Image" style="max-width: 100%;">`)
        newTab.document.title = "Download Merged Image"
        newTab.document.close()
      }
    }
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url))
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
        {/* Image upload area */}
        <Card className="border-dashed">
          <CardContent className="p-6">
            <div
              className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                className="hidden"
              />

              <div className="p-4">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Drag & drop images here, or click to select files</p>
                <p className="text-xs text-muted-foreground">Supported formats: JPG, JPEG, PNG, WebP</p>
              </div>

              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                Select Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Options panel */}
        <div className="space-y-4">
          <Accordion type="single" collapsible defaultValue="layout" className="w-full">
            <AccordionItem value="layout">
              <AccordionTrigger className="py-3 px-4 bg-muted/30 rounded-md">Layout Options</AccordionTrigger>
              <AccordionContent className="pt-4 px-1">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={layout === "horizontal" ? "default" : "outline"}
                      onClick={() => setLayout("horizontal")}
                      className="w-full"
                    >
                      Horizontal
                    </Button>
                    <Button
                      variant={layout === "vertical" ? "default" : "outline"}
                      onClick={() => setLayout("vertical")}
                      className="w-full"
                    >
                      Vertical
                    </Button>
                    <Button
                      variant={layout === "grid" ? "default" : "outline"}
                      onClick={() => setLayout("grid")}
                      className="w-full"
                    >
                      Grid
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Spacing</Label>
                      <span className="text-sm text-muted-foreground">{spacing}px</span>
                    </div>
                    <Slider
                      value={[spacing]}
                      min={0}
                      max={50}
                      step={1}
                      onValueChange={(values) => setSpacing(values[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Background</Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-md border" style={{ backgroundColor }} />
                      <Input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="border">
              <AccordionTrigger className="py-3 px-4 bg-muted/30 rounded-md mt-2">Border</AccordionTrigger>
              <AccordionContent className="pt-4 px-1">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Width</Label>
                      <span className="text-sm text-muted-foreground">{borderWidth}px</span>
                    </div>
                    <Slider
                      value={[borderWidth]}
                      min={0}
                      max={20}
                      step={1}
                      onValueChange={(values) => setBorderWidth(values[0])}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button
                      variant={borderType === "none" ? "default" : "outline"}
                      onClick={() => setBorderType("none")}
                      className="w-full"
                    >
                      None
                    </Button>
                    <Button
                      variant={borderType === "solid" ? "default" : "outline"}
                      onClick={() => setBorderType("solid")}
                      className="w-full"
                    >
                      Solid
                    </Button>
                    <Button
                      variant={borderType === "dashed" ? "default" : "outline"}
                      onClick={() => setBorderType("dashed")}
                      className="w-full"
                    >
                      Dashed
                    </Button>
                    <Button
                      variant={borderType === "dotted" ? "default" : "outline"}
                      onClick={() => setBorderType("dotted")}
                      className="w-full"
                    >
                      Dotted
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: borderColor }} />
                      <Input
                        type="text"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="watermark">
              <AccordionTrigger className="py-3 px-4 bg-muted/30 rounded-md mt-2">Watermark</AccordionTrigger>
              <AccordionContent className="pt-4 px-1">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Text</Label>
                    <Input
                      type="text"
                      placeholder="Enter watermark text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Font Size</Label>
                      <span className="text-sm text-muted-foreground">{watermarkFontSize}px</span>
                    </div>
                    <Slider
                      value={[watermarkFontSize]}
                      min={8}
                      max={72}
                      step={1}
                      onValueChange={(values) => setWatermarkFontSize(values[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: watermarkColor }} />
                      <Input
                        type="text"
                        value={watermarkColor}
                        onChange={(e) => setWatermarkColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Position</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={watermarkPosition === "top-left" ? "default" : "outline"}
                        onClick={() => setWatermarkPosition("top-left")}
                        className="w-full text-xs"
                      >
                        Top Left
                      </Button>
                      <Button
                        variant={watermarkPosition === "top-right" ? "default" : "outline"}
                        onClick={() => setWatermarkPosition("top-right")}
                        className="w-full text-xs"
                      >
                        Top Right
                      </Button>
                      <Button
                        variant={watermarkPosition === "center" ? "default" : "outline"}
                        onClick={() => setWatermarkPosition("center")}
                        className="w-full text-xs"
                      >
                        Center
                      </Button>
                      <Button
                        variant={watermarkPosition === "bottom-left" ? "default" : "outline"}
                        onClick={() => setWatermarkPosition("bottom-left")}
                        className="w-full text-xs"
                      >
                        Bottom Left
                      </Button>
                      <Button
                        variant={watermarkPosition === "bottom-right" ? "default" : "outline"}
                        onClick={() => setWatermarkPosition("bottom-right")}
                        className="w-full text-xs"
                      >
                        Bottom Right
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Opacity</Label>
                      <span className="text-sm text-muted-foreground">{watermarkOpacity}%</span>
                    </div>
                    <Slider
                      value={[watermarkOpacity]}
                      min={10}
                      max={100}
                      step={1}
                      onValueChange={(values) => setWatermarkOpacity(values[0])}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="output">
              <AccordionTrigger className="py-3 px-4 bg-muted/30 rounded-md mt-2">Output Options</AccordionTrigger>
              <AccordionContent className="pt-4 px-1">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    The merged image will be saved as a PNG file with transparency support.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button className="w-full" onClick={mergeImages} disabled={images.length < 2 || isProcessing}>
            <Download className="h-4 w-4 mr-2" />
            {isProcessing ? "Processing..." : "Merge & Download"}
          </Button>
        </div>
      </div>

      {/* Preview area */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Preview ({images.length} images)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.url || "/placeholder.svg"}
                  alt="Uploaded image"
                  className="w-full h-32 object-cover rounded-md border"
                />
                <button
                  className="absolute top-2 right-2 p-1 rounded-full bg-background/80 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setImages(images.filter((i) => i.id !== img.id))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Merged result */}
      {mergedImageUrl && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Merged Result</h3>
            <Button variant="outline" size="sm" className="text-xs gap-1" onClick={downloadMergedImage}>
              <Download className="h-3.5 w-3.5" />
              Download
            </Button>
          </div>

          <div className="border rounded-md p-2 bg-muted/20">
            <img src={mergedImageUrl || "/placeholder.svg"} alt="Merged image" className="max-w-full rounded" />
          </div>
        </div>
      )}

      {/* Hidden canvas for merging */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

