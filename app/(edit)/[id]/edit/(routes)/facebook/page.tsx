import { redirect } from "next/navigation"

import { auth } from "@/lib/auth/auth"
import {
  getFacebookQrStyleAndDataByQrCodeId,
  getQrCodeByUserIdAndIdWithType,
} from "@/app/actions/utils"
import { getEndpointURL } from "@/utils"
import { FacebookEditForm } from "@/components/forms/pages/edit/facebook/facebook-edit-form"

// Site metadata
export const metadata = {
  title: "Edit Facebook based QR Codes",
}

interface FacebookEditPageProps {
  params: {
    id: string
  }
}

const FacebookEditPage = async ({ params }: FacebookEditPageProps) => {
  if (!params.id) redirect("/design")

  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const data = await getQrCodeByUserIdAndIdWithType(
    session.user.id,
    params.id,
    "facebook"
  )

  if (!data) redirect("/design")

  const qrStyleAndFacebookData = await getFacebookQrStyleAndDataByQrCodeId(
    data.id
  )

  const qrCode = {
    title: data.title ?? "",
    facebookUrl: qrStyleAndFacebookData?.facebook.facebookUrl ?? "",
    style: {
      bottomInput: qrStyleAndFacebookData?.style.bottomText ?? "",
      image: qrStyleAndFacebookData?.style.logo ?? "",
      topInput: qrStyleAndFacebookData?.style.topText ?? "",
      color: qrStyleAndFacebookData?.style.color ?? "",
      hasFrame: !!qrStyleAndFacebookData?.style.hasFrame,
      shape: qrStyleAndFacebookData?.style.shape ?? "square",
    },
  }

  return (
    <FacebookEditForm
      qrCode={qrCode}
      endpoint={getEndpointURL(data.id)}
      id={data.id!}
    />
  )
}

export default FacebookEditPage
