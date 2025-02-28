"use client"

import { useRef } from "react"
import { useFormContext } from "react-hook-form"
import { ChevronDown, Image as LucideImage } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { getFilePath } from "@/utils/client"
import { StepLabel } from "@/components/ui/step-label"
import { QrCode } from "@/components/package/qr-code/qr-code"
import { useQrDataContext } from "@/hooks/qr/useQrDataContext"
import { downloadOptionData } from "@/constants/qr/download-options"
import type { FileExtensionTypeExtended, qrCodeRefType } from "@/types/type"
import { useQrCodeDownload } from "@/hooks/global/downloads/useQrCodeDownload"

export const PreviewQrCard = () => {
  const qrCodeRef = useRef<qrCodeRefType>(null)

  const { download } = useQrCodeDownload(qrCodeRef)
  const { getValues } = useFormContext()
  const { data } = useQrDataContext()
  const { style, title } = getValues()

  return (
    <div className="flex items-center justify-center flex-col gap-4 bg-gray-100 py-8 rounded-lg max-h-[50rem] sm:sticky sm:top-0">
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
          className="w-fit gap-2 bg-black hover:bg-black/90 transition-colors duration-200 text-white  px-5 py-2 font-medium rounded-full text-sm disabled:cursor-not-allowed  disabled:opacity-50 disabled:pointer-events-none flex items-center "
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
                  fileName: title,
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
