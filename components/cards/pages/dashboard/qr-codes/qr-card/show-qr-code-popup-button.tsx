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
      className="absolute top-4 right-16 transition duration-200 opacity-0 group-hover:opacity-100"
      variant="outline"
      size="icon"
      onClick={() => {
        setData(data)
        setIsOpen(true)
      }}
    >
      <Expand className="size-4" />
    </Button>
  )
}
