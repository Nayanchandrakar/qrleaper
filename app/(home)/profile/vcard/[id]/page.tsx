import { redirect } from "next/navigation"

import { getQrCodeById, getVCardQrCodeByqrCodeId } from "@/app/actions/utils"
import { getTemplateComponent } from "@/utils/pages/design/vcard"

export const metadata = {
  title: "QR Leapers User Profile Page"
}

interface ShowVcardPageProps {
  params: {
    id: string
  }
}

const ShowVcardPage = async ({ params }: ShowVcardPageProps) => {
  if (!params.id) redirect("/design")

  const qrCode = await getQrCodeById(params.id)

  if (!qrCode) redirect("/design")

  if (qrCode.status === "inactive") redirect("/expired")

  const vCard = await getVCardQrCodeByqrCodeId(qrCode.id)

  const TemplateComponent = getTemplateComponent(vCard?.templateId)

  return <TemplateComponent vCard={vCard!} endpoint={qrCode.endpoint!} />
}

export default ShowVcardPage
