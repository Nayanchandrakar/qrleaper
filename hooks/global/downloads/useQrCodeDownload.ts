"use client"

import { toast } from "sonner"
import { MutableRefObject } from "react"

import type { FileExtensionTypeExtended, qrCodeRefType } from "@/types/type"

interface DownloadProps {
  fileName: string
  fileExtension: FileExtensionTypeExtended
}

export const useQrCodeDownload = (
  qrCodeRef: MutableRefObject<qrCodeRefType>
) => {
  const download = async ({ fileName, fileExtension }: DownloadProps) => {
    if (!qrCodeRef.current) return

    if (fileExtension === "pdf") {
      const blob = await qrCodeRef.current?.getRawData("png")
      console.log(blob, "from png")
    } else {
      qrCodeRef.current?.download({
        extension: fileExtension,
        name: fileName,
      })
      toast.success("QR Code Downloaded Successfully!")
    }
  }

  return {
    download,
  }
}
