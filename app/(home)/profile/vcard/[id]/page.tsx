import { redirect } from "next/navigation"

import { getTemplateComponent } from "@/utils/pages/design/vcard"
import { getQrCodeById, getVCardQrCodeByqrCodeId } from "@/app/actions/utils"

export const metadata = {
  title: "QR Leapers User Profile Page",
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

  const TemplateComponent = getTemplateComponent(vCard?.templateId!)

  return (
    <section className="size-full relative">
      <div className="design-mesh fixed size-full z-[-1]" />
      <div className="max-w-4xl mx-auto my-20">
        <TemplateComponent vCard={vCard!} endpoint={qrCode.endpoint!} />
      </div>
    </section>
  )
}

export default ShowVcardPage
