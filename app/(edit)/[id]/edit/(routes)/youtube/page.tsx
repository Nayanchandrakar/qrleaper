import { redirect } from "next/navigation"

import {
  getQrCodeByUserIdAndIdWithType,
  getYoutubeQrStyleAndDataByQrCodeId
} from "@/app/actions/utils"
import { YoutubeEditForm } from "@/components/forms/pages/edit/youtube/youtube-edit-form"
import { auth } from "@/lib/auth/auth"
import { getEndpointURL } from "@/utils"

// Site metadata
export const metadata = {
  title: "Edit Youtube Video based QR Codes"
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
    id: data.id,
    title: data.title ?? "",
    youtubeUrl: qrStyleAndYoutubeData?.youtube.youtubeUrl ?? "",
    style: {
      bottomInput: qrStyleAndYoutubeData?.style.bottomText ?? "",
      image: qrStyleAndYoutubeData?.style.logo ?? "",
      topInput: qrStyleAndYoutubeData?.style.topText ?? "",
      colors: qrStyleAndYoutubeData?.style.colors ?? [""],
      colorType: qrStyleAndYoutubeData?.style.colorType ?? "linear",
      rotation: qrStyleAndYoutubeData?.style.rotation ?? 0,
      hasFrame: !!qrStyleAndYoutubeData?.style.hasFrame,
      shape: qrStyleAndYoutubeData?.style.shape ?? "square"
    }
  }

  return <YoutubeEditForm qrCode={qrCode} endpoint={getEndpointURL(data.id)} />
}

export default YoutubeEditPage
