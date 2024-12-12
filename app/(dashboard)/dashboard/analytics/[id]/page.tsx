import { redirect } from "next/navigation"

import { auth } from "@/lib/auth/auth"
import {
  getQrCodeByUserIdAndStatusType,
  getQrScanCountById,
} from "@/app/actions/utils"
import { Container } from "@/components/global/container"
import { TotalScanCount } from "@/components/pages/dashboard/analytics/total-scan-count"
import { AnalyticsReport } from "@/components/pages/dashboard/analytics/analytics-report"

export const metadata = {
  title: "View Your QR Code Analytics",
}

interface AnalyticsPageProps {
  params: {
    id: string
  }
}

const AnalyticsPage = async ({ params }: AnalyticsPageProps) => {
  if (!params.id) redirect("/dashboard/qr-codes")

  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const qrCode = await getQrCodeByUserIdAndStatusType(
    session.user.id,
    params.id!,
    "active"
  )

  if (!qrCode) redirect("/dashboard/qr-codes")

  const scanData = await getQrScanCountById(qrCode.id)

  return (
    <Container className="my-8 sm:mt-12">
      <TotalScanCount
        count={scanData?.count || 0}
        createdAt={scanData?.createdAt!}
        updatedAt={scanData?.updatedAt!}
      />
      <AnalyticsReport id={qrCode.id} />
    </Container>
  )
}

export default AnalyticsPage
