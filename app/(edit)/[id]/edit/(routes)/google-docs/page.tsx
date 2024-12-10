import { redirect } from "next/navigation"

import { auth } from "@/lib/auth/auth"
import {
  getGoogleDocsQrStyleAndDataByQrCodeId,
  getQrCodeByUserIdAndIdWithType,
} from "@/app/actions/utils"
import { getEndpointURL } from "@/utils"
import { GoogleDocsEditForm } from "@/components/forms/pages/edit/google-docs/google-docs-edit-form"

// Site metadata
export const metadata = {
  title: "Edit Google Docs based QR Codes",
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
    "googleDoc"
  )

  if (!data) redirect("/design")

  const qrStyleAndGoogleDocsData = await getGoogleDocsQrStyleAndDataByQrCodeId(
    data.id
  )

  const qrCode = {
    title: data.title ?? "",
    googleDocUrl: qrStyleAndGoogleDocsData?.googleDocs.googleDocUrl ?? "",
    style: {
      bottomInput: qrStyleAndGoogleDocsData?.style.bottomText ?? "",
      image: qrStyleAndGoogleDocsData?.style.logo ?? "",
      topInput: qrStyleAndGoogleDocsData?.style.topText ?? "",
      color: qrStyleAndGoogleDocsData?.style.color ?? "",
      hasFrame: !!qrStyleAndGoogleDocsData?.style.hasFrame,
      shape: qrStyleAndGoogleDocsData?.style.shape ?? "square",
    },
  }

  return (
    <GoogleDocsEditForm
      qrCode={qrCode}
      endpoint={getEndpointURL(data.id)}
      id={data.id!}
    />
  )
}

export default DesignEditPage
