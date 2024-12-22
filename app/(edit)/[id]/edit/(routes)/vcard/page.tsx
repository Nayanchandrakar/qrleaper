import { redirect } from "next/navigation"

import { auth } from "@/lib/auth/auth"
import {
  getQrCodeByUserIdAndIdWithType,
  getVcardQrStyleAndDataByQrCodeId,
} from "@/app/actions/utils"
import { getEndpointURL } from "@/utils"
import { VcardEditForm } from "@/components/forms/pages/edit/vcard/vcard-edit-form"

// Site metadata
export const metadata = {
  title: "Edit Message based QR Codes",
}

interface VcardEditPageProps {
  params: {
    id: string
  }
}

const VcardEditPage = async ({ params }: VcardEditPageProps) => {
  if (!params.id) redirect("/design")

  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const data = await getQrCodeByUserIdAndIdWithType(
    session.user.id,
    params.id,
    "vcard"
  )

  if (!data) redirect("/design")

  const qrStyleAndVcardData = await getVcardQrStyleAndDataByQrCodeId(data.id)

  const { images, id, qrCodeId, ...remaining } = qrStyleAndVcardData.vcard

  const qrCode = {
    id: data.id,
    title: data.title ?? "",
    ...remaining,
    style: {
      bottomInput: qrStyleAndVcardData?.style.bottomText ?? "",
      image: qrStyleAndVcardData?.style.logo ?? "",
      topInput: qrStyleAndVcardData?.style.topText ?? "",
      color: qrStyleAndVcardData?.style.color ?? "",
      hasFrame: !!qrStyleAndVcardData?.style.hasFrame,
      shape: qrStyleAndVcardData?.style.shape ?? "square",
    },
  }

  return <VcardEditForm qrCode={qrCode} endpoint={getEndpointURL(data.id)} />
}

export default VcardEditPage
