import { getEndpointURL } from "@/utils"
import type { qrCardType } from "@/types/type"
import { CopyButton } from "@/components/cards/pages/dashboard/qr-codes/qr-card/copy-button"
import { ShowQrCodePopupButton } from "@/components/cards/pages/dashboard/qr-codes/qr-card/show-qr-code-popup-button"

interface QrHeaderProps {
  data: qrCardType
}

export const QrHeader = ({ data }: QrHeaderProps) => {
  return (
    <div className="flex items-center gap-4 justify-between">
      <span className="truncate text-gray-500 font-semibold">
        {data?.qr_code.title}
      </span>

      <div className="flex items-center gap-2">
        <CopyButton endpoint={getEndpointURL(data.qr_code.id)} />
        <ShowQrCodePopupButton data={data} />
      </div>
    </div>
  )
}
