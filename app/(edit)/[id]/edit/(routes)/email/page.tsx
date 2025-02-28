import { redirect } from "next/navigation"

import { auth } from "@/lib/auth/auth"
import {
  getEmailQrStyleAndDataByQrCodeId,
  getQrCodeByUserIdAndIdWithType,
} from "@/app/actions/utils"
import { getEndpointURL } from "@/utils"
import { EmailEditForm } from "@/components/forms/pages/edit/email/email-edit-form"

// Site metadata
export const metadata = {
  title: "Edit Email based QR Codes",
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
    "email"
  )

  if (!data) redirect("/design")

  const qrStyleAndEmailData = await getEmailQrStyleAndDataByQrCodeId(data.id)

  const qrCode = {
    id: data.id,
    title: data.title ?? "",
    message: qrStyleAndEmailData?.email.message ?? "",
    email: qrStyleAndEmailData?.email.email ?? "",
    subject: qrStyleAndEmailData?.email.subject ?? "",
    style: {
      bottomInput: qrStyleAndEmailData?.style.bottomText ?? "",
      image: qrStyleAndEmailData?.style.logo ?? "",
      topInput: qrStyleAndEmailData?.style.topText ?? "",
      hasFrame: !!qrStyleAndEmailData?.style.hasFrame,
      shape: qrStyleAndEmailData?.style.shape ?? "square",
      colors: qrStyleAndEmailData?.style.colors ?? [""],
      colorType: qrStyleAndEmailData?.style.colorType ?? "linear",
      rotation: qrStyleAndEmailData?.style.rotation ?? 0,
    },
  }

  return <EmailEditForm qrCode={qrCode} endpoint={getEndpointURL(data.id)} />
}

export default MessageEditPage
