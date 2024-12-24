"use client"

import { useTransition } from "react"
import { Loader } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { qrCodevCardType } from "@/types/db-types"
import { createDownloadInstance } from "@/utils/download-instance"

interface AddToContactButtonProps {
  data: qrCodevCardType
  endpoint: string
}

export const AddToContactButton: React.FC<AddToContactButtonProps> = ({
  data,
  endpoint,
}) => {
  const [isLoading, setIsLoading] = useTransition()

  const handleDownload = () => {
    setIsLoading(async () => {
      const response = await fetch("/api/vcard", {
        method: "POST",
        body: JSON.stringify({ ...data, endpoint }),
      })

      const href = URL.createObjectURL(await response.blob())
      createDownloadInstance(data.qrCodeId, "vcf", href)
    })
  }

  return (
    <Button
      size="lg"
      disabled={isLoading}
      onClick={handleDownload}
      className="bg-gradient-brand mt-2"
    >
      {isLoading && <Loader className="animate-spin size-4" />}
      Add to Contacts
    </Button>
  )
}
