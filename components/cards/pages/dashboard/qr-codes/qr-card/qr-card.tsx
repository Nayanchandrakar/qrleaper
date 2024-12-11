import { ChartColumnStacked, MousePointerClick } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getEndpointURL } from "@/utils"
import type { qrCardType } from "@/types/type"
import { QrCodePreview } from "@/components/cards/pages/dashboard/qr-codes/qr-card/qr-code-preview"
import { Badge } from "@/components/ui/badge"
import { clicksFormatter } from "@/lib/utils"
import { CopyButton } from "./copy-button"
import { QrStatusBadge } from "./qr-status-badge"
import { MiniButton } from "@/components/buttons/mini-button"
import Link from "next/link"

interface QrCardProps {
  data: qrCardType
}

export const QrCard = ({ data }: QrCardProps) => {
  return (
    <Card>
      <QrCodePreview
        styleData={data.qr_code_style!}
        data={getEndpointURL(data.qr_code.id)}
        id={data.qr_code.id}
      />
      <CardHeader className="px-3 pt-4 space-y-3">
        <CopyButton
          title={data?.qr_code.title!}
          data={getEndpointURL(data.qr_code.id)}
        />

        <div className="flex items-center gap-2 justify-between">
          <Badge variant="clicks">
            <MousePointerClick className="size-4 mr-1" />
            {clicksFormatter(data?.qr_scan_count?.count!, { full: true })}{" "}
            clicks
          </Badge>

          <QrStatusBadge status={data?.qr_code?.status!} />
        </div>
      </CardHeader>
      <CardFooter className="px-3 pb-4 flex items-center gap-3">
        <MiniButton className="w-full bg-gradient-brand">
          Edit QR Code
        </MiniButton>
      </CardFooter>
    </Card>
  )
}
