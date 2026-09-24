import { redirect } from "next/navigation"

import {
  getLinkQrStyleAndDataByQrCodeId,
  getQrCodeByUserIdAndIdWithType
} from "@/app/actions/utils"
import { DesignEditForm } from "@/components/forms/pages/edit/design/design-edit-form"
import { auth } from "@/lib/auth/auth"
import { getEndpointURL } from "@/utils"

// Site metadata
export const metadata = {
  title: "Edit Link based QR Codes"
}

interface DesignEditPageProps {
  params: Promise<{
    id: string
  }>
}

const DesignEditPage = async ({ params }: DesignEditPageProps) => {
  const { id } = await params

  if (!id) redirect("/design")

  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const data = await getQrCodeByUserIdAndIdWithType(session.user.id, id, "link")

  if (!data) redirect("/design")

  const qrStyleAndLinkData = await getLinkQrStyleAndDataByQrCodeId(data.id)

  const qrCode = {
    id: data.id,
    title: data.title ?? "",
    link: qrStyleAndLinkData?.link.link ?? "",
    style: {
      bottomInput: qrStyleAndLinkData?.style.bottomText ?? "",
      image: qrStyleAndLinkData?.style.logo ?? "",
      topInput: qrStyleAndLinkData?.style.topText ?? "",
      hasFrame: !!qrStyleAndLinkData?.style.hasFrame,
      shape: qrStyleAndLinkData?.style.shape ?? "square",
      colors: qrStyleAndLinkData?.style.colors ?? [""],
      colorType: qrStyleAndLinkData?.style.colorType ?? "linear",
      rotation: qrStyleAndLinkData?.style.rotation ?? 0
    }
  }

  return <DesignEditForm qrCode={qrCode} endpoint={getEndpointURL(data.id)} />
}

export default DesignEditPage
