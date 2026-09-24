import { redirect } from "next/navigation"

import {
  getGoogleDocsQrStyleAndDataByQrCodeId,
  getQrCodeByUserIdAndIdWithType
} from "@/app/actions/utils"
import { GoogleDocsEditForm } from "@/components/forms/pages/edit/google-docs/google-docs-edit-form"
import { auth } from "@/lib/auth/auth"
import { getEndpointURL } from "@/utils"

// Site metadata
export const metadata = {
  title: "Edit Google Docs based QR Codes"
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

  const data = await getQrCodeByUserIdAndIdWithType(
    session.user.id,
    id,
    "googleDoc"
  )

  if (!data) redirect("/design")

  const qrStyleAndGoogleDocsData = await getGoogleDocsQrStyleAndDataByQrCodeId(
    data.id
  )

  const qrCode = {
    id: data.id,
    title: data.title ?? "",
    googleDocUrl: qrStyleAndGoogleDocsData?.googleDocs.googleDocUrl ?? "",
    style: {
      bottomInput: qrStyleAndGoogleDocsData?.style.bottomText ?? "",
      image: qrStyleAndGoogleDocsData?.style.logo ?? "",
      topInput: qrStyleAndGoogleDocsData?.style.topText ?? "",
      hasFrame: !!qrStyleAndGoogleDocsData?.style.hasFrame,
      shape: qrStyleAndGoogleDocsData?.style.shape ?? "square",
      colors: qrStyleAndGoogleDocsData?.style.colors ?? [""],
      colorType: qrStyleAndGoogleDocsData?.style.colorType ?? "linear",
      rotation: qrStyleAndGoogleDocsData?.style.rotation ?? 0
    }
  }

  return (
    <GoogleDocsEditForm qrCode={qrCode} endpoint={getEndpointURL(data.id)} />
  )
}

export default DesignEditPage
