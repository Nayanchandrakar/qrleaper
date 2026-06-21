import { ChartBar } from "lucide-react"
import Link from "next/link"

import { MiniButton } from "@/components/buttons/mini-button"
import { CardFooter } from "@/components/ui/card"
import type { qrCodeType } from "@/types/db-types"
import { getAnalyticsURL, getEditURL } from "@/utils"

interface CardFooterButtonProps {
  qrCode: qrCodeType
}

export const CardFooterButton = ({ qrCode }: CardFooterButtonProps) => {
  return (
    <CardFooter className="flex items-center gap-2 px-3 pb-4">
      <Link href={getEditURL(qrCode.type, qrCode.id)} className="w-full">
        <MiniButton className="bg-gradient-brand w-full">
          Edit QR Code
        </MiniButton>
      </Link>

      <Link
        href={getAnalyticsURL(qrCode.id)}
        className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100"
      >
        <ChartBar className="size-4 text-gray-500" />
      </Link>
    </CardFooter>
  )
}
