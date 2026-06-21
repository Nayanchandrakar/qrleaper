import { MousePointerClick } from "lucide-react"

import { CardFooterButton } from "@/components/cards/pages/dashboard/qr-codes/qr-card/card-footer-buttonts"
import { QrCodePreview } from "@/components/cards/pages/dashboard/qr-codes/qr-card/qr-code-preview"
import { QrHeader } from "@/components/cards/pages/dashboard/qr-codes/qr-card/qr-header"
import { QrStatusBadge } from "@/components/cards/pages/dashboard/qr-codes/qr-card/qr-status-badge"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader } from "@/components/ui/card"
import { clicksFormatter } from "@/lib/utils"
import type { qrCardType } from "@/types/type"
import { getEndpointURL } from "@/utils"

interface QrCardProps {
  data: qrCardType
}

export const QrCard = ({ data }: QrCardProps) => {
  return (
    <Card className="overflow-hidden">
      <QrCodePreview endpoint={getEndpointURL(data.qr_code.id)} data={data} />

      <CardHeader className="space-y-3 px-3 pt-4">
        <QrHeader data={data} />

        <div className="flex items-center justify-between gap-2">
          <Badge variant="clicks">
            <MousePointerClick className="mr-1 size-4" />
            {clicksFormatter(data?.qr_scan_count?.count)} clicks
          </Badge>

          <QrStatusBadge status={data?.qr_code?.status} />
        </div>
      </CardHeader>
      <CardFooterButton qrCode={data?.qr_code} />
    </Card>
  )
}
