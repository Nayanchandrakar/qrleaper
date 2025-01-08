"use client"
import { createDownloadInstance } from "@/utils/download-instance"
import { useCallback } from "react"

class BlobWritableStream {
  private chunks: Uint8Array[]
  private blob: Blob | null

  constructor() {
    this.chunks = []
    this.blob = null
  }

  write(chunk: Uint8Array) {
    this.chunks.push(chunk)
  }

  close() {
    this.blob = new Blob(this.chunks, { type: "application/pdf" })
    return this.blob
  }

  toBlob() {
    return this.blob
  }
}

interface UseSvgToPdf {
  convertSvgToPdf: (svgContent: string, fileName?: string) => Promise<void>
}

export const useSvgToPdf = (): UseSvgToPdf => {
  const convertSvgToPdf = useCallback(
    async (svgContent: string, fileName = "fileName") => {
      const PDFDocument = (await import("pdfkit")).default
      const svgToPdf = (await import("svg-to-pdfkit")).default

      const doc = new PDFDocument({ size: "A4" })

      const stream = new BlobWritableStream()
      doc.pipe({
        // @ts-ignore
        write: (chunk: Uint8Array) => stream.write(chunk),
        // @ts-ignore
        end: () => stream.close(),
      })

      const pageWidth = 595.28 // A4 width in points (72 points per inch)
      const pageHeight = 841.89 // A4 height in points
      const svgWidth = 400 // Approximate SVG width in points (adjust as needed)
      const svgHeight = 300 // Approximate SVG height in points (adjust as needed)

      const centerX = (pageWidth - svgWidth) / 2
      const centerY = (pageHeight - svgHeight) / 2

      if (svgToPdf) {
        svgToPdf(doc, svgContent, centerX, centerY)
      }

      doc.end()

      const blob = stream.toBlob()
      createDownloadInstance(fileName, "pdf", URL.createObjectURL(blob!))
    },
    []
  )

  return { convertSvgToPdf }
}
