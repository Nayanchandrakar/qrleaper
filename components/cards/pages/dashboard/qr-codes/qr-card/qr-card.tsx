import { MousePointerClick } from "lucide-react"

import { Card, CardHeader } from "@/components/ui/card"
import { getEndpointURL } from "@/utils"
import type { qrCardType } from "@/types/type"
import { QrCodePreview } from "@/components/cards/pages/dashboard/qr-codes/qr-card/qr-code-preview"
import { Badge } from "@/components/ui/badge"
import { clicksFormatter } from "@/lib/utils"
import { CopyButton } from "./copy-button"
import { QrStatusBadge } from "./qr-status-badge"
import { CardFooterButton } from "./card-footer-buttonts"

interface QrCardProps {
  data: qrCardType
}

export const QrCard = ({ data }: QrCardProps) => {
  return (
    <Card>
      <QrCodePreview endpoint={getEndpointURL(data.qr_code.id)} data={data} />

      <CardHeader className="px-3 pt-4 space-y-3">
        <CopyButton
          title={data?.qr_code.title!}
          endpoint={getEndpointURL(data.qr_code.id)}
        />

        <div className="flex items-center gap-2 justify-between">
          <Badge variant="clicks">
            <MousePointerClick className="size-4 mr-1" />
            {clicksFormatter(data?.qr_scan_count?.count!)} clicks
          </Badge>

          <QrStatusBadge status={data?.qr_code?.status!} />
        </div>
      </CardHeader>
      <CardFooterButton qrCode={data?.qr_code!} />
    </Card>
  )
}
