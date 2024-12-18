"use client"

import { useRef } from "react"

import { DeleteQrCodeButton } from "./delete-qr-code-button"
import { QrCode } from "@/components/package/qr-code/qr-code"
import type { qrCardType, QrCodeProps, qrCodeRefType } from "@/types/type"
import { getFilePath } from "@/utils/client"

interface QrCodePreviewType {
  endpoint: string
  data: qrCardType
}

export const QrCodePreview = ({ endpoint, data }: QrCodePreviewType) => {
  const qrCodeRef = useRef<qrCodeRefType>(null)
  const { qr_code_style: styleData } = data

  return (
    <div className="bg-gray-100 flex items-center justify-center h-44 w-full group relative ">
      <QrCode
        data={endpoint}
        qrCodeRef={qrCodeRef}
        className="scale-[0.5]"
        color={styleData?.color}
        hasFrame={styleData?.hasFrame}
        topInput={styleData?.topText!}
        bottomInput={styleData?.bottomText!}
        shape={styleData?.shape! as QrCodeProps["shape"]}
        {...(styleData?.logo! && { logo: getFilePath(styleData?.logo!) })}
      />
      <DeleteQrCodeButton id={data.qr_code.id} />
    </div>
  )
}
