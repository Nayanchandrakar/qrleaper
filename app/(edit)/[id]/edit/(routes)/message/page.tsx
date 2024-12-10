import { redirect } from "next/navigation"

import { auth } from "@/lib/auth/auth"
import {
  getMessageQrStyleAndDataByQrCodeId,
  getQrCodeByUserIdAndIdWithType,
} from "@/app/actions/utils"
import { DesignEditForm } from "@/components/forms/pages/edit/design/design-edit-form"
import { MessageEditForm } from "@/components/forms/pages/edit/message/message-edit-form"
import { getEndpointURL } from "@/utils"

// Site metadata
export const metadata = {
  title: "Edit Message based QR Codes",
}

interface MessageEditPageProps {
  params: {
    id: string
  }
}

const MessageEditPage = async ({ params }: MessageEditPageProps) => {
  if (!params.id) redirect("/design")

  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const data = await getQrCodeByUserIdAndIdWithType(
    session.user.id,
    params.id,
    "message"
  )

  if (!data) redirect("/design")

  const qrStyleAndMessageData = await getMessageQrStyleAndDataByQrCodeId(
    data.id
  )

  const qrCode = {
    title: data.title ?? "",
    link: qrStyleAndMessageData?.message.message ?? "",
    phoneNumber: qrStyleAndMessageData?.message.phoneNumber ?? "",
    style: {
      bottomInput: qrStyleAndMessageData?.style.bottomText ?? "",
      image: qrStyleAndMessageData?.style.logo ?? "",
      topInput: qrStyleAndMessageData?.style.topText ?? "",
      color: qrStyleAndMessageData?.style.color ?? "",
      hasFrame: !!qrStyleAndMessageData?.style.hasFrame,
      shape: qrStyleAndMessageData?.style.shape ?? "square",
    },
  }

  return (
    <MessageEditForm
      qrCode={qrCode}
      endpoint={getEndpointURL(data.id)}
      id={data.id!}
    />
  )
}

export default MessageEditPage
