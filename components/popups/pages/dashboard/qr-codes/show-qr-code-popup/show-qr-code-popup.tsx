"use client"

import { toast } from "sonner"
import { useCallback, useRef } from "react"
import { Image as LucideImage, Download } from "lucide-react"
import type { FileExtension, ShapeType } from "qr-code-styling"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import type { qrCodeRefType } from "@/types/type"
import { getEndpointURLClient } from "@/utils/client"
import { ShimmerDots } from "@/components/ui/shimmer-dots"
import { QrCode } from "@/components/package/qr-code/qr-code"
import { downloadOptionData } from "@/constants/qr/download-options"
import { usePreviewQrCode } from "@/hooks/pages/dashboard/qr-codes/usePreviewQr"

export const ShowQrCodePopup = () => {
  const qrCodeRef = useRef<qrCodeRefType>(null)
  const { isOpen, setIsOpen, data } = usePreviewQrCode()

  const handleDownload = useCallback(
    (extension: FileExtension) => {
      if (!qrCodeRef.current) return
      qrCodeRef?.current.download({ extension, name: data?.qr_code.title })
      toast.success("QR Code Downloaded Succefully!")
    },
    [qrCodeRef, data?.qr_code.title]
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[450px] ">
        <DialogHeader>
          <DialogTitle className="line-clamp-1 font-medium">
            {data?.qr_code.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-3">
          <div className="flex items-center gap-2 justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">
              QR Code Preview
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="size-6 rounded-md flex cursor-pointer transition duration-200 hover:bg-gray-100 items-center justify-center">
                  <Download className="text-gray-600 size-4" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {downloadOptionData?.map(({ id, label, value }) => (
                  <DropdownMenuItem
                    key={id}
                    className="cursor-pointer"
                    onClick={() => handleDownload(value as FileExtension)}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <LucideImage className="size-5" />
                      {label}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center justify-center rounded-lg border border-gray-200 relative">
            <QrCode
              qrCodeRef={qrCodeRef}
              {...data?.qr_code_style}
              topInput={data?.qr_code_style?.topText!}
              bottomInput={data?.qr_code_style?.bottomText!}
              data={getEndpointURLClient(data?.qr_code?.id!)}
              shape={data?.qr_code_style?.shape! as ShapeType}
              logo={data?.qr_code_style?.logo!}
              className="scale-[0.7]"
            />
            <ShimmerDots className="pointer-events-none z-10 opacity-30 [mask-image:radial-gradient(40%_80%,transparent_50%,black)]" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
