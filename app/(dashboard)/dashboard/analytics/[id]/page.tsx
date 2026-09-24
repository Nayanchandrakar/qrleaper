import { redirect } from "next/navigation"

import {
  getQrCodeByUserIdAndStatusType,
  getQrScanCountById
} from "@/app/actions/utils"
import { Container } from "@/components/global/container"
import { AnalyticsReport } from "@/components/pages/dashboard/analytics/analytics-report"
import { TotalScanCount } from "@/components/pages/dashboard/analytics/total-scan-count"
import { auth } from "@/lib/auth/auth"

export const metadata = {
  title: "View Your QR Code Analytics"
}

interface AnalyticsPageProps {
  params: Promise<{
    id: string
  }>
}

const AnalyticsPage = async ({ params }: AnalyticsPageProps) => {
  const { id } = await params

  if (!id) redirect("/dashboard/qr-codes")

  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const qrCode = await getQrCodeByUserIdAndStatusType(
    session.user.id,
    id,
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
