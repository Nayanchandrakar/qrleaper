import { redirect } from "next/navigation"

import { getQrCodeById, getVCardQrCodeByqrCodeId } from "@/app/actions/utils"
import { RenderVcardComponent } from "@/components/pages/vcard"

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

  return (
    <section className="size-full relative">
      <div className="design-mesh fixed size-full z-[-1]" />
      <div className="max-w-4xl mx-auto my-20">
        <RenderVcardComponent vCard={vCard!} />
      </div>
    </section>
  )
}

export default ShowVcardPage
