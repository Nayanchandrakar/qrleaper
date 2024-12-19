import { redirect } from "next/navigation"

import { auth } from "@/lib/auth/auth"
import {
  getFileQrStyleAndDataByQrCodeId,
  getQrCodeByUserIdAndIdWithType,
} from "@/app/actions/utils"
import { getEndpointURL } from "@/utils"
import { FileEditForm } from "@/components/forms/pages/edit/file/file-edit-form"

// Site metadata
export const metadata = {
  title: "Edit File based QR Codes",
}

interface FileEditPageProps {
  params: {
    id: string
  }
}

const FileEditPage = async ({ params }: FileEditPageProps) => {
  if (!params.id) redirect("/design")

  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const data = await getQrCodeByUserIdAndIdWithType(
    session.user.id,
    params.id,
    "file"
  )

  if (!data) redirect("/design")

  const qrStyleAndFileData = await getFileQrStyleAndDataByQrCodeId(data.id)

  const qrCode = {
    id: data.id,
    title: data.title ?? "",
    fileName: qrStyleAndFileData?.file.fileId ?? "",
    style: {
      bottomInput: qrStyleAndFileData?.style.bottomText ?? "",
      image: qrStyleAndFileData?.style.logo ?? "",
      topInput: qrStyleAndFileData?.style.topText ?? "",
      color: qrStyleAndFileData?.style.color ?? "",
      hasFrame: !!qrStyleAndFileData?.style.hasFrame,
      shape: qrStyleAndFileData?.style.shape ?? "square",
    },
  }

  return <FileEditForm qrCode={qrCode} endpoint={getEndpointURL(data.id)} />
}

export default FileEditPage
