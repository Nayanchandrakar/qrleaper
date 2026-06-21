"use client"

import { ChevronDown, Image as LucideImage } from "lucide-react"
import { useRef } from "react"
import { useFormContext } from "react-hook-form"

import { QrCode } from "@/components/package/qr-code/qr-code"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { StepLabel } from "@/components/ui/step-label"
import { downloadOptionData } from "@/constants/qr/download-options"
import { useQrCodeDownload } from "@/hooks/global/downloads/useQrCodeDownload"
import { useQrDataContext } from "@/hooks/qr/useQrDataContext"
import type { FileExtensionTypeExtended, qrCodeRefType } from "@/types/type"
import { getFilePath } from "@/utils/client"

export const PreviewQrCard = () => {
  const qrCodeRef = useRef<qrCodeRefType>(null)

  const { download } = useQrCodeDownload(qrCodeRef)
  const { getValues } = useFormContext()
  const { data } = useQrDataContext()
  const { style, title } = getValues()

  return (
    <div className="flex max-h-[50rem] flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 py-8 sm:sticky sm:top-0">
      <StepLabel>
        <StepLabel.Counter>3</StepLabel.Counter>
        <StepLabel.Title>Download Your QR</StepLabel.Title>
      </StepLabel>
      <QrCode
        qrCodeRef={qrCodeRef}
        bottomInput={style?.bottomInput}
        topInput={style?.topInput}
        colors={style?.colors}
        colorType={style?.colorType}
        rotation={style?.rotation}
        hasFrame={style?.hasFrame}
        shape={style?.shape}
        {...(data && { data })}
        {...(style?.image && { logo: getFilePath(style.image) })}
      />

      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={data === null}
          className="flex w-fit items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-black/90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Download QR
          <ChevronDown className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {downloadOptionData?.map(({ id, label, value }) => (
            <DropdownMenuItem
              key={id}
              className="cursor-pointer"
              onClick={() =>
                download({
                  fileExtension: value as FileExtensionTypeExtended,
                  fileName: title
                })
              }
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
  )
}
