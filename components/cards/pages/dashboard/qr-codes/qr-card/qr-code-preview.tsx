"use client"

import { useRef } from "react"

import { DeleteQrCodeButton } from "./delete-qr-code-button"
import { QrCode } from "@/components/package/qr-code/qr-code"
import type { qrCardType, QrCodeProps, qrCodeRefType } from "@/types/type"

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
        qrCodeRef={qrCodeRef}
        {...styleData}
        shape={styleData?.shape! as QrCodeProps["shape"]}
        topInput={styleData?.topText!}
        bottomInput={styleData?.bottomText!}
        logo={styleData?.logo!}
        className="scale-[0.5]"
        data={endpoint}
      />

      <DeleteQrCodeButton id={data.qr_code.id} />
    </div>
  )
}
