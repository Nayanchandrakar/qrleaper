import { redirect } from "next/navigation"

import { auth } from "@/lib/auth/auth"
import {
  getLinkQrStyleAndDataByQrCodeId,
  getQrCodeByUserIdAndIdWithType,
} from "@/app/actions/utils"
import { DesignEditForm } from "@/components/forms/pages/edit/design/design-edit-form"
import { getEndpointURL } from "@/utils"

// Site metadata
export const metadata = {
  title: "Edit Link based QR Codes",
}

interface DesignEditPageProps {
  params: {
    id: string
  }
}

const DesignEditPage = async ({ params }: DesignEditPageProps) => {
  if (!params.id) redirect("/design")

  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const data = await getQrCodeByUserIdAndIdWithType(
    session.user.id,
    params.id,
    "link"
  )

  if (!data) redirect("/design")

  const qrStyleAndLinkData = await getLinkQrStyleAndDataByQrCodeId(data.id)

  const qrCode = {
    title: data.title ?? "",
    link: qrStyleAndLinkData?.link.link ?? "",
    style: {
      bottomInput: qrStyleAndLinkData?.style.bottomText ?? "",
      image: qrStyleAndLinkData?.style.logo ?? "",
      topInput: qrStyleAndLinkData?.style.topText ?? "",
      color: qrStyleAndLinkData?.style.color ?? "",
      hasFrame: !!qrStyleAndLinkData?.style.hasFrame,
      shape: qrStyleAndLinkData?.style.shape ?? "square",
    },
  }

  return (
    <DesignEditForm
      qrCode={qrCode}
      endpoint={getEndpointURL(data.id)}
      id={data.id!}
    />
  )
}

export default DesignEditPage
