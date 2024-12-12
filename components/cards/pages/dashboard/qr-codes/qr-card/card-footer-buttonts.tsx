import Link from "next/link"
import { ChartBar } from "lucide-react"

import { getAnalyticsURL, getEditURL } from "@/utils"
import { CardFooter } from "@/components/ui/card"
import type { qrCodeType } from "@/types/db-types"
import { MiniButton } from "@/components/buttons/mini-button"

interface CardFooterButtonProps {
  qrCode: qrCodeType
}

export const CardFooterButton = ({ qrCode }: CardFooterButtonProps) => {
  return (
    <CardFooter className="px-3 pb-4 flex items-center gap-2">
      <Link href={getEditURL(qrCode.type, qrCode.id)} className="w-full">
        <MiniButton className="w-full bg-gradient-brand">
          Edit QR Code
        </MiniButton>
      </Link>

      <Link
        href={getAnalyticsURL(qrCode.id)}
        className="size-10 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full"
      >
        <ChartBar className="size-4 text-gray-500" />
      </Link>
    </CardFooter>
  )
}
