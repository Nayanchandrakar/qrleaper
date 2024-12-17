"use client"

import { Expand } from "lucide-react"

import type { qrCardType } from "@/types/type"
import { Button } from "@/components/ui/button"
import { usePreviewQrCode } from "@/hooks/pages/dashboard/qr-codes/usePreviewQr"

interface ShowQrCodePopupButtonProps {
  data: qrCardType
}

export const ShowQrCodePopupButton = ({ data }: ShowQrCodePopupButtonProps) => {
  const { setIsOpen, setData } = usePreviewQrCode()

  return (
    <Button
      className="bg-gray-100 hover:bg-gray-100/60 "
      variant="ghost"
      size="icon"
      onClick={() => {
        setData(data)
        setIsOpen(true)
      }}
    >
      <Expand className="size-4 text-gray-500" />
    </Button>
  )
}
