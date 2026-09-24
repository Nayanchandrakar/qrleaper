import { redirect } from "next/navigation"

import {
  getEmailQrStyleAndDataByQrCodeId,
  getQrCodeByUserIdAndIdWithType
} from "@/app/actions/utils"
import { EmailEditForm } from "@/components/forms/pages/edit/email/email-edit-form"
import { auth } from "@/lib/auth/auth"
import { getEndpointURL } from "@/utils"

// Site metadata
export const metadata = {
  title: "Edit Email based QR Codes"
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
      rotation: qrStyleAndEmailData?.style.rotation ?? 0
    }
  }

  return <EmailEditForm qrCode={qrCode} endpoint={getEndpointURL(data.id)} />
}

export default MessageEditPage
