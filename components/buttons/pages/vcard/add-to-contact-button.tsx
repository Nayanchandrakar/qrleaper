"use client"

import { Loader } from "lucide-react"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { qrCodevCardType } from "@/types/db-types"
import { createDownloadInstance } from "@/utils/download-instance"

interface AddToContactButtonProps {
  data: qrCodevCardType
  endpoint: string
  isPreviewMode: boolean
  className?: string
}

export const AddToContactButton: React.FC<AddToContactButtonProps> = ({
  data,
  endpoint,
  className,
  isPreviewMode
}) => {
  const [isLoading, setIsLoading] = useTransition()

  const handleDownload = () => {
    setIsLoading(async () => {
      const response = await fetch("/api/vcard", {
        method: "POST",
        body: JSON.stringify({ ...data, endpoint })
      })

      const href = URL.createObjectURL(await response.blob())
      createDownloadInstance(data.qrCodeId, "vcf", href)
    })
  }

  return (
    <Button
      size="lg"
      onClick={handleDownload}
      disabled={isLoading || isPreviewMode}
      className={cn("bg-gradient-brand mt-2", className)}
    >
      {isLoading && <Loader className="size-4 animate-spin" />}
      Add to Contacts
    </Button>
  )
}
