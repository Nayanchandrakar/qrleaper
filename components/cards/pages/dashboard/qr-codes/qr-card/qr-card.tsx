import { MousePointerClick } from "lucide-react"

import { getEndpointURL } from "@/utils"
import { Badge } from "@/components/ui/badge"
import { clicksFormatter } from "@/lib/utils"
import type { qrCardType } from "@/types/type"
import { Card, CardHeader } from "@/components/ui/card"
import { QrHeader } from "@/components/cards/pages/dashboard/qr-codes/qr-card/qr-header"
import { QrStatusBadge } from "@/components/cards/pages/dashboard/qr-codes/qr-card/qr-status-badge"
import { QrCodePreview } from "@/components/cards/pages/dashboard/qr-codes/qr-card/qr-code-preview"
import { CardFooterButton } from "@/components/cards/pages/dashboard/qr-codes/qr-card/card-footer-buttonts"

interface QrCardProps {
  data: qrCardType
}

export const QrCard = ({ data }: QrCardProps) => {
  return (
    <Card className="overflow-hidden">
      <QrCodePreview endpoint={getEndpointURL(data.qr_code.id)} data={data} />

      <CardHeader className="px-3 pt-4 space-y-3">
        <QrHeader data={data} />

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
