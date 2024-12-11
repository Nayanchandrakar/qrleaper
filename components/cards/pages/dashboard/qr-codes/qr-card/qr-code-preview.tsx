"use client"

import { useRef } from "react"
import { toast } from "sonner"
import { Loader, Trash } from "lucide-react"
import { useAction } from "next-safe-action/hooks"

import { Button } from "@/components/ui/button"
import type { qrCodeStyleType } from "@/types/db-types"
import { QrCode } from "@/components/package/qr-code/qr-code"
import type { QrCodeProps, qrCodeRefType } from "@/types/type"
import { deleteQrCodeAction } from "@/app/actions/pages/dashboard/qr-codes/delete-qr-code"

interface QrCodePreviewType {
  styleData: qrCodeStyleType
  data: string
  id: string
}

export const QrCodePreview = ({ styleData, data, id }: QrCodePreviewType) => {
  const qrCodeRef = useRef<qrCodeRefType>(null)

  const { executeAsync, isExecuting } = useAction(deleteQrCodeAction, {
    onSuccess: () => toast.success("Succefully deleted QR Code!"),
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  return (
    <div className="bg-gray-50 flex items-center justify-center h-44 w-full group relative ">
      <QrCode
        qrCodeRef={qrCodeRef}
        {...styleData}
        shape={styleData.shape! as QrCodeProps["shape"]}
        topInput={styleData.topText!}
        bottomInput={styleData?.bottomText!}
        logo={styleData?.logo!}
        className="scale-[0.5]"
        data={data}
      />

      <Button
        onClick={() => executeAsync({ id })}
        className="absolute top-4 right-4 transition duration-200 opacity-0 group-hover:opacity-100"
        variant="destructive"
        size="icon"
        disabled={isExecuting}
      >
        {isExecuting ? (
          <Loader className="animate-spin size-4" />
        ) : (
          <Trash className="size-4" />
        )}
      </Button>
    </div>
  )
}
