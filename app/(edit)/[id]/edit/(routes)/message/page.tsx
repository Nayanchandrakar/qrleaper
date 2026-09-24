import { redirect } from "next/navigation"

import {
  getMessageQrStyleAndDataByQrCodeId,
  getQrCodeByUserIdAndIdWithType
} from "@/app/actions/utils"
import { MessageEditForm } from "@/components/forms/pages/edit/message/message-edit-form"
import { auth } from "@/lib/auth/auth"
import { getEndpointURL } from "@/utils"

// Site metadata
export const metadata = {
  title: "Edit Message based QR Codes"
}

interface MessageEditPageProps {
  params: Promise<{
    id: string
  }>
}

const MessageEditPage = async ({ params }: MessageEditPageProps) => {
  const { id } = await params

  if (!id) redirect("/design")

  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const data = await getQrCodeByUserIdAndIdWithType(
    session.user.id,
    id,
    "message"
  )

  if (!data) redirect("/design")

  const qrStyleAndMessageData = await getMessageQrStyleAndDataByQrCodeId(
    data.id
  )

  const qrCode = {
    id: data.id,
    title: data.title ?? "",
    message: qrStyleAndMessageData?.message.message ?? "",
    phoneNumber: qrStyleAndMessageData?.message.phoneNumber ?? "",
    style: {
      bottomInput: qrStyleAndMessageData?.style.bottomText ?? "",
      image: qrStyleAndMessageData?.style.logo ?? "",
      topInput: qrStyleAndMessageData?.style.topText ?? "",
      colors: qrStyleAndMessageData?.style.colors ?? [""],
      colorType: qrStyleAndMessageData?.style.colorType ?? "linear",
      rotation: qrStyleAndMessageData?.style.rotation ?? 0,
      hasFrame: !!qrStyleAndMessageData?.style.hasFrame,
      shape: qrStyleAndMessageData?.style.shape ?? "square"
    }
  }

  return <MessageEditForm qrCode={qrCode} endpoint={getEndpointURL(data.id)} />
}

export default MessageEditPage
