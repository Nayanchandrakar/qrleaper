import { redirect } from "next/navigation"

import { auth } from "@/lib/auth/auth"
import {
  getQrCodeByUserIdAndIdWithType,
  getYoutubeQrStyleAndDataByQrCodeId,
} from "@/app/actions/utils"
import { DesignEditForm } from "@/components/forms/pages/edit/design/design-edit-form"
import { getEndpointURL } from "@/utils"

// Site metadata
export const metadata = {
  title: "Edit Youtube Video based QR Codes",
}

interface YoutubeEditPageProps {
  params: {
    id: string
  }
}

const YoutubeEditPage = async ({ params }: YoutubeEditPageProps) => {
  if (!params.id) redirect("/design")

  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const data = await getQrCodeByUserIdAndIdWithType(
    session.user.id,
    params.id,
    "youtube"
  )

  if (!data) redirect("/design")

  const qrStyleAndYoutubeData = await getYoutubeQrStyleAndDataByQrCodeId(
    data.id
  )

  const qrCode = {
    title: data.title ?? "",
    link: qrStyleAndYoutubeData?.youtube.youtubeUrl ?? "",
    style: {
      bottomInput: qrStyleAndYoutubeData?.style.bottomText ?? "",
      image: qrStyleAndYoutubeData?.style.logo ?? "",
      topInput: qrStyleAndYoutubeData?.style.topText ?? "",
      color: qrStyleAndYoutubeData?.style.color ?? "",
      hasFrame: !!qrStyleAndYoutubeData?.style.hasFrame,
      shape: qrStyleAndYoutubeData?.style.shape ?? "square",
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

export default YoutubeEditPage
